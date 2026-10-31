<script setup>
/**
 * A working copy of Nanome Web's full-screen Ligands table, holding 8
 * inhibitors of p38 alpha MAP kinase from the PDB (ligands.js says where each
 * value comes from). The column picker shows and hides the property columns,
 * a header sorts, the search box filters, the filter button filters on
 * property values and visibility, the presets button applies, saves and
 * deletes view presets, and the row menu sets the tag. The line under the
 * table explains the column or control last used.
 *
 * Both copies sort, search and filter the way both apps do, from their
 * source: a third click on a header goes back to the default order
 * (NanoTable.CycleSort in XR, removable-sort on Nanome Web's table); search
 * matches the name, the tag or any property value
 * (LigandsMenuViewModel.MatchesFilters in XR, `Si` in Nanome Web); and a
 * ligand is listed only when it passes every filter, the visible switch and
 * the search (MatchesFilters; `xi` and WorkspaceLigandsTable in Nanome Web).
 *
 * The filter and presets popovers follow each app's own (LigandFiltersPopup,
 * LigandPresetsPopup and LigandPresetReplacePopup in XR;
 * WorkspaceLigandsFilters and WorkspaceLigandsPresets in Nanome Web): XR
 * writes operators as symbols with their names as tooltips, starts on <, keeps
 * the property after adding a filter, titles its presets View Presets and asks
 * before replacing a preset of the same name; Nanome Web writes text operators
 * as words, starts on =, clears the row after adding, fills the filter button
 * while a filter or the visible switch is on, and saves a second preset under
 * a name already in use. Both delete a preset on a second click within 3
 * seconds (NanoButton confirmTooltip; NConfirmButton). Presets live for the
 * page visit only.
 *
 * The default copy heads its columns and puts info icons where Nanome Web does
 * (ligands.js). With app="xr" a drawing also shows larger while the pointer is
 * on it (LigandsMenu, #ligand-large-preview), which Nanome Web wasn't seen
 * doing.
 *
 * Measured from the app: header cells 12px 16px on #f8fafc, 16px text, rows
 * 66px tall, the drawing frozen in an 88px first column, numbers to 3
 * decimals.
 *
 *   <LigandTableDemo />
 *   <LigandTableDemo app="xr" />
 */
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { withBase } from 'vitepress'
import AppIcon from '../AppIcon.vue'
import {
  COLUMNS, DEFAULT_COLUMNS, FIXED, LEFT_OUT, LIGANDS, NUMERIC_OPS, OPERATORS, PRESETS, RATING, TEXT_OPS,
  depiction, formatValue,
} from './ligands.js'

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
/** More columns sit off to the right: the table fades at its right edge. */
const more = ref(false)
const scrollBox = ref(null)
const root = ref(null)
const menuEl = ref(null)
const pickBtn = ref(null)
const pickField = ref(null)
const filterBtn = ref(null)
const filterPop = ref(null)
const presetsBtn = ref(null)
const presetsPop = ref(null)
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

/* --- Filters ------------------------------------------------------------ */

const filterOpen = ref(false)
const filters = ref([])
const visibleOnly = ref(false)

/** The properties a filter can use: every property the ligands have, plus Rating, sorted. */
const FILTER_KEYS = [...COLUMNS.map((c) => c.key), RATING].sort((a, b) => a.localeCompare(b))

const toNumber = (v) => (v === undefined || v === null || String(v).trim() === '' ? NaN : Number(v))
const isNumericKey = (key) => key === RATING || LIGANDS.some((l) => !Number.isNaN(toNumber(l.props[key])))
const opLabel = (op) => OPERATORS[op][xr.value ? 'xr' : 'web']

/**
 * When an action removes or disables the control that has focus in a
 * popover, focus moves to `pick(popover)` instead of dropping to the page.
 * Called after the change, so its update to the page comes first.
 */
function keepFocus(pop, pick) {
  const was = document.activeElement
  if (!pop.value?.contains(was)) return
  nextTick(() => {
    if (was.isConnected && !was.disabled) return
    pick(pop.value)?.focus({ preventScroll: true })
  })
}
const PROPERTY = 'select[aria-label="Property"]'
const PRESET_NAME = 'input[aria-label="New preset name"]'

