---
outline: [2, 3]
title: Tools Panel
---

# Tools Panel

The Tools Panel is the column of buttons on the right side of the Main Panel. Choosing a tool changes what the controller does in 3D and opens that tool's panel. The tools, from top to bottom, and the three more buttons below them:

<ScreenMap src="nanome-v2/v2-7/desktop-layout.webp" alt="The Tools Panel, with the Pointer chosen" crop="40.0,9.5,22.3,60.8" label="Tools Panel buttons">
<MapCard icon="droplet" title="Pointer" href="#pointer" side="top" area="50.0,11.3,2.3,4.0">Hover over and select residues and atoms.</MapCard>
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

Viewers can use <Btn icon="droplet">Pointer</Btn> and <Btn icon="lasso">Selection Tool</Btn>, and post comments. Everything else needs Editor access: the other tools, the Comments tool's Text, Sound and Delete modes, <Btn icon="download">Load Structure</Btn> and <Btn icon="sparkles">Open MARA</Btn>.

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

Each measurement is listed in the panel. Hovering a row highlights the measurement in 3D.

<UiList label="Measurement row">
<UiItem icon="zoom" name="Zoom">Zooms to the measurement.</UiItem>
<UiItem icon="trash" name="Delete">Deletes the measurement.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="nanome-v2/v2-7/measurement-types.webp" alt="A distance, a dihedral and an angle measured on the 1KV2 ligand">

<Callout type="note" title="Dihedrals have no sign">

Dihedral angles show from 0° to 180° without a sign, so torsions of −60° and +60° both read 60°.

</Callout>

</ShotRow>

## <AppIcon name="message" /> Comments {#comments}

<ShotRow src="nanome-v2/v2-7/tool-comments.webp" alt="The Comments tool panel">

The Comments tool holds the workspace's comments and its text and sound notes. Its modes are <Btn icon="text-size">Text</Btn>, <Btn icon="volume">Sound</Btn> and <Btn icon="trash">Delete</Btn>. It's covered on [Comments & Annotations](/nanome_v2/comments).

</ShotRow>

## <AppIcon name="link" /> Interactions Tool {#interactions-tool}

The Interactions Tool lists the interactions in the workspace, grouped by entry and interaction type. Each row names the two atoms, such as `A'MET'109:N—A'B96'391:O47`. Hovering a row highlights the interaction in 3D.

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

<ShotRow src="nanome-v2/v2-7/builder-edit.webp" alt="The Builder Tool editing a ligand, with its controls labelled">

<UiList label="Builder modes">
<UiItem icon="plus" name="Build" area="36.0,9.0,8.1,6.4">Adds atoms and groups.</UiItem>
<UiItem icon="replace" name="Replace" area="44.3,9.0,7.9,6.4">Swaps an atom or group for another. It can also fuse a ring fragment onto an existing ring.</UiItem>
<UiItem icon="line" name="Bond" area="52.4,9.0,7.8,6.4">Clicking two atoms bonds them, and clicking a bond changes its order.</UiItem>
<UiItem icon="trash" name="Delete" area="60.4,9.0,8.1,6.4">Clicking atoms or bonds deletes them.</UiItem>
</UiList>

Along the bottom of the panel:

<UiList label="Builder bottom bar">
<UiItem name="Auto relax" area="35.9,77.1,12.0,5.7">Beside Minimize: relaxes the nearby geometry after every edit.</UiItem>
<UiItem icon="minimize" name="Minimize" href="#minimize" area="49.9,77.1,14.0,5.8">Runs a force-field minimization on the ligand.</UiItem>
<UiItem icon="settings" name="Minimization settings" href="#minimize" area="64.0,77.1,4.4,5.8">Receptor, algorithm, force field and number of steps.</UiItem>
<UiItem icon="x" name="Cancel minimization">Stops a run.</UiItem>
<UiItem icon="arrow-back-up" name="Undo" area="35.9,92.3,4.4,5.7">Steps back through edits and minimizations.</UiItem>
<UiItem icon="arrow-forward-up" name="Redo" area="40.5,92.3,4.5,5.7">Steps forward through them again.</UiItem>
<UiItem name="Cancel" area="48.1,92.3,9.6,5.7">Discards the changes.</UiItem>
<UiItem icon="device-floppy" name="Save" href="#saving" area="57.9,92.3,10.5,5.7">Keeps the changes.</UiItem>
</UiList>

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

