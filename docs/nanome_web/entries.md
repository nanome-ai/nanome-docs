---
outline: [2, 3]
title: Entries Tab
---

# Entries Tab

The **Entries** tab lists every structure in the workspace and the components that control how each one is drawn. It works the same way as the **Components** tab in Nanome XR, and changes made in one show up in the other.

<ScreenMap src="nanome-web/entries-tab.webp" alt="The Entries tab for 4ceo" crop="0,18.5,100,78.3" label="Entries tab">
<MapCard icon="stack-2" title="Entries and components" href="#entries-and-components" side="left" area="3.9,34.6,90.2,61.8">Each structure, its parts, and the buttons on each row.</MapCard>
<MapCard icon="layout-list" title="Structure actions" href="#structure-actions" side="right" area="74.5,35.0,4.4,3.2">Alignment and interaction components.</MapCard>
<MapCard icon="dots" title="More options" href="#more-options" side="right" area="88.6,35.0,4.4,3.2">Rename, export, load a map or trajectory, delete.</MapCard>
<MapCard icon="scribble" title="Representations" href="#representations" side="right" area="63.7,39.8,16.4,5.1">How a component is drawn.</MapCard>
<MapCard icon="palette" title="Colors" href="#colors" side="bottom" area="69.0,63.5,10.8,3.6">Color schemes, from the palette beside each representation in the panel a chip opens.</MapCard>
<MapCard icon="link" title="Interactions" href="#interactions" side="bottom" area="20.5,74.6,72.5,4.0">The interaction types a component such as Pocket + Ligand shows.</MapCard>
</ScreenMap>

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

<ShotRow src="nanome-web/representation-panel.webp" alt="The representation panel for a component">

**Atomistic:**

<UiList label="Atomistic representations">
<UiItem icon="line" name="Ball and Stick" area="4.6,4.0,90.3,6.7">Atoms as small spheres, joined by cylinders.</UiItem>
<UiItem icon="slash" name="Stick" area="4.6,12.3,90.3,6.7">Bonds as cylinders, without atom spheres.</UiItem>
<UiItem icon="hexagon" name="Wire" area="4.6,20.6,90.3,6.7">Bonds as thin lines.</UiItem>
<UiItem icon="color-filter" name="Van der Waals" area="4.6,28.9,90.3,6.7">Atoms as spheres, a space-filling view.</UiItem>
<UiItem icon="timeline" name="No H / Polar H / All H" area="4.6,37.2,90.3,7.5">The hydrogen row under the atomistic options.</UiItem>
</UiList>

**Macromolecular:**

<UiList label="Macromolecular representations">
<UiItem icon="scribble" name="Cartoon" area="4.6,48.6,90.3,6.7">Secondary structure as ribbons, with helices, strands and loops.</UiItem>
<UiItem icon="tag" name="Residue Label" area="4.6,59.2,90.3,6.7">A text label on each residue.</UiItem>
<UiItem icon="egg-fried" name="Surface" area="4.6,69.7,90.3,15.8">The molecular surface. The row under it sets how it's drawn: Wire, Sheer, Semi or Opaque.</UiItem>
</UiList>

</ShotRow>

<Accordion title="How the styles are drawn" teaser="Radii, hydrogens and the surface probe.">

- **Ball and Stick** draws atoms at a quarter of their van der Waals radius.
- **Van der Waals** draws atoms at their full van der Waals radii. Main-group radii come from Mantina et al. (2009), for example 1.70 Å for carbon and 1.52 Å for oxygen.
- **Polar H** is every hydrogen except those bonded to carbon.
- **Surface** is the solvent-excluded molecular surface, computed with a 1.4 Å probe. **Wire** draws the same surface as a mesh, **Sheer** at 15% opacity and **Semi** at 50%.

</Accordion>

### <AppIcon name="palette" /> Colors {#colors}

The palette button beside a representation opens its color schemes:

