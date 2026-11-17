<script setup>
/**
 * The trail to what's on screen: the sidebar group, the page, and the h2
 * section in view. It lives in the layout's sticky page bar and follows the
 * section spy, so it changes as the reader scrolls and when the route does.
 *
 * The trail is read from the sidebar config (page-trail.js), so a page sits
 * under the same labels here as in the left rail. Section labels come from
 * the `sections` lists config.mjs builds from the markdown, so they match the
 * rail too; an h2 the markdown doesn't have (one a component renders) falls
 * back to its own text.
 *
 * When the trail is wider than the bar, it gives way in steps, so the section
 * in view keeps its full name for as long as it can:
 * 1. groups go by their short names ("Nanome Classic (v1.24)" as "Classic");
 * 2. the parts between the first and the last shorten, to about 6 letters;
 * 3. groups fold into one "…" link, inner groups first, then the outer one;
 * 4. the page folds into it too;
 * 5. only then does the last part shorten.
 * Every part keeps its full name in a tooltip, and the "…" link names the
 * parts it holds.
 */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useData, withBase } from 'vitepress'
import { useSectionSpy } from './section-spy.js'
import { usePageTrail } from './page-trail.js'

const { page } = useData()
const sectionId = useSectionSpy()
const pageTrail = usePageTrail()

/** A group links to its first page, which is its overview where it has one. */
function firstLink(items = []) {
  for (const item of items) {
    const link = item.link || firstLink(item.items)
    if (link) return link
  }
  return null
}

/** Config labels can carry a literal newline for a second line in the rail. */
const label = (text) => text.replace(/\s+/g, ' ').trim()

/** A group's short name, without a leading "Nanome" or a trailing "(…)". */
const shortName = (text) => text.replace(/^Nanome /, '').replace(/\s*\([^)]*\)$/, '')

/** An h2's text without its `#` anchor, for headings the config doesn't list. */
function headingText(id) {
  const el = document.getElementById(id)
  if (!el) return id
  let text = ''
  for (const node of el.childNodes) {
    if (node.nodeType === 1 && node.classList.contains('header-anchor')) continue
    text += node.textContent
  }
  return label(text)
}

const parts = computed(() => {
  const { groups, row } = pageTrail.value
  // A page the sidebar doesn't list goes by its own title and path.
  const pageText = row ? label(row.text) : page.value.title
  const pageLink = row
    ? row.link
    : '/' + page.value.relativePath.replace(/(^|\/)index\.md$/, '$1').replace(/\.md$/, '')
  const named = [...groups.map((group) => label(group.text)), pageText]
  const parts = []

  groups.forEach((group, i) => {
    // A group the next label repeats adds nothing: "Nanome" in front of
    // "Nanome XR", or the "How To" group in front of its "How To" page.
    const own = named[i]
    const next = named[i + 1]
    if (next === own || next.startsWith(`${own} `)) return
    const link = firstLink(group.items)
    if (link) parts.push({ text: own, short: shortName(own), link })
  })

  parts.push({ text: pageText, link: pageLink, page: true })

  const id = sectionId.value
  if (id) {
    const known = row?.sections?.find((section) => section.link.endsWith(`#${id}`))
    parts.push({
      text: known ? known.text : headingText(id),
      link: `${pageLink}#${id}`,
      section: true,
    })
  }

  return parts
})

// --- Fitting the bar -------------------------------------------------------

/** The separator with its margins, and a link's side padding, in px. */
const SEP = 22
const PAD = 4
/** How far a shortened part can go: about 6 letters and the ellipsis. */
const LEAST_EM = 5

const list = ref(null)
/** The bar's width for the trail, and the fonts the parts are set in. */
const room = ref(0)
const fonts = ref(null)

/** The order parts fold into "…": inner groups, the outer group, the page. */
const foldOrder = computed(() => {
  const all = parts.value
  const pageAt = all.findIndex((part) => part.page)
  const order = []
  for (let i = 1; i < pageAt; i++) order.push(i)
  if (pageAt > 0) order.push(0)
  if (pageAt < all.length - 1) order.push(pageAt)
  return order
})

/**
 * The parts as drawn, with the folded ones as one "…" link in their place.
 * `shown` is the name on screen; `text` stays the full name for the tooltip.
 */
function arrange(all, folded, short) {
  const items = []
  all.forEach((part, i) => {
    if (!folded.has(i)) {
      items.push({
        ...part,
        at: i,
        key: `${i}${part.link}`,
        shown: (short && part.short) || part.text,
        last: i === all.length - 1,
      })
      return
    }
    if (items.some((item) => item.more)) return
    const hidden = all.filter((_, j) => folded.has(j))
    items.push({
      more: true,
      key: 'more',
      shown: '…',
      text: hidden.map((p) => p.text).join(' > '),
      names: hidden.map((p) => p.text).join(', '),
      // The innermost part it holds: one step up from where the trail resumes.
      link: hidden[hidden.length - 1].link,
    })
  })
  return items
}

let canvas = null

