<script setup>
/**
 * The page shell: fixed nav bar, left section rail, centre column, right
 * in-page rail.
 *
 * The content wrapper keeps VitePress's `.VPDoc` class. That is not cosmetic —
 * `getHeaders()` in the outline composable selects `.VPDoc :where(h1,…,h6)`,
 * so dropping the class would empty the right-hand rail.
 */
import { computed, provide, ref, watch } from 'vue'
import { useData, useRoute } from 'vitepress'
import {
  useCloseSidebarOnEscape,
  useSidebar,
} from 'vitepress/dist/client/theme-default/composables/sidebar.js'
import NavBar from './layout/NavBar.vue'
import SideNav from './layout/SideNav.vue'
import Outline from './layout/Outline.vue'
import LocalNav from './layout/LocalNav.vue'
import DocFooter from './layout/DocFooter.vue'

const { frontmatter, isDark, page } = useData()
const route = useRoute()

const {
  isOpen: sidebarOpen,
  open: openSidebar,
  close: closeSidebar,
  toggle: toggleSidebar,
  hasSidebar,
  hasAside,
} = useSidebar()

watch(() => route.path, closeSidebar)
useCloseSidebarOnEscape(sidebarOpen, closeSidebar)

/** Cross-fade the theme switch when the browser supports it. */
provide('toggle-appearance', async ({ clientX: x = innerWidth / 2, clientY: y = innerHeight / 2 } = {}) => {
  const flip = () => (isDark.value = !isDark.value)

  if (
    !document.startViewTransition ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    flip()
    return
  }

  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  await document.startViewTransition(flip).ready

  document.documentElement.animate(
    {
      clipPath: [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${radius}px at ${x}px ${y}px)`,
      ],
    },
    {
      duration: 320,
      easing: 'ease-in',
      pseudoElement: '::view-transition-new(root)',
    }
  )
})

const isHome = computed(() => frontmatter.value.layout === 'home')
const showAside = computed(() => hasAside.value && !isHome.value)
</script>

<template>
  <Content v-if="frontmatter.layout === false" />

  <div
    v-else
    class="n-layout"
    :class="[
      frontmatter.pageClass,
      { 'has-sidebar': hasSidebar, 'has-aside': showAside },
    ]"
  >
    <a class="n-skip" href="#n-content">Skip to content</a>

    <NavBar
      :sidebar-open="sidebarOpen"
      :has-sidebar="hasSidebar"
      @toggle-sidebar="toggleSidebar"
    />

    <Transition name="n-fade">
      <div
        v-if="sidebarOpen"
        class="n-backdrop"
        @click="closeSidebar"
      />
    </Transition>

    <SideNav v-if="hasSidebar" :open="sidebarOpen" />

    <div class="n-body">
      <LocalNav v-if="showAside" />

      <div class="n-main">
        <main id="n-content" class="n-column">
          <div class="VPDoc">
            <div class="vp-doc">
              <Content />
            </div>
            <DocFooter v-if="!isHome && !page.isNotFound" />
          </div>
        </main>

        <Outline v-if="showAside" class="n-aside" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.n-layout {
  min-height: 100vh;
  padding-top: var(--n-nav-height);
}

.n-backdrop {
  position: fixed;
  inset: 0;
  z-index: 45;
  background: rgba(0, 0, 0, 0.55);
}

.n-fade-enter-active,
.n-fade-leave-active {
  transition: opacity 200ms var(--n-ease);
}

.n-fade-enter-from,
.n-fade-leave-to {
  opacity: 0;
}

/* --- Columns ------------------------------------------------------------- */

.n-main {
  position: relative;
}

.n-column {
  max-width: var(--n-content-max);
  margin: 0 auto;
  padding: 40px var(--n-gutter) 96px;
}

/* A page that turns the outline off (the home page, `aside: false`) is laying
   itself out rather than running prose, so give it the full measure instead of
   the 768px one that keeps body copy readable. */
.n-layout:not(.has-aside) .n-column {
  max-width: 1200px;
}

/* The two rails are `position: fixed`, so the centre column is positioned by
   padding rather than by a grid — that keeps the measure centred in whatever
   space is left, at every breakpoint. */
@media (min-width: 960px) {
  .n-layout.has-sidebar .n-body {
    padding-left: var(--n-sidebar-width);
  }
}

@media (min-width: 1280px) {
  .n-layout.has-aside .n-body {
    padding-right: var(--n-outline-width);
  }
}

@media (max-width: 1279px) {
  .n-aside {
    display: none;
  }
}

@media (max-width: 767px) {
  .n-column {
    padding: 28px 20px 72px;
  }
}
</style>

<style>
/* The view-transition cross-fade needs the old and new snapshots stacked
   rather than blended, so the expanding circle reads as a wipe. */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}

::view-transition-new(root) {
  z-index: 2;
}

.dark::view-transition-old(root) {
  z-index: 2;
}

.dark::view-transition-new(root) {
  z-index: 1;
}
</style>
