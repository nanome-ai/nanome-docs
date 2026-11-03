<script setup>
/**
 * A working copy of the Users section at the bottom of Nanome XR's left
 * sidebar, beside the view it gives you of 1KV2, with Ana and Ben in the
 * workspace. Selecting a chip follows that person and the render switches to
 * what they see; Stop goes back to your own view. Spotlight Me has both of
 * them follow you.
 *
 * It copies what Nanome XR 2.7.1 draws (SpotlightMenu, LeftSidebar): the
 * person you follow moves to the front with a user icon, people following
 * you get an eye, those chips can't be selected, and the sidebar's border
 * takes the leader's color. Reset orientation and Share change only the
 * caption, since the render can't show what they do.
 *
 * It steps through your view, following Ana, your view and spotlighting
 * until the reader picks something.
 *
 *   <SpotlightDemo />
 */
import { computed, nextTick, ref } from 'vue'
import AppIcon from '../AppIcon.vue'
import DemoStage from './DemoStage.vue'
import { useAutoplay } from './autoplay.js'

const O = 'nanome-v2/v2-7/options/'

// Participant colors as the 2.7.1 captures show them. The app picks white
// text on Ben's blue and on your pink (MenuDetailUtils.GetContrastColor), but
// that's 3.4:1 and 3.3:1 for bold 15 and 16px labels, so the copy uses black
// there, as it does on Ana's yellow, to reach 4.5:1.
const YOU = { color: '#f35286', ink: '#000' }
const PEOPLE = {
  ana: { name: 'Ana', color: '#fabf26', ink: '#000', her: 'her', she: 'she', src: `${O}follow-ana.webp`, alt: "1KV2 as Ana sees it, with Ben's avatar to the left" },
  ben: { name: 'Ben', color: '#218cf2', ink: '#000', her: 'his', she: 'he', src: `${O}follow-ben.webp`, alt: "1KV2 as Ben sees it, with Ana's avatar to the right" },
}
const OWN = { src: `${O}follow-you.webp`, alt: "1KV2 from your seat, with Ana's and Ben's avatars across it" }

/** 'you', 'follow' or 'spot'. */
const mode = ref('you')
const leader = ref(null)
/** Chip order: the app moves the person you follow to the front. */
const order = ref(['ana', 'ben'])
const note = ref(null)

function apply(next) {
  note.value = null
  mode.value = next.mode
  leader.value = next.mode === 'follow' ? next.leader : null
  if (leader.value) order.value = [leader.value, ...order.value.filter((k) => k !== leader.value)]
}

const frameOf = (s) => (s.mode === 'follow' ? PEOPLE[s.leader].src : OWN.src)
const src = computed(() => frameOf({ mode: mode.value, leader: leader.value }))

const TOUR = [{ mode: 'you' }, { mode: 'follow', leader: 'ana' }, { mode: 'you' }, { mode: 'spot' }]
const at = ref(0)
const root = ref(null)
const auto = useAutoplay(root, () => {
  at.value = (at.value + 1) % TOUR.length
  apply(TOUR[at.value])
}, 3600)
const next = computed(() => frameOf(TOUR[(at.value + 1) % TOUR.length]))

function act(next) {
  auto.stop()
  apply(next)
}
/**
 * Following someone disables their chip, and the bar swaps its button, so
 * focus would drop to the page. When it was in the demo, it moves to the
 * control that now holds the state, once the change is drawn, without
 * scrolling the page under the reader's finger.
 */
function keepFocus(sel, change) {
  const had = root.value?.contains(document.activeElement)
  change()
  if (had) nextTick(() => root.value?.querySelector(sel)?.focus({ preventScroll: true }))
}
function follow(key) {
  keepFocus('.n-spot__stop', () => act({ mode: 'follow', leader: key }))
}
// Spotlight Me, Stop spotlighting and Stop each swap the bar's button, and
// the wide button is the one left: Spotlighting 2/2 or Spotlight Me.
function toMode(mode) {
  keepFocus('.n-spot__wide', () => act({ mode }))
}
function resetOrientation() {
  auto.stop()
  const p = PEOPLE[leader.value]
  note.value = {
    title: `Following ${p.name} · Reset orientation`,
    text: `Resets your orientation, so ${p.name}’s view lines up again with the way you face now. You still see what ${p.she} sees.`,
  }
}
function share() {
  auto.stop()
  note.value = { title: 'Share', text: 'Opens the Share dialog, where you invite people and set their access. Your view stays as it is.' }
}