<ShotRow src="nanome-web/color-schemes.webp" alt="The color scheme menu for a component" crop="43.6,0.6,56.4,65.0">

<UiList label="Color schemes">
<UiItem name="Element Type" area="46.9,3.3,44.9,5.2">By element (carbon, nitrogen, oxygen and so on).</UiItem>
<UiItem name="Residue Type" area="46.9,8.8,44.9,5.2">By amino acid or nucleotide.</UiItem>
<UiItem name="Chain Name" area="46.9,14.2,44.9,5.2">One color per chain name, the same in every entry.</UiItem>
<UiItem name="Secondary Structure" area="46.9,19.7,44.9,5.2">Helix, strand and loop.</UiItem>
<UiItem name="Potential Interactions" area="46.9,25.1,44.9,5.2">By the interactions each atom can form: acceptors red, donors blue, hydrophobic atoms green, aromatic atoms white, the rest gray. An atom that is both donor and acceptor shows red.</UiItem>
<UiItem name="BFactor" area="46.9,30.6,44.9,5.2">By the B-factor (atomic displacement parameter) recorded in the file.</UiItem>
<UiItem name="Occupancy" area="46.9,36.1,44.9,5.2">By the occupancy recorded in the file.</UiItem>
<UiItem name="Uniform" area="46.9,41.5,44.9,5.2">A single color.</UiItem>
<UiItem name="Chain Instance" area="46.9,47.0,44.9,5.2">One color per chain in each entry, so chain A in two entries gets two colors.</UiItem>
</UiList>

</ShotRow>

**Carbons only** applies the scheme to carbon atoms and keeps element colors on the other atoms.

### <AppIcon name="mist" /> Interactions {#interactions}

Components that hold interactions, such as **Pocket + Ligand**, show an **Interactions** row with a count. **Show** lists the interaction types, each with its legend color and a switch:

<ShotRow src="nanome-web/interactions-list.webp" alt="The Interactions list for a component">

<UiList label="Interaction types">
<UiItem name="Hydrogen Bonds" area="1.8,13.6,92.1,8.3">Between a hydrogen-bond donor and an acceptor.</UiItem>
<UiItem name="VDW Clashes" area="1.8,23.2,92.1,8.1">Atoms in different entries that sit closer than the sum of their van der Waals radii.</UiItem>
<UiItem name="π Stacking" area="1.8,32.8,92.1,8.3">Between aromatic rings.</UiItem>
<UiItem name="Salt Bridges" area="1.8,42.4,92.1,8.3">Between oppositely charged groups.</UiItem>
<UiItem name="Cation-π" area="1.8,52.0,92.1,8.3">Between a cation and an aromatic ring.</UiItem>
<UiItem name="Halogen Bonds" area="1.8,61.6,92.1,8.3">From a Cl, Br or I to an acceptor.</UiItem>
<UiItem name="Hydrophobic" area="1.8,71.2,92.1,8.3">Contacts between carbons bonded only to carbon or hydrogen.</UiItem>
<UiItem name="Metal Coordination" area="1.8,80.8,92.1,8.3">Drawn as an interaction, separately from covalent bonds.</UiItem>
<UiItem name="Halogen-π" area="1.8,90.4,92.1,8.3">A halogen above an aromatic ring.</UiItem>
</UiList>

</ShotRow>

<Accordion title="How clashes are counted" teaser="Only between entries, any overlap, hydrogens included.">

Clashes are only computed between entries. Any overlap counts and hydrogens are included, so ordinary close contacts, such as hydrogen-bonded atoms, can also show as clashes. Clash markers grow larger and brighter the more two atoms overlap.

</Accordion>

## <AppIcon name="layout-list" /> Structure actions {#structure-actions}

The <AppIcon name="layout-list" /> **Structure actions** button on an entry row opens:

<ShotRow src="nanome-web/entry-structure-actions.webp" alt="The Structure actions menu for an entry" crop="9.8,2.9,78.3,92.8">

