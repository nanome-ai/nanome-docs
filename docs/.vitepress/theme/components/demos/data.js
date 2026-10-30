/**
 * What the option panels on the help pages show: each option as the app
 * names it, the prebaked render for it, and the line under the render.
 * The renders are all of 1KV2, made in Nanome 2.7.1 from one camera per set,
 * so stepping through a set changes only the option.
 *
 * Labels differ a little between the apps (Ball & Stick in Nanome XR, Ball
 * and Stick in Nanome Web), so each one carries both.
 */
const O = 'nanome-v2/v2-7/options/'

export const ATOMISTIC = [
  { key: 'bs', icon: 'line', xr: 'Ball & Stick', web: 'Ball and Stick', src: `${O}rep-ball-and-stick.webp`, desc: 'Atoms as spheres at a quarter of their van der Waals radius, joined by cylinders.' },
  { key: 'stick', icon: 'slash', xr: 'Stick', web: 'Stick', src: `${O}rep-stick.webp`, desc: 'Bonds as cylinders, with no atom spheres.' },
  { key: 'wire', icon: 'hexagon', xr: 'Wire', web: 'Wire', src: `${O}rep-wire.webp`, desc: 'Bonds as thin lines. The lightest style for a large structure.' },
  { key: 'vdw', icon: 'color-filter', xr: 'Van der Waals', web: 'Van der Waals', src: `${O}rep-vdw.webp`, desc: "Space-filling spheres at each atom's full van der Waals radius. Main-group radii come from Mantina et al. (2009), for example 1.70 Å for carbon." },
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
  { key: 'cartoon', icon: 'scribble', xr: 'Cartoon', web: 'Cartoon', src: `${O}rep-cartoon.webp`, desc: 'Ribbons for helices, strands and loops, here colored by secondary structure.' },
  { key: 'label', icon: 'tag', xr: 'Residue Label', web: 'Residue Label', src: `${O}rep-residue-label.webp`, desc: 'A text label on each residue, here on the binding-site residues.' },
]

export const SURFACES = [
  { key: 'wire', icon: 'grid-4x4', name: 'Wire', src: `${O}surface-wire.webp`, desc: 'The molecular surface as a mesh.' },
  { key: 'sheer', icon: 'circle-dashed', name: 'Sheer', src: `${O}surface-sheer.webp`, desc: 'The surface at 15% opacity.' },
  { key: 'semi', icon: 'circle-half-2', name: 'Semi', src: `${O}surface-semi.webp`, desc: 'The surface at 50% opacity.' },
  { key: 'opaque', icon: 'circle-filled', name: 'Opaque', src: `${O}surface-opaque.webp`, desc: 'A solid surface.' },
]

export const SURFACE_DESC = 'The solvent-excluded molecular surface, computed with a 1.4 Å probe.'

/** In the app's order. `here` marks the types 1KV2's binding site has. */
export const INTERACTIONS = [
  { key: 'hb', name: 'Hydrogen Bonds', color: '#ffff00', on: true, here: true, desc: 'Between a hydrogen-bond donor and an acceptor.' },
  { key: 'vdw', name: 'VDW Clashes', color: '#cc003d', on: false, desc: 'Atoms in different entries that sit closer than the sum of their van der Waals radii. Off to start.' },
  { key: 'pi', name: 'π Stacking', color: '#6443ff', on: true, desc: 'Between aromatic rings.' },
  { key: 'salt', name: 'Salt Bridges', color: '#ff6600', on: true, here: true, desc: 'Between oppositely charged groups.' },
  { key: 'cation', name: 'Cation-π', color: '#0080ff', on: true, desc: 'Between a cation and an aromatic ring.' },
  { key: 'halogen', name: 'Halogen Bonds', color: '#3ae2aa', on: true, desc: 'From a Cl, Br or I to an acceptor.' },
  { key: 'hydrophobic', name: 'Hydrophobic', color: '#808080', on: true, here: true, desc: 'Contacts between carbons bonded only to carbon or hydrogen.' },
  { key: 'metal', name: 'Metal Coordination', color: '#a020f0', on: true, desc: 'Donor atoms within 3.0 Å of a metal.' },
  { key: 'halogenpi', name: 'Halogen-π', color: '#00ced1', on: true, desc: 'A halogen above an aromatic ring.' },
]

/** The render for the types that are on, from those 1KV2's binding site has. */
export function interactionFrame(on) {
  const parts = ['hb', 'salt', 'hydrophobic'].filter((k) => on[k])
  const name = parts.length === 3 ? 'all' : parts.length ? parts.join('-') : 'none'
  return `${O}int-${name}.webp`
}

export const SCHEMES = [
  { key: 'element-type', name: 'Element Type', desc: 'By element: carbon, nitrogen, oxygen and so on.' },
  { key: 'residue-type', name: 'Residue Type', carbons: true, desc: 'By amino acid or nucleotide.' },
  { key: 'chain-name', name: 'Chain Name', desc: 'One color per chain name, the same in every entry. 1KV2 has a single chain.' },
  { key: 'secondary-structure', name: 'Secondary Structure', carbons: true, desc: 'Helix, strand and loop.' },
  { key: 'potential-interactions', name: 'Potential Interactions', carbons: true, desc: 'By what each atom can do in an interaction. Hydrogen-bond donors and acceptors are red and blue, and an atom that can be both shows red. Other atoms of Ala, Cys, Ile, Leu, Met, Phe and Val are green, other aromatic atoms white, and the rest gray.' },
  { key: 'bfactor', name: 'BFactor', carbons: true, desc: 'By the B-factor (atomic displacement parameter) recorded in the file.' },
  { key: 'occupancy', name: 'Occupancy', desc: 'By the occupancy recorded in the file. Every atom here has the same occupancy, so the color is even.' },
  { key: 'uniform', name: 'Uniform', desc: 'A single color. In the app it opens a color picker with a hex field and swatches.' },
  { key: 'chain-instance', name: 'Chain Instance', desc: 'One color per chain in each entry, so chain A in two entries gets two colors.' },
  { key: 'model-instance', name: 'Model Instance', xrOnly: true, desc: 'One color per model in each entry.' },
  { key: 'electrostatic', name: 'Electrostatic', xrOnly: true, disabled: true, desc: "Listed when the entry has a DX map loaded. It colors a surface by the map's value." },
]

export function schemeFrame(key, carbons) {
  const s = SCHEMES.find((x) => x.key === key)
  return `${O}col-${key}${carbons && s?.carbons ? '-carbons' : ''}.webp`
}

export const CARBONS_DESC = 'Carbons only applies the scheme to carbon atoms and keeps element colors on the other atoms.'

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
