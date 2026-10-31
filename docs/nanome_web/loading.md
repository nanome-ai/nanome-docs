---
title: Loading Structures
---

# Loading Structures

Structures come into a workspace through the **Import** tab of the workspace panel, from three sources.

<ScreenMap src="nanome-web/import-tab.webp" alt="The Import tab" crop="0,21,100,79" label="Import sources">
<MapCard icon="download" title="Import from RCSB" href="#import-from-rcsb" side="left" area="2.7,29.8,46.2,23.0">The RCSB Protein Data Bank, by PDB ID.</MapCard>
<MapCard icon="upload" title="Upload from your computer" href="#upload-from-your-computer" side="right" area="51.3,29.8,46.2,23.0">Structures, session files, trajectories and maps.</MapCard>
<MapCard icon="messages" title="Import from Chat" href="#import-from-chat" side="bottom" area="2.7,54.7,94.7,43.3">Files from your MARA chats.</MapCard>
</ScreenMap>

## <AppIcon name="download" /> Import from RCSB {#import-from-rcsb}

Typing a 4-character PDB ID, such as `4CEO`, and clicking **Load** downloads the structure from the RCSB and adds it as a new entry.

When a structure has a bound ligand, Nanome builds a binding-site view automatically: a **Site** group holding the ligand, the pocket residues around it, and the pocket and ligand together with their interactions.

## <AppIcon name="upload" /> Upload from your computer {#upload-from-your-computer}

The <Btn icon="upload">Click to Upload</Btn> button opens a file picker, and files can also be dragged onto the workspace. The web app accepts the full range of [supported formats](/nanome_web/fileformats): structures, session files, trajectories and electrostatic maps.

- Some formats that a workspace can't open on its own, such as `.bcif`, `.mcif`, `.sd`, `.mol` and `.mol2`, are loaded through a MARA tool that supports them.
- Trajectories and DX maps attach to an entry. They're added from the entry's <AppIcon name="dots" /> **(...)** menu with **Load trajectory** or **Load DX map**, or uploaded like any other file. An uploaded one attaches to a structure uploaded with it under the same name, such as `run1.pdb` with `run1.xtc`. Otherwise it goes to the workspace's only entry, and with more entries **Attach to Entry** asks which one. See [MD Trajectory Playback](/nanome_web/mdplayback).

## <AppIcon name="messages" /> Import from Chat {#import-from-chat}

**Import from Chat** lists files from your MARA conversations, with the chat each came from and its date. The checkboxes select files.

<ShotRow src="nanome-web/import-chat-menu.webp" alt="Import from Chat with a file row menu open">

<UiList label="Import from Chat">
<UiItem icon="search" name="Search" area="61.6,7.2,7.1,12.2">Helps find a file.</UiItem>
<UiItem icon="arrows-sort" name="Sort" area="69.7,7.2,25.8,12.2">Orders the list.</UiItem>
<UiItem icon="dots" name="More" area="91.3,37.7,4.4,5.5">Each row's menu: Go to chat and Download.</UiItem>
</UiList>

</ShotRow>

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