function textWidth(text, font) {
  canvas ??= document.createElement('canvas').getContext('2d')
  canvas.font = font
  return Math.ceil(canvas.measureText(text).width) + PAD
}

/**
 * The first step (see the top of the file) at which the trail fits, with the
 * parts that may shorten and how far. Before the bar is measured (the
 * server-rendered page, the first frame), every part may shorten, so nothing
 * overflows.
 */
const layout = computed(() => {
  const all = parts.value
  if (!room.value || !fonts.value) {
    return { items: arrange(all, new Set(), false), fitted: false }
  }

  const { part, last, size } = fonts.value
  const font = (i) => (i === all.length - 1 ? last : part)
  const full = all.map((p, i) => textWidth(p.text, font(i)))
  const brief = all.map((p, i) => (p.short ? textWidth(p.short, font(i)) : full[i]))
  const more = textWidth('…', part)
  const least = Math.round(LEAST_EM * size)
  const order = foldOrder.value

  // Each step: [short names, middle parts shorten, parts folded].
  const steps = [
    [false, false, 0],
    [true, false, 0],
    ...Array.from({ length: order.length + 1 }, (_, k) => [true, true, k]),
  ]

  for (const [short, shrink, k] of steps) {
    const items = arrange(all, new Set(order.slice(0, k)), short)
    let need = 0
    items.forEach((item, j) => {
      const own = item.more ? more : (short ? brief : full)[item.at]
      item.shrinks = shrink && j > 0 && !item.last && !item.more
      item.min = (j ? SEP : 0) + Math.min(own, least)
      need += (j ? SEP : 0) + (item.shrinks ? Math.min(own, least) : own)
    })
    // A couple of px spare for rounding between canvas and layout.
    if (need <= room.value - 2) return { items, fitted: true }
  }

  // Even "…" and the last part don't fit: the last part shortens too.
  const items = arrange(all, new Set(order), true)
  const end = items[items.length - 1]
  end.shrinks = true
  end.min = items.length > 1 ? SEP : 0
  return { items, fitted: true }
})

let observer = null

onMounted(() => {
  const font = (style) =>
    `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`
  const readFonts = () => {
    if (!list.value) return
    const base = getComputedStyle(list.value)
    const end = list.value.querySelector('.is-last .n-crumbs__link')
    fonts.value = {
      part: font(base),
      last: font(end ? getComputedStyle(end) : base),
      size: parseFloat(base.fontSize),
    }
  }
  readFonts()
  // A web font that arrives late sets the parts wider or narrower.
  document.fonts?.ready.then(readFonts)

  observer = new ResizeObserver(([entry]) => (room.value = entry.contentRect.width))
  observer.observe(list.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <nav class="n-crumbs" aria-label="Breadcrumb">
    <ol ref="list" class="n-crumbs__list" :class="{ 'is-fitted': layout.fitted }">
      <li
        v-for="(item, i) in layout.items"
        :key="item.key"
        class="n-crumbs__item"
        :class="{ 'is-last': item.last, 'is-more': item.more, 'can-shrink': item.shrinks }"
        :style="item.shrinks ? { minWidth: `${item.min}px` } : undefined"
      >
        <svg
          v-if="i"
          class="n-crumbs__sep"
          viewBox="0 0 16 16"
          width="12"
          height="12"
          aria-hidden="true"
        >
          <path
            d="M6 4l4 4-4 4"
            fill="none"
            stroke="currentColor"
            stroke-width="1.7"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <a
          class="n-crumbs__link"
          :href="withBase(item.link)"
          :title="item.text"
          :aria-label="item.more ? item.names : undefined"
          :aria-current="item.last ? (item.section ? 'location' : 'page') : undefined"
        >
          {{ item.shown }}
        </a>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.n-crumbs {
  flex: 1;
  min-width: 0;
}

.n-crumbs__list {
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  list-style: none;
  /* A step under the 14px rail links, since the trail repeats what the rail
     already shows. */
  font-size: 0.8125rem;
  line-height: 1.4;
}

/* The fit in the script picks which parts may shorten and sets how far, as
   an inline min-width. Until it has run, every part may shorten. */
.n-crumbs__item {
  display: flex;
  align-items: center;
  flex: 0 1 auto;
  min-width: 0;
}

.n-crumbs__list.is-fitted .n-crumbs__item:not(.can-shrink) {
  flex-shrink: 0;
}

/* 22px with its margins, and 4px of side padding on a link: `SEP` and `PAD`
   in the script, which add them up to fit the trail. */
.n-crumbs__sep {
  flex-shrink: 0;
  margin: 0 5px;
  color: var(--n-text-faint);
}

.n-crumbs__link {
  min-width: 0;
  padding: 3px 2px;
  border-radius: var(--n-radius-sm);
  color: var(--n-text-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: color var(--n-transition);
}

.n-crumbs__link:hover {
  color: var(--n-accent);
}

.n-crumbs__item.is-last .n-crumbs__link {
  color: var(--n-text);
  font-weight: 500;
}

.n-crumbs__item.is-last .n-crumbs__link:hover {
  color: var(--n-accent);
}
</style>
