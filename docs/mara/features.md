# Features

## Chat

This is the primary interface for interacting with MARA. It is a chat interface that can help you analyze and reason about molecular data by constructing workflows of tools to achieve a specific goal.
<vimg src="mara/mara-chat.png" />

 Here are some examples of the types of tasks MARA can accomplish:
* **Data Retrieval:**
    - Downloading PDB files for specific proteins.
    - Retrieving SMILES strings for given compounds.
    - Extracting protein sequences from PDB or mmCIF files.
* **Data Conversion:**
    - Converting PDB files to mmCIF files and vice versa.
    - Converting SMILES strings to 3D structures.
    - Converting molecular dynamics (MD) trajectories to PDB files.
* **Informatics:**
    - Calculating chemical descriptors for lists of SMILES.
    - Finding similar compounds in databases like ChEMBL using SMILES strings.
    - Generating molecular fingerprints from SMILES.
* **Analysis:**
    - Aligning reference polymer structures to sets of mobile structures.
    - Computing solvent accessible surface area (SASA) of proteins.
    - Calculating RMSD from MD trajectories.
* **Visualization:**
    - Drawing 2D structures of molecules from SMILES strings.
    - Generating 3D conformers for given molecules.
    - Displaying protein sequences and alignments visually.

### Chat Input
<vimg src="mara/chat-input.png" />
Along with natural language, prompts can be augmented with files, or a SMILES can be drawn using a Ketcher  chemical structure editor.

- Hexagon button opens the chemical structure drawing tool

- Upload buttons opens a file picker to select files to upload

## Data Table
With the MARA data table, you can perform a variety of tasks to analyze and manipulate your data.

<vimg src="mara/data-table.png" />

Here are some of the key functionalities:

- **Query and Extract Data from Table:** You can ask natural language queries to extract specific data from a CSV file. This is useful for quick insights without manual analysis.
- **Generate a 2D or 3D Scatter Plot:** You can create scatter plots from your CSV data, which can be either 2D or 3D. This helps in visualizing the relationships between different data points.
- **Export Data to CSV File:** You can write data into a CSV file, creating or overwriting it as needed. This is ideal for exporting processed or analyzed data into a CSV format.
- **Filter and Extract CSV Data Based on a Query:** You can filter and extract specific rows from a CSV file based on a query, allowing you to focus on the most relevant data.
- **Show Distributions of Numerical Data:** You can visualize the distribution of numerical data from a CSV file, which can help in understanding the spread and central tendencies of your data.
- **Understand CSV File Content:** You can get a summary or overview of the contents of a CSV file, which can be useful for initial data exploration.

These tools provide a comprehensive suite for handling and analyzing data tables, making it easier to derive meaningful insights from your datasets.

### Creating Tables
You can create a table by uploading a CSV file through the Chat input, or by dragging and dropping a file into the interface.
<vimg src="mara/drag-drop.png" />
The drag and drop interface contains two drop zones; the left side will upload the file to the chat, and the right side will upload the file and create a new table using that data.

Supported file types for tables: `.csv`, `.xlsx`
## Molecular Visualization
MARA allows you to visualize structures in 3D using Molstar, and update the representation using natural language.

<vimg src="mara/mol-viz.png" />

Example Prompts:
* Show all residues in chain D as ball and stick
* Color residues 101-207 blue
* Hide waters
* Spin the molecule
* Focus on ligand 50D
* Download as [ molx| stl | obj | glb | usdz ]
* Highlight residues 149-150 in green
* Set style to illustrative
