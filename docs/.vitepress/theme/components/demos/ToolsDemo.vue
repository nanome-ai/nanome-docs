<script setup>
/**
 * The tools of the Tools Panel beside a render of the dominant-hand
 * controller in Nanome XR 2.7.1, for every tool and mode: the badge above
 * the controller, the tip sphere, and the mode hint above the thumbstick.
 * The renders were made in the XR simulator from one camera and controller
 * pose, so only the tool and mode change between them. A close-up of the
 * controller sits in the corner of the render, so the badge and the hint
 * stay readable at any width.
 *
 * What the copy follows (Assets/Scripts/src in the 2.7.1 source):
 * - Tools, modes and their icons: ToolsViewModel.ToolIcons, ToolModeLabels
 *   and ToolModes. The rail shows `link` for the Interactions Tool, while
 *   its badge shows `pin` (ToolsMenu, ToolsViewModel.ToolIcons).
 * - The hint shows only for a tool with 2 or more modes and one set, and
 *   its name stays for 1 second after a change; in Delete the badge turns
 *   red (ControllerToolMenu). The renders keep the name on.
 * - Thumbstick left and right step through the modes and wrap around
 *   (ToolsViewModel.SelectModeOffset); in the Residue Editor they step
 *   through rotamers instead (RotamerBuilder).
 * - The Builder has no mode until a ligand is open, which opens in Build
 *   (LigandBuilder).
 *
 * It steps through every tool and mode by itself until the reader picks one.
 *
 *   <ToolsDemo />
 */
import { computed, ref, watch } from 'vue'
import AppIcon from '../AppIcon.vue'
import DemoStage from './DemoStage.vue'
import { arrowPick } from './arrows.js'
import { useAutoplay } from './autoplay.js'
import { imageInfo } from '../image.js'

const O = 'nanome-v2/v2-7/options/'

const MODES = {
  atom: { label: 'Atom', icon: 'atom' },
  residue: { label: 'Residue', icon: 'hexagons' },
  chain: { label: 'Chain', icon: 'scribble' },
  distance: { label: 'Distance', icon: 'ruler-measure' },
  angle: { label: 'Angle', icon: 'angle' },
  dihedral: { label: 'Dihedral', icon: 'rotate-clockwise-2' },
  text: { label: 'Text', icon: 'text-size' },
  sound: { label: 'Sound', icon: 'volume' },
  build: { label: 'Build', icon: 'plus' },
  replace: { label: 'Replace', icon: 'replace' },
  bond: { label: 'Bond', icon: 'line' },
  delete: { label: 'Delete', icon: 'trash' },
}

/**
 * The tools in the rail's order, with their rail icons and page names.
 * `none` is the line in place of the modes for a tool that has none to
 * step through, and `stick` is what the thumbstick does then.
 */
const TOOLS = [
  { key: 'pointer', name: 'Pointer', icon: 'droplet', none: 'No modes', stick: 'The Pointer has no modes, so left and right change nothing.' },
  { key: 'selection', name: 'Selection Tool', icon: 'lasso', modes: ['atom', 'residue', 'chain'] },
  { key: 'measurement', name: 'Measurement Tool', icon: 'ruler-2', modes: ['distance', 'angle', 'dihedral', 'delete'] },
  { key: 'comments', name: 'Comments', icon: 'message', modes: ['text', 'sound', 'delete'] },
  { key: 'interactions', name: 'Interactions Tool', icon: 'link', none: 'No modes', stick: 'The Interactions Tool has no modes, so left and right change nothing.' },
  { key: 'builder', name: 'Builder Tool', icon: 'hexagon-plus-2', modes: ['build', 'replace', 'bond', 'delete'], stick: 'No ligand is open, so there are no modes to step through yet.' },
  { key: 'torsion', name: 'Torsion Tool', icon: 'rotate-360', none: 'One mode, so no hint', stick: 'The Torsion Tool has one mode, so left and right change nothing.' },
  { key: 'residue-editor', name: 'Residue Editor', icon: 'arrow-rotary-first-left', none: 'One mode, so no hint' },
  { key: 'mara-tools', name: 'MARA Tools', icon: 'tool', none: 'No modes', stick: 'MARA Tools has no modes, so left and right change nothing.' },
]
const BY_KEY = Object.fromEntries(TOOLS.map((t) => [t.key, t]))

