<script setup>
/**
 * One row in the left rail. Recursive: a row either links to a page, opens a
 * nested group, or does both. Groups open when they contain the page being
 * read and close when they don't, so a deep link never lands with its own
 * section collapsed, and the rail never holds open a group the reader has
 * left.
 *
 * The current page's row also lists the page's h2 sections, from the
 * `sections` config.mjs builds out of the markdown, with the one in view
 * marked as the reader scrolls.
 */
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared.js'
import { hasActiveLink } from 'vitepress/dist/client/theme-default/support/sidebar.js'
import { useSectionSpy } from './section-spy.js'
import { inTrail, usePageTrail } from './page-trail.js'

const props = defineProps({
  item: { type: Object, required: true },
  depth: { type: Number, default: 0 },
})

const { page } = useData()
const sectionId = useSectionSpy()
const pageTrail = usePageTrail()

const hasChildren = computed(() => !!props.item.items?.length)

// A page the sidebar doesn't list counts as inside its folder's group.
const containsActive = computed(
  () =>
    hasActiveLink(page.value.relativePath, props.item) ||
    inTrail(pageTrail.value, props.item)
)

const hashIndex = computed(() => props.item.link?.indexOf('#') ?? -1)

/**
 * A page row is current on its page. A `#` row points at one section of a
 * page, so it is current while that section is in view, whatever hash the
 * URL carries.
 */
const isCurrent = computed(() => {
  const link = props.item.link
  if (!link) return false
  if (hashIndex.value < 0) return isActive(page.value.relativePath, link)
  return (
    isActive(page.value.relativePath, link.slice(0, hashIndex.value)) &&
    sectionId.value === link.slice(hashIndex.value + 1)
  )
})

const sections = computed(() =>
  isCurrent.value && hashIndex.value < 0
    ? (props.item.sections || []).map((section) => ({
        ...section,
        id: section.link.slice(section.link.indexOf('#') + 1),
      }))
    : []
)

// `collapsed: false` in the config means "start open"; anything else starts
// closed unless the current page lives inside.
const isOpenHere = () => props.item.collapsed === false || containsActive.value
const open = ref(isOpenHere())

// Each new page resets the group to that rule, so the reader's own
// expansions last until they move on.
watch(
  () => page.value.relativePath,
  () => (open.value = isOpenHere())
)

function toggle() {
  open.value = !open.value
}

/** A label with children but no link toggles instead of navigating. */
const isToggleOnly = computed(() => hasChildren.value && !props.item.link)
</script>

<template>
  <li class="n-nav-item" :class="`n-nav-item--d${depth}`">
    <div class="n-nav-row">
      <component
        :is="item.link ? 'a' : 'button'"
        :href="item.link"
        :type="item.link ? undefined : 'button'"
        class="n-nav-link"
        :class="{ 'is-active': isCurrent, 'is-parent': isToggleOnly }"
        :aria-current="isCurrent ? (hashIndex < 0 ? 'page' : 'location') : undefined"
        :aria-expanded="hasChildren ? String(open) : undefined"
        @click="isToggleOnly ? toggle() : null"
      >
        <span class="n-nav-link__text">{{ item.text }}</span>
      </component>

      <button
        v-if="hasChildren && item.link"
        type="button"
        class="n-nav-caret"
        :aria-expanded="String(open)"
        :aria-label="`${open ? 'Collapse' : 'Expand'} ${item.text}`"
        @click="toggle"
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
          <path
            d="M6 4l4 4-4 4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>

      <svg
        v-else-if="hasChildren"
        class="n-nav-caret n-nav-caret--static"
        viewBox="0 0 16 16"
        width="14"
        height="14"
        aria-hidden="true"
      >
        <path
          d="M6 4l4 4-4 4"
          fill="none"
          stroke="currentColor"
          stroke-width="1.6"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>

    <ul
      v-if="sections.length"
      class="n-nav-sections"
      :aria-label="`Sections of ${item.text}`"
    >
      <li v-for="section in sections" :key="section.id">
        <a
          class="n-nav-section"
          :class="{ 'is-active': section.id === sectionId }"
          :href="section.link"
          :aria-current="section.id === sectionId ? 'location' : undefined"
        >
          {{ section.text }}
        </a>
      </li>
    </ul>

    <ul v-if="hasChildren && open" class="n-nav-children">
      <SideNavItem
        v-for="child in item.items"
        :key="child.text + (child.link || '')"
        :item="child"
        :depth="depth + 1"
      />
    </ul>
  </li>
