---
title: Features
---

# What MARA can do

You ask MARA in plain language, in a [chat](/mara/conversations#chat) or a workspace's [MARA tab](/nanome_web/workspace#mara-tab). It picks the tools that reach your goal, runs them, and returns the results as text, files, tables, plots and 3D structures.

<IconGrid label="MARA features" :cols="3">
<IconCard icon="messages" title="Tasks" href="#tasks">What you can ask for, by kind of task.</IconCard>
<IconCard icon="table" title="Tables" href="#tables">Query, filter, plot and export CSV data.</IconCard>
<IconCard icon="atom" title="Structures" href="#structures">See results in 3D and send them to a workspace.</IconCard>
</IconGrid>

## <AppIcon name="messages" /> Tasks {#tasks}

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

- Aligning sets of mobile structures to a reference polymer structure.
- Computing solvent accessible surface area (SASA) of proteins.
- Calculating RMSD from MD trajectories.

</Tab>
<Tab>

- Drawing 2D structures of molecules from SMILES strings.
- Generating 3D conformers for given molecules.
- Displaying protein sequences and alignments visually.

</Tab>
</Tabs>

Besides plain language, a message can carry files, a structure drawn with <Btn icon="hexagon">Draw SMILES</Btn>, or a specific tool or workflow to run. MAE, MOE and PSE session files can be attached too. The 4 [example chats](/mara/conversations#examples) show complete tasks from start to finish.

## <AppIcon name="table" /> Tables {#tables}

With a CSV file in the chat, you can ask MARA to:

- Query and extract specific data.
- Make a 2D or 3D scatter plot, to see how data points relate.
- Filter rows that match a condition.
- Show the distribution of a numerical column, its spread and central tendency.
- Summarize the file's contents, for a first look at the data.
- Write the results to a new CSV file, or overwrite one, to export them.

Tables for the chat live in the **Tables** section of the [Files panel](/mara/conversations#files-panel). Drop a CSV or SDF file there, choose Open as Data Table in a file's menu, or ask MARA to make a table from a file in the chat.

## <AppIcon name="atom" /> Structures {#structures}

Structures that MARA finds or makes open in the chat's [3D viewer](/mara/conversations#3d-viewer), which steps through multi-model files such as docking poses. To keep working on them, <Btn icon="file-arrow-right">Add to Workspace</Btn> in the Files panel loads them into a Nanome workspace, where you can open them in Nanome Web or Nanome XR.

Inside a workspace, the [MARA tab](/nanome_web/workspace#mara-tab) changes the workspace's representations when you ask in plain language.