const HINT = (m) => `${MODES[m].label} shows above the thumbstick.`
// For the mode a tool starts in: what the hint does after a change.
const FIRST = (m) => `Above the thumbstick, the ${MODES[m].label} icon stays and its name shows for 1 second after a change.`

/** What the trigger does and what the controller shows, per state. */
const TEXT = {
  pointer: 'The trigger selects or deselects the residue under the pointer. The Pointer has no badge, no tip sphere and no modes.',
  'selection-atom': `The trigger selects or deselects the atom at the tip. The badge shows a lasso. ${FIRST('atom')}`,
  'selection-residue': `The trigger selects or deselects the whole residue at the tip, and ${HINT('residue')}`,
  'selection-chain': `The trigger selects or deselects the whole chain at the tip, and ${HINT('chain')}`,
  'measurement-distance': `Picking 2 atoms measures their distance. The badge shows a ruler. ${FIRST('distance')}`,
  'measurement-angle': `Picking 3 atoms measures the angle at the second one, and ${HINT('angle')}`,
  'measurement-dihedral': `Picking 4 atoms measures the dihedral around the axis from atom 2 to atom 3, and ${HINT('dihedral')}`,
  'measurement-delete': `Pulling the trigger on a measurement removes it. The badge and the tip sphere turn red, and ${HINT('delete')}`,
  'comments-text': `Pulling the trigger on an atom starts a text note there. The badge shows a speech bubble. ${FIRST('text')}`,
  'comments-sound': `Pulling the trigger on an atom starts a sound note there, and ${HINT('sound')}`,
  // Delete aims only at text notes (StructureInteractor); a sound note is
  // deleted from its row's menu in the panel (CommentsMenu).
  'comments-delete': `Pulling the trigger on a text note deletes it. Sound notes are deleted from their row in the panel. The badge and the tip sphere turn red, and ${HINT('delete')}`,
  interactions: 'The trigger pins the interaction at the tip, or unpins a pinned one. The badge shows a pin where the rail shows a link, and an unpin icon over a pinned interaction.',
  'builder-start': 'No ligand is open, so there are no modes. Picking a ligand in 3D or in the panel’s list opens it in Build, as picking A:B96_391 does here.',
  'builder-build': `Adds atoms and groups. The fragment to add replaces the tip sphere. ${FIRST('build')}`,
  'builder-replace': `Swaps an atom or group for another. The fragment preview stays at the tip, and ${HINT('replace')}`,
  'builder-bond': `Pulling the trigger on 2 atoms bonds them, and on a bond changes its order. The white tip sphere is back, and ${HINT('bond')}`,
  'builder-delete': `Pulling the trigger on atoms or bonds deletes them. The badge and the tip sphere turn red, and ${HINT('delete')}`,
  torsion: 'With a structure picked, holding the trigger on a bond rotates the atoms on one side of it. The tool has one mode, so nothing shows above the thumbstick.',
  'residue-editor': 'The trigger selects or deselects the residue at the tip, and the editor works on the selection. One mode, so nothing shows above the thumbstick, which steps through rotamers instead.',
  'mara-tools': 'Tools are picked and run in the MARA Tools panel. The badge shows a wrench, with no tip sphere and no modes.',
}

