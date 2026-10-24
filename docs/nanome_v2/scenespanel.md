---
title: Scenes Panel
---

# Scenes Panel

### Video: Working with Scenes

<YoutubeEmbed videoId="vngy1zlFvRA" title="Nanome v2.4 Quick Tips: Working with Scenes" />

The Scenes Panel sits in the left sidebar, beside the [Main Panel](/nanome_v2/mainpanel). A scene is a saved view of the workspace: its components, annotations, molecule positions and point of view. A workspace can hold up to 50 scenes.

<vimg src="nanome-v2/v2-7/left-sidebar.jpg" />

## Workspace header

The top of the sidebar shows the workspace name and two icons:

- **Network health**: appears when the connection degrades, showing **High ping**, **Reconnecting** or **Connection lost**.
- **Access**: shows whether the workspace is private or shared, its project and its code.

## Controls

- **Create scene (+)**: adds a scene.
- **Scene settings (⚙)**: **Recenter Self** resets your position as the viewing origin, **Set scene POV** saves your current perspective as the scene's point of view, and **Enable/disable scene POVs** sets whether switching scenes moves your view to each scene's point of view.
- **Previous scene** and **Next scene**: step through the scenes.
- **Play scenes**: plays the scenes, with their recordings.
- **(=)**: drag to reorder scenes.

<vimg src="nanome-v2/v2-7/scenes-settings.jpg" />

Each scene's **(...)** menu has:

- **Rename**
- **Duplicate**: copies the scene with its representations and settings.
- **Delete**, after a confirmation.
- **Copy Scene POV**: copies this scene's point of view to other scenes.
- **Add Recording**: records a presentation in this scene. See [Recording a scene](#recording-a-scene).
- **Delete recording**

<vimg src="nanome-v2/v2-7/scenes-more-options.jpg" />

## Recording a scene

Since release 2.6, a scene can hold a recorded presentation: the presenter's voice and pointer movements, played back in the scene.

**Add Recording** opens the recording options: **My Voice**, **My Cursors**, **Others' Voice** and **Others' Cursors**. Other people have to unmute themselves to be heard in the recording.

While recording, a **Recording in progress** banner shows the time, a mute button and **Stop recording**. Stopping asks whether to **Save** or **Discard** the recording. Switching scenes stops the recording, after a confirmation.

A scene with a recording shows its length in the scene list. **Play scenes** opens a playback bar with **Previous**, **Next**, **Play**, **Stop playback** and **Recenter**.

A workspace that holds a recording is locked against changes, with a banner that reads **This workspace is locked because it contains a recording**. **Modify anyway** unlocks it, with a warning that changes could break the recording.

## Users section

At the bottom of the sidebar, the **Users** section shows who's in the workspace. Each person has a personal color, shown on their name chip and their crown. Selecting a chip follows that person. **Share** opens the [Share dialog](/nanome_v2/mainpanel#share), and **Spotlight Me** starts Spotlight Mode. The **»** at the bottom collapses the sidebar.

## Multi-User Scene Indicators

<vimg src="nanome-v2/scenes-panel-multiuser-indicators.jpg" />

With several people in a workspace, colored dots on each scene show who's viewing it. Each person's color matches their name chip and their crown.

## Spotlight Mode

<vimg src="nanome-v2/scenes-panel-spotlight-mode.jpg" />

**Spotlight Me** makes your view the shared perspective for everyone who follows you.

- **Spotlighter's view**: **Spotlighting 1/1** shows that Spotlight Mode is on and how many people follow. Followers are listed with an eye icon beside their name.
- **Follower's view**: the spotlighter's name with a crown, a **Reset orientation** button, and **Stop** to stop following.

People in Nanome XR see a prompt for about 6 seconds, with **Not now** to decline, before they follow a new spotlight. Since release 2.7, Nanome Web viewers follow straight away. A **You are following** popup has **Stop Following** and **Resume Following**, and holding the grip also stops following.

Since release 2.7:

- People who join or reconnect while a spotlight is on follow it automatically, and a presenter who briefly disconnects comes back as the same participant.
- Following shows the leader's current tool and mode, what they hover and select, and their edits as they make them. Ligand building, torsion changes and rotamers appear live, before they're saved.
- Following someone who's following another person leads to the person at the end of the chain.
