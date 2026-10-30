<script setup>
/**
 * Below 1280px the right rail has nowhere to go, so the same headings become a
 * dropdown at the end of the layout's page bar, beside the breadcrumb. The
 * list drops over the page, so the bar keeps the fixed height the anchor
 * offset relies on. It marks the heading in view as the right rail does.
 */
import { computed, onUnmounted, ref, shallowRef, watch } from 'vue'
import { onContentUpdated, useRoute } from 'vitepress'
import { useData } from 'vitepress'
import {
  getHeaders,
  resolveTitle,
} from 'vitepress/dist/client/theme-default/composables/outline.js'
import OutlineItem from './OutlineItem.vue'
import { useActiveHeader } from './section-spy.js'

const { frontmatter, theme } = useData()
const route = useRoute()

const headers = shallowRef([])
const active = useActiveHeader(headers)
const open = ref(false)

onContentUpdated(() => {
  headers.value = getHeaders(frontmatter.value.outline ?? theme.value.outline)
})

watch(() => route.path, () => (open.value = false))

// The list covers the top of the page, so a click anywhere else closes it.
const root = ref(null)

function closeOutside(event) {
  if (!root.value?.contains(event.target)) open.value = false
}

watch(open, (isOpen) => {
  if (isOpen) document.addEventListener('click', closeOutside)
  else document.removeEventListener('click', closeOutside)
})

onUnmounted(() => document.removeEventListener('click', closeOutside))

const label = computed(() => resolveTitle(theme.value))
const hasHeaders = computed(() => headers.value.length > 0)
</script>

<template>
  <div v-if="hasHeaders" ref="root" class="n-localnav">
    <button
      type="button"
      class="n-localnav__button"
      :aria-expanded="String(open)"
      :title="label"
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
      <span class="n-localnav__label">{{ label }}</span>
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
      <OutlineItem :headers="headers" :active="active" />
    </div>
  </div>
</template>

<style scoped>
/* Not positioned itself: the panel hangs off the page bar, full width. */
.n-localnav {
  flex-shrink: 0;
}

.n-localnav__button {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 5px 12px 5px 10px;
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
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 55vh;
  padding: 8px var(--n-gutter) 16px;
  border-bottom: 1px solid var(--n-border);
  background: var(--n-bg);
  box-shadow: var(--n-shadow);
}

@media (min-width: 1280px) {
  .n-localnav {
    display: none;
  }
}

@media (max-width: 767px) {
  .n-localnav__panel {
    padding: 8px 20px 16px;
  }
}

/* On a phone the label and the arrow give their room to the breadcrumb; the
   list icon and the button's title still say what it is, and screen readers
   still read the label. */
@media (max-width: 559px) {
  .n-localnav__button {
    padding: 6px 10px;
    gap: 6px;
  }

  .n-localnav__caret {
    display: none;
  }

  .n-localnav__label {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
}
</style>
