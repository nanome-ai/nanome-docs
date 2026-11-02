---
title: Scenes Panel
---

# Scenes Panel

The Scenes Panel sits in the left sidebar, beside the Main Panel. A scene is a saved view of the workspace: its components, annotations, molecule positions and point of view. A workspace can hold up to 50 scenes.

<ScreenMap src="nanome-v2/v2-7/desktop-layout.webp" alt="The left sidebar with the Scenes Panel controls" crop="0,9.6,15.6,60.7" label="Left sidebar">
<MapCard icon="layout-grid" title="Workspace header" href="#workspace-header" side="top" area="0.5,10.5,14.7,6.2">The workspace name, network health and access.</MapCard>
<MapCard icon="box" title="Scene controls" href="#controls" side="top" area="0.9,20.1,14.0,4.1">Create, step through and play scenes.</MapCard>
<MapCard icon="dots" title="Scene menu" href="#scene-menu" side="top" area="1.2,25.3,11.5,5.6">On a scene's row, shown on hover: rename, duplicate, copy a POV, or record a presentation in the scene.</MapCard>
<MapCard icon="users" title="Users" href="#users-section" side="bottom" area="0.9,55.5,14.0,4.0">Who's in the workspace, Share and Spotlight Me.</MapCard>
<MapCard icon="crown" title="Spotlight Mode" href="#spotlight-mode" side="bottom" area="0.9,59.7,14.0,4.1">Share your view, or follow someone else's.</MapCard>
</ScreenMap>

## <AppIcon name="layout-grid" /> Workspace header {#workspace-header}

The top of the sidebar shows the workspace name and 2 icons:

<UiList label="Workspace header">
<UiItem icon="alert-triangle" name="Network health">Appears when the connection degrades. Its tooltip shows the ping, or that the connection was lost.</UiItem>
<UiItem icon="user" name="Access">A lock when the workspace is private, 1 person or 2 people when it's shared. Hovering the workspace name shows its project, and its code when it has one.</UiItem>
</UiList>

## <AppIcon name="box" /> Controls {#controls}

<UiList label="Scene controls">
<UiItem icon="plus" name="Create scene">Adds a scene.</UiItem>
<UiItem icon="settings" name="Scene settings" href="#scene-settings">Recenter Self, Set scene POV, and Disable Scene POVs.</UiItem>
<UiItem icon="arrow-left" name="Previous scene">Steps back through the scenes.</UiItem>
<UiItem icon="arrow-right" name="Next scene">Steps forward through the scenes.</UiItem>
<UiItem icon="player-play" name="Play scenes">Plays the scenes, with their recordings.</UiItem>
<UiItem name="Drag handle (=)">Dragging it reorders the scenes.</UiItem>
</UiList>

Create scene, Scene settings, the drag handle and each scene's <AppIcon name="dots" /> menu need Editor access.

### <AppIcon name="settings" /> Scene settings {#scene-settings}

<ShotRow src="nanome-v2/v2-7/scenes-settings.webp" alt="The scene settings menu">

<UiList label="Scene settings">
<UiItem icon="target" name="Recenter Self" area="28.0,26.3,64.2,5.3">Resets your position as the viewing origin.</UiItem>
<UiItem icon="scan-eye" name="Set scene POV" area="28.0,33.3,64.2,5.2">Saves your current perspective as the scene's point of view.</UiItem>
<UiItem icon="perspective" name="Disable Scene POVs" area="28.0,40.1,64.2,5.2">Sets whether switching scenes moves your view to each scene's point of view. It reads Enable Scene POVs while they're off.</UiItem>
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

**Play scenes** opens a playback bar: <Btn icon="arrow-left">Previous scene</Btn> <Btn icon="arrow-right">Next scene</Btn> <Btn icon="player-play">Play</Btn> <Btn icon="player-stop">Stop playback</Btn> <Btn icon="analyze-filled">Recenter</Btn>

<Callout type="note" title="A recording locks the workspace">

A workspace that holds a recording is locked against changes, with a banner that reads **This workspace is locked because it contains a recording**. **Modify anyway** unlocks it, with a warning that changes could break the recording.

</Callout>

## <AppIcon name="users" /> Users section {#users-section}

At the bottom of the sidebar, the **Users** section shows who's in the workspace. Each person has a personal color, shown on their name chip, their scene dot and their crown. Selecting a chip follows that person.

### Multi-user scene indicators

With several people in a workspace, colored dots on each scene show who's in it, in each person's color.

<ShotRow src="nanome-v2/v2-7/scenes-multiuser.webp" alt="The left sidebar with Ana and Ben in the workspace: Ben's dot on Overview, yours and Ana's on Binding site, and their name chips above Spotlight Me">

