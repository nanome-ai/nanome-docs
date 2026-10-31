---
title: Antibody Representation
---

# Antibody Representation

The Antibody Representation plugin adds the IMGT color scheme, labels antibody regions on a selected protein, and highlights CDR loops.  A table of Antibody Regions allows independent selection of CDR loops for calculations or representational changes.  Importantly, only antibodies and fragments of antibodies are modified; the representation of antigens in the complex is unchanged.

The plugin is accessible through the Stacks menu. Select the antibody structure in the Entry list, click Activate and then Run. The structure will update with heavy and light chains colored in grays and CDR loops colored according to the IMGT scheme.

<vimg src="plugins-page/antibodies/image1.png" alt="The Stacks menu with Antibody Representation selected and its Activate button" />

<table>
<tbody>
<tr>
<td width="50%"><vimg src="plugins-page/antibodies/image4.png" alt="5GGS after the run, with the antibody chains in grays and the CDR loops in color" /></td>
<td width="50%"><vimg src="plugins-page/antibodies/image7.png" alt="The 5GGS Regions table, with H and K columns of CDRH1 to CDRH3 and CDRK1 to CDRK3" /></td>
</tr>
</tbody>
</table>

*Output of run on PDB code 5GGS, PD-1 + pembrolizumab Fab and Regions Table. Note that only antibody portions are recolored and labeled; antigen protein remains as loaded*

Select CDR loops from the table by clicking on the labeled buttons.  The 3D structure will show selection highlights on the loops.

<vimg src="plugins-page/antibodies/image10.png" width="100%" alt="A close-up of PD-1 and the labeled CDR loops of 5GGS, with 2 loops selected in the 5GGS Regions table" />

*5GGS close up of the interface of PD-1 with the CDR loops of the antibody fragment, with 2 loops selected in the table and on the structure*

## Application of CDR Selections
Selection of CDR loops from the Regions table can be used in conjunction with other Nanome menus and plugins. Some examples of plugins are [Chemical Interactions](cheminteractions.md) and **High Quality Surfaces**.

<table>
<tbody>
<tr>
<td width="50%"><vimg src="plugins-page/antibodies/image9.png" alt="The Stacks menu with Chemical Interactions selected and its Settings, Deactivate and Run buttons" /></td>
<td width="50%"><vimg src="plugins-page/antibodies/image6.png" alt="The Stacks menu with High Quality Surfaces selected and its Activate button" /></td>
</tr>
</tbody>
</table>

### Chemical Interactions on CDR loops

Find interactions between the residues of the selected CDR loops and protein residues within 5 Å, in 4 steps:

<vimg src="plugins-page/antibodies/image8.png" alt="The 5GGS Regions table with CDRH3 and CDRK3 selected, beside the Chem Interactions menu with 5GGS as Structure 1 and Selected Atoms/Residues picked" />

1.  Make selections in the Regions table
2.  Activate and Run the Chemical Interactions plugin from the Stacks menu to launch the plugin menu
3.  In the menu, confirm the selection of your protein, the selection of “Selected Atoms/Residues”, and make any adjustment to what interactions to show.
4.  Click “Calculate”

*The 5GGS close-up above shows the result: the dotted lines are the Chemical Interactions made by the residues of the 2 selected CDR loops.*

### High Quality Surfaces on CDR loops

Add surfaces to any selection of CDR loops in 5 steps:

1.  Make selections in the Regions table
2.  Activate the High Quality Surfaces plugin from the Stacks menu to launch the plugin menu
3.  In the menu, select the protein, and a chain that contains the selection or the entire protein.
4.  In the right panel of the menu, set the Selection Only toggle to On. This will apply surfaces to the selected CDR loops in the Regions table, as well as any other selections made on the structure using the select tool, entry list, or other menus.  
5.  Click “Generate”, then adjust surface color and opacity.

<vimg src="plugins-page/antibodies/image5.png" alt="The High Quality Surfaces menu with 5GGS as the entry and Selection Only on, beside the 5GGS Regions table with CDRH3 and CDRK3 selected" />


## Citations

David Příhoda. (2021). AbNumber: Convenience Python APIs for antibody numbering and alignment using ANARCI (Version 0.3.2). Retrieved from https://github.com/prihoda/AbNumber/

Dunbar, J., & Deane, C. M. (2016). ANARCI: antigen receptor numbering and receptor classification. Bioinformatics, 32(2), 298-300. https://doi.org/10.1093/bioinformatics/btv552
