// Renders annotated screenshots: a clean capture plus labels, leader lines and
// highlight boxes, in Nanome's brand colours (2018 brand guide) and GT Haptik.
//
//   node scripts/annotate.mjs            # every figure in scripts/annotations
//   node scripts/annotate.mjs builder    # just scripts/annotations/builder.json
//
// Each figure is a JSON file:
//
//   {
//     "source": "builder-edit.webp",                     // under scripts/annotations/src
//     "output": "nanome-v2/v2-7/builder-edit.webp",      // under docs/public/assets/original
//     "crop": [x, y, w, h],                               // optional, source pixels
//     "pad": [top, right, bottom, left],                  // optional transparent margin, source pixels
//     "display": 560,                                     // width the page shows it at, CSS px
//     "callouts": [
//       { "text": "Auto relax", "at": [x, y], "label": [x, y], "align": "left", "tone": "red" },
//       { "text": "Sheer", "label": [x, y], "align": "center" }   // no "at": a caption, no line
//     ],
//     "boxes": [
//       { "rect": [x, y, w, h], "tone": "red" }
//     ]
//   }
//
// "tone" is blue (the default), red, green, teal or purple.
//
// "at" is the point the line ends on and "label" is where the label sits, both
// in pixels of the (cropped) source; a label may sit out in the padding, where
// the page background shows through. "align" is left, right or center and says
// which side of the label the line leaves from. The output keeps the source's
// full resolution; labels are sized for the "display" width, so they read at
// the docs' body size however large the capture is.
//
// If the source has a dark twin (builder-edit.dark.webp), the dark output
// (builder-edit.dark.webp) is rendered too, with the same callouts.
//
// Needs Google Chrome. Set CHROME to its binary if it isn't in the usual place.
// Run `npm run docs:compress` afterwards to rebuild the page copies.

import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const here = path.dirname(fileURLToPath(import.meta.url))
const specDir = path.join(here, 'annotations')
const srcDir = path.join(specDir, 'src')
const assetDir = path.join(here, '../docs/public/assets/original')
const chrome =
  process.env.CHROME ||
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'

// Brand guide accent palette: fill colour and the text colour that reads on it.
const TONES = {
  blue: ['#29a0ff', '#0f0f32'],   // Royal Blue
  red: ['#f04141', '#ffffff'],    // Red
  green: ['#00e191', '#0f0f32'],  // Green
  teal: ['#0ad2f0', '#0f0f32'],   // Teal
  purple: ['#5e59ff', '#ffffff'], // Purple
}
const NAVY = '#0f0f32' // Dark Blue
const sharp = createRequire(import.meta.url)('sharp')

const wanted = process.argv.slice(2)
const specs = fs
  .readdirSync(specDir)
  .filter((f) => f.endsWith('.json'))
  .filter((f) => !wanted.length || wanted.includes(f.replace(/\.json$/, '')))

for (const file of specs) {
  // render() is async (the WebP conversion), so figures are drawn one at a time.
  const spec = JSON.parse(fs.readFileSync(path.join(specDir, file), 'utf8'))
  await render(spec, spec.source, spec.output, false)
  console.log(`- ${spec.output}`)
  const darkSource = spec.source.replace(/(\.\w+)$/, '.dark$1')
  if (fs.existsSync(path.join(srcDir, darkSource))) {
    const darkOutput = spec.output.replace(/(\.\w+)$/, '.dark$1')
    await render(spec, darkSource, darkOutput, true)
    console.log(`- ${darkOutput}`)
  }
}

// Width and height from a PNG or a (lossy or lossless) WebP header.
function imageSize(file) {
  const b = fs.readFileSync(file)
  if (b.toString('ascii', 1, 4) === 'PNG') return [b.readUInt32BE(16), b.readUInt32BE(20)]
  const chunk = b.toString('ascii', 12, 16)
  if (chunk === 'VP8 ') return [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff]
  if (chunk === 'VP8L') {
    const bits = b.readUInt32LE(21)
    return [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1]
  }
  if (chunk === 'VP8X') return [1 + b.readUIntLE(24, 3), 1 + b.readUIntLE(27, 3)]
  throw new Error(`Unsupported image: ${file}`)
}

