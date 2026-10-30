---
outline: [2, 3]
title: Main Panel
---

# Main Panel

The Main Panel is where you manage structures, ligands, workspaces, people and settings. Open it from the [Wrist Menu](/nanome_v2/wristmenu) or with the **Menu** button on your off-hand controller. Everyone in a session has their own.

<ShotRow src="nanome-v2/v2-7/desktop-layout.webp" alt="Nanome XR with the left sidebar, the Main Panel, the Tools Panel and 1KV2">

<IconGrid label="Main Panel tabs">
<IconCard icon="hierarchy" title="Components" href="#components-tab">The structures in the workspace and how each is drawn.</IconCard>
<IconCard icon="affiliate" title="Ligands" href="#ligands-tab">Every ligand in a table, with properties and tags.</IconCard>
<IconCard icon="layout-grid" title="Workspaces" href="#workspaces-tab">Join, open and create workspaces.</IconCard>
<IconCard icon="users-group" title="Users" href="#users-tab">People, your mic and sharing.</IconCard>
<IconCard icon="settings" title="Settings" href="#settings-tab">Skybox, passthrough, controls and sign-out.</IconCard>
</IconGrid>

</ShotRow>

The [Scenes Panel](/nanome_v2/scenespanel) sits on the left of the Main Panel and the [Tools Panel](/nanome_v2/toolspanel) on the right. Two buttons at the panel's top right change the panel itself:

<UiList label="Panel controls">
<UiItem icon="arrows-maximize" name="Increase menu size">Makes the panel bigger.</UiItem>
<UiItem icon="lock-open" name="Lock menu position">Pins the panel in place in a headset. It turns yellow while locked.</UiItem>
</UiList>

## <AppIcon name="hierarchy" /> Components tab {#components-tab}

Every structure in the workspace, and the components that control how it's drawn. It's the same list as the [Entries tab](/nanome_web/entries) in Nanome Web.

<ShotRow src="nanome-v2/v2-7/components-tab.webp" alt="The Components tab with 1KV2 and its components">

<UiList label="Components toolbar">
<UiItem icon="caret-down-filled" name="Collapse All">Collapses every entry.</UiItem>
<UiItem icon="eye" name="Hide All">Hides every entry.</UiItem>
<UiItem icon="sort-ascending-letters" name="Sort by Name">Sorts entries alphabetically.</UiItem>
<UiItem icon="copy-plus" name="Create Component">Makes a component from the current selection.</UiItem>
<UiItem icon="player-stop" name="Stop model playback and reset active models">Appears while a multi-model entry is playing.</UiItem>
<UiItem name="Search">Filters entries and components by name.</UiItem>
<UiItem name="Position Molecules">At the bottom: lets structures be moved one by one.</UiItem>
<UiItem icon="mist" name="Sequences">At the bottom: opens the Sequence Panel.</UiItem>
</UiList>

</ShotRow>

While a structure loads, a progress bar appears at the bottom of the tab, and the load can be cancelled.

<Accordion title="Loading Report" teaser="Shown when the server has notes on a file you load.">

The report lists warnings and errors, with the line number when it's known.

- A report with only warnings closes with **Dismiss**.
- When a problem can be fixed, **Resolve** carries on with the fix, and **Cancel** stops the load.
- A file with errors that can't be fixed shows **Fatal Loading Errors**, with **Cancel** only.

<vimg src="nanome-v2/v2-7/loading-report.webp" alt="A Loading Report noting that bonding for ligand B96 is assigned from the PDB Chemical Component Dictionary" />

</Accordion>

### Entry rows

<ShotRow src="nanome-v2/v2-7/entry-more-options.webp" alt="An entry's More options menu with Rename, Duplicate and Delete">

Each structure you load is an **entry**. Its row has these buttons:

