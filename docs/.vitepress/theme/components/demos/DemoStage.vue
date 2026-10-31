<script setup>
/**
 * The render beside an option panel. Frames that have been shown stay in
 * the page, stacked, so going back to one is an instant fade; the next frame
 * the autoplay will show is loaded ahead of time. A frame with a dark copy
 * swaps with the site theme.
 */
import { computed, nextTick, ref, watch } from 'vue'
import AppIcon from '../AppIcon.vue'
import { imageInfo } from '../image.js'

const props = defineProps({
  src: { type: String, required: true },
  next: { type: String, default: '' },
  alt: { type: String, default: '' },
  playing: { type: Boolean, default: false },
})
const emit = defineEmits(['toggle'])

const loaded = ref([props.src])
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
  () => [props.src, props.next],
  ([src, next]) => {
    for (const s of [src, next]) if (s && !loaded.value.includes(s)) loaded.value.push(s)
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
  <div ref="stage" class="n-demo-stage" :style="{ '--stage-ar': ratio }">
    <div
      v-for="f in frames"
      :key="f.src"
      class="n-demo-stage__frame"
      :class="{ 'is-on': f.src === shown, 'has-dark': !!f.info.dark }"
      :aria-hidden="f.src === shown ? undefined : 'true'"
    >
      <img class="n-demo-stage__img n-demo-stage__light no-zoom" :src="f.info.light" :alt="f.src === shown ? alt : ''" loading="lazy" decoding="async" @load="onReady(f.src)" @error="onReady(f.src)" />
      <img v-if="f.info.dark" class="n-demo-stage__img n-demo-stage__dark no-zoom" :src="f.info.dark" :alt="f.src === shown ? alt : ''" loading="lazy" decoding="async" @load="onReady(f.src)" @error="onReady(f.src)" />
    </div>
    <button
      type="button"
      class="n-demo-stage__play"
      :aria-label="playing ? 'Stop stepping through the options' : 'Step through the options'"
      :title="playing ? 'Stop' : 'Play'"
      @click="emit('toggle')"
    >
      <AppIcon :name="playing ? 'player-pause' : 'player-play'" size="0.85rem" />
    </button>
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

@media (prefers-reduced-motion: reduce) {
  .n-demo-stage__frame {
    transition: none;
  }
}
</style>
