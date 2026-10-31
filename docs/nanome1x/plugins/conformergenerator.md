---
title: Conformer Generator
---

# Conformer Generator

<vimg src="plugins-page/conformer-generator/overview.png" alt="The Conf Gen menu set to 5WFD and 50 conformers, beside 3 conformers in 3D, the 5WFD conf frames with their conf energy, and a scatter plot of the conformers" />

The Conformer Generator Plugin uses RDKit and UFF minimization to deliver a collection of diverse, low energy conformers of a selected “seed” ligand. 3D results are captured as frames in a single new entry in the workspace. Each conformer's minimized energy and its RMSD to the seed ligand are shown on the Meta Data tab of the Advanced Menu and in the Data Table plugin.

## Potential uses

1. Assess whether a protein bound ligand conformation is one of its low energy unbound conformations or if instead it is adopting a higher energy conformation
2. Compare conformer energy and RMSD to that of the “seed” ligand
3. Obtain low energy conformers for further analysis in docking protocols
4. Visualize whether a ligand has many or few diverse low energy conformations available to it, to inform design strategy for more constrained or more flexible analogs
5. Apply conformational analysis to selections for fragment screening and virtual screening as one parameter of hit quality

## Instructions

<ShotRow src="plugins-page/conformer-generator/plugin-list.png" alt="The Stacks Menu with Conformer Generator selected in the plugin list">

Access the Conformer Generator plugin from the Stacks Menu.

<UiList label="Stacks Menu">
<UiItem name="Conformer Generator" area="2.3,57.6,50.3,11.1">Selected here, with its description on the right.</UiItem>
<UiItem name="Activate" area="59.6,85.5,17.9,10.9">Starts the selected plugin.</UiItem>
<UiItem name="Data Table" area="2.4,77.6,50.0,10.5">Another plugin for viewing the results, shown at the end of this page.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/conformer-generator/input-protein.png" alt="The Conf Gen panel with the protein entry 5CEO and its ligand 50D selected">

<Steps>

1. In the upper left, the user can select either a protein entry containing a ligand or an individual ligand entry
2. Next, choose the maximum number of conformers (50, 100 or 200) from the pulldown. Conformers too similar to one already kept are left out, so you may get fewer.
3. Users may optionally choose to have the conformer set locked with the seed structure
4. Clicking Generate runs the plugin.  During calculation, this button reads “Generating”
5. Once complete, the “Generating” button returns to “Generate” state and a new entry appears in the entry list
6. The new entry of conformer frames has associated meta data of conformation energy and RMSD to seed ligand

</Steps>

<UiList label="Conf Gen panel">
<UiItem name="Entry" area="3.8,18.4,46.6,9.1">The protein entry, here 5CEO.</UiItem>
<UiItem name="Ligand" area="51.1,18.4,44.6,9.1">The ligand in that protein entry, here 50D.</UiItem>
<UiItem name="Max number of conformers" area="3.8,35.2,91.9,9.1">50, 100 or 200.</UiItem>
<UiItem name="Sort conformers by" area="3.8,52.0,91.9,9.1">Set to minimized energy here.</UiItem>
<UiItem name="Lock entry and result" area="4.1,64.4,91.4,6.9">Optional. Locks the conformer set with the seed structure.</UiItem>
<UiItem name="Generate" area="4.1,87.1,91.4,11.9">Runs the plugin. Reads Generating while it runs.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/conformer-generator/input-ligand.png" alt="The top of the Conf Gen panel with the ligand entry lig 1 {a} selected" crop="0,0,100,45.0">

<UiList label="With a ligand entry">
<UiItem name="Select an entry" area="3.8,18.4,92.1,8.9">An individual ligand entry, here lig 1 {a}, needs only this one pulldown.</UiItem>
<UiItem name="Max number of conformers" area="3.8,34.8,92.1,8.9">Set to 100 here.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/conformer-generator/result.png" alt="The Conf Gen panel back in its Generate state next to the Entry List with the new 50D conf entry, its Advanced Menus button, and the conformer in the workspace">

The conformer entry of frames opens in the workspace, and the new entry list item appears, with a link to the Advanced Menu for navigating frames.

<UiList label="After the run">
<UiItem name="Generate" area="4.0,81.1,31.0,15.4">Back in its Generate state once the run is done.</UiItem>
<UiItem name="50D conf" area="45.1,38.5,31.8,5.8">The new entry of conformer frames.</UiItem>
<UiItem name="Advanced Menus" area="80.0,38.7,3.2,4.8">Opens the Advanced Menu for the frames.</UiItem>
<UiItem name="Conformer" area="44.7,47.6,35.4,33.5">The conformer entry, open in the workspace.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/conformer-generator/frames.png" alt="The Advanced Menu for 50D conf with the Playback and Meta Data tabs open">

Advanced Menu allows sorting and playing back through the conformers, as well as viewing the energy and RMSD of each conformer.

<UiList label="Advanced Menu">
<UiItem name="Frames" area="0.5,13.6,24.6,8.4">Lists the conformers, one frame each.</UiItem>
<UiItem name="Playback" area="24.9,13.6,24.4,8.4">Plays back through the conformers.</UiItem>
<UiItem icon="chevron-right" name="Previous / Next" area="3.9,24.3,41.9,10.7">Steps one conformer at a time. Here, 5 of 101.</UiItem>
<UiItem icon="player-pause" name="Play / Pause" area="4.4,73.6,41.3,10.3">Plays the conformers in turn, or pauses.</UiItem>
<UiItem name="Speed" area="4.4,84.3,33.2,10.5">1x, 5x, 50x or 100x.</UiItem>
<UiItem name="Meta Data" area="74.6,13.6,24.9,8.4">The data for the current conformer.</UiItem>
<UiItem icon="tag" name="conf energy" area="53.4,55.1,39.2,9.8">The conformer's energy.</UiItem>
<UiItem icon="tag" name="conf rmsd" area="53.4,65.4,39.2,9.8">RMSD to the seed ligand.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/conformer-generator/data-table.png" alt="The Data Table plugin listing the 50D conf conformers by conf energy, with the seed ligand row highlighted">

The Data Table plugin can also be used to view results and is accessible through the Stacks Menu. Energy and RMSD to seed ligand may be sorted and filtered in the table, and plotted graphically. Note the seed ligand at RMSD=0 highlighted here.

<UiList label="Data Table">
<UiItem name="50D conf" area="0.0,0.0,30.1,6.6">The entry shown in the table.</UiItem>
<UiItem icon="arrows-sort" name="conf energy" area="40.3,14.4,18.9,4.9">Sorts or filters by energy.</UiItem>
<UiItem icon="arrows-sort" name="conf rmsd" area="62.6,14.4,17.1,4.9">Sorts or filters by RMSD to the seed ligand.</UiItem>
<UiItem name="Seed ligand" area="0.0,60.1,98.2,10.2">Frame 1, at RMSD 0.</UiItem>
<UiItem name="show graphs" area="80.8,0.3,18.9,6.8">Plots the columns as a graph.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/conformer-generator/data-table-graph.png" alt="A Data Table graph of conf rmsd against conf energy, with the seed ligand at RMSD 0">

<UiList label="Data Table graph">
<UiItem name="Y Axis" area="74.8,32.9,25.0,10.8">Set to conf rmsd here.</UiItem>
<UiItem name="X Axis" area="74.8,49.6,24.8,8.1">Set to conf energy here.</UiItem>
<UiItem name="Seed ligand" area="7.5,73.6,12.9,26.4">At RMSD 0, with an energy of 126.65.</UiItem>
</UiList>

</ShotRow>
