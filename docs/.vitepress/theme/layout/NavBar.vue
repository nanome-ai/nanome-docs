<script setup>
/**
 * Fixed top bar: logo lockup, the site-level links, search, and the light /
 * dark switch. Search is the default theme's dialog — reimplementing it would
 * mean reimplementing the local search index with it.
 */
import { computed, inject } from 'vue'
import { useData } from 'vitepress'
import { withBase } from 'vitepress'
import VPNavBarSearch from 'vitepress/dist/client/theme-default/components/VPNavBarSearch.vue'

defineProps({
  sidebarOpen: { type: Boolean, default: false },
  hasSidebar: { type: Boolean, default: true },
})

defineEmits(['toggle-sidebar'])

const { site, theme, isDark } = useData()

const toggleAppearance = inject('toggle-appearance', () => {
  isDark.value = !isDark.value
})

const logo = computed(() => {
  const l = theme.value.logo
  if (!l) return null
  return typeof l === 'string' ? { light: l, dark: l } : l
})

const navLinks = computed(() => theme.value.nav || [])

function isExternal(href) {
  return /^https?:\/\//.test(href)
}
</script>

<template>
  <header class="n-navbar">
    <div class="n-navbar__inner">
      <button
        v-if="hasSidebar"
        type="button"
        class="n-navbar__burger"
        :aria-expanded="String(sidebarOpen)"
        aria-label="Toggle documentation sections"
        @click="$emit('toggle-sidebar')"
      >
        <span class="n-burger" :class="{ 'is-open': sidebarOpen }" aria-hidden="true">
          <span /><span /><span />
        </span>
      </button>

      <a class="n-navbar__brand" :href="withBase('/')">
        <img
          v-if="logo"
          class="n-navbar__logo n-navbar__logo--light"
          :src="withBase(logo.light)"
          alt=""
        />
        <img
          v-if="logo"
          class="n-navbar__logo n-navbar__logo--dark"
          :src="withBase(logo.dark)"
          alt=""
        />
        <span class="n-navbar__title">{{ site.title }}</span>
      </a>

      <nav class="n-navbar__links" aria-label="Site">
        <a
          v-for="link in navLinks"
          :key="link.text"
          class="n-navbar__link"
          :href="isExternal(link.link) ? link.link : withBase(link.link)"
          :target="isExternal(link.link) ? '_blank' : undefined"
          :rel="isExternal(link.link) ? 'noopener noreferrer' : undefined"
        >
          {{ link.text }}
        </a>
      </nav>

      <div class="n-navbar__actions">
        <VPNavBarSearch class="n-navbar__search" />

        <button
          type="button"
          class="n-navbar__appearance"
          :title="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          :aria-label="isDark ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleAppearance"
        >
          <svg
            v-if="isDark"
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4.2" />
            <path
              d="M12 2.6v2M12 19.4v2M2.6 12h2M19.4 12h2M5.4 5.4l1.4 1.4M17.2 17.2l1.4 1.4M18.6 5.4l-1.4 1.4M6.8 17.2l-1.4 1.4"
            />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M20.5 14.3A8.6 8.6 0 1 1 9.7 3.5a6.8 6.8 0 0 0 10.8 10.8Z" />
          </svg>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.n-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 80;
  height: var(--n-nav-height);
  border-bottom: 1px solid var(--n-border-soft);
  background: color-mix(in srgb, var(--n-bg) 82%, transparent);
  backdrop-filter: saturate(150%) blur(12px);
}

.n-navbar__inner {
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
  padding: 0 20px;
}

/* --- Brand --------------------------------------------------------------- */

.n-navbar__brand {
  display: flex;
  align-items: center;
  gap: 9px;
  flex-shrink: 0;
  /* Line the lockup up with the rail beneath it, but let a long title spill
     into the gutter rather than truncate. */
  min-width: calc(var(--n-sidebar-width) - 32px);
}

.n-navbar__logo {
  height: 22px;
  width: auto;
  flex-shrink: 0;
}

.n-navbar__logo--dark {
  display: none;
}

.dark .n-navbar__logo--light {
  display: none;
}

.dark .n-navbar__logo--dark {
  display: block;
}

.n-navbar__title {
  color: var(--n-text-faint);
  font-size: var(--n-text-xs);
  font-weight: 500;
  letter-spacing: 0;
  white-space: nowrap;
}

/* --- Links --------------------------------------------------------------- */

.n-navbar__links {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
}

.n-navbar__link {
  padding: 6px 10px;
  border-radius: var(--n-radius-sm);
  color: var(--n-text-muted);
  font-size: var(--n-text-sm);
  font-weight: 500;
  white-space: nowrap;
  transition: color var(--n-transition), background var(--n-transition);
}

.n-navbar__link:hover {
  background: var(--n-surface-hover);
  color: var(--n-text);
}

/* --- Actions ------------------------------------------------------------- */

.n-navbar__actions {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.n-navbar__appearance {
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: var(--n-radius-sm);
  background: none;
  color: var(--n-text-muted);
  cursor: pointer;
  transition: color var(--n-transition), background var(--n-transition);
}

.n-navbar__appearance:hover {
  background: var(--n-surface-hover);
  color: var(--n-text);
}

/* --- Hamburger ----------------------------------------------------------- */

.n-navbar__burger {
  display: none;
  place-items: center;
  width: 32px;
  height: 32px;
  margin-left: -6px;
  border: 0;
  border-radius: var(--n-radius-sm);
  background: none;
  color: var(--n-text);
  cursor: pointer;
}

.n-burger {
  display: block;
  width: 17px;
  height: 12px;
  position: relative;
}

.n-burger span {
  position: absolute;
  left: 0;
  width: 100%;
  height: 1.6px;
  border-radius: 2px;
  background: currentColor;
  transition: transform 200ms var(--n-ease), opacity 120ms var(--n-ease);
}

.n-burger span:nth-child(1) { top: 0; }
.n-burger span:nth-child(2) { top: 5.2px; }
.n-burger span:nth-child(3) { top: 10.4px; }

.n-burger.is-open span:nth-child(1) {
  transform: translateY(5.2px) rotate(45deg);
}

.n-burger.is-open span:nth-child(2) {
  opacity: 0;
}

.n-burger.is-open span:nth-child(3) {
  transform: translateY(-5.2px) rotate(-45deg);
}

/* --- Narrow -------------------------------------------------------------- */

@media (max-width: 959px) {
  .n-navbar__burger {
    display: grid;
  }

  .n-navbar__brand {
    width: auto;
  }
}

@media (max-width: 767px) {
  .n-navbar__links {
    display: none;
  }

  .n-navbar__actions {
    margin-left: auto;
  }
}

@media (max-width: 420px) {
  .n-navbar__title {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .n-burger span {
    transition: none;
  }
}
</style>
