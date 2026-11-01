/**
 * What the option panels on the help pages show: each option as the app
 * names it, the prebaked render for it, and the line under the render.
 *
 * Every render comes from Nanome 2.7.1. Within a set, one camera and one crop
 * box serve every state, both looks and both apps, and every frame is the
 * same size, so stepping through a set changes only the option. Light frames
 * use the Black & White theme by day, dark ones Pure Black by night. Each
 * molecular set has an `xr` copy with Nanome XR's floor and a `web` copy
 * without it, as Nanome Web draws no floor.
 *
 * - rep, surface, int (1600 x 1200): 1KV2's binding site. Every state shares
 *   one base scene: Ligand A:B96_391 in the state's style (Stick when the
 *   state isn't a ligand style), Pocket A:B96_391 as Wire, and Protein
 *   hidden. Cartoon adds the Protein (colored by secondary structure),
 *   Residue Label labels the pocket, the surface states add the pocket's
 *   surface, and the int states show Pocket + Ligand A:B96_391 with no atom
 *   style, so only its interaction lines draw. Colors are the app defaults
 *   (Chain Instance with Carbons only).
 * - col (1600 x 1200): the same view with only Pocket + Ligand A:B96_391
 *   shown, as Stick, colored by each scheme.
 * - dist (1600 x 1200, XR only): E. coli dihydrofolate reductase, 1RX2 with
 *   folate and NADP+, and 1RX3 with methotrexate, which overlays it as
 *   deposited. Folate (Ligand A:FOL_161) is a green Wire; the distance
 *   component made from it is Ball & Stick, with 1RX2's carbons lavender and
 *   1RX3's orange.
 * - play (1600 x 1200): 1D3Z, ubiquitin's 10 NMR models, as the default
 *   Cartoon.
 * - sky (1600 x 900): the themes.
 *
 * Labels differ a little between the apps (Ball & Stick in Nanome XR, Ball
 * and Stick in Nanome Web), so each one carries both.
 */
const O = 'nanome-v2/v2-7/options/'

export const ATOMISTIC = [
  { key: 'bs', icon: 'line', xr: 'Ball & Stick', web: 'Ball and Stick', file: 'ball-and-stick', desc: 'Atoms as spheres at a quarter of their van der Waals radius, joined by cylinders. Here on the ligand, with the pocket around it as Wire.' },
  { key: 'stick', icon: 'slash', xr: 'Stick', web: 'Stick', file: 'stick', desc: 'Bonds as cylinders, with no atom spheres. Here on the ligand, with the pocket around it as Wire.' },
  { key: 'wire', icon: 'hexagon', xr: 'Wire', web: 'Wire', file: 'wire', desc: 'Bonds as thin lines. The lightest style for a large structure. Here the ligand and the pocket around it are both Wire.' },
  { key: 'vdw', icon: 'color-filter', xr: 'Van der Waals', web: 'Van der Waals', file: 'vdw', desc: "Space-filling spheres at each atom's full van der Waals radius. Main-group radii come from Mantina et al. (2009), for example 1.70 Å for carbon." },
]

export const HYDROGENS = [
  { key: 'none', xr: 'None', web: 'No H', icon: 'circle-dashed' },
  { key: 'polar', xr: 'Polar', web: 'Polar H', icon: 'timeline' },
  { key: 'all', xr: 'All', web: 'All H', icon: 'circle-filled' },
]

export const HYDROGEN_DESC = {
  none: 'Hides every hydrogen.',
  polar: 'Shows every hydrogen except those bonded to carbon.',
  all: 'Shows every hydrogen.',
}

export const MACRO = [
  { key: 'cartoon', icon: 'scribble', xr: 'Cartoon', web: 'Cartoon', file: 'cartoon', desc: 'Ribbons for helices, strands and loops, here colored by secondary structure, with the ligand as Stick and the pocket as Wire.' },
  { key: 'label', icon: 'tag', xr: 'Residue Label', web: 'Residue Label', file: 'residue-label', desc: 'A text label on each residue, here on the pocket around the ligand, which is drawn as Stick.' },
]

/** A render of the representation set: a ligand style, Cartoon or Residue Label. */
export function repFrame(app, file) {
  return `${O}rep-${app}-${file}.webp`
}

