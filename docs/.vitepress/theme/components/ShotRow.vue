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
 * A wide image (about 2:1 or wider), such as a sequence strip, stays full
 * width under its legend, since it can't be read at a third of the page.
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

const wide = computed(() => {
  const [w, h] = imageInfo(props.src).size || []
  const [, , cw, ch] = parseBox(props.crop) || [0, 0, 100, 100]
  return (w * cw) / (h * ch) > 1.9
})

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
  addEventListener('scrollend', end, { once: true })
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
    reveal(n)
  },
  leave,
})

const root = ref(null)
const view = useFocusView(root)

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

function edges() {
  const el = scroller.value
  more.value =
    strip.value && el
      ? { left: el.scrollLeft > 1, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1 }
      : { left: false, right: false }
}

function fitStrip() {
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
  nextTick(edges)
}

watch(view.focused, (on) => {
  if (on) addEventListener('resize', fitStrip)
  else removeEventListener('resize', fitStrip)
  fitStrip()
})

/** In the strip, a region lit from its legend row slides into view. */
function reveal(n) {
  const el = scroller.value
  const spot = strip.value && spots.value.find((s) => s.n === n)
  const frame = spot && el?.querySelector('.hotshot__frame')
  if (!frame) return
  const [cx, , cw] = parseBox(props.crop) || [0, 0, 100, 100]
  const from = frame.getBoundingClientRect().left - el.getBoundingClientRect().left + el.scrollLeft
  const start = from + ((spot.box[0] - cx) / cw) * frame.clientWidth
  const end = start + (spot.box[2] / cw) * frame.clientWidth
  if (start >= el.scrollLeft && end <= el.scrollLeft + el.clientWidth) return
  const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  el.scrollTo({ left: (start + end - el.clientWidth) / 2, behavior })
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

/** A click on a region with no link: light its row and bring it into view. */
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
  const bar = document.querySelector('.n-pagebar') || document.querySelector('.n-navbar')
  const chrome = bar ? bar.getBoundingClientRect().bottom : 56
  if (r.top < chrome + 24 || r.bottom > window.innerHeight) {
    holdWhileScrolling()
    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    el.scrollIntoView({ block: 'center', behavior })
  }
}
</script>

<template>
  <div class="n-shotrow-hold" :style="view.focused.value ? { height: `${view.holdHeight.value}px` } : null">
    <div
      ref="root"
      class="n-shotrow"
      :class="{ 'is-wide': wide, 'is-stack': stack, 'is-focus': view.focused.value, 'is-strip': strip, 'has-spots': spots.length > 0 }"
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
            :tabindex="strip ? 0 : undefined"
            :role="strip ? 'region' : undefined"
            :aria-label="strip ? `${alt || 'Screenshot'}, scrolls sideways` : undefined"
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
          <p v-if="strip" class="n-shotrow__hint" aria-hidden="true">
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

.n-shotrow__legend :deep(.n-uiitem .n-appicon.is-button) {
  width: 1.75rem;
  height: 1.75rem;
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

.n-shotrow__legend > :deep(.n-steps p) {
  line-height: inherit;
}

/* With `stack`, the image sits in the middle of the column, short enough to
   see whole, and the legend keeps to the width of the text around it. */
.n-shotrow.is-stack:not(.is-focus) .n-shotrow__shot {
  --hotshot-maxh: min(70vh, 640px);
}

.n-shotrow.is-stack:not(.is-focus) :deep(.hotshot) {
  margin-inline: auto;
}

.n-shotrow.is-stack:not(.is-focus) .n-shotrow__legend {
  max-width: calc(var(--n-content-max) - 2 * var(--n-gutter));
  margin-inline: auto;
}

/* Side by side once there's room for both: about 46% for the image. */
@container shotrow (min-width: 600px) {
  .n-shotrow:not(.is-wide, .is-stack) .n-shotrow__grid,
  .n-shotrow.is-focus:not(.is-wide) .n-shotrow__grid {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
    grid-template-areas: 'shot legend';
    align-items: start;
    gap: 28px;
  }

  .n-shotrow:not(.is-wide, .is-stack) .n-shotrow__legend,
  .n-shotrow.is-focus:not(.is-wide) .n-shotrow__legend {
    grid-area: legend;
    margin-top: 0;
  }

  .n-shotrow:not(.is-wide, .is-stack) .n-shotrow__shot,
  .n-shotrow.is-focus:not(.is-wide) .n-shotrow__shot {
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
   it. So does a wide image at any size: it stays short enough that a legend of
   a few rows fits under it in the window, and a long legend scrolls. */
.n-shotrow.is-focus.is-wide .n-shotrow__shot {
  --hotshot-maxh: max(50vh, 100vh - 300px);
}

.n-shotrow.is-focus.is-wide :deep(.hotshot) {
  margin-inline: auto;
}

/* Much wider than the screen: a readable height, up to the image's own size,
   in a strip that runs to the screen's edges and scrolls sideways. */
.n-shotrow.is-strip .n-shotrow__shot {
  margin-inline: calc(-1 * max(24px, 3vw));
}

.n-shotrow.is-strip .n-shotrow__scroll {
  --fade: 32px;
  padding: 4px max(24px, 3vw) 6px;
  overflow-x: auto;
  overscroll-behavior-x: contain;
}

.n-shotrow.is-strip .n-shotrow__scroll.more-right {
  mask-image: linear-gradient(to left, transparent, #000 var(--fade));
}

.n-shotrow.is-strip .n-shotrow__scroll.more-left {
  mask-image: linear-gradient(to right, transparent, #000 var(--fade));
}

.n-shotrow.is-strip .n-shotrow__scroll.more-left.more-right {
  mask-image: linear-gradient(to right, transparent, #000 var(--fade), #000 calc(100% - var(--fade)), transparent);
}

.n-shotrow.is-strip .n-shotrow__scroll:focus-visible {
  outline: 2px solid var(--n-accent);
  outline-offset: -2px;
  mask-image: none;
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

@container shotrow (min-width: 600px) {
  .n-shotrow.is-focus:not(.is-wide) .n-shotrow__grid {
    grid-template-columns: minmax(0, 1.7fr) minmax(18rem, 1fr);
    max-width: 1600px;
    margin: 0 auto;
  }

  .n-shotrow.is-focus:not(.is-wide) .n-shotrow__shot {
    top: 0;
    --hotshot-maxh: calc(100vh - 100px);
  }

  /* A tall panel fills only part of its column, so it sits in the middle. */
  .n-shotrow.is-focus:not(.is-wide) :deep(.hotshot) {
    margin-inline: auto;
  }
}
</style>
