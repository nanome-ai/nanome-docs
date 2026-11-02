<script setup>
/**
 * A working copy of the color scheme menu, as Nanome Web draws it, beside a
 * render of 1KV2's binding site (Pocket + Ligand A:B96_391 as Stick) in the
 * scheme that's picked. It starts where both apps start an atom style:
 * Chain Instance with Carbons only on. Carbons only switches to the render
 * with that option, except with Potential Interactions, which it doesn't
 * change. Both apps hide Carbons only while Element Type is picked; Nanome
 * Web also turns it off then, and when a Uniform color is picked, while
 * Nanome XR keeps it. Uniform shows three of Nanome XR's preset colors.
 * It steps through every scheme by itself, with Carbons only on, until the
 * reader picks one.
 *
 *   <ColorSchemeDemo app="xr" />   the schemes Nanome XR lists
 *   <ColorSchemeDemo app="web" />  the schemes Nanome Web lists
 */
import { computed, ref } from 'vue'
import DemoStage from './DemoStage.vue'
import { arrowPick } from './arrows.js'
import { useAutoplay } from './autoplay.js'
import { CARBONS_DESC, SCHEMES, UNIFORM_DESC, UNIFORM_SWATCHES, schemeFrame } from './data.js'

const props = defineProps({ app: { type: String, default: 'web' } })
const schemes = computed(() => SCHEMES.filter((s) => props.app === 'xr' || !s.xrOnly))

const scheme = ref('chain-instance')
const carbons = ref(true)
const hex = ref('ffffff')
/** What the reader changed last, which the caption speaks to. */
const changed = ref(null)

// The tour: every scheme with Carbons only on, Uniform in each of its colors.
const tour = computed(() =>
  schemes.value.flatMap((s) =>
    s.key === 'uniform' ? UNIFORM_SWATCHES.map((u) => ({ scheme: s.key, hex: u.hex })) : [{ scheme: s.key }]
  )
)
// The step after the scheme on show, so Play carries on from the reader's pick.
const after = computed(() => {
  const i = tour.value.findIndex((t) => t.scheme === scheme.value && (!t.hex || t.hex === hex.value))
  return tour.value[(i + 1) % tour.value.length]
})
const root = ref(null)
const auto = useAutoplay(root, () => {
  const t = after.value
  scheme.value = t.scheme
  if (t.hex) hex.value = t.hex
  carbons.value = true
  changed.value = null
})
const next = computed(() => schemeFrame(props.app, after.value.scheme, true, after.value.hex))

function pick(s) {
  auto.stop()
  scheme.value = s.key
  changed.value = null
  if (props.app !== 'web') return
  // Nanome Web turns Carbons only off for Element Type, and its Uniform
  // starts white each time.
  if (s.noCarbons) carbons.value = false
  if (s.key === 'uniform') hex.value = 'ffffff'
}
function pickSwatch(u) {
  auto.stop()
  hex.value = u.hex
  changed.value = 'swatch'
  // Nanome Web's color picker sets the color alone, so Carbons only goes off.
  if (props.app === 'web' && carbons.value) {
    carbons.value = false
    changed.value = 'swatch-carbons'
  }
}
/**
 * The frame each control leads to, for its data-frame, so the stage can
 * fetch it before it's picked. Each follows its handler.
 */
function pickFrame(s) {
  const web = props.app === 'web'
  return schemeFrame(props.app, s.key, web && s.noCarbons ? false : carbons.value, web && s.key === 'uniform' ? 'ffffff' : hex.value)
}
const swatchFrame = (u) => schemeFrame(props.app, scheme.value, props.app === 'web' ? false : carbons.value, u.hex)
const carbonsFrame = () => schemeFrame(props.app, scheme.value, !carbons.value, hex.value)

function flipCarbons() {
  auto.stop()
  carbons.value = !carbons.value
  changed.value = 'carbons'
}

const current = computed(() => SCHEMES.find((s) => s.key === scheme.value))
const carbonsOn = computed(() => carbons.value && !current.value.noCarbons)
const src = computed(() => schemeFrame(props.app, scheme.value, carbons.value, hex.value))

const caption = computed(() => {
  const s = current.value
  const on = carbonsOn.value
  const name = s.key === 'uniform' ? `Uniform · #${hex.value.toUpperCase()}` : s.name
  if (changed.value === 'carbons') {
    const effect =
      s.key === 'potential-interactions'
        ? 'With Potential Interactions it makes no difference.'
        : on
          ? 'Here nitrogen, oxygen and sulfur go back to their element colors.'
          : 'Here every atom takes the scheme’s color.'
    return { title: `${name} · Carbons only ${on ? 'on' : 'off'}`, text: `${CARBONS_DESC} ${effect}` }
  }
  if (s.key === 'chain-instance' && on) {
    return {
      title: `${name} · Carbons only`,
      text: 'The default for atom styles: carbons take each chain’s color and the other atoms keep their element colors. 1KV2 has 1 chain, so every carbon here is the same lavender.',
    }
  }
  let text = s.key === 'uniform' ? UNIFORM_DESC[props.app] : s.desc
  if (on) {
    text += s.carbons
      ? ' Carbons only is on, so nitrogen, oxygen and sulfur keep their element colors.'
      : ' Carbons only makes no difference with this scheme.'
  }
  if (changed.value === 'swatch-carbons') text += ' Picking a color in Nanome Web turns Carbons only off.'
  return { title: on ? `${name} · Carbons only` : name, text }
})

