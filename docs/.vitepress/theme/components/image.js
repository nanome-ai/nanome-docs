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
 * { size: [w, h], v, shown?, dark?, small?: [w, v] }. An entry is the same on
 * every page, so pages can add theirs in any order.
 */
export function addImages(entries) {
  for (const src in entries) known.set(src, entries[src])
}

// A copy's URL, with its content hash, so a changed image never comes from a
// stale cache. `suffix` names the smaller copy.
const toCopy = (src, v, suffix = '') =>
  `/assets/compressed/${src.slice(0, src.lastIndexOf('.'))}${suffix}.webp${v ? `?v=${v}` : ''}`

// Both copies, for `srcset`, when the image has a smaller one.
function srcset(src, entry) {
  if (!entry?.small || !entry.size) return undefined
  const [w, v] = entry.small
  return `${toCopy(src, v, `.w${w}`)} ${w}w, ${toCopy(src, entry.v)} ${entry.size[0]}w`
}

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
    // With `sizes`, the browser takes the smaller copy whenever it's sharp at
    // the width the image has on the page. `auto` reads that width from the
    // layout; a browser without `auto` sizes it for the widest it can show.
    lightSet: srcset(src, entry),
    darkSet: dark ? srcset(dark, darkEntry) : undefined,
    sizes: `auto, ${shown}px`,
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

/**
 * The full-screen view of a <HotShot> shows its full copy, whose URL the image
 * carries in data-full. So that the view opens sharp, without the smaller copy
 * showing first, the full copy starts loading once the reader shows they may
 * open it: pointing at the expand button, resting the pointer on an image that
 * opens on a click, tabbing to either, or pressing on the image (a touch
 * screen has no hover). Scrolling past a screenshot loads nothing extra.
 */
if (typeof document !== 'undefined') {
  const warm = new Map()
  const load = (shot) => {
    for (const img of shot?.querySelectorAll('img[data-full]') || []) {
      const url = img.dataset.full
      // Only the copy for the current theme: the other one isn't shown.
      if (!img.offsetWidth || warm.has(url)) continue
      const full = new Image()
      full.src = url
      full.decode?.().catch(() => {})
      warm.set(url, full)
    }
  }
  const shotOf = (target, selector) => (target instanceof Element ? target.closest(selector)?.closest('.hotshot') : null)

  let rest = 0
  const stop = () => clearTimeout(rest)
  document.addEventListener(
    'pointerover',
    (event) => {
      stop()
      const button = shotOf(event.target, '.hotshot__expand')
      if (button) return load(button)
      const frame = shotOf(event.target, '.hotshot__frame.opens-on-click')
      if (frame) rest = setTimeout(() => load(frame), 300)
    },
    { passive: true }
  )
  document.addEventListener('scroll', stop, { passive: true, capture: true })
  document.addEventListener('pointerdown', (event) => load(shotOf(event.target, '.hotshot')), { passive: true })
  document.addEventListener('focusin', (event) => load(shotOf(event.target, '.hotshot__expand, .hotshot__frame[tabindex]')))
}
