<template>
  <div>
    <div class="vimg" :class="{ 'has-dark': !!info.dark }" :style="box">
      <img
        class="vimg__light"
        :src="info.light"
        :data-zoom-src="info.zoom"
        :alt="alt"
        :width="info.size?.[0]"
        :height="info.size?.[1]"
        :style="ratio(info.size)"
        loading="lazy"
        decoding="async"
        v-bind="playable"
        @keydown.enter.prevent="play"
        @keydown.space.prevent="play"
      />
      <img
        v-if="info.dark"
        class="vimg__dark"
        :src="info.dark"
        :data-zoom-src="info.darkZoom"
        :alt="alt"
        :width="info.darkSize?.[0]"
        :height="info.darkSize?.[1]"
        :style="ratio(info.darkSize)"
        loading="lazy"
        decoding="async"
        v-bind="playable"
        @keydown.enter.prevent="play"
        @keydown.space.prevent="play"
      />
      <div v-if="info.isGif" class="vimg__play-btn">&#9654;</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { imageInfo } from './image.js'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    default: ''
  }
})

// The web copy (up to 1600px wide), the dark twin when there is one, and the
// copy's size. scripts/compress.js writes them all.
const info = computed(() => imageInfo(props.src))

// A GIF shows a still until it's opened, so the keyboard needs a way in too:
// Enter or Space clicks it, which is what medium-zoom listens for.
const playable = computed(() =>
  info.value.isGif
    ? { tabindex: 0, role: 'button', 'aria-label': `${props.alt || 'Animation'}. Play` }
    : {}
)

// medium-zoom hides the image while it's open, which drops focus, so hand it
// back on close.
function play(event) {
  if (!info.value.isGif || event.repeat) return
  const img = event.currentTarget
  img.addEventListener('medium-zoom:closed', () => img.focus({ preventScroll: true }), { once: true })
  img.click()
}

// The image shows at its on-screen width (half the pixels of a 2x screenshot),
// and the copy's width and height hold its space before it loads, so a link to
// a heading lower down lands on it.
const box = computed(() => {
  const { shown, size } = info.value
  return {
    ...(shown ? { '--vimg-w': `${shown}px` } : {}),
    ...(size ? { '--vimg-ar': (size[0] / size[1]).toFixed(4) } : {}),
  }
})

function ratio(wh) {
  return wh ? { aspectRatio: `${wh[0]} / ${wh[1]}` } : null
}
</script>

<style scoped>
.vimg {
  position: relative;
  max-width: var(--vimg-w, 100%);
}

/* The width and height attributes size the image before it loads, in a table
   cell too; max-width (base.css) keeps it inside the column. */
.vimg > img {
  height: auto;
}

.vimg__play-btn {
  position: absolute;
  pointer-events: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 7rem;
  text-shadow: 0 0 10px black;
}

/* A phone-width thumbnail keeps most of its picture in view. */
@media (max-width: 767px) {
  .vimg__play-btn {
    font-size: 3.5rem;
  }
}
</style>

<!-- Unscoped, because these rules follow the .dark class on <html>, which is
     outside this component (scoped :global() would drop the rest of the selector). -->
<style>
/* Both versions are in the page; only the one for the current theme shows,
   and the hidden one is never fetched because it is lazy and not rendered. */
.vimg.has-dark .vimg__dark {
  display: none;
}

.dark .vimg.has-dark .vimg__light {
  display: none;
}

.dark .vimg.has-dark .vimg__dark {
  display: block;
}
</style>
