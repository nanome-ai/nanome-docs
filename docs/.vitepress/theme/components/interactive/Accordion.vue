<script setup>
/**
 * One collapsible row: a title, a one-line teaser, and the detail behind a
 * toggle. A native <details>, so the body ships in the prerendered HTML — the
 * local search index and a Ctrl-F both still find it.
 *
 *   <Accordion title="Ports and hosts" teaser="What to allow through the firewall">
 *   Markdown body.
 *   </Accordion>
 */
import { ref } from 'vue'

defineProps({
  title: { type: String, required: true },
  teaser: { type: String, default: '' },
  /** Open on load. */
  open: { type: Boolean, default: false },
  /** Short label on the right, e.g. "Meta only". */
  tag: { type: String, default: '' },
})

const el = ref(null)

/** Let an enclosing <AccordionGroup> keep its "Expand all" label honest. */
function onToggle(event) {
  event.target.dispatchEvent(
    new CustomEvent('n-accordion-toggle', { bubbles: true })
  )
}
</script>

<template>
  <details ref="el" class="n-accordion" :open="open" @toggle="onToggle">
    <summary class="n-accordion__summary">
      <span class="n-accordion__heading">
        <span class="n-accordion__title">
          {{ title }}
          <span v-if="tag" class="n-accordion__tag">{{ tag }}</span>
        </span>
        <span v-if="teaser" class="n-accordion__teaser">{{ teaser }}</span>
      </span>

      <span class="n-accordion__more">
        <span class="n-accordion__more-label">More detail</span>
        <span class="n-accordion__less-label">Less detail</span>
        <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
          <path
            d="M4 6l4 4 4-4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </span>
    </summary>

    <div class="n-accordion__body">
      <slot />
    </div>
  </details>
</template>

<style scoped>
.n-accordion {
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius);
  background: var(--n-surface);
  overflow: hidden;
}

.n-accordion + .n-accordion {
  margin-top: 8px;
}

.n-accordion__summary {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 15px 18px;
  cursor: pointer;
  list-style: none;
  transition: background var(--n-transition);
}

.n-accordion__summary::-webkit-details-marker {
  display: none;
}

.n-accordion__summary:hover {
  background: var(--n-surface-hover);
}

.n-accordion__heading {
  flex: 1;
  min-width: 0;
}

.n-accordion__title {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  color: var(--n-text);
  font-size: var(--n-text-base);
  font-weight: 600;
  line-height: 1.4;
}

.n-accordion__tag {
  padding: 1px 7px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-pill);
  color: var(--n-text-faint);
  font-size: 0.6875rem;
  font-weight: 500;
}

.n-accordion__teaser {
  display: block;
  margin-top: 3px;
  color: var(--n-text-faint);
  font-size: var(--n-text-sm);
  line-height: 1.45;
}

.n-accordion__more {
  display: flex;
  align-items: center;
  gap: 5px;
  flex-shrink: 0;
  color: var(--n-text-faint);
  font-size: var(--n-text-sm);
  font-weight: 500;
}

.n-accordion__more svg {
  transition: transform var(--n-transition);
}

.n-accordion__less-label {
  display: none;
}

.n-accordion[open] .n-accordion__more-label {
  display: none;
}

.n-accordion[open] .n-accordion__less-label {
  display: inline;
}

.n-accordion[open] .n-accordion__more svg {
  transform: rotate(180deg);
}

.n-accordion__body {
  padding: 2px 18px 18px;
  border-top: 1px solid var(--n-border-soft);
  font-size: var(--n-text-base);
}

.n-accordion__body :deep(> :first-child) {
  margin-top: 16px;
}

.n-accordion__body :deep(> :last-child) {
  margin-bottom: 0;
}

@media (max-width: 600px) {
  .n-accordion__more-label,
  .n-accordion__less-label {
    display: none !important;
  }
}

@media (prefers-reduced-motion: reduce) {
  .n-accordion__more svg {
    transition: none;
  }
}
</style>
