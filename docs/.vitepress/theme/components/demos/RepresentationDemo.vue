<script setup>
/**
 * A working copy of the representation panel, as Nanome Web draws it, beside
 * a render of 1KV2's ligand in its binding site. The switches always show
 * what the render contains:
 *
 * - One atomistic style is on at a time, and one always stays on.
 * - Cartoon, Residue Label and Surface each come with the ligand as Stick,
 *   since that's how those renders were made, and one of them shows at a
 *   time.
 * - The interaction list shows the ligand as Stick, with the types that are
 *   switched on drawn.
 *
 * It steps through the styles by itself until the reader picks one.
 *
 *   <RepresentationDemo app="xr" />   labels as Nanome XR names them
 *   <RepresentationDemo app="web" />  labels as Nanome Web names them
 */
import { computed, reactive, ref } from 'vue'
import AppIcon from '../AppIcon.vue'
import DemoStage from './DemoStage.vue'
import { arrowPick } from './arrows.js'
import { useAutoplay } from './autoplay.js'
import {
  ATOMISTIC, HYDROGENS, HYDROGEN_DESC, INTERACTIONS, MACRO, SURFACES, SURFACE_DESC, interactionFrame,
} from './data.js'

const props = defineProps({ app: { type: String, default: 'web' } })
const label = (o) => (props.app === 'xr' ? o.xr : o.web)

/** The atomistic style on the ligand: bs, stick, wire or vdw. */
const atom = ref('bs')
/** What's added to it: null, cartoon, label or surface. */
const extra = ref(null)
const surface = ref('wire')
const hydrogen = ref('none')
const showList = ref(false)
const ints = reactive(Object.fromEntries(INTERACTIONS.map((t) => [t.key, t.on])))
const note = ref(null)
const count = computed(() => INTERACTIONS.filter((t) => ints[t.key]).length)

function frameFor(s) {
  if (s.list) return interactionFrame(ints)
  if (s.extra === 'surface') return SURFACES.find((x) => x.key === s.surface).src
  if (s.extra) return MACRO.find((x) => x.key === s.extra).src
  return ATOMISTIC.find((x) => x.key === s.atom).src
}
const state = () => ({ atom: atom.value, extra: extra.value, surface: surface.value, list: showList.value })
const src = computed(() => frameFor(state()))

/** Sets the whole state at once, so switches and render never disagree. */
function apply(next) {
  atom.value = next.atom
  extra.value = next.extra ?? null
  surface.value = next.surface ?? surface.value
  showList.value = !!next.list
}

// The tour: each atomistic style, Cartoon, Residue Label, each surface look,
// then the interactions.
const TOUR = [
  ...ATOMISTIC.map((a) => ({ atom: a.key })),
  ...MACRO.map((m) => ({ atom: 'stick', extra: m.key })),
  ...SURFACES.map((s) => ({ atom: 'stick', extra: 'surface', surface: s.key })),
  { atom: 'stick', list: true },
]
let at = 0
const root = ref(null)
const auto = useAutoplay(root, () => {
  at = (at + 1) % TOUR.length
  note.value = null
  apply(TOUR[at])
})
const next = computed(() => frameFor({ surface: surface.value, ...TOUR[(at + 1) % TOUR.length] }))

/** A switch is checked only when the state says so, whatever was clicked. */
function sync(e, on) {
  e.target.checked = on
}

function pickAtom(key, e) {
  auto.stop()
  note.value = null
  apply({ atom: key })
  sync(e, true)
}
function toggleExtra(key, e) {
  auto.stop()
  note.value = null
  if (extra.value === key && !showList.value) apply({ atom: atom.value })
  else apply({ atom: 'stick', extra: key })
  sync(e, extra.value === key)
}
function pickSurface(key) {
  auto.stop()
  note.value = null
  apply({ atom: 'stick', extra: 'surface', surface: key })
}
function pickHydrogen(key) {
  auto.stop()
  hydrogen.value = key
  note.value = { title: `Hydrogens · ${label(HYDROGENS.find((h) => h.key === key))}`, text: `${HYDROGEN_DESC[key]} 1KV2's file has no hydrogen atoms, so the render stays the same.` }
}
function toggleList() {
  auto.stop()
  note.value = null
  if (showList.value) apply({ atom: atom.value, extra: extra.value })
  else apply({ atom: 'stick', list: true })
}
function toggleType(t, e) {
  auto.stop()
  ints[t.key] = !ints[t.key]
  sync(e, ints[t.key])
  const absent = t.here ? '' : ' 1KV2’s binding site has none.'
  note.value = { title: `${t.name} ${ints[t.key] ? 'on' : 'off'}`, text: `${t.desc}${absent}` }
}

