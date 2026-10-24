---
title: Collaboration
---

# Collaboration and Managing Structures

## Component / Selection / Representation / Scenes

A few details matter when several people work in the same session:

- Structures are organized into entries and components. See the [Components Tab](/nanome_v2/mainpanel#components-tab).
- New scenes start with fresh, unset representations, so each entry needs setting up. See the [Scenes Panel](/nanome_v2/scenespanel).
- A duplicated scene is identical to the scene it came from.
- **Share selection**, in the [Selection Tool](/nanome_v2/toolspanel#selection-tool), shows your selection to the others in your color.

## Spotlight / Follow / Free Look

Content is oriented centrally for everyone. Following another person shows what they're showing. When others follow you, you're the **spotlight**: they see your view and your scene. The controls are under [Spotlight Mode](/nanome_v2/scenespanel#spotlight-mode). Pointers point relative to the structures, so even in free view everyone sees a pointer on the same structural feature.

Since release 2.7, followers see the leader's current tool and mode, what they hover and select, and their edits as they happen, including ligand building, torsion changes and rotamers. A follow chain leads to the person at the end of it.

<vimg src="nanome-v2/multiuser_view.png" />

Nobody has to be the designated presenter. People can move structures, spotlight and follow each other freely, much like editing a shared document. Stepping into a colleague's view shows exactly what they're asking about.

## Workspace / Code / Permissions

A workspace holds the structures, their representations, scenes, comments and permissions. Workspaces are managed from the [Workspaces Tab](/nanome_v2/mainpanel#workspaces-tab) and in [Nanome Web](/nanome_web/home).

### Permissions

Permissions decide who can open a workspace and who can change it. They're set with the **Share** button in the [Users Tab](/nanome_v2/mainpanel#share) or the left sidebar.

- **Viewer**: can look around, select, point, comment, follow, spotlight their own view and move between scenes. Viewers can't measure, edit structures or representations, or use the Interactions, Builder, Torsion, Residue Editor or MARA tools.
- **Editor**: can make every change and invite others to view or edit.
- **Owner**: the same as Editor, and can delete the workspace.
- **None**: the global level for a private workspace. Only people added by email can open it.

A free license has Viewer access to workspaces that others own.

### Invitations and join requests

The **(+)** button beside a colleague in **Users in organization** invites them. They see **Join Workspace?** with **Refuse** or **Accept**. **Join** goes the other way: it takes you to a colleague's workspace, and when you don't have access it sends a join request that the owner can accept as Viewer or Editor, or deny.

### Load for All vs. Load for Me

- **Load for All** brings everyone in your current session with you to the next workspace.
  - When some of them don't have access, a **Need Permissions** prompt reads "Some users cannot access the workspace" and offers to add them as **Viewers** or **Editors**, or **Cancel**.

- People moving with you see a **Loading Workspace** notice, "[User] is moving all to [Workspace]", with **Cancel** to stay behind or **Go Now** to go straight away. If they do nothing, they join the new workspace.

- **Load** takes only you, and leaves the others in their current workspace.

A workspace sent from Nanome Web with **Open in XR** arrives as a **Load from Web** prompt with **Just Me** or **Load for All**.
