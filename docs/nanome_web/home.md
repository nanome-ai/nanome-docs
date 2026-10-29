---
title: Home, Workspaces & Projects
---

# Home, Workspaces & Projects

Signing in to [app.nanome.ai](https://app.nanome.ai) opens the Home page. It lists recently opened workspaces and projects, and the left sidebar switches between three views: **Recent**, **All Workspaces** and **All Projects**.

A **project** is a folder of workspaces with its own members. A **workspace** is the shared 3D document that holds structures, scenes, comments and permissions. Every workspace belongs to one project.

<vimg src="nanome-web/home-recent.webp" alt="The Home page with recent workspaces and projects" />

## Top bar

The top bar is the same on every page.

- **Home**: returns to this page.
- **Workspace**: returns to your open workspace tabs.
- **Conversations** and **Tools**: MARA chat and tools. See the [MARA section](/mara/overview).
- **Credits**: your account's credit balance. It can be hidden in [Settings](/nanome_web/account#settings).
- **Search (⌘K)**: searches by name. Workspace results show the project, owner and last-opened date.
- **Join Workspace via Code**: opens a workspace from its 8-character code. It sits in the top bar on pages that don't have their own **Join via Code** button.
- **Login via Device Code**: signs a headset in to your account. See [Account & Settings](/nanome_web/account#login-via-device-code).
- **Account menu** (your initial): account, billing, organization and settings pages, plus **Logout** and the web app version.

<vimg src="nanome-web/search.webp" alt="Search results for 4ceo" />

## New

The **+ New** button at the top of the sidebar creates a **Workspace** or a **Project**.

<vimg src="nanome-web/new-menu.webp" alt="The New menu" />

## Recent

**Recent Workspaces** lists the workspaces you opened most recently, with their project, owner, the date you last opened them, and your access level (Owner, Editor or Viewer). **Recent Projects** lists projects the same way, with a count of the workspaces in each.

The two buttons at the top right switch between a grid of cards and a list.

### Join via Code

**Join via Code** opens a box for a workspace code in the form `XXXX-XXXX`. The workspace host can read the code from the [Users tab](/nanome_web/collaboration#join-via-code) of the workspace.

<vimg src="nanome-web/join-via-code.webp" alt="The Join via Code box" />

## Workspaces

The **All Workspaces** view lists every workspace you can open. The toolbar has a search button, **Join via Code**, a filter, a sort order and the grid or list switch.

- **Filter**: All, My Workspaces (ones you own), or Shared with me.
- **Sort**: by Name or by Date.

<vimg src="nanome-web/workspaces-filter.webp" alt="The workspace filter menu" />

Right-clicking a workspace row, or clicking its **(...)** button, opens the same menu that sits in the header of an open workspace:

- **Open in new tab**: opens the workspace in a new browser tab.
- **Edit info**: changes the workspace name and description.
- **Copy shareable link**: copies a link to the workspace.
- **Duplicate**: makes a copy of the workspace.
- **Open in XR**: sends the workspace to Nanome XR on your headset. The headset asks whether to load it just for you or for everyone in your current session.
- **Move to project**: moves the workspace into another project.
- **Export analysis**: downloads the workspace's chemical interactions, measurements and minimization history as a ZIP of CSV files. It works from the menu of an open workspace, and is grayed out in the list.
- **Delete**: deletes the workspace.

<vimg src="nanome-web/workspaces-row-menu.webp" alt="A workspace row's menu" />

## Projects

The **All Projects** view lists projects with their workspace count, owner, last update and your access level. It has the same search, filter, sort and layout controls as the All Workspaces view.

The row menu has **Open in new tab**, **Edit info**, **Manage members** and **Delete**.

<vimg src="nanome-web/projects-row-menu.webp" alt="A project row's menu" />

### Project page

Opening a project shows its **Description**, **Focus** and **Lead** fields across the top, and an **Activity** feed on the right that records when workspaces in the project are created and edited. **Move Workspaces** moves workspaces in or out of the project.

The **Workspaces** tab lists the project's workspaces. The **Members** tab adds people by email as Editor or Viewer and lists current members with their role.

<vimg src="nanome-web/project-members.webp" alt="A project's Members tab and Activity feed" />

## Account limits

Free licenses are limited to 1 owned project, 3 owned workspaces and 5 structures per workspace, with view-only access to workspaces and projects that others share. Nanome Web shows a message when a limit is reached. See [Account Tiers](/home.nanome.ai/accounttiers) for paid plans.
