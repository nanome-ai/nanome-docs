/**
 * What the Ligands table demo shows: 8 inhibitors of human p38 alpha MAP
 * kinase (MAPK14, UniProt Q16539) and the property columns Nanome lists for
 * them.
 *
 * Each ligand comes from an X-ray structure with 1 model in which it's the
 * only non-polymer component, so each entry gives one row, as 1KV2 does in
 * Nanome XR (1/1 in ligands-tab.webp). Its SMILES is SMILES_stereo from its
 * record in the RCSB Chemical Component Dictionary
 * (https://data.rcsb.org/rest/v1/core/chemcomp/<code>). Its name follows
 * Nanome's chain:code_residue pattern, with the author chain and residue
 * number from the RCSB (Nanome XR shows A:B96_391 for 1KV2).
 *
 * Every value is computed with RDKit 2026.09.1 from that SMILES, one function
 * per column (noted on each column below). Two columns have values Nanome
 * shows on screen, and RDKit gives the same numbers:
 *   NumAtoms   72 for G0T in 4CEO, 76 for B96 in 1KV2
 *   MolWeight  548.216 for G0T, 527.290 for B96, 440.214 for 50D
 * The other columns follow the definitions on /nanome_web/ligands#property-columns.
 * Each value below is the same whether hydrogens are implicit or explicit
 * atoms, so how the server holds its hydrogens doesn't change it. RDKit's
 * InChIKeys match the ones in the CCD records.
 *
 * The drawings are RDKit SVGs in the CoordGen layout, which is the layout
 * Nanome's own drawing of G0T has. Each has a .dark copy with light bonds on a
 * transparent background.
 */

/** Under docs/public/assets/original. compress.js skips SVGs, so pages link the originals. */
export const DEPICTIONS = 'ligands-demo/'

/**
 * The first 8 hex digits of each drawing's SHA-1, as compress.js records for
 * screenshots, so a changed drawing never comes from a stale cache. After
 * redrawing, update them with `shasum -a 1 *.svg` in that folder.
 */
const VERSIONS = {
  B96: '7845a489', 'B96.dark': 'bf53e5a5',
  BMU: '08305922', 'BMU.dark': '71229136',
  SB2: '01d6b8bd', 'SB2.dark': '46564361',
  SB4: '29e33cde', 'SB4.dark': 'b78c7512',
  SB6: '9c638c70', 'SB6.dark': 'd1a057f1',
  MSQ: '1c07b291', 'MSQ.dark': '0a3d5349',
  PQB: '0fc30853', 'PQB.dark': '989e9e96',
  BAX: '876f329e', 'BAX.dark': 'cf04a35c',
}

export function depiction(ccd, dark) {
  const name = `${ccd}${dark ? '.dark' : ''}`
  const v = VERSIONS[name]
  return `/assets/original/${DEPICTIONS}${name}.svg${v ? `?v=${v}` : ''}`
}

/**
 * The columns every row has, in Nanome Web's order. Image stays frozen at the
 * left while the rest scroll. Tag and the row menu come after the property
 * columns.
 */
export const FIXED = [
  { key: 'image', label: 'Image', desc: "The ligand's 2D drawing." },
  { key: 'entry', label: 'Entry', sortable: true, desc: 'The structure the ligand belongs to.' },
  { key: 'name', label: 'Name', sortable: true, desc: 'Chain, ligand code and residue number.' },
  { key: 'tag', label: 'Tag', sortable: true, desc: "The ligand's tag. A dash means it has none." },
]

/**
 * The property columns, in the picker's order, which is alphabetical in both
 * apps (LigandsMenuViewModel.Update sorts the names; the Nanome Web and XR
 * pickers in ligand-columns.webp and ligand-property-columns.webp list them
 * that way). Nanome Web heads NumAtoms and MolWeight as Atoms and MW. How it
 * heads the others wasn't seen, so they keep the picker's names, as Nanome XR
 * heads every column.
 *
 * `rdkit` is the call that reproduces the column, on the molecule built from
 * the CCD SMILES (`mol`) or that molecule after Chem.AddHs (`molH`).
 */
