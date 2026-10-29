---
title: Users & Sharing
---

# Users & Sharing

The **Users** tab of a workspace controls who can open it and what they can change. It also sends the workspace to colleagues in Nanome XR.

<IconGrid label="Users tab" :cols="3">
<IconCard icon="cube-3d-sphere" title="Join via Code" href="#join-via-code">The workspace code and Copy link.</IconCard>
<IconCard icon="link" title="Link access" href="#link-access">What opening the code or link allows.</IconCard>
<IconCard icon="user-plus" title="Adding people" href="#adding-people">Invite by email as Viewer or Editor.</IconCard>
<IconCard icon="device-vision-pro" title="Sending to a headset" href="#sending-a-workspace-to-a-headset">Open in XR and Queue for All.</IconCard>
<IconCard icon="crown" title="Following from the web" href="#following-from-the-web">Track what someone in Nanome XR sees.</IconCard>
</IconGrid>

<vimg src="nanome-web/users-tab.webp" alt="The Users tab" />

## <AppIcon name="cube-3d-sphere" /> Join via Code {#join-via-code}

Every workspace has an 8-character code, shown at the top of the tab in the form `XXXX-XXXX`. Anyone with access can type the code into **Join via Code** in Nanome Web, or into the **Workspaces** tab in Nanome XR.

<UiList label="Workspace code">
<UiItem icon="link" name="Copy link">Copies a link to the workspace, instead of the code.</UiItem>
</UiList>

## <AppIcon name="link" /> Link access {#link-access}

**Link access** sets what happens when someone opens the workspace's code or link:

<UiList label="Link access">
<UiItem name="Members only">Only people added to the workspace can open it.</UiItem>
<UiItem name="Anyone can view">Anyone with the code or link can open it as a Viewer.</UiItem>
<UiItem name="Anyone can edit">Anyone with the code or link can open it as an Editor.</UiItem>
<UiItem name="Public workspace">Allow anonymous viewers. Lets people open the workspace without signing in.</UiItem>
</UiList>

<vimg src="nanome-web/users-link-access.webp" alt="Link access levels in the Users tab" />

<Callout type="warning" title="Check sharing before adding unpublished data">

**Anyone can view** together with **Public workspace** makes the workspace readable by anyone who has its code or link, with no sign-in. **Members only** limits a workspace that holds proprietary structures to the people added to it.

</Callout>

## <AppIcon name="user-plus" /> Adding people {#adding-people}

<UiList label="Adding people">
<UiItem name="Workspace">The tab under the sharing settings: the people added to this workspace and their role.</UiItem>
<UiItem name="Add people by email">Takes an email address. It has to match their Nanome account exactly.</UiItem>
<UiItem name="Viewer / Editor">The role menu beside the address.</UiItem>
<UiItem name="+ Add">Invites them.</UiItem>
<UiItem name="My Org">The tab that lists colleagues in your organization.</UiItem>
</UiList>

<vimg src="nanome-web/users-invite-role.webp" alt="Inviting a person by email with a role" />

Roles:

- **Owner**: the workspace's owner.
- **Editor**: can change the workspace.
- **Viewer**: can open the workspace and look around without changing it.

## <AppIcon name="device-vision-pro" /> Sending a workspace to a headset {#sending-a-workspace-to-a-headset}

<UiList label="Sending to Nanome XR">
<UiItem icon="device-vision-pro" name="Open in XR">In the workspace header: sends the workspace to Nanome XR on your headset.</UiItem>
<UiItem icon="device-vision-pro" name="Queue for All">At the bottom of the Users tab: also queues the workspace for Nanome XR.</UiItem>
</UiList>

After **Open in XR**, Nanome XR shows a **Load from Web** prompt that asks whether to load it <Btn icon="user">Just Me</Btn> or <Btn icon="users">Load for All</Btn>, which brings everyone in your current session along.

## <AppIcon name="crown" /> Following from the web {#following-from-the-web}

Nanome Web can follow someone in Nanome XR, so the browser view tracks what they're looking at.

<Accordion title="What following shows" teaser="The leader's tool and edits, chains of followers, and no start-up delay.">

Since release 2.7, following also shows the leader's current tool, what they hover and select, and their edits as they make them. Following someone who is following another person leads to the person at the end of the chain. Web viewers start following straight away, without the earlier 6-second delay.

</Accordion>

### Video: Invite Users & Follow from the Web

<YoutubeEmbed videoId="6v7xlQNzzoY" title="Nanome v2.5 Quick Tips: Invite Users & Follow from the Web" />

The tutorial was recorded in v2.5. It covers setting a collaborator to Viewer or Editor, adding specific people to a workspace by email, and following: locking the web view to what an XR user sees, for example while they zoom in to a metal-residue bond or move through a binding site.
