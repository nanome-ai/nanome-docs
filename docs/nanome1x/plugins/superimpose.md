---
title: Superimpose Proteins
---

# Superimpose Proteins

The Superimpose Proteins plugin overlays two or more proteins in 3D space for visual comparison and calculates Root Mean Square Deviation (RMSD) values, a number in Å that measures how far apart the structures are.

Protein overlay is done either by using backbone (alpha-carbons) or by using all heavy protein atoms; and the alignment can be done on the full protein or limited to a chain.

A **Fixed Reference** structure is chosen, and **Moving Structures** are rotated and moved onto the Fixed Reference. RMSD values are reported between the Fixed Reference and each Moving Structure.

## Instructions

<ShotRow src="plugins-page/superimpose/superimpose_menu.png" alt="The Superimpose Proteins menu with Backbone α carbons and Entire Fixed Reference picked, and 5KHX as the Fixed Reference">

1. In the upper left, the user can select the Overlay Method.
    -   **Backbone α carbons**: Overlay structures based on all paired alpha carbons between the two proteins.
    -   **All Heavy Atoms**: Uses backbone atoms and side chain atoms (all protein atoms except for Hydrogen) for paired residues.

2. In the upper right, there are 4 available alignment modes.
    -   **Align to Entire Fixed Reference**: Uses a sequence based alignment to superimpose entire proteins on top of each other.
    -   **1 specific Chain from the Fixed Reference**: Uses a sequence based alignment to superimpose the moving structures onto a specified chain on the Fixed Reference.
    -   **By Binding Site**: The user selects a ligand on the Fixed Reference, and the surrounding binding site is aligned to the moving structures using Site-Motif (See Methodologies for more details)
    -   **By Selection** (not in this screenshot; see step 6): The user selects specific residues in the fixed reference and the moving structures are aligned by that selection only.  Users may choose to specify residues on both the fixed and moving structures but only selections in the fixed reference are required for the plugin to run.

3. A list of proteins in the workspace appears in the main panel.  In this panel, choose **Fixed Reference** and **Moving Structures**, and subselect a chain or ligand for each, if aligning by chain or binding site, respectively (see 4, below).
    - By default, the first entry is set as Fixed, and designated by the yellow pin. When selected as Fixed, the box under Moving will be inactive.  To change this selection, select the pin next to the desired Fixed Reference protein.

    - Choose one or more Moving Structures by selecting the boxes under the Moving Structures column.  This box will turn green when selected.

    - Once selections are made, the Superimpose button in the lower right will become active and show the number of proteins selected.  (e.g. “Superimpose (3)” for a Fixed Reference and 2 Moving Structures).  Click this button to superimpose the proteins and calculate RMSD values.   The button will change to “calculating” as the process is being completed.

    - Once complete, the proteins will be superimposed and locked, for visual inspection. The RMSD tables pulldown menu in the lower left will become active. Each superimpose run will generate a new table, with the most recent run appearing at the top of the pulldown list.  Select the run to open the table in the workspace. Tables can be closed and reopened in the workspace.

<UiList label="Superimpose Proteins menu">
<UiItem name="Backbone α carbons" area="4.8,23.7,43.5,5.3">Overlays all paired alpha carbons. Picked here.</UiItem>
<UiItem name="All Heavy Atoms" area="5.1,29.3,43.2,5.3">Overlays backbone and side chain atoms, all but hydrogen.</UiItem>
<UiItem name="Entire Fixed Reference" area="51.6,24.0,44.1,5.3">Sequence alignment of the entire proteins. Picked here.</UiItem>
<UiItem name="1 specific chain from the Fixed Reference" area="51.7,29.4,43.9,5.1">Aligns the moving structures onto one chain of the Fixed Reference.</UiItem>
<UiItem name="By Binding Site" area="51.7,34.8,43.8,5.1">Aligns the binding site around a ligand on the Fixed Reference, using Site-Motif.</UiItem>
<UiItem name="Fixed" area="5.7,49.1,8.8,26.1">The yellow pin marks the Fixed Reference. Select another pin to change it.</UiItem>
<UiItem name="Moving Structures" area="14.8,49.1,8.8,26.1">Select one or more. A selected box turns green.</UiItem>
<UiItem name="Chains" area="53.2,49.5,25.3,25.3">The chain for each protein, when aligning by chain.</UiItem>
<UiItem name="RMSD Tables" area="19.3,89.7,30.3,7.9">One table per run, newest at the top. Active after a run.</UiItem>
<UiItem name="Superimpose" area="64.6,88.9,30.1,7.3">Runs the overlay and RMSD. Active once selections are made.</UiItem>
</UiList>

</ShotRow>

<vimg src="plugins-page/superimpose/superimpose_protein.png" alt="The purple and orange proteins, 3AP1 and 5WRI, superimposed" />
<em>Two superimposed proteins</em>