</template>

<style scoped>
.n-nav-item {
  list-style: none;
}

.n-nav-row {
  display: flex;
  align-items: center;
  gap: 2px;
  border-radius: var(--n-radius-sm);
}

.n-nav-row:hover {
  background: var(--n-surface-hover);
}

.n-nav-link {
  flex: 1;
  min-width: 0;
  display: block;
  padding: 5px 8px;
  border: 0;
  background: none;
  color: var(--n-text-muted);
  font-size: var(--n-text-sm);
  font-weight: 500;
  line-height: 1.45;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition: color var(--n-transition);
}

.n-nav-link__text {
  display: block;
  /* Config labels carry a literal newline (\n) for a second line. */
  white-space: pre-line;
}

.n-nav-link:hover {
  color: var(--n-text);
}

.n-nav-link.is-active {
  color: var(--n-text);
  font-weight: 600;
}

/* A `#` row's page row is current too, and bold, so the `#` row marks the
   section in view the way the section list does: accent, normal weight. */
.n-nav-link.is-active[aria-current='location'] {
  color: var(--n-accent);
  font-weight: 500;
}

/* A subsection is lighter than the section label above it, and takes the full
   text colour once it is open. */
.n-nav-link.is-parent[aria-expanded='true'] {
  color: var(--n-text);
}

.n-nav-caret {
  display: grid;
  place-items: center;
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  border: 0;
  border-radius: var(--n-radius-sm);
  background: none;
  color: var(--n-text-faint);
  cursor: pointer;
  transition: transform var(--n-transition), color var(--n-transition);
}

.n-nav-caret--static {
  pointer-events: none;
}

.n-nav-caret:hover {
  color: var(--n-text);
}

.n-nav-row:has([aria-expanded='true']) .n-nav-caret {
  transform: rotate(90deg);
}

/* Nested lists sit on a hairline so depth reads at a glance. */
.n-nav-children {
  margin: 2px 0 4px 9px;
  padding-left: 7px;
  border-left: 1px solid var(--n-border);
  list-style: none;
}

/* The active row marks the hairline it hangs from. */
.n-nav-children:has(> .n-nav-item > .n-nav-row > .is-active) {
  border-left-color: var(--n-border-strong);
}

/* The current page's sections hang under its row on their own hairline, a
   size down and a shade fainter than page rows so the two never blur. The
   section in view takes the accent on the line and in its label, as in the
   right-hand outline. */
.n-nav-sections {
  margin: 1px 0 6px 9px;
  padding: 0;
  border-left: 1px solid var(--n-border);
  list-style: none;
}

.n-nav-section {
  display: block;
  /* The 2px marker sits over the 1px hairline. */
  margin-left: -1px;
  padding: 3px 8px 3px 12px;
  border-left: 2px solid transparent;
  color: var(--n-text-faint);
  font-size: 0.8125rem;
  line-height: 1.4;
  text-decoration: none;
  transition: color var(--n-transition), border-color var(--n-transition);
}

.n-nav-section:hover {
  color: var(--n-text);
}

.n-nav-section.is-active {
  border-left-color: var(--n-accent);
  color: var(--n-accent);
  font-weight: 500;
}

@media (prefers-reduced-motion: reduce) {
  .n-nav-section {
    transition: none;
  }
}
</style>
