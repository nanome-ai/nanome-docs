<script>
/**
 * A screenshot with its parts around it: each <MapCard> sits on the side of
 * the image where that part is on screen (top, left, right or bottom), and
 * hovering a card lights up its region of the image, or the other way round.
 * Clicking a region goes where its card links; a region whose card has no
 * link lights the card instead. The expand button opens the map full screen
 * with the cards still around it. On a narrow screen the image comes first
 * and the cards follow in a list.
 *
 *   <ScreenMap src="nanome-v2/v2-7/desktop-layout.webp" alt="…" crop="0,0,56,72">
 *   <MapCard icon="hierarchy" title="Main Panel" href="/nanome_v2/mainpanel" side="top" area="16,6,33,64">Structures and settings.</MapCard>
 *   </ScreenMap>
 *
 * Cards keep the order they're written in on each side.
 */
import { Fragment, cloneVNode, computed, defineComponent, h, provide, ref } from 'vue'
import HotShot from './HotShot.vue'
import MapCard from './MapCard.vue'
import { parseBox } from './image.js'
import { useFocusView } from './focus.js'

const SIDES = ['top', 'left', 'right', 'bottom']

function cardsIn(nodes, out = []) {
  for (const node of nodes || []) {
    if (node.type === Fragment) cardsIn(node.children, out)
    else if (node.type === MapCard) out.push(node)
  }
  return out
}

