---
title: Chemical Interactions
---

# Chemical Interactions

The Chemical Interactions plugin visualizes ligand-receptor and protein-protein interactions. It uses [Arpeggio](https://github.com/PDBeurope/arpeggio) to calculate interactions.


##  Instructions

<ShotRow src="plugins-page/chem_interactions_menu_labeled.png" alt="The Chem Interactions menu with 5CEO as Structure 1, Specific Structures picked as the selection mode, and the Display settings" crop="30.0,12.0,40.8,84.0">

<Steps>

1. Select Structure 1 from the dropdown. This should be the receptor, or the larger of the two interacting proteins.

2. Set your Selection mode for Structure 2
    - **Selected Atoms/Residues**: Uses the atoms/residues selected in the workspace, and calculates interactions with Structure 1.
        - Atoms/residues can be from any complex in the Entry List.
        - Does not require the Structure 2 dropdown
    - **Specific Structures**: Select either another complex in the workspace, or a ligand extracted from Structure 1.
        - When Structure 1 dropdown is populated, the plugin automatically detects ligands, and adds them to the choices for Structure 2.
    - Fewer atoms in the Structure 2 selection means a faster calculation. A full protein-protein calculation can take a long time to render, so narrow the selection as much as you can.

3. Press Calculate, which will identify interactions using Arpeggio, and render results in your workspace.

4. Modify the Display Settings to show or hide interactions of interest.
    - Change the visibility or color of each interaction type
    - `Show All`: Shows all interaction types, hides them all, or goes back to the default ones. Its label cycles through Show All, Hide All and Show Default.
    - `Clear Frame` button will delete all interaction lines currently visible in the workspace.

</Steps>

<UiList label="Chem Interactions menu">
<UiItem name="Structure 1" area="31.1,20.0,19.2,11.3">The receptor, or the larger of the two interacting proteins.</UiItem>
<UiItem name="Structure 2" area="50.5,20.0,18.7,11.3">Another complex, or a ligand found in Structure 1. Used with Specific Structures.</UiItem>
<UiItem name="Selected Atoms/Residues" area="31.1,33.2,38.1,5.0">Selection mode that uses the atoms/residues selected in the workspace.</UiItem>
<UiItem name="Specific Structures" area="31.1,38.3,38.1,5.1">Selection mode that uses the Structure 2 dropdown. Picked here.</UiItem>
<UiItem name="Calculate" area="31.1,44.4,38.1,7.2">Finds the interactions with Arpeggio and draws them in the workspace.</UiItem>
<UiItem name="Show All" area="31.4,59.7,6.8,3.7">Shows or hides all interaction types. Its label cycles through Show All, Hide All and Show Default.</UiItem>
<UiItem name="Clear Frame" area="44.2,59.7,9.6,3.7">Deletes all interaction lines visible in the workspace.</UiItem>
<UiItem name="Interaction types" area="32.0,65.3,16.6,30.1">Shows or hides each interaction type.</UiItem>
<UiItem name="Colors" area="52.3,65.3,15.1,30.1">Sets the color of each interaction type.</UiItem>
</UiList>

</ShotRow>
