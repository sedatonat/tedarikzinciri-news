#!/bin/bash
# Double-click to run end-to-end tagging pipeline.
# Requires ANTHROPIC_API_KEY to be exported in the shell OR in ~/.zshrc.

set +e

# Force UTF-8 locale (macOS system Python otherwise defaults to ASCII, which
# breaks HTTP request encoding the moment a Turkish character appears).
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
export LC_CTYPE=en_US.UTF-8
export PYTHONIOENCODING=utf-8
export PYTHONUTF8=1

REPO="$HOME/Documents/Claude/Projects/News/tedarikzinciri-news"
cd "$REPO" || { echo "Repo not found at $REPO"; exit 1; }

# Source ~/.zshrc so API keys exported there become available in this bash run
if [ -z "$ANTHROPIC_API_KEY" ] && [ -f "$HOME/.zshrc" ]; then
  # shellcheck disable=SC1091
  # Pull only environment exports from zshrc (ignore interactive-only zsh syntax errors)
  eval "$(grep -E '^[[:space:]]*export[[:space:]]+ANTHROPIC_API_KEY=' "$HOME/.zshrc" 2>/dev/null)"
fi

# Deep key-format validation: reject garbage inherited from a corrupted .zshrc
# (e.g. multiple pastes concatenated into one line). A clean key has exactly ONE
# 'sk-ant-' prefix and is ~100-130 chars.
validate_key() {
  local k="$1"
  [ -z "$k" ] && return 1
  case "$k" in
    sk-ant-*) ;;
    *) return 1 ;;
  esac
  local prefix_count
  prefix_count=$(printf "%s" "$k" | grep -o 'sk-ant-' | wc -l | tr -d ' ')
  [ "$prefix_count" = "1" ] || return 1
  local len=${#k}
  [ "$len" -ge 100 ] && [ "$len" -le 140 ] || return 1
  # No whitespace inside
  case "$k" in
    *[[:space:]]*) return 1 ;;
  esac
  return 0
}

# If inherited key from .zshrc is malformed, wipe it so prompt triggers + clean rewrite
if [ -n "$ANTHROPIC_API_KEY" ] && ! validate_key "$ANTHROPIC_API_KEY"; then
  echo "NOT: ~/.zshrc'daki ANTHROPIC_API_KEY bozuk gorunuyor (birden fazla yapistirilmis olabilir)."
  echo "     Temizleyip yeniden soracagim."
  unset ANTHROPIC_API_KEY
fi

mkdir -p "$REPO/logs"
LOG="$REPO/logs/run_tagging_$(date +%Y%m%d_%H%M%S).log"

# Tee everything to a log file; keep window open on exit.
exec > >(tee -a "$LOG") 2>&1

trap 'echo ""; echo "=========================================="; echo "Log: $LOG"; echo "Pencereyi kapatabilirsin."; read -n 1 -s -r -p "Bir tuşa bas..."' EXIT

echo "=========================================="
echo "  Auto-Tagging Pipeline"
echo "  Log: $LOG"
echo "=========================================="
echo ""
echo "Locale:"
echo "  LANG=$LANG"
echo "  LC_ALL=$LC_ALL"
echo "  PYTHONIOENCODING=$PYTHONIOENCODING"
echo "  PYTHONUTF8=$PYTHONUTF8"
python3 -c "import sys,locale; print(f'  python={sys.version.split()[0]} stdout={sys.stdout.encoding} locale={locale.getpreferredencoding()}')"
echo ""

