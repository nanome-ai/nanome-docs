<script setup>
/**
 * Right rail: headings on the current page. Built from the rendered DOM by
 * VitePress's own outline helpers, so headings written in markdown *and*
 * headings rendered by an interactive component both show up.
 */
import { computed, ref, shallowRef } from 'vue'
import { onContentUpdated } from 'vitepress'
import { useData } from 'vitepress/dist/client/theme-default/composables/data.js'
import {
  getHeaders,
  resolveTitle,
  useActiveAnchor,
} from 'vitepress/dist/client/theme-default/composables/outline.js'
import OutlineItem from './OutlineItem.vue'

const { frontmatter, theme } = useData()

const headers = shallowRef([])
const container = ref(null)
const marker = ref(null)

onContentUpdated(() => {
  headers.value = getHeaders(
    frontmatter.value.outline ?? theme.value.outline
  )
})

useActiveAnchor(container, marker)

const label = computed(() => resolveTitle(theme.value))
const hasHeaders = computed(() => headers.value.length > 0)
</script>

<template>
  <aside
    v-show="hasHeaders"
    ref="container"
    class="n-outline n-scroll"
    aria-label="On this page"
  >
    <p class="n-outline__title">{{ label }}</p>
    <div class="n-outline__body">
      <div ref="marker" class="n-outline__marker" aria-hidden="true" />
      <OutlineItem :headers="headers" />
    </div>
  </aside>
</template>

<style scoped>
.n-outline {
  position: fixed;
  top: var(--n-nav-height);
  right: 0;
  bottom: 0;
  width: var(--n-outline-width);
  padding: 28px 16px 64px 20px;
  border-left: 1px solid var(--n-border-soft);
}

.n-outline__title {
  margin: 0 0 8px;
  color: var(--n-text-faint);
  font-size: var(--n-text-xs);
  font-weight: 500;
}

.n-outline__body {
  position: relative;
}

/* Sits in the 20px left padding, level with the active link. `useActiveAnchor`
   drives `top` and `opacity` directly; the 39px it adds matches the default
   theme's own header offset, so the rule below cancels it back out. */
.n-outline__marker {
  position: absolute;
  top: 33px;
  left: -21px;
  z-index: 1;
  width: 2px;
  height: 20px;
  border-radius: 2px;
  background: var(--n-accent);
  opacity: 0;
  transition: top 220ms var(--n-ease), opacity 220ms var(--n-ease);
  margin-top: -39px;
}

@media (prefers-reduced-motion: reduce) {
  .n-outline__marker {
    transition: none;
  }
}
</style>
