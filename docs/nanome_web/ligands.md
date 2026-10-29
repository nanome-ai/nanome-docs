---
title: Ligands Tab
---

# Ligands Tab

The **Ligands** tab is a table of every ligand in the workspace, with a 2D drawing and calculated properties for each. It's the same ligand list as the **Ligands** tab in Nanome XR.

## <AppIcon name="filter" /> Toolbar {#toolbar}

<ShotRow src="nanome-web/ligands-tab.webp" alt="The Ligands tab">

<UiList label="Ligands toolbar">
<UiItem icon="filter" name="Filter ligands">Narrows the table. The button shows how many ligands are listed out of the total, for example 2/2.</UiItem>
<UiItem icon="columns-3" name="Select property columns" href="#property-columns">Chooses which properties appear as columns.</UiItem>
<UiItem icon="bookmark" name="View presets">Preset sets of columns.</UiItem>
<UiItem name="Search ligands">Filters by name.</UiItem>
<UiItem icon="window-maximize" name="Fullscreen">Opens the table in a larger window.</UiItem>
</UiList>

</ShotRow>

## The table {#the-table}

<ShotRow src="nanome-web/ligands-fullscreen.webp" alt="The Ligands table in full screen">

Each row shows the ligand's 2D drawing, its entry, its name, and the chosen property columns. **Atoms** and **MW** are shown by default. Column headers with arrows sort the table. The <AppIcon name="info-circle" /> beside a column name shows what the column means.

</ShotRow>

<ShotRow src="nanome-web/ligand-row-menu.webp" alt="A ligand row's menu">

In the fullscreen table, each row has a checkbox and a <AppIcon name="dots-vertical" /> menu:

<UiList label="Ligand row menu">
<UiItem name="Download SDF">Downloads the ligand as an SDF file.</UiItem>
<UiItem name="Sketch variant">Opens the ligand in the 2D sketcher to draw a variant.</UiItem>
<UiItem name="Properties">Shows the ligand's calculated properties.</UiItem>
<UiItem name="Tag">Hit, Lead, Add to Synthesis, or New tag... for a custom tag. The tag appears in the Tag column.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="nanome-web/ligand-preview.webp" alt="A ligand preview">

Along the bottom of the tab:

<UiList label="Ligands tab bottom bar">
<UiItem icon="eye" name="Preview all">Opens a 3D preview that steps through the listed ligands one model at a time, with a download button for each.</UiItem>
<UiItem icon="cloud-download" name="Download all">Downloads the listed ligands.</UiItem>
<UiItem icon="hexagon-plus-2" name="Sketch new">Opens the 2D sketcher to draw a new ligand.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="columns-3" /> Property columns {#property-columns}

<ShotRow src="nanome-web/ligand-columns.webp" alt="The ligand property column picker">

Nanome calculates these properties with RDKit on its server. SDF data fields from the source file can also be shown as columns.

</ShotRow>

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

<Accordion title="Hydrogens and bond orders" teaser="Where ligand bonds come from, which the calculated values depend on.">

Calculated values depend on the hydrogens and bond orders in the loaded structure. For a PDB or mmCIF file that carries a PDB ID, ligand bonds come from the Chemical Component Dictionary (fetched from the RCSB since 2.7, and from PDBe before that), with any bonds written in the file applied too. Without an ID, the remaining bonds are inferred from the coordinates.

</Accordion>
