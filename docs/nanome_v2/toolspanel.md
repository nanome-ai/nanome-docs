---
outline: [2, 3]
title: Tools Panel
---

# Tools Panel

The Tools Panel is the column of buttons on the right side of the Main Panel. Choosing a tool changes what the controller does in 3D and, for every tool but the Pointer, opens that tool's panel. The tools, from top to bottom, and the three buttons below them:

<ScreenMap src="nanome-v2/v2-7/desktop-layout.webp" alt="The Tools Panel, with the Pointer chosen" crop="40.0,9.5,22.3,60.8" label="Tools Panel buttons">
<MapCard icon="droplet" title="Pointer" href="#pointer" side="top" area="50.0,11.3,2.3,4.0">Hover over and select whole residues.</MapCard>
<MapCard icon="lasso" title="Selection Tool" href="#selection-tool" side="left" area="50.0,15.5,2.3,4.0">Build a selection by clicking or dragging over atoms.</MapCard>
<MapCard icon="ruler-2" title="Measurement Tool" href="#measurement-tool" side="left" area="50.0,19.6,2.3,4.0">Measure distances, angles and dihedrals.</MapCard>
<MapCard icon="message" title="Comments" href="#comments" side="left" area="50.0,23.8,2.3,4.0">Comments, text notes and sound notes.</MapCard>
<MapCard icon="link" title="Interactions Tool" href="#interactions-tool" side="left" area="50.0,27.9,2.3,4.0">Browse, pin and label the interactions in the workspace.</MapCard>
<MapCard icon="hexagon-plus-2" title="Builder Tool" href="#builder-tool" side="right" area="50.0,32.0,2.3,4.0">Build and edit ligands, and minimize them, alone or in a binding pocket.</MapCard>
<MapCard icon="rotate-360" title="Torsion Tool" href="#torsion-tool" side="right" area="50.0,36.2,2.3,4.0">Rotate bonds and see torsional strain.</MapCard>
<MapCard icon="arrow-rotary-first-left" title="Residue Editor" href="#residue-editor" side="right" area="50.0,40.4,2.3,4.0">Mutate residues and choose side-chain rotamers.</MapCard>
<MapCard icon="tool" title="MARA Tools" href="#mara-tools" side="right" area="50.0,44.5,2.3,4.0">Run MARA tools from the headset.</MapCard>
<MapCard icon="download" title="Load Structure" href="#load-structure" side="bottom" area="50.0,56.3,2.3,4.0">Load a PDB entry from the RCSB by its code.</MapCard>
<MapCard icon="sparkles" title="Open MARA" href="/mara/overview" side="bottom" area="50.0,60.5,2.3,4.0">Talk to MARA, Nanome's AI assistant.</MapCard>
<MapCard icon="bug" title="Report a problem" href="#report-a-problem" side="bottom" area="50.0,64.6,2.3,4.0">Send a bug report to Nanome.</MapCard>
</ScreenMap>

<Callout type="note" title="Viewer or Editor">

Viewers can use <Btn icon="droplet">Pointer</Btn>, <Btn icon="lasso">Selection Tool</Btn> and <Btn icon="bug">Report a problem</Btn>, and post comments. Everything else needs Editor access: the other tools, the Selection Tool's **Create** button, the Comments tool's Text, Sound and Delete modes and hiding annotations, <Btn icon="download">Load Structure</Btn> and <Btn icon="sparkles">Open MARA</Btn>.

</Callout>

## <AppIcon name="droplet" /> Pointer {#pointer}

The Pointer is the default tool.

- It highlights whole residues as it passes over them.
- A trigger pull adds the hovered residue to the selection, or removes it.
- To clear the selection, aim your dominant hand at the sky (within 30° of straight up, with nothing under the pointer) and pull the trigger. A **Deselect all** hint shows while you're aimed there. This works with any tool.
- Pointing at an interaction, a measurement or a text note shows a tooltip with its details, such as the interaction type, the distance and the groups involved.

