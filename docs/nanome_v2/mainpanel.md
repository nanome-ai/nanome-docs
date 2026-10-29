---
title: Main Panel
---

# Main Panel

The Main Panel is where structures, ligands, workspaces, users and settings are managed in Nanome XR. It opens from the [Wrist Menu](/nanome_v2/wristmenu) or with the **Menu** button on the off-hand controller, and each person in a session has their own. It has five tabs: **Components**, **Ligands**, **Workspaces**, **Users** and **Settings**.

These pages describe Nanome XR as of release 2.7.1.

<vimg src="nanome-v2/v2-7/desktop-layout.webp" alt="Nanome XR with the left sidebar, the Main Panel, the Tools Panel and 1KV2" />

Two sidebars sit beside the Main Panel:

- **Left sidebar**: the workspace name, the [Scenes Panel](/nanome_v2/scenespanel) and the Users section with **Share** and **Spotlight Me**.
- **Right sidebar**: the [Tools Panel](/nanome_v2/toolspanel), with nine tools plus **Load Structure**, **Open MARA** and **Report a problem**.

The buttons at the top right of the panel change its size (**Increase menu size**), and in a headset **Lock menu position** pins the panel in place. The lock button turns yellow while it's locked.

## Components Tab

The Components tab lists every structure in the workspace and the components that control how each is drawn. It's the same list as the [Entries tab](/nanome_web/entries) in Nanome Web.

<vimg src="nanome-v2/v2-7/components-tab.webp" alt="The Components tab with 1KV2 and its components" />

### Toolbar

- **Collapse All**: collapses every entry.
- **Hide All**: hides every entry.
- **Sort by Name**: sorts entries alphabetically.
- **Create Component**: creates a component from the current selection.
- **Stop model playback and reset active models**: appears while a multi-model entry is playing.
- **Search**: filters entries and components by name.

At the bottom of the tab, **Position Molecules** lets structures be moved independently, and **Sequences** opens the [Sequence Panel](/nanome_v2/sequencepanel). While a structure is loading, a progress bar appears here, and a load can be cancelled.

When the server has notes on a file, a **Loading Report** lists them as warnings or errors, with the line number when it's known. A report with only warnings closes with **Dismiss**. When a problem can be fixed, **Resolve** carries on with the fix and **Cancel** stops the load. A file with errors that can't be fixed shows **Fatal Loading Errors**, with **Cancel** only.

<vimg src="nanome-v2/v2-7/loading-report.webp" alt="A Loading Report noting that bonding for ligand B96 is assigned from the PDB Chemical Component Dictionary" />

### Entry rows

Each entry row has:

