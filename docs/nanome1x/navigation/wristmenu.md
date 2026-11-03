---
title: Wrist Menu
---

# Wrist Menu

The Wrist Menu holds features that don't depend on what's in the workspace, such as quick menu access and room management.

<ScreenMap src="navigating-page/wrist-menu-1-24.png" alt="The Wrist Menu in Nanome 1.24" crop="5.0,10.0,95.0,90.0" label="Wrist Menu buttons">
<MapCard icon="crown" title="Presenter" href="#presenter" side="left" area="10.4,14.8,11.7,19.6">Request presenter, or see and grant requests.</MapCard>
<MapCard icon="arrows-maximize" title="Edit Position" href="/nanome1x/navigation/environment#teleportation" side="left" area="8.2,54.0,12.4,20.2">Turns on moving around the room by teleporting.</MapCard>
<MapCard icon="users" title="Room" href="#room" side="top" area="21.7,15.9,27.1,29.7">Manage Users, Meetings, Spatial Recording, Return to Lobby and Exit Nanome.</MapCard>
<MapCard icon="layout-grid" title="Quick Menus" href="#quick-menus" side="top" area="49.6,13.4,28.6,30.4">Toggle each menu.</MapCard>
<MapCard icon="files" title="Menu Layouts" href="#menu-layouts" side="left" area="20.5,45.4,28.1,30.2">Manage the enabled menus and their layout.</MapCard>
<MapCard icon="settings" title="Settings" href="#settings" side="right" area="49.3,43.6,29.8,31.3">Mic indicator, sound, avatar and more.</MapCard>
<MapCard icon="arrow-back-up" title="Undo and Redo" side="right" area="78.9,12.6,16.4,19.4;81.0,77.1,17.9,20.5">Undoes or redoes the last change.</MapCard>
<MapCard icon="clock" title="Time" side="right" area="80.4,44.3,19.6,18.5">The current time.</MapCard>
<MapCard icon="file-text" title="Shared Notepad" href="#notepad" side="bottom" area="6.9,74.4,12.8,20.9">A sticky note.</MapCard>
<MapCard icon="world" title="Web Browser" href="#in-vr-web-browser" side="bottom" area="19.7,76.7,14.0,18.9">A web browser inside VR.</MapCard>
<MapCard icon="camera" title="Screenshot Tool" href="#screenshot-tool" side="bottom" area="34.2,76.0,14.4,20.3">Take a screenshot and email it.</MapCard>
<MapCard icon="device-floppy" title="Quick Save" side="bottom" area="49.5,76.4,14.0,19.4">Saves the workspace.</MapCard>
<MapCard icon="microphone" title="Mute" side="bottom" area="64.9,76.2,14.9,19.8">Mutes or unmutes your mic.</MapCard>
</ScreenMap>

## Quick Menus

<ShotRow src="navigating-page/Wrist-QuickMenus.jpg" alt="The Quick Menus panel above the Wrist Menu" crop="4.4,5.5,66.1,90.9" expand-below>

Quick Menus turns each menu on or off. This screenshot shows the wrist menu's earlier design.

<UiList label="Quick Menus">
<UiItem name="Menu buttons" area="12.2,7.5,49.0,39.5">Each one toggles its menu on or off.</UiItem>
<UiItem name="Clear All" area="20.1,48.6,14.7,6.5">Turns every menu off.</UiItem>
<UiItem name="Open All" area="38.4,48.8,14.6,6.5">Turned every menu on. Version 1.24.6 removed this button.</UiItem>
</UiList>

</ShotRow>

## Room

<ShotRow src="navigating-page/wrist_menu_spatrec.png" alt="The Wrist Menu's Room buttons: Manage Users, Meetings, Spatial Recording, Return to Lobby and Exit Nanome" expand-below>

<UiList label="Room">
<UiItem icon="users" name="Manage Users" href="#manage-users" area="18.6,7.0,28.7,31.5">Opens Manage Users, below.</UiItem>
<UiItem icon="calendar" name="Meetings" href="/home.nanome.ai/meetings" area="47.7,4.0,31.2,34.9">Scheduled meetings.</UiItem>
<UiItem name="Spatial Recording" href="/nanome1x/navigation/menus#spatial-recordings" area="20.1,40.6,28.1,31.7">Records the workspace to play back later.</UiItem>
<UiItem icon="logout" name="Return to Lobby" area="52.5,41.4,13.1,31.7">Leaves the room for the lobby.</UiItem>
<UiItem icon="x" name="Exit Nanome" area="66.0,41.4,13.1,32.0">Closes Nanome.</UiItem>
</UiList>

</ShotRow>

### Manage Users

