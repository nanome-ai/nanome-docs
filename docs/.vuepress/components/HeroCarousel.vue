<template>
  <carousel
    class="hero-carousel slick-dark"
    arrows
    autoplay
    :autoplay-speed="5000"
    dots
  >
    <a
      v-for="(slide, i) in slides"
      :key="i"
      :href="slide.url"
      class="slide"
      target="_blank"
    >
      <img :src="slide.img" />
      <div class="content">
        <h1>{{ slide.title }}</h1>
        <p>{{ slide.description }}</p>
      </div>
    </a>
  </carousel>
</template>

<script>
export default {
  props: ['slides'],
}
</script>

<style>
.hero-carousel img {
  width: 100%;
  max-height: 450px;
  object-fit: cover;
}

.hero-carousel .slick-arrow {
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hero-carousel:hover .slick-arrow,
.hero-carousel:focus .slick-arrow {
  opacity: 1;
}

.hero-carousel .slide {
  position: relative;
}

.hero-carousel .content {
  position: absolute;
  top: 0;
  left: 0;
  padding: 10%;
  color: white;
}
</style>
