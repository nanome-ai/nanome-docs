---
title: Comments
---

# Comments

Comments, added in release 2.7, are threaded discussions stored inside a workspace. A comment can belong to the whole workspace, to a scene, or to an annotation, and it can point at specific atoms. Everyone in the workspace sees new comments as they're posted, in Nanome Web and in Nanome XR.

<DocVideo src="v2-7/comments.mp4" caption="Comments in Nanome Web, from the v2.7 release video. The Agent tag in the video is for illustration." />

## <AppIcon name="message" /> The Comments tab {#the-comments-tab}

The **Comments** tab in the workspace panel lists the workspace's comments.

<ShotRow src="nanome-web/comments-tab.webp" alt="The Comments tab" crop="0,20,100,80">

<UiList label="Comments tab">
<UiItem name="All" area="3.8,30.7,8.5,4.5">Shows all comments.</UiItem>
<UiItem name="Workspace" area="13.6,30.7,20.5,4.5">Shows only the comments on the workspace.</UiItem>
<UiItem name="Current Scene" area="35.6,30.7,25.0,4.5">Shows only the comments on the current scene.</UiItem>
<UiItem name="Comment on this workspace" area="2.7,89.3,94.7,8.7">The box at the bottom: posts a new comment.</UiItem>
</UiList>

</ShotRow>

## What a comment can hold

- **Replies**: each comment starts a thread, and a count under the comment shows how many replies it has.
- **@mentions**: a comment can mention a colleague by name.
- **Reactions**: emoji reactions under each comment.
- **Atom chips**: a link to specific atoms, such as `1KV2 A|B96'391 C4, C5`. Clicking a chip highlights those atoms and zooms to them.

When atoms are selected in the viewer, the comment box shows an **Anchor to** chip for them, and the new comment is attached to those atoms.

## <AppIcon name="message" /> Adding a comment from the viewer {#adding-a-comment-from-the-viewer}

The <Btn icon="message">Add a comment</Btn> button on the viewer's tool rail starts a comment from the 3D view.

## Unread comments

Nanome tracks which threads have changed since you last looked, and marks the unread ones. In Nanome XR, a dot on the Comments tool shows that there are unread comments.

## AI assistants

AI assistants connected through the Nanome MCP server can read a summary of a workspace and add text, distance, angle and dihedral annotations to it. Setup is on [Account & Settings](/nanome_web/account#mcp-setup).