export const SURFACES = [
  { key: 'wire', icon: 'grid-4x4', name: 'Wire', desc: 'The molecular surface as a mesh.' },
  { key: 'sheer', icon: 'circle-dashed', name: 'Sheer', desc: 'The surface at 15% opacity.' },
  { key: 'semi', icon: 'circle-half-2', name: 'Semi', desc: 'The surface at 50% opacity.' },
  { key: 'opaque', icon: 'circle-filled', name: 'Opaque', desc: 'A solid surface.', after: 'From this side it hides most of the ligand.' },
]

export const SURFACE_DESC = "The solvent-excluded molecular surface, computed with a 1.4 Å probe. Here it's the pocket's surface, around the ligand as Stick."

export function surfaceFrame(app, key) {
  return `${O}surface-${app}-${key}.webp`
}

/**
 * In the app's order. `here` is the number of each type 1KV2's binding site
 * has, as Pocket + Ligand A:B96_391 draws them (it shows every interaction
 * inside it, so some join pocket residues to each other).
 */
export const INTERACTIONS = [
  { key: 'hb', name: 'Hydrogen Bonds', color: '#ffff00', on: true, here: 7, shown: (n) => `${n} hydrogen bonds in yellow`, desc: 'Between a hydrogen-bond donor and an acceptor.' },
  { key: 'vdw', name: 'VDW Clashes', color: '#cc003d', on: false, desc: 'Atoms in different entries that sit closer than the sum of their van der Waals radii. Off to start.' },
  { key: 'pi', name: 'π Stacking', color: '#6443ff', on: true, here: 1, shown: () => '1 π-stacking pair in violet', desc: 'Between aromatic rings.' },
  { key: 'salt', name: 'Salt Bridges', color: '#ff6600', on: true, here: 2, shown: (n) => `${n} salt bridges in orange`, desc: 'Between oppositely charged groups.' },
  { key: 'cation', name: 'Cation-π', color: '#0080ff', on: true, desc: 'Between a cation and an aromatic ring.' },
  { key: 'halogen', name: 'Halogen Bonds', color: '#3ae2aa', on: true, desc: 'From a Cl, Br or I to an acceptor.' },
  { key: 'hydrophobic', name: 'Hydrophobic', color: '#808080', on: true, here: 27, shown: (n) => `${n} hydrophobic contacts in gray`, desc: 'Contacts between carbons bonded only to carbon or hydrogen.' },
  { key: 'metal', name: 'Metal Coordination', color: '#a020f0', on: true, desc: 'Donor atoms within 3.0 Å of a metal.' },
  { key: 'halogenpi', name: 'Halogen-π', color: '#00ced1', on: true, desc: 'A halogen above an aromatic ring.' },
]

/** The render for the types that are on, from those 1KV2's binding site has. */
export function interactionFrame(app, on) {
  const parts = ['hb', 'salt', 'hydrophobic'].filter((k) => on[k])
  const name = parts.length === 3 ? 'all' : parts.length ? parts.join('-') : 'none'
  return `${O}int-${app}-${name}${on.pi ? '' : '-nopi'}.webp`
}

/**
 * The schemes for an atom style, in the app's order. Electrostatic is left
 * out: both apps list it only for a surface (Nanome XR also needs a DX map).
 * `carbons` marks the schemes Carbons only changes; with Potential
 * Interactions it changes nothing, and Element Type hides it. Each line says
 * what the scheme shows on this binding site.
 */
