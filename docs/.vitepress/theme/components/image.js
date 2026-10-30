/**
 * What the page needs to show one screenshot: its web copy, its dark-mode
 * twin, the copy's pixel size, and the width it shows at. The data comes from
 * scripts/compress.js (image-variants.json, image-widths.json and
 * image-sizes.json).
 */
import variants from '../image-variants.json'
import widths from '../image-widths.json'
import sizes from '../image-sizes.json'

const toCopy = (src) => `/assets/compressed/${src.slice(0, src.lastIndexOf('.'))}.webp`

export function imageInfo(src) {
  const dark = variants[src] || ''
  const [w, h] = sizes[src] || []
  return {
    light: toCopy(src),
    dark: dark ? toCopy(dark) : '',
    zoom: `/assets/original/${src}`,
    darkZoom: dark ? `/assets/original/${dark}` : '',
    size: w ? [w, h] : null,
    darkSize: dark ? sizes[dark] || null : null,
    // 2x screenshots show at half their pixel width, the size they are on
    // screen; other images at most at the width of their copy.
    shown: widths[src] ? Math.round(widths[src] / 2) : w || 0,
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
