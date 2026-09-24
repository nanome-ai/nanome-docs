<script setup>
/**
 * A block of text with a copy button — an allowlist of hosts, a set of commands,
 * a support ID. Copying beats asking a reader to select 20 lines by hand.
 */
import { computed, onBeforeUnmount, ref } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  /** Lines to show and copy. */
  lines: { type: Array, default: () => [] },
  /** Used instead of `lines` when the content is one string. */
  text: { type: String, default: '' },
})

const body = computed(() =>
  props.text || props.lines.join('\n')
)

const copied = ref(false)
let timer = null

async function copy() {
  try {
    await navigator.clipboard.writeText(body.value)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => (copied.value = false), 2000)
  } catch {
    // Clipboard access can be refused; the text is on screen either way.
    copied.value = false
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <div class="n-copyblock">
    <div class="n-copyblock__bar">
      <p class="n-copyblock__title">{{ title || 'Copy' }}</p>
      <button type="button" class="n-copyblock__button" @click="copy">
        {{ copied ? 'Copied' : 'Copy' }}
      </button>
    </div>
    <pre class="n-copyblock__body"><code>{{ body }}</code></pre>
  </div>
</template>

<style scoped>
.n-copyblock {
  margin: 24px 0;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius);
  background: var(--n-surface-sunken);
  overflow: hidden;
}

.n-copyblock__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 9px 12px 9px 16px;
  border-bottom: 1px solid var(--n-border-soft);
}

.n-copyblock__title {
  margin: 0;
  color: var(--n-text-faint);
  font-size: var(--n-text-xs);
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.n-copyblock__button {
  padding: 4px 11px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-pill);
  background: var(--n-bg);
  color: var(--n-text-muted);
  font-size: var(--n-text-xs);
  font-weight: 600;
  cursor: pointer;
  transition: color var(--n-transition), border-color var(--n-transition);
}

.n-copyblock__button:hover {
  border-color: var(--n-accent);
  color: var(--n-text);
}

.n-copyblock__body {
  margin: 0;
  padding: 14px 16px;
  overflow-x: auto;
  color: var(--n-text-muted);
  font-family: var(--n-font-mono);
  font-size: 0.8125rem;
  line-height: 1.7;
}
</style>
