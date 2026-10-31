---
title: Collaboration
---

# Collaboration and Managing Structures

A workspace holds the structures, their representations, scenes, comments and permissions, and several people can work in it at once. Workspaces are managed from the Workspaces tab of the Main Panel and in Nanome Web.

<IconGrid label="Working together">
<IconCard icon="share" title="Permissions" href="#permissions">Viewer, Editor, Owner or None.</IconCard>
<IconCard icon="users-group" title="Invitations and join requests" href="#invitations-and-join-requests">Invite a colleague in, or ask to join them.</IconCard>
<IconCard icon="layout-grid" title="Load for All vs. Load" href="#load-for-all-vs-load-for-me">Move everyone to the next workspace, or just you.</IconCard>
<IconCard icon="crown" title="Spotlight and follow" href="#spotlight-and-follow">Show your view, or step into someone else's.</IconCard>
<IconCard icon="hierarchy" title="Structures and scenes" href="#structures-and-scenes">What to know when several people share a session.</IconCard>
</IconGrid>

## <AppIcon name="share" /> Permissions {#permissions}

Permissions decide who can open a workspace and who can change it. They're set with <Btn icon="share">Share</Btn> in the [Users tab](/nanome_v2/mainpanel#share) or the left sidebar.

<ShotRow src="nanome-v2/v2-7/users-tab-share-dialog.webp" alt="The Share dialog with the workspace code and the people with access" crop="8.0,18.6,84.3,63.1">

<UiList label="Permission levels">
<UiItem name="Viewer" area="55.7,31.5,19.4,6.4">Chosen from the same menu as Editor. Can look around, select, point, comment, follow, spotlight their own view and move between scenes.</UiItem>
<UiItem name="Editor" area="55.7,31.5,19.4,6.4">Can make every change and invite others to view or edit.</UiItem>
<UiItem name="Owner" area="58.0,55.0,9.6,4.0">The same as Editor, and can delete the workspace.</UiItem>
<UiItem name="None" area="68.5,22.9,19.4,6.3">The global level for a private workspace. Only people added by email can open it.</UiItem>
</UiList>

</ShotRow>

<Callout type="note" title="What Viewers can't do">

Viewers can't measure, edit structures or representations, or use the Interactions, Builder, Torsion, Residue Editor or MARA tools. A free license has Viewer access to workspaces that others own.

</Callout>

## <AppIcon name="users-group" /> Invitations and join requests {#invitations-and-join-requests}

Both start from **Users in organization**, in the Users tab.

<UiList label="Invitations and join requests">
<UiItem icon="plus" name="Invite">Beside a colleague: invites them to your workspace.</UiItem>
<UiItem icon="login" name="Join">Takes you to the colleague's workspace. Without access, it sends the colleague a join request. Join is off when the colleague has less than Editor access there.</UiItem>
</UiList>

An invited colleague sees **Join Workspace?** with <Btn icon="x">Refuse</Btn> or <Btn icon="check">Accept</Btn>. The colleague can accept a join request as <Btn icon="eye">Viewer</Btn> or <Btn icon="edit">Editor</Btn>, or <Btn icon="ban">Deny</Btn> it.

## <AppIcon name="layout-grid" /> Load for All vs. Load {#load-for-all-vs-load-for-me}

<UiList label="Loading a workspace">
<UiItem icon="users-group" name="Load for All">Brings everyone in your current session with you to the next workspace.</UiItem>
<UiItem icon="user" name="Load">Takes only you, and leaves the others in their current workspace.</UiItem>
</UiList>

Three popups can appear along the way:

<Tabs :labels="['Need Permissions', 'Loading Workspace', 'Load from Web']">
<Tab>

When some people in your session don't have access, **Load for All** shows a **Need Permissions** prompt that reads "Some users cannot access the workspace". It offers to add them as <Btn icon="eye">Viewers</Btn> or <Btn icon="edit">Editors</Btn>, or <Btn icon="x">Cancel</Btn>.

</Tab>
<Tab>

People moving with you see a **Loading Workspace** notice, "[User] is moving all to [Workspace]", with <Btn icon="x">Cancel</Btn> to stay behind or <Btn icon="arrow-right">Go Now</Btn> to go straight away. If they do nothing, they join the new workspace.

</Tab>
<Tab>

A workspace sent from Nanome Web with **Open in XR** opens straight away when you're alone. With other people in your session, a **Load from Web** prompt offers <Btn icon="user">Just Me</Btn> or <Btn icon="users">Load for All</Btn>.

</Tab>
</Tabs>

## <AppIcon name="crown" /> Spotlight and follow {#spotlight-and-follow}

<ShotRow src="nanome-v2/multiuser_view.png" alt="Several people in one workspace, each seeing the shared structures">

Content is oriented centrally for everyone. Following another person shows what they're showing. When others follow you, you're the spotlight: they see your view and your scene. The controls are under [Spotlight Mode](/nanome_v2/scenespanel#spotlight-mode).

</ShotRow>

Pointers point relative to the structures, so even in free view everyone sees a pointer on the same structural feature.

Nobody has to be the designated presenter. People can move structures, spotlight and follow each other freely, much like editing a shared document. Stepping into a colleague's view shows exactly what they're asking about.

<Accordion title="Changes in 2.7" teaser="Followers see the leader's tools and edits live.">

Since release 2.7, followers see the leader's current tool and mode, what they hover and select, and their edits as they happen, including ligand building, torsion changes and rotamers. A follow chain leads to the person at the end of it.

</Accordion>

## <AppIcon name="hierarchy" /> Structures and scenes {#structures-and-scenes}

A few details matter when several people work in the same session:

- Structures are organized into entries and components, listed in the Components tab.
- New scenes start with fresh, unset representations, so each entry needs setting up.
- A duplicated scene is identical to the scene it came from.
- **Share selection**, in the Selection Tool, shows your selection to the others in your color.