const alt = computed(() => `1KV2's binding site colored by ${caption.value.title}`)
</script>

<template>
  <div ref="root" class="n-demo n-schemes-demo" v-on="auto.hold">
    <div class="n-app-card n-app-schemes" role="group" aria-label="Color schemes">
      <div class="n-app-schemelist" role="group" aria-label="Color scheme" @keydown="arrowPick">
        <button
          v-for="s in schemes"
          :key="s.key"
          type="button"
          class="n-app-scheme"
          :data-frame="pickFrame(s)"
          :class="{ 'is-on': scheme === s.key }"
          :aria-pressed="scheme === s.key"
          @click="pick(s)"
        >{{ s.name }}</button>
      </div>
      <!-- Hidden unless Uniform is picked, keeping its space so the card doesn't jump. -->
      <div class="n-app-swatches" :style="{ visibility: scheme === 'uniform' ? null : 'hidden' }" role="group" aria-label="Uniform color" @keydown="arrowPick">
        <button
          v-for="u in UNIFORM_SWATCHES"
          :key="u.hex"
          type="button"
          class="n-app-swatch"
          :data-frame="scheme === 'uniform' ? swatchFrame(u) : undefined"
          :class="{ 'is-on': hex === u.hex }"
          :style="{ background: `#${u.hex}` }"
          :aria-pressed="hex === u.hex"
          :aria-label="`${u.name}, #${u.hex.toUpperCase()}`"
          :title="`#${u.hex.toUpperCase()}`"
          @click="pickSwatch(u)"
        />
      </div>
      <!-- Hidden while Element Type is picked, keeping its space so the card doesn't jump. -->
      <label class="n-app-row" :data-frame="current.noCarbons ? undefined : carbonsFrame()" :style="{ visibility: current.noCarbons ? 'hidden' : null }">
        <span class="n-app-row__name">Carbons only</span>
        <input type="checkbox" role="switch" class="n-app-switch" :checked="carbons" :disabled="current.noCarbons" @change="flipCarbons" />
      </label>
    </div>

    <figure class="n-demo__view">
      <DemoStage :src="src" :next="auto.playing.value ? next : ''" :alt="alt" :heading="caption.title" :playing="auto.playing.value" @toggle="auto.toggle" />
      <figcaption class="n-demo__caption" :aria-live="auto.playing.value ? 'off' : 'polite'"><strong>{{ caption.title }}</strong> {{ caption.text }}</figcaption>
    </figure>
  </div>
</template>

<style>
/* Room for the longest caption in the tour, Potential Interactions, so the
   page below doesn't move as it steps. Measured in lines of 1.5em: on a
   phone the caption is as wide as the screen less 40px, and side by side as
   wide as the render. */
.n-schemes-demo .n-demo__caption {
  min-height: 6em;
}

@media (max-width: 689.98px) {
  .n-schemes-demo .n-demo__caption {
    min-height: 7.5em;
  }
}

@media (max-width: 564.98px) {
  .n-schemes-demo .n-demo__caption {
    min-height: 9em;
  }
}

@media (max-width: 479.98px) {
  .n-schemes-demo .n-demo__caption {
    min-height: 10.5em;
  }
}

@media (max-width: 409.98px) {
  .n-schemes-demo .n-demo__caption {
    min-height: 12em;
  }
}

@media (max-width: 371.98px) {
  .n-schemes-demo .n-demo__caption {
    min-height: 13.5em;
  }
}

@media (max-width: 344.98px) {
  .n-schemes-demo .n-demo__caption {
    min-height: 15em;
  }
}

@media (max-width: 315.98px) {
  .n-schemes-demo .n-demo__caption {
    min-height: 16.5em;
  }
}

@media (min-width: 760px) {
  @container (max-width: 649.98px) {
    .n-schemes-demo .n-demo__caption {
      min-height: 7.5em;
    }
  }

  @container (max-width: 524.98px) {
    .n-schemes-demo .n-demo__caption {
      min-height: 9em;
    }
  }

  @container (max-width: 439.98px) {
    .n-schemes-demo .n-demo__caption {
      min-height: 10.5em;
    }
  }

  @container (max-width: 369.98px) {
    .n-schemes-demo .n-demo__caption {
      min-height: 12em;
    }
  }

  @container (max-width: 331.98px) {
    .n-schemes-demo .n-demo__caption {
      min-height: 13.5em;
    }
  }

  @container (max-width: 304.98px) {
    .n-schemes-demo .n-demo__caption {
      min-height: 15em;
    }
  }

  @container (max-width: 275.98px) {
    .n-schemes-demo .n-demo__caption {
      min-height: 16.5em;
    }
  }
}
</style>
