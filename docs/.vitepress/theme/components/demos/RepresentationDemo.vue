<script setup>
/**
 * A working copy of the representation panel, as Nanome Web draws it, beside
 * a render of 1KV2's ligand in its binding site, with the pocket around it
 * as Wire in every render. The switches always show what the render
 * contains:
 *
 * - One atomistic style is on at a time, and one always stays on.
 * - Cartoon, Residue Label and Surface each come with the ligand as Stick,
 *   since that's how those renders were made, and one of them shows at a
 *   time.
 * - The interaction list shows the ligand as Stick, with the types that are
 *   switched on drawn.
 * - None, Polar and All change every render: the frames come from 1KV2 with
 *   hydrogens added, and the setting applies to the ligand and the pocket.
 *
 * Each app has its own renders: Nanome XR's with its floor, Nanome Web's
 * without.
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
  ATOMISTIC, HB_HIDDEN, HYDROGENS, HYDROGEN_ADDED, HYDROGEN_DESC, INTERACTIONS, MACRO, SURFACES, SURFACE_DESC,
  SURFACE_H, interactionFrame, repFrame, surfaceFrame,
} from './data.js'

const props = defineProps({ app: { type: String, default: 'web' } })
const label = (o) => (props.app === 'xr' ? o.xr : o.web)
const hbHidden = () => HB_HIDDEN(label(HYDROGENS[0]))

/** The atomistic style on the ligand: bs, stick, wire or vdw. */
const atom = ref('bs')
/** What's added to it: null, cartoon, label or surface. */
const extra = ref(null)
// Nanome XR draws every atom style with All hydrogens, and a new surface is
// Semi (Atomistic.cs, MolecularSurface.Default).
const surface = ref(props.app === 'xr' ? 'semi' : 'wire')
const hydrogen = ref(props.app === 'xr' ? 'all' : 'none')
const showList = ref(false)
const ints = reactive(Object.fromEntries(INTERACTIONS.map((t) => [t.key, t.on])))
const note = ref(null)
const count = computed(() => INTERACTIONS.filter((t) => ints[t.key]).length)

function frameFor(s) {
  if (s.list) return interactionFrame(props.app, ints, s.h)
  if (s.extra === 'surface') return surfaceFrame(props.app, s.surface, s.h)
  if (s.extra) return repFrame(props.app, MACRO.find((x) => x.key === s.extra).file, s.h)
  return repFrame(props.app, ATOMISTIC.find((x) => x.key === s.atom).file, s.h)
}
const state = () => ({ atom: atom.value, extra: extra.value, surface: surface.value, list: showList.value, h: hydrogen.value })
const src = computed(() => frameFor(state()))

/** Sets the whole state at once, so switches and render never disagree. */
function apply(next) {
  atom.value = next.atom
  extra.value = next.extra ?? null
  surface.value = next.surface ?? surface.value
  showList.value = !!next.list
}

// The tour: each atomistic style, Cartoon, Residue Label, then each surface
// look. It leaves the interaction list closed, so the page below the card
// doesn't move; the reader opens it with Show.
const TOUR = [
  ...ATOMISTIC.map((a) => ({ atom: a.key })),
  ...MACRO.map((m) => ({ atom: 'stick', extra: m.key })),
  ...SURFACES.map((s) => ({ atom: 'stick', extra: 'surface', surface: s.key })),
]
const at = ref(0)
const root = ref(null)
const auto = useAutoplay(root, () => {
  at.value = (at.value + 1) % TOUR.length
  note.value = null
  apply(TOUR[at.value])
})
const next = computed(() => frameFor({ surface: surface.value, h: hydrogen.value, ...TOUR[(at.value + 1) % TOUR.length] }))

/**
 * Points the tour at the state on show, so Play carries on from the reader's
 * pick. The open interaction list isn't in the tour, so Play starts it over.
 */
function syncAt() {
  if (showList.value) {
    at.value = TOUR.length - 1
    return
  }
  const i = TOUR.findIndex(
    (t) => t.atom === atom.value && (t.extra ?? null) === extra.value && (t.surface ?? surface.value) === surface.value
  )
  if (i >= 0) at.value = i
}

// Nanome XR lights a surface look only while Surface is on (RepresentationsPopup).
const lookOn = (key) => surface.value === key && (props.app !== 'xr' || (extra.value === 'surface' && !showList.value))

/** A switch is checked only when the state says so, whatever was clicked. */
function sync(e, on) {
  e.target.checked = on
}

function pickAtom(key, e) {
  auto.stop()
  note.value = null
  apply({ atom: key })
  sync(e, true)
  syncAt()
}
function toggleExtra(key, e) {
  auto.stop()
  note.value = null
  if (extra.value === key && !showList.value) apply({ atom: atom.value })
  // Nanome XR makes a new surface Semi each time Surface is switched on.
  else apply({ atom: 'stick', extra: key, surface: key === 'surface' && props.app === 'xr' ? 'semi' : undefined })
  sync(e, extra.value === key)
  syncAt()
}
function pickSurface(key) {
  auto.stop()
  note.value = null
  apply({ atom: 'stick', extra: 'surface', surface: key })
  syncAt()
}
function pickHydrogen(key) {
  auto.stop()
  hydrogen.value = key
  // What else the setting does to the render on show.
  const more = showList.value
    ? ints.hb && (key === 'none' ? hbHidden() : 'All 5 hydrogen bonds show, as each starts at a polar hydrogen.')
    : extra.value === 'surface' && SURFACE_H
  const text = [HYDROGEN_DESC[key], key !== 'none' && HYDROGEN_ADDED, more].filter(Boolean).join(' ')
  note.value = { title: `Hydrogens · ${label(HYDROGENS.find((h) => h.key === key))}`, text }
}
// In the app, Show and Hide only open and close the list. The copy's
// interaction renders draw the ligand as Stick, so Hide puts back the
// representation that was on before Show.
let beforeList = null
function toggleList() {
  auto.stop()
  note.value = null
  if (showList.value) {
    apply(beforeList ?? { atom: atom.value })
    beforeList = null
  } else {
    beforeList = { atom: atom.value, extra: extra.value, surface: surface.value }
    apply({ atom: 'stick', list: true })
  }
  syncAt()
}
function toggleType(t, e) {
  auto.stop()
  ints[t.key] = !ints[t.key]
  sync(e, ints[t.key])
  const absent = t.here ? '' : ' 1KV2’s binding site has none.'
  const hidden = t.needsH && ints[t.key] && hydrogen.value === 'none' ? ` ${hbHidden()}` : ''
  note.value = { title: `${t.name} ${ints[t.key] ? 'on' : 'off'}`, text: `${t.desc}${absent}${hidden}` }
}