/**
 * Whether a ligand passes a filter: numbers compare as numbers when both sides
 * are numbers, anything else as text without regard to case, and a ligand
 * without the property fails. No sample ligand has a Rating. Nanome XR finds
 * no order between pieces of text, while Nanome Web sorts them.
 */
function passes(l, f) {
  const v = f.key === RATING ? undefined : l.props[f.key]
  if (v === undefined || v === null) return false
  const a = toNumber(v)
  const b = toNumber(f.value)
  const s = String(v).toLowerCase()
  const t = String(f.value).toLowerCase()
  const cmp = !Number.isNaN(a) && !Number.isNaN(b) ? Math.sign(a - b) : xr.value ? null : Math.sign(s.localeCompare(t))
  switch (f.op) {
    case 'EQUALS': return cmp === null ? s === t : cmp === 0
    case 'NOT_EQUALS': return cmp === null ? s !== t : cmp !== 0
    case 'LESS_THAN': return cmp !== null && cmp < 0
    case 'LESS_THAN_OR_EQUAL': return cmp !== null && cmp <= 0
    case 'GREATER_THAN': return cmp !== null && cmp > 0
    case 'GREATER_THAN_OR_EQUAL': return cmp !== null && cmp >= 0
    case 'CONTAINS': return s.includes(t)
    case 'NOT_CONTAINS': return !s.includes(t)
    case 'STARTS_WITH': return s.startsWith(t)
    case 'ENDS_WITH': return s.endsWith(t)
    default: return true
  }
}

/** The add row. XR starts on <, Nanome Web on =. */
const blankDraft = () => ({ key: '', op: xr.value ? 'LESS_THAN' : 'EQUALS', value: '' })
const draft = ref(blankDraft())
// With no property picked, XR offers the number operators; Nanome Web greys the list out.
const draftOps = computed(() => (!draft.value.key || isNumericKey(draft.value.key) ? NUMERIC_OPS : TEXT_OPS))
const canAdd = computed(() => !!draft.value.key && draft.value.value !== '')
// An operator the new property doesn't offer goes back to the first one, =.
watch(() => draft.value.key, () => {
  if (!draftOps.value.includes(draft.value.op)) draft.value.op = draftOps.value[0]
})

const filterActive = computed(() => filters.value.length > 0 || visibleOnly.value)

const listOps = (ops) => ops.map((op) => (xr.value && OPERATORS[op].xr !== OPERATORS[op].web ? `${OPERATORS[op].xr} (${OPERATORS[op].web})` : opLabel(op))).join(', ')
const describe = (f) => `${f.key} ${opLabel(f.op)} ${f.value}`

function pickKey() {
  const key = draft.value.key
  if (!key) return
  const numeric = isNumericKey(key)
  note.value = {
    title: `${key} · ${numeric ? 'numbers' : 'text'}`,
    text: key === RATING
      ? `Rating counts as a number, so its operators are ${listOps(NUMERIC_OPS)}.`
      : `Its values are ${numeric ? 'numbers' : 'text'}, so its operators are ${listOps(numeric ? NUMERIC_OPS : TEXT_OPS)}.`,
  }
}

function addFilter() {
  if (!canAdd.value) return
  const f = { key: draft.value.key, op: draft.value.op, value: String(draft.value.value) }
  filters.value = [...filters.value, f]
  // XR keeps the property and operator for the next filter; Nanome Web clears the row.
  draft.value = xr.value ? { ...draft.value, value: '' } : blankDraft()
  // Add turns off as the value clears, so focus goes on to the value in XR
  // and back to the property on Nanome Web.
  keepFocus(filterPop, (pop) => pop.querySelector(xr.value ? 'input[aria-label="Value"]' : PROPERTY))
  const sym = xr.value && OPERATORS[f.op].xr !== OPERATORS[f.op].web ? `${OPERATORS[f.op].xr} is ${OPERATORS[f.op].name}. ` : ''
  let text = `${sym}Compared as text, without regard to case. A ligand is listed only when it passes every filter.`
  if (f.key === RATING) text = 'No sample ligand has a rating, and a ligand without the property fails, so none passes.'
  else if (isNumericKey(f.key)) text = `Compared as numbers. A ligand is listed only when it passes every filter.`
  note.value = { title: describe(f), text, count: true }
}

