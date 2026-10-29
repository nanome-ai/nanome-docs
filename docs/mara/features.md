---
title: Features
---

# Features

MARA's main features are its chat, data tables, and 3D molecular visualization.

<IconGrid label="MARA features" :cols="3">
<IconCard icon="messages" title="Chat" href="#chat">Ask in plain language, and MARA builds a workflow of tools.</IconCard>
<IconCard icon="table" title="Data Table" href="#data-table">Query, filter, plot and export CSV data.</IconCard>
<IconCard icon="atom" title="Molecular Visualization" href="#molecular-visualization">View structures in 3D and restyle them by asking.</IconCard>
</IconGrid>

## <AppIcon name="messages" /> Chat {#chat}

The chat is the main way to work with MARA. It helps you analyze and reason about molecular data by building workflows of tools to reach a goal.

<vimg src="mara/mara-chat.png" alt="A chat with MARA" />

Some of the tasks MARA can do:

<Tabs :labels="['Data retrieval', 'Data conversion', 'Informatics', 'Analysis', 'Visualization']">
<Tab>

- Downloading PDB files for specific proteins.
- Retrieving SMILES strings for given compounds.
- Extracting protein sequences from PDB or mmCIF files.

</Tab>
<Tab>

- Converting PDB files to mmCIF files and vice versa.
- Converting SMILES strings to 3D structures.
- Converting molecular dynamics (MD) trajectories to PDB files.

</Tab>
<Tab>

- Calculating chemical descriptors for lists of SMILES.
- Finding similar compounds in databases like ChEMBL using SMILES strings.
- Generating molecular fingerprints from SMILES.

</Tab>
<Tab>

- Aligning reference polymer structures to sets of mobile structures.
- Computing solvent accessible surface area (SASA) of proteins.
- Calculating RMSD from MD trajectories.

</Tab>
<Tab>

- Drawing 2D structures of molecules from SMILES strings.
- Generating 3D conformers for given molecules.
- Displaying protein sequences and alignments visually.

</Tab>
</Tabs>

### Chat input {#chat-input}

Besides plain language, a prompt can carry files, or a SMILES drawn in the Ketcher chemical structure editor.

<UiList label="Chat input">
<UiItem icon="paperclip" name="Attach file">Opens a file picker to choose files to upload.</UiItem>
<UiItem icon="hexagon" name="Draw SMILES">Opens the chemical structure drawing tool.</UiItem>
<UiItem icon="tool" name="Run tool">Picks a MARA tool to run.</UiItem>
<UiItem icon="route" name="Run workflow">Picks a workflow to run.</UiItem>
<UiItem icon="arrow-up" name="Send">Sends your message.</UiItem>
</UiList>

<vimg src="nanome-web/mara-tab.webp" alt="The chat input, here in a workspace's MARA tab" />

Since December 2024, MAE, MOE and PSE session files can also be uploaded to a chat prompt.

## <AppIcon name="table" /> Data Table {#data-table}

<vimg src="mara/data-table.png" alt="A MARA data table" />

With a MARA data table, you can:

- Ask in plain language to query and extract specific data from a CSV file.
- Make a 2D or 3D scatter plot from CSV data, to see how data points relate.
- Write data to a CSV file, creating or overwriting it, to export processed or analyzed data.
- Filter and extract rows from a CSV file based on a query.
- Show the distribution of numerical data from a CSV file, its spread and central tendencies.
- Get a summary of a CSV file's contents, for a first look at the data.

### Creating tables {#creating-tables}

Upload a CSV file through the chat input, or drag and drop a file into the interface. The drop area has 2 zones: the left one uploads the file to the chat, and the right one uploads it and makes a new table from it.

<vimg src="mara/drag-drop.png" alt="The two drop zones" />

<Callout type="note" title="Supported file types for tables">

`.csv` and `.xlsx`

</Callout>

## <AppIcon name="atom" /> Molecular Visualization {#molecular-visualization}

MARA shows structures in 3D with Molstar, and you can change the representation by asking in plain language.

<vimg src="mara/mol-viz.png" alt="A structure in MARA's 3D viewer" />

Example prompts:

- Show all residues in chain D as ball and stick
- Color residues 101-207 blue
- Hide waters
- Spin the molecule
- Focus on ligand 50D
- Download as [molx | stl | obj | glb | usdz]
- Highlight residues 149-150 in green
- Set style to illustrative
