/**
 * Which h2 section of the page is in view, for the left rail and the
 * breadcrumb. `pickHeading` is the rule, and the "On this page" lists use it
 * too (`useActiveHeader`), so they all agree.
 *
 * The layout calls `provideSectionSpy()` once; components read the id with
 * `useSectionSpy()`.
 */
import { inject, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import { getScrollOffset, onContentUpdated, useRoute } from 'vitepress'

const KEY = Symbol('section-spy')

/** The element the URL's `#hash` names, if any. */
function hashTarget() {
  if (!location.hash) return null
  try {
    return document.getElementById(decodeURIComponent(location.hash.slice(1)))
  } catch {
    return null
  }
}

/**
 * The heading the reader is in, from `headings` in page order, or null.
 *
 * VitePress's outline rule, with one change at the bottom of the page:
 * - none at the very top of the page;
 * - otherwise the last heading whose top has passed the line under the sticky
 *   chrome. The line is `getScrollOffset()`, where VitePress scrolls anchor
 *   links to, plus 20px: a heading counts as soon as a link has landed on it,
 *   even when a page opened at an anchor settles a few px lower as its media
 *   loads. Every heading is taller than 20px, so the one after a landed
 *   heading never counts early;
 * - at the bottom of the page, where short last sections never reach the
 *   line, the last heading. But if the URL's `#hash` points into a section
 *   that's on screen, that one: a reader who clicks "Load Structure" near the
 *   end of a page sees "Load Structure" marked.
 */
export function pickHeading(headings) {
  const { scrollY, innerHeight } = window
  if (!headings.length || scrollY < 1) return null

  if (scrollY + innerHeight >= document.body.offsetHeight - 1) {
    const target = hashTarget()
    if (target) {
      const top = target.getBoundingClientRect().top
      const owner = [...headings]
        .reverse()
        .find(
          (el) =>
            el === target ||
            el.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING
        )
      if (owner && top >= 0 && top < innerHeight) return owner
    }
    return headings[headings.length - 1]
  }

  const line = getScrollOffset() + 20
  let active = null
  for (const el of headings) {
    if (el.getBoundingClientRect().top > line) break
    active = el
  }
  return active
}

/** Headings that are on the page and laid out: one in a closed toggle isn't. */
export function measurable(el) {
  return el.isConnected && el.offsetParent !== null
}

/**
 * Runs `measure` at most once a frame while the page scrolls, resizes or
 * changes its hash, and returns the function that asks for a run. A link to
 * a section already on screen at the bottom scrolls nothing, but still
 * changes which section counts (see `pickHeading`), hence the hash.
 */
function useMeasure(measure) {
  let frame = 0

  function run() {
    frame = 0
    measure()
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(run)
  }

  onMounted(() => {
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    window.addEventListener('hashchange', schedule)
    schedule()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
    window.removeEventListener('hashchange', schedule)
    cancelAnimationFrame(frame)
  })

  return schedule
}

export function provideSectionSpy() {
  const route = useRoute()
  const active = ref(null)

  const schedule = useMeasure(() => {
    const headings = [...document.querySelectorAll('.VPDoc .vp-doc h2[id]')]
    active.value = pickHeading(headings.filter(measurable))?.id ?? null
  })

  // The old page's section means nothing on the new one, even for a frame.
  watch(
    () => route.path,
    () => (active.value = null)
  )
  onContentUpdated(schedule)

  provide(KEY, active)
  return active
}

/**
 * The `#link` of the heading in view, for an "On this page" list built from
 * VitePress's `getHeaders()` (a ref to headers with `children`). It counts
 * h3s as well as h2s, so it can be a level deeper than the section spy.
 */
export function useActiveHeader(headers) {
  const active = ref(null)
  const flatten = (list) =>
    list.flatMap((header) => [header, ...flatten(header.children || [])])

  const schedule = useMeasure(() => {
    const elements = flatten(headers.value).map((header) => header.element)
    const el = pickHeading(elements.filter(measurable))
    active.value = el ? `#${el.id}` : null
  })

  watch(headers, schedule)
  return active
}

/** The id of the h2 in view, or null at the top of a page. */
export function useSectionSpy() {
  return inject(KEY, ref(null))
}
