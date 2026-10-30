<script setup>
/**
 * The render beside an option panel. Frames that have been shown stay in
 * the page, stacked, so going back to one is an instant fade; the next frame
 * the autoplay will show is loaded ahead of time. A frame with a dark copy
 * swaps with the site theme.
 */
import { computed, ref, watch } from 'vue'
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
watch(
  () => [props.src, props.next],
  ([src, next]) => {
    for (const s of [src, next]) if (s && !loaded.value.includes(s)) loaded.value.push(s)
  }
)

const ratio = computed(() => {
  const [w, h] = imageInfo(props.src).size || [16, 9]
  return `${w} / ${h}`
})

const frames = computed(() => loaded.value.map((src) => ({ src, info: imageInfo(src) })))
</script>

<template>
  <div class="n-demo-stage" :style="{ aspectRatio: ratio }">
    <div
      v-for="f in frames"
      :key="f.src"
      class="n-demo-stage__frame"
      :class="{ 'is-on': f.src === src, 'has-dark': !!f.info.dark }"
      :aria-hidden="f.src === src ? undefined : 'true'"
    >
      <img class="n-demo-stage__img n-demo-stage__light no-zoom" :src="f.info.light" :alt="f.src === src ? alt : ''" decoding="async" />
      <img v-if="f.info.dark" class="n-demo-stage__img n-demo-stage__dark no-zoom" :src="f.info.dark" :alt="f.src === src ? alt : ''" decoding="async" />
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
