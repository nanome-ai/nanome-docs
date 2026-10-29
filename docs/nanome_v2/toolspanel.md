---
title: Tools Panel
---

# Tools Panel

The Tools Panel is the column of buttons on the right side of the Main Panel. Choosing a tool changes what the controller does in 3D and opens that tool's panel. The tools, from top to bottom:

<ToolGrid>
  <ToolLink icon="droplet" title="Pointer" href="#pointer">Hover over and select residues and atoms.</ToolLink>
  <ToolLink icon="lasso" title="Selection Tool" href="#selection-tool">Build a selection by clicking or dragging over atoms.</ToolLink>
  <ToolLink icon="ruler-2" title="Measurement Tool" href="#measurement-tool">Measure distances, angles and dihedrals.</ToolLink>
  <ToolLink icon="message" title="Comments" href="#comments">Comments, text notes and sound notes.</ToolLink>
  <ToolLink icon="link" title="Interactions Tool" href="#interactions-tool">Browse, pin and label the interactions in the workspace.</ToolLink>
  <ToolLink icon="hexagon-plus-2" title="Builder Tool" href="#builder-tool">Build and edit ligands, and minimize them, alone or in a binding pocket.</ToolLink>
  <ToolLink icon="rotate-360" title="Torsion Tool" href="#torsion-tool">Rotate bonds and see torsional strain.</ToolLink>
  <ToolLink icon="arrow-rotary-first-left" title="Residue Editor" href="#residue-editor">Mutate residues and choose side-chain rotamers.</ToolLink>
  <ToolLink icon="tool" title="MARA Tools" href="#mara-tools">Run MARA tools from the headset.</ToolLink>
</ToolGrid>

Below the tools are three more buttons:

<ToolGrid>
  <ToolLink icon="download" title="Load Structure" href="#load-structure">Load a PDB entry from the RCSB by its code.</ToolLink>
  <ToolLink icon="sparkles" title="Open MARA" href="/mara/overview">Talk to MARA, Nanome's AI assistant.</ToolLink>
  <ToolLink icon="bug" title="Report a problem" href="#report-a-problem">Send a bug report to Nanome.</ToolLink>
</ToolGrid>

Viewers can use the Pointer and the Selection Tool, and can post comments, though the Comments tool's Text, Sound and Delete modes need Editor access. The other tools, Load Structure and Open MARA need Editor access too.

## <AppIcon name="droplet" /> Pointer {#pointer}

The Pointer is the default tool. It highlights whole residues as it passes over them, and a trigger pull adds the hovered residue to the selection, or removes it. Pointing at empty space and pulling the trigger clears the selection.

Pointing at an interaction, a measurement or a text note shows a tooltip with its details, such as the interaction type, the distance and the groups involved.

The off-hand controller always works as a pointer for hovering and selecting, whatever tool the main hand holds.

## <AppIcon name="lasso" /> Selection Tool {#selection-tool}

<vimg src="nanome-v2/v2-7/tool-selection.webp" alt="The Selection Tool panel" />

The Selection Tool selects by clicking on atoms, or by dragging over them. The three buttons at the top set what a click picks: a **chain**, a **residue** or an **atom**.

The panel counts the entries, chains, residues and atoms in the selection, and lists the components it touches. Below that:

- **Share selection**: shows your selection to others in your color.
- **Show partial marks**: marks entries and components in the Components tab that are partly selected.
- **Clear**: clears the selection.
- **Create**: creates a component from the selection.

## <AppIcon name="ruler-2" /> Measurement Tool {#measurement-tool}

<vimg src="nanome-v2/v2-7/tool-measurement.webp" alt="The Measurement Tool panel" />

The Measurement Tool measures between atoms picked in 3D. Its modes are **Distance** (2 atoms, in Å), **Angle** (3 atoms, measured at the second atom, in degrees), **Dihedral** (4 atoms, the torsion around the axis from atom 2 to atom 3, in degrees) and **Delete**, which removes measurements by clicking them. Dihedral angles show from 0° to 180° without a sign, so torsions of −60° and +60° both read 60°.

Each measurement is listed in the panel, with buttons to zoom to it and to delete it. Hovering a row highlights the measurement in 3D.

<vimg src="nanome-v2/v2-7/measurement-types.webp" alt="A distance, a dihedral and an angle measured on the 1KV2 ligand" />

## <AppIcon name="message" /> Comments {#comments}

<vimg src="nanome-v2/v2-7/tool-comments.webp" alt="The Comments tool panel" />

The Comments tool holds the workspace's comments and its text and sound notes. Its modes are **Text**, **Sound** and **Delete**. It's covered on [Comments & Annotations](/nanome_v2/comments).

