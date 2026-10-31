---
title: Users & Sharing
---

# Users & Sharing

The **Users** tab of a workspace controls who can open it and what they can change. It also sends the workspace to colleagues in Nanome XR. In the 3D view, Nanome Web shows other people's pointers and can follow someone's view.

<ScreenMap src="nanome-web/users-tab.webp" alt="The Users tab" label="Users tab">
<MapCard icon="device-vision-pro" title="Open in XR" href="#sending-a-workspace-to-a-headset" side="top" area="82.5,4.2,4.3,2.5">Sends the workspace to your headset.</MapCard>
<MapCard icon="cube-3d-sphere" title="Join via Code" href="#join-via-code" side="right" area="2.5,29.9,95,8.6">The workspace code and Copy link.</MapCard>
<MapCard icon="link" title="Link access" href="#link-access" side="right" area="2.5,38.9,95,13.1">What opening the code or link allows.</MapCard>
<MapCard icon="user-plus" title="Adding people" href="#adding-people" side="right" area="2.5,54.1,95,21">Invite by email as Viewer or Editor.</MapCard>
<MapCard icon="share" title="Roles" href="#roles" side="right" area="85.4,70.5,12.0,4.4">Owner, Editor, Viewer or None, and what each can do.</MapCard>
<MapCard icon="device-vision-pro" title="Queue for All" href="#sending-a-workspace-to-a-headset" side="bottom" area="2.5,92.3,27.4,5.8">Queues the workspace for Nanome XR.</MapCard>
</ScreenMap>

## <AppIcon name="share" /> Roles {#roles}

A role sets what someone can do in a workspace. The Users tab shows each person's role beside their address, and the Home page lists yours in the **Access** column.

<UiList label="Roles">
<UiItem icon="crown" name="Owner">The person who creates a workspace becomes its Owner. Each workspace has 1 Owner, who can do everything an Editor can and can't be removed from it.</UiItem>
<UiItem name="Editor">Can change the workspace.</UiItem>
<UiItem name="Viewer">Can open the workspace and look around without changing it.</UiItem>
<UiItem name="None">No access. Someone who isn't a member of the workspace or its project has None while Link access is Members only and Public workspace is off.</UiItem>
</UiList>

