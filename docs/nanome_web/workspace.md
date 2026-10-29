---
title: Workspace View
---

# Workspace View

Opening a workspace shows the 3D viewer in the middle, the scenes rail on the left, and the workspace panel on the right. Each open workspace gets a tab under the top bar, and the **+** beside the tabs opens another one.

<vimg src="nanome-web/workspace-overview.webp" alt="A workspace in Nanome Web" />

The layout, from left to right:

- **Scenes rail**: the scenes saved in this workspace. See [Scenes](#scenes).
- **3D viewer**: the structures, with the tool rail on its right edge and the scene controls along the bottom.
- **Workspace panel**: the workspace name, project and description, the header buttons, and six tabs: [Entries](/nanome_web/entries), [Ligands](/nanome_web/ligands), [Comments](/nanome_web/comments), MARA, [Import](/nanome_web/loading) and [Users](/nanome_web/collaboration).

The **»** button at the top of the panel collapses it to give the viewer more room.

## Header buttons

- **Open in XR** (headset icon): sends this workspace to Nanome XR on your headset. Nanome XR asks whether to load it just for you or for everyone in your current session.
- **More (...)**: Open in new tab, Edit info, Copy shareable link, Duplicate, Open in XR, Move to project, Export analysis and Delete. These are described on [Home, Workspaces & Projects](/nanome_web/home#workspaces).

## Moving around

Mouse and trackpad controls in the 3D viewer:

| Action | Mouse | Touch screen |
|--------|-------|--------------|
| Rotate | Left-drag | One-finger drag |
| Pan | Right-drag | Two-finger drag |
| Zoom | Scroll wheel | Pinch |
| Zoom to a residue or entry | Double-click it | |

Rotation and zoom pivot on the current selection, or on the highlighted residue under the cursor, so the part being inspected stays in view.

When the connection to Nanome's server is slow, a warning icon appears at the top left of the viewer. Hovering it shows the ping time.

## Tool rail

The four buttons on the right edge of the viewer choose what a click in the 3D view does. Hovering a button names it.

| Button | Tool | Modes |
|--------|------|-------|
| Droplet | **Default** | none |
| Lasso | **Selection** | Atom, Residue, Chain |
| Ruler | **Measurement** | Distance, Angle, Dihedral, Delete |
| Speech bubble | **Add a comment** | none |

The Selection and Measurement tools show their modes in a bar at the bottom of the viewer, in place of the scene controls. **Exit tool** (**×**) at the end of the bar goes back to the Default tool.

<DocVideo src="v2-7/web-hover-select-measure.mp4" caption="Hovering, selecting and measuring in Nanome Web (from the v2.7 release)." />

### Default

Hovering highlights the whole residue under the cursor, whether the cursor is on an atom, a bond or the ribbon. Clicking adds that residue to the selection, or removes it when it's already selected. Clicking empty space clears the selection, and double-clicking zooms to a residue or an entry.

<vimg src="nanome-web/hover-highlight.webp" alt="An atom highlighted and labelled on hover" />

### Selection tool

The Selection tool picks atoms at the level set in the bar:

- **Atom**: one atom.
- **Residue**: the whole residue.
- **Chain**: the whole chain.

The tool opens in Atom mode. Hovering outlines in blue what a click would pick, here chain A in Chain mode:

<vimg src="nanome-web/selection-chain-hover.webp" alt="A chain highlighted on hover in Chain mode" />

Clicking adds it to the selection, or removes it when all of it is already selected. Selected atoms are outlined in white. Clicking empty space clears the selection.

<vimg src="nanome-web/selection-chain-selected.webp" alt="A selected chain outlined in white" />

Rotation and zoom pivot on the selection. The [sequence viewer](#sequence-viewer) selects residues too, and its **Create** button turns the selection into a component.

### Measurement tool

The Measurement tool measures between atoms. The bar sets what it measures:

| Mode | Atoms to click | Result |
|------|----------------|--------|
| **Distance** | 2 | The distance, in ångströms to two decimal places |
| **Angle** | 3 | The angle at the second atom, in degrees to one decimal place |
| **Dihedral** | 4 | The torsion angle around the bond axis from atom 2 to atom 3, in degrees from 0° to 180° |
| **Delete** | none | Removes the measurement that's clicked |

The tool opens in Distance mode. Hovering an atom rings it and labels it with the entry, chain, residue and atom name. After the first click, a dashed line follows the cursor and shows the value live, and the last click completes the measurement.

<vimg src="nanome-web/measure-distance-preview.webp" alt="A distance measurement in progress" />

Clicking empty space, or an atom that's already picked, cancels the measurement in progress. Only atoms can be picked, so bonds and ribbons don't get in the way, and hidden atoms can't be measured. In Angle mode an arc marks the angle at the second atom:

<vimg src="nanome-web/measure-angle-preview.webp" alt="An angle measurement in progress" />

Finished measurements stay drawn in the viewer with their values:

<vimg src="nanome-web/measure-results.webp" alt="A finished distance and angle" />

Measurements are saved in the current scene, so everyone in the workspace sees them, in Nanome Web and in [Nanome XR](/nanome_v2/toolspanel#measurement-tool). Saving one needs Editor access. **Export analysis**, in the workspace's **More (...)** menu, includes them in its CSV files.

<Callout type="note" title="Dihedral angles have no sign">

Nanome shows dihedral angles from 0° to 180°. Torsions of −60° and +60° both read 60°, so the direction of the twist has to be read from the structure.

</Callout>

In **Delete** mode, hovering a measurement turns it red, and clicking removes it.

<vimg src="nanome-web/measure-delete.webp" alt="A distance measurement highlighted for deletion" />

### Add a comment

Starts a comment from the 3D view. See [Comments](/nanome_web/comments).

## Bottom bar

- **Settings** (gear): the viewer settings. See [below](#viewer-settings).
- **Set point of view**: saves the current view as the point of view of the active scene.
- **‹ 1/1 ›**: steps to the previous or next scene. The number shows the active scene and the total.
- **Play scenes**: plays through the scenes in order.
- **Capture image**: saves an image of the current view.
- **Sequence**: opens the sequence viewer. See [Sequence viewer](#sequence-viewer).

### Viewer settings

The Settings popup has a day and night toggle (the moon icon), the environment theme, and **Fullscreen**. The seven themes are Default, Arctic Cyan, Aurora Green, Black & White, Gold Orange, Island and Pure Black, which match the themes in [Nanome XR](/nanome_v2/mainpanel#day-night-mode-and-themes).

<vimg src="nanome-web/viewer-settings-themes.webp" alt="The viewer theme list" />

## Scenes

A scene is a saved view of the workspace: its components, annotations, molecule positions and point of view. The rail lists scenes by number, and the **»** at the top expands it to show their names.

**+ New Scene** adds a scene, up to 50 per workspace. Each scene's **(...)** menu has **Rename**, **Duplicate** and **Delete**. A camera icon with a time, such as 0:37, marks a scene that holds a recording and shows its length.

<vimg src="nanome-web/scenes-panel-menu.webp" alt="The Scenes panel with a scene menu open" />

## Sequence viewer

The **Sequence** button at the bottom right of the viewer opens the sequences of every entry in the workspace, one row per entry, with chain labels and residue numbers above the letters. Hovering a residue highlights it in 3D and names it at the top right of the sequence viewer (for example, `4ceo A: GLY 59`). Clicking residues selects them, and **Create** makes a component from the selection. **Clear** empties the selection.

<vimg src="nanome-web/sequence-panel.webp" alt="The sequence viewer" />