<ShotRow src="navigating-page/Wrist-Room-ManageUsers.jpg" alt="The Manage Users panel" crop="4.0,1.0,67.0,61.0" expand-below>

<UiList label="Manage Users">
<UiItem name="Users" area="7.7,17.0,57.7,12.2">The users in the room, with a count. From here you can hide a user or give them the presenter privilege.</UiItem>
<UiItem name="Teleport Guests To Me" area="7.7,52.1,32.1,5.7">Teleports guests to you.</UiItem>
<UiItem name="Invite" area="53.1,52.5,13.7,5.1">Invites others to the room.</UiItem>
</UiList>

</ShotRow>

## Presenter

In version 1.24.6, one Presenter (crown) button on the Wrist Menu both requests presenter and opens Presenter Requests.

<ShotRow src="navigating-page/Wrist-Room-PresenterRequests.jpg" alt="The Presenter Requests panel" crop="1.6,1.5,76.0,69.5">

<UiList label="Presenter Requests">
<UiItem name="Requests" area="3.5,10.4,72.2,47.9">The requests waiting, with a count. Grant presenter privilege from here.</UiItem>
<UiItem name="Remove All" area="39.2,59.0,29.4,6.6">Clears every request.</UiItem>
</UiList>

</ShotRow>

## Menu Layouts

<vimg src="navigating-page/Wrist-Menu.jpg" alt="The wrist menu with Focus On Menu, Grid Lock Menus, Hide Menus and Lock Menus" />

The Menu Layouts buttons arrange, hide and lock the open menus. This screenshot shows the wrist menu's earlier design.

## Settings

<ShotRow src="navigating-page/Wrist_Settings_Menu2.jpg" alt="The Settings buttons of the Wrist Menu" crop="5.0,10.0,64.0,80.0" expand-below>

This screenshot shows the wrist menu's earlier design.

<UiList label="Settings on the Wrist Menu">
<UiItem name="Mic indicator" area="14.8,39.0,42.5,4.4">The center area of the settings menu has an indicator for your current mic volume. You can use it to check if your mic is working.</UiItem>
<UiItem name="Settings Menu" area="43.8,17.8,12.7,14.5">Opens the Settings menu below, for sound volumes, environment backgrounds, avatar customizations and more.</UiItem>
</UiList>

</ShotRow>

### Sound

<ShotRow src="navigating-page/Wrist_Settings_Sound_2.png" alt="The Sound tab of the Settings menu">

<UiList label="Sound">
<UiItem name="Mic Input Indicator" area="35.4,26.5,57.3,8.6">Shows the level of your mic input.</UiItem>
<UiItem name="Mic Input Volume" area="34.5,35.3,58.2,8.6">Sets your mic's input volume.</UiItem>
<UiItem name="Master Volume" area="35.4,51.1,58.8,8.9">Sets the overall volume.</UiItem>
<UiItem name="Music Volume" area="35.4,59.7,57.3,9.1">Sets the music volume.</UiItem>
<UiItem name="Sound FX Volume" area="35.4,68.6,57.3,8.8">Sets the volume of sound effects.</UiItem>
<UiItem name="Voice Chat Volume" area="35.4,77.3,57.3,9.1">Sets how loud other people's voices are.</UiItem>
</UiList>

</ShotRow>

### User

<ShotRow src="navigating-page/Wrist_Settings_User_2.png" alt="The User tab of the Settings menu" crop="32.0,17.3,64.0,40.9" expand-below>

<UiList label="User">
<UiItem name="Avatar Settings" area="66.7,20.5,26.8,13.2">Opens the avatar customizations below.</UiItem>
<UiItem name="Display Name" area="34.5,35.2,59.2,6.5">Your display name.</UiItem>
<UiItem name="Snap Rotation" area="34.5,42.4,59.2,6.2">Turns snap rotation on or off.</UiItem>
<UiItem name="Snap Degree" area="34.5,49.2,59.2,6.5">The angle of each snap turn, in degrees.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="navigating-page/Wrist_Settings_Avatar.jpg" alt="The Avatar Settings panel" crop="55.7,5.0,38.8,93.3">

**Avatar Customizations**

Avatar Settings changes your display name, hairstyle, hair color, eyeglasses color and shirt color.

<UiList label="Avatar Settings">
<UiItem name="Hairstyle" area="60.1,60.0,29.7,10.0">Picks a hairstyle.</UiItem>
<UiItem name="Hair, Eyeglasses, Shirt" area="60.5,71.6,29.5,6.3">Picks what to color.</UiItem>
<UiItem name="Colors" area="61.3,78.4,27.8,12.6">Picks its color.</UiItem>
</UiList>

</ShotRow>

### Room

<ShotRow src="navigating-page/Wrist_Settings_Room_2.png" alt="The Room tab of the Settings menu" crop="31.9,16.8,64.0,39.4">

