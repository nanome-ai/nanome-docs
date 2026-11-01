---
outline: [2, 3]
title: Main Panel
---

# Main Panel

The Main Panel is where you manage structures, ligands, workspaces, people and settings. It opens from the [Wrist Menu](/nanome_v2/wristmenu) or with the **Menu** button on the off-hand controller. Everyone in a session has their own.

The [Scenes Panel](/nanome_v2/scenespanel) sits on the left of the Main Panel and the [Tools Panel](/nanome_v2/toolspanel) on the right. The 2 buttons at the panel's top right change the panel itself.

<ShotRow src="nanome-v2/v2-7/main-panel-header.webp" alt="The top of the Main Panel: the 5 tabs, then Lock menu position and Increase menu size" stack>

<UiList label="Main Panel tabs and controls">
<UiItem icon="hierarchy" name="Components" href="#components-tab" area="0.3,2.0,20.2,42.0">The structures in the workspace and how each is drawn.</UiItem>
<UiItem icon="affiliate" name="Ligands" href="#ligands-tab" area="20.3,2.0,15.6,42.0">Every ligand in a table, with properties and tags.</UiItem>
<UiItem icon="layout-grid" name="Workspaces" href="#workspaces-tab" area="35.7,2.0,19.9,42.0">Join, open and create workspaces.</UiItem>
<UiItem icon="users-group" name="Users" href="#users-tab" area="55.3,2.0,13.6,42.0">People, your mic and sharing.</UiItem>
<UiItem icon="settings" name="Settings" href="#settings-tab" area="68.8,2.0,15.9,42.0">Skybox, passthrough, controls and sign-out.</UiItem>
<UiItem icon="lock-open" name="Lock menu position" area="86.8,8.3,5.5,29.7">In a headset: keeps the panel where it is, so grabbing it doesn't move it. The icon shows a closed lock while it's on.</UiItem>
<UiItem icon="arrows-maximize" name="Increase menu size" area="92.8,8.3,5.5,29.7">Widens the panel. Nanome remembers the choice next time.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="hierarchy" /> Components tab {#components-tab}

Every structure in the workspace, and the components that control how it's drawn. It's the same list as the [Entries tab](/nanome_web/entries) in Nanome Web.

<ShotRow src="nanome-v2/v2-7/components-tab.webp" alt="The Components tab with 1KV2 and its components" stack>

<UiList label="Components toolbar">
<UiItem icon="caret-down-filled" name="Collapse All" area="2.7,9.5,8.0,7.5">Collapses every entry. With every entry collapsed it reads Expand All and expands them.</UiItem>
<UiItem icon="eye" name="Hide All" area="11.5,9.5,8.0,7.5">Hides everything in the list. While anything is hidden it reads Show All and shows it all again.</UiItem>
<UiItem icon="sort-ascending-letters" name="Sort by Name" area="20.3,9.5,8.0,7.5">Sorts entries by name, Z to A first, then A to Z.</UiItem>
<UiItem icon="copy-plus" name="Create Component" area="29.1,9.5,8.0,7.5">Makes a component of a type, an amino acid or a nucleotide, in all entries or the ones you pick.</UiItem>
<UiItem name="Search" area="56.2,10.2,41.2,6.2">Filters entries and components by name.</UiItem>
<UiItem name="Position Molecules" area="4.7,92.2,38.1,4.7">At the bottom: lets structures be moved one by one.</UiItem>
<UiItem icon="mist" name="Sequences" href="/nanome_v2/sequencepanel" area="74.8,91.3,22.7,6.3">At the bottom: opens the Sequence Panel.</UiItem>
</UiList>

**Default components**: what a structure with a ligand, such as 1KV2, loads with.

<UiList label="Default components">
<UiItem name="1KV2" area="4.4,19.5,91.2,5.8">An entry: one loaded structure.</UiItem>
<UiItem name="Protein" area="11.3,28.1,84.4,6.0">The protein, as Cartoon.</UiItem>
<UiItem name="Site A:B96_391" area="11.3,36.9,33.3,5.8">A binding-site group for the ligand.</UiItem>
<UiItem name="Ligand A:B96_391" area="18.2,45.6,77.5,6.0">The ligand, as Stick.</UiItem>
<UiItem name="Pocket A:B96_391" area="18.2,54.4,77.5,6.0">Every whole residue with an atom within 4 Å of the ligand, as Wire with a surface.</UiItem>
<UiItem name="Pocket + Ligand A:B96_391" area="18.2,63.1,77.5,6.0">Both together, carrying their interactions.</UiItem>
</UiList>

</ShotRow>

While a structure loads, a **Loading...** button with a progress bar takes the place of the list. Clicking it cancels the load.

<Accordion title="Loading Report" teaser="Shown when the server has notes on a file you load.">

The report lists warnings and errors, with the line number when it's known.

- A report with only warnings closes with **Dismiss**.
- When a problem can be fixed, **Resolve** carries on with the fix, and **Cancel** stops the load.
- A file with errors that can't be fixed shows **Fatal Loading Errors**, with **Cancel** only.

<vimg src="nanome-v2/v2-7/loading-report.webp" alt="A Loading Report noting that bonding for ligand B96 is assigned from the PDB Chemical Component Dictionary" />

</Accordion>

### Entry rows

<ShotRow src="nanome-v2/v2-7/entry-more-options.webp" alt="An entry's More options menu with Rename, Duplicate and Delete" stack>

Each structure you load is an **entry**. Its row has these buttons:

<UiList label="Entry row">
<UiItem icon="caret-down-filled" name="Expand" area="3.6,19.2,5.5,6.2">Shows the entry's components.</UiItem>
<UiItem icon="eye" name="Hide" area="9.2,19.2,5.6,6.2">Hides or shows the entry.</UiItem>
<UiItem icon="layout-list" name="Structure actions" href="#structure-actions" area="62.0,19.2,5.6,6.2">Align, create components, interactions and more.</UiItem>
<UiItem icon="zoom" name="Zoom on this structure" area="67.7,19.2,5.6,6.2">Brings the entry into view.</UiItem>
<UiItem icon="dots" name="More options" area="73.4,19.2,5.6,6.2">Rename, Duplicate or Delete. Delete asks first.</UiItem>
</UiList>

</ShotRow>

- Pointing at a component's name shows how many atoms it holds. An empty component is grayed out.
- An entry with more than one model or a trajectory also has [playback buttons](#model-and-trajectory-playback).
- An entry with an electrostatic map loaded shows a <AppIcon name="paperclip" /> paperclip.

### Entries and components

Each entry holds **components**: named parts of the structure, each with its own look. A structure with a ligand loads with a default breakdown, listed under **Default components** in the [Components tab](#components-tab). Water and Ion components appear when the file has them: Stick, hidden by default.

In a headset, **Load Structure** in the Tools Panel loads a structure by PDB code. Other file types are loaded in [Nanome Web](/nanome_web/loading), and the workspace updates in XR.

#### Video: Load Structures, Invite & Follow from XR

<YoutubeEmbed videoId="5uikQlDO7FA" title="Nanome v2.5 Quick Tips: Load Structures, Invite & Follow from XR" />

### Component menu

<ShotRow src="nanome-v2/v2-7/component-more-options.webp" alt="A component's More options menu" stack>

<UiList label="Component More options">
<UiItem icon="pencil" name="Rename" area="68.2,49.0,30.0,4.7">Renames the component.</UiItem>
<UiItem icon="trash" name="Remove" area="68.2,54.1,30.0,4.7">Removes the component. Its atoms stay in the entry.</UiItem>
<UiItem icon="trash" name="Delete Atoms" area="68.2,59.1,30.0,4.7">Permanently deletes the component's atoms from the entry, after a confirmation.</UiItem>
<UiItem icon="mist" name="Edit Selection" area="68.2,64.1,30.0,4.7">Selects the component's atoms.</UiItem>
<UiItem icon="list-check" name="Copy Component" area="68.2,69.2,30.0,4.7">Copies the component to other scenes.</UiItem>
<UiItem icon="copy" name="Duplicate to Entry" area="68.2,74.2,30.0,4.7">Copies the atoms into a new entry.</UiItem>
<UiItem icon="scissors" name="Extract to Entry" area="68.2,79.3,30.0,4.7">Moves the atoms into a new entry.</UiItem>
<UiItem icon="edit" name="Set substructure" area="68.2,84.3,30.0,4.7">Marks it as ligand, ion, protein, nucleic, sugar or solvent.</UiItem>
<UiItem icon="circle-dashed" name="Create Distance Component" area="68.2,89.3,30.0,4.7">The atoms within a set distance of this component.</UiItem>
<UiItem icon="resize" name="Update Distance Filter" href="#distance-components" area="68.2,94.4,30.0,4.7">On a distance component, such as this pocket: changes its distance.</UiItem>
</UiList>

</ShotRow>

#### Distance components {#distance-components}

**Create Distance Component** makes a component of the atoms within a set distance of this one, named for it, such as `within 4Å of Ligand A:FOL_161`. The copy of its popup below shows what each distance and switch picks around folate in 1RX2: E. coli dihydrofolate reductase, with folate and NADP+ bound side by side. A second entry, 1RX3, sits in the same place.

<DistanceDemo />

- The distance runs from 2 Å to 10 Å, with 4 Å to start. The app's slider moves freely, and the copy above stops every 2 Å.
- **Include ligands** is off to start, so other ligands, such as NADP+ here, are left out. Waters and ions in range still count. **All entries** searches every entry in the workspace, and the name then starts with "all within".
- A distance component's menu also has **Update Distance Filter**, which changes the distance and keeps the other options. The name stays as it was.

<Accordion title="Where the distance example comes from" teaser="1RX2 and 1RX3, E. coli DHFR, from Sawaya and Kraut (1997).">

Both entries are crystal structures of E. coli dihydrofolate reductase from Sawaya and Kraut, Biochemistry 36:586-603 (1997), [doi:10.1021/bi962337c](https://doi.org/10.1021/bi962337c).

- [1RX2](https://www.rcsb.org/structure/1RX2) holds folate and NADP+, at 1.8 Å. The substrate site and the cofactor site sit side by side: NADP+'s nicotinamide is 3.1 Å from folate, so Include ligands brings NADP+ in from 4 Å.
- [1RX3](https://www.rcsb.org/structure/1RX3) holds methotrexate, an antifolate drug that binds where folate does, with the enzyme's NADP cofactor beside it, at 2.2 Å. The two crystals have the same space group and nearly the same cell, so their Cα atoms agree to 0.23 Å RMSD as deposited and the entries overlay without an alignment.

</Accordion>

### Representations

The button on a component that names its current style, such as **Cartoon**, opens its representations: a switch for each style, the hydrogens shown, and the surface's look. The <AppIcon name="palette" /> button beside each style sets its [colors](#color-schemes).

The copy of the panel below works like the app's: each switch shows 1KV2's binding site drawn that way, rendered in Nanome.

<RepresentationDemo app="xr" />

<Accordion title="How the styles are drawn" teaser="Radii, hydrogens and the surface probe.">

- **Ball & Stick** draws atoms at a quarter of their van der Waals radius.
- **Van der Waals** draws atoms at their full van der Waals radii. Main-group radii come from Mantina et al. (2009), for example 1.70 Å for carbon.
- **Polar** hydrogens are every hydrogen except those bonded to carbon.
- **Surface** is the solvent-excluded molecular surface, computed with a 1.4 Å probe. **Sheer** is 15% opacity and **Semi** is 50%.

</Accordion>

#### Video: Changing Molecular Representations

<YoutubeEmbed videoId="wdECz2HmR3o" title="Nanome v2.4 Quick Tips: Changing Molecular Representations" />

### Interactions {#interactions}

Each component's representations end with an **Interactions** row and the number of interaction types switched on. **Show** lists each type with its own switch:

<Btn>Hydrogen Bonds</Btn> <Btn>VDW Clashes</Btn> <Btn>π Stacking</Btn> <Btn>Salt Bridges</Btn> <Btn>Cation-π</Btn> <Btn>Halogen Bonds</Btn> <Btn>Hydrophobic</Btn> <Btn>Metal Coordination</Btn> <Btn>Halogen-π</Btn>

The <AppIcon name="filter" /> **Filter** switch, there when the component has a ligand and a type is on, shows only interactions between ligand and non-ligand atoms. The [Interactions Tool](/nanome_v2/toolspanel#interactions-tool) lists interactions and can pin them.

<AccordionGroup label="Interaction details">

<Accordion title="Which interactions a component shows" teaser="Inside one entry, or between entries.">

A component within one entry shows the interactions inside it, which is how **Pocket + Ligand** works. A component that spans several entries shows only the interactions between entries.

Metal coordination has been an interaction type since release 2.4. Since 2.7, metal-ligand bonds that the Chemical Component Dictionary flags as coordination are no longer also drawn as covalent bonds.

</Accordion>

<Accordion title="How clashes are counted" teaser="Any overlap, hydrogens included.">

**VDW Clashes** are computed only between entries, for atoms closer than the sum of their van der Waals radii. Any overlap counts and hydrogens are included, so ordinary close contacts, such as hydrogen-bonded atoms, can also show as clashes. Clash markers grow larger and brighter the more two atoms overlap.

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

### Color schemes

The <AppIcon name="palette" /> button beside a style opens its colors. The copy below colors 1KV2's binding site, drawn as Stick, with each scheme.

<ColorSchemeDemo app="xr" />

**Uniform** shows 19 preset colors and a custom color with a hex field.

<Accordion title="Electrostatic coloring" teaser="In a surface's colors, when the entry has a DX map loaded.">

**Electrostatic** colors a surface by the map's value, sampled 1.4 Å out along each surface normal: red at the minimum, white in the middle and blue at the maximum. The default range is −5 to +5 and can be widened to ±20. Values are in the map's own units (APBS maps use kT/e). Nanome doesn't compute the electrostatic potential itself.

</Accordion>

### <AppIcon name="layout-list" /> Structure actions {#structure-actions}

<ShotRow src="nanome-v2/v2-7/structure-actions.webp" alt="The Structure actions menu for 1KV2, with 1A9U loaded below it" stack>

<UiList label="Structure actions">
<UiItem icon="arrow-left-to-arc" name="Align proteins to this" area="57.1,26.9,35.9,6.2">Superposes other protein entries onto this one.</UiItem>
<UiItem icon="copy-plus" name="Create component" area="57.1,33.3,35.9,6.2">From ligands, residues, molecule types, amino acids or nucleotides.</UiItem>
<UiItem icon="list-check" name="Copy components" area="57.1,39.6,35.9,6.2">Copies this entry's components to other scenes.</UiItem>
<UiItem icon="refresh" name="Reset components" area="57.1,46.0,35.9,6.2">Restores the default components in this scene.</UiItem>
<UiItem icon="polygon" name="Create interaction components" area="57.1,52.4,35.9,6.2">Computes interactions with a ligand or between chains.</UiItem>
<UiItem icon="square-x" name="Remove interaction components" area="57.1,58.8,35.9,6.2">Removes them from the scene.</UiItem>
<UiItem icon="list-check" name="Copy position" area="57.1,65.2,35.9,6.2">Copies the entry's position to other scenes.</UiItem>
<UiItem icon="progress-x" name="Reset position" area="57.1,71.6,35.9,6.2">Moves the entry back to its original coordinates.</UiItem>
</UiList>

</ShotRow>

<Tabs :labels="['Align proteins', 'Create component', 'Create interactions']">
<Tab>

<vimg src="nanome-v2/v2-7/align-proteins.webp" alt="Align proteins to this, with 1A9U aligned to 1KV2 by CE-Align" />

The popup offers **CE-Align** or **TM-Align**, then the entries and chains to align. The alignment runs on Nanome's server. Each aligned row shows **RMSD**, the Cα RMSD over the aligned residues, and **Length**, the number of aligned residues. At least 8 Cα atoms are needed.

</Tab>
<Tab>

<vimg src="nanome-v2/v2-7/create-component.webp" alt="The Create component options" />

The options are **Ligands**, **Residues**, a **Type** (protein, nucleic acid, ligand, water and others), **Amino Acids** and **Nucleotides**.

</Tab>
<Tab>

<vimg src="nanome-v2/v2-7/create-interactions.webp" alt="Create interaction components, on the Polymer-Ligand tab" />

**Polymer-Ligand** uses a ligand in another entry. **Polymer-Polymer** works **Between Chains** or **Between Molecules**.

</Tab>
</Tabs>

#### Video: Building Custom Components

<YoutubeEmbed videoId="Mw3oZhPD14k" title="Nanome v2.4 Quick Tips: Building Custom Components" />

### Model and trajectory playback

Entries with several models, such as a multi-MODEL PDB, and entries with a trajectory get playback buttons on their row.

<ShotRow src="nanome-v2/v2-7/model-playback.webp" alt="1D3Z, an entry with 10 models, playing, with the playback settings open below its row" stack>

<UiList label="Playback">
<UiItem name="Model or frame" area="42.6,36.3,5.1,6.2">Which one is showing, out of how many.</UiItem>
<UiItem icon="arrow-narrow-left" name="Previous model" area="48.0,36.3,6.0,6.2">Steps back one. On a trajectory it's Previous frame.</UiItem>
<UiItem icon="player-play" name="(BETA) Autoplay" area="54.2,36.3,5.9,6.2">Opens the playback settings.</UiItem>
<UiItem icon="arrow-narrow-right" name="Next model" area="60.3,36.3,6.0,6.2">Steps forward one. On a trajectory it's Next frame.</UiItem>
<UiItem icon="player-track-prev" name="Play backwards" area="65.1,44.2,7.1,7.5">Plays in reverse order.</UiItem>
<UiItem icon="player-pause" name="Play / Pause" area="72.9,44.2,7.1,7.5">Pauses or resumes.</UiItem>
<UiItem icon="player-track-next" name="Play forwards" area="80.8,44.2,7.1,7.5">Plays in order. The lit button shows which way it's playing.</UiItem>
<UiItem name="Speed" area="55.8,52.4,41.3,6.2">×1, ×2, ×5, ×10 or ×20.</UiItem>
<UiItem icon="player-stop" name="Stop model playback and reset active models" area="33.3,8.9,7.1,7.4">In the Components toolbar while anything plays. Stops playback.</UiItem>
</UiList>

</ShotRow>

- Playback shows only for you and the people following you.
- Speeds of ×5 and above may run slowly on standalone headsets.
- While it plays, that entry's Surface switch is grayed out.

Each speed steps that many models or frames a second, so ×1 plays 1 a second and ×20 plays 20. A model or frame that isn't ready yet holds playback until it is. The copy below plays 1D3Z's 10 NMR models at each speed.

<PlaybackDemo app="xr" />

## <AppIcon name="affiliate" /> Ligands tab {#ligands-tab}

Every ligand in the workspace in one table, with a 2D drawing and calculated properties for each. Nanome Web's [Ligands tab](/nanome_web/ligands) lists the same ligands with the same properties.

<ShotRow src="nanome-v2/v2-7/ligands-tab.webp" alt="The Ligands tab" stack>

<UiList label="Ligands toolbar">
<UiItem icon="filter" name="Filter ligands" area="2.7,9.5,14.6,7.6">Filters on property values, or to the ligands that are visible. It shows how many ligands are listed out of the total.</UiItem>
<UiItem icon="columns-3" name="Select property columns" href="#ligand-property-columns" area="18.0,9.5,8.0,7.6">Chooses the property columns and their order.</UiItem>
<UiItem icon="bookmark" name="View presets" area="26.8,9.5,8.0,7.6">Saved sets of columns and filters, shared across the project.</UiItem>
<UiItem icon="copy-check" name="Bulk-Display" area="35.5,9.5,8.0,7.6">Shows ligands from several models at once.</UiItem>
<UiItem name="Search" area="56.2,10.2,41.2,6.2">Matches the name, the tag or any property value.</UiItem>
</UiList>

<UiList label="Ligands table">
<UiItem icon="arrows-sort" name="Sort" area="4.9,19.0,5.4,5.1">Sorts by that column, ascending, then descending, then back to entry, model and name order.</UiItem>
<UiItem name="Name" area="5.6,25.3,15.4,14.5">The 2D drawing above the ligand's name. Pointing at the drawing shows it larger.</UiItem>
<UiItem name="Property columns" href="#ligand-property-columns" area="24.0,19.0,44.0,17.6">NumAtoms and MolWeight to start.</UiItem>
<UiItem icon="zoom" name="Zoom" area="76.1,26.7,5.8,5.3">Centers the view on the ligand.</UiItem>
<UiItem icon="info-small" name="Details" area="82.0,26.7,5.8,5.3">Lists the ligand's tag and properties, each with a switch that shows it as a 3D label, and a Duplicate to Entry button.</UiItem>
<UiItem icon="edit-circle" name="Edit" href="/nanome_v2/toolspanel#builder-tool" area="87.9,26.7,5.8,5.3">Opens the ligand in the Builder Tool.</UiItem>
<UiItem icon="caret-down-filled" name="Set Tag" area="73.8,32.7,22.3,5.3">Tags it, for example as Hit or Lead. Also Remove Tag, Edit list and Show 3D tag.</UiItem>
</UiList>

</ShotRow>

While Bulk-Display is on, the table lists only ligands from entries with more than one model, and clicking a row adds its ligand to the ones on show or takes it away. A bar under the table counts the ones on show. **Set Labels** gives them all one tag, and <AppIcon name="x" /> **Clear displayed ligands** puts them away.

### <AppIcon name="columns-3" /> Property columns {#ligand-property-columns}

<ShotRow src="nanome-v2/v2-7/ligand-property-columns.webp" alt="The property column picker, with NumAtoms and MolWeight picked" stack>

**Select property columns** lists every property the ligands have, including SDF data fields from the source file. Each one you pick becomes a column when you save.

<UiList label="Property column picker">
<UiItem icon="columns-3" name="Select property columns" area="18.3,9.4,7.5,6.9">Opens and closes the list.</UiItem>
<UiItem name="Picked properties" area="20.0,17.9,30.5,10.2">Numbered in column order. Picking one again takes it out.</UiItem>
<UiItem name="Other properties" area="20.0,28.5,30.5,63.3">In alphabetical order. Picking one adds it as the next column.</UiItem>
<UiItem icon="x" name="Cancel" area="20.0,93.2,17.0,5.8">Closes the list and keeps the columns as they were.</UiItem>
<UiItem icon="check" name="Save" area="38.2,93.2,14.6,5.8">Shows the picked columns in their numbered order.</UiItem>
</UiList>

</ShotRow>

- Items stay in place while the list is open. The next time it opens, the picked ones are at the top.
- Numbers with a fractional part show to 3 decimals, so B96's MolWeight shows as 527.290. Columns sort by value, so 9 comes before 10.
- When an SDF data field has the same name as a calculated property, the column shows the value from the file.
- A view preset saves the columns along with the filters.

Nanome calculates the properties with RDKit on its server, and Nanome Web shows the same values.

| Column | What it is |
|--------|------------|
| **NumAtoms** | Number of atoms, including hydrogens. For B96 in 1KV2 (C₃₁H₃₇N₅O₃) it's 76: 31 C, 37 H, 5 N and 3 O |
| **NumHeavyAtoms** | Number of non-hydrogen atoms |
| **MolWeight** | Monoisotopic (exact) mass in daltons, including hydrogens |
| **HeavyAtomMolWeight** | Monoisotopic (exact) mass of the non-hydrogen atoms only |
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
| **Rating** | A value people enter, stored with the ligand. The column shows 5 stars; picking the current star again clears it |

<Callout type="note" title="MolWeight is the exact mass">

**MolWeight** holds the monoisotopic mass, the sum of each atom's most abundant isotope. It's usually a little lower than the average molecular weight that suppliers and the RCSB list. For B96 in 1KV2, Nanome shows 527.290, while the RCSB lists a formula weight of 527.66.

</Callout>

The table below holds 8 inhibitors of p38α MAP kinase from the PDB. It looks like Nanome Web's table, with NumAtoms headed **Atoms** and MolWeight **MW**, and it sorts, searches, filters, keeps view presets and enlarges drawings the way Nanome XR does. Its row menu follows Nanome Web's. In Nanome XR a row has Zoom, Details, Edit and Set Tag, listed above.

<LigandTableDemo app="xr" />

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
| A:BAX_1 | [BAX](https://www.rcsb.org/ligand/BAX) | [3HEG](https://www.rcsb.org/structure/3HEG) | sorafenib |

The RDKit calls are `Chem.AddHs` then `GetNumAtoms` for NumAtoms, `GetNumHeavyAtoms` for NumHeavyAtoms, `Descriptors.ExactMolWt` for MolWeight, `rdMolDescriptors.CalcExactMolWt(mol, onlyHeavy=True)` for HeavyAtomMolWeight, `Crippen.MolLogP` for LogP, `Chem.MolToInchiKey` for InChIKey, and the matching `rdMolDescriptors` function for TPSA, HbondD, HbondA and the 4 ring counts.

The copy lists NumRotatableBonds, Rating and SMILES in its picker but leaves their columns out. NumRotatableBonds depends on RDKit settings that haven't been matched to Nanome's, people enter Rating, and one molecule can be written as many valid SMILES.

The tags are examples, and so are the 2 hidden entries, 1BL6 and 1BL7, that **Filter by currently visible** leaves out, and the 2 view presets, **MW < 500, LogP ≤ 5** and **TPSA over 80**.

</Accordion>

## <AppIcon name="layout-grid" /> Workspaces tab {#workspaces-tab}

<ShotRow src="nanome-v2/v2-7/workspaces-tab.webp" alt="The Workspaces tab" stack>

<UiList label="Workspaces tab">
<UiItem name="Join Workspace" area="2.7,9.5,94.7,9.7">An 8-character code, shown as XXXX-XXXX. Go joins that workspace.</UiItem>
<UiItem name="Filter By Name Or Owner" area="3.9,26.5,92.4,6.3">Filters the list.</UiItem>
<UiItem icon="dots" name="More options" area="88.0,42.7,5.9,5.5">Info, View Project, Permissions, Rename, Duplicate, and Delete (owner) or Leave.</UiItem>
<UiItem icon="plus" name="New" area="2.7,91.3,23.3,6.4">Creates a workspace.</UiItem>
<UiItem icon="users-group" name="Load for All" area="50.1,91.3,23.3,6.4">Opens the selected workspace and brings everyone with you.</UiItem>
<UiItem icon="user" name="Load" area="74.1,91.3,23.3,6.4">Opens the selected workspace just for you.</UiItem>
</UiList>

</ShotRow>

- Codes use letters (without I and O) and digits.
- The list shows **Name**, **Owner** and **Last Opened**, and sorts by any column.
- **Load for All** can first add people who don't have access as Viewers or Editors.
- A workspace sent from Nanome Web with **Open in XR** opens straight away when you're alone in the session. With other people there, a **Load from Web** prompt offers **Just Me** or **Load for All**.

### Projects

<ShotRow src="nanome-v2/v2-7/workspaces-tab-projects.webp" alt="The Projects list in the Workspaces tab" stack>

The **Projects** tab lists projects with their workspace count, owner and modified date. Choosing a project filters the workspace list to it. Projects are edited in [Nanome Web](/nanome_web/home#projects).

</ShotRow>

Free licenses are limited to 1 owned project, 3 owned workspaces and 5 structures per workspace, with view-only access to workspaces others share.

## <AppIcon name="users-group" /> Users tab {#users-tab}

Who is in the workspace, your mic, and who can open it.

### User settings {#user-settings}

<ShotRow src="nanome-v2/v2-7/users-tab.webp" alt="The Users tab: My Permission and Share, Display Name and Mic, then Users in workspace and Users in organization" stack>

<UiList label="Users tab">
<UiItem name="My Permission" area="2.6,10.4,35.7,4.1">Your access to this workspace.</UiItem>
<UiItem icon="share" name="Share" href="#share" area="83.1,9.7,14.2,5.1">Who can open the workspace, and with what access.</UiItem>
<UiItem name="Display Name" area="4.3,18.2,63.6,10.4">The name others see.</UiItem>
<UiItem icon="microphone" name="Mic" area="68.5,22.2,26.7,6.4">Mutes or unmutes you. The meter moves when your mic picks up sound.</UiItem>
<UiItem name="Users in workspace" area="5.0,34.8,44.1,5.3">The other people in the workspace. Each one's menu has Mute, which mutes them for you only.</UiItem>
<UiItem name="Users in organization" area="49.3,34.8,46.2,5.3">Colleagues who are online.</UiItem>
</UiList>

</ShotRow>

- The off-hand controller's primary button (**X**, or **A** when left-handed) also mutes you.
- In **Users in organization**, <AppIcon name="login" /> **Join** goes to a colleague's workspace, or asks to join it, and the owner lets you in as a Viewer or Editor, or denies it. <AppIcon name="plus" /> **Invite** asks a colleague to yours, and they see **Join Workspace?** with **Refuse** or **Accept**.

### <AppIcon name="share" /> Share {#share}

<ShotRow src="nanome-v2/v2-7/users-tab-share-dialog.webp" alt="The Share dialog with the workspace code and the people with access" stack>

The dialog shows the workspace code, and has:

<UiList label="Share dialog">
<UiItem name="Global permission level" area="68.6,23.0,19.1,6.2">None, Viewer or Editor, for anyone with the code.</UiItem>
<UiItem icon="user-plus" name="Add people by email" area="11.0,31.6,78.2,6.2">Adds a person as Editor or Viewer. The address has to match their Nanome account exactly.</UiItem>
<UiItem icon="dots" name="Email / Permission" area="11.0,38.6,78.2,32.3">The people with access. Each one's menu has Make Editor or Make Viewer, and Remove User for the owner.</UiItem>
</UiList>

</ShotRow>

<Callout type="note" title="Viewer or Editor">

Viewers can look around, select, point and comment. These are for Editors only:

<Btn icon="ruler-2">Measurement</Btn> <Btn icon="link">Interactions</Btn> <Btn icon="hexagon-plus-2">Builder</Btn> <Btn icon="rotate-360">Torsion</Btn> <Btn icon="arrow-rotary-first-left">Residue Editor</Btn> <Btn icon="tool">MARA Tools</Btn> <Btn icon="download">Load Structure</Btn> <Btn icon="sparkles">Open MARA</Btn>

A free license gives Viewer access to workspaces others own.

</Callout>

## <AppIcon name="settings" /> Settings tab {#settings-tab}

<ShotRow src="nanome-v2/v2-7/settings-tab.webp" alt="The Settings tab" stack>

<UiList label="Settings">
<UiItem icon="moon" name="Night mode" area="4.4,9.1,6.9,5.3">Night or day skybox, when passthrough is off. The icon is a sun while it's off.</UiItem>
<UiItem icon="view-360" name="Floor" area="12.0,9.1,6.9,5.3">Shows or hides the floor. The icon is crossed out while the floor is hidden.</UiItem>
<UiItem name="Skybox theme" href="#day-night-mode-and-themes" area="19.7,9.2,25.2,5.1">7 themes, each with a day and a night version except Pure Black.</UiItem>
<UiItem icon="scan-eye" name="Passthrough" area="50.9,9.1,44.4,5.3">Mixed reality or a full skybox. On to start where the headset supports it, grayed out where it doesn't. While it's on, Night mode, Floor and Skybox theme are grayed out.</UiItem>
<UiItem icon="hand-stop" name="Left-handed mode" area="4.4,19.0,90.9,5.4">Makes the left hand dominant.</UiItem>
<UiItem icon="refresh" name="Allow two-handed grab rotation" area="4.4,28.9,90.9,5.3">When off, molecules rotate with one hand only.</UiItem>
<UiItem icon="arrow-move-down" name="Enable far grab snap-to-hand" area="4.4,38.7,90.9,5.3">When on, grabbing a distant molecule brings it to your hand.</UiItem>
<UiItem icon="users-group" name="Show other user Avatars" area="4.4,48.6,90.9,5.4">Off to start.</UiItem>
<UiItem icon="volume" name="Enable interface sounds" area="4.4,58.5,90.9,5.4">Sounds when you use the menus.</UiItem>
<UiItem icon="help" name="Show tutorial guides" area="4.4,68.3,90.9,5.3">The in-headset tutorials.</UiItem>
<UiItem icon="box" name="Show structure box on hover" area="4.4,78.2,90.9,5.3">A labeled box around a hovered entry.</UiItem>
<UiItem icon="outbound" name="Log Out" area="76.2,88.2,19.2,5.3">At the bottom, beside your username.</UiItem>
<UiItem icon="info-small" name="App info" area="3.0,93.5,31.5,4.6">The version, with a button for app details and third-party attributions.</UiItem>
</UiList>

</ShotRow>

When more than one server is set up, a <AppIcon name="server" /> **Change Server** button appears at the bottom too.

### Day/Night mode and themes {#day-night-mode-and-themes}

The themes are Default, Arctic Cyan, Aurora Green, Black & White, Gold Orange, Island and Pure Black. Since release 2.7 the skyboxes are procedurally generated mountains in each theme's colors, and Night mode switches each one between its day and night version. Pure Black is a plain black sky by day and by night.

Each theme, by day and by night, is on the [Environment](/nanome_v2/environment#skybox-and-floor) page.
