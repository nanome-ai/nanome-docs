<template>
  <div>
    <div class="vimg" :class="{ 'has-dark': !!darkSrc }" :style="box">
      <img
        class="vimg__light"
        :src="`/assets/compressed/${toCopy(src)}`"
        :data-zoom-src="`/assets/original/${src}`"
        :alt="alt"
        :width="size?.[0]"
        :height="size?.[1]"
        :style="ratio(size)"
        loading="lazy"
        decoding="async"
      />
      <img
        v-if="darkSrc"
        class="vimg__dark"
        :src="`/assets/compressed/${toCopy(darkSrc)}`"
        :data-zoom-src="`/assets/original/${darkSrc}`"
        :alt="alt"
        :width="darkSize?.[0]"
        :height="darkSize?.[1]"
        :style="ratio(darkSize)"
        loading="lazy"
        decoding="async"
      />
      <div v-if="isGif" class="vimg__play-btn">&#9654;</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import variants from '../image-variants.json'
import widths from '../image-widths.json'
import sizes from '../image-sizes.json'

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

const isGif = computed(() => {
  return props.src.lastIndexOf('.gif') !== -1
})

// scripts/compress.js writes a WebP copy, up to 1600px wide, for every
// original, and records which images have a `.dark` twin for dark mode.
const darkSrc = computed(() => variants[props.src] || '')

// The copy's width and height, so the page holds the image's space before it
// loads and a link to a heading lower down lands on it.
const size = computed(() => sizes[props.src])
const darkSize = computed(() => sizes[darkSrc.value])

// 2x screenshots show at half their pixel width, the size they are on screen;
// other images at most at the width of their copy.
const box = computed(() => {
  const [w, h] = size.value || []
  const shown = widths[props.src] ? Math.round(widths[props.src] / 2) : w
  return {
    ...(shown ? { '--vimg-w': `${shown}px` } : {}),
    ...(w ? { '--vimg-ar': (w / h).toFixed(4) } : {}),
  }
})

function ratio(wh) {
  return wh ? { aspectRatio: `${wh[0]} / ${wh[1]}` } : null
}

function toCopy(src) {
  return src.substr(0, src.lastIndexOf('.')) + '.webp'
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