<UiList label="Entry row">
<UiItem icon="caret-down-filled" name="Expand">Shows the entry's components.</UiItem>
<UiItem icon="eye" name="Hide">Hides or shows the entry.</UiItem>
<UiItem icon="arrow-narrow-right" name="Previous / Next model" href="#model-and-trajectory-playback">For entries with more than one model.</UiItem>
<UiItem icon="player-play" name="(BETA) Autoplay" href="#model-and-trajectory-playback">Plays the models or trajectory.</UiItem>
<UiItem icon="layout-list" name="Structure actions" href="#structure-actions">Align, create components, interactions and more.</UiItem>
<UiItem icon="zoom" name="Zoom on this structure">Brings the entry into view.</UiItem>
<UiItem icon="dots" name="More options">Rename, Duplicate or Delete. Delete asks first.</UiItem>
<UiItem icon="paperclip" name="Map loaded">Marks an entry with an electrostatic map.</UiItem>
</UiList>

</ShotRow>

Hovering a row shows how many atoms it holds. An empty component is grayed out.

### Entries and components

<ShotRow src="nanome-v2/v2-7/components-breakdown.webp" alt="The default components of 1KV2, labelled">

Each entry holds **components**: named parts of the structure, each with its own look. A structure with a ligand loads with a default breakdown:

- **Protein**: Cartoon
- **Water** and **Ion**, when the file has them: Stick, hidden by default
- **Site A:B96_391**, a binding-site group with:
  - **Ligand A:B96_391**: the ligand, as Stick
  - **Pocket A:B96_391**: every whole residue with an atom within 4 Å of the ligand, as Wire with a surface
  - **Pocket + Ligand A:B96_391**: both together, carrying their interactions

</ShotRow>

In a headset, **Load Structure** in the Tools Panel loads a structure by PDB code. Other file types are loaded in [Nanome Web](/nanome_web/loading), and the workspace updates in XR.

#### Video: Load Structures, Invite & Follow from XR

<YoutubeEmbed videoId="5uikQlDO7FA" title="Nanome v2.5 Quick Tips: Load Structures, Invite & Follow from XR" />

### Component menu

<ShotRow src="nanome-v2/v2-7/component-more-options.webp" alt="A component's More options menu">

<UiList label="Component More options">
<UiItem icon="pencil" name="Rename">Renames the component.</UiItem>
<UiItem icon="trash" name="Remove">Removes the component. Its atoms stay in the entry.</UiItem>
<UiItem icon="trash" name="Delete Atoms">Permanently deletes the component's atoms from the entry, after a confirmation.</UiItem>
<UiItem icon="mist" name="Edit Selection">Selects the component's atoms.</UiItem>
<UiItem icon="list-check" name="Copy Component">Copies the component to other scenes.</UiItem>
<UiItem icon="copy" name="Duplicate to Entry">Copies the atoms into a new entry.</UiItem>
<UiItem icon="scissors" name="Extract to Entry">Moves the atoms into a new entry.</UiItem>
<UiItem icon="edit" name="Set substructure">Marks it as ligand, ion, protein, nucleic, sugar or solvent.</UiItem>
<UiItem icon="circle-dashed" name="Create Distance Component">The atoms within a set distance of this component.</UiItem>
</UiList>

</ShotRow>

<Accordion title="Distance components" teaser="The options in the distance popup.">

A distance component holds the atoms within a set distance of another component. Its popup has:

<UiList label="Distance component popup">
<UiItem name="Distance (Å)">How far to reach. 4 Å to start.</UiItem>
<UiItem name="Whole residues">Takes whole residues.</UiItem>
<UiItem name="Ignore self">Leaves out the component's own atoms.</UiItem>
<UiItem name="Include ligands">Off to start.</UiItem>
<UiItem name="All entries">Includes atoms from every entry in the workspace.</UiItem>
</UiList>

</Accordion>

### Representations

The button on a component that names its current style, such as **Cartoon**, opens its representations. One atomistic style is active at a time, and the <AppIcon name="palette" /> button beside each style sets its colors.

<ShotRow src="nanome-v2/v2-7/representation-popup.webp" alt="The representation panel for the Protein component">

