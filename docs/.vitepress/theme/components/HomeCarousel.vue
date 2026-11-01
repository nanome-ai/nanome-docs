<template>
  <div class="home-carousel" :style="{ '--shown': shown }">
    <h2>{{ title }}</h2>
    <SimpleCarousel
      :items="slides"
      :slides-to-show="shown"
      :show-arrows="true"
      :show-dots="false"
    >
      <template #default="{ item, clone, near }">
        <a :href="getSlideURL(item)" target="_blank" :tabindex="clone ? -1 : undefined">
          <div class="slide">
            <!-- The title below names the link, so the image adds nothing. -->
            <div class="img"><img :src="item.img" alt="" :loading="near ? 'eager' : 'lazy'" /></div>
            <div class="title">{{ item.title }}</div>
            <div v-if="item.description" class="description">
              {{ item.description }}
            </div>
          </div>
        </a>
      </template>
    </SimpleCarousel>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SimpleCarousel from './SimpleCarousel.vue'

const props = defineProps({
  numSlides: {
    type: Number,
    default: 4
  },
  slides: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    required: true
  }
})

// Fewer slides on narrow screens, so each stays readable.
const shown = ref(props.numSlides)
function fit() {
  const w = window.innerWidth
  shown.value = w < 640 ? 1 : w < 960 ? Math.min(2, props.numSlides) : props.numSlides
}

const isNanome = ref(false)
const version = ref('1.22')
let btoa = (x) => x

onMounted(() => {
  fit()
  window.addEventListener('resize', fit)
  if (!window.navigator) return
  btoa = window.btoa.bind(window)

  const match = navigator.userAgent.match(/Nanome\/(\d+\.\d+)/)
  if (match) {
    isNanome.value = true
    version.value = match[1]
  }
})

function getSlideURL(slide) {
  if (slide.url) return slide.url

  if (slide.file) {
    const url = slide.file.replace('<version>', version.value)
    const command = [
      { type: 'load', sources: [{ type: 'http', path: url }] },
    ]

    const baseURL = isNanome.value
      ? 'nanome:///'
      : 'https://open.nanome.ai/#/'
    return baseURL + btoa(JSON.stringify(command))
  }

  return '/'
}
</script>

<style scoped>
.home-carousel {
  margin: 2rem 0;
}

.home-carousel h2 {
  font-size: 1.5em;
  border: unset;
  font-weight: unset;
  margin: 2em 0 1em;
}

.home-carousel .img {
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 16/9;
}

.home-carousel .img img {
  width: 100%;
  height: 100%;
  margin: 0; /* drop the page's image margin and frame; the wrapper rounds */
  border: 0;
  border-radius: 0;
  object-fit: cover;
}

.home-carousel .slide {
  padding: 0 0.25em;
}

/* The outer slides' padding sits past the column, so the first and last
   images line up with the headings and keep the gap between cards. */
.home-carousel :deep(.carousel-container) {
  margin-inline: -0.25em;
  container-type: inline-size;
}

/* The arrows cover only the picture, so the title under it stays clear. On a
   touch screen they always show. The picture is 16:9 and as wide as a slide
   less its padding. */
.home-carousel :deep(.carousel-nav) {
  top: 0;
  height: calc((100cqw / var(--shown) - var(--n-text-body) / 2) * 9 / 16);
  transform: none;
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

.home-carousel a {
  display: block;
  cursor: pointer;
  color: unset;
  font-weight: unset;
  text-decoration: unset !important;
}

/* The card fills the scrolling track, which would clip a ring outside it. */
.home-carousel a:focus-visible {
  outline: 2px solid var(--n-accent);
  outline-offset: -2px;
  border-radius: 6px;
}
</style>
