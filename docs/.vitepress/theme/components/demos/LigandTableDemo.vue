<script setup>
/**
 * A working copy of Nanome Web's full-screen Ligands table, holding 8
 * inhibitors of p38 alpha MAP kinase from the PDB (ligands.js says where each
 * value comes from). The column picker shows and hides the property columns,
 * a header sorts, the search box filters, and the row menu sets the tag. The
 * line under the table explains the column or control last used; the filter
 * and preset buttons only change that line.
 *
 * Both copies sort and search the way both apps do, from their source: a
 * third click on a header goes back to the default order (NanoTable.CycleSort
 * in XR, removable-sort on Nanome Web's table), and search matches the name,
 * the tag or any property value (LigandsMenuViewModel.MatchesFilters in XR,
 * WorkspaceLigands in Nanome Web). The default copy heads its columns and
 * puts info icons where Nanome Web does (ligands.js). With app="xr" a drawing
 * also shows larger while the pointer is on it (LigandsMenu,
 * #ligand-large-preview), which Nanome Web wasn't seen doing.
 *
 * Measured from the app: header cells 12px 16px on #f8fafc, 16px text, rows
 * 66px tall, the drawing frozen in an 88px first column, numbers to 3
 * decimals.
 *
 *   <LigandTableDemo />
 *   <LigandTableDemo app="xr" />
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import AppIcon from '../AppIcon.vue'
import { COLUMNS, DEFAULT_COLUMNS, FIXED, LEFT_OUT, LIGANDS, depiction, formatValue } from './ligands.js'

const props = defineProps({ app: { type: String, default: 'web' } })
const xr = computed(() => props.app === 'xr')

const BY_KEY = Object.fromEntries([...FIXED, ...COLUMNS].map((c) => [c.key, c]))

/** The picker lists every property Nanome lists, in its alphabetical order. */
const OPTIONS = [...COLUMNS, ...LEFT_OUT.map((c) => ({ ...c, out: true }))].sort((a, b) => (a.key < b.key ? -1 : 1))

/** The tags the row menu offers (ligand-row-menu.webp). */
const TAGS = ['Hit', 'Lead', 'Add to Synthesis']

const selected = ref([...DEFAULT_COLUMNS])
const sort = ref({ key: null, dir: 1 })
const query = ref('')
const tags = ref(Object.fromEntries(LIGANDS.map((l) => [l.ccd, l.tag])))
const active = ref(null)
const preview = ref(null)
const picker = ref(false)
const pickerQuery = ref('')
const menu = ref(null)
const note = ref(null)
const scrolled = ref(false)
const root = ref(null)
const menuEl = ref(null)
const pickBtn = ref(null)
const pickField = ref(null)
// The row-menu button that opened the menu, so focus can go back to it.
let menuTrigger = null

const order = (key) => selected.value.indexOf(key) + 1

/** A column's header: the XR copy's label, or Nanome Web's header. */
const head = (c) => (xr.value ? c.label : c.web || c.label)

/** Entry and Name, the property columns in the order they were checked, then Tag. */
const headers = computed(() => [BY_KEY.entry, BY_KEY.name, ...selected.value.map((k) => BY_KEY[k]), BY_KEY.tag])

const isNumber = (c) => !FIXED.includes(c) && !c.text

function value(l, key) {
  if (key === 'tag') return tags.value[l.ccd]
  if (key === 'entry' || key === 'name') return l[key]
  return l.props[key]
}

function cell(l, c) {
  if (c.key === 'tag') return tags.value[l.ccd] || '–'
  return formatValue(value(l, c.key))
}

// Text sorts the way people count, so "2" comes before "10".
const collator = new Intl.Collator('en', { numeric: true, sensitivity: 'base' })
function compare(a, b) {
  if (typeof a === 'number' && typeof b === 'number') return a - b
  return collator.compare(String(a ?? ''), String(b ?? ''))
}

// Both apps' search matches the name, the tag or any property value.
function matches(l, q) {
  if (l.name.toLowerCase().includes(q)) return true
  const tag = tags.value[l.ccd] || ''
  return tag.toLowerCase().includes(q) || Object.values(l.props).some((v) => String(v).toLowerCase().includes(q))
}

const rows = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = LIGANDS.filter((l) => !q || matches(l, q))
  const { key, dir } = sort.value
  return key ? [...list].sort((a, b) => dir * compare(value(a, key), value(b, key))) : list
})

const src = (l, dark) => withBase(depiction(l.ccd, dark))
const previewRow = computed(() => LIGANDS.find((l) => l.ccd === preview.value))

