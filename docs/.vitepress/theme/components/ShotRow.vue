<script setup>
/**
 * A screenshot beside its legend: the image on the left and the icons and
 * what they do on the right, once the column is wide enough. The image stays
 * in view while a long legend scrolls past. Whenever the two stack, on a
 * narrow screen or for a wide image, the image comes first and the legend
 * follows it, in the page and to a screen reader alike.
 *
 * `stack` stacks them at every width: the image, centered and no taller than
 * min(70vh, 640px), then the legend under it.
 *
 * A legend row (<UiItem>) or card (<IconCard>) with an `area` ("x,y,w,h",
 * percent of the image) lights up that part of the image while it's hovered,
 * and hovering the image lights up the row. Clicking a part of the image goes
 * to the row's link, or brings the row into view when it has none. The expand
 * button opens the image full screen with the legend beside it.
 *
 * A wide image (about 2:1 or wider, and over 400px wide), such as a sequence
 * strip, stays full width under its legend, since it can't be read at a third
 * of the page. A small panel of that shape sits beside its legend instead.
 * Full screen it comes first, with the legend under it. When it's much wider
 * than the screen, as on a phone, it shows at a readable height instead and
 * scrolls sideways.
 *
 * Two or more legends in one row share one name column, so all their
 * descriptions start at the same place.
 *
 *   <ShotRow src="nanome-v2/v2-7/settings-tab.webp" alt="The Settings tab" stack>
 *
 *   <UiList>
 *   <UiItem icon="moon" name="Night mode" area="6,13,6,8">…</UiItem>
 *   </UiList>
 *
 *   </ShotRow>
 */
import { computed, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import HotShot from './HotShot.vue'
import { imageInfo, parseBox } from './image.js'
import { useFocusView } from './focus.js'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  crop: { type: String, default: '' },
  stack: { type: Boolean, default: false },
})

/** The image's width over its height, after the crop. */
const ar = computed(() => {
  const [w, h] = imageInfo(props.src).size || []
  const [, , cw, ch] = parseBox(props.crop) || [0, 0, 100, 100]
  return (w * cw) / (h * ch)
})

/** The width the image shows at, after the crop. */
const shownWidth = computed(() => {
  const [, , cw] = parseBox(props.crop) || [0, 0, 100, 100]
  return ((imageInfo(props.src).shown || 0) * cw) / 100
})

const wide = computed(() => ar.value > 1.9 && shownWidth.value > 400)
// A tall panel: kept under half a phone screen high, it's narrower than the screen.
const tall = computed(() => ar.value < 0.9)
// Full screen, a stacked desktop capture a little under the wide shape comes
// first with the legend under it too. Beside the legend it would show no
// larger than in the page.
const fsWide = computed(() => wide.value || (props.stack && ar.value > 1.6))

// Legend rows with an area register here, in page order.
const spots = ref([])
let next = 0
const active = ref(0)
// A click on a region can scroll the page to its row, which slides the image
// under the pointer. Hovers during that scroll aren't the reader's, so they're
// ignored until it ends, and the row stays lit.
let holding = 0
let holds = 0

function enter(n) {
  if (!holding) active.value = n
}

function leave(n) {
  if (!holding && active.value === n) active.value = 0
}

function holdWhileScrolling() {
  const mine = ++holds
  holding = mine
  const end = () => setTimeout(() => holding === mine && (holding = 0), 100)
  // The page scrolls, or the full-screen view does.
  addEventListener('scrollend', end, { once: true })
  root.value?.addEventListener('scrollend', end, { once: true })
  // For a browser without scrollend.
  setTimeout(end, 1500)
}

provide('n-hotspots', {
  active,
  register(entry) {
    const n = ++next
    spots.value.push({ n, ...entry })
    return n
  },
  unregister(n) {
    spots.value = spots.value.filter((s) => s.n !== n)
  },
  enter(n) {
    enter(n)
    if (strip.value) slideTo(n)
    else reveal()
  },
  leave,
})

const root = ref(null)
const view = useFocusView(root)

/**
 * Full screen on a phone, an image wider than the window pans sideways, so a
 * legend row can light a part that's out of view. Pan the image to it. (A
 * wide image in the strip below slides there instead.)
 */
