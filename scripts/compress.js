// Builds the web copies of every image in docs/public/assets/original.
//
// Pages show the copy in docs/public/assets/compressed (via <Vimg>), and
// clicking it opens the original. The copy is a WebP no wider than
// MAX_WIDTH, which is twice the 768px content column, so screenshots stay
// sharp on high-density screens.
//
// A copy is rebuilt whenever its original is newer, so replacing a
// screenshot and running `npm run docs:compress` is enough. Pass --force to
// rebuild everything.
//
// A screenshot can have a dark-mode twin saved beside it as
// `<name>.dark.<ext>`. The script lists those pairs in
// docs/.vitepress/theme/image-variants.json, and <Vimg> shows the twin while
// the site is in dark mode. Markdown only ever names the light image.
//
// It also records the width of each 2x screenshot (the folders in HIDPI) in
// image-widths.json, so <Vimg> shows them at their on-screen size instead of
// stretching a narrow panel across the content column.

const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const assetDir = path.join(__dirname, '../docs/public/assets/original')
const compressedDir = path.join(__dirname, '../docs/public/assets/compressed')
const manifestFile = path.join(__dirname, '../docs/.vitepress/theme/image-variants.json')
const widthsFile = path.join(__dirname, '../docs/.vitepress/theme/image-widths.json')
const sizesFile = path.join(__dirname, '../docs/.vitepress/theme/image-sizes.json')

const HIDPI = /^(nanome-web|nanome-v2\/v2-7)\//
const MAX_WIDTH = 1600
const QUALITY = 80
const force = process.argv.includes('--force')

;(async function () {
  console.log('Compressing images')
  let built = 0
  for (const file of walk(assetDir)) {
    const rel = path.relative(assetDir, file)
    if (!/\.(png|jpe?g|gif|webp)$/i.test(rel)) continue

    const out = path.join(compressedDir, rel.replace(/\.\w+$/, '.webp'))
    if (!force && fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(file).mtimeMs) {
      continue
    }

    fs.mkdirSync(path.dirname(out), { recursive: true })
    // GIFs get a still of their first frame; the original plays on click.
    await sharp(file, { pages: 1 })
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(out)
    built++
    console.log(`- ${rel}`)
  }
  console.log(`Done compressing (${built} rebuilt)`)

  // Light image -> its dark twin, for <Vimg>.
  const files = walk(assetDir).map((f) => path.relative(assetDir, f).split(path.sep).join('/'))
  const darkByBase = new Map(
    files
      .filter((f) => /\.dark\.\w+$/.test(f))
      .map((f) => [f.replace(/\.dark\.\w+$/, ''), f])
  )
  const variants = {}
  for (const f of files) {
    if (/\.dark\.\w+$/.test(f)) continue
    const dark = darkByBase.get(f.replace(/\.\w+$/, ''))
    if (dark) variants[f] = dark
  }
  fs.writeFileSync(manifestFile, JSON.stringify(variants, null, 2) + '\n')
  console.log(`${Object.keys(variants).length} images have a dark version`)

  // Light 2x screenshot -> its width in pixels. Reading the header is enough.
  const widths = {}
  for (const f of files) {
    if (!HIDPI.test(f) || /\.dark\.\w+$/.test(f)) continue
    const { width } = await sharp(path.join(assetDir, f)).metadata()
    widths[f] = width
  }
  fs.writeFileSync(widthsFile, JSON.stringify(widths, null, 2) + '\n')

  // Every copy's size, light and dark, in image-sizes.json. <Vimg> gives the
  // <img> its width and height, so the page keeps room for an image before it
  // loads; otherwise a link to a heading lands short as the images above it
  // arrive and push the heading down.
  const sizes = {}
  for (const f of files) {
    if (!/\.(png|jpe?g|gif|webp)$/i.test(f)) continue
    const copy = path.join(compressedDir, f.replace(/\.\w+$/, '.webp'))
    const { width, height } = await sharp(copy).metadata()
    sizes[f] = [width, height]
  }
  // One image per line, sorted, so branches that add images merge cleanly.
  const lines = Object.keys(sizes)
    .sort()
    .map((f) => `  ${JSON.stringify(f)}: [${sizes[f].join(', ')}]`)
  fs.writeFileSync(sizesFile, `{\n${lines.join(',\n')}\n}\n`)
})()

function walk(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) =>
      entry.isDirectory()
        ? walk(path.join(dir, entry.name))
        : [path.join(dir, entry.name)]
    )
}
