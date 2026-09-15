# Porting the Getting Started and Session Guide chapters

The docs theme now carries the interactive components these two guides need.
The content itself is still on two open pull requests against `nanome.ai`, so
it has not been copied here yet — copying from a branch that can still change
would mean reconciling two diverging copies later.

- **PR 85** — `feature/setup-onboarding`, rebuilds `/setup` as a 7-chapter
  onboarding guide.
- **PR 86** — `feature/session-playbook`, adds `/session-guide` in 8 chapters.
  It branches off PR 85, so that branch holds both.

When both land on `master`, do the port described below.

## What maps to what

Each chapter on the website becomes one page here, which is why the sidebar
groups below are nested. The website renders a chapter as a Vue component under
`app/components/pages/`; here the same content is markdown plus the components
documented at [/contributing/components](docs/contributing/components.md).

### Nanome › Getting Started

| Page | Source component | Interactive parts |
| --- | --- | --- |
| `docs/getting-started/hardware.md` | `setup/SetupHardware.vue` | `CardGrid` of headsets, `Card` for each reseller |
| `docs/getting-started/choose-an-mdm.md` | `setup/SetupMdm.vue` | `Chooser` (`param="mdm"`), `Accordion` for the comparison |
| `docs/getting-started/mdm-setup.md` | `setup/SetupMdmGuides.vue` | `Tabs`, one per vendor |
| `docs/getting-started/network.md` | `setup/SetupNetwork.vue` | `AccordionGroup` of 6 checks, `CopyBlock` for the allowlist |
| `docs/getting-started/install.md` | `setup/SetupInstall.vue` | `Chooser` (`param="install"`), `Steps` per method |
| `docs/getting-started/accounts.md` | `setup/SetupAccount.vue` | `AccordionGroup` of 4 steps |
| `docs/getting-started/log-in.md` | `setup/SetupLogin.vue` | `AccordionGroup` of 2 rows |

### Nanome › Session Guide

| Page | Source component | Interactive parts |
| --- | --- | --- |
| `docs/session-guide/plan.md` | `session-guide/SessionPlan.vue` | `CardGrid` |
| `docs/session-guide/build.md` | `session-guide/SessionBuild.vue` | `YoutubeEmbed`, `Chooser` over the 3 build paths, `CopyBlock` for the MCP commands |
| `docs/session-guide/scenes.md` | `session-guide/SessionScenes.vue` | screenshots, `Callout` |
| `docs/session-guide/comfort.md` | `session-guide/SessionComfort.vue` | the comfort table as a markdown table |
| `docs/session-guide/permissions.md` | `session-guide/SessionRoles.vue` | `CardGrid` of the 4 roles |
| `docs/session-guide/share.md` | `session-guide/SessionShare.vue` | `Steps` |
| `docs/session-guide/run-the-session.md` | `session-guide/SessionLive.vue` | `AccordionGroup`, `YoutubeEmbed` |
| `docs/session-guide/troubleshooting.md` | `session-guide/SessionFixes.vue` | `AccordionGroup` of 6 checks |

## Facts worth keeping in one place

Links, download URLs, MDM pricing, allowlist hosts and the comfort numbers live
in three files on the website branch:

- `app/data/setup-guide.js`
- `app/data/setup-devices.js`
- `app/data/session-guide.js`

These change more often than the prose does. Copy them into
`docs/.vitepress/data/` and import them from a page's `<script setup>` block
rather than inlining the values across a dozen markdown pages:

```md
<script setup>
import { SETUP_LINKS } from '../.vitepress/data/setup-guide.js'
</script>
```

## Things that do not carry over

The website is Nuxt and the docs are VitePress, so four things need swapping as
you port each component:

1. **Icons.** The website uses PrimeIcons (`<i class="pi pi-check" />`). There
   is no icon font here — the components draw their own inline SVG, and prose
   should do without.
2. **Nuxt helpers.** `useHead` becomes page frontmatter, `navigateTo` becomes a
   plain link, and `<n-card>` becomes `<Card>`.
3. **SCSS variables.** `$text-link`, `$bg-page` and the rest resolve to nothing
   here. The components already read `--n-*` custom properties instead, which
   is what makes them work in light and dark.
4. **Light-only colour.** The website guide is light-mode only. Anything ported
   has to be checked in dark mode too, since the docs default to it.

## Images

PR 86 commits 15 screenshots under `app/assets/img/session-guide/`, and PR 85
adds 4 under `app/assets/img/setup/accounts/`. Copy them to
`docs/public/assets/original/session-guide/` and
`docs/public/assets/original/setup/`, then run `npm run docs:compress`.

## Sidebar

Add these two entries at the top of the existing `Nanome` group in
`docs/.vitepress/config.mjs`, above `Login`:

```js
{
  text: 'Getting Started',
  collapsed: true,
  items: [
    { text: 'Hardware', link: '/getting-started/hardware' },
    { text: 'Choose an MDM', link: '/getting-started/choose-an-mdm' },
    { text: 'MDM setup guides', link: '/getting-started/mdm-setup' },
    { text: 'Wi-Fi & network', link: '/getting-started/network' },
    { text: 'Download & install', link: '/getting-started/install' },
    { text: 'Accounts & licenses', link: '/getting-started/accounts' },
    { text: 'Log in', link: '/getting-started/log-in' }
  ]
},
{
  text: 'Session Guide',
  collapsed: true,
  items: [
    { text: 'Plan the session', link: '/session-guide/plan' },
    { text: 'Build the workspace', link: '/session-guide/build' },
    { text: 'Scenes', link: '/session-guide/scenes' },
    { text: 'Keep it comfortable', link: '/session-guide/comfort' },
    { text: 'Permissions', link: '/session-guide/permissions' },
    { text: 'Share the workspace', link: '/session-guide/share' },
    { text: 'Run the session', link: '/session-guide/run-the-session' },
    { text: 'Troubleshooting', link: '/session-guide/troubleshooting' }
  ]
},
```

## Overlap with the website

`/setup` and `/session-guide` stay on nanome.ai as marketing pages. Once these
chapters exist here, decide which copy is canonical — two full copies of the
same guide will drift within a release or two.