const chips = computed(() =>
  order.value.map((key) => {
    const p = PEOPLE[key]
    const followed = mode.value === 'follow' && leader.value === key
    const follower = mode.value === 'spot'
    return {
      key,
      ...p,
      icon: followed ? 'user' : follower ? 'eye' : '',
      off: followed || follower,
      tip: follower ? `${p.name} is following you` : followed ? `You are following ${p.name}` : `Follow ${p.name}`,
    }
  })
)

/** While you spotlight the sidebar's border takes your color, and the leader's while you follow. */
const border = computed(() => {
  if (mode.value === 'spot') return YOU.color
  if (mode.value === 'follow') return PEOPLE[leader.value].color
  return ''
})

const caption = computed(() => {
  if (note.value) return note.value
  if (mode.value === 'spot') {
    return {
      title: 'Spotlighting 2/2',
      text: 'Ana and Ben now follow you, so the bar counts 2 of the 2 others. In a headset, they first see a prompt with Not now and follow after 6 seconds. Nanome Web follows straight away.',
    }
  }
  if (mode.value === 'follow') {
    const p = PEOPLE[leader.value]
    return {
      title: `Following ${p.name}`,
      text: `You see the structures as ${p.name} sees them, and ${p.her} tool, hovers, selections and edits as ${p.she} makes them. Stop, or holding the grip, ends it. Resume Following stays on offer for 3 seconds.`,
    }
  }
  return {
    title: 'Your view',
    text: 'Everyone sees the same structures from where they stand. With Show other user Avatars on, you see the others around them.',
  }
})

const alt = computed(() => (mode.value === 'follow' ? PEOPLE[leader.value].alt : OWN.alt))
</script>

<template>
  <div ref="root" class="n-demo n-spot" v-on="auto.hold">
    <div
      class="n-app-card n-spot__card"
      :class="{ 'has-border': !!border }"
      :style="border ? { '--spot-border': border } : null"
      role="group"
      aria-label="Users, as in Nanome XR"
    >
      <div class="n-spot__head">
        <AppIcon name="users" size="1.25rem" />
        <span class="n-spot__title">Users</span>
        <button type="button" class="n-app-pill n-spot__share" title="Share Workspace" @click="share">
          <AppIcon name="share" size="1rem" />Share
        </button>
      </div>

      <div class="n-spot__chips">
        <button
          v-for="c in chips"
          :key="c.key"
          type="button"
          class="n-spot__chip"
          :data-frame="c.off ? undefined : c.src"
          :style="{ background: c.color, color: c.ink }"
          :disabled="c.off"
          :title="c.tip"
          :aria-label="c.tip"
          @click="follow(c.key)"
        >
          <AppIcon v-if="c.icon" :name="c.icon" size="1rem" />
          <span>{{ c.name }}</span>
        </button>
      </div>

      <div class="n-spot__bar">
        <button v-if="mode === 'you'" type="button" class="n-spot__wide" title="Start spotlighting" @click="toMode('spot')">
          <AppIcon name="crown" size="1.25rem" :style="{ color: YOU.color }" />Spotlight Me
        </button>
        <button
          v-else-if="mode === 'spot'"
          type="button"
          class="n-spot__wide is-on"
          :style="{ background: YOU.color, color: YOU.ink }"
          title="Stop spotlighting"
          @click="toMode('you')"
        >
          <AppIcon name="crown" size="1.25rem" />Spotlighting 2/2
        </button>
        <div v-else class="n-spot__following">
          <AppIcon name="crown" size="1.15rem" :style="{ color: PEOPLE[leader].color }" />
          <span class="n-spot__leader">{{ PEOPLE[leader].name }}</span>
          <button type="button" class="n-spot__round" title="Reset orientation" aria-label="Reset orientation" @click="resetOrientation">
            <AppIcon name="analyze-filled" size="1rem" />
          </button>
          <button type="button" class="n-app-pill n-spot__stop" title="Stop following" :data-frame="OWN.src" @click="toMode('you')">Stop</button>
        </div>
      </div>
    </div>

    <figure class="n-demo__view">
      <DemoStage :src="src" :next="auto.playing.value ? next : ''" :alt="alt" :heading="caption.title" :playing="auto.playing.value" @toggle="auto.toggle" />
      <figcaption class="n-demo__caption" :aria-live="auto.playing.value ? 'off' : 'polite'"><strong>{{ caption.title }}</strong> {{ caption.text }}</figcaption>
    </figure>
  </div>