function removeFilter(i) {
  const f = filters.value[i]
  filters.value = filters.value.filter((_, j) => j !== i)
  // On to the filter that takes its place, or the property when none is left.
  keepFocus(filterPop, (pop) => {
    const left = pop.querySelectorAll('.n-ltab__filter button')
    return left.length ? left[Math.min(i, left.length - 1)] : pop.querySelector(PROPERTY)
  })
  note.value = {
    title: `${describe(f)} · removed`,
    text: filters.value.length ? 'The other filters still apply.' : 'No filters are left.',
    count: true,
  }
}

function setVisible(on) {
  visibleOnly.value = on
  note.value = {
    title: `Filter by currently visible · ${on ? 'on' : 'off'}`,
    text: on
      ? 'Lists only ligands drawn in the 3D view. In this copy 1BL6 and 1BL7 stand in for hidden entries.'
      : 'Ligands of hidden entries are listed again.',
    count: true,
  }
}

const FILTER_NOTE = {
  title: 'Filter ligands',
  text: 'A ligand is listed when it passes every filter, the visible switch and the search. The button counts the ligands listed out of all of them.',
}

/* --- View presets ----------------------------------------------------------- */

const presetsOpen = ref(false)
const presets = ref(PRESETS.map((p, i) => ({ ...p, id: i + 1 })))
let nextPreset = presets.value.length + 1
const presetName = ref('')
/** XR only: the preset whose name the new one repeats, while Replace waits. */
const replacing = ref(null)
/** The preset whose delete button waits 3 seconds for a second click. */
const confirming = ref(null)
let confirmTimer = 0

const headList = (keys) => {
  const names = keys.map((k) => head(BY_KEY[k]))
  return names.length > 1 ? `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}` : names[0] || ''
}

function applyPreset(p) {
  selected.value = p.columns.length ? [...p.columns] : [...DEFAULT_COLUMNS]
  filters.value = p.filters.map((f) => ({ ...f }))
  if (sort.value.key && !FIXED.some((c) => c.key === sort.value.key) && !selected.value.includes(sort.value.key)) {
    sort.value = { key: null, dir: 1 }
  }
  closeAndRefocus()
  const out = LIGANDS.filter((l) => !p.filters.every((f) => passes(l, f))).map((l) => l.ccd)
  const one = p.filters.length === 1
  const leftOut = out.length ? `, which ${one ? 'leaves' : 'leave'} out ${out.length > 1 ? `${out.slice(0, -1).join(', ')} and ${out[out.length - 1]}` : out[0]}` : ''
  const set = p.filters.length ? ` ${one ? 'The filter is' : 'The filters are'} ${p.filters.map(describe).join(' and ')}${leftOut}.` : ' It has no filters.'
  note.value = { title: p.name, text: `The columns are ${headList(selected.value)}.${set}`, count: true }
}

function savePreset() {
  const name = presetName.value.trim()
  if (!name) return
  const twin = presets.value.find((p) => p.name.toLowerCase() === name.toLowerCase())
  if (xr.value && twin) {
    replacing.value = twin
    note.value = {
      title: 'Preset already exists',
      text: `Replace saves the current columns and filters as ${twin.name}. Cancel keeps it as it is.`,
    }
    return
  }
  presets.value = [...presets.value, { id: nextPreset++, name, columns: [...selected.value], filters: filters.value.map((f) => ({ ...f })) }]
  presetName.value = ''
  keepFocus(presetsPop, (pop) => pop.querySelector(PRESET_NAME))
  note.value = {
    title: `${name} · saved`,
    text: twin
      ? 'Nanome Web saves it beside the one of the same name, so the project now has both. This copy keeps it until the page closes.'
      : 'The current columns and filters, saved to the project for everyone in it. This copy keeps it until the page closes.',
  }
}

function replacePreset() {
  const p = replacing.value
  if (!p) return
  presets.value = presets.value.map((q) => (q.id === p.id ? { ...q, columns: [...selected.value], filters: filters.value.map((f) => ({ ...f })) } : q))
  replacing.value = null
  presetName.value = ''
  keepFocus(presetsPop, (pop) => pop.querySelector(PRESET_NAME))
  note.value = { title: `${p.name} · replaced`, text: 'It now holds the current columns and filters.' }
}

