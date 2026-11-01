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
 * Full screen it comes first, with the legend under it.
 *
 *   <ShotRow src="nanome-v2/v2-7/settings-tab.webp" alt="The Settings tab" stack>
 *
 *   <UiList>
 *   <UiItem icon="moon" name="Night mode" area="6,13,6,8">…</UiItem>
 *   </UiList>
 *
 *   </ShotRow>
 */
import { computed, nextTick, provide, ref } from 'vue'
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

const wide = computed(() => ar.value > 1.9)
// A tall panel: kept under half a phone screen high, it's narrower than the screen.
const tall = computed(() => ar.value < 0.9)

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
    reveal()
  },
  leave,
})

const root = ref(null)
const view = useFocusView(root)

/**
 * Full screen on a phone, an image wider than the window pans sideways, so a
 * legend row can light a part that's out of view. Pan the image to it.
 */
async function reveal() {
  if (!view.focused.value) return
  await nextTick()
  const shot = root.value?.querySelector('.n-shotrow__shot')
  const parts = [...(shot?.querySelectorAll('.hotshot__spot.is-active') || [])].map((el) => el.getBoundingClientRect())
  if (!parts.length || shot.scrollWidth <= shot.clientWidth) return
  const s = shot.getBoundingClientRect()
  const left = Math.min(...parts.map((r) => r.left))
  const right = Math.max(...parts.map((r) => r.right))
  if (left >= s.left && right <= s.right) return
  const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
  shot.scrollBy({ left: (left + right) / 2 - (s.left + s.right) / 2, behavior })
}

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
    // A sticky image stays put, so the row comes to the middle. One that
    // scrolls with the page is above the row, so a row below the window comes
    // up only as far as it must, and as much of the image as can stays in view.
    el.scrollIntoView({ block: sticky || r.top < top ? 'center' : 'nearest', behavior })
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
      :class="{ 'is-wide': wide, 'is-tall': tall, 'is-stack': stack, 'is-focus': view.focused.value, 'has-spots': spots.length > 0 }"
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
        <div class="n-shotrow__legend"><slot /></div>
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
  z-index: 2;
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

@container shotrow (min-width: 600px) {
  /* The image's column is as wide as the image at full height, so a tall
     panel sits next to its legend, and the two are centered together. A
     landscape shot gets up to about two thirds of the row. */
  .n-shotrow.is-focus:not(.is-wide) .n-shotrow__grid {
    grid-template-columns:
      min(calc((100vh - 100px) * var(--shot-ar, 1)), 63%, 100% - 18rem - 40px)
      minmax(18rem, 34rem);
    justify-content: center;
    column-gap: 40px;
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

/* On a phone, full screen shows the image larger than the page can: up to
   2.5 screens wide, as long as it stays short enough for the window, and the
   image scrolls sideways. A tall panel stays as it is. */
@media (max-width: 639px) {
  .n-shotrow.is-focus .n-shotrow__shot {
    overflow-x: auto;
  }

  .n-shotrow.is-focus .n-shotrow__shot :deep(.hotshot) {
    width: max(100%, min(var(--hotshot-shown), 250vw, (var(--hotshot-maxh, 100vh - 120px)) * var(--hotshot-ar)));
    max-width: none;
  }
}
</style>
