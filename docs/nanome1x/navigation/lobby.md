---
title: Lobby
---

# Lobby

<vimg src="navigating-page/124loginscreen.png" alt="The Welcome to Nanome! panel on its Sign In tab, beside the 1.24 update banner" />

The Nanome Lobby is where users can sign into an account or sign up. By toggling the 'Remember Me' button, users can automatically be signed in the next time they start Nanome. Users can also start the Nanome Basics tutorial by selecting 'Start Tutorial'.

After signing in, the lobby looks like this (Meetings tab shown):

<ScreenMap src="navigating-page/1.24.3meetingslobby.png" alt="The lobby after signing in, on the Meetings tab, with the left window beside it" crop="15.0,20.5,67.0,74.5" label="Lobby after sign-in">
<MapCard icon="users-group" title="Lobby" href="#lobby-top-bar" side="top" area="36.1,21.9,8.4,4.9">Join by Meeting ID, create a room, or pick Public or My Org.</MapCard>
<MapCard icon="login" title="Join By Meeting ID" href="#_1-join-by-meeting-id" side="top" area="37.1,27.7,9.5,5.2">Join a scheduled meeting with its Meeting ID.</MapCard>
<MapCard icon="calendar" title="Meetings" href="#_4-meetings" side="top" area="44.6,21.9,8.3,4.9">Manage and join scheduled meetings.</MapCard>
<MapCard icon="settings" title="Settings" href="#_5-settings" side="top" area="53.0,21.9,8.4,4.9">Adjust settings and view the Configuration file.</MapCard>
<MapCard icon="eye" title="Mixed Reality" href="#lobby-left-window" side="left" area="16.1,26.4,19.1,7.6">Enables Mixed reality on supported headsets.</MapCard>
<MapCard icon="user-circle" title="User Preview" href="#lobby-left-window" side="left" area="16.1,33.6,19.2,50.3">How you appear to others, plus mute and Change Avatar.</MapCard>
</ScreenMap>

## Update Banner

<vimg src="navigating-page/1243updatebanner.png" alt="The 1.24 Mixed Reality Update banner: Passthrough, Meta Avatars and Grab to Present" />

The update banner features the latest features that are added in the version that the users are in.

## Creating an Account

<vimg src="navigating-page/124accountcreation.png" alt="The Welcome to Nanome! panel on its Register tab" />

An email address is required to create a Nanome account.

