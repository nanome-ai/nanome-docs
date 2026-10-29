---
outline: [2, 3]
title: Workspace View
---

# Workspace View

An open workspace has the workspace panel on the right, the 3D view in the middle and the scenes rail on the left.

The panel's six tabs are the workspace's main menus:

<IconGrid label="Workspace panel tabs" :cols="3">
<IconCard icon="stack-2" title="Entries" href="/nanome_web/entries">The structures and how each is drawn.</IconCard>
<IconCard icon="hexagon" title="Ligands" href="/nanome_web/ligands">Every ligand in a table, with properties.</IconCard>
<IconCard icon="message" title="Comments" href="/nanome_web/comments">Threaded comments.</IconCard>
<IconCard icon="sparkles" title="MARA" href="#mara-tab">A MARA chat inside the workspace.</IconCard>
<IconCard icon="upload" title="Import" href="/nanome_web/loading">Loading structures.</IconCard>
<IconCard icon="users" title="Users" href="/nanome_web/collaboration">Sharing and sending to a headset.</IconCard>
</IconGrid>

<ShotRow src="nanome-web/workspace-overview.webp" alt="A workspace in Nanome Web">

Around the 3D view:

<IconGrid label="Around the 3D view" :cols="3">
<IconCard icon="lasso" title="Tool rail" href="#tool-rail">Default, Selection, Measurement and Add a comment, on the view's right edge.</IconCard>
<IconCard icon="mouse" title="Moving around" href="#moving-around">Rotate, pan and zoom with the mouse or touch.</IconCard>
<IconCard icon="player-play" title="Bottom bar" href="#bottom-bar">Point of view, scene stepping and playback, Capture image and viewer settings.</IconCard>
<IconCard icon="mist" title="Sequence viewer" href="#sequence-viewer">The sequences of every entry, for hovering and selecting residues.</IconCard>
<IconCard icon="box" title="Scenes rail" href="#scenes">The scenes saved in this workspace, on the left.</IconCard>
<IconCard icon="cube-3d-sphere" title="Workspace tabs" href="#workspace-tabs">One tab for each open workspace, under the top bar.</IconCard>
</IconGrid>

</ShotRow>

## <AppIcon name="chevrons-right" /> Workspace panel {#workspace-panel}

The panel shows the workspace name, project and description above its six tabs. Its header has these buttons:

<UiList label="Workspace panel header">
<UiItem icon="chevrons-right" name="Collapse panel">At the top of the panel: collapses it to give the viewer more room.</UiItem>
<UiItem icon="device-vision-pro" name="Open in XR">Sends this workspace to Nanome XR on your headset, which asks whether to load it just for you or for everyone in your current session.</UiItem>
<UiItem icon="dots" name="More (...)" href="/nanome_web/home#workspaces">Open in new tab, Edit info, Copy shareable link, Duplicate, Open in XR, Move to project, Export analysis and Delete.</UiItem>
</UiList>

## <AppIcon name="sparkles" /> MARA tab {#mara-tab}

The **MARA** tab is a MARA chat inside the workspace, beside the 3D view.

<ShotRow src="nanome-web/mara-tab.webp" alt="The MARA tab with no chats yet">

<UiList label="MARA tab">
<UiItem icon="messages" name="Chat History">The chats started in this workspace.</UiItem>
<UiItem icon="files" name="Files">The current chat's files. Grayed out until a chat is open.</UiItem>
<UiItem icon="plus" name="New Chat">Starts a new chat.</UiItem>
<UiItem icon="paperclip" name="Attach file">Adds a file to your message.</UiItem>
<UiItem icon="hexagon" name="Draw SMILES">Opens Sketch Molecule, to draw a structure.</UiItem>
<UiItem icon="tool" name="Run tool">Picks a MARA tool to run.</UiItem>
<UiItem icon="route" name="Run workflow">Picks a workflow to run.</UiItem>
<UiItem icon="arrow-up" name="Send">Sends your message.</UiItem>
</UiList>

</ShotRow>

More on what MARA can do is in the [MARA section](/mara/overview).

## <AppIcon name="lasso" /> Tool rail {#tool-rail}

The four buttons on the right edge of the viewer choose what a click in the 3D view does. Hovering a button names it.

