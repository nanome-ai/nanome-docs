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
  },
  centerMode: {
    type: Boolean,
    default: false
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
  margin: 2rem 0;
}

.carousel-container {
  position: relative;
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
  padding: 0 0.5rem;
  box-sizing: border-box;
}
</style>
