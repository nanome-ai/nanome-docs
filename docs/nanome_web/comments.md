---
title: Comments
---

# Comments

Comments, added in release 2.7, are threaded discussions stored inside a workspace. A comment can belong to the whole workspace, to a scene, or to an annotation, and it can point at specific atoms. Everyone in the workspace sees new comments as they're posted, in Nanome Web and in Nanome XR.

<IconGrid label="Comments">
<IconCard icon="message" title="The Comments tab" href="#the-comments-tab">The filter and the comment box.</IconCard>
<IconCard icon="messages" title="Threads" href="#threads">Replies, mentions and reactions.</IconCard>
<IconCard icon="circle-dot" title="Anchoring to atoms" href="#anchoring-to-atoms">Comments that sit on atoms in the 3D view.</IconCard>
</IconGrid>

<DocVideo src="v2-7/comments.mp4" caption="Comments in Nanome Web, from the v2.7 release video. The Agent tag in the video is for illustration." />

## <AppIcon name="message" /> The Comments tab {#the-comments-tab}

The **Comments** tab in the workspace panel lists the workspace's comments, with the filter at the top and the comment box at the bottom.

<ShotRow src="nanome-web/comments-tab.webp" alt="The Comments tab" crop="0,20,100,80">

<UiList label="Comments tab">
<UiItem name="All" area="3.8,30.7,8.5,4.5">Shows all comments.</UiItem>
<UiItem name="Workspace" area="13.6,30.7,20.5,4.5">Shows only the comments on the workspace.</UiItem>
<UiItem name="Current Scene" area="35.6,30.7,25.0,4.5">Shows only the comments on the current scene.</UiItem>
<UiItem name="Comment on this workspace" href="#anchoring-to-atoms" area="2.7,89.3,84.9,8.7">The box at the bottom: posts a new comment. With atoms selected, it anchors the comment to them.</UiItem>
<UiItem icon="arrow-up" name="Send" area="87.9,90.5,8.0,6.3">Posts what's in the box.</UiItem>
</UiList>

A workspace with no comments shows **No comments yet**.

</ShotRow>

## What a comment can hold {#what-a-comment-can-hold}

<UiList label="A comment">
<UiItem name="Author and time">The author's avatar and name, and how long ago the comment was posted, such as `18m` or `now`.</UiItem>
<UiItem icon="box" name="Scene chip">On a comment tied to a scene: the scene's number and name, such as `6: 1KV2comments`.</UiItem>
<UiItem icon="circle-dot" name="Atom chip" href="#anchoring-to-atoms">A link to specific atoms, such as `1KV2 A|B96'391 C4, C5`. Hovering it highlights those atoms in the viewer, and clicking it zooms to them.</UiItem>
<UiItem name="@mentions">A comment can mention a colleague by name. The mention is highlighted in the text.</UiItem>
<UiItem icon="mood-plus" name="Reactions" href="#reactions">Emoji reactions under the comment, with a count beside each emoji.</UiItem>
<UiItem icon="message" name="Replies" href="#threads">A count under the comment shows how many replies its thread has.</UiItem>
</UiList>

## <AppIcon name="messages" /> Threads {#threads}

Each comment starts a thread. Clicking a comment's reply count opens it: the first comment sits at the top, the replies follow under it in the order they were posted, and the box at the bottom posts a new reply.

Replies belong to their thread, so they don't show scene or atom chips of their own. They take mentions and reactions like any other comment.

### <AppIcon name="mood-plus" /> Reactions {#reactions}

Hovering a comment shows a row of buttons at its top right, starting with thumbs up, thumbs down and an emoji picker. Reactions show under the comment as an emoji with a count, followed by a button for adding another.

A reaction is a toggle: picking an emoji you've already added to a comment removes your reaction.

## <AppIcon name="circle-dot" /> Anchoring to atoms {#anchoring-to-atoms}