const caption = computed(() => {
  if (note.value) return note.value
  if (showList.value) {
    // Only the types 1KV2's binding site has are drawn, so name those.
    const shown = [
      ['hb', 'hydrogen bonds in yellow'],
      ['salt', 'salt bridges in orange'],
      ['hydrophobic', 'hydrophobic contacts in gray'],
    ].filter(([k]) => ints[k]).map(([, s]) => s)
    const list = shown.length > 1 ? `${shown.slice(0, -1).join(', ')} and ${shown.at(-1)}` : shown[0]
    return {
      title: `Interactions · ${count.value} ${count.value === 1 ? 'type' : 'types'} on`,
      text: list
        ? `Dashed lines between the atoms that interact. In this binding site: ${list}.`
        : count.value
          ? '1KV2’s binding site has none of the types that are on, so no lines show.'
          : 'Every type is off, so no lines show.',
    }
  }
  if (extra.value === 'surface') {
    const s = SURFACES.find((x) => x.key === surface.value)
    return { title: `Surface · ${s.name}`, text: `${s.desc} ${SURFACE_DESC}` }
  }
  if (extra.value) {
    const m = MACRO.find((x) => x.key === extra.value)
    return { title: label(m), text: `${m.desc} The ligand is drawn as Stick.` }
  }
  const a = ATOMISTIC.find((x) => x.key === atom.value)
  return { title: label(a), text: a.desc }
})

const alt = computed(() => `1KV2's binding site: ${caption.value.title}`)
</script>

<template>
  <div ref="root" class="n-demo" v-on="auto.hold">
    <div class="n-app-card n-app-reps" role="group" :aria-label="app === 'xr' ? 'Representations, as in Nanome XR' : 'Representations, as in Nanome Web'">
      <label v-for="a in ATOMISTIC" :key="a.key" class="n-app-row">
        <AppIcon :name="a.icon" size="1rem" />
        <span class="n-app-row__name">{{ label(a) }}</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="atom === a.key" @change="pickAtom(a.key, $event)" />
        <span class="n-app-palette" :class="{ 'is-on': atom === a.key }" aria-hidden="true"><AppIcon name="palette" size="0.95rem" /></span>
      </label>

      <div class="n-app-seg" role="group" aria-label="Hydrogens" @keydown="arrowPick">
        <button v-for="h in HYDROGENS" :key="h.key" type="button" :aria-pressed="hydrogen === h.key" :class="{ 'is-on': hydrogen === h.key }" @click="pickHydrogen(h.key)">
          <span><AppIcon :name="h.icon" size="0.85rem" />{{ label(h) }}</span>
        </button>
      </div>

      <hr />

      <template v-for="m in MACRO" :key="m.key">
        <label class="n-app-row">
          <AppIcon :name="m.icon" size="1rem" />
          <span class="n-app-row__name">{{ label(m) }}</span>
          <input type="checkbox" role="switch" class="n-app-switch" :checked="extra === m.key && !showList" @change="toggleExtra(m.key, $event)" />
          <span class="n-app-palette" :class="{ 'is-on': extra === m.key && !showList }" aria-hidden="true"><AppIcon name="palette" size="0.95rem" /></span>
        </label>
        <hr />
      </template>

      <label class="n-app-row">
        <AppIcon name="egg-fried" size="1rem" />
        <span class="n-app-row__name">Surface</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="extra === 'surface' && !showList" @change="toggleExtra('surface', $event)" />
        <span class="n-app-palette" :class="{ 'is-on': extra === 'surface' && !showList }" aria-hidden="true"><AppIcon name="palette" size="0.95rem" /></span>
      </label>
      <div class="n-app-seg" role="group" aria-label="Surface look" @keydown="arrowPick">
        <button v-for="s in SURFACES" :key="s.key" type="button" :aria-pressed="surface === s.key" :class="{ 'is-on': surface === s.key }" @click="pickSurface(s.key)">
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
          <input type="checkbox" role="switch" class="n-app-switch" :checked="ints[t.key]" @change="toggleType(t, $event)" />
        </label>
      </div>
    </div>

    <figure class="n-demo__view">
      <DemoStage :src="src" :next="auto.playing.value ? next : ''" :alt="alt" :playing="auto.playing.value" @toggle="auto.toggle" />
      <figcaption class="n-demo__caption" aria-live="polite"><strong>{{ caption.title }}</strong> {{ caption.text }}</figcaption>
    </figure>
  </div>
</template>
