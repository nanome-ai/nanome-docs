---
title: Share the workspace
---

# Getting the group into the same workspace

A workspace reaches other users 3 ways: the workspace code, an emailed invite,
and a direct invitation to anyone in the organization who is already online.

<CardGrid :cols="3">

<Card title="The workspace code">

Every workspace has a short code. Any user who enters it joins at whatever
global level the workspace is set to, from a browser or a headset.

</Card>

<Card title="An emailed invite">

Named users get their own permission level by email address, which is how one
user edits while the rest stay Viewers.

</Card>

<Card title="Straight from the org list">

Members of the same organization who are online can be invited into the current
workspace, or joined where they already are.

</Card>

</CardGrid>

## Where the code lives

The workspace code sits at the top of the Permissions dialog in the Users tab,
next to the global permission level. It reads as 2 short blocks, like
**ZJSB-TDF6**, and stays with the workspace.

<Steps>

1. Set the global level first. A code shared while the workspace is on **None**
   lets nobody in.
2. Read the code out, paste it into a calendar invite, or send it in chat. Any
   user with the code joins at the global level.
3. In a headset, users enter it under **Join Workspace** in the Workspaces tab.
   In a browser, it goes in the same place at app.nanome.ai.

</Steps>

<vimg src="nanome-v2/users-tab-permissions-dialog.jpg" />

*The workspace code, beside the global level.*

## Named access, and pulling users in

<CardGrid :cols="2">

<Card title="Named access by email">

**Add people by email** in the Permissions dialog gives one address its own
level, Editor or Viewer, separate from whatever the code hands out. The address
has to match exactly, since the field has no autocomplete.

Named access is what to use when the workspace should stay closed to the rest of
the organization, or when one user needs to edit while the rest only watch.

</Card>

<Card title="Pulling in a user already online">

**Users in organization** lists the members currently online. The **(+)** beside
a name invites that user into the current workspace, and **Join** goes the other
way, into whichever workspace they are in.

Once a session is running, **Load for All** takes the whole group to another
workspace together, prompting for permissions where a user has none.

</Card>

</CardGrid>

<Callout type="note">

Access can be pulled back at any point. The global level can drop to **None**,
and one user can be changed or removed from the **(...)** menu beside their name
without affecting anyone else.

</Callout>
