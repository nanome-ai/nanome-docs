<script setup>
/**
 * Right rail: headings on the current page. Built from the rendered DOM by
 * VitePress's own outline helpers, so headings written in markdown *and*
 * headings rendered by an interactive component both show up.
 *
 * The heading in view is picked by the same rule as the section in the left
 * rail and the breadcrumb (`useActiveHeader` in section-spy.js), so they
 * never disagree.
 */
import { computed, nextTick, ref, shallowRef, watch } from 'vue'
import { onContentUpdated } from 'vitepress'
import { useData } from 'vitepress/dist/client/theme-default/composables/data.js'
import {
  getHeaders,
  resolveTitle,
} from 'vitepress/dist/client/theme-default/composables/outline.js'
import OutlineItem from './OutlineItem.vue'
import { useActiveHeader } from './section-spy.js'

const { frontmatter, theme } = useData()

const headers = shallowRef([])
const container = ref(null)
const active = useActiveHeader(headers)
const markerTop = ref(null)

onContentUpdated(() => {
  headers.value = getHeaders(
    frontmatter.value.outline ?? theme.value.outline
  )
})

// The marker slides to the active link once that link has rendered.
watch([active, headers], () =>
  nextTick(() => {
    const link =
      active.value &&
      container.value?.querySelector(`a[href="${CSS.escape(active.value)}"]`)
    markerTop.value = link ? link.offsetTop : null
  })
)

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
      <div
        class="n-outline__marker"
        :class="{ 'is-shown': markerTop !== null }"
        :style="markerTop === null ? undefined : { top: `${markerTop}px` }"
        aria-hidden="true"
      />
      <OutlineItem :headers="headers" :active="active" />
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
  margin: 0 0 10px;
  color: var(--n-text);
  font-size: var(--n-text-sm);
  font-weight: 600;
}

.n-outline__body {
  position: relative;
}

/* The track the active marker slides along, so the rail reads as a navigator. */
.n-outline__body::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: -20px;
  width: 1px;
  background: var(--n-border);
}

/* Sits in the 20px left padding, level with the top of the active link. */
.n-outline__marker {
  position: absolute;
  top: 0;
  left: -21px;
  z-index: 1;
  width: 2px;
  height: 20px;
  border-radius: 2px;
  background: var(--n-accent);
  opacity: 0;
  transition: top 220ms var(--n-ease), opacity 220ms var(--n-ease);
}

.n-outline__marker.is-shown {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .n-outline__marker {
    transition: none;
  }
}
</style>
