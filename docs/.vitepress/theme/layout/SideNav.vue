<script setup>
/**
 * Left rail: the section list. Fixed under the nav bar on desktop, a slide-in
 * drawer below 960px.
 *
 * A top-level group that sets `collapsed` in the config becomes a section the
 * reader can fold away — with ~90 pages, showing every one at once would bury
 * the section the reader is actually in. Groups without `collapsed` stay open
 * as a plain labelled list.
 *
 * On every page, the groups holding it are open and the others are closed, so
 * the rail always shows where the reader is. A page the sidebar doesn't list
 * opens the group its folder belongs to (page-trail.js). The page's own row
 * lists its sections (SideNavItem), and the rail scrolls itself to keep the
 * page and the section in view.
 */
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useData } from 'vitepress'
import { hasActiveLink } from 'vitepress/dist/client/theme-default/support/sidebar.js'
import { useSidebar } from 'vitepress/dist/client/theme-default/composables/sidebar.js'
import SideNavItem from './SideNavItem.vue'
import { useSectionSpy } from './section-spy.js'
import { inTrail, usePageTrail } from './page-trail.js'

const props = defineProps({
  open: { type: Boolean, default: false },
})

// Any link, including a section on the same page, so the drawer can close.
const emit = defineEmits(['navigate'])

// Active state is matched against the page's source path, not the URL — that
// is what VitePress's own helpers compare, and it survives `cleanUrls`.
const { page } = useData()
const { sidebarGroups } = useSidebar()
const sectionId = useSectionSpy()
const pageTrail = usePageTrail()

/**
 * Open state is derived rather than stored: the section holding the current
 * page is open, and a click sets an override that lasts until the next
 * navigation. Keyed by label, which is unique across the config.
 */
const overrides = ref({})

const rail = ref(null)

/**
 * Scrolls the rail until `el` is in sight, leaving the page where it is. A
 * row that has to come into view lands near the top, so the sections under
 * it show too; a section only moves as far as it must.
 */
function reveal(el, { nearest = false } = {}) {
  if (!el || !rail.value) return
  const box = rail.value.getBoundingClientRect()
  const row = el.getBoundingClientRect()
  const margin = 24
  if (row.top >= box.top + margin && row.bottom <= box.bottom - margin) return
  rail.value.scrollTop +=
    nearest && row.bottom > box.bottom - margin
      ? row.bottom - box.bottom + margin
      : row.top - box.top - (nearest ? margin : 2 * margin)
}

function revealPage() {
  nextTick(() => reveal(rail.value?.querySelector('[aria-current="page"]')))
}

function onClick(event) {
  if (event.target.closest('a')) emit('navigate')
}

watch(
  () => page.value.relativePath,
  () => {
    overrides.value = {}
    revealPage()
  }
)

watch(sectionId, () =>
  nextTick(() =>
    reveal(rail.value?.querySelector('[aria-current="location"]'), { nearest: true })
  )
)

// The drawer is laid out while hidden, but only worth scrolling once open.
watch(
  () => props.open,
  (isOpen) => isOpen && revealPage()
)

onMounted(revealPage)

const groups = computed(() =>
  sidebarGroups.value.map((group) => ({
    ...group,
    collapsible: group.collapsed != null && !!group.text,
    active:
      hasActiveLink(page.value.relativePath, group.items || []) ||
      inTrail(pageTrail.value, group),
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
    ref="rail"
    class="n-sidenav n-scroll"
    :class="{ 'is-open': open }"
    aria-label="Documentation sections"
  >
    <nav class="n-sidenav__inner" @click="onClick">
      <div
        v-for="group in groups"
        :key="group.text || 'top'"
        class="n-sidenav__group"
        :class="{ 'is-active': group.active, 'is-open': group.collapsible && isOpen(group) }"
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
            width="14"
            height="14"
            aria-hidden="true"
          >
            <path
              d="M6 4l4 4-4 4"
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
  /* One step above the rows it holds, so a section never reads as smaller
     than its own subsections. */
  color: var(--n-text-muted);
  font-size: var(--n-text-base);
  font-weight: 600;
  line-height: 1.4;
  text-align: left;
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

/* An open section, and the one holding the current page, read a shade louder
   than the rest — a heading should not be dimmer than the rows under it. */
.n-sidenav__group.is-active > .n-sidenav__label,
.n-sidenav__group.is-open > .n-sidenav__label {
  color: var(--n-text);
}

.n-sidenav__caret {
  flex-shrink: 0;
  /* Lines up with the arrows on the rows below, which sit in a 22px box. */
  margin-right: -4px;
  color: var(--n-text-faint);
  transition: transform var(--n-transition);
}

.n-sidenav__caret.is-open {
  transform: rotate(90deg);
}

.n-sidenav__list {
  margin: 0;
  padding: 0;
  list-style: none;
}

/* Rows inside an open section step in on a guide line in the accent colour,
   and the section's arrow takes the same colour. The line runs the full height
   of the section, so it shows both which section is open and what belongs to
   it. */
.n-sidenav__group.is-open > .n-sidenav__list {
  margin: 2px 0 4px 9px;
  padding-left: 6px;
  border-left: 2px solid var(--n-accent);
}

.n-sidenav__group.is-open > .n-sidenav__label > .n-sidenav__caret {
  color: var(--n-accent);
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
