<script>
/**
 * A screenshot with its parts around it: each <MapCard> sits on the side of
 * the image where that part is on screen (top, left, right or bottom), and
 * hovering a card lights up its region of the image, or the other way round.
 * Clicking a region goes where its card links; a region whose card has no
 * link lights the card instead. The expand button opens the map full screen
 * with the cards still around it. On a narrow screen the image comes first
 * and the cards follow in a list. So does a screenshot that isn't tall, with
 * cards on both sides, until there's room for both columns beside it.
 *
 * A card's `area` can hold more than one box, split by ";", for a part that
 * shows up in more than one place, such as each person's avatar.
 *
 *   <ScreenMap src="nanome-v2/v2-7/desktop-layout.webp" alt="…" crop="0,0,56,72">
 *   <MapCard icon="hierarchy" title="Main Panel" href="/nanome_v2/mainpanel" side="top" area="16,6,33,64">Structures and settings.</MapCard>
 *   </ScreenMap>
 *
 * Cards keep the order they're written in on each side.
 */
import { Fragment, cloneVNode, defineComponent, h, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import HotShot from './HotShot.vue'
import MapCard from './MapCard.vue'
import { imageInfo, parseBox } from './image.js'
import { useFocusView } from './focus.js'

const SIDES = ['top', 'left', 'right', 'bottom']

/** A card's area: one box, or several split by ";", keeping those that parse. */
const boxesOf = (area) => (area ? String(area).split(';').map(parseBox).filter(Boolean) : [])

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
      // The page scrolls, or the full-screen view does.
      addEventListener('scrollend', end, { once: true })
      root.value?.addEventListener('scrollend', end, { once: true })
      // For a browser without scrollend.
      setTimeout(end, 1500)
    }
    provide('n-screenmap', {
      active,
      enter(n) {
        enter(n)
        reveal()
      },
      leave,
    })

    // The image's height in the page, so the full-screen view doesn't show it
    // much smaller than that.
    const pageHeight = ref(0)

    // Full screen, the image also leaves room for the rows of cards above and
    // below it, so the whole map fits in the window. When that would make the
    // image more than a tenth smaller than in the page, or the cards beside
    // it are taller than the window anyway, the image keeps its size and the
    // map scrolls instead.
    const fitHeight = ref(0)
    const fit = () => {
      const map = root.value?.querySelector('.n-screenmap')
      if (!view.focused.value || !map) return
      // Only with the cards around the image, not under it in a list.
      if (getComputedStyle(map).gridTemplateAreas === 'none') {
        fitHeight.value = 0
        return
      }
      const parts = [...map.children]
      const rows = parts.filter((el) => el.matches('.n-screenmap__top, .n-screenmap__bottom'))
      // The grid always has a row above and below the image, each a gap away.
      const gap = parseFloat(getComputedStyle(map).rowGap) || 0
      const { paddingTop, paddingBottom } = getComputedStyle(root.value)
      const room =
        root.value.clientHeight -
        parseFloat(paddingTop) -
        parseFloat(paddingBottom) -
        2 * gap -
        rows.reduce((sum, el) => sum + el.getBoundingClientRect().height, 0)
      const tallest = Math.max(
        0,
        ...parts
          .filter((el) => el.matches('.n-screenmap__left, .n-screenmap__right'))
          .map((el) => {
            const cards = [...el.children]
            return cards.length ? cards.at(-1).getBoundingClientRect().bottom - cards[0].getBoundingClientRect().top : 0
          })
      )
      fitHeight.value = rows.length && room >= 0.9 * pageHeight.value && tallest <= room ? Math.floor(room) : 0
    }
    // Full screen on a phone, an image wider than the screen pans sideways,
    // with faded edges where there's more to see and a hint under it, as in a
    // <ShotRow>. It opens on its parts: all of them in the middle when they
    // fit, or else centered on them. One that would come out under a quarter
    // wider than the screen fits it instead (`fitWidth`).
    const pan = ref(false)
    const fitWidth = ref(false)
    const more = ref({ left: false, right: false })
    const scroller = () => root.value?.querySelector('.n-screenmap__scroll')
    const edges = () => {
      const el = scroller()
      more.value =
        pan.value && el
          ? { left: el.scrollLeft > 1, right: el.scrollLeft + el.clientWidth < el.scrollWidth - 1 }
          : { left: false, right: false }
    }
    const startOnParts = (el) => {
      el.scrollLeft = 0
      const parts = [...el.querySelectorAll('.hotshot__spot')].map((p) => p.getBoundingClientRect())
      if (!parts.length) return
      const s = el.getBoundingClientRect()
      const left = Math.min(...parts.map((r) => r.left))
      const right = Math.max(...parts.map((r) => r.right))
      const mid =
        right - left <= s.width
          ? (left + right) / 2
          : parts.reduce((sum, r) => sum + r.left + r.width / 2, 0) / parts.length
      el.scrollLeft = mid - (s.left + s.right) / 2
    }
    const fitPan = async (opening) => {
      fitWidth.value = false
      await nextTick()
      const el = scroller()
      const on = !!el && view.focused.value && matchMedia('(max-width: 639px)').matches
      fitWidth.value = on && el.scrollWidth > el.clientWidth && el.scrollWidth < 1.25 * el.clientWidth
      pan.value = on && !fitWidth.value && el.scrollWidth > el.clientWidth + 1
      await nextTick()
      if (pan.value && opening === true) startOnParts(el)
      edges()
    }
    const resized = () => {
      fit()
      fitPan()
    }

    /**
     * Full screen, a card lit while its region is out of the panning view
     * pans the image to it: to the middle when it fits, or to its start.
     */
    const reveal = async () => {
      if (!view.focused.value || !pan.value) return
      await nextTick()
      const el = scroller()
      const parts = [...(el?.querySelectorAll('.hotshot__spot.is-active') || [])].map((p) => p.getBoundingClientRect())
      if (!parts.length) return
      const s = el.getBoundingClientRect()
      const left = Math.min(...parts.map((r) => r.left))
      const right = Math.max(...parts.map((r) => r.right))
      if (left >= s.left && right <= s.right) return
      if (right - left > s.width && left >= s.left && left < s.right) return
      const by = right - left <= s.width ? (left + right) / 2 - (s.left + s.right) / 2 : left - 16 - s.left
      const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      el.scrollBy({ left: by, behavior })
    }

    // A short last row of cards takes the width the full rows above it settle
    // at, so the cards' edges line up in columns (see the CSS).
    const evenRows = () => {
      const rows = root.value?.querySelectorAll('.n-screenmap > .n-screenmap__top, .n-screenmap > .n-screenmap__bottom') || []
      for (const row of rows) {
        row.style.removeProperty('--sm-card-max')
        const style = getComputedStyle(row)
        const basis = row.children.length ? parseFloat(getComputedStyle(row.children[0]).flexBasis) : NaN
        if (style.display !== 'flex' || !basis) continue
        const gap = parseFloat(style.columnGap) || 0
        const width = row.clientWidth
        // A map in a closed tab has no width until the tab opens.
        if (!width) continue
        const n = Math.max(1, Math.floor((width + gap) / (basis + gap)))
        if (row.children.length > n) row.style.setProperty('--sm-card-max', `${Math.floor(((width - (n - 1) * gap) / n) * 100) / 100}px`)
      }
    }
    // With the cards around the image, the row above it comes first in the
    // page, so Tab and a screen reader meet the parts in the order they're
    // seen. Listed under the image, the cards follow it (see the render).
    const around = ref(false)
    const placeShot = () => {
      const map = root.value?.querySelector('.n-screenmap')
      if (!map) return
      const next = getComputedStyle(map).gridTemplateAreas !== 'none'
      if (next === around.value) return
      // Moving a part of the map takes focus off it, so it gets it back.
      const had = root.value.contains(document.activeElement) ? document.activeElement : null
      around.value = next
      if (had) nextTick(() => had.isConnected && document.activeElement !== had && had.focus({ preventScroll: true }))
    }

    let rower = null
    onMounted(() => {
      if (typeof ResizeObserver === 'undefined' || !root.value) return
      rower = new ResizeObserver(() => {
        evenRows()
        placeShot()
      })
      rower.observe(root.value)
      for (const row of root.value.querySelectorAll('.n-screenmap > .n-screenmap__top, .n-screenmap > .n-screenmap__bottom')) rower.observe(row)
    })
    onBeforeUnmount(() => rower?.disconnect())

    watch(view.focused, (on) => {
      if (on) addEventListener('resize', resized)
      else {
        removeEventListener('resize', resized)
        fitHeight.value = 0
        pan.value = false
        fitWidth.value = false
        more.value = { left: false, right: false }
      }
    })
    onBeforeUnmount(() => removeEventListener('resize', resized))

    const open = async () => {
      const frame = root.value?.querySelector('.hotshot__frame')
      pageHeight.value = frame ? Math.round(frame.getBoundingClientRect().height) : 0
      await view.open()
      // Once the view is open, and again once the image has its new size,
      // which can rewrap the rows.
      fit()
      await nextTick()
      fit()
      fitPan(true)
    }

    // A click on a region whose card has no link: light the card and bring
    // it into view if it's out of view. Cards are in the page in reading order.
    const pick = (n) => {
      active.value = n
      const el = root.value?.querySelectorAll('.n-mapcard')[n - 1]
      if (!el) return
      const r = el.getBoundingClientRect()
      // Below the sticky chrome: the breadcrumb strip, or the nav bar without
      // it. Full screen, the view covers both, so only its own top counts.
      // On a phone, the image that stays over the cards counts too.
      const bar = document.querySelector('.n-pagebar') || document.querySelector('.n-navbar')
      const shot = root.value.querySelector('.n-screenmap__shot')
      const sticky = view.focused.value && getComputedStyle(shot).position === 'sticky'
      let top = view.focused.value
        ? root.value.getBoundingClientRect().top
        : (bar ? bar.getBoundingClientRect().bottom : 56) + 24
      if (sticky) top = Math.max(top, shot.getBoundingClientRect().bottom)
      const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      if (r.top < top || r.bottom > window.innerHeight) {
        holdWhileScrolling()
        // Under a sticky image, the card comes up to just below it.
        if (sticky) root.value.scrollBy({ top: r.top - top - 12, behavior })
        else el.scrollIntoView({ block: 'center', behavior })
      }
    }

    return () => {
      // Group the cards by side, and give each an id in reading order (top,
      // left, right, bottom) that ties it to its region.
      const cards = cardsIn(slots.default?.()).map((vnode) => {
        const boxes = boxesOf(vnode.props?.area)
        return {
          vnode,
          side: SIDES.includes(vnode.props?.side) ? vnode.props.side : 'bottom',
          box: boxes[0] || null,
          boxes,
        }
      })
      const sides = Object.fromEntries(SIDES.map((s) => [s, cards.filter((c) => c.side === s)]))
      let n = 0
      const spots = []
      for (const s of SIDES) {
        for (const c of sides[s]) {
          c.n = ++n
          for (const box of c.boxes) {
            spots.push({ n: c.n, box, label: c.vnode.props?.title || '', href: c.vnode.props?.href || '' })
          }
        }
      }

      const crop = parseBox(props.crop) || [0, 0, 100, 100]
      // The frame's width over its height, after the crop.
      const [w, h0] = imageInfo(props.src).size || []
      const ar = (w * crop[2]) / (h0 * crop[3])

      // Where a region's center is along a row (across) or down a column,
      // from 0 to 1 of the frame.
      const centerOf = (s, box) =>
        s === 'top' || s === 'bottom'
          ? (box[0] + box[2] / 2 - crop[0]) / crop[2]
          : (box[1] + box[3] / 2 - crop[1]) / crop[3]

      // Lean each row or column toward where its regions are in the frame:
      // a row of tabs in the right half of the screen sits right of center.
      const lean = (s) => {
        const centers = sides[s].filter((c) => c.box).map((c) => centerOf(s, c.box))
        if (!centers.length) return null
        const mean = centers.reduce((a, b) => a + b, 0) / centers.length
        return { justifyContent: mean < 0.38 ? 'flex-start' : mean > 0.62 ? 'flex-end' : 'center' }
      }

      // A lone card beside the image sits level with its region.
      const level = (s) => {
        const only = sides[s].length === 1 ? sides[s][0].box : null
        return (s === 'left' || s === 'right') && only ? Math.min(1, Math.max(0, centerOf(s, only))) : null
      }

      const column = (s) => {
        if (!sides[s].length) return null
        const at = level(s)
        return h(
          'div',
          {
            key: s,
            class: ['n-screenmap__side', `n-screenmap__${s}`, { 'is-level': at !== null }],
            style: at !== null ? { '--sm-at': at.toFixed(3) } : lean(s),
          },
          sides[s].map((c) => cloneVNode(c.vnode, { n: c.n, key: c.n }))
        )
      }

      const classes = [
        'n-screenmap',
        {
          'is-focus': view.focused.value,
          'is-fit': view.focused.value && fitHeight.value > 0,
          'is-fitwidth': view.focused.value && fitWidth.value,
          // Cards on both sides of a screenshot that isn't tall.
          'is-flanked': sides.left.length > 0 && sides.right.length > 0 && ar >= 0.75,
          // A tall screen, which stays as it is full screen on a phone.
          'is-tall': Number.isFinite(ar) && ar < 0.9,
        },
        ...SIDES.map((s) => ({ [`has-${s}`]: sides[s].length > 0 })),
      ]

      const shot = h('div', { class: 'n-screenmap__shot', key: 'shot' }, [
        h(
          'div',
          {
            class: ['n-screenmap__scroll', { 'more-left': more.value.left, 'more-right': more.value.right }],
            tabindex: pan.value ? 0 : undefined,
            role: pan.value ? 'region' : undefined,
            'aria-label': pan.value ? `${props.alt || 'Screenshot'}, scrolls sideways` : undefined,
            onScrollPassive: edges,
          },
          [
            h(HotShot, {
              src: props.src,
              alt: props.alt,
              crop: props.crop,
              spots,
              active: active.value,
              focus: view.focused.value,
              onEnter: enter,
              onLeave: leave,
              onOpen: open,
              onPick: pick,
            }),
          ]
        ),
        pan.value
          ? h('p', { class: 'n-screenmap__hint', 'aria-hidden': 'true' }, [
              h('svg', { viewBox: '0 0 24 24', width: 14, height: 14 }, [
                h('path', { d: 'M7 8l-4 4 4 4M17 8l4 4-4 4M3 12h18', fill: 'none', stroke: 'currentColor', 'stroke-width': 2, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }),
              ]),
              'Scrolls sideways',
            ])
          : null,
      ])

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
              class: ['n-screenmap-view', { 'is-focus': view.focused.value }],
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
              h(
                'div',
                {
                  class: classes,
                  style: {
                    '--sm-ar': Number.isFinite(ar) ? ar.toFixed(4) : undefined,
                    '--sm-page-h': pageHeight.value ? `${pageHeight.value}px` : undefined,
                    '--sm-fit-h': fitHeight.value ? `${fitHeight.value}px` : undefined,
                  },
                },
                // In a list, the image first, then the cards in reading order;
                // around the image, the row above it, the image between the
                // columns beside it, then the row below. Either way Tab reaches
                // them in the order they're seen. Grid areas place them around
                // the image, and keys let the image move without reloading.
                around.value
                  ? [column('top'), column('left'), shot, column('right'), column('bottom')]
                  : [shot, column('top'), column('left'), column('right'), column('bottom')]
              ),
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
  margin: 20px 0 32px;
}

