---
title: Collaboration
---

# Collaboration and Managing Structures

## Component / Selection / Representation / Scenes

The following are useful details to keep in mind when collaborating with other users in the same session.

- Structures are organized into protein components with sub-selections.
- New scenes have fresh (unset) representations and require each entry to be set up.
- Duplicated scenes are identical to the scene they are derived from.


## Spotlight / Follow / Free Look

Content is oriented centrally for all users automatically. You can select another user to **follow**, which allows you to see what that user is showing. If you are being followed by other users, then you are the **spotlight**, which means those users can see your view and are on your scene. Note that Pointers point relative to the structures, so even when in free view all users see the cursors pointing at the same structural feature.

<vimg src="nanome-v2/multiuser_view.png" />

This system allows users to seamlessly interact in a multiplayer environment without a designated presenter. Users can independently manipulate, spotlight, and follow each other's perspectives, much like collaborating on a shared document or whiteboard. By stepping into a colleague's perspective and experiencing their viewpoint, you can gain a deeper understanding of their questions or insights. This immersive approach fosters a highly collaborative environment and makes it easier for teams to tackle complex molecular structures.

## Workspace / Code / Permissions

A workspace contains arrangements of structures, representations of those structures, scenes, and permissions.

<vimg src="nanome-v2/workspace_menu.png" />

### Permissions

Permissions determine what users can access content, and whether they can modify the representations of that content.

- **Viewer**: Can see structures and spotlight their view, follow others and navigate scenes; cannot edit representations, arrange structures.
- **Editor**: Can make all changes and invite others to view or edit.
- **Owner**: Same as Editor, and can delete the workspace.
- **Private**: None.

### Load for All vs. Load for Me

- **Load for All** will bring everyone in your current multiplayer session with you to the next workspace you are loading. 
    - You may be asked to designate permissions for the users with you if they do not have them already.

<vimg src="nanome-v2/need_permissions.png" />

- Users in your current session moving with you will see a progress notification letting them opt out, or go immediately. If they do nothing they will automatically join the workspace that was loaded.

<vimg src="nanome-v2/loading_workspace.png" />

- **Load for Me** will only take you there and leave the other participants in their current workspace session.