- **Expand and Hide**: open the entry's components, and hide or show the entry.
- **Model stepper** (for entries with more than one model): **1 / 1**, **Previous model**, **Next model** and **(BETA) Autoplay**. A buffering indicator shows while frames load. See [Model and trajectory playback](#model-and-trajectory-playback).
- **Structure actions**: see [below](#structure-actions).
- **Zoom on this structure** (magnifying glass).
- **More options (...)**: **Rename**, **Duplicate** and **Delete**. Delete asks for confirmation.

Hovering a row shows how many atoms it holds, and an empty component is grayed out. An icon marks an entry that has an electrostatic map loaded.

<vimg src="nanome-v2/v2-7/entry-more-options.webp" alt="An entry's More options menu with Rename, Duplicate and Delete" />

### Entries and Components

#### Video: Load Structures, Invite & Follow from XR

<YoutubeEmbed videoId="5uikQlDO7FA" title="Nanome v2.5 Quick Tips: Load Structures, Invite & Follow from XR" />

Structures are organized as **entries**, such as the PDB entries 1KV2 and 1A9U. Each entry holds **components**: named parts of the structure with their own representations.

From within XR, structures are loaded by PDB code from the RCSB with **Load Structure** in the right sidebar. Other file types are loaded in [Nanome Web](/nanome_web/loading), which accepts every [supported file format](/nanome_web/fileformats), and the workspace then updates in XR. Some formats, such as `.bcif`, `.mcif`, `.sd`, `.mol` and `.mol2`, need a [MARA](/mara/overview) tool that supports them.

<vimg src="nanome-v2/v2-7/components-breakdown.webp" alt="The default components of 1KV2, labelled" />

A structure with a bound ligand loads with a default breakdown, for example:

- **Protein**: displayed as Cartoon
- **Water** and **Ion**, when the file has them: Stick, hidden by default
- **Site A:B96_391**: a binding-site group containing:
  - **Ligand A:B96_391**: the ligand, shown as Stick
  - **Pocket A:B96_391**: every whole residue with an atom within 4 Å of the ligand, shown as Wire with a surface
  - **Pocket + Ligand A:B96_391**: the pocket and the ligand together, carrying their interactions

The **(...)** menu on a component has **Rename**, **Remove**, **Delete Atoms**, **Edit Selection**, **Copy Component**, **Duplicate to Entry**, **Extract to Entry**, **Set substructure** and **Create Distance Component**. **Delete Atoms** permanently deletes the component's atoms from the entry, after a confirmation. **Extract to Entry** moves the atoms to a new entry.

<vimg src="nanome-v2/v2-7/component-more-options.webp" alt="A component's More options menu" />

A **distance component** holds the atoms within a set distance of another component. Its popup has **Distance (Å)**, **Whole residues**, **Ignore self**, **Include ligands** (off by default) and **All entries**, which includes atoms from every entry in the workspace.

### Representations and Color Options

#### Video: Changing Molecular Representations

<YoutubeEmbed videoId="wdECz2HmR3o" title="Nanome v2.4 Quick Tips: Changing Molecular Representations" />

<vimg src="nanome-v2/v2-7/representation-popup.webp" alt="The representation panel for the Protein component" />

The representation button on a component, labelled with its current style, opens the representation panel. One atomistic style can be active per component. The palette button beside each style opens its colors.

**Atomistic:**

- **Ball & Stick**: atoms as spheres at a quarter of their van der Waals radius, joined by cylinders.
- **Stick**: bonds as cylinders, without atom spheres.
- **Wire**: bonds as thin lines.
- **Van der Waals**: atoms as spheres at their full van der Waals radii, a space-filling view. Main-group radii come from Mantina et al. (2009), for example 1.70 Å for carbon.

The hydrogen row shows **None**, **Polar** (every hydrogen except those bonded to carbon) or **All**.

<vimg src="nanome-v2/v2-7/atom-representations.webp" alt="The 1KV2 ligand as Ball & Stick, Stick, Wire and Van der Waals" />

**Macromolecular:**

- **Cartoon**: secondary structure ribbons, with helices, sheets and loops.
- **Residue Label**: a label on each residue.
- **Surface**: the solvent-excluded molecular surface, computed with a 1.4 Å probe. Four buttons set how the same surface is drawn:
  - **Wire**: a wireframe mesh
  - **Sheer**: 15% opacity
  - **Semi**: 50% opacity
  - **Opaque**: fully opaque

<vimg src="nanome-v2/v2-7/surface-styles.webp" alt="The 1KV2 pocket surface drawn as Wire, Sheer, Semi and Opaque" />

### Interactions

Components that carry interactions show an **Interactions** row with a count. **Show** lists each type with its own switch:

- **Hydrogen Bonds**
- **VDW Clashes**
- **π Stacking**: face-to-face and T-shaped ring stacking
- **Salt Bridges**
- **Cation-π**
- **Halogen Bonds**
- **Halogen-π**
- **Hydrophobic**
- **Metal Coordination**

The **Filter** switch shows only interactions between ligand and non-ligand atoms.

A component within one entry shows the interactions inside it, which is how the **Pocket + Ligand** component works. A component that spans several entries shows only the interactions between entries. **VDW Clashes** are computed only between entries, for atoms closer than the sum of their van der Waals radii. Any overlap counts and hydrogens are included, so ordinary close contacts, such as hydrogen-bonded atoms, can also show as clashes. Clash markers grow larger and brighter the more two atoms overlap.

Metal coordination has been an interaction type since release 2.4. Since 2.7, metal–ligand bonds that the Chemical Component Dictionary flags as coordination are no longer also drawn as covalent bonds.

<Accordion title="Detection thresholds" teaser="The geometric criteria Nanome uses for each interaction type.">

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

### Color Schemes

<vimg src="nanome-v2/v2-7/color-schemes.webp" alt="The color scheme list and the Uniform color swatches" />

The palette offers **Element Type**, **Residue Type**, **Chain Name**, **Secondary Structure**, **Potential Interactions**, **BFactor**, **Occupancy**, **Uniform**, **Chain Instance**, **Model Instance** and **Electrostatic**. **Carbons only** applies the scheme to carbon atoms and keeps element colors on the rest. **Uniform** opens a color picker with a hex field and swatches.

**Electrostatic** appears when the entry has a DX map loaded. It colors a surface by the map's value, sampled 1.4 Å out along each surface normal: red at the minimum, white in the middle and blue at the maximum. The default range is −5 to +5 and can be widened to ±20. Values are in the map's own units (APBS maps use kT/e). Nanome doesn't compute the electrostatic potential itself.

### Structure Actions

<vimg src="nanome-v2/v2-7/structure-actions.webp" alt="The Structure actions menu for 1KV2" />

The **Structure actions** button on an entry opens:

- **Align proteins to this**: superposes other protein entries onto this one. The popup chooses **CE-Align** or **TM-Align**, the entries and their chains, and runs the alignment on Nanome's server. Each aligned row then shows **RMSD**, the Cα RMSD over the aligned residues, and **Length**, the number of aligned residues. At least 8 Cα atoms are needed.
- **Create component**: creates a component from residue ranges, molecule types (protein, nucleic acid, ligand, water and others), amino acids or nucleotides.
- **Copy components**: copies this entry's components to other scenes.
- **Reset components**: restores the entry's default components in this scene.
- **Create interaction components**: computes interactions. **Polymer-Ligand** uses a ligand in another entry, and **Polymer-Polymer** works **Between Chains** or **Between Molecules**.
- **Remove interaction components**: removes the interaction components between chains or entries in the scene.
- **Copy position**: copies the entry's position to other scenes.
- **Reset position**: returns the entry to its original coordinates, for example after moving it with **Position Molecules**.

<vimg src="nanome-v2/v2-7/align-proteins.webp" alt="Align proteins to this, with 1A9U aligned to 1KV2 by CE-Align" />

<vimg src="nanome-v2/v2-7/create-component.webp" alt="The Create component options" />

<vimg src="nanome-v2/v2-7/create-interactions.webp" alt="Create interaction components, on the Polymer-Ligand tab" />

#### Video: Building Custom Components

<YoutubeEmbed videoId="Mw3oZhPD14k" title="Nanome v2.4 Quick Tips: Building Custom Components" />

### Model and trajectory playback

Entries with several models, such as a multi-MODEL PDB, and entries with an attached trajectory play back from the entry row. **(BETA) Autoplay** plays them, and the playback settings set the speed (×1 to ×20) and direction. Playback is visible only to you and to people following you, and speeds of ×5 and above may run slowly on standalone headsets. Surface changes are held during playback and apply when it stops.

## Ligands Tab

<vimg src="nanome-v2/v2-7/ligands-tab.webp" alt="The Ligands tab" />

The Ligands tab is a table of every ligand in the workspace. It matches the [Ligands tab](/nanome_web/ligands) in Nanome Web.

### Toolbar

- **Filter ligands**: filters the table, including by what's currently visible.
- **Select property columns**: chooses the columns. See [Property columns](/nanome_web/ligands#property-columns) for what each one means.
- **View presets**: saves and recalls named column and filter layouts.
- **Bulk-Display**: shows several ligands, or several models of a multi-model file, at once. **Set Labels** and **Clear displayed ligands** go with it.
- **Search**: filters by name.

### Ligand rows

Each row shows the 2D structure and the chosen columns. Its buttons:

- **Zoom** (magnifying glass): centers the view on the ligand.
- **i**: opens the ligand's details, with **Duplicate to Entry** and switches for showing imported and computed properties as labels in 3D.
- **Edit** (pencil): opens the ligand in the [Builder Tool](/nanome_v2/toolspanel#builder-tool).
- **Set Tag**: tags the ligand, for example as Hit or Lead. The menu also has **Remove Tag**, **Edit list** and **Show 3D tag**, which shows the tag beside the ligand in 3D.

<vimg src="nanome-v2/v2-7/ligand-property-columns.webp" alt="The property column picker" />

Properties are calculated with RDKit on Nanome's server. **MolWeight** is the monoisotopic (exact) mass, which is usually slightly lower than the average molecular weight. **Rating** is a value people enter. SDF data fields from the source file can be shown as columns too.

## Workspaces Tab

#### Video: Load Structures, Invite & Follow from XR

<YoutubeEmbed videoId="5uikQlDO7FA" title="Nanome v2.5 Quick Tips: Load Structures, Invite & Follow from XR" />

<vimg src="nanome-v2/v2-7/workspaces-tab.webp" alt="The Workspaces tab" />

The Workspaces tab moves between workspaces.

- **Join Workspace**: takes an 8-character workspace code, shown as `XXXX-XXXX`, made of letters (without I and O) and digits. **Go** joins it.
- **Filter By Name Or Owner**: filters the list.
- **Workspace list**: **Name**, **Owner** and **Last Opened**, sortable by column. Each row's **(...)** menu has **Info**, **View Project**, **Permissions**, **Rename**, **Duplicate**, and **Delete** for an owner or **Leave** for everyone else.
- **+ New**: creates a workspace.
- **Load for All**: goes to the selected workspace and brings everyone in the current workspace along. People who don't have access yet can be added as Viewers or Editors first.
- **Load**: goes to the selected workspace alone.

A workspace sent from Nanome Web with **Open in XR** shows a **Load from Web** prompt, with **Just Me** or **Load for All**.

### Projects

<vimg src="nanome-v2/v2-7/workspaces-tab-projects.webp" alt="The Projects list in the Workspaces tab" />

The **Projects** tab lists projects with their name, workspace count, owner and modified date. Choosing a project filters the workspace list to it. Project details are edited in [Nanome Web](/nanome_web/home#projects).

Free licenses are limited to 1 owned project, 3 owned workspaces and 5 structures per workspace, with view-only access to workspaces others share.

## Users Tab

<vimg src="nanome-v2/v2-7/users-tab-annotated.webp" alt="The Users tab with its controls labelled" />

The Users tab manages people, audio and access in the workspace. Your own access is shown at the top as **My Permission**.

### User Settings

- **Display Name**: the name others see in the session.
- **Mic**: mutes or unmutes you. The level meter shows when your microphone picks up sound. The off-hand controller's primary button (**X**, or **A** in left-handed mode) also toggles mute.

### Users in workspace

Lists the people in the workspace, with their mute status. Their **(...)** menu has **Mute**, to mute them for you.

### Users in organization

Lists colleagues in your organization who are online.

- **Join**: goes to their workspace. When you don't have access, it sends a join request, and the owner can let you in as a Viewer or Editor, or deny it.
- **(+)**: invites them to your workspace. They see a **Join Workspace?** prompt with **Refuse** or **Accept**.

### Share

<vimg src="nanome-v2/v2-7/users-tab-share-dialog.webp" alt="The Share dialog with the workspace code and the people with access" />

The **Share** button at the top right opens the sharing dialog. It shows the workspace code and has:

- **Global permission level**: **None**, **Viewer** or **Editor** for anyone with the code.
- **Add people by email**: adds a person as Editor or Viewer. The address has to match their Nanome account exactly.
- **Email / Permission**: the people with access. Each one's **(...)** menu has **Make Editor** (or **Make Viewer** for an Editor) and, for the workspace owner, **Remove User**.

Viewers can look around, select, point and comment. Measurement, Interactions, Builder, Torsion, Residue Editor, MARA Tools, Load Structure and Open MARA are reserved for Editors. A free license gives Viewer access to workspaces others own.

## Settings Tab

<vimg src="nanome-v2/v2-7/settings-tab.webp" alt="The Settings tab" />

The top row of the Settings tab has:

- **Night mode** (moon icon): switches between the night and day skybox when passthrough is off.
- **Floor** (grid icon): shows or hides the floor overlay.
- **Skybox theme**: Default, Arctic Cyan, Aurora Green, Black & White, Gold Orange, Island or Pure Black. Since release 2.7 the skyboxes are procedurally generated mountains in each theme's colors.
- **Passthrough**: switches between mixed reality and a full skybox. It's on by default on headsets that support passthrough, and grayed out on devices without it.

The switches below:

- **Left-handed mode**: makes the left hand dominant.
- **Allow two-handed grab rotation**: when off, molecules rotate with one hand only.
- **Enable far grab snap-to-hand**: when on, grabbing a distant molecule brings it to your hand.
- **Show other user Avatars**: shows other people's avatars. Off by default.
- **Enable interface sounds**: plays sounds when menu items are used.
- **Show tutorial guides**: shows the in-headset tutorial guides.
- **Show structure box on hover**: draws a labelled box around an entry when it's hovered.

<vimg src="nanome-v2/v2-7/settings-tab-bottom.webp" alt="The bottom of the Settings tab with Log Out and the version" />

The bottom of the tab shows the signed-in username with **Log Out**, and the version with an **About** button. **Change Server** appears when more than one server is configured.

### Day/Night Mode and Themes

Each skybox theme has a day and a night version. Night mode switches between them.

<vimg src="nanome-v2/v2-7/skybox-themes.webp" alt="The seven skybox themes, by day and by night" />
