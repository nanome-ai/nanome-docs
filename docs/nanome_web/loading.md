---
title: Loading Structures
---

# Loading Structures

Structures come into a workspace through the **Import** tab of the workspace panel. It has three sources: the RCSB Protein Data Bank, files from your computer, and files from MARA chats.

<vimg src="nanome-web/import-tab.jpg" />

## Import from RCSB

Typing a 4-character PDB ID, such as `4CEO`, and clicking **Load** downloads the structure from the RCSB and adds it as a new entry.

When a structure has a bound ligand, Nanome builds a binding-site view automatically: a **Site** group holding the ligand, the pocket residues around it, and the pocket and ligand together with their interactions. See [Entries Tab](/nanome_web/entries#entries-and-components).

## Upload from your computer

**Click to Upload** opens a file picker, and files can also be dragged onto the workspace. The web app accepts the full range of supported formats: structures, session files, trajectories and electrostatic maps. See [Supported File Formats](/nanome_web/fileformats).

Some formats that a workspace can't open on its own, such as `.bcif`, `.mcif`, `.sd`, `.mol` and `.mol2`, are loaded through a [MARA](/mara/overview) tool that supports them.

Trajectories and DX maps attach to an entry that's already loaded. They're added from the entry's **(...)** menu with **Load trajectory** or **Load DX map**. See [MD Trajectory Playback](/nanome_web/mdplayback).

## Import from Chat

**Import from Chat** lists files from your MARA conversations, with the chat each came from and its date. The search button and the sort menu help find a file, and the checkboxes select files. Each row's **(...)** menu has **Go to chat** and **Download**.

<vimg src="nanome-web/import-chat-menu.jpg" />

## File loading changes in 2.7

Since release 2.7, large GROMACS `.gro` systems load much faster, and a `.gro` file is split into chains wherever residue numbering restarts. Terminal caps such as ACE, NME and NH2 stay part of the protein chain.

For a PDB or mmCIF file that carries a 4-character PDB ID, ligand bonds come from the Chemical Component Dictionary, fetched from the RCSB since 2.7 (from PDBe before that). Bonds written in the file, such as PDB `CONECT` records or mmCIF bond records, are applied too. Without an ID, the remaining bonds are inferred from the coordinates. Since 2.7, bonds that the dictionary flags as metal coordination are no longer drawn as covalent bonds, and a covalently bound ligand keeps its bond to the protein. A modified residue with an attached group is split, so the standard amino acid stays in the protein and the attached group is treated as a ligand.

### Video: Loading Structures from the Web

<YoutubeEmbed videoId="BkZ6R8fPbgQ" title="Nanome v2.5 Quick Tips: Loading Structures from the Web" />

The tutorial was recorded in v2.5 and covers:

- **Creating a project and workspace**
- **Importing from the RCSB** by PDB ID
- **Uploading from your computer** by dragging files into the workspace
- **Importing from chat**: pulling in molecules from earlier MARA chats