The off-hand controller always works as a pointer for hovering and selecting, whatever tool the main hand holds.

## <AppIcon name="lasso" /> Selection Tool {#selection-tool}

<ShotRow src="nanome-v2/v2-7/tool-selection.webp" alt="The Selection Tool panel">

The Selection Tool selects by clicking on atoms, or by dragging over them. The three buttons at the top set what a click picks:

<UiList label="Selection modes">
<UiItem icon="atom" name="Atom" area="22.8,9.8,23.2,5.4">A click picks an atom.</UiItem>
<UiItem icon="hexagons" name="Residue" area="46.6,9.8,23.4,5.4">A click picks a residue.</UiItem>
<UiItem icon="scribble" name="Chain" area="70.5,9.8,23.5,5.4">A click picks a chain.</UiItem>
</UiList>

The panel counts the entries, chains, residues and atoms in the selection, and lists the components it touches. Below that:

<UiList label="Selection switches and buttons">
<UiItem name="Share selection" area="25.5,79.0,67.9,4.5">Shows your selection to others in your color.</UiItem>
<UiItem name="Show partial marks" area="25.5,85.1,67.9,4.6">Marks entries and components in the Components tab that are partly selected.</UiItem>
<UiItem name="Clear" area="53.7,91.5,18.8,5.7">Clears the selection.</UiItem>
<UiItem name="Create" area="73.9,91.5,21.2,5.7">Creates a component from the selection.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="ruler-2" /> Measurement Tool {#measurement-tool}

<ShotRow src="nanome-v2/v2-7/tool-measurement.webp" alt="The Measurement Tool panel">

The Measurement Tool measures between atoms picked in 3D. The buttons at the top set the mode:

<UiList label="Measurement modes">
<UiItem icon="ruler-measure" name="Distance" area="22.8,9.8,17.2,5.4">2 atoms, in Å.</UiItem>
<UiItem icon="angle" name="Angle" area="40.8,9.8,17.2,5.4">3 atoms, measured at the second atom, in degrees.</UiItem>
<UiItem icon="rotate-clockwise-2" name="Dihedral" area="58.8,9.8,17.2,5.4">4 atoms: the torsion around the axis from atom 2 to atom 3, in degrees.</UiItem>
<UiItem icon="trash" name="Delete" area="76.6,9.8,17.3,5.4">Removes measurements by clicking them.</UiItem>
</UiList>

Each measurement is listed in the panel with its type and value. Hovering a row highlights the measurement in 3D.

<UiList label="Measurement row">
<UiItem icon="zoom" name="Zoom" area="70.7,25.6,10.3,5.7">Zooms to the measurement.</UiItem>
<UiItem icon="trash" name="Delete" area="81.5,25.6,10.3,5.7">Deletes the measurement, after a second click to confirm.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="nanome-v2/v2-7/measurement-types.webp" alt="A distance from the 1KV2 ligand to Met109, and a dihedral and an angle on the ligand">

<Callout type="note" title="Dihedrals show without a sign">

Dihedral angles show from 0° to 180° without a sign, so torsions of −60° and +60° both read 60°.

</Callout>

</ShotRow>

## <AppIcon name="message" /> Comments {#comments}

<DocVideo src="v2-7/comments.mp4" caption="Comments in Nanome Web, from the v2.7 release video. The Agent tag in the video is for illustration." />

Since release 2.7, comments and annotations share one panel: the Comments tool. It holds the workspace's comments and its text and sound notes. A comment can belong to the whole workspace, to a scene or to an annotation, and it can point at specific atoms. Comments appear for everyone in the workspace as they're posted, in Nanome XR and in Nanome Web.

### The panel {#the-panel}

<ShotRow src="nanome-v2/v2-7/tool-comments.webp" alt="The Comments tool panel">

<UiList label="Comments panel">
<UiItem icon="text-size" name="Text" area="15.4,9.8,24.4,5.6">Editors only: places a text note in 3D.</UiItem>
<UiItem icon="volume" name="Sound" area="40.4,9.8,27.2,5.6">Editors only: records a sound note.</UiItem>
<UiItem icon="trash" name="Delete" area="68.6,9.8,27.4,5.6">Editors only: removes notes.</UiItem>
<UiItem icon="list" name="Filter" area="80.4,16.0,16.3,5.8">All, Workspace (comments on the workspace itself) or Scene (comments on the current scene).</UiItem>
<UiItem name="Comment on this workspace" area="14.6,87.2,82.1,10.1">The box at the bottom: posts a new comment.</UiItem>
</UiList>

A count shows how many comments match the filter.

</ShotRow>

A dot on the Comments tool's button shows that there are unread comments.

### Threads {#threads}

Each comment starts a thread.

<UiList label="Thread">
<UiItem icon="message" name="Reply in thread">Replies to the comment.</UiItem>
<UiItem name="@mentions">Mentions colleagues by name.</UiItem>
<UiItem icon="mood-plus" name="Reactions">Thumbs up, thumbs down and an emoji picker.</UiItem>
<UiItem name="Edit / Delete">For the comment's author only. An edited comment is marked (edited).</UiItem>
<UiItem name="Watch thread / Unwatch thread">Follows a thread's changes, or stops following them.</UiItem>
<UiItem icon="circle-dot" name="Atom chip">A link to specific atoms. Selecting it highlights those atoms and zooms to them.</UiItem>
</UiList>

### Text and sound notes {#text-and-sound-notes}

- A text note has **Text**, **Size** and **Color**. Pointing at a text note in 3D shows a tooltip with its text.
- A sound note has a **Title**, a <Btn icon="microphone">Record</Btn> button and a playback speed. Recordings can be up to 5 minutes long, and the recorder shows the elapsed and maximum time.

### Hiding annotations {#hiding-annotations}

<UiList label="Hiding annotations">
<UiItem icon="eye" name="Visibility">On each annotation row: hides or shows it.</UiItem>
<UiItem icon="eye" name="Hide all annotations">In the panel header. Show all annotations brings them back.</UiItem>
</UiList>

Hidden annotations stay in the workspace and can be shown again.

## <AppIcon name="link" /> Interactions Tool {#interactions-tool}

The Interactions Tool lists the interactions in the workspace, grouped by entry and interaction type. Each row names the two atoms, such as `A'MET'109:N—A'B96'391:O47`. For a ring or a charged group, the row names its residue. Hovering a row highlights the interaction in 3D.

<ShotRow src="nanome-v2/v2-7/tool-interactions.webp" alt="The Interactions Tool listing hydrogen bonds in 1KV2">

<UiList label="Interactions tabs">
<UiItem icon="eye" name="Visible" area="15.4,9.8,28.5,5.5">The visible interactions.</UiItem>
<UiItem icon="pin" name="Pinned" area="44.6,9.8,28.5,5.5">The pinned ones.</UiItem>
<UiItem icon="list" name="All" area="73.8,9.8,22.1,5.5">All of them.</UiItem>
</UiList>

<UiList label="Interaction row">
<UiItem icon="zoom" name="Zoom" area="73.1,31.8,6.8,5.6">Zooms to the interaction.</UiItem>
<UiItem icon="dots" name="More options" area="80.3,31.8,6.8,5.6">Pin. For a pinned interaction: Unpin, Label, and Show Label or Hide Label.</UiItem>
</UiList>

</ShotRow>

Interaction types and how they're detected are on the [Main Panel](/nanome_v2/mainpanel#interactions) page.

## <AppIcon name="hexagon-plus-2" /> Builder Tool {#builder-tool}

<DocVideo src="v2-7/builder-minimization-settings.mp4" caption="Auto relax and the minimization settings in the Builder Tool, from the v2.7 release." />

<ShotRow src="nanome-v2/v2-7/tool-builder.webp" alt="The Builder Tool panel before a ligand is picked">

The Builder Tool builds new ligands and edits existing ones. On opening, the panel reads **Select a ligand in 3D space or use the list below to edit**: picking a ligand in 3D or in the list opens it for editing, and **Create New** starts a new one. A long press, shown as **Hold to build new ligand**, also starts one.

</ShotRow>

### Modes

<ShotRow src="nanome-v2/v2-7/builder-edit.webp" alt="The Builder Tool while editing a ligand">

<UiList label="Builder modes">
<UiItem icon="plus" name="Build" area="4.2,9.0,23.2,6.4">Adds atoms and groups.</UiItem>
<UiItem icon="replace" name="Replace" area="28.0,9.0,22.7,6.4">Swaps an atom or group for another. It can also fuse a ring fragment onto an existing ring.</UiItem>
<UiItem icon="line" name="Bond" area="51.2,9.0,22.4,6.4">Clicking two atoms bonds them, and clicking a bond changes its order.</UiItem>
<UiItem icon="trash" name="Delete" area="74.2,9.0,23.2,6.4">Clicking atoms or bonds deletes them.</UiItem>
</UiList>

Along the bottom of the panel:

<UiList label="Builder bottom bar">
<UiItem name="Auto relax" area="3.9,77.1,34.4,5.7">Beside Minimize: relaxes the nearby geometry after every edit.</UiItem>
<UiItem icon="minimize" name="Minimize" href="#minimize" area="44.0,77.1,40.2,5.8">Runs a force-field minimization on the ligand.</UiItem>
<UiItem icon="settings" name="Minimization settings" href="#minimize" area="84.5,77.1,12.6,5.8">Receptor, algorithm, force field and number of steps.</UiItem>
<UiItem icon="arrow-back-up" name="Undo" area="3.9,92.3,12.6,5.7">Steps back through edits and minimizations.</UiItem>
<UiItem icon="arrow-forward-up" name="Redo" area="17.1,92.3,12.9,5.7">Steps forward through them again.</UiItem>
<UiItem name="Cancel" area="38.9,92.3,27.5,5.7">Discards the changes.</UiItem>
<UiItem icon="device-floppy" name="Save" href="#saving" area="67.0,92.3,30.1,5.7">Keeps the changes.</UiItem>
</UiList>

While a minimization runs, <AppIcon name="x" /> **Cancel minimization** stops it.

</ShotRow>

<ShotRow src="nanome-v2/v2-7/builder-categories.webp" alt="The six fragment categories in the Builder Tool">

In **Build**, groups come from **Recent**, **Atoms**, **Rings**, **R Groups**, **Amino Acids**, **BioMolecules** and **Functional Groups**. The atoms are H, C, N, O, F, P, S and Cl.

</ShotRow>

<AccordionGroup label="Building details">

<Accordion title="Attachment points" teaser="How fragments preview, snap and attach.">

Since release 2.7, each atom offers attachment points that follow its valence and hybridization. Bringing a fragment to an attachment point previews it. Twisting it around the new bond snaps to favorable torsions (staggered positions for sp³ bonds, ±44° for biaryl bonds, and planar for conjugated bonds), and releasing it attaches it. Rings close automatically. Aromaticity is recalculated after every edit.

</Accordion>

<Accordion title="Fusing rings with Replace" teaser="Overlapping atoms merge, with an aromatic preview.">

When **Replace** fuses a ring fragment onto an existing ring, it merges the atoms that overlap, with an aromatic preview before it's committed.

</Accordion>

<Accordion title="Auto relax" teaser="What it runs, and when it's off.">

**Auto relax** runs up to 200 iterations of MMFF94s on the atoms within 2 bonds of the change. It's off by default and the setting is remembered. It's unavailable while a receptor is chosen for minimization.

</Accordion>

</AccordionGroup>

### Minimize

<ShotRow src="nanome-v2/v2-7/builder-minimization-settings.webp" alt="The minimization settings with no receptor">

**Minimize** runs a force-field minimization on the ligand. <Btn icon="settings">Minimization settings</Btn> opens:

<UiList label="Minimization settings">
<UiItem name="Receptor" href="#pocket-minimization" area="61.8,61.3,36.9,7.5">None (vacuum) minimizes the ligand on its own. Choosing an entry minimizes it inside that entry's binding pocket.</UiItem>
<UiItem name="Algorithm" area="61.8,69.5,36.9,7.5">The menu lists Steepest Descent. The minimization itself runs RDKit's force-field minimizer, which uses the BFGS method.</UiItem>
<UiItem name="Force field" area="61.8,77.7,36.9,7.5">MMFF94, MMFF94s or UFF.</UiItem>
<UiItem name="Number of steps" area="61.8,86.0,36.9,7.5">50, 100, 200, 500, 1000 or 5000. This is a maximum, and minimization stops earlier when it converges.</UiItem>
<UiItem name="Apply" area="84.9,95.1,13.6,4.1">Keeps the settings.</UiItem>
</UiList>

When it finishes, the panel shows the energy in kJ/mol.

</ShotRow>

<Callout type="note" title="Reading the energy">

In vacuum, the energy is the force field's conformational energy for the ligand. In a pocket, it's the force-field energy that the minimization tool reports for the minimized system. Neither is a binding energy or an affinity. Values from different force fields, different molecules or different pockets can't be compared with each other.

</Callout>

### Pocket minimization {#pocket-minimization}

<DocVideo src="v2-7/pocket-minimization.mp4" caption="Pocket minimization in Nanome XR, from the v2.7 release." />

<ShotRow src="nanome-v2/v2-7/builder-pocket-minimization-settings.webp" alt="The minimization settings with 1KV2 chosen as the receptor">

Since release 2.7, a ligand can be minimized in place inside a receptor's binding site. With a receptor entry chosen as the **Receptor**, the settings include:

<UiList label="Pocket minimization settings">
<UiItem name="Receptor flexibility" area="53.0,74.6,45.9,10.7">Chooses what else moves: Rigid receptor, Flexible pocket or Flexible side chains.</UiItem>
<UiItem name="Pocket radius (Å)" area="53.0,85.8,45.9,7.8">How far from the ligand the pocket reaches, from 2 Å to 10 Å, with 4 Å by default.</UiItem>
</UiList>

The result shows the **Energy** in kJ/mol, the **Ligand RMSD** and the **Pocket RMSD**. A run can be cancelled or undone.

</ShotRow>

<Callout type="note" title="Ligands with metals">

Ligands that contain metal atoms can't be minimized in a pocket, because the ligand force field and charge model don't cover metals.

</Callout>

<AccordionGroup label="Pocket minimization details">

<Accordion title="Force fields and charges" teaser="OpenMM, Amber14, OpenFF, TIP3P and OpenFF NAGL.">

Choosing a receptor entry shows what the minimization runs with: OpenMM, using the Amber14 and OpenFF force fields and TIP3P water parameters, with ligand partial charges from OpenFF NAGL.

</Accordion>

<Accordion title="Receptor flexibility" teaser="What moves in each of the three options.">

- **Rigid receptor**: only the ligand moves.
- **Flexible pocket**: the ligand and every receptor atom in the pocket move. The rest of the protein stays fixed.
- **Flexible side chains**: the ligand and the pocket's side-chain atoms move. Backbone atoms (N, Cα, C and O) stay fixed.

</Accordion>

<Accordion title="Which residues are in the pocket" teaser="Whole residues near any ligand heavy atom.">

The pocket is every whole residue with a heavy atom within the **Pocket radius** of a ligand heavy atom.

</Accordion>

<Accordion title="Reading the results" teaser="Energy, ligand RMSD and pocket RMSD.">

- **Energy**, in kJ/mol.
- **Ligand RMSD**: how far the ligand's heavy atoms moved from their starting positions, in Å. It's measured in place, without superposition.
- **Pocket RMSD**: the same measure for the receptor atoms that were allowed to move. With a rigid receptor it reads 0 Å.

</Accordion>

</AccordionGroup>

### Saving

<ShotRow src="nanome-v2/v2-7/builder-save-options.webp" alt="The Save menu with Add new ligand and Update current ligand">

A ligand that started from **Create New** is saved as a new ligand. An existing ligand can be saved with **Add new ligand** or **Update current ligand**.

</ShotRow>

## <AppIcon name="rotate-360" /> Torsion Tool {#torsion-tool}

<ShotRow src="nanome-v2/v2-7/tool-torsion.webp" alt="The Torsion Tool panel with its structure list">

The Torsion Tool rotates bonds to change a structure's conformation. A structure is chosen in 3D, or from the list:

<UiList label="Torsion structure list">
<UiItem name="All Chains" area="23.2,21.6,70.2,6.6">Every residue in every chain.</UiItem>
<UiItem name="All Ligands" area="23.2,28.5,70.2,6.6">Every ligand.</UiItem>
<UiItem name="Chain A" area="23.2,35.3,70.2,6.5">Every residue in one chain.</UiItem>
<UiItem name="A:B96_391" area="23.2,42.1,70.2,6.6">One ligand.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="nanome-v2/v2-7/torsion-after.webp" alt="The Torsion Tool with Display torsion strain turned on for 1KV2">

Clicking and holding on a bond rotates the atoms on one side of it. **Display torsion strain for the entire structure** colors atoms by an estimate of the torsional strain in the rotatable single bonds around them.

<UiList label="Torsion Tool buttons">
<UiItem icon="arrow-back-up" name="Undo" area="9.7,91.5,4.5,5.7">Steps back through changes.</UiItem>
<UiItem icon="arrow-forward-up" name="Redo" area="14.4,91.5,4.5,5.7">Steps forward through them again.</UiItem>
<UiItem name="Cancel" area="21.9,91.5,9.6,5.7">Discards the changes.</UiItem>
<UiItem icon="device-floppy" name="Save" area="31.8,91.5,10.6,5.7">Keeps the changes.</UiItem>
</UiList>

</ShotRow>

<Accordion title="How torsion strain is estimated" teaser="A cosine term for each rotatable bond's dihedral.">

The estimate is a simple cosine term for the dihedral angle (3-fold for sp³-sp³ bonds, 1-fold otherwise), useful for spotting eclipsed or strained bonds. It isn't a force-field energy.

</Accordion>

### Video: Torsion Tool

<YoutubeEmbed videoId="IBQeKcSOJ8A" title="Nanome v2.5 Quick Tips: Torsion Tool (Beta)" />

## <AppIcon name="arrow-rotary-first-left" /> Residue Editor {#residue-editor}

The Residue Editor mutates protein residues and picks their side-chain rotamers. Its rotamer library is the 2010 backbone-dependent library from the Dunbrack lab.

It works on the selected protein residues. Picking one in its list edits that residue. Moving the thumbstick left or right previews the rotamers, scored for clashes and hydrogen bonds.

<ShotRow src="nanome-v2/v2-7/tool-residue-editor.webp" alt="The Residue Editor panel">

<UiList label="Residue Editor">
<UiItem icon="info-circle" name="Rotamer library" area="92.2,3.4,5.0,4.0">Hovering shows the library in use.</UiItem>
<UiItem name="Residues" area="14.6,13.3,82.6,21.9">The selected residues, grouped by entry. Pick one to edit it.</UiItem>
<UiItem name="Mutate" area="74.0,37.1,21.6,6.0">Changes the residue to another amino acid.</UiItem>
<UiItem name="Rotamers" area="14.6,44.9,82.6,36.0">One row per rotamer, with Orig. for the current side chain. The arrows sort by P, Clash or HB.</UiItem>
<UiItem name="Score against" area="36.0,81.5,40.9,6.0">Whether the scoring counts Visible atoms only or All atoms.</UiItem>
<UiItem name="Cancel" area="65.7,91.7,14.9,6.0">Discards the changes.</UiItem>
<UiItem icon="device-floppy" name="Save" area="80.6,91.7,16.6,6.0">Keeps the changes.</UiItem>
</UiList>

</ShotRow>

<AccordionGroup label="Residue Editor details">

<Accordion title="The rotamer table columns" teaser="P, Clash, HB and the chi angles.">

- **P**: how often the rotamer occurs in the library for this residue's backbone angles, from 0 to 1.
- **Clash**: clashes between the residue and the atoms around it.
- **HB**: potential hydrogen bonds between the residue and the atoms around it.
- **Chi1**, **Chi2** and so on: the side-chain dihedral angles, in degrees. A residue gets one column for each chi angle it has.

</Accordion>

<Accordion title="Which residues it works on" teaser="The picked residue and up to 5 of its neighbors.">

The editor works on the picked residue plus up to 5 of the other selected residues whose Cα atoms are nearest to it. Residues from several entries are grouped by entry.

</Accordion>

</AccordionGroup>

## <AppIcon name="tool" /> MARA Tools {#mara-tools}

MARA Tools runs your MARA tools from the headset. Tools are managed on the Tools page in [Nanome Web](https://app.nanome.ai/tools).

<ShotRow src="nanome-v2/v2-7/tool-mara-beta.webp" alt="The notice that MARA Tools in XR are in beta" crop="13,26,87,48">

The panel opens with a notice: MARA Tools in XR are in beta. Every tool is listed, but some rely on inputs or outputs that XR doesn't support yet and may fail to run or show their results.

<UiList label="Beta notice">
<UiItem name="Continue" area="47.1,61.4,17.4,6.0">Opens the tool list.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="nanome-v2/v2-7/tool-mara.webp" alt="The MARA Tools list">

<UiList label="MARA Tools list">
<UiItem icon="filter" name="Filter" area="15.2,9.2,31.2,6.7">All, Pinned, Disabled, or a single category.</UiItem>
<UiItem name="Search" area="47.9,9.2,48.7,6.7">Searches the tool list.</UiItem>
<UiItem name="Tool" area="16.6,19.1,75.4,15.9">Its name and the start of its description. Pick one to open it.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="nanome-v2/v2-7/tool-mara-tool.webp" alt="The page for one tool, the 3D conformer generator">

<UiList label="Tool page">
<UiItem icon="arrow-left" name="Back" area="14.6,2.4,16.6,6.0">Returns to the tool list.</UiItem>
<UiItem icon="pin" name="Pin" area="89.9,2.4,7.3,6.0">Adds the tool to the Pinned filter. Selecting it again unpins it.</UiItem>
<UiItem name="Description" area="14.6,13.3,79.8,79.6">What the tool does, with its inputs below.</UiItem>
<UiItem icon="player-play" name="Run" area="81.8,91.7,15.3,6.0">Runs the tool.</UiItem>
</UiList>

After a run, the page shows the result and any output files, and <AppIcon name="refresh" /> **Reset** clears them.

</ShotRow>

## <AppIcon name="download" /> Load Structure {#load-structure}

**Load Structure** opens a box for a PDB code. <Btn>Load from RCSB</Btn> downloads the entry into the workspace. Other formats are loaded in [Nanome Web](/nanome_web/loading).

## <AppIcon name="bug" /> Report a problem {#report-a-problem}

**Report a problem** opens a message box of up to 1,000 characters. A screenshot and technical details (app version, workspace, scene and recent errors) are sent with the message.
