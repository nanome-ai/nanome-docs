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
  gap: 6px;
  width: 100%;
  padding: 11px 20px;
  border: 0;
  background: none;
  color: var(--n-text-muted);
  font-size: var(--n-text-sm);
  font-weight: 500;
  text-align: left;
  cursor: pointer;
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