<UiList label="Structure actions">
<UiItem icon="arrow-left-to-arc" name="Align proteins to this" area="17.6,22.1,59.7,10.9">Superposes other protein entries onto this one. Grayed out while the workspace holds a single entry.</UiItem>
<UiItem icon="polygon" name="Create interaction components" href="#interaction-components" area="17.6,35.4,59.7,10.9">Computes interactions and adds components that show them.</UiItem>
<UiItem icon="square-x" name="Remove interaction components" area="17.6,48.6,59.7,10.9">Removes the interaction components from the entry.</UiItem>
<UiItem icon="refresh" name="Reset components" area="17.6,61.9,59.7,10.9">Restores the entry's default components.</UiItem>
<UiItem icon="eraser" name="Remove components" area="17.6,75.2,59.7,10.9">Removes the entry's components.</UiItem>
</UiList>

</ShotRow>

Nanome runs the alignment on its server with CE-Align. TM-Align is available in Nanome XR.

### Interaction components

<ShotRow src="nanome-web/create-interactions.webp" alt="Create interaction components, on the Polymer-Polymer tab">

**Create interaction components** opens a dialog with two modes:

<UiList label="Create interaction components">
<UiItem name="Polymer-Ligand" area="11.4,13.6,38.1,15.8">Interactions between this entry's polymer, such as a protein, and a ligand in another entry. With no other ligand entries in the workspace, the dialog shows No ligands available.</UiItem>
<UiItem name="Polymer-Polymer" area="49.9,13.6,36.7,15.8">Interactions Between Chains of one entry, chosen with the chain checkboxes, or Between Molecules in different entries.</UiItem>
<UiItem name="Create" area="61.5,75.6,26.2,11.8">Adds the components.</UiItem>
<UiItem name="Close" area="36.1,75.6,23.9,11.8">Leaves without changes.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="dots" /> More options {#more-options}

<Tabs :labels="['Entry menu', 'Component menu']">
<Tab>

<ShotRow src="nanome-web/entry-more-options.webp" alt="An entry's More options menu" crop="50.9,3.9,46.0,89.8">

<UiList label="Entry More options">
<UiItem icon="pencil" name="Rename" area="57.5,22.1,33.7,10.9">Renames the entry.</UiItem>
<UiItem icon="download" name="Export file" area="57.5,35.4,33.7,10.9">Downloads the entry as a file.</UiItem>
<UiItem icon="upload" name="Load DX map" area="57.5,48.6,33.7,10.9">Attaches an electrostatic potential map in .dx format to the entry.</UiItem>
<UiItem icon="upload" name="Load trajectory" href="/nanome_web/mdplayback" area="57.5,61.9,33.7,10.9">Attaches a trajectory to the entry.</UiItem>
<UiItem icon="trash" name="Delete" area="57.5,75.2,33.7,10.9">Removes the entry from the workspace.</UiItem>
</UiList>

</ShotRow>

</Tab>
<Tab>

<ShotRow src="nanome-web/component-more-options.webp" alt="A component's More options menu" crop="50.9,1.8,46.0,91.4">

<UiList label="Component More options">
<UiItem icon="pencil" name="Rename" area="57.5,24.3,33.7,12.7">Renames the component.</UiItem>
<UiItem icon="download" name="Export file" area="57.5,39.8,33.7,12.7">Downloads the component's atoms as a file.</UiItem>
<UiItem icon="mist" name="Edit selection" area="57.5,55.2,33.7,12.7">Changes which atoms the component contains.</UiItem>
<UiItem icon="trash" name="Delete" area="57.5,70.5,33.7,12.7">Removes the component.</UiItem>
</UiList>

</ShotRow>

</Tab>
</Tabs>

File types for **Export file** and the trajectory and map formats are listed on [Supported File Formats](/nanome_web/fileformats).