<ShotRow src="plugins-page/superimpose/superimpose_rmsd_menu.png" alt="RMSD Run 1 table with 3AP1 purple tpst2 as the Fixed Reference and 5WRI orange tpst1 at RMSD 1.64">

*RMSD table describing above superimposed proteins*

<UiList label="RMSD table">
<UiItem name="Fixed Reference" area="0.4,21.1,96.4,12.3">The top row, marked with the yellow pin.</UiItem>
<UiItem name="Moving Structures" area="0.4,33.9,96.4,10.8">One numbered row each.</UiItem>
<UiItem name="RMSD" area="50.1,11.8,12.9,31.8">Values close to zero mean highly similar proteins.</UiItem>
<UiItem name="Paired residue count" area="65.4,9.0,12.1,34.7">Residues paired between the two structures.</UiItem>
<UiItem name="Paired atom count" area="81.9,9.0,11.8,34.7">Atoms paired. Equals the residue count for backbone α carbons.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/superimpose/superimpose_menu_2.png" alt="The Superimpose Proteins menu aligning by chain, with chain B picked on 3AP1 and 5WRI and the chains highlighted green on the structures">

4. When aligning by chain, the main panel chain selection boxes will become active. Choose **Fixed** and **Moving Structures** as above, and additionally choose a chain for each protein to be superimposed

    - Note that selecting a chain on the plugin main panel will also apply green highlighting to the selected chain of the protein structure, to visualize the selections before running.

<UiList label="Aligning by chain">
<UiItem name="1 specific chain from the Fixed Reference" area="35.1,29.0,39.8,6.4">Picked here.</UiItem>
<UiItem name="Fixed" area="2.3,43.9,6.7,9.6">3AP1 purple tpst2 is the Fixed Reference.</UiItem>
<UiItem name="Moving Structures" area="9.3,54.6,6.2,7.8">5WRI orange tpst1 is selected.</UiItem>
<UiItem name="Select Chain" area="40.4,44.9,31.4,37.8">The chain for each protein. Chain B is picked on 3AP1 and 5WRI.</UiItem>
<UiItem name="Chain highlight" area="77.6,11.8,21.1,76.6">The picked chains show green on the structures.</UiItem>
<UiItem name="Superimpose (2)" area="49.3,90.2,25.1,7.1">The Fixed Reference and one Moving Structure.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/superimpose/superimpose_rmsd_menu_2.png" alt="RMSD Run 2 table listing chain B for 3AP1 and 5WRI at RMSD 0.54, beside the superimposed proteins">

The RMSD table for a chain run names the chain with each structure.

<UiList label="RMSD table for a chain run">
<UiItem name="Fixed Reference" area="0.0,41.2,76.7,22.8">3AP1 purple tpst2, chain B.</UiItem>
<UiItem name="Moving Structure" area="0.0,64.4,76.7,21.3">5WRI orange tpst1, chain B, at RMSD 0.54.</UiItem>
<UiItem name="Superimposed proteins" area="79.2,17.1,20.6,79.3">The two proteins after the run.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/superimpose/superimpose-5a.png" alt="The Superimpose Proteins menu aligning by binding site, with All Heavy Atoms picked, the Extract binding sites option, and ligand STI on 1xbb blue">

5. When aligning by Binding Site, the Overlay method will automatically change to **All Heavy Atoms**.
    - An option to **Extract binding sites into new entry items** appears.  This creates a new set of entries containing only the superimposed binding site atoms of each protein.
    - Choose **Fixed** and **Moving Structures** as above and additionally choose a ligand from the Fixed reference to establish the binding site for superimposition.

    *Note the Extract binding sites into new entry items button*

<UiList label="Aligning by binding site">
<UiItem name="By Binding Site" area="50.4,33.2,45.4,5.0">Picked here.</UiItem>
<UiItem name="All Heavy Atoms" area="4.0,27.8,42.9,5.0">Picked automatically.</UiItem>
<UiItem name="Extract binding sites into new entry items" area="4.5,33.8,41.6,4.0">New entries with only the superimposed binding site atoms.</UiItem>
<UiItem name="Fixed" area="4.1,65.7,8.1,8.2">1xbb blue is the Fixed Reference.</UiItem>
<UiItem name="Ligand" area="56.3,66.5,34.3,6.7">The ligand that sets the binding site. STI here.</UiItem>
<UiItem name="Moving Structures" area="12.4,47.9,8.3,16.6">4xg2 gold and 5y5t red-orange are selected.</UiItem>
<UiItem name="Superimpose (3)" area="64.1,90.8,32.7,7.4">The Fixed Reference and two Moving Structures.</UiItem>
</UiList>

</ShotRow>