</template>

<style>
/* The card is as tall as the Users section, at the top of its column. Its
   border turns the leader's color, as the sidebar's does in the app. */
.n-spot .n-spot__card {
  align-self: start;
  gap: 12px;
  transition: border-color 200ms ease, box-shadow 200ms ease;
}

.n-spot .n-spot__card.has-border {
  border-color: var(--spot-border);
  box-shadow: 0 0 0 1px var(--spot-border), var(--app-shadow);
}

.n-spot__head {
  display: flex;
  align-items: center;
  gap: 6px;
}

.n-spot__title {
  flex: 1;
  font-weight: 700;
}

.n-spot__share {
  flex: none;
}

/* Two chips to a row, bold, in each person's color. */
.n-spot__chips {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 6px;
}

.n-spot__chip {
  display: flex;
  align-items: center;
  gap: 4px;
  min-width: 0;
  min-height: 34px;
  padding: 6px 12px;
  border: 1px solid transparent;
  border-radius: 32px;
  font: inherit;
  font-size: 15px;
  font-weight: 700;
  text-align: left;
  cursor: pointer;
}

.n-spot__chip span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.n-spot__chip:hover:not(:disabled) {
  border-color: var(--app-text);
}

/* A chip that can't be selected is muted. Its label stays at full
   strength, since it names the state the demo shows. */
.n-spot__chip:disabled {
  filter: saturate(0.4);
  cursor: default;
}

.n-spot .n-spot__chip .n-appicon,
.n-spot .n-spot__wide.is-on .n-appicon {
  color: inherit;
}

/* The bar keeps one height in every state, so nothing below it moves. */
.n-spot__bar {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 44px;
}

.n-spot__wide {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  min-height: 44px;
  padding: 6px 12px;
  border: 0;
  border-radius: 32px;
  background: var(--app-fill);
  color: var(--app-text);
  font: inherit;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
}

.n-spot__wide:hover {
  background: var(--app-line);
}

.n-spot__wide.is-on {
  font-weight: 700;
}

.n-spot__wide.is-on:hover {
  filter: brightness(0.95);
}

.n-spot__following {
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 44px;
  padding: 4px 4px 4px 14px;
  border-radius: 32px;
  background: var(--app-fill);
}

.n-spot__leader {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  font-size: 16px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.n-spot__round {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: 0;
  border-radius: 50%;
  background: var(--app-raised);
  cursor: pointer;
}

.n-spot .n-spot__stop {
  flex: none;
  background: var(--app-raised);
  border-color: var(--app-raised);
}

.n-spot__round:hover,
.n-spot .n-spot__stop:hover,
.n-spot .n-spot__share:hover {
  background: var(--app-line);
}

.n-spot__chip:focus-visible,
.n-spot__wide:focus-visible,
.n-spot__round:focus-visible {
  outline: 2px solid var(--app-purple);
  outline-offset: 2px;
}

/* Room for the longest caption under the render, so the page below doesn't
   move as the tour steps. It takes 5 lines in the narrowest columns: on a
   phone, and beside the sidebar just past 960px. */
@media (max-width: 1439px) {
  .n-spot .n-demo__caption {
    min-height: 6em;
  }
}

@media (max-width: 374px), (min-width: 960px) and (max-width: 1039px) {
  .n-spot .n-demo__caption {
    min-height: 7.5em;
  }
}

@media (prefers-reduced-motion: reduce) {
  .n-spot .n-spot__card {
    transition: none;
  }
}
</style>
