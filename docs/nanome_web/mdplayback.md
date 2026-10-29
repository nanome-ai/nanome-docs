---
title: MD Trajectory Playback
---

# MD Trajectory Playback

Nanome plays molecular dynamics trajectories in Nanome Web and streams them to Nanome XR. The trajectory stays on Nanome's servers, so a standalone headset needs no local files and no high-end GPU.

<DocVideo src="v2-7/web-md-playback.mp4" caption="Trajectory playback in Nanome Web: an IRMOF-16 metal-organic framework supercell with a guest polymer." />

## <AppIcon name="paperclip" /> Loading a trajectory {#loading-a-trajectory}

A frame trajectory attaches to a structure that's already loaded. In the **Entries** tab, the entry's <Btn icon="dots">(...)</Btn> menu has **Load trajectory**.

- Every frame's atom count has to match the entry's.
- An attached trajectory file can be up to 200 MB.
- A `.gro` file can also be loaded on its own as a new entry.
- Multi-model files, such as a multi-MODEL PDB or a multi-record SDF, play back the same way, stepping through each model in turn.

Supported formats and limits are on [Supported File Formats](/nanome_web/fileformats#trajectory-molecular-dynamics).

## <AppIcon name="player-play" /> Playing it back {#playing-it-back}

While a trajectory is open, its entry row shows the current frame out of the total, with buttons to step and play. **Exit playback** at the top of the Entries tab leaves playback.

Several people on different devices, such as Quest 3, Vision Pro, phones and desktops, can watch the same trajectory together.

<Callout type="note" title="In practice: Resonac">

Resonac's computational and experimental chemists reviewed their GROMACS trajectories together in Nanome, and one experimental cycle went from about 6 months to 2 to 3 days. [Read the case study](https://nanome.ai/blog/how-resonac-turned-two-years-of-misaligned-randd-into-a-single-afternoon-breakthrough).

</Callout>

<Accordion title="Playback since release 2.7" teaser="Frame computing, what stays visible, and load speed.">

- In Nanome XR, upcoming frames are computed in the background, so playback is smoother. Nanome Web computes each frame as it plays.
- Interactions, annotations and residue labels stay visible and update as the frames advance. Surface changes are held during playback and apply when it stops.
- Trajectories load faster and use less storage and server memory.

</Accordion>

### Video: MD Trajectory Playback

<YoutubeEmbed videoId="cNW8DnFap6A" title="Nanome v2.5 Quick Tips: MD Trajectory Playback" />

The v2.5 tutorial shows a live trajectory streamed from Nanome Web to a Quest 3.