<vimg src="plugins-page/superimpose/superimpose-5b.png" alt="RMSD Run 1 table with 1xbb blue as the Fixed Reference, 4xg2 gold at RMSD 0.59 and 5y5t red-orange at 0.65, above the superimposed proteins" />


6. When aligning by selection, the user must make a selection in the **Fixed Reference**.  These selections can be made by using the selector tool on the 3D structure itself, or by using menus such as Hierarchy and Antibody Regions table

    <vimg src="plugins-page/superimpose/superimpose-6a.png" alt="The Entry Hierarchy for chain A of 4xg2 yellow, with residues selected in the sequence, beside the yellow and orange structures" />
    *Making a selection in the Fixed Reference using the hierarchy menu.*
    <br><br>
    <vimg src="plugins-page/superimpose/superimpose-6b.png" alt="The Superimpose Proteins menu with By Selection picked, 4xg2 yellow as the Fixed Reference and 5y5t orange as a Moving Structure, beside the superimposed structures" />
    *Structures superimposed based on a selection in the fixed reference*


7. **RMSD tables** report out fixed and moving structures (with chain when relevant) RMSD values, **paired residues**, and paired atoms
    - Note that when superimposing by backbone alpha carbons, the # of paired residues = # of paired atoms;  when superimposing by all heavy atoms, the # of paired residues will be ~8x less than the # of paired atoms because there are on average ~8 heavy atoms per residue.
    - For two identical proteins, the RMSD would be zero.  Values close to zero indicate highly similar proteins.  Values over 10 Å mean very different structures.  A combination of visual inspection and RMSD values gives a reasonable indication of how similar the structures are.


## Methodologies

We have two primary approaches to superimposing proteins:

Full Protein and Chain alignments both use a sequence based approach.

Binding site overlays use the Site-Motif algorithm, with FPocket for identifying inputs.

### Sequence Alignment

#### Primary modules
[Bio.pairwise2](https://biopython.org/docs/1.75/api/Bio.pairwise2.html#module-Bio.pairwise2) <br>
[Bio.PDB.Superimposer](https://biopython.org/docs/1.75/api/Bio.PDB.Superimposer.html#module-Bio.PDB.Superimposer)

#### Summary
For each pairing of fixed structure and moving structure:
- A global alignment is run on protein residue sequences using Bio.pairwise2

- Aligned residue atoms are passed into Bio.PDB.Superimposer, which calculates an RMSD value and a transform matrix.

- We apply the transform matrix to every moving atom on the complex.

After all moving atoms have been transformed, we update the complexes in the workspace.

#### Implementation Details

##### Alignment
- For Entry mode, the entire protein sequence is aligned.
- For Chain mode, only the specified chains are aligned.

##### Global alignment scoring values
- match = 2
- mismatch = -1
- gap penalty = -10
- gap extend penalty = -.5

#### Superimpose
- If the alpha carbon overlay method is selected, we only pair the alpha carbons from each residue.
- If all heavy atoms overlay method is selected, we attempt to pair all heavy atoms. In some cases, we cannot get a 1-1 pairing of heavy atoms. In this case, those residues are excluded from the superimpose

### Binding Site Alignments using Site-Motif
Site-motif is described as *a graph based method for aligning protein binding sites in sequence-order independent fashion*. It can analyze the binding site of a protein and find the best alignment on another protein.

Our algorithm uses FPocket to identify potential binding sites on the moving protein, and those results are compared to the fixed binding site using Site-Motif. Site-Motif calculates alignments of each FPocket result to the fixed binding site, and the result with the longest alignment is used as the corresponding binding site. A transformation matrix is calculated to superimpose the moving binding site onto the fixed.

#### Source Code
[Site-Motif](https://github.com/nanome-ai/site-motif)<br>
[Fpocket](https://github.com/Discngine/fpocket)

Note that Nanome maintains a fork of the code from the original paper.
The original codebase can be found [here](https://github.com/santhoshgits/MAPP-3D)

Improvements to the codebase include:
- Updating to Python3
- Cut out unnecessary features for our use case
- Logging

#### Overview
<vimg src="plugins-page/superimpose/superimpose_binding_site_diagram.png" alt="Diagram: the fixed ligand sets the fixed binding site, fpocket finds pockets on the moving complex, Site-Motif picks the best match, and the two binding sites are superimposed" />

#### References
Sankar S, Chandra N (2022) SiteMotif: A graph-based algorithm for deriving structural motifs in Protein Ligand binding sites. PLoS Comput Biol 18(2): e1009901. https://doi.org/10.1371/journal.pcbi.1009901

Le Guilloux, V., Schmidtke, P. & Tuffery, P. Fpocket: An open source platform for ligand pocket detection. BMC Bioinformatics 10, 168 (2009). https://doi.org/10.1186/1471-2105-10-168
