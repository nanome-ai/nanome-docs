---
title: Comments
---

# Comments

Comments, added in release 2.7, are threaded discussions stored inside a workspace. A comment can belong to the whole workspace, to a scene, or to an annotation, and it can point at specific atoms. Everyone in the workspace sees new comments as they're posted, in Nanome Web and in Nanome XR.

<DocVideo src="v2-7/comments.mp4" caption="Comments in Nanome Web, from the v2.7 release video. The Agent tag in the video is for illustration." />

## The Comments tab

The **Comments** tab in the workspace panel lists the workspace's comments. The filters at the top show **All** comments, only those on the **Workspace**, or only those on the **Current Scene**.

The box at the bottom, **Comment on this workspace**, posts a new comment.

<vimg src="nanome-web/comments-tab.webp" alt="The Comments tab" />

## What a comment can hold

- **Replies**: each comment starts a thread, and a count under the comment shows how many replies it has.
- **@mentions**: a comment can mention a colleague by name.
- **Reactions**: emoji reactions under each comment.
- **Atom chips**: a link to specific atoms, such as `1KV2 A|B96'391 C4, C5`. Clicking a chip highlights those atoms and zooms to them.

When atoms are selected in the viewer, the comment box shows an **Anchor to** chip for them, and the new comment is attached to those atoms.

## Adding a comment from the viewer

The **Add a comment** button on the viewer's tool rail starts a comment from the 3D view. See [Workspace View](/nanome_web/workspace#tool-rail).

## Unread comments

Nanome tracks which threads have changed since you last looked, and marks the unread ones. In Nanome XR, a dot on the Comments tool shows that there are unread comments.

## AI assistants

AI assistants connected through the Nanome MCP server can read a summary of a workspace and add text, distance, angle and dihedral annotations to it. Setup is on [Account & Settings](/nanome_web/account#mcp-setup).
