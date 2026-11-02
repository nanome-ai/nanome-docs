<script setup>
/**
 * A working copy of the distance component popup beside a render of what it
 * picks around folate in E. coli dihydrofolate reductase (1RX2, with NADP+
 * beside folate), with a second entry, 1RX3 (methotrexate in folate's site),
 * in the same place. The slider and all four switches swap the render: 80
 * states, each made in Nanome XR 2.7.1 from Ligand A:FOL_161, and the line
 * under it gives the counts the app reported. It steps through the
 * distances by itself until the reader moves something.
 *
 * Structures: Sawaya and Kraut, Biochemistry 36:586-603 (1997).
 */
import { computed, ref } from 'vue'
import DemoStage from './DemoStage.vue'
import { useAutoplay } from './autoplay.js'
import { DIST_REACH, DIST_STEPS, distFrame } from './data.js'

const distance = ref(4)
const whole = ref(true)
const ignoreSelf = ref(true)
const includeLigands = ref(false)
const allEntries = ref(false)

const state = () => ({
  whole: whole.value,
  ignoreSelf: ignoreSelf.value,
  includeLigands: includeLigands.value,
  allEntries: allEntries.value,
})
const src = computed(() => distFrame(distance.value, state()))

const root = ref(null)
const nextStep = () => DIST_STEPS[(DIST_STEPS.indexOf(distance.value) + 1) % DIST_STEPS.length]
const auto = useAutoplay(root, () => {
  distance.value = nextStep()
})
const next = computed(() => distFrame(nextStep(), state()))

function onSlide(e) {
  auto.stop()
  distance.value = Number(e.target.value)
}
// By name: the template unwraps refs, so it can't pass the ref itself.
const opts = { whole, ignoreSelf, includeLigands, allEntries }
function flip(key) {
  auto.stop()
  opts[key].value = !opts[key].value
}

// What's on screen, from the counts Nanome 2.7.1 gave for each state.
const caption = computed(() => {
  const d = distance.value
  const r = DIST_REACH[d]
  const s = state()
  const title = [
    `${d} Å`,
    s.whole ? 'Whole residues' : 'Whole residues off',
    !s.ignoreSelf && 'Ignore self off',
    s.includeLigands && 'Include ligands',
    s.allEntries && 'All entries',
  ].filter(Boolean).join(' · ')

  const text = []
  if (d === 2) {
    if (s.ignoreSelf) {
      text.push(`Nothing in 1RX2 sits within 2 Å of folate${s.allEntries ? '.' : ', so the component comes out empty.'}`)
    } else {
      text.push(
        `Nothing else in 1RX2 sits within 2 Å of folate, so only folate itself ${s.allEntries ? 'joins from 1RX2' : 'is in it'}, as Ball & Stick over its green Wire.`
      )
    }
    if (s.includeLigands) text.push('NADP+ stays out even so: its nearest atom is 3.1 Å from folate.')
  } else {
    text.push(
      s.whole
        ? `The ${r.res} residues and ${r.wat} waters with an atom within ${d} Å of folate, taken whole.`
        : `Only the ${r.atoms} atoms within ${d} Å of folate, from ${r.res} residues and ${r.wat} waters, so residues are cut where the distance ends.`
    )
    text.push(s.ignoreSelf ? 'Folate stays out because Ignore self is on.' : 'Folate itself joins, as Ball & Stick over its green Wire.')
    if (s.includeLigands) {
      text.push(
        s.whole
          ? 'NADP+, bound in the cofactor site beside folate, joins in full: its nicotinamide sits 3.1 Å from folate.'
          : `NADP+, bound in the cofactor site beside folate, adds its ${r.nap} atoms in range: its nicotinamide sits 3.1 Å from folate.`
      )
    }
  }
  if (s.allEntries) {
    if (d === 2) {
      text.push(
        `1RX3, the same enzyme crystallized with methotrexate, sits in the same place, and its Asp27 comes within 1.9 Å of folate, so ${s.whole ? 'that residue joins, with orange carbons' : 'that one oxygen joins'}. The name now starts with all within.`
      )
      if (s.includeLigands) {
        text.push(
          `Methotrexate, which binds where folate does, appears on top of it${s.whole ? '.' : ': 31 of its 33 atoms are within 2 Å.'}`
        )
      }
    } else {
      text.push(
        s.whole
          ? `1RX3, the same enzyme crystallized with methotrexate, sits in the same place, so its ${r.res3} residues and ${r.wat3} waters in range join, with orange carbons. The name now starts with all within.`
          : `1RX3, the same enzyme crystallized with methotrexate, sits in the same place, so its atoms within ${d} Å of folate join too, from ${r.res3} residues and ${r.wat3} waters, with orange carbons. The name now starts with all within.`
      )
      if (s.includeLigands) {
        text.push(
          `Methotrexate, which binds where folate does, appears on top of it, with ${s.whole ? '' : 'the nearest part of '}1RX3’s cofactor beside it.`
        )
      }
    }
  }
  return { title, text: text.join(' ') }
})

const alt = computed(() => `Folate in 1RX2 and the atoms a distance component picks: ${caption.value.title}`)
</script>

<template>
  <div ref="root" class="n-demo" v-on="auto.hold">
    <div class="n-app-card n-app-distance" role="group" aria-label="Distance component">
      <label class="n-app-slider">
        <span class="n-app-slider__head"><span>Distance (Å)</span><output>{{ distance }}</output></span>
        <input type="range" min="2" max="10" step="2" :value="distance" @input="onSlide" />
      </label>
      <hr />
      <label class="n-app-row">
        <span class="n-app-row__name">Whole residues</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="whole" @change="flip('whole')" />
      </label>
      <label class="n-app-row">
        <span class="n-app-row__name">Ignore self</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="ignoreSelf" @change="flip('ignoreSelf')" />
      </label>
      <label class="n-app-row">
        <span class="n-app-row__name">Include ligands</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="includeLigands" @change="flip('includeLigands')" />
      </label>
      <label class="n-app-row">
        <span class="n-app-row__name">All entries</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="allEntries" @change="flip('allEntries')" />
      </label>
    </div>

    <figure class="n-demo__view">
      <DemoStage :src="src" :next="auto.playing.value ? next : ''" :alt="alt" :heading="caption.title" :playing="auto.playing.value" @toggle="auto.toggle" />
      <figcaption class="n-demo__caption" :aria-live="auto.playing.value ? 'off' : 'polite'"><strong>{{ caption.title }}</strong> {{ caption.text }}</figcaption>
    </figure>
  </div>
</template>
