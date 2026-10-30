<script setup>
/**
 * A screenshot with regions that light up. <ShotRow> and <ScreenMap> pass the
 * regions in `spots` and say which one is active; hovering a region here
 * reports it back, so the legend row or card for it lights up too.
 *
 * Boxes are "x,y,w,h" in percent of the full image, so they hold for the
 * light and dark copies alike. `crop` (same form) shows only part of the
 * image, such as the panels of a wide desktop capture.
 *
 * Clicking the image asks the parent to open its full-screen view. In that
 * view (`focus`), a region with a link goes to it.
 */
import { computed } from 'vue'
import { imageInfo, parseBox } from './image.js'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  crop: { type: String, default: '' },
  /** [{ n, box: [x, y, w, h], label, href }] */
  spots: { type: Array, default: () => [] },
  active: { type: Number, default: 0 },
  focus: { type: Boolean, default: false },
})

const emit = defineEmits(['enter', 'leave', 'open'])

const info = computed(() => imageInfo(props.src))
const crop = computed(() => parseBox(props.crop) || [0, 0, 100, 100])

/** The frame's width over height, after the crop. */
const ratio = computed(() => {
  const [w, h] = info.value.size || [16, 9]
  const [, , cw, ch] = crop.value
  return (w * cw) / (h * ch)
})

const outer = computed(() => ({
  '--hotshot-shown': info.value.shown ? `${Math.round((info.value.shown * crop.value[2]) / 100)}px` : '100%',
  '--hotshot-ar': ratio.value.toFixed(4),
}))

const frame = computed(() => ({ aspectRatio: ratio.value.toFixed(4) }))

const image = computed(() => {
  const [cx, cy, cw, ch] = crop.value
  return {
    width: `${(100 / cw) * 100}%`,
    left: `${(-cx / cw) * 100}%`,
    top: `${(-cy / ch) * 100}%`,
  }
})

/** A box in full-image percent, placed inside the cropped frame. */
function place(box) {
  const [cx, cy, cw, ch] = crop.value
  const [x, y, w, h] = box
  return {
    left: `${((x - cx) / cw) * 100}%`,
    top: `${((y - cy) / ch) * 100}%`,
    width: `${(w / cw) * 100}%`,
    height: `${(h / ch) * 100}%`,
  }
}

// Larger regions first, so a smaller one inside it stays on top to hover.
const ordered = computed(() =>
  [...props.spots].sort((a, b) => b.box[2] * b.box[3] - a.box[2] * a.box[3])
)

const lit = computed(() => props.spots.find((s) => s.n === props.active) || null)

function open(event) {
  if (props.focus) return
  event.preventDefault()
  emit('open')
}
</script>

<template>
  <div class="hotshot" :class="{ 'has-dark': !!info.dark, 'is-focus': focus }" :style="outer">
    <div
      class="hotshot__frame"
      :style="frame"
      :role="focus ? undefined : 'button'"
      :tabindex="focus ? undefined : 0"
      :aria-label="focus ? undefined : `${alt || 'Screenshot'}. Show larger`"
      @click="open"
      @keydown.enter="open"
      @keydown.space="open"
    >
      <img
        class="hotshot__img hotshot__light no-zoom"
        :src="info.light"
        :alt="alt"
        :width="info.size?.[0]"
        :height="info.size?.[1]"
        :style="image"
        loading="lazy"
        decoding="async"
      />
      <img
        v-if="info.dark"
        class="hotshot__img hotshot__dark no-zoom"
        :src="info.dark"
        :alt="alt"
        :width="info.darkSize?.[0]"
        :height="info.darkSize?.[1]"
        :style="image"
        loading="lazy"
        decoding="async"
      />

      <component
        :is="focus && s.href ? 'a' : 'span'"
        v-for="s in ordered"
        :key="s.n"
        class="hotshot__spot"
        :class="{ 'is-active': s.n === active }"
        :style="place(s.box)"
        :href="focus && s.href ? s.href : undefined"
        :aria-label="focus && s.href ? s.label : undefined"
        @mouseenter="emit('enter', s.n)"
        @mouseleave="emit('leave', s.n)"
      />

      <span
        class="hotshot__lit"
        :class="{ 'is-on': !!lit }"
        :style="lit ? place(lit.box) : null"
        aria-hidden="true"
      />

      <span
        v-for="s in spots"
        :key="`pin-${s.n}`"
        class="hotshot__pin"
        :style="{ left: place(s.box).left, top: place(s.box).top }"
        aria-hidden="true"
      >{{ s.n }}</span>

      <span v-if="info.isGif" class="hotshot__play" aria-hidden="true">&#9654;</span>
      <span v-if="!focus" class="hotshot__expand" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="15" height="15"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </span>
    </div>
  </div>