<UiList label="Representations">
<UiItem icon="line" name="Ball & Stick">Atoms as spheres, joined by cylinders.</UiItem>
<UiItem icon="slash" name="Stick">Bonds as cylinders.</UiItem>
<UiItem icon="hexagon" name="Wire">Bonds as thin lines.</UiItem>
<UiItem icon="color-filter" name="Van der Waals">Space-filling spheres.</UiItem>
<UiItem icon="timeline" name="Hydrogens">None, Polar or All.</UiItem>
<UiItem icon="scribble" name="Cartoon">Ribbons for helices, sheets and loops.</UiItem>
<UiItem icon="tag" name="Residue Label">A label on each residue.</UiItem>
<UiItem icon="egg-fried" name="Surface">The molecular surface, drawn as Wire, Sheer, Semi or Opaque.</UiItem>
</UiList>

</ShotRow>

<vimg src="nanome-v2/v2-7/atom-representations.webp" alt="The 1KV2 ligand as Ball & Stick, Stick, Wire and Van der Waals" />

<vimg src="nanome-v2/v2-7/surface-styles.webp" alt="The 1KV2 pocket surface drawn as Wire, Sheer, Semi and Opaque" />

<Accordion title="How the styles are drawn" teaser="Radii, hydrogens and the surface probe.">

- **Ball & Stick** draws atoms at a quarter of their van der Waals radius.
- **Van der Waals** draws atoms at their full van der Waals radii. Main-group radii come from Mantina et al. (2009), for example 1.70 Å for carbon.
- **Polar** hydrogens are every hydrogen except those bonded to carbon.
- **Surface** is the solvent-excluded molecular surface, computed with a 1.4 Å probe. **Sheer** is 15% opacity and **Semi** is 50%.

</Accordion>

#### Video: Changing Molecular Representations

<YoutubeEmbed videoId="wdECz2HmR3o" title="Nanome v2.4 Quick Tips: Changing Molecular Representations" />

### Interactions {#interactions}

Components that carry interactions show an <AppIcon name="mist" /> **Interactions** row with a count. **Show** lists each type with its own switch:

<Btn>Hydrogen Bonds</Btn> <Btn>VDW Clashes</Btn> <Btn>π Stacking</Btn> <Btn>Salt Bridges</Btn> <Btn>Cation-π</Btn> <Btn>Halogen Bonds</Btn> <Btn>Halogen-π</Btn> <Btn>Hydrophobic</Btn> <Btn>Metal Coordination</Btn>

