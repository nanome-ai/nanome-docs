<script setup>
/**
 * One tool in a <ToolGrid>: the app's icon, the tool's name and a line about
 * it, all one link to the section that covers the tool.
 */
import AppIcon from './AppIcon.vue'

defineProps({
  icon: { type: String, required: true },
  title: { type: String, required: true },
  href: { type: String, required: true },
})
</script>

<template>
  <a class="n-toollink" :href="href">
    <AppIcon :name="icon" button size="1.05rem" />
    <span class="n-toollink__text">
      <span class="n-toollink__title">{{ title }}</span>
      <span class="n-toollink__desc"><slot /></span>
    </span>
  </a>
</template>

<style scoped>
.n-toollink {
  display: flex;
  align-items: flex-start;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-lg);
  background: var(--n-surface);
  color: var(--n-text) !important;
  text-decoration: none !important;
  transition: border-color var(--n-transition), background var(--n-transition);
}

.n-toollink:hover {
  border-color: var(--n-accent-border);
  background: var(--n-surface-hover);
}

.n-toollink:hover :deep(.n-appicon) {
  border-color: var(--n-accent-border);
  color: var(--n-accent);
}

.n-toollink__text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.n-toollink__title {
  font-size: var(--n-text-base);
  font-weight: 600;
  line-height: 1.4;
}

.n-toollink__desc {
  color: var(--n-text-muted);
  font-size: var(--n-text-sm);
  line-height: 1.5;
}
</style>
