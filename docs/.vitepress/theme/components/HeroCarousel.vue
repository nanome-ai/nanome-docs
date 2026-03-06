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
        <div class="content">
          <h1>{{ item.title }}</h1>
          <p>{{ item.description }}</p>
        </div>
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
  object-fit: cover;
}

.slide::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%);
  pointer-events: none;
}

.content {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem 3rem;
  color: white;
  z-index: 1;
}

.content h1 {
  margin: 0 0 0.5rem;
  font-size: 1.6rem;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.6);
}

.content p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .content {
    padding: 1.5rem;
  }

  .content h1 {
    font-size: 1.2rem;
  }

  .content p {
    font-size: 0.9rem;
  }
}
</style>
