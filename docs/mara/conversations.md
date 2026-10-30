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

## <AppIcon name="messages" /> Chat {#chat}

The Chat tab lists your chats on the left, grouped by month with the newest first. With no chat open, the page shows three starting points, a few prompts to try, and the message box.

<ShotRow src="mara/conversations.webp" alt="The Conversations page with the Chat tab open and no chat selected">

<UiList label="Chat list">
<UiItem icon="plus" name="New Chat" area="0.9,15.6,15.0,4.5">Starts a new chat.</UiItem>
<UiItem icon="search" name="Search (⌘F)" area="0.9,20.7,15.0,4.6">Searches your chats.</UiItem>
</UiList>

Hovering a chat in the list shows <AppIcon name="pin" /> **Pin**, which pins it in the list, and <AppIcon name="trash" /> **Delete**.

<UiList label="Starting points">
<UiItem icon="play" name="Learn the Basics" area="39.1,40.6,11.0,15.4">Plays a walkthrough video of Nanome and MARA.</UiItem>
<UiItem icon="message-2-share" name="Open Examples" href="#examples" area="50.7,40.6,10.9,15.4">Four example chats, one for each field.</UiItem>
<UiItem icon="upload" name="Click to upload files" area="62.5,40.6,15.8,15.4">Opens a file picker. Files dropped anywhere on the page upload too.</UiItem>
</UiList>

### Message box {#message-box}

<UiList label="Message box">
<UiItem icon="paperclip" name="Attach file" area="71.6,93.9,1.4,2.7">Adds a file to your message.</UiItem>
<UiItem icon="hexagon" name="Draw SMILES" area="74.3,93.9,1.4,2.7">Opens Sketch Molecule, to draw a structure.</UiItem>
<UiItem icon="tool" name="Run tool" area="77.0,93.9,1.4,2.7">Opens Select tool, to pick a MARA tool to run.</UiItem>
<UiItem icon="route" name="Run workflow" area="79.7,93.9,1.4,2.7">Opens Select workflow, to pick a workflow to run.</UiItem>
<UiItem icon="arrow-up" name="Send" area="82.1,92.7,2.7,5.0">Sends your message.</UiItem>
</UiList>

The same message box sits in each workspace's [MARA tab](/nanome_web/workspace#mara-tab).

</ShotRow>

## <AppIcon name="message-2-share" /> Example chats {#examples}

**Open Examples** shows one card for each field, with the tasks its example covers. **Open** on a card opens that example chat.

<ShotRow src="mara/open-examples.webp" alt="The four example chat cards">

<UiList label="Example chats">
<UiItem icon="hexagons" name="Cheminformatics" area="2.5,7.3,22.8,86">Calculate molecular properties, analyze SAR data, visualize data.</UiItem>
<UiItem icon="dna2" name="Bioinformatics" area="26.6,7.3,22.8,86">Design protein sequences, align sequences, fold a sequence with ESMFold.</UiItem>
<UiItem icon="microscope" name="Drug Discovery" area="50.8,7.3,22.9,86">Find related structures, find binding pockets, run docking.</UiItem>
<UiItem icon="atom" name="Comp Chemistry" area="74.8,7.3,22.8,86">Process molecular dynamics trajectories, calculate distances, prepare structures.</UiItem>
</UiList>

</ShotRow>

An example chat is marked **Example** and has no message box. **Continue this chat with your own copy**, at the bottom, copies it into your own chats so you can carry on from there.

## <AppIcon name="messages" /> In a chat {#in-a-chat}

<ShotRow src="mara/example-chat.webp" alt="The Cheminformatics - PCA example chat, with a tool step, file links and a plot">

<UiList label="Chat header">
<UiItem icon="files" name="Files" href="#files-panel" area="91.6,1.4,7.8,6.3">The chat's files, tables and context.</UiItem>
</UiList>