<UiList label="Users section">
<UiItem name="Scene dots" area="8.7,40.5,11.8,4.1">One dot per person in that scene, in their color, you included. Pointing at the dots lists the names. No dots show while you're alone in the workspace.</UiItem>
<UiItem name="Name chips" area="5.4,76.6,88.9,5.7">Each person's name, in their color. Selecting a chip follows them. Up to 4 chips fit, and with more people, 3 chips show beside a button with the number of others.</UiItem>
<UiItem icon="share" name="Share" href="/nanome_v2/mainpanel#share" area="63.7,70.1,30.9,5.7">Opens the Share dialog. Editors and the Owner have it.</UiItem>
<UiItem icon="crown" name="Spotlight Me" href="#spotlight-mode" area="5.4,82.9,89.3,6.7">Starts Spotlight Mode. Everyone has it, Viewers included. The crown is in your color.</UiItem>
<UiItem icon="chevrons-right" name="Collapse sidebar" area="2.5,90.9,94.9,7.9">Collapses the sidebar.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="crown" /> Spotlight Mode {#spotlight-mode}

**Spotlight Me** makes your view the shared perspective for everyone who follows you. The bar under the name chips shows your part in it.

<Tabs :labels="['Spotlighter', 'Prompt', 'Follower']">
<Tab>

<ShotRow src="nanome-v2/v2-7/spotlight-spotlighting.webp" alt="The Users section while you spotlight: Spotlighting 2/2, with Ana and Ben following">

<UiList label="Spotlighter's view">
<UiItem icon="crown" name="Spotlighting 2/2" area="2.0,62.7,96.0,30.8">In your color: how many people follow you, out of everyone else here. Selecting it stops spotlighting. The sidebar's border takes your color too.</UiItem>
<UiItem icon="eye" name="Followers" area="2.0,33.9,95.7,26.3">An eye on the chip of each person following you. Their chips can't be selected while they follow.</UiItem>
</UiList>

</ShotRow>

</Tab>
<Tab>

<ShotRow src="nanome-v2/v2-7/spotlight-pending.webp" alt="The Users section after Ana starts a spotlight: Spotlighting Ana..., a progress bar and Not now">

<UiList label="Spotlight prompt">
<UiItem name="Spotlighting Ana..." area="2.0,63.8,62.6,28.5">Someone started a spotlight. The bar fills over 5 seconds, and a headset follows them after 6 seconds.</UiItem>
<UiItem name="Not now" area="66.6,65.0,31.4,26.3">Declines the spotlight, so you stay in your own view.</UiItem>
</UiList>

</ShotRow>

</Tab>
<Tab>

<ShotRow src="nanome-v2/v2-7/spotlight-following.webp" alt="The Users section while you follow Ana: her chip with a user icon, and her name, Reset orientation and Stop">

<UiList label="Follower's view">
<UiItem icon="user" name="Leader's chip" area="2.0,33.9,47.8,26.3">A user icon on the chip of the person you follow. Their chip moves to the front.</UiItem>
<UiItem icon="crown" name="Leader's name" area="6.6,65.0,21.9,26.3">Who you're following, with the crown in their color. The sidebar's border takes their color too. When you follow someone who's following another person, it names the person at the end, for example Ana (via Ben).</UiItem>
<UiItem icon="analyze-filled" name="Reset orientation" area="60.6,65.0,13.4,26.3">Resets your orientation, so the leader's view lines up again with the way you face.</UiItem>
<UiItem name="Stop" area="74.2,65.0,22.6,26.3">Stops following.</UiItem>
</UiList>

</ShotRow>

</Tab>
</Tabs>

Since release 2.7, people in Nanome Web follow a new spotlight straight away, with no prompt. While they follow, a **Following** bar with the leader's name has <AppIcon name="analyze-filled" /> **Reset orientation** and **Stop**. In a headset, a **You are following** popup with **Stop Following** shows for 3 seconds when following starts. After you stop, **You stopped following** offers **Resume Following** for 3 seconds. Holding the grip for 2 seconds also stops following, with a **Continue gripping to stop following** prompt while you hold.

<Accordion title="Changes in 2.7" teaser="Joining mid-spotlight, live edits and follow chains.">

- People who join or reconnect while a spotlight is on follow it automatically, and a presenter who briefly disconnects comes back as the same participant.
- Following shows the leader's current tool and mode, what they hover and select, and their edits as they make them. Ligand building, torsion changes and rotamers appear live, before they're saved.
- Following someone who's following another person leads to the person at the end of the chain.

</Accordion>