When atoms are selected in the viewer, the comment box shows an **Anchor to** chip that names them, and its placeholder changes to **Annotate the selection**. The new comment is attached to those atoms. The **×** on the chip removes it.

<Steps>

1. Select atoms: click them with the [Default](/nanome_web/workspace#default) tool or the [Selection tool](/nanome_web/workspace#selection-tool), or pick residues in the [sequence viewer](/nanome_web/workspace#sequence-viewer).
2. Type the comment. The **Anchor to** chip shows which atoms it will point at.
3. Post it with the send button.

</Steps>

The comment becomes a text note in the current scene, attached to those atoms. Its text appears in the 3D view at the atoms, and everyone in the workspace sees it, in Nanome Web and in Nanome XR. In the list, the comment shows the scene chip and an atom chip.

- The note belongs to the scene that was current when it was posted, so the viewer shows it only in that scene.
- Hovering the atom chip highlights the atoms while that scene is the current one. Clicking the chip zooms the view to them.
- In Nanome Web, a note made this way is always white and at the default size. Text notes with other sizes and colors, and sound notes, are made with the Comments tool in Nanome XR. They're covered on [Text and sound notes](/nanome_v2/toolspanel#text-and-sound-notes).

<Accordion title="Reading an atom chip" teaser="How a chip names entries, chains, residues and atoms.">

The **Anchor to** chip and the atom chips on comments use the same labels. A label gives the entry and chain, then the residues and atoms: `1KV2 A|B96'391 C4, C5` is atoms C4 and C5 of residue B96 number 391, in chain A of the entry 1KV2.

- A residue is written as its name, an apostrophe and its number, such as `PHE'169`. An insertion code follows the number.
- A residue with all its atoms picked has no atom names after it. Up to 3 picked atoms are named, and more show as a count, such as `B96'391 (12 atoms)`.
- Up to 3 residues of a chain are listed, such as `1KV2 A|MET'109 N, B96'391 O47`. More whole residues with consecutive numbers show as a range, such as `1KV2 A|104–110`, and other larger sets as a count, such as `1KV2 A: 12 residues`. When more than 100 residues are picked, not counting whole chains, a chain shows only its residue count.
- A whole chain shows as the entry and chain, such as `1KV2 A`. 2 or 3 whole chains of one entry show as `1KV2 A, B`.
- When every picked entry is whole, up to 3 of them show by name, such as `1KV2, 4CEO`.
- Any other set that spans more than one chain shows as an atom count, such as `57 atoms`.

</Accordion>

<Accordion title="How an anchor is kept" teaser="What the note stores, and how far a chip click zooms.">

- The anchor stores the selection in groups: a whole entry as the entry, a whole chain as the chain, whole residues as residues, and any other atoms one by one.
- For an entry with more than one model, the anchor follows the model the scene shows instead of the one the atoms were picked in.
- If the anchored atoms are no longer in the workspace, the comment shows no atom chip.
- Clicking an atom chip fits those atoms in the view, framing at least 5 Å on each side of their center, so a single atom keeps its neighbors in view.

</Accordion>

## <AppIcon name="message" /> Adding a comment from the viewer {#adding-a-comment-from-the-viewer}

The <Btn icon="message">Add a comment</Btn> button on the viewer's [tool rail](/nanome_web/workspace#tool-rail) starts a comment from the 3D view.

## Unread comments {#unread-comments}

Nanome tracks which threads have changed since you last looked, and marks the unread ones. In Nanome XR, a dot on the Comments tool shows that there are unread comments.

Unread state is kept for each signed-in account. Anonymous viewers of a [public workspace](/nanome_web/collaboration#link-access) have none.

## AI assistants {#ai-assistants}

AI assistants connected through the Nanome MCP server can read a summary of a workspace and add text, distance, angle and dihedral annotations to it. Setup is on [Account & Settings](/nanome_web/account#mcp-setup).
