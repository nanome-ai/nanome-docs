---
outline: [2, 3]
title: MD Trajectory Playback
---

# MD Trajectory Playback

Nanome plays molecular dynamics trajectories in Nanome Web and streams them to Nanome XR. The trajectory stays on Nanome's servers, so a standalone headset needs no local files and no high-end GPU.

<DocVideo src="v2-7/web-md-playback.mp4" caption="Trajectory playback in Nanome Web: an IRMOF-16 metal-organic framework supercell with a guest polymer." />

## <AppIcon name="paperclip" /> Loading a trajectory {#loading-a-trajectory}

A frame trajectory attaches to a structure that's already loaded. In the **Entries** tab, the entry's <AppIcon name="dots" /> **(...)** menu has **Load trajectory**.

<ShotRow src="nanome-web/entry-more-options.webp" alt="An entry's More options menu, with Load trajectory" crop="54.6,3.9,42.3,86.6">

<UiList label="Attaching a trajectory">
<UiItem icon="dots" name="More options" href="/nanome_web/entries#more-options" area="89.0,8.2,3.5,6.6">On the entry's row. Opens the entry's menu.</UiItem>
<UiItem icon="upload" name="Load trajectory" area="57.5,61.9,33.7,10.9">Attaches a trajectory file to this entry.</UiItem>
</UiList>

</ShotRow>

- Every frame's atom count has to match the entry's.
- An attached trajectory file can be up to 200 MB.
- A `.gro` file can also be loaded on its own as a new entry.
- Multi-model files, such as a multi-MODEL PDB or a multi-record SDF, play back the same way, stepping through each model in turn.

Supported formats and limits are on [Supported File Formats](/nanome_web/fileformats#trajectory-molecular-dynamics).

## <AppIcon name="player-play" /> Playing it back {#playing-it-back}

While a trajectory is open, its entry row shows the current frame out of the total, with buttons to step and play. The play button opens the playback controls: Play backwards, play and pause, Play forwards, and speeds from ×1 to ×20. For a multi-model file, the row counts models instead. **Exit playback** at the top of the Entries tab leaves playback.

Stepping and playback wrap around. After the last frame comes the first, and stepping back from the first frame goes to the last, so playback keeps looping until it's stopped.

- One entry plays at a time.
- Switching to another scene ends playback.
- Removing the entry that's playing ends playback.

In Nanome XR, the same controls are on the entry's row in the Components tab. They're described under [Model and trajectory playback](/nanome_v2/mainpanel#model-and-trajectory-playback).

<Accordion title="Playback since release 2.7" teaser="Frame computing, what stays visible, and load speed.">

- In Nanome XR, upcoming frames are computed in the background, so playback is smoother. Nanome Web computes each frame as it plays.
- Interactions, annotations and residue labels stay visible and update as the frames advance. Surface changes are held during playback and apply about 2 seconds after the frames stop changing.
- Trajectories load faster and use less storage and server memory.

</Accordion>

<Accordion title="How frames reach your browser" teaser="Fetched ahead of the frame on screen.">

Nanome Web keeps a run of frames in memory and fetches more from Nanome's server ahead of the frame on screen, so a long trajectory doesn't have to download in full before it plays. If the next frame hasn't arrived yet, playback waits for it and then carries on. Jumping far ahead, for example when you start following someone at another point in the trajectory, loads frames around the new point.

</Accordion>

### Who sees playback {#who-sees-playback}

Playback doesn't change the scene. The frames play on your screen and for the people following you, and everyone else keeps seeing the frame saved in the scene. **Exit playback** puts your view, and your followers' views, back on that saved frame.

If you follow someone in Nanome XR while they play a trajectory, it plays in your browser too. Your view goes back to the scene's frame when they stop playback. Following is covered under [Following from the web](/nanome_web/collaboration#following-from-the-web).

Several people on different devices, such as Quest 3, Vision Pro, phones and desktops, can watch the same trajectory together.

<Callout type="note" title="In practice: Resonac">

Resonac's computational and experimental chemists reviewed their GROMACS trajectories together in Nanome, and one experimental cycle went from about 6 months to 2 to 3 days. [Read the case study](https://nanome.ai/blog/how-resonac-turned-two-years-of-misaligned-randd-into-a-single-afternoon-breakthrough).

</Callout>

### Video: MD Trajectory Playback

<YoutubeEmbed videoId="cNW8DnFap6A" title="Nanome v2.5 Quick Tips: MD Trajectory Playback" />

The v2.5 tutorial shows a live trajectory streamed from Nanome Web to a Quest 3.
