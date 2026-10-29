---
outline: [2, 3]
title: Entries Tab
---

# Entries Tab

The **Entries** tab lists every structure in the workspace and the components that control how each one is drawn. It works the same way as the **Components** tab in Nanome XR, and changes made in one show up in the other.

<ShotRow src="nanome-web/entries-tab.webp" alt="The Entries tab for 4ceo">

<IconGrid label="Entries tab" :cols="3">
<IconCard icon="stack-2" title="Entries and components" href="#entries-and-components">Each structure, its parts, and the buttons on each row.</IconCard>
<IconCard icon="scribble" title="Representations" href="#representations">How a component is drawn.</IconCard>
<IconCard icon="palette" title="Colors" href="#colors">The color schemes for each representation.</IconCard>
<IconCard icon="link" title="Interactions" href="#interactions">The interaction types a component shows.</IconCard>
<IconCard icon="layout-list" title="Structure actions" href="#structure-actions">Alignment and interaction components.</IconCard>
<IconCard icon="dots" title="More options" href="#more-options">Rename, export, load a map or trajectory, delete.</IconCard>
</IconGrid>

</ShotRow>

## <AppIcon name="stack-2" /> Entries and components {#entries-and-components}

An **entry** is one loaded structure, such as a PDB file. Each entry holds **components**: named parts of the structure with their own representations. A structure with a bound ligand loads with a default breakdown, for example:

- **Protein**, drawn as Cartoon
- **Water** and **Ion**, drawn as Stick and hidden by default
- **Site A:G0T_1215**, a group for one binding site, holding:
  - **Ligand A:G0T_1215**, the ligand as Stick
  - **Pocket A:G0T_1215**, every residue with an atom within 4 Å of the ligand
  - **Pocket + Ligand A:G0T_1215**, the pocket and ligand together, carrying their interactions

<Accordion title="How components are named" teaser="Chain, ligand code and residue number.">

The names come from the chain, the three-character ligand code and the residue number in the file. In the 4CEO example, `G0T` is the ligand's code in the RCSB Chemical Component Dictionary.

</Accordion>

Each row has these controls:

<UiList label="Entry and component rows">
<UiItem icon="eye" name="Show / Hide">Shows or hides the entry or component. Hidden rows are grayed out.</UiItem>
<UiItem name="Cartoon" href="#representations">The representation chip (for example, Cartoon or 2 representations): opens the representation panel.</UiItem>
<UiItem icon="layout-list" name="Structure actions" href="#structure-actions">On entry rows.</UiItem>
<UiItem icon="search" name="Zoom">Zooms the view to the entry or component.</UiItem>
<UiItem icon="dots" name="More options" href="#more-options">Rename, Export file, Delete and more.</UiItem>
</UiList>

## <AppIcon name="scribble" /> Representations {#representations}

The representation chip on a component opens the representation panel. Each representation has its own switch and a palette button for its colors.

**Atomistic:**

<ShotRow src="nanome-web/representation-panel.webp" alt="The representation panel for a component">

<UiList label="Atomistic representations">
<UiItem icon="line" name="Ball and Stick">Atoms as small spheres, joined by cylinders.</UiItem>
<UiItem icon="slash" name="Stick">Bonds as cylinders, without atom spheres.</UiItem>
<UiItem icon="hexagon" name="Wire">Bonds as thin lines.</UiItem>
<UiItem icon="color-filter" name="Van der Waals">Atoms as spheres, a space-filling view.</UiItem>
<UiItem icon="timeline" name="No H / Polar H / All H">The hydrogen row under the atomistic options.</UiItem>
</UiList>

</ShotRow>

**Macromolecular:**

<UiList label="Macromolecular representations">
<UiItem icon="scribble" name="Cartoon">Secondary structure as ribbons, with helices, strands and loops.</UiItem>
<UiItem icon="tag" name="Residue Label">A text label on each residue.</UiItem>
<UiItem icon="egg-fried" name="Surface">The molecular surface. The row under it sets how it's drawn: Wire, Sheer, Semi or Opaque.</UiItem>
</UiList>

<Accordion title="How the styles are drawn" teaser="Radii, hydrogens and the surface probe.">

- **Ball and Stick** draws atoms at a quarter of their van der Waals radius.
- **Van der Waals** draws atoms at their full van der Waals radii. Main-group radii come from Mantina et al. (2009), for example 1.70 Å for carbon and 1.52 Å for oxygen.
- **Polar H** is every hydrogen except those bonded to carbon.
- **Surface** is the solvent-excluded molecular surface, computed with a 1.4 Å probe. **Wire** draws the same surface as a mesh, **Sheer** at 15% opacity and **Semi** at 50%.

</Accordion>

### <AppIcon name="palette" /> Colors {#colors}

The palette button beside a representation opens its color schemes:

<ShotRow src="nanome-web/color-schemes.webp" alt="The color scheme menu for a component">