<UiList label="Tool rail">
<UiItem icon="droplet" name="Default" href="#default">Hover highlights a residue, and a click selects it. No modes.</UiItem>
<UiItem icon="lasso" name="Selection" href="#selection-tool">Modes: Atom, Residue, Chain.</UiItem>
<UiItem icon="ruler-2" name="Measurement" href="#measurement-tool">Modes: Distance, Angle, Dihedral, Delete.</UiItem>
<UiItem icon="message" name="Add a comment" href="#add-a-comment">Starts a comment from the 3D view. No modes.</UiItem>
</UiList>

The Selection and Measurement tools show their modes in a bar at the bottom of the viewer, in place of the scene controls. <Btn icon="x">Exit tool</Btn> at the end of the bar goes back to the Default tool.

<DocVideo src="v2-7/web-hover-select-measure.mp4" caption="Hovering, selecting and measuring in Nanome Web (from the v2.7 release)." />

### <AppIcon name="droplet" /> Default {#default}

<ShotRow src="nanome-web/hover-highlight.webp" alt="An atom highlighted and labelled on hover">

Hovering highlights the whole residue under the cursor, whether the cursor is on an atom, a bond or the ribbon. Clicking adds that residue to the selection, or removes it when it's already selected. Clicking empty space clears the selection, and double-clicking zooms to a residue or an entry.

</ShotRow>

### <AppIcon name="lasso" /> Selection tool {#selection-tool}

<ShotRow src="nanome-web/selection-chain-selected.webp" alt="Chain A selected in Chain mode, outlined in white">

The Selection tool picks atoms at the level set in the bar:

<UiList label="Selection modes">
<UiItem icon="atom" name="Atom">One atom. The tool opens in this mode.</UiItem>
<UiItem icon="hexagons" name="Residue">The whole residue.</UiItem>
<UiItem icon="scribble" name="Chain">The whole chain.</UiItem>
<UiItem icon="x" name="Exit tool">Goes back to the Default tool.</UiItem>
</UiList>

Hovering outlines in blue what a click would pick. Clicking adds it to the selection, or removes it when all of it is already selected. Selected atoms are outlined in white. Clicking empty space clears the selection.

</ShotRow>