export default defineComponent({
  name: 'ScreenMap',
  props: {
    src: { type: String, required: true },
    alt: { type: String, default: '' },
    crop: { type: String, default: '' },
    /** Names the map for screen readers, e.g. "Nanome XR screens". */
    label: { type: String, default: '' },
  },
  setup(props, { slots }) {
    const active = ref(0)
    const root = ref(null)
    const view = useFocusView(root)

    // A click on a region can scroll the page to its card, which slides the
    // image under the pointer. Hovers during that scroll aren't the reader's,
    // so they're ignored until it ends, and the card stays lit.
    let holding = 0
    let holds = 0
    const enter = (n) => {
      if (!holding) active.value = n
    }
    const leave = (n) => {
      if (!holding && active.value === n) active.value = 0
    }
    const holdWhileScrolling = () => {
      const mine = ++holds
      holding = mine
      const end = () => setTimeout(() => holding === mine && (holding = 0), 100)
      addEventListener('scrollend', end, { once: true })
      // For a browser without scrollend.
      setTimeout(end, 1500)
    }
    provide('n-screenmap', { active, enter, leave })

    // A click on a region whose card has no link: light the card and bring
    // it into view. Cards are in the page in reading order.
    const pick = (n) => {
      active.value = n
      const el = root.value?.querySelectorAll('.n-mapcard')[n - 1]
      if (!el) return
      const r = el.getBoundingClientRect()
      // Below the sticky chrome: the breadcrumb strip, or the nav bar without it.
      const bar = document.querySelector('.n-pagebar') || document.querySelector('.n-navbar')
      const chrome = bar ? bar.getBoundingClientRect().bottom : 56
      const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      if (r.top < chrome + 24 || r.bottom > window.innerHeight) {
        holdWhileScrolling()
        el.scrollIntoView({ block: 'center', behavior })
      }
    }

    return () => {
      // Group the cards by side, and give each an id in reading order (top,
      // left, right, bottom) that ties it to its region.
      const cards = cardsIn(slots.default?.()).map((vnode) => ({
        vnode,
        side: SIDES.includes(vnode.props?.side) ? vnode.props.side : 'bottom',
        box: parseBox(vnode.props?.area),
      }))
      const sides = Object.fromEntries(SIDES.map((s) => [s, cards.filter((c) => c.side === s)]))
      let n = 0
      const spots = []
      for (const s of SIDES) {
        for (const c of sides[s]) {
          c.n = ++n
          if (c.box) spots.push({ n: c.n, box: c.box, label: c.vnode.props?.title || '', href: c.vnode.props?.href || '' })
        }
      }

      // Lean each row or column toward where its regions are in the frame:
      // a row of tabs in the right half of the screen sits right of center.
      const crop = parseBox(props.crop) || [0, 0, 100, 100]
      const lean = (s) => {
        const across = s === 'top' || s === 'bottom'
        const centers = sides[s]
          .filter((c) => c.box)
          .map((c) => (across ? (c.box[0] + c.box[2] / 2 - crop[0]) / crop[2] : (c.box[1] + c.box[3] / 2 - crop[1]) / crop[3]))
        if (!centers.length) return null
        const mean = centers.reduce((a, b) => a + b, 0) / centers.length
        const where = mean < 0.38 ? 'flex-start' : mean > 0.62 ? 'flex-end' : 'center'
        return across ? { justifyContent: where } : { justifyContent: where }
      }

      const column = (s) =>
        sides[s].length
          ? h(
              'div',
              { class: `n-screenmap__side n-screenmap__${s}`, style: lean(s) },
              sides[s].map((c) => cloneVNode(c.vnode, { n: c.n, key: c.n }))
            )
          : null

      const classes = [
        'n-screenmap',
        { 'is-focus': view.focused.value },
        ...SIDES.map((s) => ({ [`has-${s}`]: sides[s].length > 0 })),
      ]

      return h(
        'div',
        {
          class: 'n-screenmap-hold',
          style: view.focused.value ? { height: `${view.holdHeight.value}px` } : null,
        },
        [
          h(
            'div',
            {
              ref: root,
              class: classes,
              role: view.focused.value ? 'dialog' : props.label ? 'region' : undefined,
              'aria-modal': view.focused.value ? 'true' : undefined,
              'aria-label': props.label || (view.focused.value && props.alt) || undefined,
              onClickCapture: view.onClick,
            },
            [
              h(
                'button',
                { class: 'n-focus-close', type: 'button', 'aria-label': 'Close', onClick: view.close },
                h('svg', { viewBox: '0 0 24 24', width: 18, height: 18 }, [
                  h('path', { d: 'M6 6l12 12M18 6L6 18', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round' }),
                ])
              ),
              column('top'),
              column('left'),
              h('div', { class: 'n-screenmap__shot' }, [
                h(HotShot, {
                  src: props.src,
                  alt: props.alt,
                  crop: props.crop,
                  spots,
                  active: active.value,
                  focus: view.focused.value,
                  onEnter: enter,
                  onLeave: leave,
                  onOpen: view.open,
                  onPick: pick,
                }),
              ]),
              column('right'),
              column('bottom'),
            ]
          ),
        ]
      )
    }
  },
})
</script>

<style>
.n-screenmap-hold {
  container: screenmap / inline-size;
  margin: 20px 0 32px;
}

.n-screenmap .n-focus-close {
  display: none;
}

/* Narrow: the image, then the cards in a list. */
.n-screenmap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: 10px;
}

.n-screenmap__side {
  display: contents;
}

.n-screenmap__shot {
  grid-column: 1 / -1;
  order: -1;
  margin-bottom: 6px;
}

.n-screenmap .hotshot {
  margin: 0 auto;
}

/* Wide: the cards around the image, each on the side where its part is. */
@container screenmap (min-width: 760px) {
  .n-screenmap {
    display: grid;
    grid-template-columns: minmax(0, var(--n-sm-left, 0px)) minmax(0, 1fr) minmax(0, var(--n-sm-right, 0px));
    grid-template-areas:
      'top top top'
      'left shot right'
      'bottom bottom bottom';
    gap: 14px;
    align-items: center;
    /* A tall screen stays short enough to see whole in the window. */
    --hotshot-maxh: calc(100vh - var(--n-nav-height) - var(--n-pagebar-space) - 60px);
  }

  .n-screenmap.has-left {
    --n-sm-left: 12.5rem;
  }

  .n-screenmap.has-right {
    --n-sm-right: 12.5rem;
  }

  .n-screenmap__side {
    display: flex;
    gap: 10px;
  }

  .n-screenmap__top,
  .n-screenmap__bottom {
    flex-wrap: wrap;
    justify-content: center;
  }

  /* A row wraps as if each card were 12.5rem, and the cards then take up to
     13.5rem of any room left, so a two-word title stays on one line. */
  .n-screenmap__top > *,
  .n-screenmap__bottom > * {
    flex: 1 1 12.5rem;
    max-width: 13.5rem;
  }

  /* Cards beside the image stay compact, so the image keeps the room. */
  .n-screenmap__left .n-mapcard,
  .n-screenmap__right .n-mapcard {
    padding: 10px 12px;
    gap: 10px;
  }

  .n-screenmap__left,
  .n-screenmap__right {
    flex-direction: column;
    justify-content: center;
    align-self: stretch;
  }

  .n-screenmap__top {
    grid-area: top;
  }

  .n-screenmap__left {
    grid-area: left;
  }

  .n-screenmap__right {
    grid-area: right;
  }

  .n-screenmap__bottom {
    grid-area: bottom;
  }

  .n-screenmap__shot {
    grid-area: shot;
    order: 0;
    margin: 0;
  }
}

/* Full screen: the same layout over the whole window, the image as large as
   the cards around it leave room for. */
.n-screenmap.is-focus {
  position: fixed;
  inset: 0;
  z-index: 200;
  margin: 0;
  padding: 56px max(24px, 3vw) 32px;
  overflow: auto;
  /* Centered when it fits; a map taller than the window starts at the top, so
     all of it can be scrolled to. A browser without `safe` keeps the start. */
  align-content: start;
  align-content: safe center;
  background: var(--n-bg);
  --hotshot-cap: 4000px;
  --hotshot-maxh: calc(100vh - 260px);
}

.n-screenmap.is-focus .n-focus-close {
  position: fixed;
  top: 12px;
  right: 16px;
  z-index: 1;
  display: flex;
  padding: 8px;
  border: 1px solid var(--n-border);
  border-radius: 999px;
  background: var(--n-surface);
  color: var(--n-text);
  cursor: pointer;
}

.n-screenmap.is-focus.has-left {
  --n-sm-left: 17rem;
}

.n-screenmap.is-focus.has-right {
  --n-sm-right: 17rem;
}

html.n-focus-open {
  overflow: hidden;
}
</style>
