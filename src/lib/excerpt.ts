/**
 * Produce a short plain-text excerpt from a news entry.
 *
 * Preference order:
 *   1. `frontmatter.subtitle` (if present)
 *   2. First non-trivial paragraph of the raw markdown / HTML body
 *
 * The helper strips HTML tags, markdown emphasis, common entities,
 * truncates to a word boundary, and adds an ellipsis when cut.
 */
export function extractExcerpt(body: string | undefined, maxChars = 280): string {
  if (!body) return '';
  let text = body
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&lsquo;|&rsquo;/g, "'")
    .replace(/&hellip;/g, '…')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')      // markdown images
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')     // markdown links → text
    .replace(/^#{1,6}\s+/gm, '')                 // headings
    .replace(/\*\*([^*]+)\*\*/g, '$1')           // bold
    .replace(/\*([^*]+)\*/g, '$1')                // italic
    .replace(/__([^_]+)__/g, '$1')                // bold alt
    .replace(/_([^_]+)_/g, '$1')                  // italic alt
    .replace(/\s+/g, ' ')
    .trim();

  if (!text) return '';
  if (text.length <= maxChars) return text;

  const slice = text.slice(0, maxChars);
  const lastSpace = slice.lastIndexOf(' ');
  const cut = lastSpace > maxChars * 0.7 ? slice.slice(0, lastSpace) : slice;
  return cut.replace(/[.,;:!?]+$/, '') + '…';
}

/**
 * Pick the best excerpt source: subtitle first, then body fallback.
 */
export function resolveExcerpt(
  subtitle: string | undefined | null,
  body: string | undefined,
  maxChars = 280
): string {
  const sub = (subtitle ?? '').toString().trim();
  if (sub) return sub;
  return extractExcerpt(body, maxChars);
}
