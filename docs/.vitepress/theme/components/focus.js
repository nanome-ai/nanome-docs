/**
 * The full-screen view shared by <ShotRow> and <ScreenMap>: the element itself
 * goes fixed over the page, so the screenshot and its legend stay as they are
 * and the site around them drops away. A placeholder keeps the element's height
 * in the page meanwhile, so nothing below it moves.
 *
 * Escape, the close button, following a link and leaving the page all close
 * it, and focus goes back to what opened it.
 */
import { nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { useRoute } from 'vitepress'

export function useFocusView(root) {
  const focused = ref(false)
  const holdHeight = ref(0)
  const route = useRoute()
  let opener = null

  function onKey(event) {
    if (event.key === 'Escape') close()
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

  function close() {
    if (!focused.value) return
    focused.value = false
    holdHeight.value = 0
    document.documentElement.classList.remove('n-focus-open')
    document.removeEventListener('keydown', onKey)
    opener?.focus?.({ preventScroll: true })
    opener = null
  }

  /** Following any link from the full-screen view closes it first. */
  function onClick(event) {
    if (focused.value && event.target.closest?.('a[href]')) close()
  }

  watch(() => route.path, close)
  onBeforeUnmount(close)

  return { focused, holdHeight, open, close, onClick }
}