## <AppIcon name="link" /> Interactions Tool {#interactions-tool}

<vimg src="nanome-v2/v2-7/tool-interactions.webp" alt="The Interactions Tool listing hydrogen bonds in 1KV2" />

The Interactions Tool lists the interactions in the workspace, grouped by entry and interaction type. Each row names the two atoms, such as `A'MET'109:N—A'B96'391:O47`. The tabs show **Visible** interactions, **Pinned** ones, or **All**.

Each row has a button to zoom to the interaction and a menu with **Pin**. For a pinned interaction, the menu has **Unpin**, **Label**, and **Show Label** or **Hide Label**. Hovering a row highlights the interaction in 3D. Interaction types and how they're detected are on the [Main Panel](/nanome_v2/mainpanel#interactions) page.

## <AppIcon name="hexagon-plus-2" /> Builder Tool {#builder-tool}

<DocVideo src="v2-7/builder-minimization-settings.mp4" caption="Auto relax and the minimization settings in the Builder Tool, from the v2.7 release." />

<vimg src="nanome-v2/v2-7/tool-builder.webp" alt="The Builder Tool panel before a ligand is picked" />

The Builder Tool builds new ligands and edits existing ones. On opening, the panel reads **Select a ligand in 3D space or use the list below to edit**: picking a ligand in 3D or in the list opens it for editing, and **Create New** starts a new one. A long press, shown as **Hold to build new ligand**, also starts one.

### Modes

- **Build**: adds atoms and groups. Groups come from **Recent**, **Atoms**, **Rings**, **R Groups**, **Amino Acids**, **BioMolecules** and **Functional Groups**. The atoms are H, C, N, O, F, P, S and Cl.
- **Replace**: swaps an atom or group for another. Replace can also fuse a ring fragment onto an existing ring, merging the atoms that overlap, with an aromatic preview before it's committed.
- **Bond**: clicking two atoms bonds them, and clicking a bond changes its order.
- **Delete**: clicking atoms or bonds deletes them.

<vimg src="nanome-v2/v2-7/builder-edit.webp" alt="The Builder Tool editing a ligand, with its controls labelled" />

<vimg src="nanome-v2/v2-7/builder-categories.webp" alt="The six fragment categories in the Builder Tool" />

### Attachment points

Since release 2.7, each atom offers attachment points that follow its valence and hybridization. Bringing a fragment to an attachment point previews it. Twisting it around the new bond snaps to favorable torsions (staggered positions for sp³ bonds, ±44° for biaryl bonds, and planar for conjugated bonds), and releasing it attaches it. Rings close automatically. Aromaticity is recalculated after every edit.

### Auto relax

**Auto relax**, beside Minimize, relaxes the nearby geometry after every edit. It runs up to 200 iterations of MMFF94s on the atoms within 2 bonds of the change. It's off by default, the setting is remembered, and it's turned off while a receptor is chosen for minimization.

### Minimize

<vimg src="nanome-v2/v2-7/builder-minimization-settings.webp" alt="The minimization settings with no receptor" />

**Minimize** runs a force-field minimization on the ligand. The **Minimization settings** button (the gear) opens:

- **Receptor**: **None (vacuum)** minimizes the ligand on its own. Choosing an entry minimizes the ligand inside that entry's binding pocket. See [Pocket minimization](#pocket-minimization).
- **Algorithm**: the menu lists Steepest Descent. The minimization itself runs RDKit's force-field minimizer, which uses the BFGS method.
- **Force field**: MMFF94, MMFF94s or UFF.
- **Number of steps**: 50, 100, 200, 500, 1000 or 5000. This is a maximum, and minimization stops earlier when it converges.

**Apply** keeps the settings. When it finishes, the panel shows the energy in kJ/mol. **Cancel minimization** (✕) stops a run, and **Undo** and **Redo** step through edits and minimizations.

<Callout type="note" title="Reading the energy">

In vacuum, the energy is the force field's conformational energy for the ligand. In a pocket, it's the force-field energy that the minimization tool reports for the minimized system. Neither is a binding energy or an affinity. Values from different force fields, different molecules or different pockets can't be compared with each other.

</Callout>

### Pocket minimization

<DocVideo src="v2-7/pocket-minimization.mp4" caption="Pocket minimization in Nanome XR, from the v2.7 release." />

<vimg src="nanome-v2/v2-7/builder-pocket-minimization-settings.webp" alt="The minimization settings with 1KV2 chosen as the receptor" />

