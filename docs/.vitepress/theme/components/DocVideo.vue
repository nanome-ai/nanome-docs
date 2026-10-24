<template>
  <figure class="doc-video">
    <video
      :src="`/assets/videos/${src}`"
      :poster="poster ? `/assets/videos/${poster}` : undefined"
      autoplay
      loop
      muted
      playsinline
      controls
      preload="metadata"
    ></video>
    <figcaption v-if="caption">{{ caption }}</figcaption>
  </figure>
</template>

<script setup>
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
  opacity: 0.75;
}
</style>