/* The map answers to its own width: the page's column, or the whole window
   in the full-screen view. */
.n-screenmap-view {
  container: screenmap / inline-size;
}

.n-screenmap-view .n-focus-close {
  display: none;
}

/* Narrow: the image, then the cards in a list. A tall screen stays short
   enough to see whole in the window. */
.n-screenmap {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
  gap: 10px;
  --hotshot-maxh: calc(100vh - var(--n-nav-height) - var(--n-pagebar-space) - 60px);
}

.n-screenmap__side {
  display: contents;
}

.n-screenmap__shot {
  grid-column: 1 / -1;
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
  }

  /* With cards only above and below it, the image spans the rows of cards,
     with no gap kept for the empty columns beside it. */
  .n-screenmap:not(.has-left, .has-right) {
    column-gap: 0;
  }

  /* Under a row of cards, the image leaves room for the row, so the two fit
     in the window together. */
  .n-screenmap.has-top:not(.is-focus) {
    --hotshot-maxh: calc(100vh - var(--n-nav-height) - var(--n-pagebar-space) - 190px);
  }

  .n-screenmap.has-left {
    --n-sm-left: 13rem;
  }

  .n-screenmap.has-right {
    --n-sm-right: 13rem;
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
     13.5rem of any room left, so a two-word title stays on one line. A short
     last row's cards grow no wider than the full rows' (evenRows() in the
     script), so their edges line up with the cards above. */
  .n-screenmap__top > *,
  .n-screenmap__bottom > * {
    flex: 1 1 12.5rem;
    max-width: min(13.5rem, var(--sm-card-max, 13.5rem));
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

  /* A lone card beside the image sits level with its region: the space above
     and below it splits in the same proportion as the image's. */
  .n-screenmap__side.is-level {
    justify-content: flex-start;
  }

  .n-screenmap__side.is-level::before,
  .n-screenmap__side.is-level::after {
    content: '';
  }

  .n-screenmap__side.is-level::before {
    flex: var(--sm-at) 1 0;
  }

  .n-screenmap__side.is-level::after {
    flex: calc(1 - var(--sm-at)) 1 0;
  }

  .n-screenmap__top {
    grid-area: top;
  }

  /* With cards only on the right, the rows above and below the image span
     just the image's column, so they line up with the parts they point to. */
  .n-screenmap.has-right:not(.has-left) > .n-screenmap__top,
  .n-screenmap.has-right:not(.has-left) > .n-screenmap__bottom {
    grid-column: 2 / 3;
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
    margin: 0;
  }

  /* Full screen, the image's column is as wide as the image, so the cards
     beside it stay close and the map sits in the middle of the window. */
  .n-screenmap.is-focus:is(.has-left, .has-right) {
    grid-template-columns:
      minmax(0, var(--n-sm-left, 0px))
      minmax(0, calc(var(--hotshot-maxh) * var(--sm-ar, 1)))
      minmax(0, var(--n-sm-right, 0px));
    justify-content: center;
  }

  /* With cards only on its right, in the page too, the image's column is
     as wide as the image, so the cards sit close to it. A row over the image
     alone still holds 2 cards side by side, and the image keeps to the cards
     on its right. */
  .n-screenmap.has-right:not(.has-left):is(.has-top, .has-bottom) {
    grid-template-columns:
      0px
      minmax(0, max(calc(var(--hotshot-maxh) * var(--sm-ar, 1)), 26rem))
      minmax(0, var(--n-sm-right, 0px));
    justify-content: center;
  }

  .n-screenmap.has-right:not(.has-left) .hotshot {
    margin-right: 0;
  }

  /* Full screen under a row of cards, the image leaves room for the row, but
     never comes out smaller than in the page. */
  .n-screenmap.is-focus.has-top {
    --hotshot-maxh: max(100vh - 260px, var(--sm-page-h, 0px));
  }

  /* Or the room the rows above and below it leave, so the whole map fits
     in the window (fit() in the script). */
  .n-screenmap.is-focus.is-fit {
    --hotshot-maxh: var(--sm-fit-h);
  }
}

/* With cards on both sides of a screenshot that isn't tall, the columns
   would leave it half its size. Until the map is 1000px wide, the image comes
   first and the cards follow in a list instead. */
@container screenmap (max-width: 999.98px) {
  /* As specific as the full-screen columns above, so this wins there too. */
  .n-screenmap.is-flanked:is(.has-left, .has-right) {
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 15rem), 1fr));
    grid-template-areas: none;
    gap: 10px;
    align-items: stretch;
  }

  .n-screenmap.is-flanked:not(.is-focus) {
    --hotshot-maxh: calc(100vh - var(--n-nav-height) - var(--n-pagebar-space) - 60px);
  }

  /* A tall image would fill the window, so it leaves room for the first row
     of cards under it: a card and a part at the image's top fit together. */
  .n-screenmap.is-flanked.is-tall:not(.is-focus) {
    --hotshot-maxh: calc(100vh - var(--n-nav-height) - var(--n-pagebar-space) - 190px);
  }

  .n-screenmap.is-flanked.is-focus {
    --hotshot-maxh: calc(100vh - 150px);
  }

  .n-screenmap.is-flanked > .n-screenmap__side {
    display: contents;
  }

  .n-screenmap.is-flanked > .n-screenmap__side::before,
  .n-screenmap.is-flanked > .n-screenmap__side::after {
    content: none;
  }

  /* Every card the same size, as in the narrow layout (MapCard's padding). */
  .n-screenmap.is-flanked > .n-screenmap__side > .n-mapcard {
    max-width: none;
    padding: 12px 14px;
    gap: 12px;
  }

  .n-screenmap.is-flanked > .n-screenmap__shot {
    grid-area: auto;
    grid-column: 1 / -1;
    margin: 0 0 6px;
  }
}

