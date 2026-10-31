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
    <template #default="{ item }">
      <a :href="item.url" class="slide" target="_blank">
        <img :src="item.img" />
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
