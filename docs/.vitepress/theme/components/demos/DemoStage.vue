<script setup>
/**
 * The render beside an option panel. Frames that have been shown stay in
 * the page, stacked, so going back to one is an instant fade; the next frame
 * the autoplay will show is loaded ahead of time, and `preload` puts a whole
 * set in the page up front. A frame with a dark copy swaps with the site
 * theme. The stage always has the frame's shape, so it never changes size
 * while the frames of one set (all the same size) come and go. `cut` swaps
 * frames without the fade, for playback.
 *
 * A pick should show at once, so frames are fetched before they're picked
 * (frames.js). Each control in the demo names the frames it can lead to in
 * `data-frame` (paths as the demo names them, space-separated). Once the
 * demo comes near the screen, and after every change, the frames one click
 * away are fetched at low priority, and a control's own frames at high
 * priority when the pointer or focus reaches it or it's pressed. A picked
 * frame takes over once its image is in. Frames added after the first
 * decode with decoding="sync", so the crossfade never fades in a blank;
 * decode() would do the same, but Chrome then scales the frame down by
 * another route, and it comes out a little sharper on some screens than it
 * did before. Only the copy for the current theme is requested: a frame's
 * other copy gets its URL when the theme changes, and until that copy is
 * in, the frame on show keeps its old one in view, as a pick keeps the last
 * render, so the stage never goes blank. The frame on show's other copy is
 * fetched ahead while the browser is idle (warmOtherTheme), so that wait is
 * usually over before it starts.
 *
 * `heading` is the caption's bold title. It shows on one line under the
 * render only where the render sticks on a phone and the full caption sits
 * under the panel (app.css), so the stuck render still says what it shows.
 * Screen readers get it once, from the caption.
 *
 * `preload` frames are decoded with decode() as soon as they're in, since
 * playback at ×20 needs every frame ready, and the stage emits `ready` with
 * each one's path once its image for the current theme is.
 */
import { computed, nextTick, onBeforeUnmount, onMounted, onUpdated, ref, watch } from 'vue'
import { useData } from 'vitepress'
import AppIcon from '../AppIcon.vue'
import { imageInfo } from '../image.js'
import { fetchFrame, prefetch } from './frames.js'

const props = defineProps({
  src: { type: String, required: true },
  next: { type: String, default: '' },
  alt: { type: String, default: '' },
  playing: { type: Boolean, default: false },
  preload: { type: Array, default: () => [] },
  cut: { type: Boolean, default: false },
  /** The round play button that steps through the options. */
  playButton: { type: Boolean, default: true },
  /** The caption's title, for the line under a stuck render. */
  heading: { type: String, default: '' },
})
const emit = defineEmits(['toggle', 'ready'])
const { isDark } = useData()

const stage = ref(null)

/**
 * The frames in the page. The first is the one the page was built with: it
 * waits for the stage to near the screen (loading="lazy") and keeps both
 * theme copies, as the theme isn't known when the page is built. A frame
 * added later loads at once, and only in the theme on show; `want` records
 * which copies it has asked for, and a copy keeps its URL once it has one.
 */
function frame(src, first = false) {
  const info = imageInfo(src)
  const dark = !!info.dark && isDark.value
  return { src, info, first, want: { light: first || !dark, dark: first || dark } }
}
const frames = ref([frame(props.src, true)])
const has = (src) => frames.value.some((f) => f.src === src)
function add(src) {
  if (src && !has(src)) frames.value.push(frame(src))
}

// The frame on show. A newly picked frame takes over once its image is in
// (or has failed), so the stage keeps the last render until then.
const shown = ref(props.src)

/** The URL a frame shows in the current theme. */
function urlOf(src) {
  const info = imageInfo(src)
  return isDark.value && info.dark ? info.dark : info.light
}

/** The <img> a frame shows in the current theme, once it's in the page. */
function imgOf(src) {
  const i = frames.value.findIndex((f) => f.src === src)
  const img = stage.value?.children[i]?.querySelector(
    isDark.value && frames.value[i].info.dark ? '.n-demo-stage__dark' : '.n-demo-stage__light'
  )
  return img?.offsetWidth > 0 ? img : null
}

