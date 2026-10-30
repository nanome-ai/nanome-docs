<script setup>
/**
 * A working copy of the distance component popup beside a render of the
 * atoms it picks around the 1KV2 ligand. The slider and Whole residues swap
 * the render; the other switches only change the line under it, and the
 * renders use their starting settings. It steps through the
 * distances by itself until the reader moves something.
 */
import { computed, ref } from 'vue'
import DemoStage from './DemoStage.vue'
import { useAutoplay } from './autoplay.js'

const O = 'nanome-v2/v2-7/options/'
const STEPS = [2, 4, 6, 8, 10]

const distance = ref(4)
const whole = ref(true)
const ignoreSelf = ref(true)
const includeLigands = ref(false)
const allEntries = ref(false)
const note = ref(null)

const frame = (d, w) => `${O}dist-${d}-${w ? 'whole' : 'atoms'}.webp`
const src = computed(() => frame(distance.value, whole.value))

const root = ref(null)
const auto = useAutoplay(root, () => {
  const i = STEPS.indexOf(distance.value)
  distance.value = STEPS[(i + 1) % STEPS.length]
  note.value = null
})
const next = computed(() => frame(STEPS[(STEPS.indexOf(distance.value) + 1) % STEPS.length], whole.value))

function onSlide(e) {
  auto.stop()
  distance.value = Number(e.target.value)
  note.value = null
}
function flipWhole() {
  auto.stop()
  whole.value = !whole.value
  note.value = null
}
function flip(r, title, text) {
  auto.stop()
  r.value = !r.value
  note.value = { title: `${title} ${r.value ? 'on' : 'off'}`, text: `${text} The renders here use the setting it starts with.` }
}

const caption = computed(() => {
  if (note.value) return note.value
  if (distance.value === 2) {
    return { title: '2 Å', text: 'No other atom sits within 2 Å of this ligand, so the component comes out empty.' }
  }
  return {
    title: `${distance.value} Å · ${whole.value ? 'Whole residues' : 'Atoms only'}`,
    text: whole.value
      ? `Every residue with an atom within ${distance.value} Å of the ligand, taken whole.`
      : `Only the atoms within ${distance.value} Å of the ligand, so residues are cut where the distance ends.`,
  }
})
</script>

<template>
  <div ref="root" class="n-demo" v-on="auto.hold">
    <div class="n-app-card n-app-distance" role="group" aria-label="Distance component">
      <label class="n-app-slider">
        <span class="n-app-slider__head"><span>Distance (Å)</span><output>{{ distance.toFixed(1) }}</output></span>
        <input type="range" min="2" max="10" step="2" :value="distance" @input="onSlide" />
      </label>
      <hr />
      <label class="n-app-row">
        <span class="n-app-row__name">Whole residues</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="whole" @change="flipWhole" />
      </label>
      <label class="n-app-row">
        <span class="n-app-row__name">Ignore self</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="ignoreSelf" @change="flip(ignoreSelf, 'Ignore self', 'Leaves the starting component\'s own atoms out of the new one.')" />
      </label>
      <label class="n-app-row">
        <span class="n-app-row__name">Include ligands</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="includeLigands" @change="flip(includeLigands, 'Include ligands', 'Counts other ligands in range. Off to start.')" />
      </label>
      <label class="n-app-row">
        <span class="n-app-row__name">All entries</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="allEntries" @change="flip(allEntries, 'All entries', 'Takes atoms from every entry in the workspace, not only this one.')" />
      </label>
    </div>

    <figure class="n-demo__view">
      <DemoStage :src="src" :next="auto.playing.value ? next : ''" :alt="`The atoms within ${distance} Å of the 1KV2 ligand`" :playing="auto.playing.value" @toggle="auto.toggle" />
      <figcaption class="n-demo__caption" aria-live="polite"><strong>{{ caption.title }}</strong> {{ caption.text }}</figcaption>
    </figure>
  </div>
</template>
