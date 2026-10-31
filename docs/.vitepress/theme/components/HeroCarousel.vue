<template>
  <SimpleCarousel
    :items="slides"
    :slides-to-show="1"
    :show-arrows="true"
    :show-dots="true"
    :dark="true"
    :autoplay="true"
    :autoplay-speed="5000"
  >
    <template #default="{ item, clone, near }">
      <a :href="item.url" class="slide" target="_blank" :tabindex="clone ? -1 : undefined">
        <img
          :src="item.img"
          :alt="item.title || item.alt || ''"
          :loading="near || (eager && item === slides[0] && !clone) ? 'eager' : 'lazy'"
        />
      </a>
    </template>
  </SimpleCarousel>
</template>

<script setup>
import SimpleCarousel from './SimpleCarousel.vue'

defineProps({
  slides: {
    type: Array,
    required: true
  },
  // Load the first slide with the page, ahead of the rest. The home page
  // sets this on its topmost carousel.
  eager: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.slide {
  position: relative;
  display: block;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #111;
}

.slide img {
  width: 100%;
  height: 100%;
  margin: 0; /* drop the page's image margin and frame */
  border: 0;
  border-radius: 0;
  object-fit: contain; /* banners are wider than 16:9; show them whole */
  background: var(--n-surface-sunken);
}

</style>