/** Resolves once the image has loaded or failed. */
function loaded(img) {
  if (img.complete) return Promise.resolve()
  return new Promise((done) => {
    img.addEventListener('load', done, { once: true })
    img.addEventListener('error', done, { once: true })
  })
}

async function show(src) {
  add(src)
  await nextTick()
  const img = imgOf(src)
  if (img) await loaded(img)
  if (src === props.src) shown.value = src
}

/** Puts a frame in the page and loads it; `decode` decodes it too and says it's ready. */
async function stageFrame(src, decode = false) {
  add(src)
  await nextTick()
  const img = imgOf(src)
  if (!img) return
  await loaded(img)
  if (!decode) return
  await img.decode().catch(() => {})
  if (img.offsetWidth > 0) emit('ready', src)
}
const preloadAll = () => props.preload.forEach((s) => stageFrame(s, true))

/** The frame on show while it keeps its old theme's copy in view. */
const holding = ref('')
async function hold(src) {
  holding.value = src
  await nextTick()
  const img = imgOf(src)
  if (img) await loaded(img)
  if (holding.value === src) holding.value = ''
}

watch(() => props.src, show)
watch(() => props.preload, preloadAll)
watch(isDark, (dark) => {
  for (const f of frames.value) {
    if (dark && f.info.dark) f.want.dark = true
    else f.want.light = true
    if (f.src === shown.value && f.info.dark) hold(f.src)
  }
  nextTick(() => {
    preloadAll()
    scan()
  })
})

const ratio = computed(() => {
  const [w, h] = imageInfo(props.src).size || [16, 9]
  return `${w} / ${h}`
})

// --- Fetching ahead ---------------------------------------------------------

/** The demo around the stage, which holds the controls. */
let root = null
let near = false
let observer = null
const owner = {}

/** The frames a control names, if it's in this demo. */
function named(el) {
  const holder = el instanceof Element ? el.closest('[data-frame]') : null
  return holder && root?.contains(holder) ? holder.dataset.frame.split(' ').filter(Boolean) : []
}

/** Queues the frames one click away, or drops them once the demo is far. */
function scan() {
  if (!root) return
  if (!near) return prefetch(owner, [])
  const srcs = new Set()
  for (const el of root.querySelectorAll('[data-frame]')) for (const s of named(el)) srcs.add(s)
  prefetch(owner, [...srcs].filter((s) => !has(s)).map(urlOf))
}

let queued = false
function rescan() {
  if (queued) return
  queued = true
  nextTick(() => {
    queued = false
    scan()
  })
}

/** The pointer or focus is on a control, or it's pressed: fetch its frames now. */
function warm(event) {
  for (const s of named(event.target)) if (!has(s)) fetchFrame(urlOf(s), true)
}

/**
 * The frame on show's copy for the other theme, so a theme switch shows it at
 * once. Once the frame on show is in, with the demo near the screen, that one
 * copy is queued at low priority for when the browser is idle; a newer frame
 * on show replaces it in the queue, and nothing is queued while the reader
 * saves data (prefetch). Playback cuts through its frames, so there only a
 * frame it rests on for 1.5 seconds gets its copy. A copy the browser
 * already has is skipped, as Chrome loads the first frame's hidden copy
 * itself.
 */
const themeOwner = {}
let settle = 0
function warmOtherTheme() {
  clearTimeout(settle)
  if (!near) return prefetch(themeOwner, [])
  const src = shown.value
  settle = setTimeout(async () => {
    const on = imgOf(src)
    if (on) await loaded(on)
    const i = frames.value.findIndex((f) => f.src === src)
    const f = frames.value[i]
    if (src !== shown.value || !near || !f?.info.dark) return
    const dark = !isDark.value
    const copy = stage.value?.children[i]?.querySelector(dark ? '.n-demo-stage__dark' : '.n-demo-stage__light')
    if (copy?.naturalWidth > 0) return
    prefetch(themeOwner, [dark ? f.info.dark : f.info.light])
  }, props.cut ? 1500 : 0)
}

watch(
  () => props.next,
  (n) => n && near && stageFrame(n)
)
watch(shown, warmOtherTheme)
onUpdated(rescan)