**Auto relax** runs up to 200 iterations of MMFF94s on the atoms within 2 bonds of the change. It's off by default, the setting is remembered, and it's turned off while a receptor is chosen for minimization.

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
<UiItem icon="device-floppy" name="Save" area="31.8,91.5,10.6,5.7">Commits the changes.</UiItem>
</UiList>

</ShotRow>

<Accordion title="How torsion strain is estimated" teaser="A cosine term for each rotatable bond's dihedral.">

The estimate is a simple cosine term for the dihedral angle (3-fold for sp³-sp³ bonds, 1-fold otherwise), useful for spotting eclipsed or strained bonds. It isn't a force-field energy.

</Accordion>

### Video: Torsion Tool (Beta)

<YoutubeEmbed videoId="IBQeKcSOJ8A" title="Nanome v2.5 Quick Tips: Torsion Tool (Beta)" />

## <AppIcon name="arrow-rotary-first-left" /> Residue Editor {#residue-editor}

The Residue Editor mutates protein residues and picks their side-chain rotamers. Its rotamer library is the 2010 backbone-dependent library from the Dunbrack lab.

Select one or more protein residues, then pick one. Moving the thumbstick left or right previews the rotamers, scored for clashes and hydrogen bonds.

<ShotRow src="nanome-v2/v2-7/tool-residue-editor.webp" alt="The Residue Editor panel">

<UiList label="Residue Editor">
<UiItem name="Mutate">Changes the residue to another amino acid.</UiItem>
<UiItem name="Score against" area="14.7,81.5,61.8,5.7">Whether the rotamer scoring counts Visible atoms only or All atoms.</UiItem>
<UiItem name="Cancel" area="65.4,91.5,14.7,5.7">Discards the change.</UiItem>
<UiItem icon="device-floppy" name="Save" area="80.4,91.5,16.2,5.7">Keeps the change.</UiItem>
</UiList>

</ShotRow>

<Accordion title="Which residues it works on" teaser="The picked residue and up to 5 of its neighbors.">

The editor works on the picked residue plus up to 5 of the other selected residues whose Cα atoms are nearest to it. Residues from several entries are grouped by entry.

</Accordion>

## <AppIcon name="tool" /> MARA Tools {#mara-tools}

MARA Tools runs your MARA tools from the headset. The panel opens with a notice: MARA Tools in XR are in beta, and some tools rely on inputs or outputs that XR doesn't support yet.

<ShotRow src="nanome-v2/v2-7/tool-mara.webp" alt="The MARA Tools list">

<UiList label="MARA Tools">
<UiItem name="Continue">Opens the tool list.</UiItem>
<UiItem name="Search" area="47.9,9.2,48.7,6.7">Searches the tool list.</UiItem>
<UiItem icon="player-play" name="Run">Runs the tool.</UiItem>
<UiItem icon="refresh" name="Reset">Resets the run.</UiItem>
<UiItem icon="arrow-left" name="Back">Returns to the tool list.</UiItem>
</UiList>

</ShotRow>

Tools are managed on the Tools page in [Nanome Web](https://app.nanome.ai/tools).

## <AppIcon name="download" /> Load Structure {#load-structure}

**Load Structure** opens a box for a PDB code. <Btn>Load from RCSB</Btn> downloads the entry into the workspace. Other formats are loaded in [Nanome Web](/nanome_web/loading).

## <AppIcon name="bug" /> Report a problem {#report-a-problem}

**Report a problem** opens a message box of up to 1,000 characters. A screenshot and technical details (app version, workspace, scene and recent errors) are sent with the message.
