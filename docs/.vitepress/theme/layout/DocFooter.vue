<script setup>
/** Previous / next page, and when the page last changed. */
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'
import { usePrevNext } from 'vitepress/dist/client/theme-default/composables/prev-next.js'

const { page, theme } = useData()
const control = usePrevNext()

const prev = computed(() => (control.value.prev?.link ? control.value.prev : null))
const next = computed(() => (control.value.next?.link ? control.value.next : null))
const hasLinks = computed(() => !!(prev.value || next.value))

const updated = computed(() => {
  if (!theme.value.lastUpdated || !page.value.lastUpdated) return null
  return new Date(page.value.lastUpdated).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
})
</script>

<template>
  <footer v-if="hasLinks || updated" class="n-docfooter">
    <p v-if="updated" class="n-docfooter__updated">Last updated {{ updated }}</p>

    <nav v-if="hasLinks" class="n-docfooter__links" aria-label="Previous and next page">
      <a
        v-if="prev"
        class="n-docfooter__link n-docfooter__link--prev"
        :href="withBase(prev.link)"
      >
        <span class="n-docfooter__dir">Previous</span>
        <span class="n-docfooter__title">{{ prev.text }}</span>
      </a>
      <span v-else />

      <a
        v-if="next"
        class="n-docfooter__link n-docfooter__link--next"
        :href="withBase(next.link)"
      >
        <span class="n-docfooter__dir">Next</span>
        <span class="n-docfooter__title">{{ next.text }}</span>
      </a>
    </nav>
  </footer>
</template>

<style scoped>
.n-docfooter {
  margin-top: 56px;
  padding-top: 24px;
  border-top: 1px solid var(--n-border-soft);
}

.n-docfooter__updated {
  margin: 0 0 20px;
  color: var(--n-text-faint);
  font-size: var(--n-text-sm);
}

.n-docfooter__links {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.n-docfooter__link {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius);
  transition: border-color var(--n-transition), background var(--n-transition);
}

.n-docfooter__link:hover {
  border-color: var(--n-accent-border);
  background: var(--n-surface-hover);
}

.n-docfooter__link--next {
  grid-column: 2;
  text-align: right;
}

.n-docfooter__dir {
  color: var(--n-text-faint);
  font-size: var(--n-text-xs);
}

.n-docfooter__title {
  color: var(--n-accent);
  font-size: var(--n-text-sm);
  font-weight: 600;
  /* Long page names wrap rather than overflowing the card. */
  white-space: pre-line;
}

@media (max-width: 600px) {
  .n-docfooter__links {
    grid-template-columns: 1fr;
  }

  .n-docfooter__link--next {
    grid-column: 1;
  }
}
</style>
