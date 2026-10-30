---
title: Sequence Panel
---

# Sequence Panel

The Sequence Panel shows the sequences of all loaded structures, protein and nucleic acid chains alike, in a horizontal, scrollable view. Open it with <Btn icon="mist">Sequences</Btn> at the bottom-right of the [Components tab](/nanome_v2/mainpanel#components-tab).

## <AppIcon name="mist" /> Features {#features}

<ShotRow src="nanome-v2/v2-7/sequence-viewer.webp" alt="The Sequence Panel for 1KV2 with its parts labelled">

- Clicking the chain letter, such as "A", selects the whole chain.
- Clicking residues in the sequence selects them, and selected residues are highlighted.
- Hovering a residue shows its details at the bottom of the panel, such as "5CEO A: TYR 226".

<UiList label="Sequence Panel">
<UiItem name="Filter hidden structures" area="11.9,59.7,22.4,6.9">Leaves out structures that have no visible representation.</UiItem>
<UiItem name="Clear" area="80.8,57.9,6.5,10.4">Clears the selection.</UiItem>
<UiItem name="Create" area="87.6,57.5,7.6,11.1">Creates a component from the selected residues.</UiItem>
</UiList>

When a component is active in the panel, an **Update** button also appears. It updates that component with the current selection.

</ShotRow>
