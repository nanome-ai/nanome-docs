---
title: Home, Workspaces & Projects
---

# Home, Workspaces & Projects

Signing in to [app.nanome.ai](https://app.nanome.ai) opens the Home page. It lists recently opened workspaces and projects, and the left sidebar switches between three views: **Recent**, **All Workspaces** and **All Projects**.

A **project** is a folder of workspaces with its own members. A **workspace** is the shared 3D document that holds structures, scenes, comments and permissions. Every workspace belongs to one project.

<IconGrid label="Home page" :cols="3">
<IconCard icon="clock" title="Recent" href="#recent">The workspaces and projects you opened last.</IconCard>
<IconCard icon="cube-3d-sphere" title="Join via Code" href="#join-via-code">Opens a workspace from its code.</IconCard>
<IconCard icon="cube-3d-sphere" title="All Workspaces" href="#workspaces">Every workspace you can open, and the workspace menu.</IconCard>
<IconCard icon="folder" title="All Projects" href="#projects">Every project, its members and its activity.</IconCard>
<IconCard icon="plus" title="New" href="#new">Creates a workspace or a project.</IconCard>
<IconCard icon="home" title="Top bar" href="#top-bar">Navigation, search and your account, on every page.</IconCard>
</IconGrid>

<vimg src="nanome-web/home-recent.webp" alt="The Home page with recent workspaces and projects" />

## <AppIcon name="clock" /> Recent {#recent}

- **Recent Workspaces** lists the workspaces you opened most recently, with their project, owner, the date you last opened them, and your access level (Owner, Editor or Viewer).
- **Recent Projects** lists projects the same way, with a count of the workspaces in each.

The two buttons at the top right switch between a grid of cards and a list.

### <AppIcon name="cube-3d-sphere" /> Join via Code {#join-via-code}

**Join via Code** opens a box for a workspace code in the form `XXXX-XXXX`. The workspace host can read the code from the **Users** tab of the workspace.

<vimg src="nanome-web/join-via-code.webp" alt="The Join via Code box" />

## <AppIcon name="cube-3d-sphere" /> Workspaces {#workspaces}

The **All Workspaces** view lists every workspace you can open.

<UiList label="All Workspaces toolbar">
<UiItem icon="search" name="Search"></UiItem>
<UiItem icon="cube-3d-sphere" name="Join via Code" href="#join-via-code">Opens a workspace from its code.</UiItem>
<UiItem icon="filter" name="Filter">All, My Workspaces (ones you own), or Shared with me.</UiItem>
<UiItem icon="arrows-sort" name="Sort">By Name or by Date.</UiItem>
<UiItem name="Grid / List">Switches between a grid of cards and a list.</UiItem>
</UiList>

<vimg src="nanome-web/workspaces-filter.webp" alt="The workspace filter menu" />

Right-clicking a workspace row, or clicking its <AppIcon name="dots" /> **(...)** button, opens the same menu that sits in the header of an open workspace:

<UiList label="Workspace menu">
<UiItem name="Open in new tab">Opens the workspace in a new browser tab.</UiItem>
<UiItem name="Edit info">Changes the workspace name and description.</UiItem>
<UiItem name="Copy shareable link">Copies a link to the workspace.</UiItem>
<UiItem name="Duplicate">Makes a copy of the workspace.</UiItem>
<UiItem name="Open in XR">Sends the workspace to Nanome XR on your headset, which asks whether to load it just for you or for everyone in your current session.</UiItem>
<UiItem name="Move to project">Moves the workspace into another project.</UiItem>
<UiItem name="Export analysis">A ZIP of CSV files: chemical interactions, measurements and minimization history. Works from an open workspace's menu; grayed out in the list.</UiItem>
<UiItem name="Delete">Deletes the workspace.</UiItem>
</UiList>

<vimg src="nanome-web/workspaces-row-menu.webp" alt="A workspace row's menu" />

## <AppIcon name="folder" /> Projects {#projects}

The **All Projects** view lists projects with their workspace count, owner, last update and your access level. It has the same search, filter, sort and layout controls as the All Workspaces view.

The row menu has **Open in new tab**, **Edit info**, **Manage members** and **Delete**.

<vimg src="nanome-web/projects-row-menu.webp" alt="A project row's menu" />

### Project page

<UiList label="Project page">
<UiItem name="Description, Focus, Lead">The fields across the top.</UiItem>
<UiItem name="Activity">A feed on the right that records when workspaces in the project are created and edited.</UiItem>
<UiItem name="Move Workspaces">Moves workspaces in or out of the project.</UiItem>
<UiItem name="Workspaces">A tab that lists the project's workspaces.</UiItem>
<UiItem name="Members">A tab that adds people by email as Editor or Viewer and lists current members with their role.</UiItem>
</UiList>

<vimg src="nanome-web/project-members.webp" alt="A project's Members tab and Activity feed" />

## <AppIcon name="plus" /> New {#new}

The **New** button at the top of the sidebar creates a **Workspace** or a **Project**.

<vimg src="nanome-web/new-menu.webp" alt="The New menu" />

## <AppIcon name="home" /> Top bar {#top-bar}

The top bar is the same on every page.

<UiList label="Top bar">
<UiItem name="Home">Returns to this page.</UiItem>
<UiItem name="Workspace">Returns to your open workspace tabs.</UiItem>
<UiItem name="Conversations / Tools" href="/mara/overview">MARA chat and tools, covered in the MARA section.</UiItem>
<UiItem icon="infinity" name="Credits">Your account's credit balance. It can be hidden in Settings.</UiItem>
<UiItem icon="search" name="Search (⌘K)">Searches by name. Workspace results show the project, owner and last-opened date.</UiItem>
<UiItem icon="cube-3d-sphere" name="Join Workspace via Code">Opens a workspace from its 8-character code, on pages without their own Join via Code button.</UiItem>
<UiItem icon="lock-cog" name="Login via Device Code" href="/nanome_web/account#login-via-device-code">Signs a headset in to your account.</UiItem>
<UiItem name="Account menu" href="/nanome_web/account">Your initial: account, billing, organization and settings pages, plus Logout and the web app version.</UiItem>
</UiList>

<vimg src="nanome-web/search.webp" alt="Search results for 4ceo" />

## Account limits

Free licenses are limited to 1 owned project, 3 owned workspaces and 5 structures per workspace, with view-only access to workspaces and projects that others share. Nanome Web shows a message when a limit is reached. Paid seats are listed on [nanome.ai/pricing](https://nanome.ai/pricing).
