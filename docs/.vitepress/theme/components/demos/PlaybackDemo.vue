<script setup>
/**
 * A working copy of an entry's playback controls beside 1D3Z, ubiquitin's
 * 10 NMR models (Cornilescu, Marquardt, Ottiger and Bax, J. Am. Chem. Soc.
 * 120:6836, 1998), playing at the app's own rate. In Nanome 2.7.1 a timer
 * ticks every 1000 / speed ms, so ×N steps N models, or N trajectory frames,
 * a second, and playback wraps around at either end (PlaybackController.cs,
 * ComponentsMenuViewModel.cs). Nanome Web runs the same controller.
 *
 * The top row copies the entry's row (N/10, Previous model, Autoplay, Next
 * model) and the box below it the playback popup: backwards, play or pause,
 * forwards, the speeds and its note, plus Nanome XR's standalone-speed
 * warning. Stepping doesn't stop playback, as in both apps. Frames swap with
 * a hard cut, and a tick waits until its frame is loaded and decoded, as the
 * app holds on a frame that isn't ready. At ×10 and ×20 playback waits until
 * all 10 are, so it never stutters on its first pass.
 *
 * It starts playing forwards at ×1 once it's on screen and pauses while it's
 * off screen; with reduced motion it starts paused on model 1.
 *
 *   <PlaybackDemo app="xr" />   as Nanome XR draws it
 *   <PlaybackDemo app="web" />  as Nanome Web draws it
 */
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue'
import { useData } from 'vitepress'
import AppIcon from '../AppIcon.vue'
import DemoStage from './DemoStage.vue'
import { arrowPick } from './arrows.js'
import { PLAY_MODELS, PLAY_SPEEDS, playFrame } from './data.js'

const props = defineProps({ app: { type: String, default: 'web' } })
const xr = computed(() => props.app === 'xr')
const { isDark } = useData()

const model = ref(1)
const playing = ref(false)
const backward = ref(false)
const speed = ref(1)
const visible = ref(false)
/** A row button's own line, until another control is used. */
const note = ref(null)

const frames = Array.from({ length: PLAY_MODELS }, (_, i) => playFrame(props.app, i + 1))
const src = computed(() => frames[model.value - 1])
const preload = ref([])

// The frames the stage has loaded and decoded in the current theme, so a
// tick can wait for its frame. A theme change starts the list over.
const ready = reactive(new Set())
const isReady = (n) => ready.has(frames[n - 1])
const allReady = computed(() => ready.size === PLAY_MODELS)

const wrap = (n) => ((n - 1 + PLAY_MODELS) % PLAY_MODELS) + 1

let timer = 0
function schedule() {
  clearInterval(timer)
  if (!playing.value || !visible.value || (speed.value >= 10 && !allReady.value)) return
  timer = setInterval(() => {
    const n = wrap(model.value + (backward.value ? -1 : 1))
    if (isReady(n)) model.value = n
  }, 1000 / speed.value)
}
watch([playing, visible, speed, backward, allReady], schedule)
watch(isDark, () => ready.clear())

const root = ref(null)
let observer = null
onMounted(() => {
  const still = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  let started = false
  observer = new IntersectionObserver(
    ([e]) => {
      visible.value = e.isIntersecting && e.intersectionRatio >= 0.39
      if (!visible.value || started) return
      started = true
      preload.value = frames
      if (!still) playing.value = true
    },
    { threshold: [0, 0.4] }
  )
  if (root.value) observer.observe(root.value)
})
onBeforeUnmount(() => {
  clearInterval(timer)
  observer?.disconnect()
})

function step(by) {
  model.value = wrap(model.value + by)
  // While playing, the model moves on under the note, so it names none.
  note.value = {
    title: by > 0 ? 'Next model' : 'Previous model',
    text: playing.value
      ? `Steps ${by > 0 ? 'forward' : 'back'} 1 model, wrapping around at either end. Playback carries on from there.`
      : `Steps to model ${model.value}/10, wrapping around at either end.`,
  }
}
function rowPlay() {
  // Nanome Web's row button pauses playback as it opens the controls;
  // Nanome XR's only opens them.
  const paused = !xr.value && playing.value
  if (paused) playing.value = false
  note.value = {
    title: xr.value ? '(BETA) Autoplay' : 'Playback',
    text: `${paused ? 'Pauses playback and opens' : 'Opens'} the playback controls, copied below.${xr.value ? ' It stays lit while the entry plays.' : ''}`,
  }
}
function play(back) {
  note.value = null
  backward.value = back
  playing.value = true
}
function toggle() {
  note.value = null
  playing.value = !playing.value
}
function pickSpeed(s) {
  note.value = null
  speed.value = s
}

const seconds = (s) => String(PLAY_MODELS / s)
const caption = computed(() => {
  if (note.value) return note.value
  const s = speed.value
  const per = (one, many) => `${s} ${s === 1 ? one : many} a second`
  if (!playing.value) {
    return {
      title: `Paused · model ${model.value}/10`,
      text: `At ×${s}, one pass through 1D3Z's 10 models takes ${seconds(s)} s, and a trajectory plays ${per('frame', 'frames')}.`,
    }
  }
  const slow = xr.value && s >= 5 ? ' Standalone headsets may play this slower.' : ''
  return {
    title: `×${s} · ${per('model', 'models')}${backward.value ? ', backwards' : ''}`,
    text: `One pass through 1D3Z's 10 models takes ${seconds(s)} s. On a trajectory, ×${s} plays ${per('frame', 'frames')}.${slow}`,
  }
})
const alt = computed(() => `1D3Z, model ${model.value} of 10, as Cartoon`)

