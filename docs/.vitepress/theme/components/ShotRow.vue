<script setup>
/**
 * A screenshot beside its legend: the image on the left and the icons and
 * what they do on the right, once the column is wide enough. On a narrow
 * screen the legend comes first and the image follows. The image stays in
 * view while a long legend scrolls past.
 *
 * A legend row (<UiItem>) or card (<IconCard>) with an `area` ("x,y,w,h",
 * percent of the image) lights up that part of the image while it's hovered,
 * and hovering the image lights up the row. Clicking the image opens it full
 * screen with the legend beside it.
 *
 * A very wide image, such as a sequence strip, stays full width under its
 * legend, since it can't be read at a third of the page.
 *
 *   <ShotRow src="nanome-v2/v2-7/settings-tab.webp" alt="The Settings tab">
 *
 *   <UiList>
 *   <UiItem icon="moon" name="Night mode" area="6,13,6,8">…</UiItem>
 *   </UiList>
 *
 *   </ShotRow>
 */
import { computed, provide, ref } from 'vue'
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
  return (w * cw) / (h * ch) > 2.2
})

// Legend rows with an area register here, in page order, and get a number
// for the pins shown on a narrow screen.
const spots = ref([])
let next = 0
const active = ref(0)

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
    active.value = n
  },
  leave(n) {
    if (active.value === n) active.value = 0
  },
})

const root = ref(null)
const view = useFocusView(root)
</script>

<template>
  <div class="n-shotrow-hold" :style="view.focused.value ? { height: `${view.holdHeight.value}px` } : null">
    <div
      ref="root"
      class="n-shotrow"
      :class="{ 'is-wide': wide, 'is-focus': view.focused.value, 'has-spots': spots.length > 0 }"
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
            @enter="(n) => (active = n)"
            @leave="(n) => active === n && (active = 0)"
            @open="view.open"
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

.n-shotrow__legend :deep(.n-uiitem__name) {
  white-space: normal;
}

/* Narrow: pins on the image and numbers on the rows tie the two together. */
.n-shotrow :deep(.hotshot__pin),
.n-shotrow :deep(.n-uiitem__num),
.n-shotrow :deep(.n-iconcard__num) {
  display: flex;
}

/* Side by side once there's room for both: about 40% for the image. */
@container shotrow (min-width: 600px) {
  .n-shotrow:not(.is-wide) .n-shotrow__grid {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
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
    top: calc(var(--n-nav-height) + 20px);
    margin: 0;
    /* A tall panel stays short enough to see whole beside the legend. */
    --hotshot-maxh: calc(100vh - var(--n-nav-height) - 60px);
  }

  .n-shotrow:not(.is-wide) :deep(.hotshot__pin),
  .n-shotrow:not(.is-wide) :deep(.n-uiitem__num),
  .n-shotrow:not(.is-wide) :deep(.n-iconcard__num) {
    display: none;
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
}
</style>