/** The line for the render on show, without a note about the last click. */
const base = computed(() => {
  if (showList.value) {
    // Only the types 1KV2's binding site has are drawn, so name those. With
    // None the hydrogen bonds hide along with their hydrogens.
    const noH = hydrogen.value === 'none'
    const shown = INTERACTIONS.filter((t) => t.here && ints[t.key] && !(t.needsH && noH)).map((t) => t.shown(t.here))
    const list = shown.length > 1 ? `${shown.slice(0, -1).join(', ')} and ${shown.at(-1)}` : shown[0]
    // Pocket + Ligand draws every interaction inside it, and both salt
    // bridges here join pocket residues.
    const salt = ints.salt ? ' Both salt bridges join pocket residues to each other.' : ''
    const hidden = ints.hb && noH ? ` ${hbHidden()}` : ''
    return {
      title: `Interactions · ${count.value} ${count.value === 1 ? 'type' : 'types'} on`,
      text: list
        ? `Dashed lines between the atoms that interact. In this binding site: ${list}.${salt}${hidden}`
        : hidden
          ? `No lines show.${hidden}`
          : count.value
            ? '1KV2’s binding site has none of the types that are on, so no lines show.'
            : 'Every type is off, so no lines show.',
    }
  }
  if (extra.value === 'surface') {
    const s = SURFACES.find((x) => x.key === surface.value)
    return { title: `Surface · ${s.name}`, text: [s.desc, SURFACE_DESC, s.after].filter(Boolean).join(' ') }
  }
  if (extra.value) {
    const m = MACRO.find((x) => x.key === extra.value)
    return { title: label(m), text: m.desc }
  }
  const a = ATOMISTIC.find((x) => x.key === atom.value)
  return { title: label(a), text: a.desc }
})
const caption = computed(() => note.value || base.value)

const H_ALT = { none: 'no hydrogens', polar: 'polar hydrogens', all: 'all hydrogens' }
const alt = computed(() => `1KV2's binding site: ${base.value.title}, ${H_ALT[hydrogen.value]}`)
</script>

<template>
  <div ref="root" class="n-demo n-reps-demo" v-on="auto.hold">
    <div class="n-app-card n-app-reps" role="group" :aria-label="app === 'xr' ? 'Representations, as in Nanome XR' : 'Representations, as in Nanome Web'">
      <label v-for="a in ATOMISTIC" :key="a.key" class="n-app-row">
        <AppIcon :name="a.icon" size="1rem" />
        <span class="n-app-row__name">{{ label(a) }}</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="atom === a.key" @change="pickAtom(a.key, $event)" />
        <span class="n-app-palette" :class="{ 'is-on': atom === a.key }" aria-hidden="true" @click.prevent><AppIcon name="palette" size="0.95rem" /></span>
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
          <span class="n-app-palette" :class="{ 'is-on': extra === m.key && !showList }" aria-hidden="true" @click.prevent><AppIcon name="palette" size="0.95rem" /></span>
        </label>
        <hr />
      </template>

      <label class="n-app-row">
        <AppIcon name="egg-fried" size="1rem" />
        <span class="n-app-row__name">Surface</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="extra === 'surface' && !showList" @change="toggleExtra('surface', $event)" />
        <span class="n-app-palette" :class="{ 'is-on': extra === 'surface' && !showList }" aria-hidden="true" @click.prevent><AppIcon name="palette" size="0.95rem" /></span>
      </label>
      <div class="n-app-seg" role="group" aria-label="Surface look" @keydown="arrowPick">
        <button v-for="s in SURFACES" :key="s.key" type="button" :aria-pressed="lookOn(s.key)" :class="{ 'is-on': lookOn(s.key) }" @click="pickSurface(s.key)">
          <span><AppIcon :name="s.icon" size="0.85rem" />{{ s.name }}</span>
        </button>
      </div>

      <hr />

      <div class="n-app-row n-app-ints">
        <!-- Nanome Web draws a mist icon here. Nanome XR's label is a NanoText, which has no icon. -->
        <AppIcon v-if="app !== 'xr'" name="mist" size="1rem" />
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
      <figcaption class="n-demo__caption" :aria-live="auto.playing.value ? 'off' : 'polite'"><strong>{{ caption.title }}</strong> {{ caption.text }}</figcaption>
    </figure>
  </div>
</template>

<style>
/* Under the render on a phone, room for the longest caption in the tour, so
   the page below doesn't move as it steps. */
@media (max-width: 599px) {
  .n-reps-demo .n-demo__caption {
    min-height: 6em;
  }
}

@media (max-width: 413px) {
  .n-reps-demo .n-demo__caption {
    min-height: 7.5em;
  }
}

@media (max-width: 349px) {
  .n-reps-demo .n-demo__caption {
    min-height: 9em;
  }
}
</style>
