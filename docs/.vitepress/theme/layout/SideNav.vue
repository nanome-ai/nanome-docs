<script setup>
/**
 * Left rail: the section list. Fixed under the nav bar on desktop, a slide-in
 * drawer below 960px.
 *
 * A top-level group that sets `collapsed` in the config becomes a section the
 * reader can fold away — with ~90 pages, showing every one at once would bury
 * the section the reader is actually in. Groups without `collapsed` stay open
 * as a plain labelled list.
 */
import { computed, ref } from 'vue'
import { useData } from 'vitepress'
import { hasActiveLink } from 'vitepress/dist/client/theme-default/support/sidebar.js'
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar.js'
import SideNavItem from './SideNavItem.vue'

defineProps({
  open: { type: Boolean, default: false },
})

// Active state is matched against the page's source path, not the URL — that
// is what VitePress's own helpers compare, and it survives `cleanUrls`.
const { page } = useData()
const { sidebarGroups } = useSidebar()

/**
 * Open state is derived rather than stored: the section holding the current
 * page is open, and a click sets an override that lasts until the next
 * navigation. Keyed by label, which is unique across the config.
 */
const overrides = ref({})

const groups = computed(() =>
  sidebarGroups.value.map((group) => ({
    ...group,
    collapsible: group.collapsed != null && !!group.text,
    active: hasActiveLink(page.value.relativePath, group.items || []),
  }))
)

function isOpen(group) {
  if (!group.collapsible) return true
  const override = overrides.value[group.text]
  return override === undefined ? group.active || !group.collapsed : override
}

function toggle(group) {
  overrides.value = { ...overrides.value, [group.text]: !isOpen(group) }
}
</script>

<template>
  <aside
    class="n-sidenav n-scroll"
    :class="{ 'is-open': open }"
    aria-label="Documentation sections"
  >
    <nav class="n-sidenav__inner">
      <div
        v-for="group in groups"
        :key="group.text || 'top'"
        class="n-sidenav__group"
        :class="{ 'is-active': group.active }"
      >
        <button
          v-if="group.collapsible"
          type="button"
          class="n-sidenav__label n-sidenav__label--button"
          :aria-expanded="String(isOpen(group))"
          @click="toggle(group)"
        >
          <span>{{ group.text }}</span>
          <svg
            class="n-sidenav__caret"
            :class="{ 'is-open': isOpen(group) }"
            viewBox="0 0 16 16"
            width="12"
            height="12"
            aria-hidden="true"
          >
            <path
              d="M4 6l4 4 4-4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <p v-else-if="group.text" class="n-sidenav__label">{{ group.text }}</p>

        <ul v-if="isOpen(group)" class="n-sidenav__list">
          <SideNavItem
            v-for="item in group.items"
            :key="item.text + (item.link || '')"
            :item="item"
          />
        </ul>
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.n-sidenav {
  position: fixed;
  top: var(--n-nav-height);
  bottom: 0;
  left: 0;
  z-index: 50;
  width: var(--n-sidebar-width);
  padding: 20px 12px 64px;
  background: var(--n-bg);
  overscroll-behavior: contain;
}

.n-sidenav__group + .n-sidenav__group {
  margin-top: 14px;
}

.n-sidenav__label {
  display: block;
  width: 100%;
  margin: 0 0 4px;
  padding: 5px 8px;
  border: 0;
  background: none;
  color: var(--n-text-faint);
  font-size: var(--n-text-xs);
  font-weight: 600;
  line-height: 1.4;
  text-align: left;
  letter-spacing: 0.01em;
  /* Config labels carry a literal newline for a second line. */
  white-space: pre-line;
}

.n-sidenav__label--button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  border-radius: var(--n-radius-sm);
  cursor: pointer;
  transition: color var(--n-transition), background var(--n-transition);
}

.n-sidenav__label--button:hover {
  background: var(--n-surface-hover);
  color: var(--n-text);
}

/* The section holding the current page reads a shade louder than the rest. */
.n-sidenav__group.is-active > .n-sidenav__label {
  color: var(--n-text);
}

.n-sidenav__caret {
  flex-shrink: 0;
  transition: transform var(--n-transition);
}

.n-sidenav__caret.is-open {
  transform: rotate(180deg);
}

.n-sidenav__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* --- Drawer below 960px -------------------------------------------------- */

@media (max-width: 959px) {
  .n-sidenav {
    top: 0;
    width: min(320px, 86vw);
    padding-top: 76px;
    border-right: 1px solid var(--n-border);
    box-shadow: var(--n-shadow-lg);
    transform: translateX(-100%);
    transition: transform 220ms var(--n-ease);
    visibility: hidden;
  }

  .n-sidenav.is-open {
    transform: translateX(0);
    visibility: visible;
  }
}

@media (prefers-reduced-motion: reduce) {
  .n-sidenav,
  .n-sidenav__caret {
    transition: none;
  }
}
</style>