const subscript = (formula) => formula.replace(/\s+/g, '').replace(/\d/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[d])

function closeAll() {
  picker.value = false
  menu.value = null
}

// Closes a popup and, when focus was in the demo, hands it back to the button
// that opened the popup.
function closeAndRefocus() {
  const back = menu.value ? menuTrigger : picker.value ? pickBtn.value : null
  const inside = root.value?.contains(document.activeElement)
  closeAll()
  if (inside && back?.isConnected) back.focus({ preventScroll: true })
}

// The filter and preset buttons only explain themselves.
const FILTER_NOTE = {
  title: 'Filter ligands',
  text: 'Narrows the table by property values. The button shows how many ligands are listed out of the total.',
}
const PRESETS_NOTE = {
  title: 'View presets',
  text: 'Saved sets of columns and filters, shared across the project. Picking one sets the table to match.',
}
function say(n) {
  closeAll()
  note.value = n
}

/** Ascending, then descending, then a third click goes back to the default order. */
function sortBy(c) {
  closeAll()
  const same = sort.value.key === c.key
  const words = isNumber(c) ? ['low to high', 'high to low'] : ['A to Z', 'Z to A']
  if (same && sort.value.dir === -1) {
    sort.value = { key: null, dir: 1 }
    note.value = {
      title: `${head(c)} · unsorted`,
      text: 'Back to the default order: entries in the order they were loaded, then model and name.',
    }
    return
  }
  const dir = same ? -sort.value.dir : 1
  sort.value = { key: c.key, dir }
  note.value = { title: `${head(c)} · ${words[dir === 1 ? 0 : 1]}`, text: c.desc }
}

function ariaSort(c) {
  if (sort.value.key !== c.key) return 'none'
  return sort.value.dir === 1 ? 'ascending' : 'descending'
}

function explain(c) {
  closeAll()
  const same = head(c) === c.key || FIXED.includes(c)
  note.value = { title: same ? head(c) : `${head(c)} · ${c.key}`, text: c.desc }
}

function togglePicker(e) {
  menu.value = null
  picker.value = !picker.value
  pickerQuery.value = ''
  if (picker.value) {
    // Nanome XR adds columns in the order they're checked (ColumnPickerPopup).
    const after = xr.value ? ', after the ones already shown' : ''
    note.value = {
      title: 'Select property columns',
      text: `A checked property gets a column${after}. Its number is its place among the property columns.`,
    }
    // Opened from the keyboard (a click with no pointer), focus goes to the search field.
    if (e?.detail === 0) nextTick(() => pickField.value?.focus())
  }
}

function toggle(o) {
  if (o.out) {
    note.value = { title: `${o.key} · not in this copy`, text: o.desc }
    return
  }
  const on = !order(o.key)
  selected.value = on ? [...selected.value, o.key] : selected.value.filter((k) => k !== o.key)
  if (!on && sort.value.key === o.key) sort.value = { key: null, dir: 1 }
  const named = head(o) === o.key ? '' : ` Its column is headed ${head(o)}.`
  note.value = { title: `${o.key} ${on ? 'on' : 'off'}`, text: `${o.desc}${named}` }
}

const listed = computed(() => {
  const q = pickerQuery.value.trim().toLowerCase()
  return OPTIONS.filter((o) => o.key.toLowerCase().includes(q))
})
const choosable = computed(() => listed.value.filter((o) => !o.out))
const allOn = computed(() => choosable.value.length > 0 && choosable.value.every((o) => order(o.key)))

function toggleAll() {
  const keys = choosable.value.map((o) => o.key)
  if (!keys.length) return
  const on = !allOn.value
  selected.value = on
    ? [...selected.value, ...keys.filter((k) => !order(k))]
    : selected.value.filter((k) => !keys.includes(k))
  if (!on && keys.includes(sort.value.key)) sort.value = { key: null, dir: 1 }
  const count = `${keys.length} ${keys.length === 1 ? 'property' : 'properties'}`
  let text = 'Every property in the list gets a column.'
  if (!on && !selected.value.length) text = 'Only Entry, Name and Tag stay, beside the drawing.'
  else if (!on) text = keys.length === 1 ? 'Its column is gone.' : 'Their columns are gone.'
  note.value = { title: `${count} ${on ? 'on' : 'off'}`, text }
}

function onSearch() {
  closeAll()
  note.value = { search: true }
}