function cancelReplace() {
  replacing.value = null
  keepFocus(presetsPop, (pop) => pop.querySelector(PRESET_NAME))
  note.value = { title: 'Cancel', text: 'The preset stays as it was, and the name stays in the field.' }
}

const confirmLabel = computed(() => (xr.value ? 'Confirm delete' : 'Confirm delete preset'))

function deletePreset(p) {
  clearTimeout(confirmTimer)
  if (confirming.value !== p.id) {
    confirming.value = p.id
    confirmTimer = setTimeout(() => (confirming.value = null), 3000)
    note.value = { title: confirmLabel.value, text: `The trash button turns into a check. A second click within 3 seconds deletes ${p.name}.` }
    return
  }
  confirming.value = null
  const at = presets.value.findIndex((q) => q.id === p.id)
  presets.value = presets.value.filter((q) => q.id !== p.id)
  // On to the preset that takes its place, or the name field when none is left.
  keepFocus(presetsPop, (pop) => {
    const left = pop.querySelectorAll('.n-ltab__papply')
    return left.length ? left[Math.min(at, left.length - 1)] : pop.querySelector(PRESET_NAME)
  })
  note.value = { title: `${p.name} · deleted`, text: 'Gone from the project for everyone. The table keeps its columns and filters.' }
}

const PRESETS_NOTE = computed(() => ({
  title: 'View presets',
  text: xr.value
    ? 'Saved sets of columns and filters, kept in the project. Picking one sets the table to match; the visible switch and the search stay as they are.'
    : 'Saved sets of columns and filters, kept in the project, so the button shows only for a workspace in a project. Picking one sets the table to match.',
}))

const rows = computed(() => {
  const q = query.value.trim().toLowerCase()
  const list = LIGANDS.filter(
    (l) => (!q || matches(l, q)) && filters.value.every((f) => passes(l, f)) && (!visibleOnly.value || !l.hidden)
  )
  const { key, dir } = sort.value
  return key ? [...list].sort((a, b) => dir * compare(value(a, key), value(b, key))) : list
})

const src = (l, dark) => withBase(depiction(l.ccd, dark))
const previewRow = computed(() => LIGANDS.find((l) => l.ccd === preview.value))

const subscript = (formula) => formula.replace(/\s+/g, '').replace(/\d/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[d])

function closeAll() {
  picker.value = false
  menu.value = null
  filterOpen.value = false
  presetsOpen.value = false
  replacing.value = null
}

// Closes a popup and, when focus was in the demo, hands it back to the button
// that opened the popup.
function closeAndRefocus() {
  const back = menu.value
    ? menuTrigger
    : picker.value
      ? pickBtn.value
      : filterOpen.value
        ? filterBtn.value
        : presetsOpen.value
          ? presetsBtn.value
          : null
  const inside = root.value?.contains(document.activeElement)
  closeAll()
  if (inside && back?.isConnected) back.focus({ preventScroll: true })
}

/** Opens or closes the filter or presets popover. From the keyboard, focus goes into it. */
function togglePop(which, e) {
  const open = which === 'filter' ? !filterOpen.value : !presetsOpen.value
  closeAll()
  if (which === 'filter') filterOpen.value = open
  else presetsOpen.value = open
  if (!open) return
  note.value = which === 'filter' ? FILTER_NOTE : PRESETS_NOTE.value
  if (e?.detail === 0) {
    nextTick(() => (which === 'filter' ? filterPop : presetsPop).value?.querySelector('input, select, button')?.focus())
  }
}

// Tabbing out of a popover closes it, as Tab does for the row menu.
function onPopFocusOut(e, which) {
  if (!e.relatedTarget || e.currentTarget.contains(e.relatedTarget)) return
  if (which === 'filter') filterOpen.value = false
  else {
    presetsOpen.value = false
    replacing.value = null
  }
}

/**
 * A popover taller than the table below it would hang over the page, so the
 * table grows until it fits, as it does for the row menu.
 */
