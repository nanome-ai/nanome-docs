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
 * `heading` is the caption's bold title. It shows on one line under the
 * render only where the render sticks on a phone and the full caption sits
 * under the panel (app.css), so the stuck render still says what it shows.
 * Screen readers get it once, from the caption.
 */
import { computed, nextTick, ref, watch } from 'vue'
import AppIcon from '../AppIcon.vue'
import { imageInfo } from '../image.js'

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
const emit = defineEmits(['toggle'])

const loaded = ref([...new Set([props.src, ...props.preload])])
const stage = ref(null)

// The frame on show. A newly picked frame takes over once its image has
// loaded (or failed), so the stage keeps the last render until then.
const shown = ref(props.src)
const ready = new Set([props.src])
function onReady(s) {
  ready.add(s)
  if (s === props.src) shown.value = s
}

// True when the image this frame shows in the current theme is already in.
function painted(src) {
  const frame = stage.value?.children[loaded.value.indexOf(src)]
  const img = frame && [...frame.querySelectorAll('img')].find((i) => i.offsetWidth > 0)
  return !!img && img.complete && img.naturalWidth > 0
}

watch(
  () => [props.src, props.next, ...props.preload],
  ([src, ...more]) => {
    for (const s of [src, ...more]) if (s && !loaded.value.includes(s)) loaded.value.push(s)
    nextTick(() => {
      if (src === props.src && (ready.has(src) || painted(src))) shown.value = src
    })
  }
)

const ratio = computed(() => {
  const [w, h] = imageInfo(props.src).size || [16, 9]
  return `${w} / ${h}`
})

const frames = computed(() => loaded.value.map((src) => ({ src, info: imageInfo(src) })))
</script>

<template>
  <div class="n-demo-stick">
    <div ref="stage" class="n-demo-stage" :class="{ 'is-cut': cut }" :style="{ '--stage-ar': ratio }">
      <div
        v-for="f in frames"
        :key="f.src"
        class="n-demo-stage__frame"
        :class="{ 'is-on': f.src === shown, 'has-dark': !!f.info.dark }"
        :aria-hidden="f.src === shown ? undefined : 'true'"
      >
        <!-- `loading` before `src`, so Safari doesn't fetch the copy for the
             other theme, which never shows (Vimg.vue). -->
        <img class="n-demo-stage__img n-demo-stage__light no-zoom" loading="lazy" decoding="async" :src="f.info.light" :alt="f.src === shown ? alt : ''" @load="onReady(f.src)" @error="onReady(f.src)" />
        <img v-if="f.info.dark" class="n-demo-stage__img n-demo-stage__dark no-zoom" loading="lazy" decoding="async" :src="f.info.dark" :alt="f.src === shown ? alt : ''" @load="onReady(f.src)" @error="onReady(f.src)" />
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