/** Every state, in the rail's order: the tour, and the name of its render. */
const STATES = TOOLS.flatMap((t) => {
  if (t.key === 'builder') return [{ tool: t.key, mode: null }, ...t.modes.map((m) => ({ tool: t.key, mode: m }))]
  return t.modes ? t.modes.map((m) => ({ tool: t.key, mode: m })) : [{ tool: t.key, mode: null }]
})
const stateKey = (s) => (s.tool === 'builder' ? `builder-${s.mode || 'start'}` : s.mode ? `${s.tool}-${s.mode}` : s.tool)
const frameFor = (s) => `${O}tool-${stateKey(s)}.webp`

const tool = ref('pointer')
/** The mode, or null: none for this tool, or no ligand open in the Builder. */
const mode = ref(null)
const note = ref(null)

const current = computed(() => BY_KEY[tool.value])
const modes = computed(() => (mode.value ? current.value.modes || [] : []))
const canStep = computed(() => modes.value.length >= 2)
const state = computed(() => ({ tool: tool.value, mode: mode.value }))
const src = computed(() => frameFor(state.value))

function apply(s) {
  tool.value = s.tool
  mode.value = s.mode
  note.value = null
}

let at = 0
const root = ref(null)
const auto = useAutoplay(root, () => {
  at = (at + 1) % STATES.length
  apply(STATES[at])
})
const next = computed(() => frameFor(STATES[(at + 1) % STATES.length]))

/** The tour carries on from wherever the reader leaves it. */
function sync() {
  at = STATES.findIndex((s) => s.tool === tool.value && s.mode === mode.value)
}

function pickTool(t) {
  auto.stop()
  // The Builder opens with no ligand; the others start in their first mode.
  apply({ tool: t.key, mode: t.modes && t.key !== 'builder' ? t.modes[0] : null })
  sync()
}
function pickMode(m) {
  auto.stop()
  apply({ tool: tool.value, mode: m })
  sync()
}
function openLigand() {
  auto.stop()
  apply({ tool: 'builder', mode: 'build' })
  sync()
}
function closeLigand() {
  auto.stop()
  apply({ tool: 'builder', mode: null })
  sync()
}
function step(dir) {
  auto.stop()
  const side = dir < 0 ? 'left' : 'right'
  if (canStep.value) {
    const list = modes.value
    const i = list.indexOf(mode.value)
    const to = list[(i + dir + list.length) % list.length]
    apply({ tool: tool.value, mode: to })
    sync()
    const wrap = (dir > 0 && i === list.length - 1) || (dir < 0 && i === 0)
    const moved = wrap
      ? dir > 0 ? 'Steps past the last mode, back to the first.' : 'Steps back past the first mode, to the last.'
      : `Steps to the ${dir < 0 ? 'previous' : 'next'} mode.`
    note.value = {
      title: `Thumbstick ${side} · ${MODES[to].label}`,
      text: `${moved} ${MODES[to].label}’s name shows beside its icon for 1 second.`,
    }
    return
  }
  note.value = tool.value === 'residue-editor'
    ? { title: `Thumbstick ${side}`, text: `Previews the ${dir < 0 ? 'previous' : 'next'} rotamer of the picked residue, scored for clashes and hydrogen bonds. The render keeps the residue as it was.` }
    : { title: `Thumbstick ${side}`, text: current.value.stick }
}

const caption = computed(() => {
  if (note.value) return note.value
  const t = current.value
  const title = mode.value && canStep.value ? `${t.name} · ${MODES[mode.value].label}` : t.name
  return { title, text: TEXT[stateKey(state.value)] }
})

const alt = computed(() => {
  const m = mode.value && canStep.value ? `, in ${MODES[mode.value].label} mode` : ''
  return `The right controller with ${current.value.name} as the tool${m}, and 1KV2 behind it`
})

