---
outline: [2, 3]
title: Ligands Tab
---

# Ligands Tab

The **Ligands** tab is a table of every ligand in the workspace, with a 2D drawing and calculated properties for each. It's the same ligand list as the **Ligands** tab in Nanome XR.

Each row is one ligand in one model of one entry. In 4CEO, the G0T ligand in chain A and its copy in chain B get a row each, and each model of a multi-model file gets its own row too. For a PDB entry, a ligand's name is its chain, ligand code and residue number, such as **A:G0T_1215**, the same name its components carry in the [Entries tab](/nanome_web/entries#entries-and-components).

In Nanome XR, the Ligands tab also has Zoom, Bulk-Display, 3D property labels, and an Edit button that opens the Builder Tool. They're described under the [Ligands tab](/nanome_v2/mainpanel#ligands-tab) in Nanome XR.

## <AppIcon name="filter" /> Toolbar {#toolbar}

<ShotRow src="nanome-web/ligands-tab.webp" alt="The Ligands tab" crop="0,20,100,80">

<UiList label="Ligands toolbar">
<UiItem icon="filter" name="Filter ligands" href="#filters-and-presets" area="2.8,29.9,13.6,5.4">Narrows the table. The button shows how many ligands are listed out of the total, for example 2/2.</UiItem>
<UiItem icon="columns-3" name="Select property columns" href="#property-columns" area="17.5,29.9,6.8,5.4">Chooses which properties appear as columns.</UiItem>
<UiItem icon="bookmark" name="View presets" href="#filters-and-presets" area="25.3,29.9,6.8,5.4">Saved sets of columns and filters, shared across the project.</UiItem>
<UiItem name="Search ligands" area="57.6,29.9,31.8,5.5">Filters by name.</UiItem>
<UiItem icon="window-maximize" name="Fullscreen" href="#the-table" area="90.5,29.9,6.8,5.4">Opens the table in a larger window.</UiItem>
</UiList>

Along the bottom of the tab:

<UiList label="Ligands tab bottom bar">
<UiItem icon="eye" name="Preview all" href="#preview" area="2.8,92.5,23.9,5.5">Opens a 3D preview that steps through the listed ligands one model at a time, with a download button for each.</UiItem>
<UiItem icon="cloud-download" name="Download all" area="27.7,92.5,26.5,5.5">Downloads the listed ligands, as a Combined multi-model SDF or a ZIP of individual SDFs.</UiItem>
<UiItem icon="hexagon-plus-2" name="Sketch new" area="55.1,92.5,25.2,5.5">Opens the 2D sketcher to draw a new ligand.</UiItem>
</UiList>

</ShotRow>

## The table {#the-table}

<ShotRow src="nanome-web/ligands-fullscreen.webp" alt="The Ligands table in full screen">

Each row shows the ligand's 2D drawing, its entry, its name, and the chosen property columns. **Atoms** and **MW** are shown by default.

<UiList label="Ligands table">
<UiItem name="Image" area="4.0,55.9,6.8,38.0">The ligand's 2D drawing.</UiItem>
<UiItem name="Entry" area="15.3,41.7,5.1,48.1">The structure the ligand belongs to.</UiItem>
<UiItem name="Name" area="30.8,41.7,7.0,48.1">Chain, ligand code and residue number.</UiItem>
<UiItem icon="arrows-sort" name="Sort" area="50.3,41.7,5.6,6.4">A column header with arrows sorts the table by that column.</UiItem>
<UiItem icon="info-circle" name="Column info" href="#property-columns" area="67.0,42.5,1.3,5.8">Shows what the column means.</UiItem>
<UiItem name="Tag" href="#tags-and-ratings" area="84.0,41.7,4.2,48.1">The ligand's tag. A dash means it has none.</UiItem>
<UiItem icon="dots-vertical" name="Row menu" href="#row-menu" area="93.2,61.0,1.3,6.5">Download SDF, Sketch variant, Properties and Tag.</UiItem>
<UiItem name="Checkboxes" area="96.4,41.4,1.8,49.5">One on each row, and one in the header row. With rows checked, the bottom buttons show the count, such as Preview 2 and Download 2, and act on those rows only.</UiItem>
<UiItem icon="x" name="Close" area="95.4,5.8,3.4,15.9">Closes the full-screen table.</UiItem>
</UiList>

