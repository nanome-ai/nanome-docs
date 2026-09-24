---
title: Session Guide
outline: [2, 3]
---

# Running a session in Nanome

Setup is done and users can reach a workspace, in a browser or a headset. This is what to do with it: building the workspace, telling it with scenes, setting permissions, sharing it, and keeping a session comfortable once a group is in there together.

Still setting up hardware? Start with [Getting Started](/getting-started).

## Plan the session {#plan}

<p class="chapter-kicker">Step 1 of 8 · What to settle before anyone joins</p>

A session runs on 3 things: how many users join, what they join from, and how
much structure is on screen. Settling those first is what separates a session
that works from one that crawls.

### Find the shape of your session

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

### Why splitting works

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

## Build the workspace {#build}

<p class="chapter-kicker">Step 2 of 8 · Three ways to build a workspace</p>

A workspace holds structures, their representations, scenes, and permissions.
Build it in the web app, describe it to a coding agent, or assemble it in a
headset. The web app is the recommended route, and everything built there opens
anywhere else.

<YoutubeEmbed videoId="aOICs-LXoj4" title="Nanome v2.4 Quick Tips: Setting Up a New Workspace" />

### Pick a build path

<Chooser
  param="build"
  :steps="[
    {
      id: 'surface',
      label: 'Where is the workspace being built?',
      options: [
        { id: 'web', label: 'In the web app', detail: 'app.nanome.ai, in a browser', badge: 'Recommended' },
        { id: 'mcp', label: 'With a coding agent', detail: 'Describe the workspace, and the MCP server builds it' },
        { id: 'xr', label: 'In the headset', detail: 'Load structures by PDB code without leaving XR' }
      ]
    },
    {
      id: 'client',
      label: 'Which client?',
      when: 'surface=mcp',
      options: [
        { id: 'claude', label: 'Claude Code', detail: 'The client Nanome documents, with the command below' },
        { id: 'codex', label: 'Codex', detail: 'Listed in the MCP setup panel in the web app' },
        { id: 'gemini', label: 'Gemini CLI', detail: 'Listed in the MCP setup panel in the web app' }
      ]
    },
    {
      id: 'plan',
      label: 'What plan is the agent on?',
      when: 'surface=mcp',
      options: [
        { id: 'free', label: 'Free', detail: 'No subscription on the agent' },
        { id: 'entry', label: 'Paid, $20 a month', detail: 'The entry subscription on most agents' },
        { id: 'high', label: 'Paid, $100 or more a month', detail: 'The higher tiers, with room to keep going' }
      ]
    }
  ]">

<ChooserResult when="surface=web" verdict="Build it at app.nanome.ai.">

<Steps>

1. Create a project, then a workspace inside it. Projects group workspaces, and
   project details are edited in the browser.
2. Load structures by PDB code from RCSB, or drag a file in. The browser handles
   the file formats a headset can't take, and the workspace carries them into XR
   afterward.
3. Nanome splits each entry into components on its own: the protein, the waters,
   each binding site, the ligand, the pocket around it, and pocket plus ligand
   together.
4. Set a representation per component: Cartoon for the fold, Stick or Ball and
   Stick for the part under discussion, Surface where shape matters. One
   atomistic representation is active per component at a time.
5. Hide what the session doesn't need, then save the view as a scene.

</Steps>

