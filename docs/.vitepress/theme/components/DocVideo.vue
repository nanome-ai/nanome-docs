<template>
  <figure class="doc-video">
    <video
      ref="video"
      :src="`/assets/videos/${src}`"
      :poster="poster ? `/assets/videos/${poster}` : undefined"
      loop
      muted
      playsinline
      controls
      preload="none"
      :style="{ aspectRatio: SIZES[src] || '16 / 9' }"
    ></video>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

// Frame sizes of the videos that aren't 16:9, so the page keeps their space
// before they load (a heading lower down would otherwise move as they do).
const SIZES = {
  'v2-7/web-hover-select-measure.mp4': '1280 / 932',
  'v2-7/web-md-playback.mp4': '1024 / 746',
}

// A video starts loading and playing once it's within a screen of the viewport.
// With reduced motion it waits for its play button instead, and shows the
// frame at 1s, since some of the videos fade in from black.
const video = ref(null)
let io = null
onMounted(() => {
  const v = video.value
  if (!v) return
  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const start = () => {
    io?.disconnect()
    if (reduced) {
      const still = () => v.paused && v.currentTime < 1 && (v.currentTime = Math.min(1, v.duration / 2))
      v.preload = 'metadata'
      if (v.readyState >= 1) still()
      else v.addEventListener('loadedmetadata', still, { once: true })
      return
    }
    v.preload = 'auto'
    v.autoplay = true
    v.play?.().catch(() => {})
  }
  if (!('IntersectionObserver' in window)) return start()
  io = new IntersectionObserver(([e]) => e.isIntersecting && start(), { rootMargin: '100% 0px' })
  io.observe(v)
})
onBeforeUnmount(() => io?.disconnect())

defineProps({
  src: {
    type: String,
    required: true
  },
  poster: {
    type: String,
    default: ''
  },
  caption: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.doc-video {
  margin: 16px 0;
}

.doc-video video {
  display: block;
  width: 100%;
  border-radius: 8px;
  background: #000;
}

.doc-video figcaption {
  margin-top: 6px;
  font-size: 0.85em;
  color: var(--n-text-muted);
}
</style>
