<script setup>
/**
 * A notice above every Nanome Classic page, pointing at the v2 sections.
 *
 * Classic pages are found by source path, so a new page under `nanome1x/` gets
 * the banner without anyone remembering to add it. `classic: true` in a page's
 * frontmatter opts a page in from elsewhere; `classic: false` opts one out.
 */
import { computed } from 'vue'
import { useData, withBase } from 'vitepress'

const CLASSIC_PATHS = ['nanome1x/', 'controls/']

const { frontmatter, page } = useData()

const show = computed(() => {
  if (page.value.isNotFound) return false
  if (typeof frontmatter.value.classic === 'boolean') return frontmatter.value.classic
  return CLASSIC_PATHS.some((prefix) => page.value.relativePath.startsWith(prefix))
})
</script>

<template>
  <aside v-if="show" class="n-classic" aria-label="Nanome Classic notice">
    <p class="n-classic__text">
      <strong>This page is for Nanome Classic (v1.24).</strong>
      The current release, Nanome v2, is covered under
      <a :href="withBase('/nanome_v2/login')">Nanome XR</a> and
      <a :href="withBase('/nanome_web/overview')">Nanome Web</a>
      (<a href="https://app.nanome.ai" target="_blank" rel="noopener">app.nanome.ai</a>).
    </p>
  </aside>
</template>

<style scoped>
/* The same flat block as <Callout>, in the warning tint so it reads as a
   notice about the page rather than as part of it. */
.n-classic {
  margin: 0 0 28px;
  padding: 12px 18px;
  border-radius: var(--n-radius-sm);
  background: var(--n-warn-soft);
}

.n-classic__text {
  margin: 0;
  color: var(--n-text);
  font-size: var(--n-text-sm);
  line-height: 1.55;
}

.n-classic__text strong {
  font-weight: 600;
}

.n-classic__text a {
  color: var(--n-accent-hover);
  font-weight: 500;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.n-classic__text a:hover {
  text-decoration-thickness: 2px;
}
</style>