[Open the web app](https://app.nanome.ai)

</ChooserResult>

<ChooserResult when="surface=xr" verdict="Build it without taking the headset off.">

<Steps>

1. In the Workspaces tab, choose **+ New** to start a workspace, or open one
   that already exists.
2. Load a structure by PDB code. Components appear the same way they do in the
   browser.
3. Set representations from the Components tab, hide what the view doesn't need,
   and save the result as a scene.
4. Anything that isn't a PDB code, including local files and other formats,
   loads in the browser first. The workspace then opens in the headset with
   those structures in it.

</Steps>

Building in XR suits a workspace that grows during a discussion. Material
prepared ahead of a session is usually quicker to assemble in the browser.

</ChooserResult>

<ChooserResult when="surface=mcp" verdict="Describe it, and the agent builds it.">

The Nanome MCP server carries 47 tools for projects, workspaces, scenes,
components, annotations, entries, and export. It authenticates with an existing
Nanome account, so there's no second account to create, and Nanome puts setup at
about 2 minutes.

</ChooserResult>

<ChooserResult when="surface=mcp client=claude">

<CopyBlock title="Add the server" text="claude mcp add --transport http nanome https://workspaces.nanome.ai/mcp" />

<Steps>

1. Add **-s user** to make Nanome available in every project rather than the
   current directory.
2. Authenticate with **claude mcp login nanome**, or run **/mcp** in a session
   and choose **Authenticate**.
3. Restart the client so the tools load into the session.
4. Check that **mcp__nanome__\*** tools appear. A connected status on its own
   doesn't confirm that authentication finished.

</Steps>

</ChooserResult>

<ChooserResult when="surface=mcp client=codex|gemini">

<Steps>

1. Open the MCP setup panel in the web app. It carries the exact command for
   your client alongside the other clients.
2. Run that command, then sign in when the browser opens. The same Nanome
   account applies.
3. Restart the client so the tools load into the session.
4. Ask for a structure to confirm the Nanome tools are answering.

</Steps>

[MCP setup panel](https://app.nanome.ai/mcp)

</ChooserResult>

<ChooserResult when="surface=mcp plan=free">

**Room to try it.** A free tier is usually enough to connect, load a structure,
and see what building this way feels like. Anything elaborate tends to run into
the plan's limits partway through.

</ChooserResult>

<ChooserResult when="surface=mcp plan=entry">

**Room for a session.** An entry subscription generally covers preparing the
material for a session, though a long build with a lot of back and forth can
still run it down. Worth starting early rather than an hour before.

</ChooserResult>

<ChooserResult when="surface=mcp plan=high">

**Room to keep going.** Higher tiers leave enough headroom to build repeatedly
without watching the budget, which is what a large session split into groups
tends to need.

</ChooserResult>

<ChooserResult when="surface=mcp">

Treat these as rough bands rather than limits. How much a plan covers keeps
shifting as the MCP server gets more efficient and model costs come down, so the
practical check is to build one workspace and see how far the budget goes. MCP
calls also draw on Nanome credits, listed per seat on the pricing page,
separately from whatever the agent's own plan allows.

[Nanome credits](https://nanome.ai/pricing)

**What a request looks like**

- Pull up 6OIM, KRAS G12C with sotorasib bound. Show the fold as a cartoon
  colored by secondary structure, put the drug in gold, and show me the GDP and
  the magnesium.
- Surface the whole protein semi-transparent, and color everything within 5 Å of
  the ligand so I can see the switch II pocket.
- Show me the covalent bond. Cys12 and the acrylamide warhead big, the rest of
  the ligand small. Measure the sulfur-carbon distance, the attack angle, and the
  torsion.

Nanome's own walkthrough builds a 9-scene workspace from requests like these in
about 11 minutes. Selections are stored as rules, so "within 5 Å of the ligand"
stays a live definition rather than a fixed list of atoms, and measurements
anchor to atoms instead of sitting in text.

[Open the example workspace](https://app.nanome.ai/workspaces/U8Y98TVW)
· [Claude Code plugin](https://github.com/nanome-ai/claude-code-nanome-plugin)

</ChooserResult>

</Chooser>

### More on building

<YoutubeEmbed videoId="Mw3oZhPD14k" title="Nanome v2.4 Quick Tips: Building Custom Components" />

<YoutubeEmbed videoId="wdECz2HmR3o" title="Nanome v2.4 Quick Tips: Changing Molecular Representations" />

## Scenes {#scenes}

<p class="chapter-kicker">Step 3 of 8 · Telling the story with scenes</p>

Scenes are saved views inside a workspace. Instead of showing everything at once
and hiding the parts nobody needs yet, each scene shows one step and the group
moves through them together.

<Callout type="tip">

**A new scene starts empty on purpose.** New scenes have fresh, unset
representations, so each entry gets set up deliberately. Duplicating a scene
copies it exactly, which makes a small variation cheap and a clean slate equally
cheap.

</Callout>

### Building a sequence

<vimg src="nanome-v2/scenes-panel-controls.jpg" />

*Scenes Panel controls. See [Scenes Panel](/nanome_v2/scenespanel).*

<Steps>

1. Set the view, then **Create Scene**. The scene keeps the representations and
   visibility exactly as they are at that moment.
2. Use **Set Scene POV** so switching to the scene lands every user in the same
   framing, and leave **Enable Scene POV** on for the session.
3. **Duplicate Scene** for the next step, change one thing, and keep going. Each
   scene reveals a little more than the one before it.
4. **Reorder Scenes** by dragging, and rename from **Scene Options**, so the
   order matches how the session runs.

</Steps>

### What makes a sequence work

<AccordionGroup label="4 things worth knowing">

<Accordion title="Hide what the scene doesn't need" teaser="Anything left on still costs frames, even behind a surface.">

A scene that shows every atom and then covers them with an opaque surface still
renders every atom. Hide the components the scene isn't about with
**Hide/Show Entry**, or clear the view with **Hide/Show All** and bring back
only what belongs.

</Accordion>

<Accordion title="Name scenes for what they show" teaser="&quot;Active Site Close-up&quot; beats &quot;Scene 4&quot;.">

Nanome's own examples are "Active Site Close-up" and "Ligand Binding
Comparison". Named scenes let any user in the workspace jump to the right point
without being walked there, which matters most when the session splits into
groups.

</Accordion>

<Accordion title="See where each user is" teaser="Colored dots on a scene show who is viewing it.">

Each user in a workspace gets a personal color, shown on their name tag and as a
dot on whichever scene they're viewing. A glance at the panel says whether the
group is together or scattered across scenes.

<vimg src="nanome-v2/scenes-panel-multiuser-indicators.jpg" />

*Per-user color dots on each scene. See [Scenes Panel](/nanome_v2/scenespanel).*

</Accordion>

<Accordion title="Keep the sequence short" teaser="A workspace holds up to 50 scenes; sessions rarely need 10.">

Nanome raised the ceiling to 50 scenes per workspace in v2.6. A long sequence
built before the first session usually ends up rebuilt after it, so start with
the handful of views the discussion needs and add scenes as questions come up.

</Accordion>

</AccordionGroup>

### Scenes in 2 minutes

<YoutubeEmbed videoId="vngy1zlFvRA" title="Nanome v2.4 Quick Tips: Working with Scenes" />

## Keep it comfortable {#comfort}

<p class="chapter-kicker">Step 4 of 8 · How much structure a headset can show</p>

Comfort in a headset tracks frame rate, and frame rate tracks how many atoms are
on screen. Nanome publishes the numbers, and they are lower than most first
workspaces assume.

### Comfort by shown atom count

Nanome rates comfort against frame rate: Comfortable is 72 FPS or better,
Moderate is 60 FPS or better, and 30 FPS or less is not recommended.

| Shown atoms | Quest Pro and Quest 2 | Vive Focus 3 | PCVR |
| --- | --- | --- | --- |
| 2,500 | Comfortable | Comfortable | Comfortable |
| 5,000 | Moderate | Moderate | Comfortable |
| 10,000 | Not recommended | Moderate | Comfortable |

Shown atom count is what's displayed, not what's loaded. Surfaces, ribbons,
labels, and whiteboards each move the number on their own.

[Comfort comparison →](/help/choosinghardware)

### Spending the budget well

<CardGrid :cols="3">

<Card title="Hide first">

**Hide/Show All** clears the view, and **Hide/Show Entry** brings back one
component at a time. Everything shown counts, whether or not it's visible behind
something else.

</Card>

<Card title="Step surfaces down">

Surfaces come in 4 densities: **Wire**, **Sheer**, **Semi**, and **Opaque**.
Dropping a density is usually enough, so surfaces rarely have to come off
entirely.

</Card>

<Card title="One atomistic look at a time">

Ball and Stick, Sticks, Wire, and VDW are exclusive per component, so the choice
is already made once per component. Split a structure into components to mix
looks across a single entry.

</Card>

</CardGrid>

<vimg src="nanome-v2/surface-density-levels.jpg" />

*Surface density: Wire, Sheer, Semi, Opaque. See [Main Panel](/nanome_v2/mainpanel).*

<vimg src="nanome-v2/atomistic-representations.jpg" />

*Atomistic representations. See [Main Panel](/nanome_v2/mainpanel).*

<Callout type="note" title="PCVR carries more">

A PC headset carries more: PCVR stays Comfortable at 10,000 shown atoms where a
standalone Quest is already past its budget. Sessions that need heavy structures
run better with the heavy views on desktop and the walkthrough in XR.

</Callout>

## Permissions {#roles}

<p class="chapter-kicker">Step 5 of 8 · Deciding who can change what</p>

Permissions are set per workspace, before anyone joins. A Viewer can explore,
spotlight, follow, and move through scenes. An Editor can change the workspace
itself.

<Callout type="tip">

**Set the level before the code goes out.** A workspace's global permission
applies to anyone who joins with the code, so deciding it first is what keeps
prepared material intact.

</Callout>

### The four levels

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

### Setting them

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

## Share the workspace {#share}

<p class="chapter-kicker">Step 6 of 8 · Getting the group into the same workspace</p>

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

### Where the code lives

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

### Named access, and pulling users in

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

## Run the session {#live}

<p class="chapter-kicker">Step 7 of 8 · Spotlight, follow, and moving the group</p>

Nanome has no designated presenter. Any user can spotlight their view, and any
user can follow another, which makes handing the session around a matter of who
points where.

### Spotlight and follow

<vimg src="nanome-v2/scenes-panel-spotlight-mode.jpg" />

*Spotlighting, seen from both sides. See [Scenes Panel](/nanome_v2/scenespanel).*

**Spotlight Me** makes one view the shared view, and every follower sees it with
a crown icon and a **Stop** button to break away. A follower who gets turned
around has **Reset Orientation** to come back.

Any user can spotlight and any user can follow, so the session moves without a
designated presenter. Handing it over is a matter of who starts spotlighting
next.

Pointers sit relative to the structure, so a pointer at a residue lands on that
residue for every user, even those looking from their own angle.

### Before the group arrives

<AccordionGroup label="4 checks">

<Accordion title="Turn Position Molecules off" teaser="Spotlight doesn't work properly while it's on.">

**Position Molecules** moves structures independently of the workspace. The docs
state plainly that the spotlight system will not work properly while it's on, so
it belongs off for anything collaborative.

</Accordion>

<Accordion title="Reset the play boundary" teaser="Each headset sets its own space before the session starts.">

Repositioning the boundary with the Meta Quest button puts each user at a
sensible starting point. A user who ends up standing inside the structure can
redo it mid-session without leaving the workspace.

</Accordion>

<Accordion title="Check audio in the Users tab" teaser="Mic level, self-mute, and muting another user all live there.">

The **Users** tab shows a mic input level, a display name anyone can change, and
a per-user menu for muting another user locally. The Wrist Menu carries a mute
button for the moments between speaking.

<vimg src="nanome-v2/users-tab-overview.jpg" />

*Users tab. See [Main Panel](/nanome_v2/mainpanel).*

</Accordion>

<Accordion title="Move the group, or move alone" teaser="Load for All brings the group; Load moves one user.">

**Load for All** takes every user in the current workspace to the next one, with
a notification that lets them opt out or go immediately. Users without permission
on the destination are prompted for one, which is another reason to set
permissions before the session. **Load** moves one user and leaves the rest where
they are.

</Accordion>

</AccordionGroup>

### Inviting and following

<YoutubeEmbed videoId="5uikQlDO7FA" title="Nanome v2.5 Quick Tips: Load Structures, Invite & Follow from XR" />

<YoutubeEmbed videoId="6v7xlQNzzoY" title="Nanome v2.5 Quick Tips: Invite Users & Follow from the Web" />

## Troubleshooting {#fixes}

<p class="chapter-kicker">Step 8 of 8 · What to check when something feels wrong</p>

Most live problems come from 4 places: too much on screen, a permission set
after the invitation went out, Position Molecules left on, or a network the
headsets cannot reach.

<AccordionGroup label="6 checks">

<Accordion title="The headset feels slow or uncomfortable" teaser="Almost always the shown atom count, not the network.">

Hide everything, then bring back only what the current scene is about. A Quest is
Comfortable at about 2,500 shown atoms and past its budget at 10,000, and atoms
hidden behind an opaque surface still count. Dropping a surface from Opaque to
Semi or Sheer buys frames without losing the shape.

[Keep it comfortable →](#comfort)

</Accordion>

<Accordion title="Following or spotlighting does nothing" teaser="Check whether Position Molecules is on.">

The spotlight system will not work properly while **Position Molecules** is on,
because structures are moving independently of the workspace all users share.

</Accordion>

<Accordion title="A user can't change anything" teaser="Their permission is Viewer, which is usually on purpose.">

**My Permission** at the top of the Users tab shows the current level. An Editor
or Owner can promote one user from the **(...)** menu beside their name, which is
enough for the moment they need to change something.

</Accordion>

<Accordion title="Headsets struggle while browsers are fine" teaser="The headsets are probably on a different network.">

Headsets are often put on a separate network from laptops, and that network can
be slower or more restricted. A phone makes a quick test: load the workspace on
the headset network, then on the main one, and compare. The network requirements
are in the setup guide.

[Wi-Fi and firewall requirements →](/getting-started#network)

</Accordion>

<Accordion title="The web app loads to a black screen" teaser="Hardware acceleration is off in the browser.">

A workspace that reaches full loading and then stays black usually means the
browser is rendering without the GPU. In Chrome, turning on hardware
acceleration in Settings and checking **chrome://gpu** for a disabled WebGL line
has resolved it for other accounts. Support can confirm the exact settings for a
given machine.

[Email support](mailto:support@nanome.ai)

</Accordion>

<Accordion title="Everything slowed down at once" teaser="Count how many users are in a single workspace.">

A workspace holding the whole group is doing more work than several smaller ones.
Splitting a large session across workspaces keeps each one light, and keeps one
heavy view from reaching every user at once.

[Plan the session →](#plan)

</Accordion>

</AccordionGroup>
