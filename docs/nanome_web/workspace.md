---
outline: [2, 3]
title: Workspace View
---

# Workspace View

An open workspace has the workspace panel on the right, the 3D view in the middle and the scenes rail on the left.

The panel's six tabs are the workspace's main menus:

<ScreenMap src="nanome-web/workspace-overview.webp" alt="A workspace in Nanome Web" label="Workspace View screen">
<MapCard icon="stack-2" title="Entries" href="/nanome_web/entries" side="top" area="66.0,29.9,5.6,5.3">The structures and how each is drawn.</MapCard>
<MapCard icon="hexagon" title="Ligands" href="/nanome_web/ligands" side="top" area="71.7,29.9,5.4,5.3">Every ligand in a table, with properties.</MapCard>
<MapCard icon="message" title="Comments" href="/nanome_web/comments" side="top" area="77.4,29.9,6.6,5.3">Threaded comments.</MapCard>
<MapCard icon="sparkles" title="MARA" href="#mara-tab" side="top" area="84.4,29.9,4.7,5.3">A MARA chat inside the workspace.</MapCard>
<MapCard icon="upload" title="Import" href="/nanome_web/loading" side="top" area="89.4,29.9,4.8,5.3">Loading structures.</MapCard>
<MapCard icon="users" title="Users" href="/nanome_web/collaboration" side="top" area="94.5,29.9,4.4,5.3">Sharing and sending to a headset.</MapCard>
<MapCard icon="cube-3d-sphere" title="Workspace tabs" href="#workspace-tabs" side="left" area="0.4,7.6,9.0,5.3">One tab for each open workspace, under the top bar.</MapCard>
<MapCard icon="box" title="Scenes rail" href="#scenes" side="left" area="0.0,12.9,3.1,87.1">The scenes saved in this workspace, on the left.</MapCard>
<MapCard icon="chevrons-right" title="Workspace panel" href="#workspace-panel" side="right" area="66.2,12.9,33.8,87.1">The workspace's name, project and description, above the six tabs.</MapCard>
<MapCard icon="lasso" title="Tool rail" href="#tool-rail" side="right" area="62.9,47.0,3.0,19.2">Default, Selection, Measurement and Add a comment, on the view's right edge.</MapCard>
<MapCard icon="mouse" title="Moving around" href="#moving-around" side="bottom" area="3.2,12.9,62.9,87.1">Rotate, pan and zoom with the mouse or touch.</MapCard>
<MapCard icon="player-play" title="Bottom bar" href="#bottom-bar" side="bottom" area="3.5,93.7,39.6,5.7">Point of view, scene stepping and playback, Capture image and viewer settings.</MapCard>
<MapCard icon="mist" title="Sequence viewer" href="#sequence-viewer" side="bottom" area="62.9,93.8,3.0,5.5">The sequences of every entry, for hovering and selecting residues.</MapCard>
</ScreenMap>

## <AppIcon name="chevrons-right" /> Workspace panel {#workspace-panel}

The panel shows the workspace name, project and description above its six tabs. Its header has these buttons:

<UiList label="Workspace panel header">
<UiItem icon="chevrons-right" name="Collapse panel">At the top of the panel: collapses it to give the viewer more room.</UiItem>
<UiItem icon="device-vision-pro" name="Open in XR" href="/nanome_web/collaboration#sending-a-workspace-to-a-headset">Sends this workspace to Nanome XR on your headset. With other people in the headset's session, it asks whether to load it just for you or for everyone.</UiItem>
<UiItem icon="dots" name="More (...)" href="/nanome_web/home#workspaces">Open in new tab, Edit info, Copy shareable link, Duplicate, Open in XR, Move to project, Export analysis and Delete.</UiItem>
</UiList>

## <AppIcon name="sparkles" /> MARA tab {#mara-tab}

The **MARA** tab is a MARA chat inside the workspace, beside the 3D view.

<ShotRow src="nanome-web/mara-tab.webp" alt="The MARA tab with no chats yet">

