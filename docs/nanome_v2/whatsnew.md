---
title: What's New in 2.7
---

# What's New in 2.7

Release 2.7 shipped on October 12, 2026, and 2.7.1 followed as a patch. The full release notes are at [nanome.ai/versions](https://nanome.ai/versions), and the [v2.7 announcement](https://nanome.ai/blog/nanome-v2.7:-comments-pocket-minimization-ligand-builder-upgrades-and-more) tells the story with video. This page links each change to where it's documented.

## Comments

<DocVideo src="v2-7/comments.mp4" caption="Comments, from the v2.7 release video. The Agent tag in the video is for illustration." />

Comments live inside the workspace, threaded and tied to the atoms they're about. They can belong to an annotation, a scene or the whole workspace, with replies, @mentions, reactions and unread tracking. Annotations and comments now share one panel. See [Comments & Annotations](/nanome_v2/comments) and, for the browser, [Comments](/nanome_web/comments).

## Ligand Builder

- Attachment points follow each atom's valence and hybridization, fragments preview before they attach, torsions snap to favorable angles, and rings close automatically.
- **Replace** can fuse a ring fragment onto an existing ring, with an aromatic preview.
- **Auto relax** cleans up nearby geometry after each edit, and aromaticity is recalculated every time.

See [Builder Tool](/nanome_v2/toolspanel#builder-tool).

## Pocket minimization

<DocVideo src="v2-7/pocket-minimization.mp4" caption="Pocket minimization in Nanome XR, from the v2.7 release." />

A ligand can be minimized in place inside a receptor's binding site, with a rigid receptor, a flexible pocket or flexible side chains, and a pocket radius from 2 Å to 10 Å. Results report the energy, the ligand RMSD and the pocket RMSD. Ligands that contain metal atoms can't be minimized in a pocket. See [Pocket minimization](/nanome_v2/toolspanel#pocket-minimization).

## Rendering

Atoms and bonds are drawn as GPU impostors, which stay smooth at any zoom and raise frame rates on large structures. Molecular surfaces are generated at a higher resolution. Skyboxes are procedurally generated mountains in each theme's colors, which trims about 30 MB from the Quest download, and themes and night mode reach Nanome Web too.

## Hover, select and measure on desktop and web

<DocVideo src="v2-7/web-hover-select-measure.mp4" caption="Hovering, selecting and measuring in Nanome Web, from the v2.7 release." />

Atoms, bonds and residues highlight on hover and select on click. The Selection tool picks atoms, residues or chains, the Measurement tool measures distances, angles and dihedrals, and double-clicking zooms to a residue or an entry. Nanome Web can also create and remove interaction components. See [Tool rail](/nanome_web/workspace#tool-rail).

## Pointing in XR

The default pointer highlights whole residues, the off-hand always works as a pointer, tooltips show the details of interactions, measurements and text notes, and the off-hand controller's primary button (**X**, or **A** in left-handed mode) toggles mute. See [Pointer](/nanome_v2/toolspanel#pointer) and [Wrist Menu](/nanome_v2/wristmenu).

## Following

Followers see the leader's current tool, mode, hovers, selections and edits as they happen. Follow chains lead to the person at the end, Spotlight is steadier, and Nanome Web viewers follow straight away. See [Spotlight Mode](/nanome_v2/scenespanel#spotlight-mode).

## Trajectories and file loading

<DocVideo src="v2-7/web-md-playback.mp4" caption="Trajectory playback in Nanome Web: an IRMOF-16 metal-organic framework supercell with a guest polymer." />

In Nanome XR, playback computes upcoming frames in the background. Interactions, annotations and residue labels update as frames advance. GROMACS `.gro` files load faster and split into chains where residue numbering restarts. For PDB and mmCIF files with a PDB ID, ligand bonds now come from the RCSB copy of the Chemical Component Dictionary, bonds the dictionary flags as metal coordination are no longer drawn as covalent bonds, and covalently bound ligands keep their bond to the protein. See [MD Trajectory Playback](/nanome_web/mdplayback) and [Supported File Formats](/nanome_web/fileformats).

## Everything else

- Structure alignment runs on the server, with **CE-Align** or **TM-Align**.
- The Residue Editor scores rotamers against visible atoms or all atoms, and suggests rotamers much faster in large workspaces.
- Components gained **Delete Atoms**, an atom count on hover and a grayed look when empty. Distance components can include atoms from every entry.
- Clash markers grow with how much atoms overlap.
- Metal coordination detection covers methionine sulfur and iron-sulfur cluster sulfides.
- Annotations can be hidden one at a time or all at once.
- **Export analysis** downloads interactions, measurements and minimization history as a ZIP of CSV files.
- Projects, Workspaces, Ligands and rotamer lists share a new sortable table.
- Presence, invitations and join requests update instantly.
- Free licenses have limits (1 owned project, 3 owned workspaces, 5 structures per workspace), Nanome warns 30 days before a license expires, and sign-in errors explain what went wrong. See [Login Screen](/nanome_v2/login).

## Release 2.6

Release 2.6 added scene recording ([Scenes Panel](/nanome_v2/scenespanel#recording-a-scene)), the Residue Editor and MARA Tools in XR ([Tools Panel](/nanome_v2/toolspanel)), Halogen-π interactions, view presets in the Ligands tab, and PDBQT import.