<UiList label="Color schemes">
<UiItem name="Element Type">By element (carbon, nitrogen, oxygen and so on).</UiItem>
<UiItem name="Residue Type">By amino acid or nucleotide.</UiItem>
<UiItem name="Chain Name">One color per chain name, the same in every entry.</UiItem>
<UiItem name="Secondary Structure">Helix, strand and loop.</UiItem>
<UiItem name="Potential Interactions">By the interactions each atom can form: acceptors red, donors blue, hydrophobic atoms green, aromatic atoms white, the rest gray. An atom that is both donor and acceptor shows red.</UiItem>
<UiItem name="BFactor">By the B-factor (atomic displacement parameter) recorded in the file.</UiItem>
<UiItem name="Occupancy">By the occupancy recorded in the file.</UiItem>
<UiItem name="Uniform">A single color.</UiItem>
<UiItem name="Chain Instance">One color per chain in each entry, so chain A in two entries gets two colors.</UiItem>
</UiList>

**Carbons only** applies the scheme to carbon atoms and keeps element colors on the other atoms.

</ShotRow>

### <AppIcon name="mist" /> Interactions {#interactions}

<ShotRow src="nanome-web/interactions-list.webp" alt="The Interactions list for a component">

Components that hold interactions, such as **Pocket + Ligand**, show an **Interactions** row with a count. **Show** lists the interaction types, each with its legend color and a switch:

<UiList label="Interaction types">
<UiItem name="Hydrogen Bonds">Between a hydrogen-bond donor and an acceptor.</UiItem>
<UiItem name="VDW Clashes">Atoms in different entries that sit closer than the sum of their van der Waals radii.</UiItem>
<UiItem name="π Stacking">Between aromatic rings.</UiItem>
<UiItem name="Salt Bridges">Between oppositely charged groups.</UiItem>
<UiItem name="Cation-π">Between a cation and an aromatic ring.</UiItem>
<UiItem name="Halogen Bonds">From a Cl, Br or I to an acceptor.</UiItem>
<UiItem name="Halogen-π">A halogen above an aromatic ring.</UiItem>
<UiItem name="Hydrophobic">Contacts between carbons bonded only to carbon or hydrogen.</UiItem>
<UiItem name="Metal Coordination">Drawn as an interaction, separately from covalent bonds.</UiItem>
</UiList>

</ShotRow>

<Accordion title="How clashes are counted" teaser="Only between entries, any overlap, hydrogens included.">

Clashes are only computed between entries. Any overlap counts and hydrogens are included, so ordinary close contacts, such as hydrogen-bonded atoms, can also show as clashes. Clash markers grow larger and brighter the more two atoms overlap.

</Accordion>

## <AppIcon name="layout-list" /> Structure actions {#structure-actions}

The <AppIcon name="layout-list" /> **Structure actions** button on an entry row opens:

<ShotRow src="nanome-web/entry-structure-actions.webp" alt="The Structure actions menu for an entry">

<UiList label="Structure actions">
<UiItem icon="arrow-left-to-arc" name="Align proteins to this">Superposes other protein entries onto this one. Grayed out while the workspace holds a single entry.</UiItem>
<UiItem icon="polygon" name="Create interaction components" href="#interaction-components">Computes interactions and adds components that show them.</UiItem>
<UiItem icon="square-x" name="Remove interaction components">Removes the interaction components from the entry.</UiItem>
<UiItem icon="refresh" name="Reset components">Restores the entry's default components.</UiItem>
<UiItem icon="eraser" name="Remove components">Removes the entry's components.</UiItem>
</UiList>

Nanome runs the alignment on its server with CE-Align. TM-Align is available in Nanome XR.

</ShotRow>

### Interaction components

<ShotRow src="nanome-web/create-interactions.webp" alt="Create interaction components, on the Polymer-Ligand tab">

**Create interaction components** opens a dialog with two modes:

<UiList label="Create interaction components">
<UiItem name="Polymer-Ligand">Interactions between this entry's polymer, such as a protein, and a ligand in another entry. With no other ligand entries in the workspace, the dialog shows No ligands available.</UiItem>
<UiItem name="Polymer-Polymer">Interactions Between Chains of one entry, chosen with the chain checkboxes, or Between Molecules in different entries.</UiItem>
<UiItem name="Create">Adds the components.</UiItem>
<UiItem name="Close">Leaves without changes.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="dots" /> More options {#more-options}

<Tabs :labels="['Entry menu', 'Component menu']">
<Tab>

<UiList label="Entry More options">
<UiItem icon="pencil" name="Rename">Renames the entry.</UiItem>
<UiItem icon="download" name="Export file">Downloads the entry as a file.</UiItem>
<UiItem icon="upload" name="Load DX map">Attaches an electrostatic potential map in .dx format to the entry.</UiItem>
<UiItem icon="upload" name="Load trajectory" href="/nanome_web/mdplayback">Attaches a trajectory to the entry.</UiItem>
<UiItem icon="trash" name="Delete">Removes the entry from the workspace.</UiItem>
</UiList>

<vimg src="nanome-web/entry-more-options.webp" alt="An entry's More options menu" />

</Tab>
<Tab>

<UiList label="Component More options">
<UiItem icon="pencil" name="Rename">Renames the component.</UiItem>
<UiItem icon="download" name="Export file">Downloads the component's atoms as a file.</UiItem>
<UiItem icon="mist" name="Edit selection">Changes which atoms the component contains.</UiItem>
<UiItem icon="trash" name="Delete">Removes the component.</UiItem>
</UiList>

<vimg src="nanome-web/component-more-options.webp" alt="A component's More options menu" />

</Tab>
</Tabs>

File types for **Export file** and the trajectory and map formats are listed on [Supported File Formats](/nanome_web/fileformats).