On a free license, workspaces that others own open with Viewer access, even for someone added as an Editor. The other limits are under [Account limits](/nanome_web/home#account-limits).

<Accordion title="Where a role comes from" teaser="The workspace, its project, link access and public access. The highest one applies.">

Someone can have access to a workspace in more than one way, and Nanome gives them the highest of these roles:

- **Added to the workspace**: the role chosen when they were added.
- **Added to the workspace's project**: their project role, up to Editor. Project members are set on the project's [Members tab](/nanome_web/home#projects).
- **Link access**: Viewer with **Anyone can view**, or Editor with **Anyone can edit**, for anyone signed in.
- **Public workspace**: Viewer for anyone, signed in or not.

</Accordion>

## <AppIcon name="cube-3d-sphere" /> Join via Code {#join-via-code}

Every workspace has an 8-character code, shown at the top of the tab in the form `XXXX-XXXX`. Anyone with access can type the code into **Join via Code** in Nanome Web, or into the **Workspaces** tab in Nanome XR.

<UiList label="Workspace code">
<UiItem icon="link" name="Copy link">Copies a link to the workspace, instead of the code.</UiItem>
</UiList>

## <AppIcon name="link" /> Link access {#link-access}

<ShotRow src="nanome-web/users-link-access.webp" alt="Link access levels in the Users tab">

**Link access** sets what happens when someone opens the workspace's code or link:

<UiList label="Link access">
<UiItem name="Members only" area="63.3,42,33.3,15.1">Only people added to the workspace, or to its project, can open it.</UiItem>
<UiItem name="Anyone can view" area="63.3,57.5,33.3,15.1">Anyone signed in who has the code or link can open it as a Viewer.</UiItem>
<UiItem name="Anyone can edit" area="63.3,72.9,33.3,15.3">Anyone signed in who has the code or link can open it as an Editor.</UiItem>
<UiItem name="Public workspace" area="2.6,45.1,31.8,14.5">Allow anonymous viewers. Lets anyone with the code or link open the workspace as a Viewer, with or without signing in.</UiItem>
</UiList>

</ShotRow>

**Link access** is the same setting as the global permission level in the [Share dialog](/nanome_v2/mainpanel#share) in Nanome XR. There, None matches **Members only**, Viewer matches **Anyone can view** and Editor matches **Anyone can edit**.

<Callout type="warning" title="Check sharing before adding unpublished data">

**Public workspace** makes the workspace readable by anyone who has its code or link, with no sign-in, whatever **Link access** is set to. A workspace that holds proprietary structures stays limited to its members with **Public workspace** off and **Link access** on **Members only**.

</Callout>

## <AppIcon name="user-plus" /> Adding people {#adding-people}

<ShotRow src="nanome-web/users-invite-role.webp" alt="Inviting a person by email with a role">

<UiList label="Adding people">
<UiItem name="Workspace" area="2.6,3.3,21.7,20.5">The tab under the sharing settings: the people added to this workspace and their role.</UiItem>
<UiItem name="My Org" area="24.7,3.3,15.1,20.5">The tab that lists colleagues in your organization.</UiItem>
<UiItem name="Add people by email" area="2.6,28.8,57.7,18.1">Takes an email address. It has to match their Nanome account exactly.</UiItem>
<UiItem name="Viewer / Editor" href="#roles" area="60.9,28.8,23.5,59">The role menu beside the address.</UiItem>
<UiItem name="+ Add" area="84.6,28.6,12.9,18.3">Invites them.</UiItem>
<UiItem name="Person" area="4.1,55.5,32.0,10.5">Someone added to the workspace, by their email address.</UiItem>
<UiItem name="Role" href="#roles" area="85.4,54.3,12.0,13.3">Their role. Here it's Owner, the role the workspace's creator gets.</UiItem>
</UiList>

</ShotRow>

People added to the workspace's project already have their project role in the workspace, up to Editor. Adding them here as well gives them the higher of the 2 roles.

## <AppIcon name="device-vision-pro" /> Sending a workspace to a headset {#sending-a-workspace-to-a-headset}

<UiList label="Sending to Nanome XR">
<UiItem icon="device-vision-pro" name="Open in XR">In the workspace header: sends the workspace to Nanome XR on your headset.</UiItem>
<UiItem icon="device-vision-pro" name="Queue for All">At the bottom of the Users tab: also queues the workspace for Nanome XR.</UiItem>
</UiList>

**Open in XR** goes to Nanome XR signed in to your own Nanome account. A headset signs in to your account with [Login via Device Code](/nanome_web/account#login-via-device-code). What happens next depends on the headset:

- **Alone in its session**: Nanome XR opens the workspace straight away.
- **With other people in the session**: a **Load from Web** prompt asks whether to load it <Btn icon="user">Just Me</Btn> or <Btn icon="users">Load for All</Btn>, which brings everyone in your current session along.
- **Closed or signed out**: Nanome XR opens the workspace the next time it signs in, in place of the last workspace you had open.

When the workspace is already open in the headset, nothing changes. **Load for All** can first offer to add people who don't have access as Viewers or Editors, as described under [Load for All vs. Load](/nanome_v2/collaboration#load-for-all-vs-load-for-me).

## <AppIcon name="droplet" /> Pointers {#pointers}

The 3D view shows the pointers of people in Nanome XR, so a colleague in the browser can see what they point at.

- A pointer sits on the same part of the structure for everyone, in its owner's color.
- Only people in the same scene as you show a pointer.
- Pointers have no name tags in Nanome Web, and Nanome Web doesn't show avatars.
- When you follow someone, their pointer also shows the tool they're using.

## <AppIcon name="crown" /> Following from the web {#following-from-the-web}

Nanome Web can follow someone in Nanome XR, so the browser view tracks what they're looking at.

- Following moves Nanome Web to the leader's scene, and to each scene they move to after that.
- Dragging still rotates or pans the view. When you let go, the view eases back to the leader's.
- Following stops when the leader leaves the workspace.

When someone starts a spotlight, Nanome Web follows them straight away. A headset first shows a prompt for about 6 seconds. People who open the workspace during a spotlight follow it too, and its followers stop following when it ends. The headset's controls are under [Spotlight Mode](/nanome_v2/scenespanel#spotlight-mode).

<Accordion title="What following shows" teaser="The leader's tool and edits, and chains of followers.">

Since release 2.7, following also shows the leader's current tool, what they hover and select, and their edits as they make them. Following someone who is following another person leads to the person at the end of the chain. If the chain leads back to you, following stops. If the person you picked leaves, you keep following the person at the end of their chain.

</Accordion>

<Accordion title="How the view tracks the leader" teaser="It moves when the leader turns or steps far enough, then eases into place.">

Following keeps the structures where they sit in the leader's view. To keep the browser view steady, it doesn't copy every small head movement. The view moves once the leader has turned or stepped noticeably and their head has come to rest, then eases to the new view. Head movement while the leader looks at a menu doesn't move the view.

</Accordion>

### Video: Invite Users & Follow from the Web

<YoutubeEmbed videoId="6v7xlQNzzoY" title="Nanome v2.5 Quick Tips: Invite Users & Follow from the Web" />

The tutorial was recorded in v2.5. It covers setting a collaborator to Viewer or Editor, adding specific people to a workspace by email, and following: locking the web view to what an XR user sees, for example while they zoom in to a metal-residue bond or move through a binding site.