if ! validate_key "$ANTHROPIC_API_KEY"; then
  echo "ANTHROPIC_API_KEY bulunamadi veya gecersiz formatta."
  echo ""
  echo "Anahtari buradan al: https://console.anthropic.com/settings/keys"
  echo "TEK defa Cmd+V ile yapistir ve Enter'a bas (gizli alinir, ekranda gorunmez)."
  echo ""
  # Loop: keep asking until a clean key is entered
  while true; do
    # Redirect read from /dev/tty so that the exec-tee trick above doesn't eat
    # our stdin.
    printf "API Key: "
    IFS= read -rs ANTHROPIC_API_KEY </dev/tty
    echo ""
    if validate_key "$ANTHROPIC_API_KEY"; then
      echo "✓ Key formati dogru (uzunluk=${#ANTHROPIC_API_KEY})."
      break
    fi
    echo "! Gecersiz key. Olasi sebepler:"
    echo "  - sk-ant- ile baslamiyor"
    echo "  - Birden fazla yapistirilmis (key icinde 'sk-ant-' birden cok kez geciyor)"
    echo "  - Uzunluk garip (~108 karakter olmali, senin girdigin: ${#ANTHROPIC_API_KEY})"
    echo "  - Icinde bosluk var"
    echo "Tekrar dene, sadece TEK defa Cmd+V yap ve hemen Enter'a bas."
    echo ""
  done
  export ANTHROPIC_API_KEY

  # Persist to ~/.zshrc so the user doesn't have to re-paste on re-runs.
  # Use grep -E (ERE) for portability — BSD grep's BRE doesn't recognize \+.
  if [ -f "$HOME/.zshrc" ]; then
    cp "$HOME/.zshrc" "$HOME/.zshrc.bak.$(date +%Y%m%d_%H%M%S)"
    grep -vE '^[[:space:]]*export[[:space:]]+ANTHROPIC_API_KEY=' "$HOME/.zshrc" > "$HOME/.zshrc.tmp" \
      && mv "$HOME/.zshrc.tmp" "$HOME/.zshrc"
  fi
  echo "export ANTHROPIC_API_KEY=\"$ANTHROPIC_API_KEY\"" >> "$HOME/.zshrc"
  echo "✓ Anahtar ~/.zshrc'ye kaydedildi. Sonraki calismalar otomatik."
fi
echo "✓ ANTHROPIC_API_KEY set (last 6: ...${ANTHROPIC_API_KEY: -6})"
echo ""

echo "--- Step 1/6: Dependency check (install + upgrade) ---"
# Force upgrade so that any older anthropic/httpx gets replaced. Quiet install.
python3 -m pip install --user --upgrade --quiet anthropic pyyaml httpx 2>&1
python3 -c "import anthropic, httpx, yaml; print(f'  anthropic={anthropic.__version__} httpx={httpx.__version__}')"
if [ $? -ne 0 ]; then
  echo "HATA: anthropic SDK import edilemedi. pip install basarisiz."
  exit 1
fi
echo ""

echo "--- Step 2/6: Preflight — tag 1 TR article with full diagnostics ---"
LIMIT=1 CONCURRENCY=1 python3 scripts/auto_tag.py --tr-only
PREFLIGHT_STATUS=$?
echo ""
echo "Preflight exit status: $PREFLIGHT_STATUS"
if [ $PREFLIGHT_STATUS -ne 0 ]; then
  echo "HATA: preflight basarisiz. Yukaridaki tracebacke bak."
  exit 1
fi

# Confirm at least one TR file got tagged
TAGGED_NOW=$(grep -l "^tags:" src/content/news-tr/*.md 2>/dev/null | wc -l | tr -d ' ')
echo "Tag'li TR dosya sayisi (preflight sonrasi): $TAGGED_NOW"
if [ "$TAGGED_NOW" = "0" ]; then
  echo "HATA: preflight cikardi ama hic TR dosya taglanmamis. auto_tag.py cikti loguna bak."
  exit 1
fi
echo ""

echo "--- Step 3/6: Pilot — 5 TR haber ---"
LIMIT=5 python3 scripts/auto_tag.py --tr-only
echo ""
echo "Pilot tamamlandi. 10 saniye bekliyorum, begenmezsen CTRL+C ile durdur..."
for i in 10 9 8 7 6 5 4 3 2 1; do
  printf "\r  %2d saniye..." "$i"
  sleep 1
done
echo ""
echo ""

echo "--- Step 4/6: Tum TR haberleri tag'le (~1110 dosya) ---"
python3 scripts/auto_tag.py --tr-only
echo ""

echo "--- Step 5/6: Tum EN haberleri tag'le (~1115 dosya) ---"
python3 scripts/auto_tag.py --en-only
echo ""

echo "--- Step 6/6: Commit + push ---"
git add src/content/news-tr src/content/news-en
if git diff --cached --quiet; then
  echo "Hic dosya degismemis, commit atlanıyor."
else
  git commit -m "Auto-tag: 5-8 tags per article (TR + EN) via Claude"
  echo "✓ commit atildi"
  if git push 2>&1; then
    echo "✓ push basarili"
  else
    echo "! push basarisiz — lokalde 'git push' cagirip manuel at."
  fi
fi
echo ""
echo "=========================================="
echo "  Bitti! tzp.news Cloudflare Pages uzerinden otomatik yeniden build olacak."
echo "  2-3 dakika sonra /etiketler sayfasinda tag'ler gorunecek."
echo "  Log: $LOG"
echo "=========================================="
