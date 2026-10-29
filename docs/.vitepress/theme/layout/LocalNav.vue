<script setup>
/**
 * Below 1280px the right rail has nowhere to go, so the same headings become a
 * dropdown in a sticky strip under the nav bar.
 */
import { computed, ref, shallowRef, watch } from 'vue'
import { onContentUpdated, useRoute } from 'vitepress'
import { useData } from 'vitepress'
import {
  getHeaders,
  resolveTitle,
} from 'vitepress/dist/client/theme-default/composables/outline.js'
import OutlineItem from './OutlineItem.vue'

const { frontmatter, theme } = useData()
const route = useRoute()

const headers = shallowRef([])
const open = ref(false)

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
})

watch(() => route.path, () => (open.value = false))

const label = computed(() => resolveTitle(theme.value))
const hasHeaders = computed(() => headers.value.length > 0)
</script>

<template>
  <div v-if="hasHeaders" class="n-localnav">
    <button
      type="button"
      class="n-localnav__button"
      :aria-expanded="String(open)"
      @click="open = !open"
    >
      <svg
        viewBox="0 0 16 16"
        width="15"
        height="15"
        class="n-localnav__list-icon"
        aria-hidden="true"
      >
        <path
          d="M5.5 4h8M5.5 8h8M5.5 12h8M2.5 4h.01M2.5 8h.01M2.5 12h.01"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
        />
      </svg>
      <span>{{ label }}</span>
      <svg
        viewBox="0 0 16 16"
        width="13"
        height="13"
        class="n-localnav__caret"
        :class="{ 'is-open': open }"
        aria-hidden="true"
      >
        <path
          d="M4 6l4 4 4-4"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div v-if="open" class="n-localnav__panel n-scroll" @click="open = false">
      <OutlineItem :headers="headers" />
    </div>
  </div>
</template>

<style scoped>
.n-localnav {
  position: sticky;
  top: var(--n-nav-height);
  z-index: 40;
  border-bottom: 1px solid var(--n-border-soft);
  background: color-mix(in srgb, var(--n-bg) 88%, transparent);
  backdrop-filter: saturate(150%) blur(12px);
}

.n-localnav__button {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 20px;
  padding: 7px 12px 7px 10px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-pill);
  background: var(--n-surface);
  color: var(--n-text);
  font-size: var(--n-text-sm);
  font-weight: 600;
  text-align: left;
  cursor: pointer;
  transition: border-color var(--n-transition), background var(--n-transition);
}

.n-localnav__button:hover {
  border-color: var(--n-accent-border);
  background: var(--n-surface-hover);
}

.n-localnav__list-icon {
  color: var(--n-accent);
}

.n-localnav__caret {
  transition: transform var(--n-transition);
}

.n-localnav__caret.is-open {
  transform: rotate(180deg);
}

.n-localnav__panel {
  max-height: 55vh;
  padding: 4px 20px 16px;
  border-top: 1px solid var(--n-border-soft);
  background: var(--n-bg);
}

@media (min-width: 1280px) {
  .n-localnav {
    display: none;
  }
}
</style>