export const COLUMNS = [
  {
    key: 'HbondA',
    label: 'HbondA',
    rdkit: 'rdMolDescriptors.CalcNumHBA(mol)', // = Descriptors.NumHAcceptors
    desc: "Hydrogen-bond acceptors, by RDKit's pattern-based definition. It differs from Lipinski's count of N plus O.",
  },
  {
    key: 'HbondD',
    label: 'HbondD',
    rdkit: 'rdMolDescriptors.CalcNumHBD(mol)', // = Descriptors.NumHDonors
    desc: "Hydrogen-bond donors, by RDKit's pattern-based definition. It differs from Lipinski's count of N-H plus O-H.",
  },
  {
    key: 'InChIKey',
    label: 'InChIKey',
    rdkit: 'Chem.MolToInchiKey(mol)', // matches the CCD's InChI 1.03 key for all 8
    text: true,
    desc: 'The standard InChIKey.',
  },
  {
    key: 'LogP',
    label: 'LogP',
    rdkit: 'Crippen.MolLogP(mol)', // = Descriptors.MolLogP
    desc: 'Wildman-Crippen estimate of log P, the base-10 logarithm of the octanol-water partition coefficient.',
  },
  {
    // Checked: G0T 548.216, B96 527.290, 50D 440.214.
    key: 'MolWeight',
    label: 'MW',
    rdkit: 'Descriptors.ExactMolWt(mol)',
    desc: "Monoisotopic (exact) mass in daltons, including hydrogens. It's usually a little lower than the average molecular weight that suppliers list.",
  },
  {
    key: 'NumAliphaticRings',
    label: 'NumAliphaticRings',
    rdkit: 'rdMolDescriptors.CalcNumAliphaticRings(mol)',
    desc: 'Rings with at least one non-aromatic bond.',
  },
  {
    key: 'NumAromaticRings',
    label: 'NumAromaticRings',
    rdkit: 'rdMolDescriptors.CalcNumAromaticRings(mol)',
    desc: 'Aromatic rings.',
  },
  {
    // Checked: G0T 72, B96 76. Without AddHs it would be the heavy-atom count.
    key: 'NumAtoms',
    label: 'Atoms',
    rdkit: 'molH.GetNumAtoms()',
    desc: 'Atoms, including hydrogens.',
  },
  {
    key: 'NumHeavyAtoms',
    label: 'NumHeavyAtoms',
    rdkit: 'mol.GetNumHeavyAtoms()', // = Descriptors.HeavyAtomCount
    desc: 'Atoms other than hydrogen.',
  },
  {
    key: 'NumRings',
    label: 'NumRings',
    rdkit: 'rdMolDescriptors.CalcNumRings(mol)', // = Descriptors.RingCount
    desc: 'Rings.',
  },
  {
    key: 'NumSaturatedRings',
    label: 'NumSaturatedRings',
    rdkit: 'rdMolDescriptors.CalcNumSaturatedRings(mol)',
    desc: 'Rings made only of single bonds.',
  },
  {
    key: 'TPSA',
    label: 'TPSA',
    rdkit: 'rdMolDescriptors.CalcTPSA(mol)', // N and O only, the default
    desc: "Topological polar surface area in Å², by Ertl's method from N and O atoms only.",
  },
]

/** Checked to start (LigandsMenuViewModel.DefaultSelectedMetadata). */
export const DEFAULT_COLUMNS = ['NumAtoms', 'MolWeight']

/**
 * Columns Nanome's picker lists that the demo leaves out, because its value
 * can't be pinned down from what's known. `why` is for maintainers; `desc` is
 * the line the demo shows, in the words of /nanome_web/ligands#property-columns.
 */
export const LEFT_OUT = [
  { key: 'HeavyAtomMolWeight', desc: 'Mass of the non-hydrogen atoms only.',
    why: "RDKit's HeavyAtomMolWt is an average mass (490.373 for B96), while Nanome's MolWeight is monoisotopic; a monoisotopic heavy-atom mass would be 490.000. No Nanome value is known to tell which." },
  { key: 'NumRotatableBonds', desc: 'Rotatable bond count.',
    why: "RDKit's count changes with its strict or non-strict pattern and with explicit hydrogens: 3 or 4 for SB4, 7 or 10 for PQB. No Nanome value is known to tell which." },
  { key: 'Rating', desc: 'A value people enter, stored with the ligand.',
    why: 'A value people enter, not a calculation. Nanome XR draws it as 5 stars; how Nanome Web draws it was not seen.' },
  { key: 'SMILES', desc: 'SMILES string.',
    why: "The exact string Nanome's server writes (atom order, aromatic form, stereo marks) isn't known." },
]

/**
 * A value as the table shows it: a number with a fractional part to 3
 * decimals, anything else as it is (LigandsMenu.FormatMetadataValue in XR;
 * Nanome Web shows MW the same way, 548.216).
 */
export function formatValue(v) {
  if (typeof v === 'number' && !Number.isInteger(v)) return v.toFixed(3)
  return v === undefined || v === null ? '' : String(v)
}

/**
 * The rows, in load order. `pdb` is the entry the ligand comes from, `about`
 * the name the RCSB gives it (entry title or CCD synonym), when it has one.
 * Tags are demo values.
 */