async function render(spec, sourceRel, outputRel, dark) {
  // The halo keeps lines and labels apart from whatever is behind them.
  const halo = dark ? NAVY : '#ffffff'
  const source = path.join(srcDir, sourceRel)
  const [srcW, srcH] = imageSize(source)
  const [cx, cy, cw, ch] = spec.crop || [0, 0, srcW, srcH]
  const [pt, pr, pb, pl] = spec.pad || [0, 0, 0, 0]
  const display = spec.display || 768
  const scale = (cw + pl + pr) / display // source pixels per CSS pixel
  const cssW = display
  const cssH = Math.round((ch + pt + pb) / scale)
  const toCss = ([x, y]) => [(x + pl) / scale, (y + pt) / scale]

  const lines = []
  const labels = []
  for (const b of spec.boxes || []) {
    const [bx, by] = toCss([b.rect[0], b.rect[1]])
    const [fill] = TONES[b.tone || 'red']
    lines.push(
      `<rect x="${bx}" y="${by}" width="${b.rect[2] / scale}" height="${b.rect[3] / scale}" rx="8" ` +
        `fill="none" stroke="${fill}" stroke-width="2.5" style="filter:drop-shadow(0 0 1.5px ${halo})" />`
    )
  }
  for (const c of spec.callouts || []) {
    const [lx, ly] = toCss(c.label)
    const align = c.align || 'left'
    const [fill, ink] = TONES[c.tone || 'blue']
    // Without "at" the label stands alone, as a caption for a panel.
    if (c.at) {
      const [ax, ay] = toCss(c.at)
      lines.push(
        `<line x1="${lx}" y1="${ly}" x2="${ax}" y2="${ay}" stroke="${fill}" />` +
          `<circle cx="${ax}" cy="${ay}" r="4.5" fill="${fill}" />`
      )
    }
    const shift =
      align === 'right' ? 'translate(-100%, -50%)'
      : align === 'center' ? 'translate(-50%, -50%)'
      : 'translate(0, -50%)'
    labels.push(
      `<div class="label" style="left:${lx}px;top:${ly}px;transform:${shift};background:${fill};color:${ink}">${escape(c.text)}</div>`
    )
  }

  const mime = source.endsWith('.webp') ? 'image/webp' : 'image/png'
  const img = fs.readFileSync(source).toString('base64')
  const html = `<!doctype html><html><head><meta charset="utf-8">
<style>
  html, body { margin: 0; padding: 0; background: transparent; }
  .fig { position: relative; width: ${cssW}px; height: ${cssH}px; overflow: hidden; }
  .frame { position: absolute; left: ${pl / scale}px; top: ${pt / scale}px;
           width: ${cw / scale}px; height: ${ch / scale}px; overflow: hidden;
           border-radius: ${spec.radius || 0}px; }
  .shot { position: absolute; left: ${-cx / scale}px; top: ${-cy / scale}px;
          width: ${srcW / scale}px; height: ${srcH / scale}px; }
  svg { position: absolute; inset: 0; overflow: visible; }
  line { stroke-width: 2; stroke-linecap: round; filter: drop-shadow(0 0 1.5px ${halo}); }
  circle { stroke: ${halo}; stroke-width: 2; }
  .label { position: absolute; white-space: nowrap; padding: 3px 9px 4px;
           border-radius: 999px;
           font: 700 12px/1.3 'GT Haptik', 'Helvetica Neue', Arial, sans-serif;
           letter-spacing: 0.01em;
           box-shadow: 0 2px 10px rgba(15,15,50,.28), 0 0 0 1.5px ${halo}; }
</style></head><body><div class="fig">
<div class="frame"><img class="shot" src="data:${mime};base64,${img}"></div>
<svg width="${cssW}" height="${cssH}">${lines.join('')}</svg>
${labels.join('\n')}
</div></body></html>`

  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'annotate-'))
  const htmlFile = path.join(tmp, 'figure.html')
  fs.writeFileSync(htmlFile, html)
  const out = path.join(assetDir, outputRel)
  const shot = path.join(tmp, 'figure.png')
  fs.mkdirSync(path.dirname(out), { recursive: true })
  execFileSync(chrome, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    `--force-device-scale-factor=${scale}`,
    `--window-size=${cssW},${cssH}`,
    '--virtual-time-budget=8000',
    '--default-background-color=00000000',
    `--screenshot=${shot}`,
    `file://${htmlFile}`,
  ], { stdio: 'ignore' })
  await sharp(shot).webp({ quality: 92 }).toFile(out)
  fs.rmSync(tmp, { recursive: true, force: true })
}

function escape(s) {
  return s.replace(/[&<>"]/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[ch])
}
