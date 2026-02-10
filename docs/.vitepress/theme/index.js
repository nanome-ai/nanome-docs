import { h } from 'vue'
import DefaultTheme from 'vitepress/theme'
import mediumZoom from 'medium-zoom'
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vitepress'

import './style.css'

// Import custom components
import Vimg from './components/Vimg.vue'
import ToggleSection from './components/ToggleSection.vue'
import ContactForm from './components/ContactForm.vue'
import LandingPage from './components/LandingPage.vue'
import HeroCarousel from './components/HeroCarousel.vue'
import HomeCarousel from './components/HomeCarousel.vue'
import SimpleCarousel from './components/SimpleCarousel.vue'

export default {
  extends: DefaultTheme,

  enhanceApp({ app }) {
    // Register global components
    app.component('Vimg', Vimg)
    app.component('ToggleSection', ToggleSection)
    app.component('ContactForm', ContactForm)
    app.component('LandingPage', LandingPage)
    app.component('HeroCarousel', HeroCarousel)
    app.component('HomeCarousel', HomeCarousel)
    app.component('SimpleCarousel', SimpleCarousel)
  },

  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.vimg > img', { background: 'var(--vp-c-bg)' })
    }
    onMounted(() => {
      initZoom()
    })
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    )
  }
}