In your own chats, the header also has <AppIcon name="pencil" /> **Edit title** next to the title, and <AppIcon name="share-2" /> [Share](#sharing).

Above each answer, MARA names the tool or workflow it ran. The <AppIcon name="chevron-right" /> chevron beside it expands the step to show the tool's inputs and output. Files that MARA makes appear as links in the answer, and images and structures show under it.

<UiList label="Under an answer">
<UiItem icon="eye-off" name="hide 1 file" area="18.7,84.1,9,5.5">Hides the file previews under the answer.</UiItem>
</UiList>

<AppIcon name="cloud-download" /> **Download**, next to a file's name, downloads that file.

</ShotRow>

### 3D viewer {#3d-viewer}

A structure file opens in a small 3D viewer inside the chat.

<ShotRow src="mara/chat-3d-viewer.webp" alt="Docking poses in the chat's 3D viewer">

<UiList label="3D viewer">
<UiItem name="First Model / Previous Model / Next Model" area="3.8,4,45.1,9.4">Steps through the models in a file with several, such as docking poses. The bar shows which model is on screen.</UiItem>
<UiItem name="Reset Zoom" area="85.5,4.1,9.1,8.9">Fits the structure back into the view.</UiItem>
<UiItem name="Screenshot / State Snapshot" area="85.5,13.1,9.1,9">Saves an image or the viewer's state.</UiItem>
</UiList>

</ShotRow>

### <AppIcon name="share-2" /> Sharing a chat {#sharing}

<UiList label="Share">
<UiItem name="Private">Only you can see the chat.</UiItem>
<UiItem name="Org">Shares the chat with your organization.</UiItem>
<UiItem name="Public">Makes the chat public.</UiItem>
<UiItem icon="copy" name="Copy Link">Copies a link to the chat.</UiItem>
</UiList>

### <AppIcon name="files" /> Files panel {#files-panel}

**Files** opens a panel on the right with three sections.

<ShotRow src="mara/files-panel.webp" alt="The Files panel with six files, the Tables section and Context">

<UiList label="Files panel">
<UiItem name="Files" area="3.4,1.7,93,48.1">Every file in the chat, uploaded or made by MARA. Tick files to act on several at once.</UiItem>
<UiItem icon="dots-vertical" name="More (⋮)" area="79.8,9.7,5.6,3">On a file: Add to Workspace and Download.</UiItem>
<UiItem icon="file-arrow-right" name="Add to Workspace" area="3.1,55.8,46.5,4.6">Loads the ticked files into a workspace.</UiItem>
<UiItem icon="cloud-download" name="Download" area="50.7,55.9,9.4,4.4">Downloads the ticked files.</UiItem>
<UiItem icon="trash" name="Delete" area="61,55.8,9.7,4.6">Deletes the ticked files.</UiItem>
<UiItem icon="table" name="Tables" href="/mara/features#tables" area="3.1,74.8,93.3,15.8">Data tables for the chat. Drop CSV or SDF files here, or ask MARA to make a table from a file.</UiItem>
<UiItem name="Context" area="3.3,93,93.2,5.3">Values from tool results and the conversation that MARA keeps for this chat.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="message" /> Threads {#threads}

The Threads tab gathers the comment threads from the workspaces you can open. Each row shows who started the thread, the workspace, the first comment and the number of replies. Clicking a row opens the thread on the right.

<ShotRow src="mara/threads.webp" alt="The Threads tab with a thread open">

<UiList label="Threads">
<UiItem icon="mail" name="Unread" area="1.1,8.6,8.7,5.1">Shows only threads with comments you haven't read.</UiItem>
<UiItem icon="search" name="Search (⌘F)" area="10,8.6,14,5.4">Searches the threads.</UiItem>
<UiItem name="Open Workspace" area="87.7,8.5,11.7,5.5">Opens the thread's workspace.</UiItem>
<UiItem name="Reply in thread" href="/nanome_web/comments" area="33.8,91,58.1,8">Adds a reply, the same as in the workspace's Comments tab.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="at" /> Mentions {#mentions}

The Mentions tab lists the comments that mention you, with the same **Unread** filter and search as Threads.
