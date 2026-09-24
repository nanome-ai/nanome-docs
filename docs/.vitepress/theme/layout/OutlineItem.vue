<script setup>
/** One heading in the right rail, plus its children. */
defineProps({
  headers: { type: Array, required: true },
  depth: { type: Number, default: 0 },
})
</script>

<template>
  <ul class="n-outline__list" :class="`n-outline__list--d${depth}`">
    <li v-for="header in headers" :key="header.link">
      <a class="n-outline__link" :href="header.link" :title="header.title">
        {{ header.title }}
      </a>
      <OutlineItem
        v-if="header.children?.length"
        :headers="header.children"
        :depth="depth + 1"
      />
    </li>
  </ul>
</template>

<style scoped>
.n-outline__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.n-outline__list--d1 {
  padding-left: 14px;
}

.n-outline__list--d2,
.n-outline__list--d3 {
  padding-left: 12px;
}

.n-outline__link {
  display: block;
  padding: 4px 0;
  color: var(--n-text-faint);
  font-size: var(--n-text-sm);
  line-height: 1.45;
  text-decoration: none;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color var(--n-transition);
}

.n-outline__link:hover {
  color: var(--n-text);
}

/* `useActiveAnchor` adds `.active` to the matching link as the page scrolls. */
.n-outline__link.active {
  color: var(--n-text);
  font-weight: 500;
}
</style>