The <AppIcon name="filter" /> **Filter** switch shows only interactions between ligand and non-ligand atoms. To list and pin interactions, use the [Interactions Tool](/nanome_v2/toolspanel#interactions-tool).

<AccordionGroup label="Interaction details">

<Accordion title="Which interactions a component shows" teaser="Inside one entry, or between entries.">

A component within one entry shows the interactions inside it, which is how **Pocket + Ligand** works. A component that spans several entries shows only the interactions between entries.

Metal coordination has been an interaction type since release 2.4. Since 2.7, metal–ligand bonds that the Chemical Component Dictionary flags as coordination are no longer also drawn as covalent bonds.

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

<ShotRow src="nanome-v2/v2-7/color-schemes.webp" alt="The color scheme list and the Uniform color swatches">

The <AppIcon name="palette" /> button beside a style opens its colors:

<Btn>Element Type</Btn> <Btn>Residue Type</Btn> <Btn>Chain Name</Btn> <Btn>Secondary Structure</Btn> <Btn>Potential Interactions</Btn> <Btn>BFactor</Btn> <Btn>Occupancy</Btn> <Btn>Uniform</Btn> <Btn>Chain Instance</Btn> <Btn>Model Instance</Btn> <Btn>Electrostatic</Btn>

**Carbons only** colors just the carbon atoms and keeps element colors on the rest. **Uniform** opens a color picker with a hex field and swatches.

</ShotRow>

<Accordion title="Electrostatic coloring" teaser="Appears when the entry has a DX map loaded.">

**Electrostatic** colors a surface by the map's value, sampled 1.4 Å out along each surface normal: red at the minimum, white in the middle and blue at the maximum. The default range is −5 to +5 and can be widened to ±20. Values are in the map's own units (APBS maps use kT/e). Nanome doesn't compute the electrostatic potential itself.

</Accordion>

### <AppIcon name="layout-list" /> Structure actions {#structure-actions}

<ShotRow src="nanome-v2/v2-7/structure-actions.webp" alt="The Structure actions menu for 1KV2">

<UiList label="Structure actions">
<UiItem icon="arrow-left-to-arc" name="Align proteins to this">Superposes other protein entries onto this one.</UiItem>
<UiItem icon="copy-plus" name="Create component">From ligands, residues, molecule types, amino acids or nucleotides.</UiItem>
<UiItem icon="list-check" name="Copy components">Copies this entry's components to other scenes.</UiItem>
<UiItem icon="refresh" name="Reset components">Restores the default components in this scene.</UiItem>
<UiItem icon="polygon" name="Create interaction components">Computes interactions with a ligand or between chains.</UiItem>
<UiItem icon="square-x" name="Remove interaction components">Removes them from the scene.</UiItem>
<UiItem icon="list-check" name="Copy position">Copies the entry's position to other scenes.</UiItem>
<UiItem icon="progress-x" name="Reset position">Moves the entry back to its original coordinates.</UiItem>
</UiList>

</ShotRow>

<Tabs :labels="['Align proteins', 'Create component', 'Create interactions']">
<Tab>

<vimg src="nanome-v2/v2-7/align-proteins.webp" alt="Align proteins to this, with 1A9U aligned to 1KV2 by CE-Align" />

Choose **CE-Align** or **TM-Align**, then the entries and chains to align. The alignment runs on Nanome's server. Each aligned row shows **RMSD**, the Cα RMSD over the aligned residues, and **Length**, the number of aligned residues. At least 8 Cα atoms are needed.

</Tab>
<Tab>

<vimg src="nanome-v2/v2-7/create-component.webp" alt="The Create component options" />

Pick from **Ligands**, **Residues**, a **Type** (protein, nucleic acid, ligand, water and others), **Amino Acids** or **Nucleotides**.

</Tab>
<Tab>

<vimg src="nanome-v2/v2-7/create-interactions.webp" alt="Create interaction components, on the Polymer-Ligand tab" />

**Polymer-Ligand** uses a ligand in another entry. **Polymer-Polymer** works **Between Chains** or **Between Molecules**.

</Tab>
</Tabs>

#### Video: Building Custom Components

<YoutubeEmbed videoId="Mw3oZhPD14k" title="Nanome v2.4 Quick Tips: Building Custom Components" />

### Model and trajectory playback

Entries with several models, such as a multi-MODEL PDB, and entries with a trajectory play from the entry row. <AppIcon name="player-play" /> **(BETA) Autoplay** plays them, and the playback settings set the speed (×1 to ×20) and direction.

- Playback shows only for you and the people following you.
- Speeds of ×5 and above may run slowly on standalone headsets.
- Surface changes wait until playback stops.

## <AppIcon name="affiliate" /> Ligands tab {#ligands-tab}

Every ligand in the workspace in one table. It matches the [Ligands tab](/nanome_web/ligands) in Nanome Web.

<ShotRow src="nanome-v2/v2-7/ligands-tab.webp" alt="The Ligands tab">

<UiList label="Ligands toolbar">
<UiItem icon="filter" name="Filter ligands">Filters the table, including by what's visible.</UiItem>
<UiItem icon="columns-3" name="Select property columns">Chooses the columns.</UiItem>
<UiItem icon="bookmark" name="View presets">Saves and recalls column and filter layouts.</UiItem>
<UiItem icon="copy-check" name="Bulk-Display">Shows several ligands, or several models of one file, at once.</UiItem>
<UiItem icon="caret-down-filled" name="Set Labels">Labels the ligands Bulk-Display shows.</UiItem>
<UiItem icon="x" name="Clear displayed ligands">Clears what Bulk-Display shows.</UiItem>
<UiItem name="Search">Filters by name.</UiItem>
</UiList>

</ShotRow>

Each row shows the 2D structure and your columns, with these buttons:

<UiList label="Ligand row">
<UiItem icon="zoom" name="Zoom">Centers the view on the ligand.</UiItem>
<UiItem icon="info-small" name="Details">Duplicate to Entry, and switches to show properties as 3D labels.</UiItem>
<UiItem icon="edit-circle" name="Edit" href="/nanome_v2/toolspanel#builder-tool">Opens the ligand in the Builder Tool.</UiItem>
<UiItem icon="caret-down-filled" name="Set Tag">Tags it, for example as Hit or Lead. Also Remove Tag, Edit list and Show 3D tag.</UiItem>
</UiList>

<ShotRow src="nanome-v2/v2-7/ligand-property-columns.webp" alt="The property column picker">

<Callout type="note" title="Where the numbers come from">

Properties are calculated with RDKit on Nanome's server. **MolWeight** is the monoisotopic (exact) mass, which is usually slightly lower than the average molecular weight. **Rating** is a value people enter. SDF data fields from the source file can be shown as columns too. Each column is explained under [Property columns](/nanome_web/ligands#property-columns).

</Callout>

</ShotRow>

## <AppIcon name="layout-grid" /> Workspaces tab {#workspaces-tab}

<ShotRow src="nanome-v2/v2-7/workspaces-tab.webp" alt="The Workspaces tab">

<UiList label="Workspaces tab">
<UiItem name="Join Workspace">Type an 8-character code, shown as XXXX-XXXX, then Go.</UiItem>
<UiItem name="Filter By Name Or Owner">Filters the list.</UiItem>
<UiItem icon="dots" name="More options">Info, View Project, Permissions, Rename, Duplicate, and Delete (owner) or Leave.</UiItem>
<UiItem icon="plus" name="New">Creates a workspace.</UiItem>
<UiItem icon="users-group" name="Load for All">Opens the selected workspace and brings everyone with you.</UiItem>
<UiItem icon="user" name="Load">Opens the selected workspace just for you.</UiItem>
</UiList>

</ShotRow>

- Codes use letters (without I and O) and digits.
- The list shows **Name**, **Owner** and **Last Opened**, and sorts by any column.
- **Load for All** can first add people who don't have access as Viewers or Editors.
- A workspace sent from Nanome Web with **Open in XR** shows a **Load from Web** prompt: **Just Me** or **Load for All**.

### Projects

<ShotRow src="nanome-v2/v2-7/workspaces-tab-projects.webp" alt="The Projects list in the Workspaces tab">

The **Projects** tab lists projects with their workspace count, owner and modified date. Choosing a project filters the workspace list to it. Projects are edited in [Nanome Web](/nanome_web/home#projects).

</ShotRow>

Free licenses are limited to 1 owned project, 3 owned workspaces and 5 structures per workspace, with view-only access to workspaces others share.

## <AppIcon name="users-group" /> Users tab {#users-tab}

Who is in the workspace, your mic, and who can open it.

### User settings {#user-settings}

<ShotRow src="nanome-v2/v2-7/users-tab-annotated.webp" alt="The Users tab with its controls labelled">

<UiList label="Users tab">
<UiItem name="Display Name">The name others see.</UiItem>
<UiItem icon="microphone" name="Mic">Mutes or unmutes you. The meter moves when your mic picks up sound.</UiItem>
<UiItem icon="share" name="Share" href="#share">Who can open the workspace, and with what access.</UiItem>
<UiItem icon="volume-3" name="Mute">In Users in workspace, in a person's (...) menu: mutes them, for you only.</UiItem>
<UiItem icon="login" name="Join">In Users in organization: goes to a colleague's workspace, or asks to join it.</UiItem>
<UiItem icon="plus" name="Invite">In Users in organization: invites a colleague to your workspace.</UiItem>
</UiList>

</ShotRow>

- Your access shows at the top as **My Permission**.
- The off-hand controller's primary button (**X**, or **A** when left-handed) also mutes you.
- **Users in organization** lists colleagues who are online. When you ask to join, the owner lets you in as a Viewer or Editor, or denies it. An invited colleague sees **Join Workspace?** with **Refuse** or **Accept**.

### <AppIcon name="share" /> Share {#share}

<ShotRow src="nanome-v2/v2-7/users-tab-share-dialog.webp" alt="The Share dialog with the workspace code and the people with access">

The dialog shows the workspace code, and has:

<UiList label="Share dialog">
<UiItem name="Global permission level">None, Viewer or Editor, for anyone with the code.</UiItem>
<UiItem icon="user-plus" name="Add people by email">Adds a person as Editor or Viewer. The address has to match their Nanome account exactly.</UiItem>
<UiItem icon="dots" name="Email / Permission">The people with access. Each one's menu has Make Editor or Make Viewer, and Remove User for the owner.</UiItem>
</UiList>

</ShotRow>

<Callout type="note" title="Viewer or Editor">

Viewers can look around, select, point and comment. These are for Editors only:

<Btn icon="ruler-2">Measurement</Btn> <Btn icon="link">Interactions</Btn> <Btn icon="hexagon-plus-2">Builder</Btn> <Btn icon="rotate-360">Torsion</Btn> <Btn icon="arrow-rotary-first-left">Residue Editor</Btn> <Btn icon="tool">MARA Tools</Btn> <Btn icon="download">Load Structure</Btn> <Btn icon="sparkles">Open MARA</Btn>

A free license gives Viewer access to workspaces others own.

</Callout>

## <AppIcon name="settings" /> Settings tab {#settings-tab}

<ShotRow src="nanome-v2/v2-7/settings-tab.webp" alt="The Settings tab">

<UiList label="Settings">
<UiItem icon="moon" name="Night mode">Night or day skybox, when passthrough is off.</UiItem>
<UiItem icon="view-360" name="Floor">Shows or hides the floor.</UiItem>
<UiItem name="Skybox theme" href="#day-night-mode-and-themes">Seven themes, each with a day and a night version.</UiItem>
<UiItem icon="scan-eye" name="Passthrough">Mixed reality or a full skybox. On to start where the headset supports it, grayed out where it doesn't.</UiItem>
<UiItem icon="hand-stop" name="Left-handed mode" area="3.1,21.7,91.7,10.4">Makes the left hand dominant.</UiItem>
<UiItem icon="refresh" name="Allow two-handed grab rotation">When off, molecules rotate with one hand only.</UiItem>
<UiItem icon="arrow-move-down" name="Enable far grab snap-to-hand">When on, grabbing a distant molecule brings it to your hand.</UiItem>
<UiItem icon="users-group" name="Show other user Avatars">Off to start.</UiItem>
<UiItem icon="volume" name="Enable interface sounds">Sounds when you use the menus.</UiItem>
<UiItem icon="help" name="Show tutorial guides">The in-headset tutorials.</UiItem>
<UiItem icon="box" name="Show structure box on hover">A labelled box around a hovered entry.</UiItem>
<UiItem icon="outbound" name="Log Out">At the bottom, beside your username.</UiItem>
<UiItem icon="info-small" name="About">The app version.</UiItem>
<UiItem icon="server" name="Change Server">Appears when more than one server is set up.</UiItem>
</UiList>

</ShotRow>

### Day/Night mode and themes {#day-night-mode-and-themes}

The themes are Default, Arctic Cyan, Aurora Green, Black & White, Gold Orange, Island and Pure Black. Since release 2.7 the skyboxes are procedurally generated mountains in each theme's colors, and Night mode switches each one between its day and night version.

<vimg src="nanome-v2/v2-7/skybox-themes.webp" alt="The seven skybox themes, by day and by night" />