async function reveal() {
  if (!view.focused.value) return
  await nextTick()
  const shot = scroller.value
  const parts = [...(shot?.querySelectorAll('.hotshot__spot.is-active') || [])].map((el) => el.getBoundingClientRect())
  if (!parts.length || shot.scrollWidth <= shot.clientWidth) return
  const s = shot.getBoundingClientRect()
  const left = Math.min(...parts.map((r) => r.left))
  const right = Math.max(...parts.map((r) => r.right))
  const by = panBy(left, right, s.left, s.right)
  if (!by) return
  const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  shot.scrollBy({ left: by, behavior })
}

/**
 * How far to pan a view that shows `from` to `to` so a part from `left` to
 * `right` comes into it: 0 when it's in view. A part that fits comes to the
 * middle. One wider than the view shows from its start, since its middle is
 * often empty field; when its start is in view already, it stays put.
 */
function panBy(left, right, from, to) {
  if (left >= from && right <= to) return 0
  if (right - left <= to - from) return (left + right) / 2 - (from + to) / 2
  if (left >= from && left < to) return 0
  return left - 16 - from
}

/**
 * On open, a view that pans starts on the image's parts: all of them in the
 * middle when they fit, or else from the first one.
 */
function startOnParts(el) {
  if (!el || el.scrollWidth <= el.clientWidth + 1) return
  el.scrollLeft = 0
  const parts = [...el.querySelectorAll('.hotshot__spot')].map((p) => p.getBoundingClientRect())
  if (!parts.length) return
  const s = el.getBoundingClientRect()
  const by = panBy(Math.min(...parts.map((r) => r.left)), Math.max(...parts.map((r) => r.right)), s.left, s.right)
  if (by) el.scrollLeft = by
}

/**
 * Full screen, a wide image that fits the screen's width can come out smaller
 * than in the page. When its readable size (about 60% of the window's height,
 * and no larger than its own) is well over the screen's width, it shows at
 * that size in a strip that scrolls sideways, with faded edges where there's
 * more to see.
 */
const strip = ref(false)
const scroller = ref(null)
const more = ref({ left: false, right: false })

/**
 * Full screen on a phone, an image outside the strip that shows wider than
 * the screen pans sideways too, with the same faded edges and hint (`pan`).
 * One that would come out under a quarter wider than the screen fits it
 * instead (`fit`): that little more isn't worth cutting off its edge.
 */
const pan = ref(false)
const fit = ref(false)

function edges() {
  const el = scroller.value
  more.value =
    (strip.value || pan.value) && el
      ? { left: el.scrollLeft > 1, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1 }
      : { left: false, right: false }
}

async function fitPan(opening) {
  const on = view.focused.value && !strip.value && matchMedia('(max-width: 639px)').matches
  fit.value = false
  pan.value = false
  if (on) {
    await nextTick()
    const el = scroller.value
    if (el && view.focused.value) {
      fit.value = el.scrollWidth > el.clientWidth && el.scrollWidth < 1.25 * el.clientWidth
      pan.value = !fit.value && el.scrollWidth > el.clientWidth + 1
    }
  }
  await nextTick()
  if (opening === true && view.focused.value) startOnParts(scroller.value)
  edges()
}

function fitStrip(opening) {
  if (!view.focused.value || !wide.value) {
    strip.value = false
  } else {
    const info = imageInfo(props.src)
    const [w, h] = info.size || [16, 9]
    const [, , cw, ch] = parseBox(props.crop) || [0, 0, 100, 100]
    const shown = info.shown ? (info.shown * cw) / 100 : w
    const readable = Math.min(shown, 0.6 * innerHeight * ((w * cw) / (h * ch)))
    strip.value = readable > 1.5 * document.documentElement.clientWidth
  }
  nextTick(() => fitPan(opening))
}

watch(view.focused, (on) => {
  if (on) addEventListener('resize', fitStrip)
  else removeEventListener('resize', fitStrip)
  fitStrip(on)
})

/** In the strip, a region lit from its legend row slides into view. */
function slideTo(n) {
  const el = scroller.value
  const spot = strip.value && spots.value.find((s) => s.n === n)
  const frame = spot && el?.querySelector('.hotshot__frame')
  if (!frame) return
  const [cx, , cw] = parseBox(props.crop) || [0, 0, 100, 100]
  const from = frame.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft
  const start = from + ((spot.box[0] - cx) / cw) * frame.clientWidth
  const end = start + (spot.box[2] / cw) * frame.clientWidth
  const by = panBy(start, end, el.scrollLeft, el.scrollLeft + el.clientWidth)
  if (!by) return
  const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  el.scrollTo({ left: Math.max(0, el.scrollLeft + by), behavior })
}

