<script setup>
/**
 * A working copy of the representation panel, as Nanome Web draws it, beside
 * a render of 1KV2's binding site. Each switch, segment and interaction type
 * swaps the render for one made in the app with that option on, and the line
 * under it says what the option does. It steps through the styles by itself
 * until the reader picks one.
 *
 *   <RepresentationDemo app="xr" />   labels as Nanome XR names them
 *   <RepresentationDemo app="web" />  labels as Nanome Web names them
 */
import { computed, reactive, ref } from 'vue'
import AppIcon from '../AppIcon.vue'
import DemoStage from './DemoStage.vue'
import { useAutoplay } from './autoplay.js'
import {
  ATOMISTIC, HYDROGENS, HYDROGEN_DESC, INTERACTIONS, MACRO, SURFACES, SURFACE_DESC, interactionFrame,
} from './data.js'

const props = defineProps({ app: { type: String, default: 'web' } })
const label = (o) => (props.app === 'xr' ? o.xr : o.web)

const view = ref('bs')
const surface = ref('wire')
const hydrogen = ref('none')
const showList = ref(false)
const ints = reactive(Object.fromEntries(INTERACTIONS.map((t) => [t.key, t.on])))
const note = ref(null)
const count = computed(() => INTERACTIONS.filter((t) => ints[t.key]).length)

function frameOf(v, s) {
  if (v === 'surface') return SURFACES.find((x) => x.key === s).src
  if (v === 'int') return interactionFrame(ints)
  return [...ATOMISTIC, ...MACRO].find((x) => x.key === v).src
}

const src = computed(() => frameOf(view.value, surface.value))

// The tour: each style, each surface look, then the interactions.
const TOUR = [
  ...ATOMISTIC.map((a) => ['rep', a.key]),
  ...MACRO.map((m) => ['rep', m.key]),
  ...SURFACES.map((s) => ['surface', s.key]),
  ['int'],
]
let at = 0
function apply([kind, key]) {
  note.value = null
  if (kind === 'surface') {
    view.value = 'surface'
    surface.value = key
  } else if (kind === 'int') {
    view.value = 'int'
    showList.value = true
  } else {
    view.value = key
    showList.value = false
  }
}
const root = ref(null)
const auto = useAutoplay(root, () => {
  at = (at + 1) % TOUR.length
  apply(TOUR[at])
})
const next = computed(() => {
  const [kind, key] = TOUR[(at + 1) % TOUR.length]
  return kind === 'int' ? interactionFrame(ints) : frameOf(kind === 'surface' ? 'surface' : key, key)
})

function pickRep(key) {
  auto.stop()
  note.value = null
  view.value = key
}
function pickSurface(key) {
  auto.stop()
  note.value = null
  view.value = 'surface'
  surface.value = key
}
function pickHydrogen(key) {
  auto.stop()
  hydrogen.value = key
  note.value = { title: `Hydrogens · ${label(HYDROGENS.find((h) => h.key === key))}`, text: `${HYDROGEN_DESC[key]} 1KV2's file has no hydrogen atoms, so the render stays the same.` }
}
function toggleList() {
  auto.stop()
  showList.value = !showList.value
  if (showList.value) {
    view.value = 'int'
    note.value = null
  }
}
function toggleType(t) {
  auto.stop()
  ints[t.key] = !ints[t.key]
  view.value = 'int'
  const absent = t.here ? '' : ' 1KV2’s binding site has none.'
  note.value = { title: `${t.name} ${ints[t.key] ? 'on' : 'off'}`, text: `${t.desc}${absent}` }
}

const caption = computed(() => {
  if (note.value) return note.value
  if (view.value === 'surface') {
    const s = SURFACES.find((x) => x.key === surface.value)
    return { title: `Surface · ${s.name}`, text: `${s.desc} ${SURFACE_DESC}` }
  }
  if (view.value === 'int') {
    return {
      title: `Interactions · ${count.value} types on`,
      text: 'Dashed lines between the atoms that interact. In this binding site: hydrogen bonds in yellow, salt bridges in orange and hydrophobic contacts in gray.',
    }
  }
  const o = [...ATOMISTIC, ...MACRO].find((x) => x.key === view.value)
  return { title: label(o), text: o.desc }
})