/* Full screen: the same layout over the whole window, the image as large as
   the window allows. A map taller than the window scrolls to the rest. */
.n-screenmap-view.is-focus {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: grid;
  margin: 0;
  padding: 56px max(24px, 3vw) 32px;
  overflow: auto;
  /* Centered when it fits; a map taller than the window starts at the top, so
     all of it can be scrolled to. A browser without `safe` keeps the start. */
  align-content: start;
  align-content: safe center;
  background: var(--n-bg);
}

.n-screenmap.is-focus {
  --hotshot-cap: 4000px;
  --hotshot-maxh: calc(100vh - 150px);
}

.n-screenmap-view.is-focus .n-focus-close {
  position: fixed;
  top: 12px;
  right: 16px;
  /* Over the image that stays at the top on a phone. */
  z-index: 3;
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

/* Cards on both sides keep the page's columns, so the image gets the room.
   So do the cards in a narrow window. */
.n-screenmap.is-focus.is-flanked {
  --n-sm-left: 13rem;
  --n-sm-right: 13rem;
}

@container screenmap (max-width: 1099.98px) {
  .n-screenmap.is-focus.has-left {
    --n-sm-left: 13rem;
  }

  .n-screenmap.is-focus.has-right {
    --n-sm-right: 13rem;
  }
}

html.n-focus-open {
  overflow: hidden;
}

/* The page under a full-screen view (this one or a <ShotRow>'s) holds still
   too. A browser keeps the page tied to whatever sits at the top of the
   window (scroll anchoring). When that was a part of the view, Chrome and
   Safari scrolled the page by as far as it moved as the view went full
   screen or came back: closing the Overview page's screen map went to the
   bottom of the page. So nothing inside the box that holds the view's place
   is ever chosen, and the box itself, which keeps its height, is chosen
   instead. The rule holds at all times, since Safari keeps a part it chose
   before the view opened, and it covers ::before and ::after, which Safari
   can pick too. */
.n-screenmap-hold *,
.n-screenmap-hold *::before,
.n-screenmap-hold *::after,
.n-shotrow-hold *,
.n-shotrow-hold *::before,
.n-shotrow-hold *::after {
  overflow-anchor: none;
}

/* On a phone, full screen shows the image larger than the page can: up to
   2.5 screens wide, as long as it stays short enough for the window, and the
   image scrolls sideways (fitPan() in the script). A tall screen stays as it
   is, and so does one that would come out only a little wider (is-fitwidth). */
@media (max-width: 639px) {
  .n-screenmap.is-focus:not(.is-tall) .n-screenmap__scroll {
    --fade: 32px;
    overflow-x: auto;
    overscroll-behavior-x: contain;
  }

  .n-screenmap.is-focus:not(.is-tall) .n-screenmap__scroll .hotshot {
    width: max(100%, min(var(--hotshot-shown), 250vw, (var(--hotshot-maxh, 100vh - 120px)) * var(--hotshot-ar)));
    max-width: none;
  }

  .n-screenmap.is-focus.is-fitwidth .n-screenmap__scroll .hotshot {
    width: 100%;
  }

  .n-screenmap.is-focus .n-screenmap__scroll.more-right {
    mask-image: linear-gradient(to left, transparent, #000 var(--fade));
  }

  .n-screenmap.is-focus .n-screenmap__scroll.more-left {
    mask-image: linear-gradient(to right, transparent, #000 var(--fade));
  }

  .n-screenmap.is-focus .n-screenmap__scroll.more-left.more-right {
    mask-image: linear-gradient(to right, transparent, #000 var(--fade), #000 calc(100% - var(--fade)), transparent);
  }

  .n-screenmap.is-focus .n-screenmap__scroll[tabindex]:focus-visible {
    outline: 2px solid var(--n-accent);
    outline-offset: 2px;
    mask-image: none;
  }

  .n-screenmap__hint {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 4px 0 0;
    color: var(--n-text-muted);
    font-size: var(--n-text-xs);
  }
}

/* On a tall phone the image stays at the top of the full-screen view while
   the cards scroll under it, so a lit part stays in sight, as in a
   <ShotRow>. A tall screen would come out smaller there, so it scrolls. */
@media (max-width: 599.98px) and (min-height: 700px) {
  .n-screenmap.is-focus:not(.is-tall) .n-screenmap__shot {
    position: sticky;
    top: -56px;
    z-index: 1;
    margin-top: -56px;
    padding: 56px 0 8px;
    background: var(--n-bg);
    --hotshot-maxh: 45vh;
  }
}
</style>
