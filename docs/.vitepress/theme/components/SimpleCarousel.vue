<template>
  <div
    ref="root"
    class="simple-carousel"
    :class="{ 'carousel-dark': dark }"
    @mouseenter="onPointerEnter"
    @mouseleave="onPointerLeave"
    @focusin="onFocusIn"
    @focusout="onFocusOut"
  >
    <div class="carousel-container">
      <button
        v-if="showArrows"
        class="carousel-nav carousel-prev"
        @click="scrollPrev"
        aria-label="Previous"
      >
        ‹
      </button>

      <div ref="track" class="carousel-track">
        <div
          v-for="(item, index) in clonedItems"
          :key="index"
          class="carousel-slide"
          :style="{ width: slideWidth }"
          :aria-hidden="isClone(index) ? 'true' : undefined"
        >
          <!-- Clones carry `clone`, so their links can leave the Tab order. -->
          <slot :item="item" :index="index % items.length" :clone="isClone(index)" />
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
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'

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

const root = ref(null)
const track = ref(null)
const currentDot = ref(0)
const currentIndex = ref(0)
const autoplayTimer = ref(null)
const isTransitioning = ref(false)

const slideWidth = computed(() => {
  return `${100 / props.slidesToShow}%`
})

const dotCount = computed(() => {
  return Math.ceil(props.items.length / props.slidesToShow)
})

// Clone slides for infinite effect
const clonedItems = computed(() => {
  if (props.items.length === 0) return []
  const cloneCount = props.slidesToShow
  return [...props.items.slice(-cloneCount), ...props.items, ...props.items.slice(0, cloneCount)]
})

// The copies before and after the real slides that make the loop seamless.
function isClone(index) {
  return index < props.slidesToShow || index >= props.slidesToShow + props.items.length
}

function reducedMotion() {
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
}

function getSlidePixelWidth() {
  return track.value.offsetWidth / props.slidesToShow
}

function scrollToPosition(index, smooth = true) {
  track.value.scrollTo({
    left: getSlidePixelWidth() * index,
    behavior: smooth && !reducedMotion() ? 'smooth' : 'auto'
  })
}

function updateDot(index) {
  const cloneCount = props.slidesToShow
  const realSlides = props.items.length
  const realSlideIndex = ((index - cloneCount) % realSlides + realSlides) % realSlides
  currentDot.value = Math.floor(realSlideIndex / props.slidesToShow)
}

function afterScrollEnd(callback) {
  let settled = false
  const done = () => {
    if (settled) return
    settled = true
    callback()
  }
  track.value.addEventListener('scrollend', done, { once: true })
  setTimeout(done, 1000) // Fallback in case scrollend doesn't fire
}

function scrollAndWrap(targetIndex) {
  if (!track.value || isTransitioning.value) return
  isTransitioning.value = true

  const cloneCount = props.slidesToShow
  const realSlides = props.items.length

  currentIndex.value = targetIndex
  updateDot(targetIndex)
  scrollToPosition(targetIndex)

  let wrapIndex = null
  if (targetIndex < cloneCount) {
    wrapIndex = targetIndex + realSlides
  } else if (targetIndex >= cloneCount + realSlides) {
    wrapIndex = targetIndex - realSlides
  }

  afterScrollEnd(() => {
    if (wrapIndex !== null) {
      currentIndex.value = wrapIndex
      scrollToPosition(wrapIndex, false)
    }
    isTransitioning.value = false
  })
}

function scrollPrev() {
  scrollAndWrap(currentIndex.value - 1)
}

function scrollNext() {
  scrollAndWrap(currentIndex.value + 1)
}

function scrollToSlide(dotIndex) {
  scrollAndWrap(props.slidesToShow + dotIndex)
}

function startAutoplay() {
  if (!props.autoplay || autoplayTimer.value || reducedMotion()) return
  autoplayTimer.value = setInterval(scrollNext, props.autoplaySpeed)
}

function stopAutoplay() {
  if (autoplayTimer.value) {
    clearInterval(autoplayTimer.value)
    autoplayTimer.value = null
  }
}

// Autoplay waits while the pointer or keyboard focus is in the carousel.
let hovering = false
let focusInside = false

function onPointerEnter() {
  hovering = true
  stopAutoplay()
}

function onPointerLeave() {
  hovering = false
  if (!focusInside) startAutoplay()
}

function onFocusIn() {
  focusInside = true
  stopAutoplay()
}

function onFocusOut(event) {
  if (root.value?.contains(event.relatedTarget)) return
  focusInside = false
  if (!hovering) startAutoplay()
}

// A swipe or trackpad scroll snaps to a slide. Once it stops, pick up the
// index and dot from where it landed, and step off a clone like scrollAndWrap.
function onScrollSettled() {
  if (!track.value || isTransitioning.value) return
  const index = Math.round(track.value.scrollLeft / getSlidePixelWidth())
  const realSlides = props.items.length
  let settled = index
  if (index < props.slidesToShow) settled = index + realSlides
  else if (index >= props.slidesToShow + realSlides) settled = index - realSlides
  currentIndex.value = settled
  updateDot(settled)
  if (settled !== index) scrollToPosition(settled, false)
}

let settleTimer = null
function onScroll() {
  clearTimeout(settleTimer)
  settleTimer = setTimeout(onScrollSettled, 150)
}

let scrollListener = null

// HomeCarousel shows fewer slides on narrow screens. The clones change with
// it, so start again from the first real slide.
watch(() => props.slidesToShow, () => nextTick(() => {
  if (!track.value) return
  currentIndex.value = props.slidesToShow
  updateDot(props.slidesToShow)
  scrollToPosition(props.slidesToShow, false)
}))

function onResize() {
  if (track.value) {
    scrollToPosition(currentIndex.value, false)
  }
}

onMounted(() => {
  if (track.value) {
    currentIndex.value = props.slidesToShow
    scrollToPosition(props.slidesToShow, false)
    scrollListener = 'onscrollend' in window ? ['scrollend', onScrollSettled] : ['scroll', onScroll]
    track.value.addEventListener(...scrollListener)
  }
  window.addEventListener('resize', onResize)
  startAutoplay()
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
  if (scrollListener) track.value?.removeEventListener(...scrollListener)
  clearTimeout(settleTimer)
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

.carousel-container:hover .carousel-nav,
.carousel-nav:focus-visible {
  opacity: 1;
}

/* Inset, like the dots' ring, so it stays inside the slide. */
.carousel-nav:focus-visible {
  outline: 2px solid var(--n-accent);
  outline-offset: -2px;
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

/* No page list bullet beside each dot. */
.carousel-dots li::before {
  display: none;
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
  background: #888;
  border-radius: 50%;
}

.carousel-dots button:focus-visible {
  outline: 2px solid var(--n-accent);
  outline-offset: 2px;
}

.carousel-dots li.active button {
  background: #eee;
}

/* The hero's dots sit in a row under the slide, clear of its title. */
.carousel-dark .carousel-dots {
  position: static;
}

.carousel-dark .carousel-dots button {
  background: var(--n-text-faint);
}

.carousel-dark .carousel-dots li.active button {
  background: var(--n-accent);
  transform: scale(1.25);
}

.carousel-track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.carousel-slide {
  flex-shrink: 0;
  box-sizing: border-box;
  scroll-snap-align: start;
}
</style>
