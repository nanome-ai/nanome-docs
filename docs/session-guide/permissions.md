---
title: Permissions
---

# Deciding who can change what

Permissions are set per workspace, before anyone joins. A Viewer can explore,
spotlight, follow, and move through scenes. An Editor can change the workspace
itself.

<Callout type="tip">

**Set the level before the code goes out.** A workspace's global permission
applies to anyone who joins with the code, so deciding it first is what keeps
prepared material intact.

</Callout>

## The four levels

<CardGrid :cols="2">

<Card title="Viewer">

Sees structures, spotlights their own view, follows others, and moves through
scenes. Cannot edit representations or arrange structures.

</Card>

<Card title="Editor">

Makes all changes, and invites others to view or edit.

</Card>

<Card title="Owner">

Everything an Editor can do, plus deleting the workspace.

</Card>

<Card title="None">

No access. The setting for a workspace that should stay private while it is
being built.

</Card>

</CardGrid>

## Setting them

<vimg src="nanome-v2/users-tab-permissions-dialog.jpg" />

*Users tab > Permissions. See [Main Panel](/nanome_v2/mainpanel).*

<Steps>

1. Open the **Users** tab and choose **Permissions**. The dialog shows the
   workspace code and the global level.
2. Set the global level to **Viewer** for a prepared workspace, or **None** to
   close it entirely.
3. Add named users by email with their own level. The address has to match
   exactly, since the field has no autocomplete.
4. Change one user later from the **(...)** menu next to their name, which
   offers **Make Editor** and **Remove User**.

</Steps>

<Callout type="note">

Give each group its own workspace when they need to change things. Prepared
material stays as it was, and a change one group makes stops at that group
instead of reaching every user in the session.

</Callout>