onMounted(() => {
  root = stage.value.closest('.n-demo') || stage.value
  observer = new IntersectionObserver(
    ([e]) => {
      near = e.isIntersecting
      if (near && props.next) stageFrame(props.next)
      warmOtherTheme()
      scan()
    },
    { rootMargin: '400px 0px' }
  )
  observer.observe(root)
  preloadAll()
  root.addEventListener('pointerover', warm, { passive: true })
  root.addEventListener('pointerdown', warm, { passive: true })
  root.addEventListener('focusin', warm)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  clearTimeout(settle)
  root?.removeEventListener('pointerover', warm)
  root?.removeEventListener('pointerdown', warm)
  root?.removeEventListener('focusin', warm)
  prefetch(owner, [])
  prefetch(themeOwner, [])
})
</script>

<template>
  <div class="n-demo-stick">
    <div ref="stage" class="n-demo-stage" :class="{ 'is-cut': cut }" :style="{ '--stage-ar': ratio }">
      <div
        v-for="f in frames"
        :key="f.src"
        class="n-demo-stage__frame"
        :class="{ 'is-on': f.src === shown, 'has-dark': !!f.info.dark, 'is-holding': f.src === holding }"
        :aria-hidden="f.src === shown ? undefined : 'true'"
      >
        <img
          class="n-demo-stage__img n-demo-stage__light no-zoom"
          :loading="f.first ? 'lazy' : 'eager'"
          :decoding="f.first ? 'async' : 'sync'"
          :src="f.want.light ? f.info.light : undefined"
          :alt="f.src === shown ? alt : ''"
        />
        <img
          v-if="f.info.dark"
          class="n-demo-stage__img n-demo-stage__dark no-zoom"
          :loading="f.first ? 'lazy' : 'eager'"
          :decoding="f.first ? 'async' : 'sync'"
          :src="f.want.dark ? f.info.dark : undefined"
          :alt="f.src === shown ? alt : ''"
        />
      </div>
      <button
        v-if="playButton"
        type="button"
        class="n-demo-stage__play"
        :aria-label="playing ? 'Stop stepping through the options' : 'Step through the options'"
        :title="playing ? 'Stop' : 'Play'"
        @click="emit('toggle')"
      >
        <AppIcon :name="playing ? 'player-pause' : 'player-play'" size="0.85rem" />
      </button>
    </div>
    <div class="n-demo-stick__title" aria-hidden="true">{{ heading }}</div>
  </div>
</template>

<style>
.n-demo-stage {
  position: relative;
  aspect-ratio: var(--stage-ar, 16 / 9);
  overflow: hidden;
  border: 1px solid var(--n-border-soft);
  border-radius: var(--n-radius);
  background: var(--n-surface-sunken);
}

.n-demo-stage__frame {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 280ms var(--n-ease);
}

.n-demo-stage__frame.is-on {
  opacity: 1;
}

.n-demo-stage.is-cut .n-demo-stage__frame {
  transition: none;
}

.vp-doc .n-demo-stage__img,
.n-demo-stage__img {
  display: block;
  width: 100%;
  height: 100%;
  margin: 0;
  border: 0;
  border-radius: 0;
  object-fit: cover;
  object-position: 50% 50%;
}

.n-demo-stage__frame.has-dark .n-demo-stage__dark,
.dark .n-demo-stage__frame.has-dark .n-demo-stage__light {
  display: none;
}

.dark .n-demo-stage__frame.has-dark .n-demo-stage__dark {
  display: block;
}

/* Just after a theme change, both copies stacked in the same place: the old
   one shows until the new one is in (hold in the script). */
.n-demo-stage .n-demo-stage__frame.has-dark.is-holding .n-demo-stage__img {
  position: absolute;
  inset: 0;
  display: block;
}

.n-demo-stage__play {
  position: absolute;
  right: 8px;
  bottom: 8px;
  display: flex;
  padding: 6px;
  border: 0;
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  cursor: pointer;
}

.n-demo-stage__play:hover,
.n-demo-stage__play:focus-visible {
  background: rgba(0, 0, 0, 0.72);
}

/* The site's ring, which VitePress's own button rule would otherwise replace. */
.n-demo-stage__play:focus-visible {
  outline: 2px solid var(--n-accent);
  outline-offset: 2px;
  border-radius: 999px;
}

@media (prefers-reduced-motion: reduce) {
  .n-demo-stage__frame {
    transition: none;
  }
}
</style>
