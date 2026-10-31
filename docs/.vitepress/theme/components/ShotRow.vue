<script setup>
/**
 * A screenshot beside its legend: the image on the left and the icons and
 * what they do on the right, once the column is wide enough. On a narrow
 * screen the legend comes first and the image follows. The image stays in
 * view while a long legend scrolls past.
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
 *   <ShotRow src="nanome-v2/v2-7/settings-tab.webp" alt="The Settings tab">
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
  enter,
  leave,
})

const root = ref(null)
const view = useFocusView(root)

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
      :class="{ 'is-wide': wide, 'is-focus': view.focused.value, 'has-spots': spots.length > 0 }"
      :role="view.focused.value ? 'dialog' : undefined"
      :aria-modal="view.focused.value ? 'true' : undefined"
      :aria-label="(view.focused.value && alt) || undefined"
      @click.capture="view.onClick"
    >
      <button class="n-focus-close" type="button" aria-label="Close" @click="view.close">
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
      </button>
      <div class="n-shotrow__grid">
        <div class="n-shotrow__legend"><slot /></div>
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

.n-shotrow__shot {
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

/* Side by side once there's room for both: about 46% for the image. */
@container shotrow (min-width: 600px) {
  .n-shotrow:not(.is-wide) .n-shotrow__grid {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
    grid-template-areas: 'shot legend';
    align-items: start;
    gap: 28px;
  }

  .n-shotrow:not(.is-wide) .n-shotrow__legend {
    grid-area: legend;
  }

  .n-shotrow:not(.is-wide) .n-shotrow__shot {
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
  z-index: 1;
  display: flex;
  padding: 8px;
  border: 1px solid var(--n-border);
  border-radius: 999px;
  background: var(--n-surface);
  color: var(--n-text);
  cursor: pointer;
}

/* On a phone the full-screen view opens on the image, with the legend under it. */
@container shotrow (max-width: 599.98px) {
  .n-shotrow.is-focus .n-shotrow__grid {
    display: flex;
    flex-direction: column;
  }

  .n-shotrow.is-focus .n-shotrow__shot {
    order: -1;
    margin: 0 0 16px;
  }
}

/* So does a wide image at any size. It stays short enough that a legend of a
   few rows fits under it in the window, and a long legend scrolls. */
.n-shotrow.is-focus.is-wide .n-shotrow__grid {
  display: flex;
  flex-direction: column;
}

.n-shotrow.is-focus.is-wide .n-shotrow__shot {
  order: -1;
  margin: 0 0 16px;
  --hotshot-maxh: max(50vh, 100vh - 300px);
}

.n-shotrow.is-focus.is-wide :deep(.hotshot) {
  margin-inline: auto;
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
