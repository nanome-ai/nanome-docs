<template>
  <div>
    <div class="vimg">
      <img
        :src="`/assets/compressed/${compressedSrc}`"
        :data-zoom-src="`/assets/original/${src}`"
      />
      <div v-if="isGif" class="vimg__play-btn">&#9654;</div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  }
})

const isGif = computed(() => {
  return props.src.lastIndexOf('.gif') !== -1
})

const compressedSrc = computed(() => {
  return props.src.substr(0, props.src.lastIndexOf('.')) + '.jpg'
})
</script>

<style scoped>
.vimg {
  position: relative;
  display: inline-block;
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
