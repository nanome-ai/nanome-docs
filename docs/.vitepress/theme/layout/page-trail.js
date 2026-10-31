/**
 * Where the current page sits in the sidebar: the groups leading to its row,
 * outermost first, then the row. The breadcrumb reads it for its trail, and
 * the left rail reads it to decide which groups are open.
 *
 * A few pages have no row (older Classic pages that redirects still reach,
 * and MARA's placeholder page). They sit under the deepest group whose own
 * rows include a page from the same folder, so the rail still opens where
 * they belong and the breadcrumb still names it. A page whose folder points
 * at the wrong group names its top-level group in its frontmatter instead,
 * such as `trail: Help`.
 */
import { computed } from 'vue'
import { useData } from 'vitepress'
import { isActive } from 'vitepress/dist/client/shared.js'
import { getSidebar } from 'vitepress/dist/client/theme-default/support/sidebar.js'

/** The groups leading to the page's own row, then the row. */
function rowTrail(items, path, above = []) {
  for (const item of items) {
    // A `#` link points into a page, so it can't be the page's own row.
    if (item.link && !item.link.includes('#') && isActive(path, item.link)) {
      return [...above, item]
    }
    if (item.items) {
      const found = rowTrail(item.items, path, [...above, item])
      if (found) return found
    }
  }
  return null
}

const folderOf = (path) => path.replace(/^\//, '').replace(/[^/]*$/, '')

/** The groups leading to the deepest group with a row from `folder`. */
function folderTrail(items, folder, above = []) {
  let best = null
  for (const item of items) {
    if (!item.items) continue
    const trail = [...above, item]
    const inner = folderTrail(item.items, folder, trail)
    const own = item.items.some(
      (child) => child.link && !child.link.includes('#') && folderOf(child.link) === folder
    )
    const found = inner || (own ? trail : null)
    if (found && (!best || found.length > best.length)) best = found
  }
  return best
}

/**
 * Whether `group` leads to the current page. VitePress's `getSidebar()` copies
 * the config's items on every call, so groups are matched by label, which is
 * unique across the config.
 */
export function inTrail(trail, group) {
  return !!group.items && trail.groups.some((item) => item.text === group.text)
}

/**
 * `{ groups, row }` for the current page: `row` is its sidebar entry, or null
 * when the sidebar doesn't list it, and `groups` are the groups around it.
 */
export function usePageTrail() {
  const { page, theme } = useData()

  return computed(() => {
    const path = page.value.relativePath
    const sidebar = getSidebar(theme.value.sidebar, path)
    const trail = rowTrail(sidebar, path)
    if (trail) return { groups: trail.slice(0, -1), row: trail[trail.length - 1] }

    const named = page.value.frontmatter?.trail
    const group = named && sidebar.find((item) => item.text === named)
    if (group) return { groups: [group], row: null }

    const folder = folderOf(path)
    return { groups: (folder && folderTrail(sidebar, folder)) || [], row: null }
  })
}
