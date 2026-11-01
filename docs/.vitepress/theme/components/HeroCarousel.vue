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
    <template #default="{ item, clone }">
      <a :href="item.url" class="slide" :style="{ aspectRatio: ratio }" target="_blank" :tabindex="clone ? -1 : undefined">
        <img :src="item.img" :alt="item.title || item.alt || ''" />
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
  /** The frame's shape, to match the images so they fill it. */
  ratio: {
    type: String,
    default: '16 / 9'
  }
})
</script>

<style scoped>
.slide {
  position: relative;
  display: block;
  overflow: hidden;
  background: #111;
}

/* The slide fills the scrolling track, which would clip a ring outside it. */
.slide:focus-visible {
  outline: 2px solid var(--n-accent);
  outline-offset: -2px;
}

.slide img {
  width: 100%;
  height: 100%;
  margin: 0; /* drop the page's image margin and frame */
  border: 0;
  border-radius: 0;
  object-fit: contain; /* a banner of another shape shows whole */
  background: var(--n-surface-sunken);
}

</style>