// Nanome Web fills the arrows of the direction that's playing. Its row button
// and arrows follow playbackEntrySerial, which pausing clears: PausePlayback
// sets the playing entry to null and GetPlaybackState sends that as
// entrySerial (PlaybackViewModelWeb.cs). So while paused the row shows play
// and neither arrow is filled, as here.
const filled = (back) => !xr.value && playing.value && backward.value === back
</script>

<template>
  <div ref="root" class="n-demo n-play">
    <div class="n-app-card" role="group" :aria-label="xr ? 'Model playback, as in Nanome XR' : 'Model playback, as in Nanome Web'">
      <div class="n-play__row">
        <span class="n-play__name">1D3Z</span>
        <span class="n-play__count">{{ model }}/10</span>
        <button type="button" class="n-play__btn is-small" aria-label="Previous model" :title="xr ? 'Previous model' : undefined" @click="step(-1)">
          <AppIcon name="arrow-narrow-left" size="1.1rem" />
        </button>
        <button
          type="button"
          class="n-play__btn is-small"
          :class="{ 'is-on': xr && playing }"
          :aria-label="xr ? '(BETA) Autoplay' : playing ? 'Pause and show playback' : 'Show playback'"
          :title="xr ? '(BETA) Autoplay' : undefined"
          @click="rowPlay"
        >
          <AppIcon :name="!xr && playing ? 'player-pause' : 'player-play'" size="1.05rem" />
        </button>
        <button type="button" class="n-play__btn is-small" aria-label="Next model" :title="xr ? 'Next model' : undefined" @click="step(1)">
          <AppIcon name="arrow-narrow-right" size="1.1rem" />
        </button>
      </div>

      <div class="n-play__popup">
        <div class="n-play__buttons">
          <button type="button" class="n-play__btn" :class="{ 'is-on': xr && playing && backward }" :aria-pressed="playing && backward" aria-label="Play backwards" title="Play backwards" @click="play(true)">
            <svg v-if="filled(true)" class="n-play__filled" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 5v14l-8-7zM10 5v14l-8-7z" /></svg>
            <AppIcon v-else name="player-track-prev" size="1.1rem" />
          </button>
          <button type="button" class="n-play__btn" :aria-label="playing ? 'Pause' : 'Play'" @click="toggle">
            <AppIcon :name="playing ? 'player-pause' : 'player-play'" size="1.1rem" />
          </button>
          <button type="button" class="n-play__btn" :class="{ 'is-on': xr && playing && !backward }" :aria-pressed="playing && !backward" aria-label="Play forwards" title="Play forwards" @click="play(false)">
            <svg v-if="filled(false)" class="n-play__filled" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5v14l8-7zM14 5v14l8-7z" /></svg>
            <AppIcon v-else name="player-track-next" size="1.1rem" />
          </button>
        </div>
        <div class="n-app-seg n-play__speeds" role="group" aria-label="Playback speed" @keydown="arrowPick">
          <button v-for="s in PLAY_SPEEDS" :key="s" type="button" :aria-pressed="speed === s" :class="{ 'is-on': speed === s }" @click="pickSpeed(s)">
            <span>×{{ s }}</span>
          </button>
        </div>
        <p class="n-play__note">Playback is only visible by you and users following you</p>
        <template v-if="xr">
          <hr />
          <p class="n-play__note">Speeds ×5 and above may perform slowly on standalone devices. We're actively working to improve this.</p>
        </template>
      </div>
    </div>

    <figure class="n-demo__view">
      <DemoStage :src="src" :preload="preload" :alt="alt" :heading="caption.title" :play-button="false" cut @ready="(f) => ready.add(f)" />
      <figcaption class="n-demo__caption" aria-live="polite">
        <strong>{{ caption.title }}</strong> {{ caption.text }}
        <span class="n-play__about">1D3Z is an NMR ensemble of ubiquitin: 10 models that each fit the data, so the order isn't a time series. The C-terminal tail moves most.</span>
      </figcaption>
    </figure>
  </div>
</template>

<style>
.n-play__row {
  display: flex;
  align-items: center;
  gap: 4px;
  min-height: 40px;
  padding: 0 4px 0 8px;
}

.n-play__name {
  flex: 1;
  min-width: 0;
  font-weight: 600;
}

.n-play__count {
  margin-right: 4px;
  color: var(--app-muted);
  font-size: 13px;
  font-variant-numeric: tabular-nums;
}

.n-play__btn {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: var(--app-fill);
  color: var(--app-text);
  cursor: pointer;
}

.n-play__btn.is-small {
  width: 32px;
  height: 32px;
  background: transparent;
}

.n-play__btn:hover,
.n-play__btn.is-small:hover {
  background: var(--app-line);
}

.n-play__btn.is-on {
  background: var(--app-purple-soft);
  color: var(--app-purple-text);
}

.n-app-card .n-play__btn .n-appicon {
  color: inherit;
}

.n-play__filled {
  width: 1.1rem;
  height: 1.1rem;
  fill: currentColor;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linejoin: round;
}

/* The popup: a raised box under the row, as the app opens it. */
.n-play__popup {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 14px 12px 12px;
  border: 1px solid var(--app-line);
  border-radius: 24px;
  background: var(--app-raised);
  box-shadow: var(--app-shadow);
}

.n-play__buttons {
  display: flex;
  gap: 8px;
}

.n-play__speeds {
  align-self: stretch;
}

.vp-doc .n-play__note {
  max-width: 280px;
  margin: 0;
  color: var(--app-muted);
  font-size: 13px;
  line-height: 1.4;
  text-align: center;
}

.vp-doc .n-app-card .n-play__popup hr {
  align-self: stretch;
  margin: 0;
  border: 0;
  border-top: 2px solid var(--app-line);
}

.n-play__about {
  display: block;
  margin-top: 4px;
}
</style>