// The close-up keeps every frame it has shown, so going back to one is
// instant, and a new frame takes over once its image is in, as on the stage.
// It's drawn as a background: a decoration, beside the stage's own image.
const seen = ref([src.value])
const shown = ref(src.value)
const closeups = computed(() =>
  seen.value.map((s) => {
    const info = imageInfo(s)
    return { src: s, light: `url("${info.light}")`, dark: info.dark ? `url("${info.dark}")` : '' }
  })
)
watch(src, (s) => {
  if (!seen.value.includes(s)) seen.value.push(s)
  const info = imageInfo(s)
  const img = new Image()
  img.src = document.documentElement.classList.contains('dark') && info.dark ? info.dark : info.light
  img.decode().catch(() => {}).then(() => {
    if (s === src.value) shown.value = s
  })
})
</script>

<template>
  <div ref="root" class="n-demo n-tools-demo" v-on="auto.hold">
    <div class="n-app-card n-tools" role="group" aria-label="Tools, as in Nanome XR">
      <div class="n-tools__list" role="group" aria-label="Tool" @keydown="arrowPick">
        <button
          v-for="t in TOOLS"
          :key="t.key"
          type="button"
          class="n-app-theme n-tools__tool"
          :class="{ 'is-on': tool === t.key }"
          :aria-pressed="tool === t.key"
          @click="pickTool(t)"
        >
          <AppIcon :name="t.icon" size="1.05rem" />{{ t.name }}
        </button>
      </div>

      <hr />

      <div class="n-tools__modes">
        <div class="n-tools__head">
          <span>Mode</span>
          <button v-if="tool === 'builder' && mode" type="button" class="n-app-pill n-tools__mini" @click="closeLigand">Cancel</button>
        </div>
        <div class="n-tools__body">
          <div v-if="modes.length" class="n-app-seg" role="group" aria-label="Mode" @keydown="arrowPick">
            <button
              v-for="m in modes"
              :key="m"
              type="button"
              :aria-pressed="mode === m"
              :class="{ 'is-on': mode === m }"
              @click="pickMode(m)"
            >
              <span><AppIcon :name="MODES[m].icon" size="0.85rem" />{{ MODES[m].label }}</span>
            </button>
          </div>
          <button v-else-if="tool === 'builder'" type="button" class="n-app-pill" aria-label="Edit A:B96_391" @click="openLigand">
            <AppIcon name="pencil" size="0.9rem" />A:B96_391
          </button>
          <span v-else class="n-tools__none">{{ current.none }}</span>
        </div>
      </div>

      <div class="n-tools__stick" role="group" aria-label="Thumbstick">
        <button
          type="button"
          class="n-app-round"
          aria-label="Thumbstick left"
          title="Thumbstick left"
          :class="{ 'is-idle': !canStep && tool !== 'residue-editor' }"
          @click="step(-1)"
        >
          <AppIcon name="chevron-left" size="1.1rem" />
        </button>
        <span>Thumbstick</span>
        <button
          type="button"
          class="n-app-round"
          aria-label="Thumbstick right"
          title="Thumbstick right"
          :class="{ 'is-idle': !canStep && tool !== 'residue-editor' }"
          @click="step(1)"
        >
          <AppIcon name="chevron-right" size="1.1rem" />
        </button>
      </div>
    </div>

    <figure class="n-demo__view">
      <div class="n-tools__stage">
        <DemoStage :src="src" :next="auto.playing.value ? next : ''" :alt="alt" :playing="auto.playing.value" @toggle="auto.toggle" />
        <div class="n-tools__closeup" aria-hidden="true">
          <div v-for="f in closeups" :key="f.src" class="n-tools__closeframe" :class="{ 'is-on': f.src === shown, 'has-dark': !!f.dark }">
            <div class="n-tools__closeimg n-tools__closelight" :style="{ backgroundImage: f.light }" />
            <div v-if="f.dark" class="n-tools__closeimg n-tools__closedark" :style="{ backgroundImage: f.dark }" />
          </div>
        </div>
      </div>
      <figcaption class="n-demo__caption" :aria-live="auto.playing.value ? 'off' : 'polite'"><strong>{{ caption.title }}</strong> {{ caption.text }}</figcaption>
    </figure>
  </div>