const popGrow = ref(0)
watch(
  [filterOpen, presetsOpen, replacing, () => filters.value.length, () => presets.value.length, () => rows.value.length],
  async () => {
    popGrow.value = 0
    await nextTick()
    const pop = filterPop.value || presetsPop.value
    if (!pop || !root.value) return
    const over = pop.getBoundingClientRect().bottom + 12 - root.value.getBoundingClientRect().bottom
    if (over > 0) popGrow.value = Math.ceil(over)
  },
  { flush: 'post' }
)

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
  filterOpen.value = false
  presetsOpen.value = false
  replacing.value = null
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
  filterOpen.value = false
  presetsOpen.value = false
  replacing.value = null
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
// The room goes under the last rows, or under "No ligands" when there are none.
const grow = computed(() => Math.max(menu.value?.grow || 0, popGrow.value))
const growStyle = computed(() => (grow.value && rows.value.length ? { paddingBottom: `${grow.value}px` } : undefined))

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

function measureMore() {
  const el = scrollBox.value
  more.value = !!el && el.scrollLeft + el.clientWidth < el.scrollWidth - 1
}
function onScroll(e) {
  scrolled.value = e.target.scrollLeft > 0
  measureMore()
  menu.value = null
}

// A click outside a popup closes it, and outside the drawings hides the large one.
function onPointerDown(e) {
  if (!e.target.closest?.('.n-ltab__pop, .n-ltab__popbtn')) closeAll()
  if (!e.target.closest?.('.n-ltab__img')) preview.value = null
}
function onKey(e) {
  if (e.key === 'Escape' && (menu.value || picker.value || filterOpen.value || presetsOpen.value)) closeAndRefocus()
}
// Tabbing out of the column picker closes it, as Tab does for the row menu.
function onPickerFocusOut(e) {
  if (picker.value && e.relatedTarget && !e.currentTarget.contains(e.relatedTarget)) picker.value = false
}
// The box and the table both change size: with the window, and as columns
// and rows come and go.
let resizeObs = null
onMounted(() => {
  document.addEventListener('pointerdown', onPointerDown)
  document.addEventListener('keydown', onKey)
  measureMore()
  resizeObs = new ResizeObserver(measureMore)
  resizeObs.observe(scrollBox.value)
  resizeObs.observe(scrollBox.value.firstElementChild)
})
onBeforeUnmount(() => {
  document.removeEventListener('pointerdown', onPointerDown)
  document.removeEventListener('keydown', onKey)
  resizeObs?.disconnect()
  clearTimeout(confirmTimer)
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
  if (n?.count) return { title: `${n.title} · ${rows.value.length} of ${LIGANDS.length}`, text: n.text }
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
        <div class="n-ltab__popwrap" @focusout="onPopFocusOut($event, 'filter')">
          <!-- Nanome Web fills the button while a filter or the visible switch is on; XR leaves it as it is. -->
          <button
            ref="filterBtn"
            type="button"
            class="n-ltab__pill n-ltab__popbtn"
            :class="{ 'is-open': filterOpen, 'is-filled': !xr && filterActive }"
            title="Filter ligands"
            :aria-label="`Filter ligands, ${rows.length} of ${LIGANDS.length} listed`"
            :aria-expanded="filterOpen"
            @click="togglePop('filter', $event)"
          >
            <AppIcon name="filter" size="16px" />{{ rows.length }}/{{ LIGANDS.length }}
          </button>

          <div
            v-if="filterOpen"
            ref="filterPop"
            class="n-ltab__fpop n-ltab__pop"
            :class="xr ? 'is-xr' : 'is-web'"
            role="dialog"
            aria-label="Filter ligands"
          >
            <label class="n-ltab__visible">
              <span>Filter by currently visible</span>
              <input
                type="checkbox"
                role="switch"
                class="n-app-switch"
                :checked="visibleOnly"
                @change="setVisible($event.target.checked)"
              />
            </label>

            <div v-if="!filters.length" class="n-ltab__nofilters">
              <AppIcon name="filter-off" size="24px" />
              <span>No filters yet</span>
            </div>
            <div v-else class="n-ltab__filters" role="list" aria-label="Filters">
              <div v-for="(f, i) in filters" :key="`${f.key}-${i}`" class="n-ltab__filter" role="listitem">
                <template v-if="xr">
                  <span class="n-ltab__fkey" :title="f.key">{{ f.key }}</span>
                  <span :title="OPERATORS[f.op].name">{{ opLabel(f.op) }}</span>
                  <span class="n-ltab__fval" :title="f.value">{{ f.value }}</span>
                </template>
                <span v-else class="n-ltab__fkey">{{ describe(f) }}</span>
                <button
                  type="button"
                  class="n-ltab__iconbtn"
                  :title="xr ? 'Remove filter' : undefined"
                  :aria-label="`Remove filter ${describe(f)}`"
                  @click="removeFilter(i)"
                >
                  <AppIcon :name="xr ? 'trash' : 'x'" size="16px" />
                </button>
              </div>
            </div>

            <div class="n-ltab__addrow">
              <span class="n-ltab__select is-key">
                <select v-model="draft.key" aria-label="Property" @change="pickKey">
                  <option value="" disabled>Select item</option>
                  <option v-for="k in FILTER_KEYS" :key="k" :value="k">{{ k }}</option>
                </select>
                <AppIcon name="chevron-down" size="14px" />
              </span>
              <span class="n-ltab__select is-op">
                <!-- As wide as the picked operator, as the app's dropdown is. -->
                <select
                  v-model="draft.op"
                  aria-label="Operator"
                  :disabled="!xr && !draft.key"
                  :style="{ width: `calc(${opLabel(draft.op).length}ch + 40px)` }"
                >
                  <option v-for="op in draftOps" :key="op" :value="op" :title="OPERATORS[op].name">{{ opLabel(op) }}</option>
                </select>
                <AppIcon name="chevron-down" size="14px" />
              </span>
              <input v-model="draft.value" class="n-ltab__input n-ltab__value" type="text" aria-label="Value" @keydown.enter.prevent="addFilter" />
              <button type="button" class="n-ltab__add" :disabled="!canAdd" aria-label="Add filter" @click="addFilter">
                <AppIcon name="plus" size="16px" />
              </button>
            </div>
          </div>
        </div>

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

        <div class="n-ltab__popwrap" @focusout="onPopFocusOut($event, 'presets')">
          <button
            ref="presetsBtn"
            type="button"
            class="n-ltab__round n-ltab__popbtn"
            :class="{ 'is-open': presetsOpen }"
            title="View presets"
            aria-label="View presets"
            :aria-expanded="presetsOpen"
            @click="togglePop('presets', $event)"
          >
            <AppIcon name="bookmark" size="16px" />
          </button>

          <div
            v-if="presetsOpen"
            ref="presetsPop"
            class="n-ltab__fpop n-ltab__ppop n-ltab__pop"
            :class="xr ? 'is-xr' : 'is-web'"
            role="dialog"
            aria-label="View presets"
          >
            <div v-if="xr" class="n-ltab__ptitle">View Presets</div>

            <div v-if="!presets.length" class="n-ltab__nopresets">
              <template v-if="xr">
                <AppIcon name="bookmark" size="24px" />
                <span>No presets yet</span>
              </template>
              <span v-else>No presets in this project yet.</span>
            </div>
            <div v-else class="n-ltab__plist">
              <div v-for="p in presets" :key="p.id" class="n-ltab__prow">
                <button
                  type="button"
                  class="n-ltab__papply"
                  :title="xr ? 'Apply preset' : 'Apply columns and filters'"
                  @click="applyPreset(p)"
                >{{ p.name }}</button>
                <button
                  type="button"
                  class="n-ltab__iconbtn is-danger"
                  :class="{ 'is-confirm': confirming === p.id }"
                  :title="confirming === p.id ? confirmLabel : 'Delete preset'"
                  :aria-label="confirming === p.id ? `${confirmLabel} ${p.name}` : `Delete preset ${p.name}`"
                  @click="deletePreset(p)"
                >
                  <AppIcon :name="confirming === p.id ? 'check' : 'trash'" size="16px" />
                </button>
              </div>
            </div>

            <div class="n-ltab__prow is-new">
              <input
                v-model="presetName"
                class="n-ltab__input"
                type="text"
                placeholder="New preset name"
                aria-label="New preset name"
                @keydown.enter.prevent="savePreset"
              />
              <button
                type="button"
                class="n-ltab__add"
                :disabled="!presetName.trim()"
                :title="xr ? 'Save current view as a new preset' : undefined"
                aria-label="Save current view as a new preset"
                @click="savePreset"
              >
                <AppIcon name="plus" size="16px" />
              </button>
            </div>

            <div v-if="replacing" class="n-ltab__replace" role="alertdialog" aria-label="Preset already exists">
              <strong>Preset already exists</strong>
              <span>A preset named "{{ replacing.name }}" already exists. Replace it with the current view?</span>
              <span class="n-ltab__replacebtns">
                <button type="button" class="n-ltab__textbtn" @click="cancelReplace">Cancel</button>
                <button type="button" class="n-ltab__textbtn is-primary" @click="replacePreset">
                  <AppIcon name="device-floppy" size="16px" />Replace
                </button>
              </span>
            </div>
          </div>
        </div>

        <input v-model="query" class="n-ltab__search" type="search" placeholder="Search ligands" aria-label="Search ligands" @input="onSearch" />
      </div>

      <div class="n-ltab__body">
        <div
          ref="scrollBox"
          class="n-ltab__scroll"
          :class="{ 'is-scrolled': scrolled, 'has-more': more, 'is-empty': !rows.length }"
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
        <p v-if="!rows.length" class="n-ltab__empty" :style="grow ? { paddingBottom: `${28 + grow}px` } : undefined">No ligands</p>
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
        <!-- Nanome XR's row has neither (LigandsMenu). -->
        <button v-if="!xr" type="button" role="menuitem" tabindex="-1" @click="act('sdf')"><AppIcon name="cloud-download" size="16px" />Download SDF</button>
        <button v-if="!xr" type="button" role="menuitem" tabindex="-1" @click="act('sketch')"><AppIcon name="hexagon-plus-2" size="16px" />Sketch variant</button>
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

<style>
/* The filter and View presets popovers, in the table's own colors (app.css).
   Nanome Web's are 22rem and 18rem wide. XR's filter popup is a little wider
   than its presets popup, so its copy is 24rem, room for its wider value field. */
.n-ltab__popwrap {
  position: relative;
  flex: none;
}

.n-ltab__fpop {
  position: absolute;
  top: calc(100% + 6px);
  left: 0;
  z-index: 20;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 22rem;
  padding: 12px;
  border: 1px solid var(--lt-line);
  border-radius: 8px;
  background: var(--lt-card);
  box-shadow: var(--lt-shadow);
  font-size: 14px;
  text-align: left;
}

.n-ltab__fpop.is-xr {
  width: 24rem;
}

.n-ltab__fpop.n-ltab__ppop {
  width: 18rem;
}

/* On a phone a popover spans the toolbar, as the column picker does. */
@media (max-width: 520px) {
  .n-ltab__popwrap {
    position: static;
  }

  .n-ltab__fpop,
  .n-ltab__fpop.is-xr,
  .n-ltab__fpop.n-ltab__ppop {
    top: calc(100% - 6px);
    right: 16px;
    left: 16px;
    width: auto;
  }
}

/* While a filter or the visible switch is on, Nanome Web fills the button. */
.n-ltab .n-ltab__pill.is-filled {
  border-color: var(--lt-hover);
  background: var(--lt-hover);
}

.n-ltab .n-ltab__pill.is-filled:hover,
.n-ltab .n-ltab__pill.is-open {
  background: var(--lt-line);
}

.n-ltab__visible {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 0;
  cursor: pointer;
}

/* Nanome Web rules the switch off from the list. */
.n-ltab__fpop.is-web .n-ltab__visible {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--lt-line);
}

.n-ltab__nofilters,
.n-ltab__fpop.is-xr .n-ltab__nopresets {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 0;
  color: var(--lt-muted);
}

.n-ltab__fpop.is-web .n-ltab__nopresets {
  padding: 4px;
  color: var(--lt-muted);
}

.n-ltab__filters,
.n-ltab__plist {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.n-ltab__filter {
  display: flex;
  align-items: center;
  gap: 8px;
  min-height: 32px;
}

.n-ltab__fpop.is-xr .n-ltab__filter {
  font-size: 16px;
}

.n-ltab__fkey,
.n-ltab__fval {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.n-ltab__fkey {
  flex: 1;
}

.n-ltab__fval {
  max-width: 8em;
}

/* The add row: property, operator, value and +. It wraps on a phone. */
.n-ltab__addrow {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.n-ltab__fpop.is-web .n-ltab__addrow {
  padding-top: 12px;
  border-top: 1px solid var(--lt-line);
}

.n-ltab__select {
  position: relative;
  display: inline-flex;
  flex: none;
  align-items: center;
  min-width: 0;
}

.n-ltab__select.is-key {
  flex: 1 1 6rem;
}

.n-ltab__select .n-appicon {
  position: absolute;
  right: 8px;
  color: var(--lt-muted);
  pointer-events: none;
}

.n-ltab__select select,
.n-ltab__input {
  height: 32px;
  min-width: 0;
  margin: 0;
  border: 1px solid var(--lt-input-line);
  border-radius: 6px;
  background: var(--lt-input);
  color: var(--lt-text);
  font: inherit;
  font-size: 14px;
}

.n-ltab__select select {
  width: 100%;
  padding: 0 28px 0 10px;
  appearance: none;
  cursor: pointer;
}

.n-ltab__select select:disabled {
  opacity: 0.6;
  cursor: default;
}

.n-ltab__select.is-op select {
  min-width: 3.5rem;
}

.n-ltab__input {
  padding: 0 10px;
}

.n-ltab__value {
  flex: 0 1 4rem;
  width: 4rem;
}

.n-ltab__fpop.is-xr .n-ltab__value {
  flex-basis: 6rem;
  width: 6rem;
}

.n-ltab__select select:focus-visible {
  outline: 2px solid var(--lt-purple);
  outline-offset: -2px;
}

/* Round icon buttons: remove, delete and +. */
.n-ltab__iconbtn,
.n-ltab__add {
  display: inline-flex;
  flex: none;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: transparent;
}

.n-ltab__iconbtn:hover {
  background: var(--lt-hover);
}

.n-ltab .n-ltab__iconbtn.is-danger {
  color: #ef4444;
}

/* Nanome Web's + is grey, XR's is the purple primary button. */
.n-ltab__add {
  background: var(--lt-hover);
}

.n-ltab__fpop.is-xr .n-ltab__add {
  background: var(--lt-purple);
  color: var(--lt-on-purple);
}

.n-ltab .n-ltab__add:disabled {
  opacity: 0.5;
  cursor: default;
}

.n-ltab__ptitle {
  font-size: 18px;
  font-weight: 700;
}

.n-ltab__prow {
  display: flex;
  align-items: center;
  gap: 4px;
}

.n-ltab__prow.is-new {
  gap: 8px;
}

.n-ltab__prow.is-new .n-ltab__input {
  flex: 1;
}

.n-ltab__fpop.is-web .n-ltab__prow.is-new {
  padding-top: 4px;
  border-top: 1px solid var(--lt-line);
}

/* A preset: a text button in Nanome Web, a grey button in XR. */
.n-ltab__papply {
  flex: 1;
  min-width: 0;
  height: 32px;
  padding: 0 12px;
  overflow: hidden;
  border: 0;
  border-radius: 999px;
  background: transparent;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.n-ltab__papply:hover {
  background: var(--lt-hover);
}

.n-ltab__fpop.is-xr .n-ltab__papply {
  background: var(--lt-hover);
  text-align: center;
}

.n-ltab__fpop.is-xr .n-ltab__papply:hover {
  background: var(--lt-line);
}

/* XR's Preset already exists prompt, under the name field it answers. */
.n-ltab__replace {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  border: 1px solid var(--lt-line);
  border-radius: 8px;
  background: var(--lt-table);
}

.n-ltab__replacebtns {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

.n-ltab__textbtn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  height: 32px;
  padding: 0 14px;
  border: 0;
  border-radius: 999px;
  background: var(--lt-hover);
}

.n-ltab .n-ltab__textbtn.is-primary {
  background: var(--lt-purple);
  color: var(--lt-on-purple);
}
</style>
