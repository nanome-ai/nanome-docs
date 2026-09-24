<script setup>
/**
 * A set of <Accordion> rows with one control that opens or closes all of them —
 * the thing an IT reader wants before scanning a checklist.
 */
import { onMounted, ref } from 'vue'

defineProps({
  label: { type: String, default: '' },
})

const root = ref(null)
const allOpen = ref(false)
const count = ref(0)

function rows() {
  return root.value ? [...root.value.querySelectorAll('details')] : []
}

/** Opening every row by hand should flip the label too. */
function sync() {
  const items = rows()
  allOpen.value = items.length > 0 && items.every((item) => item.open)
}

function toggleAll() {
  const open = !allOpen.value
  rows().forEach((item) => {
    item.open = open
  })
  allOpen.value = open
}

onMounted(() => {
  count.value = rows().length
  sync()
})
</script>

<template>
  <div class="n-accordions">
    <div v-if="label || count > 1" class="n-accordions__bar">
      <p class="n-accordions__label">
        {{ label || `${count} checks` }}
      </p>
      <button
        v-if="count > 1"
        type="button"
        class="n-accordions__toggle"
        :aria-pressed="String(allOpen)"
        @click="toggleAll"
      >
        {{ allOpen ? 'Collapse all' : 'Expand all' }}
      </button>
    </div>

    <div ref="root" class="n-accordions__rows" @n-accordion-toggle="sync">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.n-accordions {
  margin: 28px 0;
}

.n-accordions__bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 10px;
}

.n-accordions__label {
  margin: 0;
  color: var(--n-text-faint);
  font-size: var(--n-text-sm);
  font-weight: 500;
}

.n-accordions__toggle {
  padding: 4px 11px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-pill);
  background: none;
  color: var(--n-text-muted);
  font-size: var(--n-text-xs);
  font-weight: 500;
  cursor: pointer;
  transition: color var(--n-transition), border-color var(--n-transition);
}

.n-accordions__toggle:hover {
  border-color: var(--n-border-strong);
  color: var(--n-text);
}
</style>
