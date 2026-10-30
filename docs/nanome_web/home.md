---
title: Home, Workspaces & Projects
---

# Home, Workspaces & Projects

Signing in to [app.nanome.ai](https://app.nanome.ai) opens the Home page. It lists recently opened workspaces and projects, and the left sidebar switches between three views: **Recent**, **All Workspaces** and **All Projects**.

A **project** is a folder of workspaces with its own members. A **workspace** is the shared 3D document that holds structures, scenes, comments and permissions. Every workspace belongs to one project.

<ScreenMap src="nanome-web/home-recent.webp" alt="The Home page with recent workspaces and projects" label="Home page">
<MapCard icon="home" title="Top bar" href="#top-bar" side="top" area="0.0,0.0,100.0,15.0">Navigation, search and your account, on every page.</MapCard>
<MapCard icon="cube-3d-sphere" title="Join via Code" href="#join-via-code" side="top" area="82.3,19.8,9.3,8.8">Opens a workspace from its code.</MapCard>
<MapCard icon="plus" title="New" href="#new" side="left" area="0.9,18.0,10.9,8.8">Creates a workspace or a project.</MapCard>
<MapCard icon="clock" title="Recent" href="#recent" side="left" area="0.0,33.3,12.8,10.9">The workspaces and projects you opened last.</MapCard>
<MapCard icon="cube-3d-sphere" title="All Workspaces" href="#workspaces" side="left" area="0.0,44.4,12.8,9.9">Every workspace you can open, and the workspace menu.</MapCard>
<MapCard icon="folder" title="All Projects" href="#projects" side="left" area="0.0,54.7,12.8,10.0">Every project, its members and its activity.</MapCard>
</ScreenMap>

## <AppIcon name="clock" /> Recent {#recent}

- **Recent Workspaces** lists the workspaces you opened most recently, with their project, owner, the date you last opened them, and your access level (Owner, Editor or Viewer).
- **Recent Projects** lists projects the same way, with a count of the workspaces in each.

The two buttons at the top right switch between a grid of cards and a list.

### <AppIcon name="cube-3d-sphere" /> Join via Code {#join-via-code}

<ShotRow src="nanome-web/join-via-code.webp" alt="The Join via Code box">

**Join via Code** opens a box for a workspace code in the form `XXXX-XXXX`. The workspace host can read the code from the **Users** tab of the workspace.

</ShotRow>

## <AppIcon name="cube-3d-sphere" /> Workspaces {#workspaces}

The **All Workspaces** view lists every workspace you can open.

<ShotRow src="nanome-web/workspaces-filter.webp" alt="The workspace filter menu">

<UiList label="All Workspaces toolbar">
<UiItem icon="search" name="Search" area="12.5,5.3,5.7,20.8">Searches the workspace list.</UiItem>
<UiItem icon="cube-3d-sphere" name="Join via Code" href="#join-via-code" area="18.8,5.3,22.0,20.8">Opens a workspace from its code.</UiItem>
<UiItem icon="filter" name="Filter" area="41.4,5.0,17.7,21.4">All, My Workspaces (ones you own), or Shared with me.</UiItem>
<UiItem icon="arrows-sort" name="Sort" area="59.7,5.3,20.2,20.8">By Name or by Date.</UiItem>
<UiItem name="Grid / List" area="80.5,5.3,15.5,20.8">Switches between a grid of cards and a list.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="nanome-web/workspaces-row-menu.webp" alt="A workspace row's menu">

Right-clicking a workspace row, or clicking its <AppIcon name="dots" /> **(...)** button, opens the same menu that sits in the header of an open workspace:

<UiList label="Workspace menu">
<UiItem name="Open in new tab" area="63.8,21.0,31.5,8.5">Opens the workspace in a new browser tab.</UiItem>
<UiItem name="Edit info" area="63.8,30.1,31.5,8.5">Changes the workspace name and description.</UiItem>
<UiItem name="Copy shareable link" area="63.8,39.3,31.5,8.5">Copies a link to the workspace.</UiItem>
<UiItem name="Duplicate" area="63.8,48.6,31.5,8.5">Makes a copy of the workspace.</UiItem>
<UiItem name="Open in XR" area="63.8,57.9,31.5,8.5">Sends the workspace to Nanome XR on your headset, which asks whether to load it just for you or for everyone in your current session.</UiItem>
<UiItem name="Move to project" area="63.8,67.2,31.5,8.5">Moves the workspace into another project.</UiItem>
<UiItem name="Export analysis" area="63.8,76.5,31.5,8.5">A ZIP of CSV files: chemical interactions, measurements and minimization history. Works from an open workspace's menu; grayed out in the list.</UiItem>
<UiItem name="Delete" area="63.8,85.8,31.5,8.5">Deletes the workspace.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="folder" /> Projects {#projects}

<ShotRow src="nanome-web/projects-row-menu.webp" alt="A project row's menu">

The **All Projects** view lists projects with their workspace count, owner, last update and your access level. It has the same search, filter, sort and layout controls as the All Workspaces view.

The row menu has **Open in new tab**, **Edit info**, **Manage members** and **Delete**.

</ShotRow>

### Project page

<ShotRow src="nanome-web/project-members.webp" alt="A project's Members tab and Activity feed">

<UiList label="Project page">
<UiItem name="Description, Focus, Lead" area="1.0,18.5,72.9,19.0">The fields across the top.</UiItem>
<UiItem name="Activity" area="74.2,18.4,24.2,81.5">A feed on the right that records when workspaces in the project are created and edited.</UiItem>
<UiItem name="Move Workspaces" area="86.6,4.7,11.7,11.0">Moves workspaces in or out of the project.</UiItem>
<UiItem name="Workspaces" area="1.2,41.2,8.6,12.8">A tab that lists the project's workspaces.</UiItem>
<UiItem name="Members" area="10.0,41.2,7.4,12.8">A tab that adds people by email as Editor or Viewer and lists current members with their role.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="plus" /> New {#new}

<ShotRow src="nanome-web/new-menu.webp" alt="The New menu">

The **New** button at the top of the sidebar creates a **Workspace** or a **Project**.

</ShotRow>

## <AppIcon name="home" /> Top bar {#top-bar}

The top bar is the same on every page.

<ShotRow src="nanome-web/search.webp" alt="Search results for 4ceo">

<UiList label="Top bar">
<UiItem name="Home">Returns to this page.</UiItem>
<UiItem name="Workspace">Returns to your open workspace tabs.</UiItem>
<UiItem name="Conversations" href="/mara/conversations">MARA chats, plus the comment threads and mentions from your workspaces.</UiItem>
<UiItem name="Tools" href="/mara/tools">MARA's tools, integrations, workflows and knowledge.</UiItem>
<UiItem icon="infinity" name="Credits">Your account's credit balance. It can be hidden in Settings.</UiItem>
<UiItem icon="search" name="Search (⌘K)" area="1.7,5.1,96.7,25.9">Searches by name. Workspace results show the project, owner and last-opened date.</UiItem>
<UiItem icon="cube-3d-sphere" name="Join Workspace via Code">Opens a workspace from its 8-character code, on pages without their own Join via Code button.</UiItem>
<UiItem icon="lock-cog" name="Login via Device Code" href="/nanome_web/account#login-via-device-code">Signs a headset in to your account.</UiItem>
<UiItem name="Account menu" href="/nanome_web/account">Your initial: account, billing, organization and settings pages, plus Logout and the web app version.</UiItem>
</UiList>

</ShotRow>

## Account limits

Free licenses are limited to 1 owned project, 3 owned workspaces and 5 structures per workspace, with view-only access to workspaces and projects that others share. Nanome Web shows a message when a limit is reached. Paid plans are on [Account Tiers](/home.nanome.ai/accounttiers).
