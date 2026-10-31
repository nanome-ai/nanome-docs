/**
 * What the page needs to show one screenshot: its web copies, its dark-mode
 * twin, the copy's pixel size, and the width it shows at.
 *
 * scripts/compress.js writes the data (theme/image-*.json), and the theme
 * script doesn't carry it. The build adds the entries for the images a page
 * names to that page's own script, and a page with an option-panel demo also
 * imports every demo frame's entry (imageData in config.mjs). Both run before
 * the page renders, so its first render already has every size and URL.
 */
const known = new Map()

/**
 * Adds image entries, keyed by path under assets/original:
 * { size: [w, h], v, shown?, dark? }. An entry is the same on every page, so
 * pages can add theirs in any order.
 */
export function addImages(entries) {
  for (const src in entries) known.set(src, entries[src])
}

// A copy's URL, with its content hash, so a changed image never comes from a
// stale cache.
const toCopy = (src, v) => `/assets/compressed/${src.slice(0, src.lastIndexOf('.'))}.webp${v ? `?v=${v}` : ''}`

export function imageInfo(src) {
  const entry = known.get(src) || {}
  const dark = entry.dark || ''
  const darkEntry = dark ? known.get(dark) || {} : null
  const [w, h] = entry.size || []
  // 2x screenshots show at half their pixel width, the size they are on
  // screen; other images at most at the width of their copy.
  const shown = entry.shown || w || 0
  return {
    light: toCopy(src, entry.v),
    dark: dark ? toCopy(dark, darkEntry.v) : '',
    zoom: `/assets/original/${src}`,
    darkZoom: dark ? `/assets/original/${dark}` : '',
    size: w ? [w, h] : null,
    darkSize: darkEntry?.size || null,
    shown,
    isGif: /\.gif$/i.test(src),
  }
}

/**
 * Parses "x,y,w,h" (percent of the full image) into numbers, or null.
 */
export function parseBox(value) {
  if (!value) return null
  const n = String(value).split(',').map(Number)
  return n.length === 4 && n.every((v) => Number.isFinite(v)) ? n : null
}