</ShotRow>

### Row menu {#row-menu}

<ShotRow src="nanome-web/ligand-row-menu.webp" alt="A ligand row's menu" crop="30,0,70,100">

Each row has a checkbox and a <AppIcon name="dots-vertical" /> menu, at the right end of the table:

<UiList label="Ligand row menu">
<UiItem icon="cloud-download" name="Download SDF" area="62.5,32.2,25.3,6.6">Downloads the ligand as an SDF file.</UiItem>
<UiItem icon="hexagon-plus-2" name="Sketch variant" area="62.5,39.9,25.3,6.6">Opens the ligand in the 2D sketcher to draw a variant.</UiItem>
<UiItem icon="info-circle" name="Properties" area="62.5,47.7,25.3,6.6">Shows the ligand's calculated properties.</UiItem>
<UiItem icon="tag" name="Tag" href="#tags-and-ratings" area="62.5,56.8,25.3,37.5">Hit, Lead, Add to Synthesis, or New tag... for a custom tag. The tag appears in the Tag column.</UiItem>
</UiList>

</ShotRow>

### Preview {#preview}

<ShotRow src="nanome-web/ligand-preview.webp" alt="A ligand preview">

<AppIcon name="eye" /> **Preview all** opens this view:

<UiList label="Ligand preview">
<UiItem name="File name" area="38.7,91.6,51.0,8.1">The ligand shown, as an SDF file name: entry, chain, ligand code and residue number.</UiItem>
<UiItem icon="cloud-download" name="Download" area="92.6,93.3,5.8,5.1">Downloads the ligand shown.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="bookmark" /> Filters and view presets {#filters-and-presets}

<AppIcon name="filter" /> **Filter ligands** narrows the table by property values. Its count shows how many ligands pass, out of the total. **Filter by currently visible** keeps only the ligands of entries loaded in the 3D view.

<AppIcon name="bookmark" /> **View presets** are saved views of the table. Each one has a name, a set of columns and a set of filters, and picking one sets the table to match. Presets belong to the project, so the button shows only for a workspace in a project, and every workspace in the project offers the same list, here and in the [Nanome XR Ligands tab](/nanome_v2/mainpanel#ligands-tab).

## <AppIcon name="tag" /> Tags and ratings {#tags-and-ratings}

A tag marks where a ligand stands, such as a hit or a lead. The **Tag** list in the [row menu](#row-menu) sets it.

- A ligand has 1 tag at most. Picking another replaces it.
- By default the list has **Hit**, **Lead** and **Add to Synthesis**. **New tag...** adds a custom tag to the workspace's list.
- Tags are saved with the workspace, so everyone in it sees them, in Nanome Web and in the [Nanome XR Ligands tab](/nanome_v2/mainpanel#ligands-tab).
- A ligand without a tag shows a dash in the **Tag** column.

**Rating** is a column too: up to 5 stars, stored with each ligand, so everyone in the workspace sees the same rating. Editors set it by clicking the stars in the Rating column, in Nanome Web or Nanome XR.

## <AppIcon name="columns-3" /> Property columns {#property-columns}

<ShotRow src="nanome-web/ligand-columns.webp" alt="The ligand property column picker">

Nanome calculates these properties with RDKit on its server. SDF data fields from the source file can also be shown as columns.

<UiList label="Property column picker">
<UiItem icon="search" name="Search properties" area="26.2,15.2,52.2,12.9">Filters the list by name.</UiItem>
<UiItem name="Property list" area="20.5,28.5,57.8,54.5">A checkbox for each property. A checked property gets a column.</UiItem>
<UiItem name="Column order" area="18.3,84.6,59.6,12.6">A checked property shows its place among the property columns. 2 - MolWeight is the second, after Atoms.</UiItem>
</UiList>

</ShotRow>

| Column | What it is |
|--------|------------|
| **NumAtoms** | Number of atoms, including hydrogens. Shown as **Atoms**. For G0T (C₃₀H₃₂N₂O₈) it's 72: 30 C, 32 H, 2 N and 8 O |
| **NumHeavyAtoms** | Number of non-hydrogen atoms |
| **MolWeight** | Monoisotopic (exact) mass in daltons, including hydrogens. Shown as **MW** |
| **HeavyAtomMolWeight** | Mass of the non-hydrogen atoms only |
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
| **Rating** | A value people enter, stored with the ligand. See [Tags and ratings](#tags-and-ratings) |

<Callout type="note" title="MolWeight is the exact mass">

The **MolWeight** column (shown as **MW**) holds the monoisotopic mass, the sum of each atom's most abundant isotope. It's usually a little lower than the average molecular weight that suppliers and the RCSB list. For the 4CEO ligand G0T (C₃₀H₃₂N₂O₈), Nanome shows 548.216, while the RCSB lists a formula weight of 548.58.

</Callout>

The copy of Nanome Web's table below holds 8 inhibitors of p38α MAP kinase from the PDB.

<LigandTableDemo />

<Accordion title="Where the sample ligands come from" teaser="8 PDB entries of human p38α, and RDKit for the values.">

Each one comes from an X-ray structure of human p38α MAP kinase (UniProt Q16539) in which it's the only ligand. Its SMILES comes from its record in the RCSB Chemical Component Dictionary, and each value is computed from that SMILES with RDKit. RDKit gives the NumAtoms and MolWeight values Nanome shows: 76 and 527.290 for B96 in 1KV2, and 72 and 548.216 for G0T in 4CEO.

| Name | Ligand | PDB entry | Also known as |
|------|--------|-----------|---------------|
| A:B96_391 | [B96](https://www.rcsb.org/ligand/B96) | [1KV2](https://www.rcsb.org/structure/1KV2) | BIRB 796, doramapimod |
| A:BMU_391 | [BMU](https://www.rcsb.org/ligand/BMU) | [1KV1](https://www.rcsb.org/structure/1KV1) | |
| A:SB2_800 | [SB2](https://www.rcsb.org/ligand/SB2) | [1A9U](https://www.rcsb.org/structure/1A9U) | SB203580 |
| A:SB4_800 | [SB4](https://www.rcsb.org/ligand/SB4) | [1BL7](https://www.rcsb.org/structure/1BL7) | SB220025 |
| A:SB6_800 | [SB6](https://www.rcsb.org/ligand/SB6) | [1BL6](https://www.rcsb.org/structure/1BL6) | SB216995 |
| A:MSQ_500 | [MSQ](https://www.rcsb.org/ligand/MSQ) | [1DI9](https://www.rcsb.org/structure/1DI9) | |
| A:PQB_361 | [PQB](https://www.rcsb.org/ligand/PQB) | [2GFS](https://www.rcsb.org/structure/2GFS) | RO3201195 |
| A:BAX_1 | [BAX](https://www.rcsb.org/ligand/BAX) | [3HEG](https://www.rcsb.org/structure/3HEG) | Sorafenib |

The RDKit calls are `Chem.AddHs` then `GetNumAtoms` for NumAtoms, `GetNumHeavyAtoms` for NumHeavyAtoms, `Descriptors.ExactMolWt` for MolWeight, `Crippen.MolLogP` for LogP, `Chem.MolToInchiKey` for InChIKey, and the matching `rdMolDescriptors` function for TPSA, HbondD, HbondA and the 4 ring counts.

The copy lists HeavyAtomMolWeight, NumRotatableBonds, Rating and SMILES in its picker but leaves their columns out. The first 2 depend on RDKit settings that haven't been matched to Nanome's, people enter Rating, and one molecule can be written as many valid SMILES. The tags are examples.

</Accordion>

<Accordion title="Hydrogens and bond orders" teaser="Where ligand bonds come from, which the calculated values depend on.">

Calculated values depend on the hydrogens and bond orders in the loaded structure. For a PDB or mmCIF file that carries a PDB ID, ligand bonds come from the Chemical Component Dictionary (fetched from the RCSB since 2.7, and from PDBe before that), with any bonds written in the file applied too. Without an ID, the remaining bonds are inferred from the coordinates.

</Accordion>
