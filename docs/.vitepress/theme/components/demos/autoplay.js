/**
 * Steps an option panel through its options on its own: only while it's on
 * screen, paused while the pointer or focus is on it, and never again once
 * the reader picks something. With reduced motion it doesn't start at all.
 */
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

export function useAutoplay(root, step, interval = 3200) {
  const playing = ref(true)
  const paused = ref(false)
  const visible = ref(false)
  let timer = 0
  let observer = null

  function schedule() {
    clearTimeout(timer)
    if (!playing.value || paused.value || !visible.value) return
    timer = setTimeout(() => {
      step()
      schedule()
    }, interval)
  }

  watch([playing, paused, visible], schedule)

  onMounted(() => {
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) playing.value = false
    observer = new IntersectionObserver(([e]) => (visible.value = e.isIntersecting), { threshold: 0.4 })
    if (root.value) observer.observe(root.value)
  })

  onBeforeUnmount(() => {
    clearTimeout(timer)
    observer?.disconnect()
  })

  /** The reader chose something: stop for good. */
  function stop() {
    playing.value = false
    clearTimeout(timer)
  }

  function toggle() {
    playing.value = !playing.value
    if (playing.value) step()
  }

  const hold = {
    onMouseenter: () => (paused.value = true),
    onMouseleave: () => (paused.value = false),
    onFocusin: () => (paused.value = true),
    onFocusout: () => (paused.value = false),
  }

  return { playing, paused, visible, stop, toggle, hold }
}
