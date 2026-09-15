<script setup>
/**
 * A guided picker: numbered questions, one at a time, then whichever
 * <ChooserResult> matches the answers.
 *
 *   <Chooser param="mdm" :steps="[
 *     { id: 'device', label: 'Which headset?', options: [
 *         { id: 'meta', label: 'Meta Quest', detail: 'Quest 3 and 3S' },
 *         { id: 'apple', label: 'Apple Vision Pro' }
 *     ]},
 *     { id: 'fleet', label: 'How many?', when: 'device',
 *       options: [{ id: 'one', label: 'Just one' }, { id: 'many', label: 'A fleet' }] }
 *   ]">
 *
 *   <ChooserResult when="device=meta fleet=many">
 *   Markdown for that combination.
 *   </ChooserResult>
 *
 *   </Chooser>
 *
 * Answers live in the query string, so any state of the picker is a link
 * someone can paste into a ticket.
 */
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'
import { useRoute } from 'vitepress'
import { CHOOSER_KEY, matches, readQuery, writeQuery } from './chooser.js'

const props = defineProps({
  /** Query-string key. One step: `?mdm=…`. Several: `?mdm-device=…`. */
  param: { type: String, default: '' },
  steps: { type: Array, required: true },
  /** Heading above the first question. */
  title: { type: String, default: '' },
})

const route = useRoute()
const answers = reactive({})
const ready = ref(false)

/** Steps whose own `when` condition currently holds. */
const activeSteps = computed(() =>
  props.steps.filter((step) => matches(step.when, answers))
)

/**
 * Questions appear one at a time: a step shows once every step before it has
 * an answer. Dumping all of them on screen at once is the info-dump this is
 * meant to replace.
 */
const visibleSteps = computed(() => {
  const out = []
  for (const step of activeSteps.value) {
    out.push(step)
    if (!answers[step.id]) break
  }
  return out
})

const complete = computed(() =>
  activeSteps.value.every((step) => answers[step.id])
)

const answered = computed(() => Object.keys(answers).some((k) => answers[k]))

function choose(stepId, optionId) {
  answers[stepId] = answers[stepId] === optionId ? undefined : optionId
  pruneStranded()
}

/**
 * Changing an early answer can retire a later question. Drop answers whose
 * step no longer applies, so a hidden answer never decides a result.
 */
function pruneStranded() {
  const live = new Set(activeSteps.value.map((s) => s.id))
  for (const key of Object.keys(answers)) {
    if (!live.has(key)) answers[key] = undefined
  }
}

function reset() {
  for (const key of Object.keys(answers)) answers[key] = undefined
}

// Results read the answers through here rather than through props.
provide(CHOOSER_KEY, { answers, complete })

function hydrate() {
  for (const key of Object.keys(answers)) answers[key] = undefined
  Object.assign(answers, readQuery(props.param, props.steps))
  pruneStranded()
  ready.value = true
}

// The query string is only readable in the browser, so the first paint is the
// unanswered picker and hydration fills it in.
onMounted(hydrate)
watch(() => route.path, hydrate)

watch(answers, () => {
  if (ready.value) writeQuery(props.param, props.steps, answers)
})

function stepNumber(step) {
  return activeSteps.value.indexOf(step) + 1
}
</script>

