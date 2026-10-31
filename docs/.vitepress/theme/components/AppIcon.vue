<script setup>
/**
 * An icon from the Nanome apps, in the text colour.
 *
 * The glyphs are Tabler icons saved one per file in public/assets/icons (see
 * the LICENSE there), so a page only downloads the icons it shows. `name` is
 * the Tabler name, the same one the app uses. `button` draws the icon the way
 * the apps draw a round icon button.
 */
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  name: { type: String, required: true },
  /** Any CSS length; defaults to a little larger than the surrounding text. */
  size: { type: String, default: '1.15em' },
  button: { type: Boolean, default: false },
  /** Read out by screen readers; leave empty when the text beside it says the same. */
  label: { type: String, default: '' },
})

const glyph = computed(() => ({
  '--n-appicon-src': `url("${withBase(`/assets/icons/${props.name}.svg`)}")`,
}))
</script>

<template>
  <span
    class="n-appicon"
    :class="{ 'is-button': button }"
    :style="{ '--n-appicon-size': size }"
    :role="label ? 'img' : undefined"
    :aria-label="label || undefined"
    :aria-hidden="label ? undefined : 'true'"
  >
    <span class="n-appicon__glyph" :style="glyph" />
  </span>
</template>

<style scoped>
.n-appicon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: none;
  width: var(--n-appicon-size);
  height: var(--n-appicon-size);
  vertical-align: -0.2em;
}

/* The SVG is a mask, so the glyph takes the current text colour in either theme. */
.n-appicon__glyph {
  width: 100%;
  height: 100%;
  background: currentColor;
  -webkit-mask: var(--n-appicon-src) center / contain no-repeat;
  mask: var(--n-appicon-src) center / contain no-repeat;
}

/* This glyph only fills the middle of its box, so it's drawn larger to read
   as an "i" rather than a dot. */
.n-appicon__glyph[style*='info-small'] {
  -webkit-mask-size: 170%;
  mask-size: 170%;
}

.n-appicon.is-button {
  width: calc(var(--n-appicon-size) * 2);
  height: calc(var(--n-appicon-size) * 2);
  padding: calc(var(--n-appicon-size) * 0.5);
  border: 1px solid var(--n-border);
  border-radius: 50%;
  background: var(--n-surface-sunken);
  color: var(--n-text);
}
</style>
