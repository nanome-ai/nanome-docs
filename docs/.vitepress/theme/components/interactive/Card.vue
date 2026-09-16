<script setup>
/**
 * A bordered block with an optional title, badge, and link. Used on its own or
 * inside <CardGrid>.
 */
import { computed } from 'vue'

const props = defineProps({
  title: { type: String, default: '' },
  /** Short line above the title, e.g. a price or "Free". */
  badge: { type: String, default: '' },
  /** Grey line under the title. */
  meta: { type: String, default: '' },
  href: { type: String, default: '' },
  /** Call-to-action label; needs `href`. */
  cta: { type: String, default: '' },
})

const external = computed(() => /^https?:\/\//.test(props.href))
/** Without a CTA the whole card is the link. */
const wholeCard = computed(() => !!props.href && !props.cta)
</script>

<template>
  <component
    :is="wholeCard ? 'a' : 'div'"
    class="n-card"
    :class="{ 'is-link': wholeCard }"
    :href="wholeCard ? href : undefined"
    :target="wholeCard && external ? '_blank' : undefined"
    :rel="wholeCard && external ? 'noopener noreferrer' : undefined"
  >
    <p v-if="badge" class="n-card__badge">{{ badge }}</p>
    <h4 v-if="title" class="n-card__title">{{ title }}</h4>
    <p v-if="meta" class="n-card__meta">{{ meta }}</p>

    <div class="n-card__body">
      <slot />
    </div>

    <a
      v-if="cta && href"
      class="n-card__cta"
      :href="href"
      :target="external ? '_blank' : undefined"
      :rel="external ? 'noopener noreferrer' : undefined"
    >
      {{ cta }}
      <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
        <path
          d="M3 8h9M8.5 4l4 4-4 4"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </a>
  </component>
</template>

<style scoped>
.n-card {
  display: flex;
  flex-direction: column;
  padding: 18px 20px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-lg);
  background: var(--n-surface);
}

.n-card.is-link {
  text-decoration: none;
  transition: border-color var(--n-transition), background var(--n-transition);
}

.n-card.is-link:hover {
  border-color: var(--n-accent-border);
  background: var(--n-surface-hover);
}

.n-card__badge {
  margin: 0 0 6px;
  color: var(--n-accent);
  font-size: var(--n-text-xs);
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.n-card__title {
  margin: 0;
  color: var(--n-text);
  font-size: var(--n-text-base);
  font-weight: 600;
  line-height: 1.4;
}

.n-card__meta {
  margin: 3px 0 0;
  color: var(--n-text-faint);
  font-size: var(--n-text-sm);
}

.n-card__body {
  flex: 1;
  font-size: var(--n-text-sm);
  line-height: 1.6;
}

.n-card__body :deep(> :first-child) {
  margin-top: 12px;
}

.n-card__body :deep(> :last-child) {
  margin-bottom: 0;
}

.n-card__body :deep(p) {
  margin-bottom: 10px;
}

.n-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  align-self: flex-start;
  margin-top: 14px;
  padding: 7px 14px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-pill);
  color: var(--n-text) !important;
  font-size: var(--n-text-sm);
  font-weight: 600;
  text-decoration: none !important;
  transition: border-color var(--n-transition), background var(--n-transition);
}

.n-card__cta:hover {
  border-color: var(--n-accent);
  background: var(--n-accent-soft);
}
</style>