</template>

<style scoped>
.hotshot {
  max-width: min(var(--hotshot-cap, var(--hotshot-shown)), calc(var(--hotshot-maxh, 100000px) * var(--hotshot-ar)));
}

.hotshot__frame {
  position: relative;
  overflow: hidden;
  border: 1px solid var(--n-border-soft);
  border-radius: var(--n-radius);
  background: var(--n-surface-sunken);
  cursor: zoom-in;
}

.hotshot.is-focus .hotshot__frame {
  cursor: default;
}

.hotshot__frame:focus-visible {
  outline: 2px solid var(--n-accent);
  outline-offset: 2px;
}

.vp-doc .hotshot__img,
.hotshot__img {
  position: absolute;
  max-width: none;
  height: auto;
  margin: 0;
  border: 0;
  border-radius: 0;
}

.hotshot__spot {
  position: absolute;
  border-radius: 6px;
  transition: box-shadow var(--n-transition);
}

/* Over the image, show faintly where the regions are. */
.hotshot__frame:hover .hotshot__spot {
  box-shadow: inset 0 0 0 1px var(--n-accent-border);
}

.hotshot.is-focus a.hotshot__spot {
  cursor: pointer;
}

/* The lit region: an outline, and the rest of the image dimmed around it. */
.hotshot__lit {
  position: absolute;
  border-radius: 6px;
  box-shadow: 0 0 0 2px var(--n-accent), 0 0 0 100vmax rgba(0, 0, 0, 0.45);
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 140ms var(--n-ease),
    left 180ms var(--n-ease),
    top 180ms var(--n-ease),
    width 180ms var(--n-ease),
    height 180ms var(--n-ease);
}

.hotshot__lit.is-on {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .hotshot__lit {
    transition: none;
  }
}

/* Numbered pins, for a narrow layout where the legend can't sit around the
   image. The parent shows them. */
.hotshot__pin {
  position: absolute;
  z-index: 1;
  display: none;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  margin: -6px 0 0 -6px;
  border-radius: 9px;
  background: var(--n-accent);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  line-height: 1;
  pointer-events: none;
}

.hotshot__play {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  font-size: 3rem;
  text-shadow: 0 0 10px #000;
  pointer-events: none;
}

.hotshot__expand {
  position: absolute;
  right: 8px;
  bottom: 8px;
  display: flex;
  padding: 5px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.55);
  color: #fff;
  opacity: 0;
  transition: opacity var(--n-transition);
  pointer-events: none;
}

.hotshot__frame:hover .hotshot__expand,
.hotshot__frame:focus-visible .hotshot__expand {
  opacity: 1;
}
</style>

<!-- Unscoped: these follow the .dark class on <html>. -->
<style>
/* Dark captures need a deeper dim for the lit region to stand out. */
.dark .hotshot__lit {
  box-shadow: 0 0 0 2px var(--n-accent), 0 0 0 100vmax rgba(0, 0, 0, 0.62);
}

.hotshot.has-dark .hotshot__dark {
  display: none;
}

.dark .hotshot.has-dark .hotshot__light {
  display: none;
}

.dark .hotshot.has-dark .hotshot__dark {
  display: block;
}
</style>