Rotation and zoom pivot on the selection. The [sequence viewer](#sequence-viewer) selects residues too, and its **Create** button turns the selection into a component.

### <AppIcon name="ruler-2" /> Measurement tool {#measurement-tool}

<ShotRow src="nanome-web/measure-results.webp" alt="A finished distance and angle on the 4CEO ligand">

The Measurement tool measures between atoms. The bar sets what it measures:

<UiList label="Measurement modes">
<UiItem icon="ruler-measure" name="Distance">Click 2 atoms. The distance, in ångströms to two decimal places. The tool opens in this mode.</UiItem>
<UiItem icon="angle" name="Angle">Click 3 atoms. The angle at the second atom, in degrees to one decimal place.</UiItem>
<UiItem icon="rotate-clockwise-2" name="Dihedral">Click 4 atoms. The torsion angle around the bond axis from atom 2 to atom 3, in degrees from 0° to 180°.</UiItem>
<UiItem icon="trash" name="Delete">Removes the measurement that's clicked.</UiItem>
<UiItem icon="x" name="Exit tool">Goes back to the Default tool.</UiItem>
</UiList>

<Steps>

1. Hovering an atom rings it and labels it with the entry, chain, residue and atom name.
2. After the first click, a dashed line follows the cursor and shows the value live. In Angle mode an arc marks the angle at the second atom.
3. The last click completes the measurement. Finished measurements stay drawn in the viewer with their values.

</Steps>

</ShotRow>

- Clicking empty space, or an atom that's already picked, cancels the measurement in progress.
- Only atoms can be picked, so bonds and ribbons don't get in the way, and hidden atoms can't be measured.
- Measurements are saved in the current scene, so everyone in the workspace sees them, in Nanome Web and in Nanome XR. Saving one needs Editor access.
- **Export analysis**, in the workspace's **More (...)** menu, includes them in its CSV files.

<Callout type="note" title="Dihedral angles have no sign">

Nanome shows dihedral angles from 0° to 180°. Torsions of −60° and +60° both read 60°, so the direction of the twist has to be read from the structure.

</Callout>

In **Delete** mode, hovering a measurement turns it red, and clicking removes it.

### <AppIcon name="message" /> Add a comment {#add-a-comment}

Starts a comment from the 3D view, as described on [Comments](/nanome_web/comments).

## <AppIcon name="mouse" /> Moving around {#moving-around}

Mouse and touch controls in the 3D viewer:

<UiList label="Mouse and touch controls">
<UiItem name="Rotate">Left-drag. On a touch screen, a one-finger drag.</UiItem>
<UiItem name="Pan">Right-drag. On a touch screen, a two-finger drag.</UiItem>
<UiItem name="Zoom">Scroll wheel. On a touch screen, pinch.</UiItem>
<UiItem name="Zoom to a residue or entry">Double-click it.</UiItem>
</UiList>

Rotation and zoom pivot on the current selection, or on the highlighted residue under the cursor, so the part being inspected stays in view.

When the connection to Nanome's server is slow, a warning icon <AppIcon name="wifi-off" /> appears at the top left of the viewer. Hovering it shows the ping time.

## <AppIcon name="player-play" /> Bottom bar {#bottom-bar}

<UiList label="Bottom bar">
<UiItem icon="settings" name="Settings" href="#viewer-settings">The viewer settings.</UiItem>
<UiItem icon="scan-eye" name="Set point of view">Saves the current view as the point of view of the active scene.</UiItem>
<UiItem icon="chevron-right" name="‹ 1/1 ›">Steps to the previous or next scene. The number shows the active scene and the total.</UiItem>
<UiItem icon="player-play" name="Play scenes">Plays through the scenes in order.</UiItem>
<UiItem icon="camera" name="Capture image">Saves an image of the current view.</UiItem>
<UiItem icon="mist" name="Sequence" href="#sequence-viewer">Opens the sequence viewer, at the bottom right.</UiItem>
</UiList>

### <AppIcon name="settings" /> Viewer settings {#viewer-settings}

<ShotRow src="nanome-web/viewer-settings-themes.webp" alt="The viewer theme list">

<UiList label="Viewer settings">
<UiItem icon="moon" name="Day and night toggle">Switches between day and night.</UiItem>
<UiItem name="Environment theme">Default, Arctic Cyan, Aurora Green, Black & White, Gold Orange, Island or Pure Black.</UiItem>
<UiItem name="Fullscreen">Shows the viewer full screen.</UiItem>
</UiList>

The seven themes match the themes in Nanome XR.

</ShotRow>

## <AppIcon name="mist" /> Sequence viewer {#sequence-viewer}

The **Sequence** button at the bottom right of the viewer opens the sequences of every entry in the workspace, one row per entry, with chain labels and residue numbers above the letters. Hovering a residue highlights it in 3D and names it at the top right of the sequence viewer (for example, `4ceo A: GLY 59`). Clicking residues selects them.

<ShotRow src="nanome-web/sequence-panel.webp" alt="The sequence viewer">

<UiList label="Sequence viewer">
<UiItem name="Create">Makes a component from the selection.</UiItem>
<UiItem name="Clear">Empties the selection.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="box" /> Scenes {#scenes}

A scene is a saved view of the workspace: its components, annotations, molecule positions and point of view. The rail lists scenes by number.

<ShotRow src="nanome-web/scenes-panel-menu.webp" alt="The Scenes panel with a scene menu open">

<UiList label="Scenes rail">
<UiItem icon="chevrons-right" name="Expand">At the top: expands the rail to show the scene names.</UiItem>
<UiItem icon="plus" name="New Scene">Adds a scene, up to 50 per workspace.</UiItem>
<UiItem icon="dots" name="More">Each scene's menu: Rename, Duplicate and Delete.</UiItem>
<UiItem icon="video" name="Recording">With a time, such as 0:37, marks a scene that holds a recording and shows its length.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="cube-3d-sphere" /> Workspace tabs {#workspace-tabs}

<UiList label="Workspace tabs">
<UiItem icon="cube-3d-sphere" name="Workspace tab">Each open workspace gets a tab under the top bar.</UiItem>
<UiItem icon="plus" name="New tab">Opens another workspace tab.</UiItem>
</UiList>