<UiList label="MARA tab">
<UiItem icon="messages" name="Chat History" area="2.7,1.4,30.8,7.8">The chats started in this workspace.</UiItem>
<UiItem icon="files" name="Files" area="82.5,1.5,6.9,7.7">The current chat's files. Grayed out until a chat is open.</UiItem>
<UiItem icon="plus" name="New Chat" area="90.3,1.5,6.8,7.7">Starts a new chat.</UiItem>
<UiItem icon="paperclip" name="Attach file" area="55.8,87.4,5.9,6.5">Adds a file to your message.</UiItem>
<UiItem icon="hexagon" name="Draw SMILES" area="63.7,87.4,5.9,6.5">Opens Sketch Molecule, to draw a structure.</UiItem>
<UiItem icon="tool" name="Run tool" area="71.7,87.4,5.9,6.5">Picks a MARA tool to run.</UiItem>
<UiItem icon="route" name="Run workflow" area="79.7,87.4,5.9,6.5">Picks a workflow to run.</UiItem>
<UiItem icon="arrow-up" name="Send" area="87.5,86.2,7.9,8.8">Sends your message.</UiItem>
</UiList>

</ShotRow>

Chats started here stay with this workspace, in its **Chat History**. MARA works on this workspace and the scene on screen, so "this scene" is enough in a question. [Chats in a workspace](/mara/conversations#workspace-chats) compares them with chats on the Conversations page.

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

A click only counts when the mouse moves 4 pixels or less between pressing and releasing the button. A longer drag turns or pans the view, so dragging never selects or measures.

<DocVideo src="v2-7/web-hover-select-measure.mp4" caption="Hovering, selecting and measuring in Nanome Web (from the v2.7 release)." />

### <AppIcon name="droplet" /> Default {#default}

<ShotRow src="nanome-web/hover-highlight.webp" alt="A residue on the ribbon highlighted and labeled on hover">

Hovering highlights the whole residue under the cursor, whether the cursor is on an atom, a bond or the ribbon. Clicking adds that residue to the selection, or removes it when it's already selected. Clicking empty space clears the selection, and double-clicking zooms to a residue or an entry.

<UiList label="Hover">
<UiItem icon="droplet" name="Hovered residue" area="34.4,28.0,9.4,11.4">Outlined in blue. Its label gives the entry name, then the chain, residue and residue number, such as A|GLY'59. On an atom, the label adds the atom name.</UiItem>
</UiList>

</ShotRow>

The Default tool works like the [Pointer](/nanome_v2/toolspanel#pointer) in Nanome XR.

### <AppIcon name="lasso" /> Selection tool {#selection-tool}

<ShotRow src="nanome-web/selection-chain-selected.webp" alt="Chain A selected in Chain mode, outlined in white">

The Selection tool picks atoms at the level set in the bar:

<UiList label="Selection modes">
<UiItem icon="atom" name="Atom" area="37.6,92.7,6.1,5.5">One atom. The tool opens in this mode.</UiItem>
<UiItem icon="hexagons" name="Residue" area="43.9,92.7,6.1,5.5">The whole residue.</UiItem>
<UiItem icon="scribble" name="Chain" area="50.4,92.7,6.0,5.5">The whole chain.</UiItem>
<UiItem icon="x" name="Exit tool" area="56.6,92.7,6.1,5.5">Goes back to the Default tool.</UiItem>
</UiList>

Hovering outlines in blue what a click would pick. Clicking adds it to the selection, or removes it when all of it is already selected. Selected atoms are outlined in white. Clicking empty space clears the selection.

</ShotRow>

Rotation and zoom pivot on the selection. The [sequence viewer](#sequence-viewer) selects residues too, and its **Create** button turns the selection into a component.

In Nanome XR, the [Selection Tool](/nanome_v2/toolspanel#selection-tool) can also select by dragging over atoms. In Nanome Web a drag turns the view.

### <AppIcon name="ruler-2" /> Measurement tool {#measurement-tool}

The Measurement tool measures between atoms. The bar sets what it measures:

<UiList label="Measurement modes">
<UiItem icon="ruler-measure" name="Distance">Click 2 atoms. The distance, in ångströms to two decimal places. The tool opens in this mode.</UiItem>
<UiItem icon="angle" name="Angle">Click 3 atoms. The angle at the second atom, in degrees to one decimal place.</UiItem>
<UiItem icon="rotate-clockwise-2" name="Dihedral">Click 4 atoms. The torsion angle around the bond axis from atom 2 to atom 3, in degrees from 0° to 180°, to one decimal place.</UiItem>
<UiItem icon="trash" name="Delete">Removes the measurement that's clicked.</UiItem>
<UiItem icon="x" name="Exit tool">Goes back to the Default tool.</UiItem>
</UiList>

<ShotRow src="nanome-web/measure-results.webp" alt="A finished distance and angle on the 4CEO ligand">

<Steps>

1. Hovering an atom rings it and labels it with the entry, chain, residue and atom name.
2. After the first click, a dashed line follows the cursor and shows the value live. In Angle mode an arc marks the angle at the second atom.
3. The last click completes the measurement. Finished measurements stay drawn in the viewer with their values.

</Steps>

<UiList label="Finished measurements">
<UiItem icon="angle" name="Angle" area="28.0,38.0,10.5,4.5">The value sits beside the second atom, with lines to the other two.</UiItem>
<UiItem icon="ruler-measure" name="Distance" area="48.5,41.5,13.0,6.0">The value sits at the middle of the dashed line.</UiItem>
</UiList>

</ShotRow>

- Clicking empty space, or an atom that's already picked, cancels the measurement in progress.
- Only atoms can be picked, so bonds and ribbons don't get in the way, and hidden atoms can't be measured.
- Measurements are saved in the current scene, so everyone in the workspace sees them, in Nanome Web and in Nanome XR. Saving one needs Editor access.
- **Export analysis**, in the workspace's **More (...)** menu, includes them in its CSV files.

<Callout type="note" title="Dihedral angles have no sign">

Nanome shows dihedral angles from 0° to 180°. Torsions of −60° and +60° both read 60°, so the direction of the twist has to be read from the structure.

</Callout>

Nanome Web draws measurements the same way as Nanome XR. A distance, a dihedral and an angle look like this:

<vimg src="nanome-v2/v2-7/measurement-types.webp" alt="A distance, a dihedral and an angle measured on the 1KV2 ligand" />

In **Delete** mode, hovering a measurement turns it red, and clicking removes it.

<Accordion title="How the tool picks" teaser="The live line, and a 12-pixel reach in Delete mode.">

- Between clicks, the dashed line ends at the hovered atom. Away from any atom, it follows the cursor at the depth of the first picked atom.
- In **Delete** mode, the cursor picks the measurement whose lines pass closest to it, within 12 pixels on screen.

</Accordion>

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

While you're [following someone](/nanome_web/collaboration#following-from-the-web), dragging still turns or pans the view. When you let go, the view eases back to theirs.

<Accordion title="Pivot and double-click details" teaser="What the view turns around, and what a double-click frames.">

- Rotation and zoom turn around the center of the selection. With nothing selected, they turn around the center of what's highlighted under the cursor, such as the hovered residue. With nothing under the cursor, they turn around a point in the middle of the view.
- The scroll wheel keeps the same pivot until scrolling pauses for 0.5 seconds, so the view doesn't jump as other residues pass under the cursor.
- Double-clicking frames what's highlighted under the cursor: the residue with the Default tool, or the atom, residue or chain with the Selection tool. Double-clicking inside an entry's bounding box, but off its atoms and ribbon, frames the whole entry, as long as the box covers less than 75% of the view.

</Accordion>

When the connection to Nanome's server is slow, a warning icon <AppIcon name="wifi-off" /> appears at the top left of the viewer. Hovering it shows the ping time.

## <AppIcon name="player-play" /> Bottom bar {#bottom-bar}

The bottom of the viewer has Settings on the left, the scene controls in the middle and Sequence on the right.

<UiList label="Bottom bar">
<UiItem icon="settings" name="Settings" href="#viewer-settings">The viewer settings.</UiItem>
<UiItem icon="scan-eye" name="Set point of view" href="#point-of-view">Saves the current view as the point of view of the active scene.</UiItem>
<UiItem icon="chevron-right" name="‹ 1/1 ›">Steps to the previous or next scene. The number shows the active scene and the total.</UiItem>
<UiItem icon="player-play" name="Play scenes" href="#playing-scenes">Plays through the scenes in order.</UiItem>
<UiItem icon="camera" name="Capture image">Saves an image of the current view.</UiItem>
<UiItem icon="mist" name="Sequence" href="#sequence-viewer">Opens the sequence viewer, at the bottom right.</UiItem>
</UiList>

### <AppIcon name="settings" /> Viewer settings {#viewer-settings}

<ShotRow src="nanome-web/viewer-settings-themes.webp" alt="The viewer settings with the theme list open">

<UiList label="Viewer settings">
<UiItem icon="settings" name="Settings" area="9.5,87.3,13.4,11.4">At the bottom left of the viewer: opens the settings card.</UiItem>
<UiItem icon="sun" name="Day and night toggle" href="#environment-themes" area="14.6,64.0,11.2,9.6">Switches the theme between its day and night versions.</UiItem>
<UiItem icon="view-360" name="Environment theme" href="#environment-themes" area="27.2,3.7,61.1,70.1">Default, Arctic Cyan, Aurora Green, Black & White, Gold Orange, Island or Pure Black.</UiItem>
<UiItem icon="arrows-maximize" name="Fullscreen" area="14.8,74.6,73.8,10.2">Shows the viewer full screen.</UiItem>
</UiList>

The seven themes match the themes in Nanome XR.

</ShotRow>

### <AppIcon name="view-360" /> Environment themes {#environment-themes}

Since release 2.7 the background around the structures is a range of procedurally generated mountains in the colors of the theme, with a day and a night version of each theme. Nanome Web draws the same mountains as Nanome XR.

Each theme in the copy below shows the viewer in it, by day or by night.

<ThemeDemo app="web" />

- Pure Black is plain black by day and by night.
- The theme and the day or night choice change only your own view. Other people in the workspace keep theirs.
- Nanome Web has no floor grid, so it has no Floor switch, and it doesn't show other people's avatars. The headset's floor, passthrough and avatars are on [Environment](/nanome_v2/environment).

<Accordion title="How the mountains are drawn" teaser="One panorama per theme, redrawn when the theme or day and night changes.">

Each theme has a day palette and a night palette. A palette sets the colors of the sky from the top down to the horizon, the sun, and the ground near and far. Nanome draws layered mountain ridges in these colors into one panoramic image, with the farther ridges fading into the haze at the horizon. It redraws the image only when the theme or the day and night setting changes.

</Accordion>

## <AppIcon name="mist" /> Sequence viewer {#sequence-viewer}

The **Sequence** button at the bottom right of the viewer opens the sequences of every entry in the workspace, one row per entry, with chain labels and residue numbers above the letters. Hovering a residue highlights it in 3D and names it at the top right of the sequence viewer (for example, `4ceo A: GLY 59`). Clicking residues selects them.

<ShotRow src="nanome-web/sequence-panel.webp" alt="The sequence viewer for 4CEO">

<UiList label="Sequence viewer">
<UiItem icon="mist" name="Sequences" area="1.0,7.1,16.4,12.5">The header, with the number of entries shown.</UiItem>
<UiItem icon="chevron-down" name="Collapse" area="96.2,8.7,1.7,9.3">Folds the sequence viewer away.</UiItem>
<UiItem name="Entry" area="0.6,39.4,4.4,10.9">Each entry's row starts with its name.</UiItem>
<UiItem name="Chain label" area="13.5,32.4,1.4,8.3">The chain's letter, at the start of each chain.</UiItem>
<UiItem name="Residue numbers" area="13.4,41.7,83.5,6.7">At the start of each chain, on numbers that are multiples of 10, and after a jump of 10 or more in the numbering.</UiItem>
<UiItem name="Missing residues" area="13.4,48.7,36.8,9.0">In gray: residues that are in the sequence but have no atoms in the structure.</UiItem>
<UiItem name="Clear" area="84.0,73.7,6.8,23.7">Empties the selection.</UiItem>
<UiItem name="Create" area="91.2,73.7,7.8,23.7">Makes a component from the selection.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="box" /> Scenes {#scenes}

A scene is a saved view of the workspace: its components, annotations, molecule positions and point of view. The rail lists scenes by number. A workspace holds up to 50 scenes and always keeps at least 1.

<ShotRow src="nanome-web/scenes-panel-menu.webp" alt="The Scenes panel with a scene menu open">

<UiList label="Scenes rail">
<UiItem icon="chevrons-left" name="Collapse / Expand" area="41.0,5.5,6.8,8.8">At the top: narrows the rail to the scene numbers, or widens it again to show the scene names.</UiItem>
<UiItem icon="box" name="Scene" area="2.4,25.4,17.0,9.2">Selecting a scene switches to it.</UiItem>
<UiItem icon="video" name="Recording" href="#recordings" area="34.2,33.2,13.0,7.4">With a time, such as 0:37, marks a scene that holds a recording and shows its length.</UiItem>
<UiItem icon="plus" name="New Scene" area="3.9,48.7,28.2,8.8">Adds a scene, up to 50 per workspace.</UiItem>
<UiItem icon="pencil" name="Rename" href="#scene-menu" area="42.0,43.4,47.6,13.3">Renames the scene.</UiItem>
<UiItem icon="copy" name="Duplicate" href="#scene-menu" area="42.0,58.4,47.6,13.3">Adds a copy of the scene right after it.</UiItem>
<UiItem icon="trash" name="Delete" href="#scene-menu" area="42.0,73.5,47.6,13.3">Deletes the scene.</UiItem>
</UiList>

</ShotRow>

- A workspace opens on the scene you last viewed in it, or on its first scene.
- Switching scenes moves your view to the scene's [point of view](#point-of-view), and stops [following](/nanome_web/collaboration#following-from-the-web) anyone you were following.
- Creating, renaming, duplicating and deleting scenes, and setting a point of view, need Editor access.

### <AppIcon name="dots" /> Scene menu {#scene-menu}

Each scene's <AppIcon name="dots" /> menu has Rename, Duplicate and Delete.

- **Duplicate** places the copy right after the original, with its components, annotations, recording, molecule positions and point of view. The copy counts toward the 50-scene limit.
- **Delete** removes the scene. The last scene in a workspace can't be deleted.

### <AppIcon name="scan-eye" /> Point of view {#point-of-view}

<Btn icon="scan-eye">Set point of view</Btn> in the bottom bar saves your current view as the active scene's point of view. Switching to that scene, or opening the workspace on it, brings the view back there. Nanome Web always moves to the point of view when you switch scenes. In Nanome XR this can be turned off in the [scene settings](/nanome_v2/scenespanel#scene-settings).

### <AppIcon name="player-play" /> Playing scenes {#playing-scenes}

<Btn icon="player-play">Play scenes</Btn> plays the scenes in order, starting from the current one, and switches to the Default tool.

- A scene without a recording stays on screen for 5 seconds.
- A scene with a recording plays it: the presenter's voice and pointer movements, and any moving, turning or zooming of the scene they did while recording. The next scene starts when the recording ends.
- Playback pauses at the end of the last scene.

<Accordion title="Playback timing" teaser="Point of view first, then 5 seconds or the recording.">

Each scene starts by moving the view to its point of view and pausing 0.8 seconds for it to settle. A scene without a recording then holds for 5 seconds. A scene with a recording lasts as long as its recording. A recording that moved, turned or zoomed the scene starts from the view it recorded, in place of the point of view.

</Accordion>

### <AppIcon name="video" /> Recordings {#recordings}

A scene can hold a recorded presentation, made in Nanome XR with [Add Recording](/nanome_v2/scenespanel#recording-a-scene). The scene menu in Nanome Web has no recording options. A scene with a recording shows a red <AppIcon name="video" /> and the recording's length in the rail, and **Play scenes** plays it back.

## <AppIcon name="cube-3d-sphere" /> Workspace tabs {#workspace-tabs}

<UiList label="Workspace tabs">
<UiItem icon="cube-3d-sphere" name="Workspace tab">Each open workspace gets a tab under the top bar.</UiItem>
<UiItem icon="plus" name="New tab">Opens another workspace tab.</UiItem>
</UiList>
