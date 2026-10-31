<script setup>
/**
 * A working copy of the color scheme menu, as Nanome Web draws it, beside a
 * render of 1KV2 in the scheme that's picked. Carbons only switches to the
 * render with that option on, where it changes the picture. It steps through
 * the schemes by itself until the reader picks one.
 *
 *   <ColorSchemeDemo app="xr" />   the schemes Nanome XR lists
 *   <ColorSchemeDemo app="web" />  the schemes Nanome Web lists
 */
import { computed, ref } from 'vue'
import DemoStage from './DemoStage.vue'
import { useAutoplay } from './autoplay.js'
import { CARBONS_DESC, SCHEMES, schemeFrame } from './data.js'

const props = defineProps({ app: { type: String, default: 'web' } })
const schemes = computed(() => SCHEMES.filter((s) => props.app === 'xr' || !s.xrOnly))
const playable = computed(() => schemes.value.filter((s) => !s.disabled))

const scheme = ref('element-type')
const carbons = ref(false)
const showCarbons = ref(false)

const root = ref(null)
const auto = useAutoplay(root, () => {
  const list = playable.value
  const i = list.findIndex((s) => s.key === scheme.value)
  scheme.value = list[(i + 1) % list.length].key
  showCarbons.value = false
})
const next = computed(() => {
  const list = playable.value
  const i = list.findIndex((s) => s.key === scheme.value)
  return schemeFrame(list[(i + 1) % list.length].key, carbons.value)
})

function pick(s) {
  if (s.disabled) return
  auto.stop()
  scheme.value = s.key
  showCarbons.value = false
}
function flipCarbons() {
  auto.stop()
  carbons.value = !carbons.value
  showCarbons.value = true
}

const current = computed(() => SCHEMES.find((s) => s.key === scheme.value))
const src = computed(() => schemeFrame(scheme.value, carbons.value))
const caption = computed(() => {
  const s = current.value
  if (showCarbons.value) {
    const same = s.carbons ? '' : ` With ${s.name}, it makes no difference in this view.`
    return { title: `Carbons only ${carbons.value ? 'on' : 'off'}`, text: `${CARBONS_DESC}${same}` }
  }
  return { title: s.name, text: s.desc }
})
</script>

<template>
  <div ref="root" class="n-demo" v-on="auto.hold">
    <div class="n-app-card n-app-schemes is-spread" role="group" aria-label="Color schemes">
      <div class="n-app-schemelist" role="group" aria-label="Color scheme">
        <button
          v-for="s in schemes"
          :key="s.key"
          type="button"
          class="n-app-scheme"
          :class="{ 'is-on': scheme === s.key }"
          :aria-pressed="scheme === s.key"
          :disabled="s.disabled"
          :title="s.disabled ? 'Listed when the entry has a DX map loaded' : undefined"
          @click="pick(s)"
        >{{ s.name }}</button>
      </div>
      <label class="n-app-row">
        <span class="n-app-row__name">Carbons only</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="carbons" @change="flipCarbons" />
      </label>
    </div>

    <figure class="n-demo__view">
      <DemoStage :src="src" :next="auto.playing.value ? next : ''" :alt="`1KV2 colored by ${current.name}`" :playing="auto.playing.value" @toggle="auto.toggle" />
      <figcaption class="n-demo__caption" aria-live="polite"><strong>{{ caption.title }}</strong> {{ caption.text }}</figcaption>
    </figure>
  </div>
</template>
