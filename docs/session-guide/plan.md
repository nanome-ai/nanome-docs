---
title: Plan the session
---

# What to settle before anyone joins

A session runs on 3 things: how many users join, what they join from, and how
much structure is on screen. Settling those first is what separates a session
that works from one that crawls.

## Find the shape of your session

<Chooser
  param="session"
  :steps="[
    {
      id: 'size',
      label: 'How many users join at once?',
      options: [
        { id: 'small', label: '2 to 5 users', detail: 'A working review, a design discussion, or a walkthrough' },
        { id: 'group', label: 'A single group', detail: 'A training session, a team meeting, or a lab' },
        { id: 'large', label: 'More than one group', detail: 'A large cohort working through the same material' }
      ]
    },
    {
      id: 'mode',
      label: 'How do they join?',
      when: 'size',
      options: [
        { id: 'xr', label: 'All users in headsets', detail: 'One headset per user for the whole session' },
        { id: 'mixed', label: 'Headsets and browsers', detail: 'Some users in XR, the rest following along on the web' },
        { id: 'web', label: 'Mostly browsers', detail: 'A few headsets at most, the rest at app.nanome.ai' }
      ]
    }
  ]">

<ChooserResult when="size=small mode=xr" verdict="One workspace, all users as Editor.">

- A review this size fits in a single workspace, and letting every user edit keeps the discussion moving.
- Build 2 or 3 scenes ahead of time for the views the discussion keeps returning to.
- Keep the shown atom count near 2,500 so the session stays at 72 FPS or better on a Quest.

</ChooserResult>

<ChooserResult when="size=small mode=mixed" verdict="One workspace, and the web users follow.">

- Users in a browser can follow a user in XR, which keeps a review going for anyone without a headset.
- Load structures from the web app when the file is anything other than a PDB code, since XR loads by code.
- Every user can be an Editor at this size, and permissions can still be changed per user later.

</ChooserResult>

<ChooserResult when="size=small mode=web" verdict="One workspace in the browser.">

- The web app carries the same workspaces, scenes, and sharing as XR, so nothing has to be rebuilt later.
- Any user in the session can spotlight, and the rest follow, whether they are in a browser or a headset.
- Structures load from RCSB by PDB code, or by dragging a file in from a computer.

</ChooserResult>

<ChooserResult when="size=group mode=xr" verdict="One prepared workspace, the group as Viewers.">

- Set the global permission to Viewer before sharing the code. Viewers explore, spotlight, follow, and move through scenes without changing the workspace.
- Prepare the scenes first. A Viewer walking into a finished sequence needs no setup time.
- Budget the atom count for the weakest headset in the room, not the strongest.

</ChooserResult>

<ChooserResult when="size=group mode=mixed" verdict="One workspace, Viewer by default, headsets lead.">

- Users in XR drive, and users in browsers follow from app.nanome.ai with the same scenes and spotlight.
- Promote a user to Editor for the moment they need to change something, then set them back.
- Scenes keep the group together: any user can jump to a named scene instead of being walked there.

</ChooserResult>

<ChooserResult when="size=group mode=web" verdict="One workspace, and the headsets are the demo.">

- Most of the group works in the browser while 1 or 2 headsets show what the structure feels like at scale.
- The web app handles file formats that XR does not, so load anything unusual there first.
- Viewer is still the right default, since a browser tab is just as capable of rearranging a workspace.

</ChooserResult>

<ChooserResult when="size=large mode=xr" verdict="Split into groups, 1 workspace each.">

- Divide the users by the number of headsets, and give each group its own workspace built from the same material.
- Splitting contains mistakes: a change made in one group only affects that group, rather than every user at once.
- Set every group workspace to Viewer, so the prepared material survives the session.
- A coding agent can build the same workspace repeatedly from one description, which makes this practical.

</ChooserResult>

<ChooserResult when="size=large mode=mixed" verdict="Groups in XR, the rest following in a browser.">

- Build 1 workspace per headset group, then let the users without a headset follow along from the web.
- Publish the scene order ahead of time so every group covers the same ground without a live presenter.
- Keep each group small enough to hold one conversation, which is the real limit on a working session.

</ChooserResult>

<ChooserResult when="size=large mode=web" verdict="Browsers carry the session, headsets rotate through.">

- A large cohort works at app.nanome.ai, and the headsets rotate so each user gets time in XR without a queue.
- One prepared workspace per rotation keeps every user starting from the same view.
- Viewer is the default. It leaves the prepared material intact for whoever rotates in next.

</ChooserResult>

</Chooser>

## Why splitting works

A single workspace holds up while the group fits in one conversation. Past
that, split the group and give each part its own workspace built from the same
material. Splitting contains mistakes: a change one group makes stops at that
group instead of landing in front of every user at once.

It also keeps each session light. A workspace carrying the whole cohort is
doing more work than several smaller ones, and the headsets feel it first.

<Callout type="note">

Prepared material is what makes a session start on time. The workspace, its
scenes, and its permissions are all easier to set before anyone joins than
during a live session.

</Callout>
