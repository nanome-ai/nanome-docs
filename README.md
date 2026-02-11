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

Place original images in `docs/assets/original/`, then run:

```bash
npm run docs:compress
```

This generates optimized versions in `docs/assets/compressed/`. Do not manually add files to the `compressed` folder — it is entirely managed by the compress script.

## Project Structure

```
docs/
├── .vitepress/       # VitePress config and theme
├── nanome1x/         # Nanome 1.24 (1st Gen) docs
├── nanome_v2/        # Nanome v2 (2nd Gen) docs
├── mara/             # MARA docs
├── home.nanome.ai/   # Account management docs
├── help/             # Troubleshooting, hardware, FAQ
└── index.md          # Landing page
```
