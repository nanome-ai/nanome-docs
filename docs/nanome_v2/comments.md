---
title: Comments & Annotations
---

# Comments & Annotations

Since release 2.7, comments and annotations share one panel: the <AppIcon name="message" /> **Comments** tool in the Tools Panel. A comment can belong to the whole workspace, to a scene or to an annotation, and it can point at specific atoms. Comments appear for everyone in the workspace as they're posted, in Nanome XR and in Nanome Web.

<IconGrid label="Comments">
<IconCard icon="message" title="The panel" href="#the-panel">Modes, the filter and the comment box.</IconCard>
<IconCard icon="messages" title="Threads" href="#threads">Replies, mentions, reactions and atom chips.</IconCard>
<IconCard icon="text-size" title="Text and sound notes" href="#text-and-sound-notes">Notes placed in 3D, with text or a recording.</IconCard>
<IconCard icon="eye" title="Hiding annotations" href="#hiding-annotations">Hide one annotation, or all of them.</IconCard>
</IconGrid>

<DocVideo src="v2-7/comments.mp4" caption="Comments, from the v2.7 release video. The Agent tag in the video is for illustration." />

## <AppIcon name="message" /> The panel {#the-panel}

<ShotRow src="nanome-v2/v2-7/tool-comments.webp" alt="The Comments tool panel">

<UiList label="Comments panel">
<UiItem icon="text-size" name="Text" area="15.4,9.8,24.4,5.6">Editors only: places a text note in 3D.</UiItem>
<UiItem icon="volume" name="Sound" area="40.4,9.8,27.2,5.6">Editors only: records a sound note.</UiItem>
<UiItem icon="trash" name="Delete" area="68.6,9.8,27.4,5.6">Editors only: removes notes.</UiItem>
<UiItem icon="list" name="All" area="80.4,16.0,16.3,5.8">The filter: All, Workspace (comments on the workspace itself) or Scene (comments on the current scene).</UiItem>
<UiItem name="Comment on this workspace" area="14.6,87.2,82.1,10.1">The box at the bottom: posts a new comment.</UiItem>
</UiList>

A count shows how many comments match the filter. A dot on the Comments tool's button shows that there are unread comments.

</ShotRow>

## <AppIcon name="messages" /> Threads {#threads}

Each comment starts a thread.

<UiList label="Thread">
<UiItem icon="message" name="Reply in thread">Replies to the comment.</UiItem>
<UiItem name="@mentions">Mentions colleagues by name.</UiItem>
<UiItem icon="mood-plus" name="Reactions">Thumbs up, thumbs down and an emoji picker.</UiItem>
<UiItem name="Edit / Delete">For the comment's author only. An edited comment is marked (edited).</UiItem>
<UiItem name="Watch thread / Unwatch thread">Follows a thread's changes, or stops following them.</UiItem>
<UiItem icon="circle-dot" name="Atom chip">A link to specific atoms. Selecting it highlights those atoms and zooms to them.</UiItem>
</UiList>

Each person can post up to 20 comments a minute.

## <AppIcon name="text-size" /> Text and sound notes {#text-and-sound-notes}

- A text note has **Text**, **Size** and **Color**. Pointing at a text note in 3D shows a tooltip with its text.
- A sound note has a **Title**, a <Btn icon="microphone">Record</Btn> button and a playback speed. Recordings can be up to 5 minutes long, and the recorder shows the elapsed and maximum time.

## <AppIcon name="eye" /> Hiding annotations {#hiding-annotations}

<UiList label="Hiding annotations">
<UiItem icon="eye" name="Visibility">On each annotation row: hides or shows it.</UiItem>
<UiItem icon="eye" name="Hide all annotations">In the panel header. Show all annotations brings them back.</UiItem>
</UiList>

Hidden annotations stay in the workspace and can be shown again.
