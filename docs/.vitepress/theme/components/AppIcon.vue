<script setup>
/**
 * An icon from the Nanome app, drawn inline so it follows the text colour.
 * `button` draws it the way the app draws its round tool buttons.
 */
import { computed } from 'vue'
import { appIcons } from './appIcons.js'

const props = defineProps({
  name: { type: String, required: true },
  /** Any CSS length; defaults to a little larger than the surrounding text. */
  size: { type: String, default: '1.15em' },
  button: { type: Boolean, default: false },
  /** Read out by screen readers; leave empty when the text beside it says the same. */
  label: { type: String, default: '' },
})

const path = computed(() => appIcons[props.name] || '')
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
    <svg viewBox="0 0 1000 1000" focusable="false">
      <path :d="path" fill="currentColor" />
    </svg>
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

.n-appicon svg {
  width: 100%;
  height: 100%;
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