export const SCHEMES = [
  { key: 'element-type', name: 'Element Type', noCarbons: true, desc: 'By element: carbon gray, nitrogen blue, oxygen red and sulfur yellow.' },
  { key: 'residue-type', name: 'Residue Type', carbons: true, desc: 'By amino acid or nucleotide, so each residue type in the pocket has its own color. The ligand, B96, is magenta.' },
  { key: 'chain-name', name: 'Chain Name', carbons: true, desc: 'One color per chain name, the same in every entry. 1KV2 has a single chain, so one orange covers the site.' },
  { key: 'secondary-structure', name: 'Secondary Structure', carbons: true, desc: 'By secondary structure: helix pink, strand yellow and loop white.' },
  { key: 'potential-interactions', name: 'Potential Interactions', desc: 'By what each atom can do in an interaction. Hydrogen-bond donors show red and acceptors blue, and an atom that can be both shows red. Other atoms of Ala, Cys, Ile, Leu, Met, Phe and Val are green, other aromatic atoms white, and the rest gray. Most of the ligand here is white or gray.' },
  { key: 'bfactor', name: 'BFactor', carbons: true, desc: 'By the B-factor (atomic displacement parameter) recorded in the file. Low values are blue, middle ones white and high ones red. Most atoms here are blue; the most mobile, such as the Arg67 side chain, are paler and pinker.' },
  { key: 'occupancy', name: 'Occupancy', carbons: true, desc: 'By the occupancy recorded in the file. Every atom here has occupancy 1.00, so the scheme gives them all the same red.' },
  { key: 'uniform', name: 'Uniform', carbons: true },
  { key: 'chain-instance', name: 'Chain Instance', carbons: true, desc: 'One color per chain in each entry, so chain A in 2 entries gets 2 colors. 1KV2 has 1 chain, so the site takes a single lavender.' },
  { key: 'model-instance', name: 'Model Instance', xrOnly: true, carbons: true, desc: 'One color per model in each entry. 1KV2 has 1 model, so the site takes a single orange, much like Chain Name.' },
]

export const UNIFORM_DESC = {
  xr: 'One color for every atom, white to start. Nanome XR offers 19 preset colors and a custom one with a hex field; Nanome Web has a color square and hue bar. This copy has 3.',
  web: 'One color for every atom, white to start. Nanome Web has a color square and hue bar; Nanome XR offers 19 preset colors and a custom one with a hex field. This copy has 3.',
}

/** Three of Nanome XR's preset colors; white is where Uniform starts. */
export const UNIFORM_SWATCHES = [
  { hex: 'ffffff', name: 'White' },
  { hex: '45d860', name: 'Green' },
  { hex: '7c4cff', name: 'Violet' },
]

export function schemeFrame(app, key, carbons, hex = 'ffffff') {
  const s = SCHEMES.find((x) => x.key === key)
  const name = key === 'uniform' ? `uniform-${hex}` : key
  return `${O}col-${app}-${name}${carbons && s?.carbons ? '-carbons' : ''}.webp`
}

export const CARBONS_DESC = 'Carbons only applies the scheme to carbon atoms and keeps element colors on the other atoms.'

/** The distance popup's stops, in Å. */
export const DIST_STEPS = [2, 4, 6, 8, 10]

/**
 * What each distance reaches around folate, counted in Nanome 2.7.1 on the
 * deposited coordinates: residues and waters of 1RX2, its atoms in range
 * with Whole residues off, NADP+ atoms in range, and residues and waters of
 * 1RX3.
 */
export const DIST_REACH = {
  2: { res: 0, wat: 0, atoms: 0, nap: 0, res3: 1, wat3: 0 },
  4: { res: 15, wat: 4, atoms: 41, nap: 5, res3: 15, wat3: 4 },
  6: { res: 27, wat: 6, atoms: 134, nap: 10, res3: 28, wat3: 5 },
  8: { res: 47, wat: 8, atoms: 253, nap: 14, res3: 48, wat3: 7 },
  10: { res: 68, wat: 17, atoms: 425, nap: 20, res3: 70, wat3: 14 },
}

/** Each suffix marks a switch moved from where it starts. */
export function distFrame(d, s) {
  return `${O}dist-${d}-${s.whole ? 'whole' : 'atoms'}${s.ignoreSelf ? '' : '-self'}${s.includeLigands ? '-ligands' : ''}${s.allEntries ? '-all' : ''}.webp`
}

/** The playback speeds, in models or frames a second. */
export const PLAY_SPEEDS = [1, 2, 5, 10, 20]
export const PLAY_MODELS = 10

export function playFrame(app, n) {
  return `${O}play-${app}-model-${String(n).padStart(2, '0')}.webp`
}

export const THEMES = [
  { key: 'default', name: 'Default' },
  { key: 'arctic-cyan', name: 'Arctic Cyan' },
  { key: 'aurora-green', name: 'Aurora Green' },
  { key: 'black-white', name: 'Black & White' },
  { key: 'gold-orange', name: 'Gold Orange' },
  { key: 'island', name: 'Island' },
  { key: 'pure-black', name: 'Pure Black' },
]

export function themeFrame(app, key, night) {
  return `${O}sky-${app}-${key}-${night ? 'night' : 'day'}.webp`
}
