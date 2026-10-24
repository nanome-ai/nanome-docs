---
title: Entries Tab
---

# Entries Tab

The **Entries** tab lists every structure in the workspace and the components that control how each one is drawn. It works the same way as the [Components tab](/nanome_v2/mainpanel#components-tab) in Nanome XR, and changes made in one show up in the other.

<vimg src="nanome-web/workspace-overview.jpg" />

## Entries and components

An **entry** is one loaded structure, such as a PDB file. Each entry holds **components**: named parts of the structure with their own representations. A structure with a bound ligand loads with a default breakdown, for example:

- **Protein**, drawn as Cartoon
- **Water** and **Ion**, drawn as Stick and hidden by default
- **Site A:G0T_1215**, a group for one binding site, holding:
  - **Ligand A:G0T_1215**, the ligand as Stick
  - **Pocket A:G0T_1215**, every residue with an atom within 4 Å of the ligand
  - **Pocket + Ligand A:G0T_1215**, the pocket and ligand together, carrying their interactions

The names come from the chain, the three-character ligand code and the residue number in the file. In the 4CEO example, `G0T` is the ligand's code in the RCSB Chemical Component Dictionary.

Each row has these controls:

- **Eye**: shows or hides the entry or component. Hidden rows are grayed out.
- **Representation chip** (for example, **Cartoon** or **2 representations**): opens the [representation panel](#representations).
- **Magnifying glass**: zooms the view to the entry or component.
- **(...)**: the [more options](#more-options) menu.

Entry rows also have a **Structure actions** button. See [below](#structure-actions).

## Representations

The representation chip on a component opens the representation panel. Each representation has its own switch and a palette button for its colors.

<vimg src="nanome-web/representation-panel.jpg" />

**Atomistic:**

- **Ball and Stick**: atoms as small spheres, a quarter of their van der Waals radius, joined by cylinders.
- **Stick**: bonds as cylinders, without atom spheres.
- **Wire**: bonds as thin lines.
- **Van der Waals**: atoms as spheres at their full van der Waals radii, a space-filling view. Main-group radii come from Mantina et al. (2009), for example 1.70 Å for carbon and 1.52 Å for oxygen.

The hydrogen row under the atomistic options shows **No H**, **Polar H** (every hydrogen except those bonded to carbon) or **All H**.

**Macromolecular:**

- **Cartoon**: secondary structure as ribbons, with helices, strands and loops.
- **Residue Label**: a text label on each residue.
- **Surface**: the solvent-excluded molecular surface, computed with a 1.4 Å probe. The row under it sets how the same surface is drawn: **Wire** (a mesh), **Sheer** (15% opacity), **Semi** (50%) or **Opaque**.

### Colors

The palette button beside a representation opens its color schemes:

- **Element Type**: by element (carbon, nitrogen, oxygen and so on).
- **Residue Type**: by amino acid or nucleotide.
- **Chain Name**: one color per chain.
- **Secondary Structure**: helix, strand and loop.
- **Potential Interactions**
- **BFactor**: by the B-factor (atomic displacement parameter) recorded in the file.
- **Occupancy**: by the occupancy recorded in the file.
- **Uniform**: a single color.
- **Chain Instance**

**Carbons only** applies the scheme to carbon atoms and keeps element colors on the other atoms.

<vimg src="nanome-web/color-schemes.jpg" />

### Interactions

Components that hold interactions, such as **Pocket + Ligand**, show an **Interactions** row with a count. **Show** lists the interaction types, each with its legend color and a switch:

- **Hydrogen Bonds**
- **VDW Clashes**: atoms in different entries that sit closer than the sum of their van der Waals radii. Clashes are only computed between entries. Any overlap counts and hydrogens are included, so ordinary close contacts, such as hydrogen-bonded atoms, can also show as clashes.
- **π Stacking**: between aromatic rings.
- **Salt Bridges**: between oppositely charged groups.
- **Cation-π**: between a cation and an aromatic ring.
- **Halogen Bonds**
- **Hydrophobic**
- **Metal Coordination**

<vimg src="nanome-web/interactions-list.jpg" />

Clash markers grow larger and brighter the more two atoms overlap. Metal coordination is drawn as an interaction, separately from covalent bonds.

## Structure actions

The Structure actions button on an entry row opens:

- **Align proteins to this**: superposes other protein entries onto this one. It's grayed out while the workspace holds a single entry. Nanome runs the alignment on its server with CE-Align. TM-Align is available in [Nanome XR](/nanome_v2/mainpanel#structure-actions).
- **Create interaction components**: computes interactions and adds components that show them. See [below](#interaction-components).
- **Remove interaction components**: removes the interaction components from the entry.
- **Reset components**: restores the entry's default components.
- **Remove components**: removes the entry's components.

<vimg src="nanome-web/entry-structure-actions.jpg" />

### Interaction components

**Create interaction components** opens a dialog with two modes:

- **Polymer-Ligand**: interactions between this entry's polymer, such as a protein, and a ligand in another entry. With no other ligand entries in the workspace, the dialog shows **No ligands available**.
- **Polymer-Polymer**: interactions **Between Chains** of one entry, chosen with the chain checkboxes, or **Between Molecules** in different entries.

**Create** adds the components, and **Close** leaves without changes.

<vimg src="nanome-web/create-interactions-polymer-ligand.jpg" />

## More options

The **(...)** menu on an **entry** has:

- **Rename**: renames the entry.
- **Export file**: downloads the entry as a file.
- **Load DX map**: attaches an electrostatic potential map in `.dx` format to the entry.
- **Load trajectory**: attaches a trajectory to the entry. See [MD Trajectory Playback](/nanome_web/mdplayback).
- **Delete**: removes the entry from the workspace.

<vimg src="nanome-web/entry-more-options.jpg" />

The **(...)** menu on a **component** has:

- **Rename**: renames the component.
- **Export file**: downloads the component's atoms as a file.
- **Edit selection**: changes which atoms the component contains.
- **Delete**: removes the component.

<vimg src="nanome-web/component-more-options.jpg" />

File types for **Export file** and the trajectory and map formats are listed on [Supported File Formats](/nanome_web/fileformats).
