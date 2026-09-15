import DefaultTheme from 'vitepress/theme-without-fonts'
import mediumZoom from 'medium-zoom'
import { nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

import './styles/tokens.css'
import './styles/base.css'
import './styles/doc.css'
import './styles/components.css'

import Layout from './Layout.vue'

// Content components carried over from the previous theme.
import Vimg from './components/Vimg.vue'
import ToggleSection from './components/ToggleSection.vue'
import ContactForm from './components/ContactForm.vue'
import LandingPage from './components/LandingPage.vue'
import HeroCarousel from './components/HeroCarousel.vue'
import HomeCarousel from './components/HomeCarousel.vue'
import SimpleCarousel from './components/SimpleCarousel.vue'
import YoutubeEmbed from './components/YoutubeEmbed.vue'

// Interactive building blocks, usable from any markdown page.
import Chooser from './components/interactive/Chooser.vue'
import ChooserResult from './components/interactive/ChooserResult.vue'
import Accordion from './components/interactive/Accordion.vue'
import AccordionGroup from './components/interactive/AccordionGroup.vue'
import Tabs from './components/interactive/Tabs.vue'
import Tab from './components/interactive/Tab.vue'
import Card from './components/interactive/Card.vue'
import CardGrid from './components/interactive/CardGrid.vue'
import Steps from './components/interactive/Steps.vue'
import CopyBlock from './components/interactive/CopyBlock.vue'
import Callout from './components/interactive/Callout.vue'

// `extends` still gives us the default theme's markdown-level pieces — code
// group tabs, `<Badge>`, and the local search dialog the nav bar imports.
// Only the Layout is replaced.
export default {
  extends: DefaultTheme,
  Layout,

  enhanceApp({ app }) {
    app.component('Vimg', Vimg)
    app.component('ToggleSection', ToggleSection)
    app.component('ContactForm', ContactForm)
    app.component('LandingPage', LandingPage)
    app.component('HeroCarousel', HeroCarousel)
    app.component('HomeCarousel', HomeCarousel)
    app.component('SimpleCarousel', SimpleCarousel)
    app.component('YoutubeEmbed', YoutubeEmbed)

    app.component('Chooser', Chooser)
    app.component('ChooserResult', ChooserResult)
    app.component('Accordion', Accordion)
    app.component('AccordionGroup', AccordionGroup)
    app.component('Tabs', Tabs)
    app.component('Tab', Tab)
    app.component('Card', Card)
    app.component('CardGrid', CardGrid)
    app.component('Steps', Steps)
    app.component('CopyBlock', CopyBlock)
    app.component('Callout', Callout)
  },

  setup() {
    const route = useRoute()
    const initZoom = () => {
      mediumZoom('.vimg > img, .vp-doc img:not(.no-zoom)', {
        background: 'var(--n-bg)',
      })
    }
    onMounted(initZoom)
    watch(
      () => route.path,
      () => nextTick(initZoom)
    )
  },
}
