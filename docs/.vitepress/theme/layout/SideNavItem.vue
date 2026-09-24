<script setup>
/**
 * One row in the left rail. Recursive: a row either links to a page, opens a
 * nested group, or does both. Groups start open when they contain the page
 * being read, so a deep link never lands with its own section collapsed.
 */
import { computed, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared.js'
import { hasActiveLink } from 'vitepress/dist/client/theme-default/support/sidebar.js'

const props = defineProps({
  item: { type: Object, required: true },
  depth: { type: Number, default: 0 },
})

const { page } = useData()

const hasChildren = computed(() => !!props.item.items?.length)

const containsActive = computed(() =>
  hasActiveLink(page.value.relativePath, props.item)
)

const isCurrent = computed(
  () =>
    !!props.item.link && isActive(page.value.relativePath, props.item.link)
)

// `collapsed: false` in the config means "start open"; anything else starts
// closed unless the current page lives inside.
const open = ref(props.item.collapsed === false || containsActive.value)

// Navigating into a collapsed group opens it; navigating away leaves it be, so
// the reader's own expansions survive a route change.
watch(containsActive, (inside) => {
  if (inside) open.value = true
})

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
        :aria-current="isCurrent ? 'page' : undefined"
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

.n-nav-item--d0 > .n-nav-row > .n-nav-link.is-parent {
  color: var(--n-text);
  font-weight: 600;
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
  margin: 2px 0 2px 9px;
  padding-left: 9px;
  border-left: 1px solid var(--n-border-soft);
  list-style: none;
}

/* The active row marks the hairline it hangs from. */
.n-nav-children:has(> .n-nav-item > .n-nav-row > .is-active) {
  border-left-color: var(--n-border-strong);
}
</style>
