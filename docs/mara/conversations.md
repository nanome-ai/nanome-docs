---
title: Conversations
---

# Conversations

**Conversations** in Nanome Web's top bar is where you chat with MARA. Its other two tabs collect the comment threads and mentions from your workspaces.

<IconGrid label="Conversations tabs" :cols="3">
<IconCard icon="messages" title="Chat" href="#chat">Your MARA chats, and new ones.</IconCard>
<IconCard icon="message" title="Threads" href="#threads">Comment threads from your workspaces.</IconCard>
<IconCard icon="at" title="Mentions" href="#mentions">Comments that mention you.</IconCard>
</IconGrid>

<vimg src="mara/conversations.webp" alt="The Conversations page with the Chat tab open and no chat selected" />

## <AppIcon name="messages" /> Chat {#chat}

The Chat tab lists your chats on the left, grouped by month with the newest first. With no chat open, the page shows three starting points, a few prompts to try, and the message box.

<UiList label="Chat list">
<UiItem icon="plus" name="New Chat">Starts a new chat.</UiItem>
<UiItem icon="search" name="Search (⌘F)">Searches your chats.</UiItem>
<UiItem icon="pin" name="Pin">Shows when you hover a chat. Pins the chat in the list.</UiItem>
<UiItem icon="trash" name="Delete">Shows when you hover a chat. Deletes it.</UiItem>
</UiList>

<UiList label="Starting points">
<UiItem icon="play" name="Learn the Basics">Plays a walkthrough video of Nanome and MARA.</UiItem>
<UiItem icon="message-2-share" name="Open Examples" href="#examples">Four example chats, one for each field.</UiItem>
<UiItem icon="upload" name="Click to upload files">Opens a file picker. Files dropped anywhere on the page upload too.</UiItem>
</UiList>

### Message box {#message-box}

<UiList label="Message box">
<UiItem icon="paperclip" name="Attach file">Adds a file to your message.</UiItem>
<UiItem icon="hexagon" name="Draw SMILES">Opens Sketch Molecule, to draw a structure.</UiItem>
<UiItem icon="tool" name="Run tool">Opens Select tool, to pick a MARA tool to run.</UiItem>
<UiItem icon="route" name="Run workflow">Opens Select workflow, to pick a workflow to run.</UiItem>
<UiItem icon="arrow-up" name="Send">Sends your message.</UiItem>
</UiList>

The same message box sits in each workspace's [MARA tab](/nanome_web/workspace#mara-tab).

## <AppIcon name="message-2-share" /> Example chats {#examples}

**Open Examples** shows one card for each field, with the tasks its example covers. **Open** on a card opens that example chat.

<UiList label="Example chats">
<UiItem icon="hexagons" name="Cheminformatics">Calculate molecular properties, analyze SAR data, visualize data.</UiItem>
<UiItem icon="dna2" name="Bioinformatics">Design protein sequences, align sequences, fold a sequence with ESMFold.</UiItem>
<UiItem icon="microscope" name="Drug Discovery">Find related structures, find binding pockets, run docking.</UiItem>
<UiItem icon="atom" name="Comp Chemistry">Process molecular dynamics trajectories, calculate distances, prepare structures.</UiItem>
</UiList>

<vimg src="mara/open-examples.webp" alt="The four example chat cards" />

An example chat is marked **Example** and has no message box. **Continue this chat with your own copy**, at the bottom, copies it into your own chats so you can carry on from there.

## <AppIcon name="messages" /> In a chat {#in-a-chat}

<vimg src="mara/example-chat.webp" alt="The Cheminformatics - PCA example chat, with a tool step, file links and a plot" />

<UiList label="Chat header">
<UiItem icon="pencil" name="Edit title">Next to the chat's title. Renames the chat.</UiItem>
<UiItem icon="share-2" name="Share" href="#sharing">Sets who can see the chat, and copies its link.</UiItem>
<UiItem icon="files" name="Files" href="#files-panel">The chat's files, tables and context.</UiItem>
</UiList>

Above each answer, MARA names the tool or workflow it ran. The <AppIcon name="chevron-right" /> chevron beside it expands the step to show the tool's inputs and output. Files that MARA makes appear as links in the answer, and images and structures show under it.

<UiList label="Under an answer">
<UiItem icon="eye-off" name="hide 1 file">Hides the file previews under the answer.</UiItem>
<UiItem icon="cloud-download" name="Download">Next to a file's name. Downloads the file.</UiItem>
</UiList>

### 3D viewer {#3d-viewer}

A structure file opens in a small 3D viewer inside the chat.

<UiList label="3D viewer">
<UiItem name="First Model / Previous Model / Next Model">Steps through the models in a file with several, such as docking poses. The bar shows which model is on screen.</UiItem>
<UiItem name="Reset Zoom">Fits the structure back into the view.</UiItem>
<UiItem name="Screenshot / State Snapshot">Saves an image or the viewer's state.</UiItem>
</UiList>

<vimg src="mara/chat-3d-viewer.webp" alt="Docking poses in the chat's 3D viewer" />

### <AppIcon name="share-2" /> Sharing a chat {#sharing}

<UiList label="Share">
<UiItem name="Private">Only you can see the chat.</UiItem>
<UiItem name="Org">Shares the chat with your organization.</UiItem>
<UiItem name="Public">Makes the chat public.</UiItem>
<UiItem icon="copy" name="Copy Link">Copies a link to the chat.</UiItem>
</UiList>

### <AppIcon name="files" /> Files panel {#files-panel}

**Files** opens a panel on the right with three sections.

<UiList label="Files panel">
<UiItem name="Files">Every file in the chat, uploaded or made by MARA. Tick files to act on several at once.</UiItem>
<UiItem icon="dots-vertical" name="More (⋮)">On a file: Add to Workspace and Download.</UiItem>
<UiItem icon="file-arrow-right" name="Add to Workspace">Loads the ticked files into a workspace.</UiItem>
<UiItem icon="cloud-download" name="Download">Downloads the ticked files.</UiItem>
<UiItem icon="trash" name="Delete">Deletes the ticked files.</UiItem>
<UiItem icon="table" name="Tables" href="/mara/features#tables">Data tables for the chat. Drop CSV or SDF files here, or ask MARA to make a table from a file.</UiItem>
<UiItem name="Context">Values from tool results and the conversation that MARA keeps for this chat.</UiItem>
</UiList>

<vimg src="mara/files-panel.webp" alt="The Files panel with six files, the Tables section and Context" />

## <AppIcon name="message" /> Threads {#threads}

The Threads tab gathers the comment threads from the workspaces you can open. Each row shows who started the thread, the workspace, the first comment and the number of replies. Clicking a row opens the thread on the right.

<UiList label="Threads">
<UiItem icon="mail" name="Unread">Shows only threads with comments you haven't read.</UiItem>
<UiItem icon="search" name="Search (⌘F)">Searches the threads.</UiItem>
<UiItem name="Open Workspace">Opens the thread's workspace.</UiItem>
<UiItem name="Reply in thread" href="/nanome_web/comments">Adds a reply, the same as in the workspace's Comments tab.</UiItem>
</UiList>

<vimg src="mara/threads.webp" alt="The Threads tab with a thread open" />

## <AppIcon name="at" /> Mentions {#mentions}

The Mentions tab lists the comments that mention you, with the same **Unread** filter and search as Threads.
