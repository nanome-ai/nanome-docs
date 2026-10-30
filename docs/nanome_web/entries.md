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
<MapCard icon="palette" title="Colors" href="#colors" side="bottom" area="69.0,63.5,10.8,3.6">Color schemes, from the palette button beside each representation.</MapCard>
<MapCard icon="link" title="Interactions" href="#interactions" side="bottom" area="20.5,74.6,72.5,4.0">The interaction types a component such as Pocket + Ligand shows.</MapCard>
</ScreenMap>

## <AppIcon name="stack-2" /> Entries and components {#entries-and-components}

An **entry** is one loaded structure, such as a PDB file. Each entry holds **components**: named parts of the structure with their own representations. A structure with a bound ligand loads with a default breakdown, for example:

- **Protein**, drawn as Cartoon
- **Water** and **Ion**, when the file has them, drawn as Stick and hidden by default
- **Site A:G0T_1215**, a group for one binding site, holding:
  - **Ligand A:G0T_1215**, the ligand as Stick
  - **Pocket A:G0T_1215**, every whole residue with an atom within 4 Å of the ligand, drawn as Wire with a surface
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

An entry with a trajectory or several models also has [playback buttons](/nanome_web/mdplayback#playing-it-back) on its row.

## <AppIcon name="scribble" /> Representations {#representations}

The representation chip on a component opens the representation panel. Each representation has its own switch and a palette button for its [colors](#colors).

The copy of the panel below works like the app's: each switch shows 1KV2's binding site drawn that way, rendered in Nanome. The panel ends with an **Interactions** row: the number of interaction types switched on, and **Show** to list them.

<RepresentationDemo app="web" />

<Accordion title="How the styles are drawn" teaser="Radii, hydrogens and the surface probe.">

- **Ball and Stick** draws atoms at a quarter of their van der Waals radius.
- **Van der Waals** draws atoms at their full van der Waals radii. Main-group radii come from Mantina et al. (2009), for example 1.70 Å for carbon and 1.52 Å for oxygen.
- **Polar H** is every hydrogen except those bonded to carbon.
- **Surface** is the solvent-excluded molecular surface, computed with a 1.4 Å probe. **Wire** draws the same surface as a mesh, **Sheer** at 15% opacity and **Semi** at 50%.

</Accordion>

### <AppIcon name="palette" /> Colors {#colors}

The palette button beside a representation opens its color schemes. Each scheme in the copy below shows 1KV2 colored that way.

<ColorSchemeDemo app="web" />

<Accordion title="Electrostatic coloring" teaser="What a DX map loaded on the entry is used for.">

A map attached with [Load DX map](#more-options) can color a **Surface** by the map's value, sampled 1.4 Å out along each surface normal: red at the minimum, white in the middle and blue at the maximum. Only surfaces take this coloring. The default range is −5 to +5, in the map's own units (APBS maps use kT/e). Nanome doesn't compute the electrostatic potential itself.

Nanome XR applies it with the **Electrostatic** scheme in its [color list](/nanome_v2/mainpanel#color-schemes). A surface colored that way shows the same colors in Nanome Web.

</Accordion>

### <AppIcon name="mist" /> Interactions {#interactions}

The representation panel ends with an **Interactions** row. Its count is the number of interaction types switched on, so **Protein**, with none on, shows 0. **Show** lists each type with its legend color and a switch, here for **Pocket + Ligand**:

<ShotRow src="nanome-web/interactions-list.webp" alt="The Interactions list for a component">

<UiList label="Interactions header">
<UiItem icon="mist" name="Interactions" area="1.9,1.9,37.1,9.1">The count of interaction types switched on.</UiItem>
<UiItem icon="filter" name="Filter" area="52.3,1.9,21.1,9.1">Shows only interactions between ligand atoms and non-ligand atoms.</UiItem>
<UiItem name="Hide" area="75.1,1.9,18.3,9.1">Closes the list. It reads Show while the list is closed.</UiItem>
</UiList>

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

**Export analysis** in the [workspace menu](/nanome_web/home#workspaces) downloads the interactions as CSV files, along with measurements and minimization history.

<AccordionGroup label="Interaction details">

<Accordion title="Which interactions a component shows" teaser="Inside one entry, or between entries.">

A component within one entry shows the interactions inside it, which is how **Pocket + Ligand** works. A component that spans several entries shows only the interactions between entries.

In a component that mixes substructure types, such as protein, ligand and water, hydrogen bonds are drawn only between atoms of different types, for example from ligand to protein. Hydrogen bonds between two waters still show.

When a donor has no explicit hydrogen, its hydrogen bond is drawn from the donor atom itself. If that donor has more than one possible acceptor, the closest acceptor gets the full color and the others a darker shade.

Metal-ligand bonds that the Chemical Component Dictionary flags as coordination aren't drawn as covalent bonds.

</Accordion>

<Accordion title="How clashes are counted" teaser="Only between entries, any overlap, hydrogens included.">

Clashes are only computed between entries. Any overlap counts and hydrogens are included, so ordinary close contacts, such as hydrogen-bonded atoms, can also show as clashes. Clash markers grow larger and brighter the more two atoms overlap.

</Accordion>

<Accordion title="Detection thresholds" teaser="The geometric criteria for each interaction type.">

- **Hydrogen bond**: donor-acceptor distance up to 3.9 Å when the acceptor is N, O or F (4.4 Å otherwise). With explicit hydrogens, the H···acceptor distance must be 1.6 Å to 2.7 Å (1.8 Å to 3.0 Å for other acceptors) and the donor-H···acceptor angle at least 100°. Without hydrogens, only the distance and the angle at the acceptor are checked. Backbone amide N isn't an acceptor, and proline N isn't a donor.
- **π stacking**: face-to-face rings within 5.5 Å and under 30° apart, or T-shaped rings within 6.5 Å at 60° to 120°, with a lateral offset under 2 Å.
- **Salt bridge**: charged-group centroids within 5.5 Å.
- **Cation-π**: cation within 6 Å of a ring centroid, offset under 2 Å.
- **Halogen bond**: Cl, Br or I bonded to C, N, Si or another halogen, within 3.5 Å of the acceptor, with an R-X···acceptor angle of 150° to 180° and an X···acceptor-Y angle of 90° to 150°.
- **Halogen-π**: halogen 3.5 Å to 4.5 Å from a ring centroid, roughly above the ring face (within 60° of the ring normal), with a C-X···centroid angle over 120°.
- **Hydrophobic**: contacts within 4 Å between carbons bonded only to carbon or hydrogen.
- **Metal coordination**: donor atoms within 3.0 Å of a metal.

Anion-π, CH-π and water-bridged interactions aren't detected.

</Accordion>

</AccordionGroup>

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

Nanome runs the alignment on its server with CE-Align. TM-Align is available in [Nanome XR](/nanome_v2/mainpanel#structure-actions).

<Accordion title="Alignment results" teaser="RMSD, length and the Cα minimum.">

- Each aligned entry gets an RMSD, the Cα RMSD over the aligned residues, and a length, the number of aligned residues.
- At least 8 Cα atoms are needed.
- Switching scenes while an alignment runs cancels it.

</Accordion>

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

<Accordion title="What Between Chains adds" teaser="3 components for each pair of chains.">

For a pair of chains, such as A and B, **Between Chains** adds 3 components to the entry:

- `A -- B (Interactions)` shows hydrogen bonds, salt bridges, π stacking, halogen bonds and hydrophobic contacts. Its hydrogen bonds are only those from one chain to the other. The other types can also include contacts within one chain.
- `A -- B` and `B -- A` each hold one chain's interface: every whole residue with an atom within 4.5 Å of the other chain, drawn as Stick with a surface.

Only polymer atoms count toward the interface.

</Accordion>

## <AppIcon name="dots" /> More options {#more-options}

<Tabs :labels="['Entry menu', 'Component menu']">
<Tab>

<ShotRow src="nanome-web/entry-more-options.webp" alt="An entry's More options menu" crop="50.9,3.9,46.0,89.8">

<UiList label="Entry More options">
<UiItem icon="pencil" name="Rename" area="57.5,22.1,33.7,10.9">Renames the entry.</UiItem>
<UiItem icon="download" name="Export file" area="57.5,35.4,33.7,10.9">Downloads the entry as a file.</UiItem>
<UiItem icon="upload" name="Load DX map" href="#colors" area="57.5,48.6,33.7,10.9">Attaches an electrostatic potential map in .dx format to the entry, for coloring its surface.</UiItem>
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

The [component menu in Nanome XR](/nanome_v2/mainpanel#component-menu) has more items, such as **Duplicate to Entry** and **Create Distance Component**.

</Tab>
</Tabs>

File types for **Export file** and the trajectory and map formats are listed on [Supported File Formats](/nanome_web/fileformats).