const alt = computed(() => `1KV2's binding site: ${caption.value.title}`)
</script>

<template>
  <div ref="root" class="n-demo" v-on="auto.hold">
    <div class="n-app-card n-app-reps" role="group" :aria-label="app === 'xr' ? 'Representations, as in Nanome XR' : 'Representations, as in Nanome Web'">
      <label v-for="a in ATOMISTIC" :key="a.key" class="n-app-row">
        <AppIcon :name="a.icon" size="1rem" />
        <span class="n-app-row__name">{{ label(a) }}</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="view === a.key" @change="pickRep(a.key)" />
        <span class="n-app-palette" :class="{ 'is-on': view === a.key }" aria-hidden="true"><AppIcon name="palette" size="0.95rem" /></span>
      </label>

      <div class="n-app-seg" role="radiogroup" aria-label="Hydrogens">
        <button v-for="h in HYDROGENS" :key="h.key" type="button" role="radio" :aria-checked="hydrogen === h.key" :class="{ 'is-on': hydrogen === h.key }" @click="pickHydrogen(h.key)">
          <span><AppIcon :name="h.icon" size="0.85rem" />{{ label(h) }}</span>
        </button>
      </div>

      <hr />

      <template v-for="m in MACRO" :key="m.key">
        <label class="n-app-row">
          <AppIcon :name="m.icon" size="1rem" />
          <span class="n-app-row__name">{{ label(m) }}</span>
          <input type="checkbox" role="switch" class="n-app-switch" :checked="view === m.key" @change="pickRep(m.key)" />
          <span class="n-app-palette" :class="{ 'is-on': view === m.key }" aria-hidden="true"><AppIcon name="palette" size="0.95rem" /></span>
        </label>
        <hr />
      </template>

      <label class="n-app-row">
        <AppIcon name="egg-fried" size="1rem" />
        <span class="n-app-row__name">Surface</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="view === 'surface'" @change="pickSurface(surface)" />
        <span class="n-app-palette" :class="{ 'is-on': view === 'surface' }" aria-hidden="true"><AppIcon name="palette" size="0.95rem" /></span>
      </label>
      <div class="n-app-seg" role="radiogroup" aria-label="Surface look">
        <button v-for="s in SURFACES" :key="s.key" type="button" role="radio" :aria-checked="view === 'surface' && surface === s.key" :class="{ 'is-on': view === 'surface' && surface === s.key }" @click="pickSurface(s.key)">
          <span><AppIcon :name="s.icon" size="0.85rem" />{{ s.name }}</span>
        </button>
      </div>

      <hr />

      <div class="n-app-row n-app-ints">
        <AppIcon name="mist" size="1rem" />
        <span class="n-app-row__name">Interactions <span class="n-app-badge">{{ count }}</span></span>
        <button type="button" class="n-app-pill" :aria-expanded="showList" @click="toggleList">
          <span class="n-app-caret" :class="{ 'is-up': showList }" aria-hidden="true" />{{ showList ? 'Hide' : 'Show' }}
        </button>
      </div>
      <div v-if="showList" class="n-app-intlist">
        <label v-for="t in INTERACTIONS" :key="t.key" class="n-app-row is-small">
          <span class="n-app-dot" :style="{ background: t.color }" aria-hidden="true" />
          <span class="n-app-row__name">{{ t.name }}</span>
          <input type="checkbox" role="switch" class="n-app-switch" :checked="ints[t.key]" @change="toggleType(t)" />
        </label>
      </div>
    </div>

    <figure class="n-demo__view">
      <DemoStage :src="src" :next="auto.playing.value ? next : ''" :alt="alt" :playing="auto.playing.value" @toggle="auto.toggle" />
      <figcaption class="n-demo__caption" aria-live="polite"><strong>{{ caption.title }}</strong> {{ caption.text }}</figcaption>
    </figure>
  </div>
</template>
