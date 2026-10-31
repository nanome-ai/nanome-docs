<script setup>
/**
 * The page for a missing URL. The router renders it in place of the page's
 * content, so it sits in the normal column under the nav bar and takes the
 * .vp-doc type styles.
 */
import { withBase } from 'vitepress'
</script>

<template>
  <div class="n-notfound">
    <h1>Page not found</h1>
    <p>This page may have moved or been renamed.</p>
    <p class="n-notfound__links">
      <a :href="withBase('/')">Home</a>
      <a :href="withBase('/help/contact')">Contact</a>
    </p>
  </div>
</template>

<style scoped>
.n-notfound__links {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

/* Two pill links, big enough to tap on a phone. */
.vp-doc .n-notfound__links a {
  display: inline-flex;
  align-items: center;
  min-height: 40px;
  padding: 0 18px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-pill);
  font-weight: 600;
  text-decoration: none;
  transition: border-color var(--n-transition), background var(--n-transition);
}

.vp-doc .n-notfound__links a:hover {
  border-color: var(--n-accent-border);
  background: var(--n-surface-hover);
}
</style>
