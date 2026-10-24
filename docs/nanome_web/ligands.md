---
title: Ligands Tab
---

# Ligands Tab

The **Ligands** tab is a table of every ligand in the workspace, with a 2D drawing and calculated properties for each. It's the same ligand list as the [Ligands tab](/nanome_v2/mainpanel#ligands-tab) in Nanome XR.

<vimg src="nanome-web/ligands-tab.jpg" />

## Toolbar

- **Filter ligands**: narrows the table. The button shows how many ligands are listed out of the total, for example **2/2**.
- **Select property columns**: chooses which properties appear as columns. See [Property columns](#property-columns).
- **View presets**: preset sets of columns.
- **Search ligands**: filters by name.
- **Fullscreen**: opens the table in a larger window.

## The table

Each row shows the ligand's 2D drawing, its entry, its name, and the chosen property columns. **Atoms** and **MW** are shown by default. Column headers with arrows sort the table. The ⓘ beside a column name shows what the column means.

<vimg src="nanome-web/ligands-fullscreen.jpg" />

In the fullscreen table, each row has a checkbox and a **(⋮)** menu:

- **Download SDF**: downloads the ligand as an SDF file.
- **Sketch variant**: opens the ligand in the 2D sketcher to draw a variant.
- **Properties**: shows the ligand's calculated properties.
- **Tag**: **Hit**, **Lead**, **Add to Synthesis**, or **New tag...** for a custom tag. The tag appears in the **Tag** column.

<vimg src="nanome-web/ligand-row-menu.jpg" />

Along the bottom of the tab:

- **Preview all**: opens a 3D preview that steps through the listed ligands one model at a time, with a download button for each.
- **Download all**: downloads the listed ligands.
- **Sketch new**: opens the 2D sketcher to draw a new ligand.

<vimg src="nanome-web/ligand-preview.jpg" />

## Property columns

Nanome calculates these properties with [RDKit](https://www.rdkit.org/) on its server. SDF data fields from the source file can also be shown as columns.

<vimg src="nanome-web/ligand-columns.jpg" />

| Column | What it is |
|--------|------------|
| **NumAtoms** | Number of atoms, including hydrogens |
| **NumHeavyAtoms** | Number of non-hydrogen atoms |
| **MolWeight** | Monoisotopic (exact) mass in daltons, including hydrogens |
| **HeavyAtomMolWeight** | Monoisotopic mass of the non-hydrogen atoms only |
| **LogP** | Wildman-Crippen estimate of log P, the base-10 logarithm of the octanol-water partition coefficient |
| **TPSA** | Topological polar surface area (Ertl method, from N and O atoms only), in Å² |
| **HbondD** | Hydrogen-bond donor count (RDKit's pattern-based definition, which differs from Lipinski's N-H plus O-H count) |
| **HbondA** | Hydrogen-bond acceptor count (RDKit's pattern-based definition, which differs from Lipinski's N plus O count) |
| **NumRotatableBonds** | Rotatable bond count |
| **NumRings** | Ring count |
| **NumAromaticRings** | Aromatic ring count |
| **NumAliphaticRings** | Count of rings with at least one non-aromatic bond |
| **NumSaturatedRings** | Count of rings made only of single bonds |
| **SMILES** | SMILES string |
| **InChIKey** | Standard InChIKey |
| **Rating** | A rating value stored with the ligand |

<Callout type="note" title="MolWeight is the exact mass">

The **MolWeight** column (shown as **MW**) holds the monoisotopic mass, the sum of each atom's most abundant isotope. It's usually a little lower than the average molecular weight that suppliers and the RCSB list. For the 4CEO ligand G0T (C₃₀H₃₂N₂O₈), Nanome shows 548.216, while the RCSB lists a formula weight of 548.58.

</Callout>

Calculated values depend on the hydrogens and bond orders in the loaded structure. For a PDB or mmCIF file that carries a PDB ID, ligand bonds come from the Chemical Component Dictionary (fetched from the RCSB since 2.7, and from PDBe before that), with any bonds written in the file applied too. Without an ID, the remaining bonds are inferred from the coordinates.
