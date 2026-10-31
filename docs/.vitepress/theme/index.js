// The default theme's global styles (variables, base, utilities, markdown
// content, code blocks) come first, so the cascade order is unchanged.
import 'vitepress/dist/client/theme-default/styles/vars.css'
import 'vitepress/dist/client/theme-default/styles/base.css'
import 'vitepress/dist/client/theme-default/styles/icons.css'
import 'vitepress/dist/client/theme-default/styles/utils.css'
import 'vitepress/dist/client/theme-default/styles/components/custom-block.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-code-group.css'
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'
import VPBadge from 'vitepress/dist/client/theme-default/components/VPBadge.vue'
import mediumZoom from 'medium-zoom'
import { nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vitepress'

import './styles/tokens.css'
import './styles/base.css'
import './styles/doc.css'
import './styles/components.css'

import Layout from './Layout.vue'
import NotFound from './NotFound.vue'

// Content components carried over from the previous theme.
import Vimg from './components/Vimg.vue'
import ToggleSection from './components/ToggleSection.vue'
import ContactForm from './components/ContactForm.vue'
import LandingPage from './components/LandingPage.vue'
import HeroCarousel from './components/HeroCarousel.vue'
import HomeCarousel from './components/HomeCarousel.vue'
import SimpleCarousel from './components/SimpleCarousel.vue'
import YoutubeEmbed from './components/YoutubeEmbed.vue'
import DocVideo from './components/DocVideo.vue'
import AppIcon from './components/AppIcon.vue'
import IconGrid from './components/IconGrid.vue'
import IconCard from './components/IconCard.vue'
import UiList from './components/UiList.vue'
import UiItem from './components/UiItem.vue'
import Btn from './components/Btn.vue'
import ShotRow from './components/ShotRow.vue'
import ScreenMap from './components/ScreenMap.vue'
import MapCard from './components/MapCard.vue'
import RepresentationDemo from './components/demos/RepresentationDemo.vue'
import ColorSchemeDemo from './components/demos/ColorSchemeDemo.vue'
import ThemeDemo from './components/demos/ThemeDemo.vue'
import DistanceDemo from './components/demos/DistanceDemo.vue'
import LigandTableDemo from './components/demos/LigandTableDemo.vue'
import './components/demos/app.css'

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

// The default theme's global styles and `<Badge>` are imported directly at the
// top, and the nav bar imports its search button and dialog. Only its Layout,
// and every component under it, is left out. The router shows NotFound in
// place of the page for a missing URL.
export default {
  Layout,
  NotFound,

  enhanceApp({ app, router }) {
    // A new page opens at its top, at its #section, or where Back left it,
    // straight away. The smooth scrolling base.css sets is for links within a
    // page, and would sweep the new page there from the old one's offset.
    // Back and Forward skip onBeforeRouteChange, so this starts in
    // onBeforePageLoad. Smooth scrolling comes back two frames after the
    // route change, once the router's own scroll has run.
    if (typeof window !== 'undefined') {
      const root = document.documentElement
      router.onBeforePageLoad = () => {
        root.style.scrollBehavior = 'auto'
      }
      router.onAfterRouteChange = () =>
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            root.style.scrollBehavior = ''
          })
        )
    }

    app.component('Badge', VPBadge)
    app.component('Vimg', Vimg)
    app.component('ToggleSection', ToggleSection)
    app.component('ContactForm', ContactForm)
    app.component('LandingPage', LandingPage)
    app.component('HeroCarousel', HeroCarousel)
    app.component('HomeCarousel', HomeCarousel)
    app.component('SimpleCarousel', SimpleCarousel)
    app.component('YoutubeEmbed', YoutubeEmbed)
    app.component('DocVideo', DocVideo)
    app.component('AppIcon', AppIcon)
    app.component('IconGrid', IconGrid)
    app.component('IconCard', IconCard)
    app.component('UiList', UiList)
    app.component('UiItem', UiItem)
    app.component('Btn', Btn)
    app.component('ShotRow', ShotRow)
    app.component('ScreenMap', ScreenMap)
    app.component('MapCard', MapCard)
    app.component('RepresentationDemo', RepresentationDemo)
    app.component('ColorSchemeDemo', ColorSchemeDemo)
    app.component('ThemeDemo', ThemeDemo)
    app.component('DistanceDemo', DistanceDemo)
    app.component('LigandTableDemo', LigandTableDemo)

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
    // One zoom for the whole visit. Each page swaps in its own images, so
    // the zoom's document listeners don't pile up as the reader moves on.
    // A click on an image inside a link follows the link, so those images get
    // no zoom view. Detaching closes an open zoom view, so its overlay can't
    // stay on the next page.
    let zoom
    const initZoom = () => {
      zoom ??= mediumZoom({ background: 'var(--n-bg)' })
      zoom.detach()
      zoom.attach('.vimg > img:not(a img), .vp-doc img:not(.no-zoom):not(a img)')
    }
    onMounted(initZoom)
    watch(
      () => route.path,
      () => nextTick(initZoom)
    )
  },
}
