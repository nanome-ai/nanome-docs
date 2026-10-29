<script setup>
/**
 * A screenshot beside its legend: the image on the left and the icons and
 * what they do on the right, once the column is wide enough. On a narrow
 * screen the legend comes first and the image follows. The image stays in
 * view while a long legend scrolls past, and opens full size on click.
 * A very wide image, such as a sequence strip, stays full width under its
 * legend, since it can't be read at a third of the page.
 *
 *   <ShotRow src="nanome-v2/v2-7/settings-tab.webp" alt="The Settings tab">
 *
 *   <UiList>…</UiList>
 *
 *   </ShotRow>
 */
import { computed } from 'vue'
import Vimg from './Vimg.vue'
import sizes from '../image-sizes.json'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
})

const wide = computed(() => {
  const [w, h] = sizes[props.src] || []
  return w / h > 2.2
})
</script>

<template>
  <div class="n-shotrow" :class="{ 'is-wide': wide }">
    <div class="n-shotrow__grid">
      <div class="n-shotrow__legend"><slot /></div>
      <div class="n-shotrow__shot"><Vimg :src="src" :alt="alt" /></div>
    </div>
  </div>
</template>

<style scoped>
.n-shotrow {
  container-type: inline-size;
  margin: 20px 0 32px;
}

.n-shotrow__legend {
  container-type: inline-size;
  min-width: 0;
}

.n-shotrow__legend > :deep(:first-child) {
  margin-top: 0;
}

.n-shotrow__legend > :deep(:last-child) {
  margin-bottom: 0;
}

.n-shotrow__shot :deep(img) {
  margin: 16px 0 0;
  cursor: zoom-in;
}

/* Side by side once there's room for both: about 40% for the image. */
@container (min-width: 600px) {
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
  }

  .n-shotrow:not(.is-wide) .n-shotrow__shot :deep(img) {
    margin: 0;
  }

  /* A tall panel stays short enough to see whole beside the legend. */
  .n-shotrow:not(.is-wide) .n-shotrow__shot :deep(.vimg) {
    max-width: min(var(--vimg-w, 100%), calc((100vh - var(--n-nav-height) - 60px) * var(--vimg-ar, 1)));
  }

  .n-shotrow:not(.is-wide) .n-shotrow__shot :deep(.vimg__play-btn) {
    font-size: 3rem;
  }
}

/* The legend column is narrower than the page, so cards go one per row,
   two when it's wide, and button names may wrap. */
.n-shotrow__legend :deep(.n-icongrid),
.n-shotrow__legend :deep(.n-icongrid.cols-3) {
  grid-template-columns: 1fr;
}

@container (min-width: 620px) {
  .n-shotrow__legend :deep(.n-icongrid),
  .n-shotrow__legend :deep(.n-icongrid.cols-3) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.n-shotrow__legend :deep(.n-uiitem__name) {
  white-space: normal;
}
</style>
