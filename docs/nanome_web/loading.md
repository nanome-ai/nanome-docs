---
title: Loading Structures
---

# Loading Structures

Structures come into a workspace through the **Import** tab of the workspace panel, from three sources.

<IconGrid label="Import sources" :cols="3">
<IconCard icon="download" title="Import from RCSB" href="#import-from-rcsb">The RCSB Protein Data Bank, by PDB ID.</IconCard>
<IconCard icon="upload" title="Upload from your computer" href="#upload-from-your-computer">Structures, session files, trajectories and maps.</IconCard>
<IconCard icon="messages" title="Import from Chat" href="#import-from-chat">Files from your MARA chats.</IconCard>
</IconGrid>

<vimg src="nanome-web/import-tab.webp" alt="The Import tab" />

## <AppIcon name="download" /> Import from RCSB {#import-from-rcsb}

Typing a 4-character PDB ID, such as `4CEO`, and clicking **Load** downloads the structure from the RCSB and adds it as a new entry.

When a structure has a bound ligand, Nanome builds a binding-site view automatically: a **Site** group holding the ligand, the pocket residues around it, and the pocket and ligand together with their interactions.

## <AppIcon name="upload" /> Upload from your computer {#upload-from-your-computer}

<Btn icon="upload">Click to Upload</Btn> opens a file picker, and files can also be dragged onto the workspace. The web app accepts the full range of [supported formats](/nanome_web/fileformats): structures, session files, trajectories and electrostatic maps.

- Some formats that a workspace can't open on its own, such as `.bcif`, `.mcif`, `.sd`, `.mol` and `.mol2`, are loaded through a MARA tool that supports them.
- Trajectories and DX maps attach to an entry that's already loaded. They're added from the entry's <AppIcon name="dots" /> **(...)** menu with **Load trajectory** or **Load DX map**. See [MD Trajectory Playback](/nanome_web/mdplayback).

## <AppIcon name="messages" /> Import from Chat {#import-from-chat}

**Import from Chat** lists files from your MARA conversations, with the chat each came from and its date. The checkboxes select files.

<UiList label="Import from Chat">
<UiItem icon="search" name="Search">Helps find a file.</UiItem>
<UiItem icon="arrows-sort" name="Sort">Orders the list.</UiItem>
<UiItem icon="dots" name="More">Each row's menu: Go to chat and Download.</UiItem>
</UiList>

<vimg src="nanome-web/import-chat-menu.webp" alt="Import from Chat with a file row menu open" />

## File loading changes in 2.7

<AccordionGroup label="File loading changes in 2.7">

<Accordion title="GROMACS .gro files" teaser="Faster loading, and chains split where numbering restarts.">

Since release 2.7, large GROMACS `.gro` systems load much faster, and a `.gro` file is split into chains wherever residue numbering restarts. Terminal caps such as ACE, NME and NH2 stay part of the protein chain.

</Accordion>

<Accordion title="Ligand bonds in PDB and mmCIF files" teaser="Where bonds come from, metal coordination, covalent ligands and modified residues.">

For a PDB or mmCIF file that carries a 4-character PDB ID, ligand bonds come from the Chemical Component Dictionary, fetched from the RCSB since 2.7 (from PDBe before that). Bonds written in the file, such as PDB `CONECT` records or mmCIF bond records, are applied too. Without an ID, the remaining bonds are inferred from the coordinates.

Since 2.7, bonds that the dictionary flags as metal coordination are no longer drawn as covalent bonds, and a covalently bound ligand keeps its bond to the protein. A modified residue with an attached group is split, so the standard amino acid stays in the protein and the attached group is treated as a ligand.

</Accordion>

</AccordionGroup>

### Video: Loading Structures from the Web

<YoutubeEmbed videoId="BkZ6R8fPbgQ" title="Nanome v2.5 Quick Tips: Loading Structures from the Web" />

The tutorial was recorded in v2.5. It covers creating a project and workspace, importing from the RCSB by PDB ID, uploading from your computer by dragging files into the workspace, and importing from chat to pull in molecules from earlier MARA chats.
