<script setup>
/**
 * A working copy of the theme list and the day and night button, as Nanome
 * Web's viewer settings draw them, beside the view in that theme. With
 * app="xr" the view is from a headset, with the Main Panel, controllers and
 * two other people's avatars; with app="web" it's the Nanome Web viewer.
 * It steps through each theme by day, then by night, until the reader picks.
 */
import { computed, ref } from 'vue'
import AppIcon from '../AppIcon.vue'
import DemoStage from './DemoStage.vue'
import { arrowPick } from './arrows.js'
import { useAutoplay } from './autoplay.js'
import { THEMES, themeFrame } from './data.js'

const props = defineProps({ app: { type: String, default: 'web' } })

const theme = ref('default')
const night = ref(false)

function stepOnce() {
  if (!night.value) {
    night.value = true
    return
  }
  night.value = false
  const i = THEMES.findIndex((t) => t.key === theme.value)
  theme.value = THEMES[(i + 1) % THEMES.length].key
}

const root = ref(null)
const auto = useAutoplay(root, stepOnce, 2600)
const next = computed(() => {
  if (!night.value) return themeFrame(props.app, theme.value, true)
  const i = THEMES.findIndex((t) => t.key === theme.value)
  return themeFrame(props.app, THEMES[(i + 1) % THEMES.length].key, false)
})

function pick(t) {
  auto.stop()
  theme.value = t.key
}
function flip() {
  auto.stop()
  night.value = !night.value
}

const current = computed(() => THEMES.find((t) => t.key === theme.value))
const src = computed(() => themeFrame(props.app, theme.value, night.value))
// Pure Black has no mountains in Nanome XR: every color in its sky is black.
function xrText() {
  return theme.value === 'pure-black'
    ? 'A plain black sky, the same by day and by night, with the floor under the structures.'
    : 'Mountains in the theme’s colors all around you, with the floor under the structures.'
}
const caption = computed(() => ({
  title: `${current.value.name} · ${night.value ? 'Night' : 'Day'}`,
  text: props.app === 'xr' ? xrText() : 'The viewer’s background in the theme’s colors.',
}))
</script>

<template>
  <div ref="root" class="n-demo" v-on="auto.hold">
    <div class="n-app-card n-app-themes is-spread" role="group" aria-label="Theme">
      <div class="n-app-themelist" role="group" aria-label="Theme" @keydown="arrowPick">
        <button
          v-for="t in THEMES"
          :key="t.key"
          type="button"
          class="n-app-theme"
          :class="{ 'is-on': theme === t.key }"
          :aria-pressed="theme === t.key"
          @click="pick(t)"
        >{{ t.name }}</button>
      </div>
      <div class="n-app-themebar">
        <button type="button" class="n-app-round" role="switch" :aria-checked="night" :aria-label="night ? 'Night. Switch to day' : 'Day. Switch to night'" @click="flip">
          <AppIcon :name="night ? 'moon' : 'sun'" size="1.1rem" />
        </button>
        <span class="n-app-field">{{ current.name }}</span>
      </div>
    </div>

    <figure class="n-demo__view">
      <DemoStage :src="src" :next="auto.playing.value ? next : ''" :alt="caption.title" :playing="auto.playing.value" @toggle="auto.toggle" />
      <figcaption class="n-demo__caption" aria-live="polite"><strong>{{ caption.title }}</strong> {{ caption.text }}</figcaption>
    </figure>
  </div>
</template>