export const LIGANDS = [
  { ccd: 'B96', pdb: '1KV2', entry: '1kv2', name: 'A:B96_391', tag: 'Lead', formula: 'C31 H37 N5 O3',
    about: 'BIRB 796 (doramapimod)',
    smiles: 'Cc1ccc(cc1)n2c(cc(n2)C(C)(C)C)NC(=O)Nc3ccc(c4c3cccc4)OCCN5CCOCC5',
    props: { NumAtoms: 76, NumHeavyAtoms: 39, MolWeight: 527.29, LogP: 5.986, TPSA: 80.65, HbondD: 2, HbondA: 5, NumRings: 5, NumAromaticRings: 4, NumAliphaticRings: 1, NumSaturatedRings: 1, InChIKey: 'MVCOAUNKQVWQHZ-UHFFFAOYSA-N' } },
  { ccd: 'BMU', pdb: '1KV1', entry: '1kv1', name: 'A:BMU_391', tag: 'Hit', formula: 'C15 H19 Cl N4 O',
    about: '',
    smiles: 'CC(C)(C)c1cc(n(n1)C)NC(=O)Nc2ccc(cc2)Cl',
    props: { NumAtoms: 40, NumHeavyAtoms: 21, MolWeight: 306.125, LogP: 4.015, TPSA: 58.95, HbondD: 2, HbondA: 2, NumRings: 2, NumAromaticRings: 2, NumAliphaticRings: 0, NumSaturatedRings: 0, InChIKey: 'FWIJKWMXNHRSRO-UHFFFAOYSA-N' } },
  { ccd: 'SB2', pdb: '1A9U', entry: '1a9u', name: 'A:SB2_800', tag: '', formula: 'C21 H16 F N3 O S',
    about: 'SB203580',
    smiles: 'C[S@](=O)c1ccc(cc1)c2[nH]c(c(n2)c3ccc(cc3)F)c4ccncc4',
    props: { NumAtoms: 43, NumHeavyAtoms: 27, MolWeight: 377.1, LogP: 4.682, TPSA: 58.64, HbondD: 1, HbondA: 3, NumRings: 4, NumAromaticRings: 4, NumAliphaticRings: 0, NumSaturatedRings: 0, InChIKey: 'CDMGBJANTYXAIV-MHZLTWQESA-N' } },
  { ccd: 'SB4', pdb: '1BL7', entry: '1bl7', name: 'A:SB4_800', tag: '', formula: 'C18 H19 F N6',
    about: 'SB220025',
    smiles: 'c1cc(ccc1c2c(n(cn2)C3CCNCC3)c4ccnc(n4)N)F',
    props: { NumAtoms: 44, NumHeavyAtoms: 25, MolWeight: 338.166, LogP: 2.653, TPSA: 81.65, HbondD: 2, HbondA: 5, NumRings: 4, NumAromaticRings: 3, NumAliphaticRings: 1, NumSaturatedRings: 1, InChIKey: 'VSPFURGQAYMVAN-UHFFFAOYSA-N' } },
  { ccd: 'SB6', pdb: '1BL6', entry: '1bl6', name: 'A:SB6_800', tag: '', formula: 'C18 H16 F N3',
    about: 'SB216995',
    smiles: 'c1cc(ccc1c2c(n(cn2)CC3CC3)c4ccncc4)F',
    props: { NumAtoms: 38, NumHeavyAtoms: 22, MolWeight: 293.133, LogP: 4.161, TPSA: 30.71, HbondD: 0, HbondA: 2, NumRings: 4, NumAromaticRings: 3, NumAliphaticRings: 1, NumSaturatedRings: 1, InChIKey: 'ROKOFZNQCIIJMI-UHFFFAOYSA-N' } },
  { ccd: 'MSQ', pdb: '1DI9', entry: '1di9', name: 'A:MSQ_500', tag: 'Hit', formula: 'C17 H17 N3 O2 S',
    about: '',
    smiles: 'COc1cc2c(cc1OC)ncnc2Nc3cccc(c3)SC',
    props: { NumAtoms: 40, NumHeavyAtoms: 23, MolWeight: 327.104, LogP: 4.113, TPSA: 56.27, HbondD: 1, HbondA: 6, NumRings: 3, NumAromaticRings: 3, NumAliphaticRings: 0, NumSaturatedRings: 0, InChIKey: 'FUSDVOSGGMBSMK-UHFFFAOYSA-N' } },
  { ccd: 'PQB', pdb: '2GFS', entry: '2gfs', name: 'A:PQB_361', tag: 'Lead', formula: 'C19 H18 F N3 O4',
    about: 'RO3201195',
    smiles: 'c1cc(cc(c1)OC[C@H](CO)O)C(=O)c2cnn(c2N)c3ccc(cc3)F',
    props: { NumAtoms: 45, NumHeavyAtoms: 27, MolWeight: 371.128, LogP: 1.557, TPSA: 110.6, HbondD: 3, HbondA: 6, NumRings: 3, NumAromaticRings: 3, NumAliphaticRings: 0, NumSaturatedRings: 0, InChIKey: 'IJDQETGUEUJVTB-HNNXBMFYSA-N' } },
  { ccd: 'BAX', pdb: '3HEG', entry: '3heg', name: 'A:BAX_1', tag: '', formula: 'C21 H16 Cl F3 N4 O3',
    about: 'Sorafenib',
    smiles: 'CNC(=O)c1cc(ccn1)Oc2ccc(cc2)NC(=O)Nc3ccc(c(c3)C(F)(F)F)Cl',
    props: { NumAtoms: 48, NumHeavyAtoms: 32, MolWeight: 464.086, LogP: 5.55, TPSA: 92.35, HbondD: 3, HbondA: 4, NumRings: 3, NumAromaticRings: 3, NumAliphaticRings: 0, NumSaturatedRings: 0, InChIKey: 'MLDQJTXFUGDVEO-UHFFFAOYSA-N' } },
]
