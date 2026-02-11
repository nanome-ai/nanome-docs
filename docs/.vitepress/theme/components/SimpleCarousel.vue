<template>
  <div class="simple-carousel" :class="{ 'carousel-dark': dark }">
    <div class="carousel-container">
      <button
        v-if="showArrows"
        class="carousel-nav carousel-prev"
        @click="scrollPrev"
        aria-label="Previous"
      >
        ‹
      </button>

      <div ref="track" class="carousel-track" @scroll="onScroll">
        <div
          v-for="(item, index) in items"
          :key="index"
          class="carousel-slide"
          :style="{ width: slideWidth }"
        >
          <slot :item="item" :index="index" />
        </div>
      </div>

      <button
        v-if="showArrows"
        class="carousel-nav carousel-next"
        @click="scrollNext"
        aria-label="Next"
      >
        ›
      </button>
    </div>

    <ul v-if="showDots" class="carousel-dots">
      <li
        v-for="(_, index) in dotCount"
        :key="index"
        :class="{ active: currentDot === index }"
      >
        <button @click="scrollToSlide(index)" :aria-label="`Go to slide ${index + 1}`">
          •
        </button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  items: {
    type: Array,
    required: true
  },
  slidesToShow: {
    type: Number,
    default: 1
  },
  showArrows: {
    type: Boolean,
    default: true
  },
  showDots: {
    type: Boolean,
    default: false
  },
  dark: {
    type: Boolean,
    default: false
  },
  autoplay: {
    type: Boolean,
    default: false
  },
  autoplaySpeed: {
    type: Number,
    default: 5000
  }
})

const track = ref(null)
const currentDot = ref(0)
const autoplayTimer = ref(null)

const slideWidth = computed(() => {
  return `${100 / props.slidesToShow}%`
})

const dotCount = computed(() => {
  return Math.ceil(props.items.length / props.slidesToShow)
})

function scrollPrev() {
  if (!track.value) return
  const slideWidth = track.value.offsetWidth / props.slidesToShow
  track.value.scrollBy({ left: -slideWidth, behavior: 'smooth' })
}

function scrollNext() {
  if (!track.value) return
  const slideWidth = track.value.offsetWidth / props.slidesToShow
  track.value.scrollBy({ left: slideWidth, behavior: 'smooth' })
}

function scrollToSlide(index) {
  if (!track.value) return
  const slideWidth = track.value.offsetWidth / props.slidesToShow
  track.value.scrollTo({ left: slideWidth * index, behavior: 'smooth' })
}

function onScroll() {
  if (!track.value) return
  const slideWidth = track.value.offsetWidth / props.slidesToShow
  currentDot.value = Math.round(track.value.scrollLeft / slideWidth)
}

function startAutoplay() {
  if (!props.autoplay) return
  autoplayTimer.value = setInterval(() => {
    if (!track.value) return
    const maxScroll = track.value.scrollWidth - track.value.offsetWidth
    if (track.value.scrollLeft >= maxScroll) {
      track.value.scrollTo({ left: 0, behavior: 'smooth' })
    } else {
      scrollNext()
    }
  }, props.autoplaySpeed)
}

function stopAutoplay() {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value)
    autoplayTimer.value = null
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})
</script>

<style scoped>
.simple-carousel {
  position: relative;
  width: 100%;
}

.carousel-container {
  position: relative;
}

/* Carousel navigation arrows */
.carousel-nav {
  position: absolute;
  top: 50%;
  width: 80px;
  height: 100%;
  transform: translateY(-50%);
  color: white;
  cursor: pointer;
  font-size: 0;
  line-height: 0;
  border: unset;
  background: unset;
  opacity: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.carousel-container:hover .carousel-nav {
  opacity: 1;
}

.carousel-nav::before,
.carousel-nav::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
}

.carousel-nav:hover::after {
  background-size: 50%;
}

.carousel-next {
  right: 0;
}

.carousel-next::before {
  background: linear-gradient(to left, #fffa, #fff8 50%, #fff0)
}

.carousel-next::after {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%2329a1ff' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E") 80% center / 40% no-repeat;
}

.carousel-prev {
  left: 0;
}

.carousel-prev::before {
  background: linear-gradient(to right, #fffa, #fff8, #fff0)
}

.carousel-prev::after {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%2329a1ff' d='M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z'%3E%3C/path%3E%3C/svg%3E") 20% center / 40% no-repeat;
}

/* Dark theme carousel arrows */
.carousel-dark .carousel-next::before,
.dark .carousel-next::before {
  background: linear-gradient(to left, #000a, #0008 50%, #0000)
}

.carousel-dark .carousel-next::after,
.dark .carousel-next::after {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23eeeeee' d='M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z'%3E%3C/path%3E%3C/svg%3E") 80% center / 40% no-repeat;
}

.carousel-dark .carousel-prev::before,
.dark .carousel-prev::before {
  background: linear-gradient(to right, #000a, #0008, #0000)
}

.carousel-dark .carousel-prev::after,
.dark .carousel-prev::after {
  background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 512'%3E%3Cpath fill='%23eeeeee' d='M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z'%3E%3C/path%3E%3C/svg%3E") 20% center / 40% no-repeat;
}

/* Carousel dots */
.carousel-dots {
  display: block;
  position: absolute;
  bottom: 0;
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
  text-align: center;
}

.carousel-dots li {
  display: inline-block;
  margin: 0;
  padding: 0;
  cursor: pointer;
}

.carousel-dots button {
  display: block;
  width: 12px;
  height: 12px;
  margin: 16px 8px;
  font-size: 0;
  line-height: 0;
  cursor: pointer;
  color: transparent;
  border: 0;
  outline: none;
  background: #888;
  border-radius: 50%;
}

.carousel-dots li.active button {
  background: #eee;
}

.carousel-track {
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.carousel-slide {
  flex-shrink: 0;
  box-sizing: border-box;
}
</style>
