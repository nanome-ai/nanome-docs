/**
 * Shared plumbing for <Chooser>.
 *
 * Conditions are written as strings so a markdown author never has to pass a
 * function through a prop:
 *
 *   "device=meta"                 device is meta
 *   "device=meta fleet=many"      both hold (space-separated terms are AND)
 *   "device=meta|samsung"         device is either (pipe is OR within a term)
 *   "device!=meta"                device is anything but meta
 *   "fleet"                       fleet has been answered at all
 *
 * An empty or missing condition always matches.
 */

export const CHOOSER_KEY = Symbol('nanome-chooser')

/** Parse one term, e.g. `device!=meta|samsung`. */
function parseTerm(term) {
  const negated = term.includes('!=')
  const [key, raw] = term.split(negated ? '!=' : '=')
  return {
    key: key.trim(),
    negated,
    values: raw === undefined ? null : raw.split('|').map((v) => v.trim()),
  }
}

/**
 * @param {string|undefined} condition
 * @param {Record<string,string>} answers
 */
export function matches(condition, answers) {
  if (!condition) return true

  return condition
    .split(/\s+/)
    .filter(Boolean)
    .every((term) => {
      const { key, negated, values } = parseTerm(term)
      const answer = answers[key]

      // Bare key: satisfied by any answer at all.
      if (values === null) return negated ? !answer : !!answer

      const hit = answer != null && values.includes(answer)
      return negated ? !hit : hit
    })
}

/** The query-string key a step's answer is stored under. */
export function queryKey(param, stepId, stepCount) {
  if (!param) return stepId
  return stepCount === 1 ? param : `${param}-${stepId}`
}

/**
 * Read the current answers out of `location.search`, keeping only values the
 * steps actually offer so a hand-edited URL cannot wedge the picker.
 */
export function readQuery(param, steps) {
  if (typeof window === 'undefined') return {}

  const search = new URLSearchParams(window.location.search)
  const answers = {}

  for (const step of steps) {
    const value = search.get(queryKey(param, step.id, steps.length))
    if (value && step.options.some((o) => o.id === value)) {
      answers[step.id] = value
    }
  }

  return answers
}

/**
 * Mirror the answers into the address bar without adding a history entry, so
 * Back still leaves the page rather than stepping through every click.
 */
export function writeQuery(param, steps, answers) {
  if (typeof window === 'undefined') return

  const url = new URL(window.location.href)

  for (const step of steps) {
    const key = queryKey(param, step.id, steps.length)
    const value = answers[step.id]
    if (value) url.searchParams.set(key, value)
    else url.searchParams.delete(key)
  }

  window.history.replaceState(window.history.state, '', url)
}
