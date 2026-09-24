<script setup>
/**
 * The answer to one combination of <Chooser> choices. Renders only when its
 * `when` condition holds and every question has been answered.
 *
 *   <ChooserResult when="device=meta fleet=many" verdict="Use ArborXR or ManageXR">
 *   Body copy, in markdown.
 *   </ChooserResult>
 *
 * Give the last one `when="*"` to catch anything the earlier ones miss.
 */
import { computed, inject } from 'vue'
import { CHOOSER_KEY, matches } from './chooser.js'

const props = defineProps({
  when: { type: String, default: '' },
  /** One-line answer, set above the body. */
  verdict: { type: String, default: '' },
  /** Show before every question is answered. */
  eager: { type: Boolean, default: false },
})

const chooser = inject(CHOOSER_KEY, null)

const show = computed(() => {
  if (!chooser) return true
  if (!props.eager && !chooser.complete.value) return false
  return props.when === '*' || matches(props.when, chooser.answers)
})
</script>

<template>
  <Transition name="n-result">
    <section v-if="show" class="n-result">
      <p v-if="verdict" class="n-result__verdict">{{ verdict }}</p>
      <div class="n-result__body">
        <slot />
      </div>
    </section>
  </Transition>
</template>

<style scoped>
.n-result {
  margin-top: 14px;
  padding: 20px 24px;
  border: 1px solid var(--n-accent-border);
  border-radius: var(--n-radius-lg);
  background: var(--n-accent-soft);
}

.n-result__verdict {
  margin: 0 0 10px;
  color: var(--n-text);
  font-size: var(--n-text-lg);
  font-weight: 600;
  letter-spacing: var(--n-tracking-tight);
  line-height: 1.35;
}

.n-result__body :deep(> :first-child) {
  margin-top: 0;
}

.n-result__body :deep(> :last-child) {
  margin-bottom: 0;
}

/* Headings inside a result are decorative — the outline shouldn't list a
   heading that only exists for one branch of the picker. */
.n-result__body :deep(h2),
.n-result__body :deep(h3) {
  margin-top: 20px;
  padding-top: 0;
  border-top: 0;
  font-size: var(--n-text-base);
}

.n-result-enter-active {
  transition: opacity 220ms var(--n-ease), transform 220ms var(--n-ease);
}

.n-result-enter-from {
  opacity: 0;
  transform: translateY(6px);
}

@media (prefers-reduced-motion: reduce) {
  .n-result-enter-active {
    transition: none;
  }
}

@media (max-width: 520px) {
  .n-result {
    padding: 16px;
  }
}
</style>
