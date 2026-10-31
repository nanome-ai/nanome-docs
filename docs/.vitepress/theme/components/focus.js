/**
 * The full-screen view shared by <ShotRow> and <ScreenMap>: the element itself
 * goes fixed over the page, so the screenshot and its legend stay as they are
 * and the site around them drops away. A placeholder keeps the element's height
 * in the page meanwhile, so nothing below it moves.
 *
 * Escape, the close button, following a link and leaving the page all close
 * it. Tab stays inside it while it's open, and closing it with Escape or the
 * close button puts focus back on what opened it.
 */
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select, textarea, summary, iframe, [tabindex]:not([tabindex="-1"])'

export function useFocusView(root) {
  const focused = ref(false)
  const holdHeight = ref(0)
  const route = useRoute()
  let opener = null

  function onKey(event) {
    if (event.key === 'Escape') close()
    else if (event.key === 'Tab') keepFocus(event)
  }

  /** Tab and Shift+Tab go round the view instead of on to the page behind it. */
  function keepFocus(event) {
    // getClientRects, since the close button is fixed and has no offsetParent.
    const items = [...(root.value?.querySelectorAll(FOCUSABLE) || [])].filter(
      (el) => el.tabIndex >= 0 && el.getClientRects().length > 0 && getComputedStyle(el).visibility !== 'hidden'
    )
    if (!items.length) return
    const first = items[0]
    const last = items[items.length - 1]
    const active = document.activeElement
    if (!root.value.contains(active) || active === (event.shiftKey ? first : last)) {
      event.preventDefault()
      ;(event.shiftKey ? last : first).focus()
    }
  }

  async function open() {
    if (focused.value || !root.value) return
    opener = document.activeElement
    holdHeight.value = root.value.offsetHeight
    focused.value = true
    document.documentElement.classList.add('n-focus-open')
    document.addEventListener('keydown', onKey)
    await nextTick()
    root.value?.querySelector('.n-focus-close')?.focus({ preventScroll: true })
  }

  async function shut(restore) {
    if (!focused.value) return
    focused.value = false
    holdHeight.value = 0
    document.documentElement.classList.remove('n-focus-open')
    document.removeEventListener('keydown', onKey)
    const back = opener
    opener = null
    if (!restore) return
    // The expand button comes back on the next render, so wait for it. A
    // browser that doesn't focus a clicked button leaves the page as opener.
    await nextTick()
    const target =
      back?.isConnected && root.value?.contains(back)
        ? back
        : root.value?.querySelector('.hotshot__expand.is-button, .hotshot__frame[tabindex]')
    target?.focus?.({ preventScroll: true })
  }

  /** Escape or the close button. */
  const close = () => shut(true)

  /** Following any link from the full-screen view closes it first. */
  function onClick(event) {
    if (focused.value && event.target.closest?.('a[href]')) shut(false)
  }

  watch(() => route.path, () => shut(false))
  onBeforeUnmount(() => shut(false))

  return { focused, holdHeight, open, close, onClick }
}