Since release 2.7, a ligand can be minimized in place inside a receptor's binding site. Choosing a receptor entry shows what the minimization runs with: OpenMM, using the Amber14 and OpenFF force fields and TIP3P water parameters, with ligand partial charges from OpenFF NAGL.

**Receptor flexibility** chooses what else moves:

- **Rigid receptor**: only the ligand moves.
- **Flexible pocket**: the ligand and every receptor atom in the pocket move. The rest of the protein stays fixed.
- **Flexible side chains**: the ligand and the pocket's side-chain atoms move. Backbone atoms (N, Cα, C and O) stay fixed.

**Pocket radius (Å)** sets how far from the ligand the pocket reaches, from 2 Å to 10 Å, with 4 Å by default. The pocket is every whole residue with a heavy atom within that distance of a ligand heavy atom.

The result shows:

- **Energy**, in kJ/mol.
- **Ligand RMSD**: how far the ligand's heavy atoms moved from their starting positions, in Å. It's measured in place, without superposition.
- **Pocket RMSD**: the same measure for the receptor atoms that were allowed to move. With a rigid receptor it reads 0 Å.

A run can be cancelled or undone. Ligands that contain metal atoms can't be minimized in a pocket, because the ligand force field and charge model don't cover metals.

### Saving

**Save** keeps the changes. A ligand that started from **Create New** is saved as a new ligand. An existing ligand can be saved with **Add new ligand** or **Update current ligand**. **Cancel** discards the changes.

<vimg src="nanome-v2/v2-7/builder-save-options.webp" alt="The Save menu with Add new ligand and Update current ligand" />

## <AppIcon name="rotate-360" /> Torsion Tool {#torsion-tool}

### Video: Torsion Tool (Beta)

<YoutubeEmbed videoId="IBQeKcSOJ8A" title="Nanome v2.5 Quick Tips: Torsion Tool (Beta)" />

<vimg src="nanome-v2/v2-7/tool-torsion.webp" alt="The Torsion Tool panel with its structure list" />

The Torsion Tool rotates bonds to change a structure's conformation. A structure is chosen in 3D, or from the list:

- **All Chains**: every residue in every chain.
- **All Ligands**: every ligand.
- **Chain A**: every residue in one chain.
- **A:B96_391**: one ligand.

Clicking and holding on a bond rotates the atoms on one side of it. **Display torsion strain for the entire structure** colors atoms by an estimate of the torsional strain in the rotatable single bonds around them. The estimate is a simple cosine term for the dihedral angle (3-fold for sp³-sp³ bonds, 1-fold otherwise), useful for spotting eclipsed or strained bonds. It isn't a force-field energy.

<vimg src="nanome-v2/v2-7/torsion-after.webp" alt="The Torsion Tool with Display torsion strain turned on for 1KV2" />

**Undo** and **Redo** step through changes, **Save** commits them and **Cancel** discards them.

## <AppIcon name="arrow-rotary-first-left" /> Residue Editor {#residue-editor}

<vimg src="nanome-v2/v2-7/tool-residue-editor.webp" alt="The Residue Editor panel" />

The Residue Editor mutates protein residues and picks their side-chain rotamers. Its rotamer library is the 2010 backbone-dependent library from the Dunbrack lab.

1. Select one or more protein residues, then pick one. The editor works on the picked residue plus up to 5 of the other selected residues whose Cα atoms are nearest to it. Residues from several entries are grouped by entry.
2. **Mutate** changes a residue to another amino acid.
3. Moving the thumbstick left or right previews the rotamers, scored for clashes and hydrogen bonds. **Score against** sets whether the scoring counts **Visible atoms** only or **All atoms**.
4. **Save** keeps the change, and **Cancel** discards it.

## <AppIcon name="tool" /> MARA Tools {#mara-tools}

<vimg src="nanome-v2/v2-7/tool-mara.webp" alt="The MARA Tools list" />

MARA Tools runs your MARA tools from the headset. The panel opens with a notice: MARA Tools in XR are in beta, and some tools rely on inputs or outputs that XR doesn't support yet. **Continue** opens the tool list, with **Search**, **Run**, **Reset** and **Back**. Tools are managed on the Tools page in [Nanome Web](https://app.nanome.ai/tools).

## <AppIcon name="download" /> Load Structure {#load-structure}

**Load Structure** opens a box for a PDB code. **Load from RCSB** downloads the entry into the workspace. Other formats are loaded in [Nanome Web](/nanome_web/loading).

## <AppIcon name="bug" /> Report a problem {#report-a-problem}

**Report a problem** opens a message box of up to 1,000 characters. A screenshot and technical details (app version, workspace, scene and recent errors) are sent with the message.
