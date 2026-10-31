---
outline: [2, 3]
title: Vision Pro
---

# Apple Vision Pro

Nanome on Apple Vision Pro is a beta. It opens the same workspaces as Nanome XR on Quest and Nanome Web, with its menus in a visionOS window and the structures in the space around you.

<IconGrid label="Vision Pro" :cols="3">
<IconCard icon="download" title="Get the beta" href="#get-the-beta">Through TestFlight.</IconCard>
<IconCard icon="login-2" title="Log in" href="#log-in">Username and password, or a new account.</IconCard>
<IconCard icon="hand-grab" title="Gestures" href="#gestures">Look and pinch to grab and scale.</IconCard>
<IconCard icon="layout-grid" title="The Nanome window" href="#the-nanome-window">Components, Workspaces, Settings and Scenes.</IconCard>
<IconCard icon="headset" title="Compared with Quest" href="#compared-with-quest">What the Vision Pro beta has and leaves out.</IconCard>
</IconGrid>

## <AppIcon name="download" /> Get the beta {#get-the-beta}

The beta installs through Apple TestFlight. [Getting Started](/getting-started#install) has the steps, under Apple Vision Pro.

## <AppIcon name="login-2" /> Log in {#log-in}

Nanome opens on a login window.

<UiList label="Vision Pro login">
<UiItem name="Username">Your Nanome username.</UiItem>
<UiItem name="Password">Your Nanome password.</UiItem>
<UiItem name="Remember me">Keeps you signed in.</UiItem>
<UiItem name="Log In">Signs in. Progress and errors show just above the button.</UiItem>
<UiItem name="Create Account">Opens a sign-up form: email, username, password, the kind of organization (Classroom, Academic Lab, National Research Lab, Commercial Company or Other), an optional company or institution, and a newsletter switch.</UiItem>
</UiList>

The window also shows the app version. There's no Code tab: signing in with a code from another device works in Nanome XR on the other headsets.

## <AppIcon name="hand-grab" /> Gestures {#gestures}

Vision Pro uses the visionOS pinch. The [Controls](/nanome_v2/controls#apple-vision-pro) page covers the same gestures for every headset.

<UiList label="Vision Pro gestures">
<UiItem icon="hand-grab" name="Look and pinch" href="/nanome_v2/controls#grab-move-and-scale">Looking at a structure and pinching grabs the workspace, and moving the hand moves it.</UiItem>
<UiItem icon="hand-finger" name="Reach and pinch">Reaching out and pinching a structure directly does the same.</UiItem>
<UiItem icon="arrows-maximize" name="Pinch with both hands">Scales and rotates the workspace.</UiItem>
<UiItem icon="arrows-move" name="Position Molecules" href="#components-tab">With the switch on, a pinch moves one structure on its own.</UiItem>
</UiList>

The window's buttons work like any visionOS window: look at a button and pinch.

## <AppIcon name="layout-grid" /> The Nanome window {#the-nanome-window}

The window has three columns: the sidebar on the left, the open tab in the middle and [Scenes](#scenes) on the right. The top line names the loaded workspace, or reads **No Workspace Loaded**.

<UiList label="Sidebar">
<UiItem name="Components" href="#components-tab">The structures in the workspace. Available once a workspace is loaded.</UiItem>
<UiItem name="Workspaces" href="#workspaces-tab">Projects and workspaces.</UiItem>
<UiItem name="Settings" href="#settings-tab">App info, server, version and Log Out.</UiItem>
<UiItem name="Load Structure">Loads a structure from the RCSB by its 4-character PDB code. Available once a workspace is loaded.</UiItem>
<UiItem name="Online">At the bottom: reads Offline when the headset has no internet connection.</UiItem>
</UiList>

### Components tab {#components-tab}

The structures in the workspace, each with its components. The **Position Molecules** switch at the top lets structures be moved one by one.

Each structure's row has these buttons:

<UiList label="Entry row">
<UiItem name="Eye">Hides or shows the structure. A structure with no components shows a plus instead, which adds the default components.</UiItem>
<UiItem name="Previous, Play, Next">For structures with several models or frames, with a frame count. Long-pressing Play picks a speed: ×1, ×2, ×5, ×10 or ×20. Only you and the people following you see the playback.</UiItem>
<UiItem name="Zoom">Brings the structure into view.</UiItem>
<UiItem name="More">Rename, Duplicate, Delete (after a confirmation), Copy Entry Position and Copy Components. Under Structure Actions: Reset Components, Reset Position and Remove Interaction Components.</UiItem>
</UiList>

Each component sits under its structure, with 2 buttons:

<UiList label="Component row">
<UiItem name="Eye">Hides or shows the component.</UiItem>
<UiItem name="More">Rename, Remove, Copy Component and Duplicate to Entry.</UiItem>
</UiList>

Copy Entry Position, Copy Components and Copy Component copy to other scenes: a sheet picks the scenes, with All and None.

### Workspaces tab {#workspaces-tab}

A switch at the top shows **Projects** or **Workspaces**. Projects can be filtered by name, and opening one lists its workspaces.

<UiList label="Workspaces tab">
<UiItem name="Name, Owner, Modified">The columns of the workspace list.</UiItem>
<UiItem name="New">Creates a workspace.</UiItem>
<UiItem name="Load">Opens the selected workspace.</UiItem>
<UiItem name="More">Info, Duplicate, Rename (with edit access) and Leave. Leave asks first, because access only comes back with a new invitation.</UiItem>
</UiList>

### Settings tab {#settings-tab}

<UiList label="Settings tab">
<UiItem name="App Info">The app version and the addresses of the servers Nanome talks to: Router API, Accounts API, Workspace API and MARA.</UiItem>
<UiItem name="Server">Switches between servers. Appears only when server switching is available.</UiItem>
<UiItem name="Log Out">Below the version number.</UiItem>
</UiList>

### Scenes {#scenes}

The right column lists the workspace's [scenes](/nanome_v2/scenespanel), with the current one's number out of the total.

<UiList label="Scenes column">
<UiItem name="Plus">Adds a scene.</UiItem>
<UiItem name="Arrows">Go to the previous or next scene.</UiItem>
<UiItem name="Gear">Recenter Self, Set scene POV, and Enable or Disable Scene POVs.</UiItem>
<UiItem name="More">On a scene: Rename, Duplicate, Copy Scene POV and Delete.</UiItem>
</UiList>

## <AppIcon name="headset" /> Compared with Quest {#compared-with-quest}

| | Quest | Vision Pro beta |
|---|---|---|
| Grab, move and scale | Yes | Yes |
| Log in with a code | Yes | No |
| Load a structure by PDB code | Yes | Yes |
| Projects and workspaces | Yes, plus Join by code and Load for All | Open, create, duplicate, rename, leave |
| Show, hide and copy components | Yes | Yes |
| Change a component's style or colors | Yes | No |
| Ligands tab | Yes | No |
| Tools Panel (Pointer, Selection, Measurement and the rest) | Yes | No |
| Scenes | Yes, plus recordings and Spotlight | Add, rename, duplicate, delete, POVs |
| Users tab, sharing and mic | Yes | No |
| MARA | Yes | No |
| Comments | Yes | No |
| Wrist Menu | Yes | No |