<UiList label="Room">
<UiItem name="Sky" area="34.5,20.0,58.9,10.0">The environment background, from 6 choices.</UiItem>
<UiItem name="Show Floor" area="34.5,31.7,58.9,6.3">Shows or hides the floor.</UiItem>
<UiItem name="Menu Animation Style" area="34.5,38.3,58.9,7.1">The easing of menu animations, such as EaseInOutSine.</UiItem>
<UiItem name="Menu Animation Timing" area="34.5,45.4,58.9,7.1">How long menu animations take, such as 250 ms.</UiItem>
</UiList>

</ShotRow>

### Stacks

<ShotRow src="navigating-page/Wrist_Settings_Stacks.png" alt="The Stacks tab of the Settings menu" crop="32.0,17.1,64.0,77.3">

<UiList label="Stacks">
<UiItem name="Plugin Integration Settings" area="34.6,30.9,58.8,53.2">Change which plugins or simulations the software uses for each task, such as Hydrogen or Minimization.</UiItem>
<UiItem name="Upgrade" area="34.7,84.8,58.7,6.5">Shown when your account isn't Stacks enabled. Upgrade to use these settings.</UiItem>
</UiList>

</ShotRow>

### Help

<ShotRow src="navigating-page/Wrist_Settings_Help_2.png" alt="The Help tab of the Settings menu" crop="32.0,17.3,64.0,77.3">

<UiList label="Help">
<UiItem icon="book" name="Documentation" area="34.2,20.5,58.9,12.4">Where to find the documentation and minimum requirements: docs.nanome.ai.</UiItem>
<UiItem icon="mail" name="Support" area="34.2,43.6,58.9,16.1">Help with something specific: support@nanome.ai.</UiItem>
<UiItem icon="user-circle" name="Account" area="34.2,67.1,58.9,16.1">License and account management, and purchases: home.nanome.ai.</UiItem>
</UiList>

</ShotRow>

### Controls

<ShotRow src="navigating-page/Wrist_Settings_Controls_2.png" alt="The Controls tab of the Settings menu" crop="32.0,17.0,64.0,77.3">

<UiList label="Controls">
<UiItem name="Trigger" area="34.8,20.5,28.6,25.2">Press to use the menu buttons and interfaces your laser points at.</UiItem>
<UiItem name="Grip" area="63.9,20.5,28.6,25.2">Press and hold to grab. Grab with both grips to scale.</UiItem>
<UiItem name="Left Top Button" area="34.8,46.2,28.6,25.2">Opens and closes the action menu, for quick access to tools.</UiItem>
<UiItem name="Right Top Button" area="63.9,46.2,28.6,25.2">Press and hold to open the tools menu, then release on the tool you want.</UiItem>
<UiItem name="Menu Button" area="34.8,72.0,28.6,18.5">Opens the Entry List.</UiItem>
<UiItem name="Both Joysticks" area="63.9,72.0,28.6,18.5">While grabbing an object, move up or down to push or pull it.</UiItem>
</UiList>

</ShotRow>

## Screenshot Tool

<vimg src="navigating-page/Wrist-ScreenshotTool.gif" alt="Opening the camera from the wrist menu and taking a picture of a protein" />

The screenshot tool takes a picture of your workspace and can email it.

### Camera as Desktop View

<ShotRow src="navigating-page/camera_desktop_view.png" alt="The screenshot tool with the Camera as desktop view button">

<UiList label="Screenshot tool">
<UiItem icon="device-desktop" name="Camera as desktop view" area="3.3,5.0,10.8,23.4">Mirrors the in-app camera to your desktop (Desktop VR only).</UiItem>
</UiList>

</ShotRow>

## Shared Notepad {#notepad}

<ShotRow src="navigating-page/notepad.png" alt="The Shared Notepad">

The Shared Notepad works as a sticky note.

<UiList label="Shared Notepad">
<UiItem icon="text-size" name="Text Size" area="6.7,86.2,46.4,7.3">S, M or L.</UiItem>
<UiItem name="Save as PNG" area="60.2,85.8,32.1,8.2">Saves the note as a PNG image.</UiItem>
</UiList>

</ShotRow>

## In-VR Web Browser

This is a web browser that can be accessed from within the virtual environment. The browser may be viewed by only a single user, or shared with everyone in the same workspace. Note: only one browser can be shared at a time.

<vimg src="navigating-page/web_browser_no_keyboard.png" alt="The in-VR web browser showing docs.nanome.ai, with its keyboard closed" /> <vimg src="navigating-page/web_browser_with_keyboard.png" alt="The in-VR web browser showing docs.nanome.ai, with its keyboard open below" />
