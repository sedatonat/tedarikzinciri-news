#!/bin/bash
# Double-click to run end-to-end tagging pipeline.
# Requires ANTHROPIC_API_KEY to be exported in the shell OR in ~/.zshrc.

set -e

REPO="$HOME/Documents/Claude/Projects/News/tedarikzinciri-news"
cd "$REPO" || { echo "Repo not found at $REPO"; exit 1; }

# Keep the Terminal window open on exit
trap 'echo ""; echo "=========================================="; echo "Pencereyi kapatabilirsin."; read -n 1 -s -r -p "Bir tuşa bas..."' EXIT

echo "=========================================="
echo "  Auto-Tagging Pipeline"
echo "=========================================="
echo ""

if [ -z "$ANTHROPIC_API_KEY" ]; then
  echo "HATA: ANTHROPIC_API_KEY environment variable bos."
  echo ""
  echo "Onerilen: ~/.zshrc dosyana su satiri ekle (tırnak dahil):"
  echo '    export ANTHROPIC_API_KEY="sk-ant-api03-..."'
  echo ""
  echo "Sonra Terminal'i tamamen kapat, yeniden ac, bu .command dosyasina cift tikla."
  exit 1
fi
echo "✓ ANTHROPIC_API_KEY set (last 6: ...${ANTHROPIC_API_KEY: -6})"
echo ""

echo "--- Step 1/5: Dependency check ---"
python3 -c "import anthropic, yaml" 2>/dev/null || {
  echo "Bagimliliklar kuruluyor..."
  python3 -m pip install --user anthropic pyyaml
}
echo "✓ anthropic + pyyaml ready"
echo ""

echo "--- Step 2/5: Pilot tag (5 TR haber) ---"
echo "Once 5 haberle deniyoruz, sonuc iyi gorunurse devam."
echo ""
LIMIT=5 python3 scripts/auto_tag.py --tr-only
echo ""
echo "Pilot tamamlandi. 10 saniye bekliyorum, begenmezsen CTRL+C ile durdur..."
for i in 10 9 8 7 6 5 4 3 2 1; do
  printf "\r  %2d saniye..." "$i"
  sleep 1
done
echo ""
echo ""

echo "--- Step 3/5: Tum TR haberleri tag'le (~1110 dosya) ---"
python3 scripts/auto_tag.py --tr-only
echo ""

echo "--- Step 4/5: Tum EN haberleri tag'le (~1115 dosya) ---"
python3 scripts/auto_tag.py --en-only
echo ""

echo "--- Step 5/5: Commit + push ---"
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
echo "=========================================="