// Two or more legends in the row share the widest of their name columns. Each
// list sizes its own first, so a long name still wraps as it did.
const legend = ref(null)
let lister = null
let legendWidth = 0

function alignLists() {
  const lists = [...(legend.value?.querySelectorAll('.n-uilist') || [])].filter((l) => l.getClientRects().length)
  for (const l of lists) l.style.removeProperty('--uil-name-col')
  if (lists.length < 2) return
  const tracks = lists.map((l) => getComputedStyle(l).gridTemplateColumns.split(' '))
  // A narrow list puts each description under its name, so they line up already.
  if (tracks.some((t) => t.length !== 3)) return
  const widest = Math.ceil(Math.max(...tracks.map((t) => parseFloat(t[1]))))
  for (const l of lists) l.style.setProperty('--uil-name-col', `${widest}px`)
}

onMounted(() => {
  if (typeof ResizeObserver === 'undefined' || !legend.value) return
  if (legend.value.querySelectorAll('.n-uilist').length < 2) return
  lister = new ResizeObserver(([entry]) => {
    const width = entry.contentRect.width
    if (width && width !== legendWidth) {
      legendWidth = width
      alignLists()
    }
  })
  lister.observe(legend.value)
  document.fonts?.ready.then(alignLists)
})

onBeforeUnmount(() => {
  lister?.disconnect()
  removeEventListener('resize', fitStrip)
})

/** A click on a region with no link: light its row and bring it into view if it's out of view. */
async function pick(n) {
  active.value = n
  const el = spots.value.find((s) => s.n === n)?.el?.()
  if (!el) return
  // A row in a closed <Tab> has no box: open its tab first.
  if (!el.getClientRects().length) {
    const pane = el.closest('.n-tabs__panel > div')
    const i = pane ? [...pane.parentElement.children].indexOf(pane) : -1
    const tab = pane?.closest('.n-tabs')?.querySelectorAll('.n-tabs__tab')[i]
    if (!tab) return
    // The legend changes height, which can move the image under the pointer.
    holdWhileScrolling()
    tab.click()
    await nextTick()
  }
  const r = el.getBoundingClientRect()
  // Below the sticky chrome: the breadcrumb strip, or the nav bar without it.
  // Full screen, the view covers both, so only its own top counts, and on a
  // phone the image that stays over the legend counts too.
  const bar = document.querySelector('.n-pagebar') || document.querySelector('.n-navbar')
  const shot = root.value.querySelector('.n-shotrow__shot')
  const s = shot.getBoundingClientRect()
  const sticky = getComputedStyle(shot).position === 'sticky'
  let top = view.focused.value
    ? root.value.getBoundingClientRect().top
    : (bar ? bar.getBoundingClientRect().bottom : 56) + 24
  if (sticky && r.left < s.right) top = Math.max(top, s.bottom)
  if (r.top < top || r.bottom > window.innerHeight) {
    holdWhileScrolling()
    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    await nextTick()
    const parts = [...root.value.querySelectorAll('.hotshot__spot.is-active')].map((p) => p.getBoundingClientRect())
    // A sticky image stays put, so the row comes to the middle. One that
    // scrolls with the page is above the row, so a row below the window comes
    // up only as far as it must, and never so far that the part just tapped
    // goes under the bar at the top. When the two don't fit together, the part
    // stays just under the bar, with as much of the legend below it as fits.
    if (!view.focused.value && !sticky && r.top >= top && parts.length) {
      const room = Math.min(...parts.map((p) => p.top)) - (top - 24)
      const rest = r.bottom - innerHeight
      const by = rest <= room ? Math.min(rest + 16, Math.max(room - 8, rest)) : room - 8
      window.scrollBy({ top: Math.max(0, by), behavior })
    } else {
      el.scrollIntoView({ block: sticky || r.top < top ? 'center' : 'nearest', behavior })
    }
  }
}
</script>