**Terms & Conditions**: [https://nanome.ai/terms/](https://nanome.ai/terms/)

## Nanome Basics

<vimg src="navigating-page/nanome_basics.png" alt="The Nanome Basics panel on Trigger Selection, with Restart Scenario, Jump to Advanced and Exit Tutorial beside it" />

Nanome Basics is our introductory tutorial that gets the user acquainted with the Nanome virtual environment and controllers. The tutorial consists of 7 levels. Follow the instructions on the Level Panel and the narrated audio to complete the levels.

### Navigating the Tutorial Using Level Panels

<ShotRow src="navigating-page/tutorial_task_panel.png" alt="A Nanome Basics level panel with three tasks, and the back and forward arrows">

<UiList label="Level panel">
<UiItem icon="check" name="Task checkboxes" area="2.7,23.5,6.0,48.9">A checkmark will appear when each task is completed within a level panel.</UiItem>
<UiItem icon="chevron-left" name="Back arrow" area="31.9,87.1,9.5,10.5">Visits previous levels.</UiItem>
<UiItem icon="chevron-right" name="Forward arrow" area="57.9,87.1,9.5,10.5">Skips the current level.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="navigating-page/nanome_basics_completed.png" alt="The Nanome Basics completed panel, with Exit Tutorial and Advanced Tutorials buttons">

Once the Nanome Basics tutorial is completed, you can move onto Advanced Tutorials or you can exit the tutorial.

<UiList label="Tutorial completed">
<UiItem name="Advanced Tutorials" area="40.1,69.9,24.2,11.2">Brings the user into a Nanome workspace and pulls up the Spatial Tutorials menu.</UiItem>
<UiItem name="Exit Tutorial" area="13.6,69.7,23.9,11.2">Returns to the Lobby.</UiItem>
</UiList>

</ShotRow>

## Lobby Top Bar

<ShotRow src="navigating-page/lobbytopbar1.24.3numbered.png" alt="The lobby top bar on the Lobby tab, with its parts numbered 1 to 5">

<UiList label="Lobby top bar">
<UiItem icon="login" name="Join By Meeting ID" href="#_1-join-by-meeting-id" area="4.3,50.0,27.7,37.5">Join a prescheduled meeting with its Meeting ID.</UiItem>
<UiItem icon="plus" name="Create Room" href="#_2-creating-a-room" area="33.6,50.0,23.2,37.5">Public, Private or Single User, depending on your license.</UiItem>
<UiItem icon="building" name="Public / My Org" href="#_3-public-my-org-server-selector" area="63.0,50.0,33.8,37.5">Nanome Public Server or Custom Private Server.</UiItem>
<UiItem icon="calendar" name="Meetings" href="#_4-meetings" area="25.9,8.5,24.4,34.5">Manage and join scheduled meetings.</UiItem>
<UiItem icon="settings" name="Settings" href="#_5-settings" area="50.6,8.5,24.5,34.5">Adjust settings and view the Configuration file.</UiItem>
</UiList>

</ShotRow>

### (1) Join By Meeting ID

Users can join a prescheduled meeting in Nanome by entering the Meeting ID provided by the room host. Find out how to [create meetings here](/home.nanome.ai/meetings).

### (2) Creating a Room

<vimg src="navigating-page/createroom.png" alt="The Create Room panel with Room Name, Display Name, Room Password (optional) and Choose Room Access set to Private (My Org)" />

There are three Room Types a user can create depending on their Nanome License.

Room Types:

- Public Rooms: Anyone can join the room. Available to all Nanome licenses.
- Private Rooms (Private (My Org) under Choose Room Access): Only people in your organization can join. Available to Academic and Enterprise.
- Single User: Offline mode that no one else can join. Available to Academic and Enterprise.

Any room can also have an optional Room Password.

### (3) Public / My Org Server Selector

Indicates connection to Nanome Public Server or Custom Private Server

### (4) Meetings

The Meetings tab is the central location for users to manage and join scheduled meetings. The lobby screenshot at the [top of this page](#lobby) shows this tab.

### (5) Settings

<ShotRow src="navigating-page/lobbysettings.png" alt="The Settings tab in the lobby" crop="35.9,21.5,34.0,59.7">

In the Setting tab, users can adjust various settings.

<UiList label="Settings tab">
<UiItem name="Open Config" area="61.4,45.8,6.8,4.5">The Configuration button. Opens the Configuration Viewer, below.</UiItem>
</UiList>

</ShotRow>

**Configuration Viewer**

By selecting the Configuration button in the Setting tab, users can view the Nanome Configuration file, which contains additional settings that cannot be controlled directly from within the app. Newly added are Presentation Setup Options, which enable the presenter to manage guests that join their room. The Configuration file can be located in the same directory as the app build directory.

<vimg src="navigating-page/Lobby-ConfigurationViewer.jpg" alt="The Configuration viewer listing settings such as desktop-mode = False" />

## Lobby Left Window

<ShotRow src="navigating-page/1243lobbyleftwindow.png" alt="The lobby's left window: Mixed Reality toggle, user preview, mute button and Change Avatar" crop="0,0,100,85.5">

The left window in the lobby offers a quick way to make changes to how you interact with Nanome and other users.

<UiList label="Lobby left window">
<UiItem icon="eye" name="Mixed Reality Toggle" area="1.9,2.0,95.4,11.3">Enables Mixed reality on supported headsets.</UiItem>
<UiItem icon="user-circle" name="User Preview" area="6.9,15.9,86.7,52.2">In this window, you'll see a preview of how you'll appear to others in a Nanome room.</UiItem>
<UiItem icon="microphone" name="Mute Button and Voice Indicator" area="6.9,69.1,44.3,12.7">Ability to see your microphone levels at a glance, and mute your microphone while in the lobby.</UiItem>
<UiItem name="Change Avatar" area="52.8,67.9,40.5,7.8">Ability to change how you appear to yourself and others in a Nanome room.</UiItem>
</UiList>

To check Mixed Reality compatibility, check out our [Hardware Matrix](/help/choosinghardware-classic).

</ShotRow>
