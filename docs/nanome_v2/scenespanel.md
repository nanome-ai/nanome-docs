---
title: Scenes Panel
---

# Scenes Panel

The Scenes Panel sits in the left sidebar, beside the Main Panel. A scene is a saved view of the workspace: its components, annotations, molecule positions and point of view. A workspace can hold up to 50 scenes.

<ScreenMap src="nanome-v2/v2-7/desktop-layout.webp" alt="The left sidebar with the Scenes Panel controls" crop="0,9.6,15.6,60.7" label="Left sidebar">
<MapCard icon="layout-grid" title="Workspace header" href="#workspace-header" side="top" area="0.5,10.5,14.7,6.2">The workspace name, network health and access.</MapCard>
<MapCard icon="box" title="Scene controls" href="#controls" side="top" area="0.9,20.1,14.0,4.1">Create, step through and play scenes.</MapCard>
<MapCard icon="dots" title="Scene menu" href="#scene-menu" side="left" area="1.2,25.3,11.5,5.6">On a scene's row, shown on hover: rename, duplicate, copy a POV or add a recording.</MapCard>
<MapCard icon="video" title="Recording a scene" href="#recording-a-scene" side="right" area="1.2,25.3,11.5,5.6">A presenter's voice and pointer, played back in the scene. A scene with one shows a red camera and its length on its row.</MapCard>
<MapCard icon="users" title="Users" href="#users-section" side="bottom" area="0.9,55.5,14.0,8.3">Who's in the workspace, Share and Spotlight Me.</MapCard>
<MapCard icon="crown" title="Spotlight Mode" href="#spotlight-mode" side="bottom" area="0.9,59.7,14.0,4.1">Share your view, or follow someone else's.</MapCard>
</ScreenMap>

## <AppIcon name="layout-grid" /> Workspace header {#workspace-header}

The top of the sidebar shows the workspace name and two icons:

<UiList label="Workspace header">
<UiItem icon="alert-triangle" name="Network health">Appears when the connection degrades, showing High ping, Reconnecting or Connection lost.</UiItem>
<UiItem icon="lock" name="Access">Shows whether the workspace is private or shared, its project and its code.</UiItem>
</UiList>

## <AppIcon name="box" /> Controls {#controls}

<UiList label="Scene controls">
<UiItem icon="plus" name="Create scene">Adds a scene.</UiItem>
<UiItem icon="settings" name="Scene settings" href="#scene-settings">Recenter Self, Set scene POV, and Enable/disable scene POVs.</UiItem>
<UiItem icon="arrow-left" name="Previous scene">Steps back through the scenes.</UiItem>
<UiItem icon="arrow-right" name="Next scene">Steps forward through the scenes.</UiItem>
<UiItem icon="player-play" name="Play scenes">Plays the scenes, with their recordings.</UiItem>
<UiItem name="Drag handle (=)">Dragging it reorders the scenes.</UiItem>
</UiList>

### <AppIcon name="settings" /> Scene settings {#scene-settings}

<ShotRow src="nanome-v2/v2-7/scenes-settings.webp" alt="The scene settings menu">

<UiList label="Scene settings">
<UiItem icon="target" name="Recenter Self" area="28.0,26.3,64.2,5.3">Resets your position as the viewing origin.</UiItem>
<UiItem icon="scan-eye" name="Set scene POV" area="28.0,33.3,64.2,5.2">Saves your current perspective as the scene's point of view.</UiItem>
<UiItem icon="perspective" name="Enable/disable scene POVs" area="28.0,40.1,64.2,5.2">Sets whether switching scenes moves your view to each scene's point of view.</UiItem>
</UiList>

</ShotRow>

### <AppIcon name="dots" /> Scene menu {#scene-menu}

<ShotRow src="nanome-v2/v2-7/scenes-more-options.webp" alt="A scene's More options menu">

<UiList label="Scene More options">
<UiItem icon="pencil" name="Rename" area="14.3,28.5,60.8,5.2">Renames the scene.</UiItem>
<UiItem icon="copy" name="Duplicate" area="14.3,35.5,60.8,5.2">Copies the scene with its representations and settings.</UiItem>
<UiItem icon="trash" name="Delete" area="14.3,42.3,60.8,5.2">Deletes the scene, after a confirmation.</UiItem>
<UiItem icon="list-check" name="Copy Scene POV" area="14.3,49.2,60.8,5.2">Copies this scene's point of view to other scenes.</UiItem>
<UiItem icon="video" name="Add Recording" href="#recording-a-scene" area="14.3,56.0,60.8,5.2">Records a presentation in this scene.</UiItem>
<UiItem icon="trash" name="Delete recording" area="14.3,62.9,60.8,5.2">Deletes the scene's recording.</UiItem>
</UiList>