<template>
  <div class="n-chooser">
    <div class="n-chooser__panel">
      <div v-if="title || answered" class="n-chooser__head">
        <p v-if="title" class="n-chooser__title">{{ title }}</p>
        <button
          v-if="answered"
          type="button"
          class="n-chooser__reset"
          @click="reset"
        >
          Start over
        </button>
      </div>

      <div
        v-for="step in visibleSteps"
        :key="step.id"
        class="n-chooser__step"
      >
        <p :id="`${param || 'ch'}-${step.id}-label`" class="n-chooser__label">
          <span class="n-chooser__num">{{ stepNumber(step) }}</span>
          {{ step.label }}
        </p>

        <p v-if="step.hint" class="n-chooser__hint">{{ step.hint }}</p>

        <div
          class="n-chooser__options"
          role="group"
          :aria-labelledby="`${param || 'ch'}-${step.id}-label`"
        >
          <button
            v-for="option in step.options"
            :key="option.id"
            type="button"
            class="n-choice"
            :class="{ 'is-selected': answers[step.id] === option.id }"
            :aria-pressed="answers[step.id] === option.id ? 'true' : 'false'"
            @click="choose(step.id, option.id)"
          >
            <span class="n-choice__text">
              <span class="n-choice__title">
                {{ option.label }}
                <span v-if="option.badge" class="n-choice__badge">
                  {{ option.badge }}
                </span>
              </span>
              <span v-if="option.detail" class="n-choice__detail">
                {{ option.detail }}
              </span>
            </span>
            <svg
              class="n-choice__check"
              viewBox="0 0 20 20"
              width="18"
              height="18"
              aria-hidden="true"
            >
              <circle cx="10" cy="10" r="8.6" fill="none" stroke="currentColor" stroke-width="1.4" />
              <path
                d="M6.3 10.2l2.6 2.6 4.8-5"
                fill="none"
                stroke="currentColor"
                stroke-width="1.7"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <div class="n-chooser__results" aria-live="polite">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.n-chooser {
  margin: 28px 0;
}

.n-chooser__panel {
  padding: 22px 24px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-lg);
  background: var(--n-surface);
}

.n-chooser__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

.n-chooser__title {
  margin: 0;
  color: var(--n-text);
  font-size: var(--n-text-base);
  font-weight: 600;
}

.n-chooser__reset {
  padding: 4px 10px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-pill);
  background: none;
  color: var(--n-text-muted);
  font-size: var(--n-text-xs);
  font-weight: 500;
  cursor: pointer;
  transition: color var(--n-transition), border-color var(--n-transition);
}

.n-chooser__reset:hover {
  border-color: var(--n-border-strong);
  color: var(--n-text);
}

.n-chooser__step + .n-chooser__step {
  margin-top: 22px;
  padding-top: 22px;
  border-top: 1px solid var(--n-border-soft);
}

.n-chooser__label {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 0 0 12px;
  color: var(--n-text);
  font-size: var(--n-text-base);
  font-weight: 600;
}

.n-chooser__num {
  display: grid;
  place-items: center;
  width: 21px;
  height: 21px;
  flex-shrink: 0;
  border-radius: 50%;
  background: var(--n-accent-soft);
  color: var(--n-accent);
  font-size: var(--n-text-xs);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
}

.n-chooser__hint {
  margin: -6px 0 12px 30px;
  color: var(--n-text-faint);
  font-size: var(--n-text-sm);
}

.n-chooser__options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
  gap: 10px;
}

/* --- One option ---------------------------------------------------------- */

.n-choice {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 13px 14px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius);
  background: var(--n-bg);
  text-align: left;
  cursor: pointer;
  transition: border-color var(--n-transition), background var(--n-transition);
}

.n-choice:hover {
  border-color: var(--n-border-strong);
  background: var(--n-surface-hover);
}

.n-choice.is-selected {
  border-color: var(--n-accent);
  background: var(--n-accent-soft);
}

.n-choice__text {
  flex: 1;
  min-width: 0;
}

.n-choice__title {
  display: flex;
  align-items: center;
  gap: 7px;
  flex-wrap: wrap;
  color: var(--n-text);
  font-size: var(--n-text-base);
  font-weight: 600;
  line-height: 1.35;
}

.n-choice__badge {
  padding: 1px 7px;
  border-radius: var(--n-radius-pill);
  background: var(--n-accent-soft);
  color: var(--n-accent);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.n-choice__detail {
  display: block;
  margin-top: 3px;
  color: var(--n-text-faint);
  font-size: var(--n-text-sm);
  line-height: 1.45;
}

.n-choice__check {
  flex-shrink: 0;
  margin-top: 1px;
  color: var(--n-accent);
  opacity: 0;
  transition: opacity var(--n-transition);
}

.n-choice.is-selected .n-choice__check {
  opacity: 1;
}

.n-chooser__results:not(:empty) {
  margin-top: 4px;
}

@media (max-width: 520px) {
  .n-chooser__panel {
    padding: 18px 16px;
  }

  .n-chooser__options {
    grid-template-columns: 1fr;
  }
}
</style>