<template>
  <div
    class="n-shotrow-hold"
    :style="{ '--shot-ar': Number.isFinite(ar) ? ar.toFixed(4) : undefined, height: view.focused.value ? `${view.holdHeight.value}px` : undefined }"
  >
    <div
      ref="root"
      class="n-shotrow"
      :class="{ 'is-wide': wide, 'is-fswide': fsWide, 'is-tall': tall, 'is-stack': stack, 'is-focus': view.focused.value, 'is-strip': strip, 'is-pan': pan, 'is-fit': fit, 'has-spots': spots.length > 0 }"
      :role="view.focused.value ? 'dialog' : undefined"
      :aria-modal="view.focused.value ? 'true' : undefined"
      :aria-label="(view.focused.value && alt) || undefined"
      @click.capture="view.onClick"
    >
      <button class="n-focus-close" type="button" aria-label="Close" @click="view.close">
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
      </button>
      <div class="n-shotrow__grid">
        <div class="n-shotrow__shot">
          <div
            ref="scroller"
            class="n-shotrow__scroll"
            :class="{ 'more-left': more.left, 'more-right': more.right }"
            :tabindex="strip || pan ? 0 : undefined"
            :role="strip || pan ? 'region' : undefined"
            :aria-label="strip || pan ? `${alt || 'Screenshot'}, scrolls sideways` : undefined"
            @scroll.passive="edges"
          >
            <HotShot
              :src="src"
              :alt="alt"
              :crop="crop"
              :spots="spots"
              :active="active"
              :focus="view.focused.value"
              @enter="enter"
              @leave="leave"
              @open="view.open"
              @pick="pick"
            />
          </div>
          <p v-if="strip || pan" class="n-shotrow__hint" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="14" height="14"><path d="M7 8l-4 4 4 4M17 8l4 4-4 4M3 12h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            Scrolls sideways
          </p>
        </div>
        <div ref="legend" class="n-shotrow__legend"><slot /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.n-shotrow-hold {
  container: shotrow / inline-size;
  margin: 20px 0 32px;
}

.n-focus-close {
  display: none;
}

.n-shotrow__legend {
  container: shotlegend / inline-size;
  min-width: 0;
}

.n-shotrow__legend > :deep(:first-child) {
  margin-top: 0;
}

.n-shotrow__legend > :deep(:last-child) {
  margin-bottom: 0;
}

/* Stacked, the legend follows the image. */
.n-shotrow__legend {
  margin-top: 16px;
}

/* The legend column is narrower than the page, so cards go one per row,
   two when it's wide, and button names may wrap. */
.n-shotrow__legend :deep(.n-icongrid),
.n-shotrow__legend :deep(.n-icongrid.cols-3) {
  grid-template-columns: 1fr;
}

