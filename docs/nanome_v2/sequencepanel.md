---
title: Sequence Panel
---

# Sequence Panel

The Sequence Panel shows the sequences of all loaded structures, protein and nucleic acid chains alike, in a horizontal, scrollable view. <Btn icon="mist">Sequences</Btn> at the bottom-right of the [Components tab](/nanome_v2/mainpanel#components-tab) opens it.

## <AppIcon name="mist" /> Features {#features}

<ShotRow src="nanome-v2/v2-7/sequence-panel.webp" alt="The Sequence Panel for 1KV2, with chain A's sequence and some residues selected">

<UiList label="Sequence Panel">
<UiItem name="Entry" area="1.4,27.7,4.9,12.2">The structure the sequences belong to, such as 1KV2.</UiItem>
<UiItem name="Chain" area="10.7,12.8,1.9,10.6">The chain letter, such as A. Clicking it selects the whole chain.</UiItem>
<UiItem name="Residue numbers" area="10.8,25.5,87.1,9.6">The chain's first residue number, then every tenth.</UiItem>
<UiItem name="Gray letters" area="10.9,37.5,4.2,9.5">Residues in the entry's sequence that weren't located in the structure. They can't be hovered or selected.</UiItem>
<UiItem name="Selected residues" area="48.5,35.1,48.5,13.8">Clicking residues selects them, and selected residues are highlighted.</UiItem>
<UiItem name="Filter hidden structures" area="2.9,70.7,25.6,16.5">Leaves out structures that have no visible representation.</UiItem>
<UiItem name="Clear" area="81.9,67.6,7.2,22.9">Clears the selection.</UiItem>
<UiItem name="Create" area="89.9,67.6,8.2,22.9">Editors only. Asks for a name, Sequence selection by default, then creates a component from the selected residues.</UiItem>
</UiList>

- Hovering a residue shows its details at the bottom of the panel, such as "1KV2 A: THR 106".
- When a component is active in the panel, its name shows beside the buttons and **Create** becomes **Update**, which updates that component with the current selection. Selecting the name ends that, and the button goes back to **Create**.

</ShotRow>
