---
title: Workspace View
---

# Workspace View

Opening a workspace shows the 3D viewer in the middle, the scenes rail on the left, and the workspace panel on the right. Each open workspace gets a tab under the top bar, and the **+** beside the tabs opens another one.

<vimg src="nanome-web/workspace-overview.jpg" />

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

## Hover, select and measure

Atoms, bonds and residues highlight when the cursor passes over them, and a click selects them.

<DocVideo src="v2-7/web-hover-select-measure.mp4" caption="Hovering, selecting and measuring in Nanome Web (from the v2.7 release)." />

<vimg src="nanome-web/hover-highlight.jpg" />

## Tool rail

The four buttons on the right edge of the viewer choose what a click does:

- **Default**: hover and select.
- **Selection**: builds a selection. A floating bar sets whether a click picks an atom, a residue or a chain, and its **×** clears the selection.
- **Measurement**: clicking atoms measures distances and angles. Measurements are drawn in the viewer with their values.
- **Add a comment**: starts a comment. See [Comments](/nanome_web/comments).

## Bottom bar

- **Settings** (gear): the viewer settings. See [below](#viewer-settings).
- **Set point of view**: saves the current view as the point of view of the active scene.
- **‹ 1/1 ›**: steps to the previous or next scene. The number shows the active scene and the total.
- **Play scenes**: plays through the scenes in order.
- **Capture image**: saves an image of the current view.
- **Sequence**: opens the sequence viewer. See [Sequence viewer](#sequence-viewer).

### Viewer settings

The Settings popup has a day and night toggle (the moon icon), the environment theme, and **Fullscreen**. The seven themes are Default, Arctic Cyan, Aurora Green, Black & White, Gold Orange, Island and Pure Black, which match the themes in [Nanome XR](/nanome_v2/mainpanel#day-night-mode-and-themes).

<vimg src="nanome-web/viewer-settings-themes.jpg" />

## Scenes

A scene is a saved view of the workspace: its components, annotations, molecule positions and point of view. The rail lists scenes by number, and the **»** at the top expands it to show their names.

**+ New Scene** adds a scene, up to 50 per workspace. Each scene's **(...)** menu has **Rename**, **Duplicate** and **Delete**. A camera icon with a time, such as 0:37, marks a scene that holds a recording and shows its length.

<vimg src="nanome-web/scenes-panel-menu.jpg" />

## Sequence viewer

The **Sequence** button at the bottom right of the viewer opens the sequences of every entry in the workspace, one row per entry, with chain labels and residue numbers above the letters. Hovering a residue highlights it in 3D and names it at the top right of the sequence viewer (for example, `4ceo A: GLY 59`). Clicking residues selects them, and **Create** makes a component from the selection. **Clear** empties the selection.

<vimg src="nanome-web/sequence-panel.jpg" />