function pick(l) {
  closeAll()
  active.value = l.ccd
  const about = l.about ? ` · ${l.about}` : ''
  note.value = { title: `${l.name}${about}`, text: `From PDB entry ${l.pdb}, a structure of human p38α MAP kinase. ${subscript(l.formula)}.` }
}

/**
 * Opens the row menu below its button, or above it when it only fits there.
 * When it fits neither way, the table grows (`grow`) until the menu fits
 * below, so it never covers the page around the card.
 */
async function openMenu(l, e) {
  picker.value = false
  if (menu.value?.ccd === l.ccd) {
    closeAndRefocus()
    return
  }
  const btn = e.currentTarget
  const fromKeys = e.detail === 0
  menuTrigger = btn
  const r = btn.getBoundingClientRect()
  const box = root.value.getBoundingClientRect()
  // top and right are measured from inside the card's border.
  const edge = root.value.clientTop
  const right = Math.min(Math.max(8, box.right - edge - r.right - 4), box.width - 2 * edge - 208)
  const below = r.bottom - box.top - edge + 4
  // Measured hidden first, so the flip uses the menu's real height.
  menu.value = { ccd: l.ccd, right, top: below, grow: 0, hidden: true }
  await nextTick()
  if (menu.value?.ccd !== l.ccd || !menuEl.value) return
  const h = menuEl.value.getBoundingClientRect().height
  // The room inside the card now, without any added for a menu opened before.
  const room = root.value.getBoundingClientRect().height - 2 * edge
  const above = r.top - box.top - edge - 4 - h
  let top = below
  let grow = 0
  if (below + h > room - 8) {
    if (above >= 8) top = above
    else grow = Math.ceil(below + h + 8 - room)
  }
  menu.value = { ccd: l.ccd, right, top, grow }
  if (fromKeys) {
    await nextTick()
    menuEl.value?.querySelector('[role^="menuitem"]')?.focus({ preventScroll: true })
  }
}
const menuRow = computed(() => LIGANDS.find((l) => l.ccd === menu.value?.ccd))
const menuStyle = computed(() => {
  const m = menu.value
  if (!m) return {}
  return { right: `${m.right}px`, top: `${m.top}px`, visibility: m.hidden ? 'hidden' : undefined }
})
const growStyle = computed(() => (menu.value?.grow ? { paddingBottom: `${menu.value.grow}px` } : undefined))

// Arrow keys, Home and End move through the menu; Tab leaves it.
function onMenuKey(e) {
  const items = [...menuEl.value.querySelectorAll('[role^="menuitem"]')]
  const i = items.indexOf(document.activeElement)
  const n = items.length
  const to = { ArrowDown: (i + 1) % n, ArrowUp: (i - 1 + n) % n, Home: 0, End: n - 1 }[e.key]
  if (to !== undefined) {
    e.preventDefault()
    items[to].focus()
  } else if (e.key === 'Tab') {
    closeAndRefocus()
  }
}

function act(kind) {
  const l = menuRow.value
  closeAndRefocus()
  if (kind === 'sdf') note.value = { title: 'Download SDF', text: `Downloads ${l.name} as an SDF file.` }
  if (kind === 'sketch') note.value = { title: 'Sketch variant', text: `Opens ${l.name} in the 2D sketcher, to draw a variant of it.` }
  if (kind === 'new') note.value = { title: 'New tag…', text: 'Adds a custom tag to the workspace’s list.' }
  if (kind === 'props') {
    const list = COLUMNS.map((c) => `${c.label} ${formatValue(l.props[c.key])}`).join(', ')
    note.value = { title: `${l.name} · Properties`, text: `${list}.` }
  }
}

function setTag(t) {
  const l = menuRow.value
  closeAndRefocus()
  tags.value = { ...tags.value, [l.ccd]: t }
  note.value = t
    ? { title: `${l.name} · ${t}`, text: 'A ligand has 1 tag at most, so a new one replaces the old. Everyone in the workspace sees it.' }
    : { title: `${l.name} · Remove tag`, text: 'The ligand has no tag now, and its Tag cell shows a dash.' }
}

function onScroll(e) {
  scrolled.value = e.target.scrollLeft > 0
  menu.value = null
}

// A click outside a popup closes it, and outside the drawings hides the large one.
function onPointerDown(e) {
  if (!e.target.closest?.('.n-ltab__pop, .n-ltab__popbtn')) closeAll()
  if (!e.target.closest?.('.n-ltab__img')) preview.value = null
}
function onKey(e) {
  if (e.key === 'Escape' && (menu.value || picker.value)) closeAndRefocus()
}
// Tabbing out of the column picker closes it, as Tab does for the row menu.
function onPickerFocusOut(e) {
  if (picker.value && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) picker.value = false
}
onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKey)
})

