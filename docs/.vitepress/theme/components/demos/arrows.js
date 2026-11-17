/**
 * Arrow keys for a row or list of option buttons: the next or previous
 * button that isn't disabled takes focus and is picked, wrapping at the ends.
 * Tab still stops on each button, as on any toggle button.
 *
 *   <div role="group" @keydown="arrowPick">  <button aria-pressed>…
 */
const STEP = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }

export function arrowPick(e) {
  const step = STEP[e.key]
  if (!step || e.altKey || e.ctrlKey || e.metaKey) return
  const list = [...e.currentTarget.querySelectorAll('button:not(:disabled)')]
  const i = list.indexOf(document.activeElement)
  if (i < 0) return
  e.preventDefault()
  const to = list[(i + step + list.length) % list.length]
  to.focus()
  to.click()
}