</ShotRow>

### Video: Working with Scenes

<YoutubeEmbed videoId="vngy1zlFvRA" title="Nanome v2.4 Quick Tips: Working with Scenes" />

## <AppIcon name="video" /> Recording a scene {#recording-a-scene}

Since release 2.6, a scene can hold a recorded presentation: the presenter's voice and pointer movements, played back in the scene.

<Steps>

1. In the scene's <AppIcon name="dots" /> menu, choose <Btn icon="video">Add Recording</Btn>. The recording options are **My Voice**, **My Cursors**, **Others' Voice** and **Others' Cursors**. Other people have to unmute themselves to be heard in the recording.
2. Start with <Btn icon="video">Begin</Btn>. While recording, a **Recording in progress** banner shows the time, a mute button and <Btn icon="player-stop">Stop recording</Btn>.
3. Stopping asks whether to <Btn icon="device-floppy">Save</Btn> or <Btn icon="trash">Discard</Btn> the recording.

</Steps>

Switching scenes stops the recording, after a confirmation. A scene with a recording shows <AppIcon name="video" /> and its length in the scene list.

**Play scenes** opens a playback bar: <Btn icon="arrow-left">Previous</Btn> <Btn icon="arrow-right">Next</Btn> <Btn icon="player-play">Play</Btn> <Btn icon="player-stop">Stop playback</Btn> <Btn icon="analyze-filled">Recenter</Btn>

<Callout type="note" title="A recording locks the workspace">

A workspace that holds a recording is locked against changes, with a banner that reads **This workspace is locked because it contains a recording**. **Modify anyway** unlocks it, with a warning that changes could break the recording.

</Callout>

## <AppIcon name="users" /> Users section {#users-section}

At the bottom of the sidebar, the **Users** section shows who's in the workspace. Each person has a personal color, shown on their name chip and their crown. Selecting a chip follows that person.

<UiList label="Users section">
<UiItem icon="share" name="Share" href="/nanome_v2/mainpanel#share">Opens the Share dialog.</UiItem>
<UiItem icon="crown" name="Spotlight Me" href="#spotlight-mode">Starts Spotlight Mode.</UiItem>
<UiItem icon="chevrons-right" name="Collapse sidebar">Collapses the sidebar.</UiItem>
</UiList>

### Multi-User Scene Indicators

<ShotRow src="nanome-v2/scenes-panel-multiuser-indicators.jpg" alt="Ana's and Ben's Scenes Panels, with colored dots on Scene 1 showing that both are viewing it">

With several people in a workspace, colored dots on each scene show who's viewing it, in each person's color.

</ShotRow>

## <AppIcon name="crown" /> Spotlight Mode {#spotlight-mode}

<ShotRow src="nanome-v2/scenes-panel-spotlight-mode.jpg" alt="Ben spotlighting with Ana following, as each of them sees it">

**Spotlight Me** makes your view the shared perspective for everyone who follows you.

<Tabs :labels="['Spotlighter', 'Follower']">
<Tab>

<UiList label="Spotlighter's view">
<UiItem icon="crown" name="Spotlighting 1/1" area="2.7,81.4,20.3,6.5">Shows that Spotlight Mode is on and how many people follow.</UiItem>
</UiList>

Followers are listed with an <AppIcon name="eye" /> eye icon beside their name.

</Tab>
<Tab>

<UiList label="Follower's view">
<UiItem icon="crown" name="Spotlighter's name" area="62.0,82.7,5.1,5.0">Shows who you're following.</UiItem>
<UiItem icon="analyze-filled" name="Reset orientation" area="73.2,82.4,3.0,5.5">Resets your orientation.</UiItem>
<UiItem name="Stop" area="76.2,82.4,5.0,5.5">Stops following.</UiItem>
</UiList>

</Tab>
</Tabs>

</ShotRow>

People in Nanome XR see a prompt for about 6 seconds, with **Not now** to decline, before they follow a new spotlight. Since release 2.7, Nanome Web viewers follow straight away. A **You are following** popup has **Stop Following**. After you stop, a **You stopped following** popup offers **Resume Following** for 3 seconds. Holding the grip also stops following.

<Accordion title="Changes in 2.7" teaser="Joining mid-spotlight, live edits and follow chains.">

- People who join or reconnect while a spotlight is on follow it automatically, and a presenter who briefly disconnects comes back as the same participant.
- Following shows the leader's current tool and mode, what they hover and select, and their edits as they make them. Ligand building, torsion changes and rotamers appear live, before they're saved.
- Following someone who's following another person leads to the person at the end of the chain.

</Accordion>