const caption = computed(() => {
  const n = note.value
  if (n?.search) {
    const q = query.value.trim()
    return {
      title: q ? `Search · ${rows.value.length} of ${LIGANDS.length}` : 'Search',
      text: 'Matches the name, the tag or any property value.',
    }
  }
  return n || {
    title: `${LIGANDS.length} p38α MAP kinase inhibitors`,
    text: 'Each comes from its own PDB entry. Atoms and MW show to start, and the column picker has the other properties.',
  }
})
</script>

<template>
  <div class="n-demo n-ltab-demo">
    <div ref="root" class="n-ltab" role="group" aria-label="Sample ligands table">
      <div class="n-ltab__title" aria-hidden="true">Ligands</div>

      <div class="n-ltab__bar">
        <button
          type="button"
          class="n-ltab__pill"
          title="Filter ligands"
          :aria-label="`Filter ligands, ${rows.length} of ${LIGANDS.length} listed`"
          @click="say(FILTER_NOTE)"
        >
          <AppIcon name="filter" size="16px" />{{ rows.length }}/{{ LIGANDS.length }}
        </button>

        <div class="n-ltab__pickwrap" @focusout="onPickerFocusOut">
          <button
            ref="pickBtn"
            type="button"
            class="n-ltab__round n-ltab__popbtn"
            :class="{ 'is-open': picker }"
            title="Select property columns"
            aria-label="Select property columns"
            :aria-expanded="picker"
            @click="togglePicker($event)"
          >
            <AppIcon name="columns-3" size="16px" />
          </button>

          <div v-if="picker" class="n-ltab__picker n-ltab__pop" role="dialog" aria-label="Property columns">
            <div class="n-ltab__pickhead">
              <button
                type="button"
                role="checkbox"
                class="n-ltab__box"
                :class="{ 'is-on': allOn }"
                :aria-checked="allOn"
                aria-label="All properties"
                @click="toggleAll"
              >
                <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" /></svg>
              </button>
              <label class="n-ltab__field">
                <input ref="pickField" v-model="pickerQuery" type="text" placeholder="Search properties" aria-label="Search properties" />
                <AppIcon name="search" size="18px" />
              </label>
            </div>
            <div class="n-ltab__options">
              <button
                v-for="o in listed"
                :key="o.key"
                type="button"
                role="checkbox"
                class="n-ltab__option"
                :class="{ 'is-on': order(o.key) > 0, 'is-out': o.out }"
                :aria-checked="order(o.key) > 0"
                :aria-disabled="o.out ? 'true' : undefined"
                :title="o.out ? 'Not in this copy' : undefined"
                @click="toggle(o)"
              >
                <span class="n-ltab__box" :class="{ 'is-on': order(o.key) > 0 }" aria-hidden="true">
                  <svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" /></svg>
                </span>
                <span>{{ order(o.key) ? `${order(o.key)} - ` : '' }}{{ o.key }}</span>
              </button>
              <p v-if="!listed.length" class="n-ltab__none">No properties match.</p>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="n-ltab__round"
          title="View presets"
          aria-label="View presets"
          @click="say(PRESETS_NOTE)"
        >
          <AppIcon name="bookmark" size="16px" />
        </button>

        <input v-model="query" class="n-ltab__search" type="search" placeholder="Search ligands" aria-label="Search ligands" @input="onSearch" />
      </div>

      <div class="n-ltab__body">
        <div
          class="n-ltab__scroll"
          :class="{ 'is-scrolled': scrolled, 'is-empty': !rows.length }"
          :style="growStyle"
          @scroll="onScroll"
        >
          <table class="n-ltab__table" aria-label="Ligands">
            <thead>
              <tr>
                <th class="n-ltab__img" scope="col">
                  <button type="button" class="n-ltab__label" @click="explain(BY_KEY.image)">Image</button>
                </th>
                <th v-for="c in headers" :key="c.key" scope="col" :aria-sort="ariaSort(c)">
                  <span class="n-ltab__head">
                    <!-- Nanome Web puts an info icon on each column with a tooltip; the XR copy keeps the one on MW. -->
                    <button v-if="xr ? c.key === 'MolWeight' : c.tip" type="button" class="n-ltab__info" :aria-label="`What ${head(c)} means`" @click="explain(c)">
                      <AppIcon name="info-circle" size="16px" />
                    </button>
                    <button
                      type="button"
                      class="n-ltab__sort"
                      :class="{ 'is-up': ariaSort(c) === 'ascending', 'is-down': ariaSort(c) === 'descending' }"
                      @click="sortBy(c)"
                    >
                      {{ head(c) }}
                      <svg viewBox="0 0 16 16" aria-hidden="true">
                        <path class="n-ltab__up" d="M5 13.5v-11M2 5.5l3-3 3 3" />
                        <path class="n-ltab__down" d="M11 2.5v11M8 10.5l3 3 3-3" />
                      </svg>
                    </button>
                  </span>
                </th>
                <th class="n-ltab__menucol" scope="col"><span class="n-ltab__sr">Row menu</span></th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="l in rows"
                :key="l.ccd"
                :class="{ 'is-on': active === l.ccd }"
                tabindex="0"
                @click="pick(l)"
                @keydown.enter.self="pick(l)"
              >
                <td
                  class="n-ltab__img"
                  @mouseenter="xr && (preview = l.ccd)"
                  @mouseleave="preview = null"
                  @click="xr && (preview = l.ccd)"
                >
                  <!-- Lazy, so the copy for the other theme, never shown, is never fetched. -->
                  <img class="n-ltab__light no-zoom" :src="src(l, false)" :alt="`2D drawing of ${l.ccd}`" width="84" height="42" loading="lazy" decoding="async" />
                  <img class="n-ltab__dark no-zoom" :src="src(l, true)" alt="" width="84" height="42" loading="lazy" decoding="async" />
                </td>
                <td
                  v-for="c in headers"
                  :key="c.key"
                  :class="{ 'is-num': isNumber(c), 'is-faint': c.key === 'tag' && !tags[l.ccd] }"
                >{{ cell(l, c) }}</td>
                <td class="n-ltab__menucol">
                  <button
                    type="button"
                    class="n-ltab__dots n-ltab__popbtn"
                    :aria-label="`Menu for ${l.name}`"
                    :aria-expanded="menu?.ccd === l.ccd"
                    @click.stop="openMenu(l, $event)"
                  >
                    <AppIcon name="dots-vertical" size="18px" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Outside the scrolling box, so it stays in view when the table is scrolled sideways. -->
        <p v-if="!rows.length" class="n-ltab__empty">No ligands</p>
      </div>

      <!-- Centered on the whole card and no taller than it, however few rows show. -->
      <div v-if="xr && previewRow" class="n-ltab__large" aria-hidden="true">
        <img class="n-ltab__light no-zoom" :src="src(previewRow, false)" alt="" />
        <img class="n-ltab__dark no-zoom" :src="src(previewRow, true)" alt="" />
        <span>{{ previewRow.name }}</span>
      </div>

      <div
        v-if="menuRow"
        ref="menuEl"
        class="n-ltab__menu n-ltab__pop"
        :style="menuStyle"
        role="menu"
        :aria-label="`${menuRow.name} menu`"
        @keydown="onMenuKey"
      >
        <div class="n-ltab__menuhead">Actions</div>
        <button type="button" role="menuitem" tabindex="-1" @click="act('sdf')"><AppIcon name="cloud-download" size="16px" />Download SDF</button>
        <button type="button" role="menuitem" tabindex="-1" @click="act('sketch')"><AppIcon name="hexagon-plus-2" size="16px" />Sketch variant</button>
        <button type="button" role="menuitem" tabindex="-1" @click="act('props')"><AppIcon name="info-circle" size="16px" />Properties</button>
        <div class="n-ltab__menuhead">Tag</div>
        <button
          v-for="t in TAGS"
          :key="t"
          type="button"
          role="menuitemradio"
          tabindex="-1"
          :aria-checked="tags[menuRow.ccd] === t"
          :class="{ 'is-on': tags[menuRow.ccd] === t }"
          @click="setTag(t)"
        ><AppIcon name="tag" size="16px" />{{ t }}</button>
        <!-- Only on a tagged ligand, as in Nanome Web. -->
        <button v-if="tags[menuRow.ccd]" type="button" role="menuitem" tabindex="-1" @click="setTag('')"><AppIcon name="x" size="16px" />Remove tag</button>
        <button type="button" role="menuitem" tabindex="-1" @click="act('new')"><AppIcon name="plus" size="16px" />New tag…</button>
      </div>
    </div>

    <div class="n-demo__caption" aria-live="polite"><strong>{{ caption.title }}</strong> {{ caption.text }}</div>
  </div>
</template>
