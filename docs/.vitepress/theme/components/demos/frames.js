/**
 * Fetches demo frames before they're picked, for every demo on the page.
 *
 * - fetchFrame(url, high) requests an image once per URL and keeps it, so a
 *   stage <img> with the same URL takes it from memory, with no second
 *   request.
 * - decodeFrame(url) fetches it at high priority and decodes it, so the
 *   frame paints at once when it's picked.
 * - prefetch(owner, urls) queues low-priority requests, a few at a time when
 *   the browser is idle. Each call replaces the URLs the same demo queued
 *   before, newest first, and an empty list clears them. Nothing is queued
 *   while the reader's browser asks to save data or reports a 3G or slower
 *   connection; a control the reader points at still fetches its frame.
 */
const images = new Map()
const decodes = new Map()
let queue = []
let active = 0
let pending = false
// Requests in flight at once. A frame's first request at a Cloudflare edge
// waits about half a second for the file, so a few go side by side.
const MAX_ACTIVE = 4

export function fetchFrame(url, high = false) {
  let img = images.get(url)
  if (!img) {
    img = new Image()
    img.fetchPriority = high ? 'high' : 'low'
    img.decoding = 'async'
    img.src = url
    images.set(url, img)
  }
  return img
}

export function decodeFrame(url) {
  let done = decodes.get(url)
  if (!done) {
    done = fetchFrame(url, true)
      .decode()
      .catch(() => decodes.delete(url))
    decodes.set(url, done)
  }
  return done
}

/** True when the browser asks to save data or reports a slow connection. */
function sparing() {
  const c = typeof navigator !== 'undefined' ? navigator.connection : null
  return !!c && (c.saveData || /^(slow-2g|2g|3g)$/.test(c.effectiveType || ''))
}

export function prefetch(owner, urls) {
  const others = queue.filter((q) => q.owner !== owner)
  const fresh = sparing() ? [] : urls.filter((url) => !images.has(url)).map((url) => ({ owner, url }))
  queue = [...fresh, ...others]
  if (queue.length) pump()
}

function pump() {
  if (pending) return
  pending = true
  const run = () => {
    pending = false
    while (active < MAX_ACTIVE && queue.length) {
      const { url } = queue.shift()
      if (images.has(url)) continue
      const img = fetchFrame(url)
      active++
      const next = () => {
        active--
        if (queue.length) pump()
      }
      img.addEventListener('load', next, { once: true })
      img.addEventListener('error', next, { once: true })
    }
  }
  if (typeof requestIdleCallback === 'function') requestIdleCallback(run, { timeout: 500 })
  else setTimeout(run, 50)
}
