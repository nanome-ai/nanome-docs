<template>
  <div class="home-carousel">
    <h2>{{ title }}</h2>
    <carousel
      arrows
      center-mode
      :responsive="[
        {
          breakpoint: 960,
          settings: { slidesToShow: Math.max(1, numSlides - 1) },
        },
        {
          breakpoint: 720,
          settings: { slidesToShow: Math.max(1, numSlides - 2) },
        },
        {
          breakpoint: 480,
          settings: { slidesToShow: Math.max(1, numSlides - 3) },
        },
      ]"
      :slides-to-show="numSlides"
      swipe-to-slide
    >
      <a
        v-for="(slide, i) in slides"
        :key="i"
        :href="getSlideURL(slide)"
        target="_blank"
      >
        <div class="slide">
          <div class="img"><img :src="slide.img" /></div>
          <div class="title">{{ slide.title }}</div>
          <div v-if="slide.description" class="description">
            {{ slide.description }}
          </div>
        </div>
      </a>
    </carousel>
  </div>
</template>

<script>
export default {
  props: ['numSlides', 'slides', 'title'],

  data: () => ({
    btoa: (x) => x,
    version: '1.22',
  }),

  mounted() {
    if (!window.navigator) return
    this.btoa = window.btoa.bind(window)

    const match = navigator.userAgent.match(/Nanome\/(\d+\.\d+)/)
    if (match) {
      this.version = match[1]
    }
  },

  methods: {
    getSlideURL(slide) {
      if (slide.url) return slide.url

      if (slide.file) {
        const url = slide.file.replace('<version>', this.version)
        const command = [
          { type: 'load', sources: [{ type: 'http', path: url }] },
        ]

        return `nanome://${this.btoa(JSON.stringify(command))}`
      }

      return '/'
    },
  },
}
</script>

<style scoped>
.home-carousel .img {
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 16/9;
}

.home-carousel .img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.home-carousel .slide {
  padding: 0 0.25em;
}

.home-carousel .slide > .title {
  margin-top: 1em;
  margin-bottom: 0.2em;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.home-carousel .slide > .description {
  font-size: 0.8em;
}
</style>