</template>

<style>
/* The tools: rows like the app's lists, the picked one in purple. */
.n-tools__list {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.n-app-theme.n-tools__tool {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 12px;
  font-size: 15px;
}

.n-app-card .n-tools__tool.is-on .n-appicon {
  color: inherit;
}

/* The mode area keeps one height, whatever the tool shows there. */
.n-tools__modes {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.n-tools__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 28px;
  color: var(--app-muted);
  font-size: 13px;
  font-weight: 600;
}

.n-app-pill.n-tools__mini {
  padding: 3px 12px;
  font-size: 13px;
}

.n-tools__body {
  display: flex;
  align-items: center;
  min-height: 40px;
}

.n-tools__body .n-app-seg {
  flex: 1;
}

/* Each mode takes the room its name needs, so four modes with their icons
   fit the 21rem card. */
.n-tools__body .n-app-seg button {
  flex: 1 1 auto;
  padding-inline: 2px;
}

.n-tools__body .n-app-seg button > span {
  gap: 4px;
  padding-inline: 6px;
}

.n-tools__body .n-app-pill .n-appicon {
  color: inherit;
}

.n-tools__none {
  color: var(--app-muted);
  font-size: 14px;
}

/* Thumbstick left and right, either side of its name. Dimmed while there's
   nothing to step through; a press then says why under the render. */
.n-tools__stick {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  color: var(--app-muted);
  font-size: 14px;
}

.n-tools__stick .n-app-round {
  width: 40px;
  height: 40px;
  color: var(--app-text);
}

.n-tools__stick .n-app-round.is-idle {
  opacity: 0.45;
}

/* The close-up: the controller's part of the same render, larger, in the
   empty sky at the top right. It shows source pixels 896 to 1272 across
   and 724 to 1006 down of the 1600 x 1200 frame. */
.n-tools__stage {
  position: relative;
}

.n-tools__closeup {
  --closeup-edge: rgba(0, 0, 0, 0.16);
  position: absolute;
  top: 8px;
  right: 8px;
  width: 45%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 0 0 1px var(--closeup-edge), 0 4px 14px rgba(0, 0, 0, 0.16);
  pointer-events: none;
}

.dark .n-tools__closeup {
  --closeup-edge: rgba(255, 255, 255, 0.24);
}

.n-tools__closeframe {
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 280ms var(--n-ease);
}

.n-tools__closeframe.is-on {
  opacity: 1;
}

/* The frame at 1600 / 376 of the close-up's width, placed so the box from
   (896, 724) sits in it. */
.n-tools__closeimg {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-size: 425.532% 425.532%;
  background-position: 73.202% 78.867%;
}

.n-tools__closeup .n-tools__closedark,
.dark .n-tools__closeup .has-dark .n-tools__closelight {
  display: none;
}

.dark .n-tools__closeup .n-tools__closedark {
  display: block;
}

/* Side by side, the render keeps the frame's shape and stays in view while
   the longer list of tools scrolls past. */
@media (min-width: 760px) {
  .n-demo.n-tools-demo {
    align-items: start;
  }

  .n-demo.n-tools-demo .n-demo-stage {
    flex: none;
    min-height: 0;
    max-height: none;
    aspect-ratio: var(--stage-ar);
  }

  .n-tools-demo .n-demo__view {
    position: sticky;
    top: calc(var(--n-nav-height) + var(--n-pagebar-space) + 20px);
  }
}

/* Room for the longest line under the render, so the page below doesn't
   move as the tools change. */
.n-tools-demo .n-demo__caption {
  min-height: 6em;
}

@media (max-width: 374px) {
  .n-tools-demo .n-demo__caption {
    min-height: 7.5em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .n-tools__closeframe {
    transition: none;
  }
}
</style>
