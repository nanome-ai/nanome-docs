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
}

.slide img {
  width: 100%;
  max-height: 450px;
  object-fit: contain;
}

.content {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10%;
  color: white;
}

.content h1 {
  margin: 0 0 1rem;
  font-size: 2rem;
}

.content p {
  margin: 0;
  font-size: 1.2rem;
}
</style>