@container shotlegend (min-width: 620px) {
  .n-shotrow__legend :deep(.n-icongrid),
  .n-shotrow__legend :deep(.n-icongrid.cols-3) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

/* Beside a screenshot the legend stays compact, so it runs about as tall as
   the image instead of well past it. */
.n-shotrow__legend :deep(.n-uilist-hold) {
  margin: 10px 0 14px;
}

.n-shotrow__legend :deep(.n-uilist) {
  --uil-mark: 1.75rem;
  column-gap: 10px;
  row-gap: 0;
  padding: 4px;
}

.n-shotrow__legend :deep(.n-uiitem__row) {
  padding: 4px 8px;
}

.n-shotrow__legend :deep(.n-uiitem__name) {
  font-size: 0.875rem;
}

.n-shotrow__legend :deep(.n-uiitem__name.is-textbutton) {
  padding: 0 8px;
  font-size: 0.8125rem;
}

.n-shotrow__legend :deep(.n-uiitem__desc) {
  font-size: 0.8125rem;
  line-height: 1.45;
}

/* Less padding too, so the glyph stays the size it is in a plain legend. */
.n-shotrow__legend :deep(.n-uiitem .n-appicon.is-button) {
  width: 1.75rem;
  height: 1.75rem;
  padding: 0.4rem;
}

/* The name beside an icon matches the smaller icon here. */
.n-shotrow__legend :deep(.n-uiitem__name:not(.is-textbutton)) {
  min-height: 1.75rem;
}

.n-shotrow__legend > :deep(p) {
  margin: 8px 0;
  font-size: 0.9375rem;
  line-height: 1.55;
}

/* A list or <Steps> in a legend matches the paragraphs beside it. */
.n-shotrow__legend > :deep(ul),
.n-shotrow__legend > :deep(ol),
.n-shotrow__legend > :deep(.n-steps) {
  font-size: 0.9375rem;
  line-height: 1.55;
}

.n-shotrow__legend > :deep(.n-steps p),
.n-shotrow__legend > :deep(ol li > p),
.n-shotrow__legend > :deep(ul li > p) {
  line-height: inherit;
}

/* With `stack`, the image sits in the middle of the column, short enough to
   see whole, and the legend keeps to the width of the text around it. */
.n-shotrow.is-stack:not(.is-focus) .n-shotrow__shot {
  --hotshot-maxh: min(70vh, 640px);
}

/* An image that would reach less than 36px past the text column on each side
   keeps to the column, so its edges line up with the text and the legend. A
   wider one still takes the room beside the column. */
.n-shotrow.is-stack:not(.is-focus) :deep(.hotshot) {
  --shot-w: min(var(--hotshot-shown), 100%, calc((var(--hotshot-maxh, 100000px) - 2px) * var(--hotshot-ar) + 2px));
  --shot-col: calc(var(--n-content-max) - 2 * var(--n-gutter));
  max-width: max(min(var(--shot-w), var(--shot-col)), min(var(--shot-w), (var(--shot-w) - var(--shot-col) - 72px) * 1000));
  margin-inline: auto;
}

.n-shotrow.is-stack:not(.is-focus) .n-shotrow__legend {
  max-width: calc(var(--n-content-max) - 2 * var(--n-gutter));
  margin-inline: auto;
}

/* A wide image narrower than the column sits in the middle of it, at every
   width, like a stacked one. */
.n-shotrow.is-wide:not(.is-focus) :deep(.hotshot) {
  margin-inline: auto;
}

/* Stacked on a phone, a tall panel stays short enough to see whole, in the
   middle of the column, so a part of it and its legend row fit on screen
   together. */
@container shotrow (width < 600px) {
  .n-shotrow:not(.is-focus, .is-stack, .is-wide) .n-shotrow__shot {
    --hotshot-maxh: min(70vh, 640px);
  }

  .n-shotrow:not(.is-focus, .is-stack, .is-wide) :deep(.hotshot) {
    margin-inline: auto;
  }
}

/* Side by side once there's room for both: about 46% for the image. */
@container shotrow (min-width: 600px) {
  .n-shotrow:not(.is-wide, .is-stack) .n-shotrow__grid,
  .n-shotrow.is-focus:not(.is-fswide) .n-shotrow__grid {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
    grid-template-areas: 'shot legend';
    align-items: start;
    gap: 28px;
  }

  .n-shotrow:not(.is-wide, .is-stack) .n-shotrow__legend,
  .n-shotrow.is-focus:not(.is-fswide) .n-shotrow__legend {
    grid-area: legend;
    margin-top: 0;
  }

  .n-shotrow:not(.is-wide, .is-stack) .n-shotrow__shot,
  .n-shotrow.is-focus:not(.is-fswide) .n-shotrow__shot {
    grid-area: shot;
    position: sticky;
    /* Clears the nav bar and the breadcrumb strip under it. */
    top: calc(var(--n-nav-height) + var(--n-pagebar-space) + 20px);
    margin: 0;
    /* A tall panel stays short enough to see whole beside the legend. */
    --hotshot-maxh: calc(100vh - var(--n-nav-height) - var(--n-pagebar-space) - 60px);
  }

  /* A narrow or tall image sits against its legend, so each row's region
     stays close to the row that lights it. */
  .n-shotrow:not(.is-wide, .is-stack, .is-focus) .n-shotrow__shot :deep(.hotshot) {
    margin-left: auto;
  }
}

/* Full screen: the image as large as the window allows, the legend beside it. */
.n-shotrow.is-focus {
  position: fixed;
  inset: 0;
  z-index: 200;
  padding: 56px max(24px, 3vw) 32px;
  overflow: auto;
  background: var(--n-bg);
  --hotshot-cap: 4000px;
}

.n-shotrow.is-focus .n-focus-close {
  position: fixed;
  top: 12px;
  right: 16px;
  z-index: 3;
  display: flex;
  padding: 8px;
  border: 1px solid var(--n-border);
  border-radius: 999px;
  background: var(--n-surface);
  color: var(--n-text);
  cursor: pointer;
}

/* On a phone the full-screen view opens on the image, with the legend under
   it. So does a wide image at any size (`is-fswide`): it stays short enough
   that a legend of a few rows fits under it in the window, and a long legend
   scrolls. */
.n-shotrow.is-focus.is-fswide .n-shotrow__shot {
  --hotshot-maxh: max(50vh, 100vh - 300px);
}

.n-shotrow.is-focus.is-fswide :deep(.hotshot) {
  margin-inline: auto;
}

/* On a tall phone the image stays at the top of the full-screen view while a
   long legend scrolls under it, so a lit part stays in sight. A tall panel
   would come out smaller there than in the page, so it scrolls as before. */
@media (max-width: 599.98px) and (min-height: 700px) {
  .n-shotrow.is-focus:not(.is-wide, .is-tall) .n-shotrow__shot {
    position: sticky;
    top: -56px;
    z-index: 1;
    margin-top: -56px;
    padding: 56px 0 8px;
    background: var(--n-bg);
    --hotshot-maxh: 45vh;
  }
}

/* Much wider than the screen: a readable height, up to the image's own size,
   in a strip that runs to the screen's edges and scrolls sideways. */
.n-shotrow.is-strip .n-shotrow__shot {
  margin-inline: calc(-1 * max(24px, 3vw));
}

.n-shotrow.is-strip .n-shotrow__scroll {
  padding: 4px max(24px, 3vw) 6px;
  overflow-x: auto;
  overscroll-behavior-x: contain;
}

.n-shotrow:is(.is-strip, .is-pan) .n-shotrow__scroll {
  --fade: 32px;
}

.n-shotrow:is(.is-strip, .is-pan) .n-shotrow__scroll.more-right {
  mask-image: linear-gradient(to left, transparent, #000 var(--fade));
}

.n-shotrow:is(.is-strip, .is-pan) .n-shotrow__scroll.more-left {
  mask-image: linear-gradient(to right, transparent, #000 var(--fade));
}

.n-shotrow:is(.is-strip, .is-pan) .n-shotrow__scroll.more-left.more-right {
  mask-image: linear-gradient(to right, transparent, #000 var(--fade), #000 calc(100% - var(--fade)), transparent);
}

.n-shotrow:is(.is-strip, .is-pan) .n-shotrow__scroll:focus-visible {
  outline: 2px solid var(--n-accent);
  outline-offset: -2px;
  mask-image: none;
}

/* With no padding round the image, a ring inside it would be under the
   image, so it goes just outside. */
.n-shotrow.is-pan .n-shotrow__scroll:focus-visible {
  outline-offset: 2px;
}

.n-shotrow.is-strip :deep(.hotshot) {
  width: min(var(--hotshot-shown), 60vh * var(--hotshot-ar));
  max-width: none;
  margin-inline: 0;
}

.n-shotrow__hint {
  display: flex;
  align-items: center;
  gap: 6px;
  margin: 4px max(24px, 3vw) 0;
  color: var(--n-text-muted);
  font-size: var(--n-text-xs);
}

/* Outside the strip, the image and its hint keep to the column. */
.n-shotrow.is-pan .n-shotrow__hint {
  margin-inline: 0;
}

@container shotrow (min-width: 600px) {
  /* The image's column is as wide as the image at full height, so a tall
     panel sits next to its legend, and the two are centered together. A
     landscape shot gets up to about two thirds of the row. */
  .n-shotrow.is-focus:not(.is-fswide) .n-shotrow__grid {
    grid-template-columns:
      min(calc((100vh - 100px) * var(--shot-ar, 1)), 63%, 100% - 18rem - 40px)
      minmax(18rem, 34rem);
    justify-content: center;
    column-gap: 40px;
  }

  .n-shotrow.is-focus:not(.is-fswide) .n-shotrow__shot {
    top: 0;
    --hotshot-maxh: calc(100vh - 100px);
  }

  /* A tall panel fills only part of its column, so it sits in the middle. */
  .n-shotrow.is-focus:not(.is-fswide) :deep(.hotshot) {
    margin-inline: auto;
  }
}

/* On a phone, full screen shows the image larger than the page can: up to
   2.5 screens wide, as long as it stays short enough for the window, and the
   image scrolls sideways (fitPan() in the script). A tall panel stays as it
   is, and a wide image in the strip scrolls in the strip. */
@media (max-width: 639px) {
  .n-shotrow.is-focus:not(.is-strip, .is-tall) .n-shotrow__scroll {
    overflow-x: auto;
    overscroll-behavior-x: contain;
  }

  .n-shotrow.is-focus:not(.is-strip, .is-tall) .n-shotrow__shot :deep(.hotshot) {
    width: max(100%, min(var(--hotshot-shown), 250vw, (var(--hotshot-maxh, 100vh - 120px)) * var(--hotshot-ar)));
    max-width: none;
  }

  .n-shotrow.is-focus.is-fit .n-shotrow__shot :deep(.hotshot) {
    width: 100%;
  }
}
</style>
