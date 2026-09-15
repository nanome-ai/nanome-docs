# Nanome Docs

Documentation site for [Nanome](https://nanome.ai/) software, hosted at [docs.nanome.ai](https://docs.nanome.ai). Built with [VitePress](https://vitepress.dev/).

## Prerequisites

- Node.js >= 20

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run docs:build
npm run docs:preview  # preview the built site locally
```

## Images

Place original images in `docs/public/assets/original/`, then run:

```bash
npm run docs:compress
```

This generates optimized versions in `docs/public/assets/compressed/`. Do not manually add files to the `compressed` folder — it is entirely managed by the compress script.

## Project Structure

```
docs/
├── .vitepress/
│   ├── config.mjs            # Site config and the sidebar
│   └── theme/
│       ├── Layout.vue        # Page shell: nav bar and the two rails
│       ├── layout/           # Nav bar, section rail, in-page rail, footer
│       ├── components/
│       │   └── interactive/  # Chooser, Accordion, Tabs, Card, Steps…
│       └── styles/           # Tokens, base, prose, component glue
├── contributing/     # How to use the interactive components
├── nanome1x/         # Nanome 1.24 (1st Gen) docs
├── nanome_v2/        # Nanome v2 (2nd Gen) docs
├── mara/             # MARA docs
├── home.nanome.ai/   # Account management docs
├── help/             # Troubleshooting, hardware, FAQ
└── index.md          # Landing page
```

## Theme

The site uses a custom VitePress theme: a fixed nav bar, a section rail on the
left, and an in-page heading rail on the right. It extends the default theme
rather than replacing it, so the local search dialog, code-group tabs and
`<Badge>` still work.

Pages are markdown, and markdown pages can use the interactive components —
a guided picker whose answers live in the query string, collapsible rows with
"Expand all", tabs, cards, numbered steps, and copyable blocks. They are
documented, with working examples, at
[/contributing/components](docs/contributing/components.md).

Two rules are worth knowing before writing a page:

- **Headings belong in markdown.** The right-hand rail is built from the
  headings on the page, so a heading rendered inside a component is one a
  reader cannot navigate to.
- **Colours come from `--n-*` custom properties**, defined in
  `docs/.vitepress/theme/styles/tokens.css`. Hard-coded hex values break dark
  mode.

The Getting Started and Session Guide chapters under Nanome were ported from
the nanome.ai site. See [MIGRATION.md](MIGRATION.md) for what came from where,
where the two copies deliberately differ, and how to re-sync them.
