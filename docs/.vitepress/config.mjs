import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitepress'

// Pages for people editing the docs. `docs:dev` serves them; `docs:build` leaves
// them out, so they never reach docs.nanome.ai, its sitemap or its search index.
const isProduction = process.env.NODE_ENV === 'production'

// --- Page sections -----------------------------------------------------------

const docsDir = fileURLToPath(new URL('..', import.meta.url))

/** VitePress's heading slug (`slugify` in @mdit-vue/shared), copied because
    the package is bundled inside VitePress rather than installed on its own. */
const rControl = /[\u0000-\u001f]/g
const rSpecial = /[\s~`!@#$%^&*()\-_+=[\]{}|\\;:"'“”‘’<>,.?/]+/g
const rCombining = /[\u{300}-\u{36f}]/gu

const slugify = (str) =>
  str
    .normalize('NFKD')
    .replace(rCombining, '')
    .replace(rControl, '')
    .replace(rSpecial, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/^(\d)/, '_$1')
    .toLowerCase()

const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: '\u{a0}' }

/**
 * The text a heading's slug is made from: what markdown-it-anchor reads from
 * its text and inline-code tokens. Inline HTML (the `<AppIcon>` in front of most
 * headings), images and emphasis markers are not text, so they drop out.
 */
function headingText(source) {
  return source
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/<\/?[A-Za-z][^>]*>/g, '')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/`+ ?([^`]*?) ?`+/g, '$1')
    .replace(/(?<!\*)(\*{1,3})(?![\s*])(.*?[^\s*])\1(?!\*)/g, '$2')
    .replace(/(?<![\w_])(_{1,3})(?![\s_])(.*?[^\s_])\1(?![\w_])/g, '$2')
    .replace(/(?<!~)~~(?![\s~])(.*?[^\s~])~~(?!~)/g, '$1')
    .replace(/\\([!-/:-@[-`{-~])/g, '$1')
    .replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, name) =>
      name[0] === '#'
        ? String.fromCodePoint(parseInt(name.slice(1).replace(/^x/i, '0x')))
        : ENTITIES[name.toLowerCase()] ?? match
    )
}

/**
 * The h2 headings of the page a sidebar link points at, as `{ text, link }`.
 *
 * Read from the markdown when the config loads, so every page in the sidebar
 * carries its own sections, whichever page is open. The id is the heading's
 * own `{#id}`, or else the slug VitePress gives it. Ids are claimed in page
 * order across every heading level, as VitePress claims them, so a repeated
 * title gets the same `-1` suffix. In `docs:dev`, a new or renamed heading
 * shows up here after a restart.
 */
function pageSections(link) {
  const path = link.slice(1).replace(/\.(md|html)$/, '').replace(/(^|\/)$/, '$1index')
  const file = [`${path}.md`, `${path}/index.md`]
    .map((name) => `${docsDir}${name}`)
    .find((name) => existsSync(name))
  if (!file) return []

  const lines = readFileSync(file, 'utf8')
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, '')
    .split(/\r?\n/)

  const sections = []
  const taken = new Set()
  let fence = null
  let inComment = false

  for (const line of lines) {
    if (fence) {
      if (line.match(/^ {0,3}(`{3,}|~{3,})[ \t]*$/)?.[1].startsWith(fence)) fence = null
      continue
    }
    if (inComment) {
      inComment = !line.includes('-->')
      continue
    }

    const open = line.match(/^ {0,3}(`{3,}|~{3,})/)
    if (open) {
      fence = open[1]
      continue
    }
    if (/<!--(?![\s\S]*-->)/.test(line)) {
      inComment = true
      continue
    }

    const heading = line.match(/^ {0,3}(#{1,6})(?:[ \t]+(.*?))?(?:[ \t]+#+)?[ \t]*$/)
    if (!heading) continue

    let content = heading[2] ?? ''
    let id = null
    const attrs = content.match(/[ \t]*\{([^{}]*)\}[ \t]*$/)
    if (attrs) {
      content = content.slice(0, attrs.index)
      id = attrs[1].match(/(?:^|\s)#([^\s}]+)/)?.[1] ?? null
    }

    const text = headingText(content)
    if (!id) {
      const base = slugify(text)
      id = base
      for (let n = 1; taken.has(id); n++) id = `${base}-${n}`
    }
    taken.add(id)

    if (heading[1].length === 2) {
      sections.push({ text: text.replace(/\s+/g, ' ').trim(), link: `${link}#${id}` })
    }
  }

  return sections
}

/** Gives every page link in a sidebar tree its `sections`, for the theme's
    left rail and breadcrumb. Section links carry a `#`, so they get none. */
function withSections(items) {
  for (const item of items) {
    if (item.items) withSections(item.items)
    if (item.link?.startsWith('/') && !item.link.includes('#')) {
      const sections = pageSections(item.link)
      if (sections.length) item.sections = sections
    }
  }
  return items
}

export default defineConfig({
  title: 'Help & Documentation',
  description: 'Documentation site for Nanome software.',
  cleanUrls: true,

  // The site data, which now carries every page's section list, goes in one
  // cached script instead of being inlined into every page's HTML.
  metaChunk: true,

  // Where a clicked anchor link puts its heading: 40px under the theme's
  // breadcrumb strip, or under the nav bar on a page without one. The
  // heading margins in theme/styles/doc.css match it for links opened
  // directly. The section highlight in the rails uses the same line.
  scrollOffset: { selector: ['.n-pagebar', '.n-navbar'], padding: 40 },

  srcExclude: isProduction ? ['contributing/**'] : [],

  // A line that starts with <Btn> or <AppIcon> stays a paragraph. VitePress
  // otherwise reads any line that starts with a component as a block of its
  // own, so the line loses its paragraph spacing, or runs on into the next
  // paragraph or the line before it.
  markdown: {
    component: { inlineTags: ['Btn', 'AppIcon'] },

    // A heading's permalink is named for the heading's text, without the
    // <AppIcon> in front of it or the {#id} after it.
    config(md) {
      md.core.ruler.after('anchor', 'n-anchor-label', (state) => {
        for (const token of state.tokens) {
          if (token.type !== 'inline') continue
          for (const child of token.children || []) {
            if (child.type !== 'link_open' || !(child.attrGet('class') || '').includes('header-anchor')) continue
            const text = headingText(token.content.replace(/[ \t]*\{[^{}]*\}[ \t]*$/, '')).replace(/\s+/g, ' ').trim()
            child.attrSet('aria-label', `Permalink to "${text}"`)
          }
        }
      })
    }
  },

  head: [
    ['link', { rel: 'icon', href: '/assets/favicon.ico' }],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-79179574-15'
      }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-79179574-15');`
    ]
  ],

  sitemap: {
    hostname: 'https://docs.nanome.ai'
  },

  lastUpdated: true,

  themeConfig: {
    logo: {
      light: '/assets/nanome-logo-dark.svg',
      dark: '/assets/nanome-logo.svg',
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Nanome.ai', link: 'https://nanome.ai/' },
      { text: 'Download', link: 'https://home.nanome.ai/setup' },
      { text: 'Contact', link: '/help/contact' },
    ],

    search: {
      provider: 'local'
    },

    sidebar: withSections([
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Nanome',
        collapsed: true,
        items: [
          {
            text: 'Nanome XR',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/nanome_v2/overview' },
              { text: 'Getting Started', link: '/getting-started' },
              { text: "What's New in 2.7", link: '/nanome_v2/whatsnew' },
              { text: 'Login', link: '/nanome_v2/login' },
              { text: 'Controls', link: '/nanome_v2/controls' },
              { text: 'Main Panel', link: '/nanome_v2/mainpanel' },
              { text: 'Tools Panel', link: '/nanome_v2/toolspanel' },
              { text: 'Scenes Panel', link: '/nanome_v2/scenespanel' },
              { text: 'Wrist Menu', link: '/nanome_v2/wristmenu' },
              { text: 'Sequence Panel', link: '/nanome_v2/sequencepanel' },
              { text: 'Environment', link: '/nanome_v2/environment' },
              { text: 'Collaboration', link: '/nanome_v2/collaboration' },
              { text: 'Session Guide', link: '/session-guide' },
              { text: 'Sample Workflows', link: '/nanome_v2/sampleworkflows' },
              { text: 'Tips', link: '/nanome_v2/tips' },
              { text: 'Vision Pro', link: '/nanome_v2/visionpro' }
            ]
          },
          {
            text: 'Nanome Web',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/nanome_web/overview' },
              { text: 'Web App Basics (Video)', link: '/nanome_web/basics' },
              { text: 'Home, Workspaces & Projects', link: '/nanome_web/home' },
              { text: 'Workspace View', link: '/nanome_web/workspace' },
              { text: 'Selection & Measurement', link: '/nanome_web/workspace#tool-rail' },
              { text: 'Loading Structures', link: '/nanome_web/loading' },
              { text: 'Entries Tab', link: '/nanome_web/entries' },
              { text: 'Ligands Tab', link: '/nanome_web/ligands' },
              { text: 'Users & Sharing', link: '/nanome_web/collaboration' },
              { text: 'Comments', link: '/nanome_web/comments' },
              { text: 'MD Trajectory Playback', link: '/nanome_web/mdplayback' },
              { text: 'Account & Settings', link: '/nanome_web/account' },
              { text: 'Supported File Formats', link: '/nanome_web/fileformats' }
            ]
          }
        ]
      },
      {
        text: 'MARA',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/mara/overview' },
          { text: 'Features', link: '/mara/features' },
          { text: 'Navigation', link: '/mara/navigation' },
          { text: 'Technical', link: '/mara/technical' },
          { text: 'Resources', link: '/mara/resources' }
        ]
      },
      {
        text: 'Nanome Classic (v1.24)',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/nanome1x/overview'
          },
          {
            text: 'Nanome Controls',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/controls/overview' }
            ]
          },
          {
            text: 'Nanome Navigation',
            collapsed: true,
            items: [
              { text: 'Lobby', link: '/nanome1x/navigation/lobby' },
              { text: 'Environment', link: '/nanome1x/navigation/environment' },
              { text: 'Main Menus', link: '/nanome1x/navigation/menus' },
              { text: 'Wrist Menu', link: '/nanome1x/navigation/wristmenu' },
              { text: 'Action Menu', link: '/nanome1x/navigation/actionmenu' },
              { text: 'Tools Menu', link: '/nanome1x/navigation/toolsmenu' },
              { text: '2D UI', link: '/nanome1x/navigation/2dui' },
              { text: 'Voice Command', link: '/nanome1x/navigation/voicecommand' }
            ]
          },
          {
            text: 'Nanome Plugins (Stacks)',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/nanome1x/plugins/overview' },
              { text: 'Chemical Interactions', link: '/nanome1x/plugins/cheminteractions' },
              { text: 'Superimpose', link: '/nanome1x/plugins/superimpose' },
              { text: 'Antibodies', link: '/nanome1x/plugins/antibodies' },
              { text: 'Chemical Properties', link: '/nanome1x/plugins/chemicalproperties' },
              { text: 'Conformer Generator', link: '/nanome1x/plugins/conformergenerator' },
              { text: 'Docking', link: '/nanome1x/plugins/docking' },
              { text: 'LiveDesign', link: '/nanome1x/plugins/LiveDesign' },
              { text: 'Minimization', link: '/nanome1x/plugins/minimization' },
              { text: 'Real-Time Scoring', link: '/nanome1x/plugins/realtimescoring' },
              { text: 'Structure Prep', link: '/nanome1x/plugins/structureprep' },
              { text: 'Vault', link: '/nanome1x/plugins/vault' },
              { text: 'Scene Viewer', link: '/nanome1x/plugins/sceneviewer' },
              { text: 'RMSD', link: '/nanome1x/plugins/rmsd' },
              { text: 'Cryo-EM', link: '/nanome1x/plugins/cryoem' },
              { text: 'Create Your Own', link: '/nanome1x/plugins/createyourown' },
              { text: 'Stack Studio', link: '/nanome1x/plugins/stackstudio' }
            ]
          },
          {
            text: 'Nanome Macros',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/nanome1x/macros/overview' }
            ]
          },
          {
            text: 'How To',
            collapsed: true,
            items: [
              { text: 'How To', link: '/nanome1x/howto/howto' }
            ]
          },
          {
            text: 'Hardware & Deployment',
            collapsed: true,
            items: [
              { text: 'Choosing Hardware (Classic)', link: '/help/choosinghardware-classic' },
              { text: 'Hardware Requirements', link: '/help/hardwarerequirements' },
              { text: 'PC Hardware', link: '/help/pchardware' },
              { text: 'Enterprise Deployment', link: '/help/enterprise' },
              { text: 'Quest for Business', link: '/help/questforbusiness' }
            ]
          },
          {
            text: 'Open in Nanome button',
            collapsed: true,
            items: [
              { text: 'Deep Linking', link: '/nanome1x/integration/deeplinking' },
              { text: 'Quick Drop', link: '/nanome1x/integration/quickdrop' }
            ]
          }
        ]
      },
      {
        text: 'Accounts & Licenses',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/home.nanome.ai/overview_home_nanome' },
          { text: 'Licenses', link: '/home.nanome.ai/licenses' },
          { text: 'Two Factor Auth', link: '/home.nanome.ai/twofactorauth' },
          { text: 'Invoice', link: '/home.nanome.ai/invoice' },
          { text: 'Account Tiers', link: '/home.nanome.ai/accounttiers' },
          { text: 'Meetings', link: '/home.nanome.ai/meetings' }
        ]
      },
      {
        text: 'Help',
        collapsed: true,
        items: [
          { text: 'FAQ', link: '/help/faq' },
          { text: 'Troubleshooting', link: '/help/troubleshooting' },
          { text: 'Choosing Hardware', link: '/help/choosinghardware' },
          { text: 'Contact', link: '/help/contact' }
        ]
      },
      ...(isProduction ? [] : [{
        text: 'For editors',
        collapsed: true,
        items: [
          { text: 'Interactive components', link: '/contributing/components' }
        ]
      }])
    ]),

    sidebarDepth: 2
  }
})
