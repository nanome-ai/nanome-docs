---
title: Session Guide
outline: [2, 3]
---

# Running a session in Nanome

Once people can reach a workspace, in a browser or a headset, these steps take a group from an empty workspace to a working session. Each step links to the reference page that covers its buttons.

<IconGrid label="Session steps">
<IconCard icon="list-check" title="Plan" href="#plan">How many people, joining from what, with how much on screen.</IconCard>
<IconCard icon="cube-3d-sphere" title="Build" href="#build">In Nanome Web, with a coding agent, or in a headset.</IconCard>
<IconCard icon="box" title="Scenes" href="#scenes">Saved views the group moves through together.</IconCard>
<IconCard icon="mood-smile" title="Comfort" href="#comfort">How much structure a headset shows comfortably.</IconCard>
<IconCard icon="lock" title="Permissions" href="#roles">Who can change what.</IconCard>
<IconCard icon="share" title="Share" href="#share">Getting the group into the same workspace.</IconCard>
<IconCard icon="crown" title="Run the session" href="#live">Spotlight, follow and moving the group.</IconCard>
<IconCard icon="alert-triangle" title="Troubleshooting" href="#fixes">What to check when something feels wrong.</IconCard>
</IconGrid>

## <AppIcon name="list-check" /> Plan the session {#plan}

A session rests on 3 things: how many people join, what they join from, and how much structure is on screen.

### Find the shape of your session

<Chooser
  param="session"
  :steps="[
    {
      id: 'size',
      label: 'How many people join at once?',
      options: [
        { id: 'small', label: '2 to 5 people', detail: 'A working review, a design discussion or a walkthrough' },
        { id: 'group', label: 'A single group', detail: 'A training session, a team meeting or a lab' },
        { id: 'large', label: 'More than one group', detail: 'A large cohort working through the same material' }
      ]
    },
    {
      id: 'mode',
      label: 'How do they join?',
      when: 'size',
      options: [
        { id: 'xr', label: 'Everyone in a headset', detail: 'One headset per person for the whole session' },
        { id: 'mixed', label: 'Headsets and browsers', detail: 'Some people in Nanome XR, the rest in Nanome Web' },
        { id: 'web', label: 'Mostly browsers', detail: 'A few headsets at most, the rest at app.nanome.ai' }
      ]
    }
  ]">

<ChooserResult when="size=small mode=xr" verdict="One workspace, everyone as Editor.">

- A review this size fits in one workspace, and edit access lets anyone change the view as the discussion moves.
- Building 2 or 3 scenes ahead covers the views the discussion keeps coming back to.
- About 7,500 shown atoms or fewer suits a Quest 3 or Galaxy XR. Vision Pro and PCVR carry more.
- Each headset needs a Collab or Full seat, and a Collab seat has Viewer access in Nanome XR, whatever its level in the workspace.

</ChooserResult>

<ChooserResult when="size=small mode=mixed" verdict="One workspace, with the browsers following.">

- People in Nanome Web can follow someone in a headset and see what that person sees.
- Nanome XR loads PDB entries by code. Other files are loaded in Nanome Web, and the workspace updates in the headset.
- Everyone can be an Editor at this size, and each person's level can change later.

</ChooserResult>

<ChooserResult when="size=small mode=web" verdict="One workspace in the browser.">

- Nanome Web opens the same workspaces and scenes as Nanome XR, so nothing needs rebuilding if a headset joins later.
- Anyone can spotlight from the browser with **Spotlight Me**, and the others follow, in a browser or a headset.
- Structures load from the RCSB by PDB ID, or from files uploaded or dragged onto the workspace.

</ChooserResult>

<ChooserResult when="size=group mode=xr" verdict="One prepared workspace, the group as Viewers.">

- With the global level on Viewer before the code goes out, people can look around, point, comment, spotlight, follow and move between scenes, and the workspace stays as it was prepared.
- Scenes built ahead let the group start straight away.
- The least powerful headset in the room sets how much a scene can show.

</ChooserResult>

<ChooserResult when="size=group mode=mixed" verdict="One workspace, Viewer by default, headsets lead.">

- People in headsets lead, and people in Nanome Web follow with the same scenes and spotlight.
- Someone who needs to change something can be made an Editor for that moment, then a Viewer again.
- Named scenes keep the group together: anyone can go to a scene without being walked there.

</ChooserResult>

<ChooserResult when="size=group mode=web" verdict="One workspace, with a headset or two leading.">

- Most of the group works in Nanome Web while 1 or 2 people in headsets lead the walkthrough.
- Nanome Web loads every supported file format, so file preparation happens there.
- Viewer is still the right default: in a browser, an Editor can rearrange the workspace just as easily.

</ChooserResult>

<ChooserResult when="size=large mode=xr" verdict="Split into groups, with a copy of the workspace each.">

- Each headset group gets its own copy of the workspace, made with **Duplicate**.
- Splitting contains mistakes: a change in one copy stays in that copy.
- Each copy stays on Viewer, so the prepared material survives the session.

</ChooserResult>

<ChooserResult when="size=large mode=mixed" verdict="Groups in headsets, the rest following in a browser.">

- Each headset group gets its own copy of the workspace, and people without a headset follow along in Nanome Web.
- A scene order shared ahead of time lets every group cover the same ground.
- Each group stays small enough to hold one conversation.

</ChooserResult>

<ChooserResult when="size=large mode=web" verdict="Browsers carry the session, headsets rotate.">

- The cohort works in Nanome Web, and the headsets rotate so each person gets time in one.
- With the workspace on Viewer, every rotation starts from the same prepared scenes.

</ChooserResult>

</Chooser>

<Accordion title="Splitting a large group" teaser="One copy of the workspace per group, made with Duplicate.">

One workspace works while the group fits in one conversation. Past that, each group gets its own copy built from the same material, so a change one group makes stays with that group.

**Duplicate**, in a workspace's <AppIcon name="dots" /> menu in Nanome XR or Nanome Web, makes the copy: the same structures and scenes, under the original name with "- Copy" added, owned by whoever made it. The copy keeps the global level but not the people added by email, and every workspace has its own code. On a free license, each copy counts toward the 3 workspaces you can own.

</Accordion>

<Callout type="note">

A session starts on time when the workspace, its scenes and its permissions are ready before anyone joins. All 3 take less time to set up ahead than during the session.

</Callout>

## <AppIcon name="cube-3d-sphere" /> Build the workspace {#build}

A workspace holds structures, their components and representations, scenes and permissions. It can be built in Nanome Web, by a coding agent or in a headset, and opens the same way in both apps.

### Pick a build path

<Chooser
  param="build"
  :steps="[
    {
      id: 'surface',
      label: 'Where is the workspace being built?',
      options: [
        { id: 'web', label: 'In Nanome Web', detail: 'app.nanome.ai, in a browser', badge: 'Recommended' },
        { id: 'mcp', label: 'With a coding agent', detail: 'Describe the workspace, and the Nanome MCP server builds it' },
        { id: 'xr', label: 'In a headset', detail: 'Load PDB entries by code without leaving Nanome XR' }
      ]
    },
    {
      id: 'client',
      label: 'Which agent?',
      when: 'surface=mcp',
      options: [
        { id: 'claude', label: 'Claude Code' },
        { id: 'codex', label: 'Codex' },
        { id: 'gemini', label: 'Gemini CLI' }
      ]
    }
  ]">

<ChooserResult when="surface=web" verdict="Build it in Nanome Web.">

<Steps>

1. Create a [project](/nanome_web/home#projects), then a workspace in it.
2. Load structures from the RCSB by PDB ID, or upload files. Nanome Web takes every [supported format](/nanome_web/fileformats), and the workspace carries them into Nanome XR.
3. A structure with a ligand loads with its default components: the protein, and a binding site that holds the ligand, the pocket around it, and the pocket and ligand together. Waters and ions get components when the file has them.
4. Give each component its representation: Cartoon for the fold, Stick or Ball & Stick for the part under discussion, a surface where shape matters. The [representations panel](/nanome_v2/mainpanel#representations) shows each style.
5. Hide what the view doesn't need. Changes stay with the scene that's open, and [Scenes](#scenes) adds the next views.

</Steps>

[Open Nanome Web](https://app.nanome.ai)

</ChooserResult>

<ChooserResult when="surface=xr" verdict="Build it without taking the headset off.">

<Steps>

1. In the Workspaces tab, <Btn icon="plus">New</Btn> creates a workspace.
2. <Btn icon="download">Load Structure</Btn>, in the Tools Panel, loads a PDB entry from the RCSB by its code. Its components appear as they do in Nanome Web.
3. In the Components tab, set each component's representation and hide what the view doesn't need.
4. Other file types are loaded in Nanome Web, and the workspace updates in the headset.

</Steps>

Building in a headset suits a workspace that grows during a discussion. Material prepared ahead is usually quicker to build in Nanome Web.

</ChooserResult>

<ChooserResult when="surface=mcp" verdict="Describe it, and the agent builds it.">

Through the Nanome MCP server, a coding agent can create projects, workspaces and scenes, load structures, add components and measurements, and export ligands as SDF. [MCP Setup](/nanome_web/account#mcp-setup), under Settings in Nanome Web, shows the command for each agent. The first time the agent connects, it asks you to sign in and approve access in your browser.

</ChooserResult>

<ChooserResult when="surface=mcp client=claude">

<CopyBlock title="Claude Code" :lines="['claude mcp add --transport http nanome https://workspaces.nanome.ai/mcp', 'claude mcp login nanome']" />

<Steps>

1. Run both commands, and sign in when the browser opens. Adding **-s user** to the first command makes Nanome available in every project.
2. Start a new Claude Code session so the Nanome tools load.
3. Ask for a structure to check that the tools answer.

</Steps>

Nanome also publishes a [Claude Code plugin](https://github.com/nanome-ai/claude-code-nanome-plugin) that builds a workspace from a description and returns its link.

</ChooserResult>

<ChooserResult when="surface=mcp client=codex">

<CopyBlock title="Codex" :lines="['codex mcp add nanome --url https://workspaces.nanome.ai/mcp', 'codex mcp login nanome']" />

<Steps>

1. Run both commands, and sign in when the browser opens.
2. Start a new Codex session so the Nanome tools load.
3. Ask for a structure to check that the tools answer.

</Steps>

</ChooserResult>

<ChooserResult when="surface=mcp client=gemini">

<CopyBlock title="Gemini CLI" text="gemini mcp add --transport http nanome https://workspaces.nanome.ai/mcp" />

<Steps>

1. Run the command, then start Gemini CLI.
2. Sign in when the browser opens, the first time Gemini CLI uses the Nanome tools.
3. Ask for a structure to check that the tools answer.

</Steps>

</ChooserResult>

<ChooserResult when="surface=mcp">

**What a request looks like**

- Pull up 6OIM, KRAS G12C with sotorasib bound. Show the fold as a cartoon colored by secondary structure, put the drug in gold, and show the GDP and the magnesium.
- Put a surface on the residues within 5 Å of the drug so I can see the switch II pocket.
- Show the covalent bond: Cys12 and the acrylamide warhead large, the rest of the drug small. Measure the sulfur to carbon distance.

The agent builds components from selection rules and measurements between atoms, so the result is an ordinary workspace that anyone with access can open and change in Nanome Web or Nanome XR.

</ChooserResult>

</Chooser>

## <AppIcon name="box" /> Scenes {#scenes}

Scenes are saved views in a workspace. Each one holds its own components, annotations, molecule positions and point of view, so each scene can show one step while the group moves through them together.

### Building a sequence

<ShotRow src="nanome-v2/v2-7/scenes-multiuser.webp" alt="The left sidebar with 3 scenes, Overview, Binding site and Pocket surface, a colored dot for each person in a scene, and Ana's and Ben's name chips">

<UiList label="Scenes Panel">
<UiItem icon="plus" name="Create scene" area="6.0,17.5,13.4,6.1">Adds an empty scene. Editors only.</UiItem>
<UiItem icon="settings" name="Scene settings" href="/nanome_v2/scenespanel#scene-settings" area="21.0,17.5,13.4,6.1">Set scene POV, Disable Scene POVs and Recenter Self. Editors only.</UiItem>
<UiItem icon="arrow-right" name="Previous and Next scene" area="50.9,17.5,28.4,6.1">Steps through the scenes. Anyone can use them.</UiItem>
<UiItem icon="player-play" name="Play scenes" area="81.0,17.5,13.4,6.1">Plays the scenes, with their recordings.</UiItem>
<UiItem name="Drag handle (=)" area="83.3,28.9,8.0,22.7">Reorders the scenes.</UiItem>
<UiItem name="Scene dots" area="8.7,40.5,11.8,4.1">One dot for each person in that scene, in their color, you included.</UiItem>
<UiItem name="Name chips" area="5.4,76.6,88.9,5.7">The others in the workspace. Selecting a chip follows that person.</UiItem>
</UiList>

</ShotRow>

<Steps>

1. **Create scene** adds an empty scene: each entry in it starts hidden, and the entry's eye in the Components tab brings back its default components.
2. **Set scene POV**, in Scene settings, saves your current view as the scene's point of view. Going to the scene then moves each person to that view.
3. **Duplicate**, in the scene's <AppIcon name="dots" /> menu, copies the scene with its components, annotations and positions. One change in the copy makes the next step, so each scene shows a little more than the one before.
4. **Rename**, in the same menu, names each scene for what it shows, and the drag handle puts the scenes in order.

</Steps>

A late change can still reach scenes already built: **Copy components**, in an entry's [Structure actions](/nanome_v2/mainpanel#structure-actions), copies its components to other scenes, and **Copy Scene POV** copies a point of view. Every button is on [Scenes Panel](/nanome_v2/scenespanel).

### What makes a sequence work

<AccordionGroup label="5 things worth knowing">

<Accordion title="Hide what the scene doesn't need" teaser="Everything shown counts, even behind a surface.">

Nanome counts every shown atom, bond, cartoon and surface when it works out what a scene costs to draw, including atoms behind an opaque surface. [Keep it comfortable](#comfort) covers how much a headset shows.

</Accordion>

<Accordion title="Name scenes for what they show" teaser="&quot;Binding site&quot; says more than &quot;Scene 4&quot;.">

Names such as Overview, Binding site and Pocket surface let anyone go straight to the right step, which matters most once the session splits into groups.

</Accordion>

<Accordion title="See where everyone is" teaser="A dot on each scene for each person in it.">

Each person has a color, shown on their name chip and as a dot on the scene they're in. Pointing at the dots lists the names, so a glance shows whether the group is together.

</Accordion>

<Accordion title="Keep the sequence short" teaser="A workspace holds up to 50 scenes.">

A long sequence built before the first session often gets rebuilt after it. Starting with the handful of views the discussion needs, and adding scenes as questions come up, saves that work.

</Accordion>

<Accordion title="A recording locks the workspace" teaser="Recorded walkthroughs play back with Play scenes.">

A scene can hold a recorded walkthrough, with the presenter's voice and pointer, that plays with **Play scenes**. A workspace that holds a recording is locked against changes until someone chooses **Modify anyway**.

[Recording a scene →](/nanome_v2/scenespanel#recording-a-scene)

</Accordion>

</AccordionGroup>

## <AppIcon name="mood-smile" /> Keep it comfortable {#comfort}

Comfort in a headset depends on a steady frame rate. Every shown atom, bond, cartoon residue, surface and label adds to the work each frame.

### Comfort by shown atom count

Nanome suggests these shown atom counts as starting points for each headset, with nothing else on screen.

<table class="comfort">
  <colgroup>
    <col style="width: 16%" />
    <col style="width: 21%" />
    <col style="width: 21%" />
    <col style="width: 21%" />
    <col style="width: 21%" />
  </colgroup>
  <thead>
    <tr>
      <th>Shown atoms</th>
      <th>Quest 3 / 3S</th>
      <th>Galaxy XR</th>
      <th>Vision Pro (M2)</th>
      <th>PCVR</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>7,500</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-good">Comfortable</td>
    </tr>
    <tr>
      <td>10,000</td>
      <td class="rate-ok">Moderate</td>
      <td class="rate-ok">Moderate</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-good">Comfortable</td>
    </tr>
    <tr>
      <td>15,000</td>
      <td class="rate-bad">Not recommended</td>
      <td class="rate-bad">Not recommended</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-good">Comfortable</td>
    </tr>
    <tr>
      <td>20,000</td>
      <td class="rate-bad">Not recommended</td>
      <td class="rate-bad">Not recommended</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-good">Comfortable</td>
    </tr>
  </tbody>
</table>

Galaxy XR ratings are estimates: Nanome gives it the same drawing budget as Quest 3. PCVR ratings carry over from Nanome Classic (v1.24). Quest 2 and Quest Pro get a little over half the Quest 3 budget, so heavy scenes lose detail and hide entries sooner on them.

The count covers what's shown: a large structure can sit in the workspace with most of it hidden.

[Every headset and Nanome Web →](/help/choosinghardware#comfort-comparison)

### When a scene is too heavy {#too-heavy}

On Quest, Galaxy XR and Vision Pro, Nanome estimates what each shown entry costs to draw and aims to keep the scene within a budget for that headset. Over budget, it lowers the detail of the largest entry first, then the next, with no message. A cartoon gets visibly coarser, and surfaces keep their full detail. If the scene stays far over budget, Nanome hides whole entries, largest first.

On Quest and Galaxy XR, a hidden entry leaves a pill with its name where it was, and its eye in the Components tab turns amber. Selecting either opens **Show Entry?**, with **Keep hidden**, **Show Entry**, **Show Entry in all scenes** and **Show all Entries**.

If the frame rate stays under 15 FPS for more than 5 seconds, Nanome opens **Slowdown detected** and hides every entry. They stay hidden until someone shows them again. The popup offers **Leave workspace**, **Disable detection**, which turns the check off until another workspace opens, and **Close popup**. This check also runs on PCVR, which has no drawing budget. On Vision Pro, it hides entries without the popup.

Each headset does this on its own, so one person can lose an entry that everyone else still sees.

### Spending the budget well

<CardGrid :cols="3">

<Card title="Hide first">

<Btn icon="eye">Hide All</Btn>, at the top of the Components tab, hides every entry, and each entry's eye brings one back. Everything shown counts, even behind an opaque surface.

</Card>

<Card title="Keep surfaces small">

A surface draws the same geometry at every detail level and opacity: **Sheer** and **Semi** only change how see-through it is, so they don't lighten the scene. A surface on the pocket costs far less than one over the whole protein.

</Card>

<Card title="Atoms where the discussion is">

Cartoon for the fold, and atoms only for the part under discussion, keep the shown atom count low. Components give each part of a structure its own style.

</Card>

</CardGrid>

Every style, drawn on 1KV2, is in the copy of the [representations panel](/nanome_v2/mainpanel#representations) on Main Panel.

<Callout type="note" title="PCVR has no drawing budget">

Nanome XR sets no drawing budget on PCVR, so the PC's graphics card sets the limit. Sessions that need heavy structures run better with the heavy views on desktop and the walkthrough in XR.

</Callout>

## <AppIcon name="lock" /> Permissions {#roles}

Permissions are set per workspace. The global level applies to anyone who joins with the code, so it's best set before the code goes out.

### The four levels

<CardGrid :cols="2">

<Card title="Viewer">

The usual level for a group. Viewers look around, select, point, comment, follow, spotlight and move between scenes, and the workspace stays as it is.

</Card>

<Card title="Editor">

For the people building or changing the workspace. Editors can also open Share to add people and change their level.

</Card>

<Card title="Owner">

Each workspace has 1 Owner, who can do everything an Editor can, remove people and delete the workspace.

</Card>

<Card title="None">

As the global level, it keeps the workspace private: only people added by email, or through its project, can open it.

</Card>

</CardGrid>

On a free license, people have Viewer access to workspaces they don't own, even when they're added as Editors. Like every Viewer, they can still spotlight and follow.

[What each level can do →](/nanome_v2/collaboration#permissions)

### Setting them

<Steps>

1. In Nanome XR, open the **Users** tab and choose <Btn icon="share">Share</Btn>. In Nanome Web, open the workspace's **Users** tab.
2. Set the global level: **Viewer** for a prepared workspace, or **None** to keep it private. Nanome Web calls it **Link access**: **Members only**, **Anyone can view** or **Anyone can edit**.
3. Add anyone who needs their own level with **Add people by email**. The address has to match their Nanome account exactly.
4. To change one person later, open the menu beside their address: **Make Editor** or **Make Viewer**, and **Remove User** for the Owner.

</Steps>

[Share dialog in Nanome XR →](/nanome_v2/mainpanel#share) · [Link access in Nanome Web →](/nanome_web/collaboration#link-access)

## <AppIcon name="share" /> Share the workspace {#share}

A workspace reaches other people 3 ways:

<IconGrid label="Ways to share a workspace" :cols="3">
<IconCard icon="share" title="The workspace code" href="#workspace-code">Anyone who enters it joins at the global level.</IconCard>
<IconCard icon="mail" title="An emailed invite" href="#named-access">One address gets its own level.</IconCard>
<IconCard icon="users" title="The org list" href="#org-list">Invite colleagues who are online, or join them.</IconCard>
</IconGrid>

### <AppIcon name="share" /> The workspace code {#workspace-code}

Every workspace has its own 8-character code, shown as <span style="white-space: nowrap">`XXXX-XXXX`</span> in the Share dialog and at the top of the Users tab in Nanome Web. Anyone who enters it joins at the global level, from a headset or a browser.

<Steps>

1. Set the global level first. While it's **None**, the code works only for people added by email or through the project.
2. Send the code with the invitation or in the chat. **Copy link**, beside the code in Nanome Web, copies a link to the workspace and leaves access as it is.
3. In a headset, the code goes in **Join Workspace** at the top of the Workspaces tab. In a browser, it goes in **Join via Code**.

</Steps>

**Copy shareable link**, in a workspace's menu in Nanome Web, changes **Members only** to **Anyone can view** before it copies the link.

### <AppIcon name="mail" /> Named access by email {#named-access}

**Add people by email** gives one address its own level, Editor or Viewer, whatever the code allows. It suits a workspace that stays private, or one person who edits while the rest watch.

### <AppIcon name="users" /> Colleagues already online {#org-list}

**Users in organization**, in the Users tab, lists colleagues who are online.

<UiList label="Users in organization">
<UiItem icon="plus" name="Invite">Asks them into your current workspace. They see <strong>Join Workspace?</strong> with Refuse or Accept.</UiItem>
<UiItem icon="login" name="Join">Goes to the workspace they're in. Without access, it sends them a join request, which they can accept as Viewer or Editor.</UiItem>
</UiList>

<Callout type="note" title="Taking access back">

The global level can drop to **None** at any point, and one person can be changed, or removed by the Owner, from the menu beside them in the Share dialog. Nobody else is affected.

</Callout>

## <AppIcon name="crown" /> Run the session {#live}

Nobody has to be the designated presenter. Anyone in the workspace can spotlight their view or follow someone else, whatever their permission level or seat, so handing over the session is a matter of who spotlights next.

### Spotlight and follow

The copy of the Users section below works like Nanome XR's: selecting Ana or Ben follows them, and **Spotlight Me** has both of them follow you.

<SpotlightDemo />

- In a headset, a new spotlight shows a prompt, and the headset follows after about 6 seconds unless the person chooses **Not now**. Nanome Web follows straight away.
- People who join or reconnect during a spotlight follow it too, and followers see the leader's scene, tool and edits as they happen.
- Pointers sit on the same part of the structure for everyone, so pointing at a residue works even when nobody is following.

[Spotlight Mode →](/nanome_v2/scenespanel#spotlight-mode) · [Following from Nanome Web →](/nanome_web/collaboration#following-from-the-web)

### Moving the group

**Load for All**, in the Workspaces tab, takes everyone in your session to the selected workspace. Each of them sees **Loading Workspace**, with **Cancel** to stay or **Go Now**, and moves with you if they do nothing. When some of them can't open the destination, Nanome first offers to add them as Viewers or Editors. **Load** moves only you.

In Nanome Web, **Queue for All**, at the bottom of a workspace's Users tab, sends it to every member. People in a headset move to it right away, and the rest get it the next time they open Nanome XR.

[Load for All vs. Load →](/nanome_v2/collaboration#load-for-all-vs-load-for-me)

### Before the group arrives

<AccordionGroup label="3 checks">

<Accordion title="Recenter each headset" teaser="Holding the Meta button lines up each person's view.">

On Meta Quest, holding the Meta button recenters your view. Each person can do this before the session, and again if the spotlight sits off-center for them. Editors also have **Recenter Self** in Scene settings.

</Accordion>

<Accordion title="Check audio in the Users tab" teaser="Your mic, your name, and muting someone for yourself.">

The Users tab shows your mic with a level meter, the display name others see, and a menu beside each person with **Mute**, which mutes them for you only. The off-hand controller's primary button (**X**, or **A** when left-handed) and the Wrist Menu also mute you.

[User settings →](/nanome_v2/mainpanel#user-settings)

</Accordion>

<Accordion title="Step through every scene once" teaser="On the least powerful headset in the room.">

Going through the sequence once on the least powerful headset shows whether any scene loses detail or hides an entry before the group sees it. On Quest and Galaxy XR, a hidden entry leaves a pill with its name.

[When a scene is too heavy →](#too-heavy)

</Accordion>

</AccordionGroup>

## <AppIcon name="alert-triangle" /> Troubleshooting {#fixes}

Most live problems come from 3 places: too much on screen, a permission set after the code went out, or a network the headsets can't reach.

<AccordionGroup label="6 checks">

<Accordion title="The headset feels slow, or an entry vanished" teaser="Usually too much on screen.">

When a scene is far over a headset's budget, Nanome lowers detail and then hides entries, and after a long slowdown it hides every entry. Hiding everything and bringing back only what the current scene is about usually fixes it, and a surface on the pocket costs far less than one over the whole protein.

[When a scene is too heavy →](#too-heavy)

</Accordion>

<Accordion title="Someone can't change anything" teaser="Their level is Viewer, which is usually on purpose.">

**My Permission**, at the top of the Users tab, shows each person their own level. An Editor or the Owner can choose **Make Editor** from the menu beside their address in the Share dialog. On a free license, people stay Viewers in workspaces they don't own. A Collab seat stays a Viewer in Nanome XR whatever its level, under a **You have a Viewer seat** banner.

</Accordion>

<Accordion title="Someone can't get in with the code" teaser="The global level is probably None.">

While the global level is **None** (**Members only** in Nanome Web), the code works only for people added by email or through the workspace's project. Setting it to **Viewer**, or adding the person by email, lets them in.

</Accordion>

<Accordion title="A follower's view is turned sideways" teaser="Reset orientation lines it up again.">

While following, **Reset orientation**, in the bar under the name chips, lines the leader's view up with the way the follower faces now.

</Accordion>

<Accordion title="Headsets struggle while browsers are fine" teaser="The headsets are probably on a different network.">

Headsets often sit on a separate network from laptops, and that network can be slower or more restricted. While a connection is poor, a warning icon appears beside the workspace name in the left sidebar, and its tooltip shows the ping. A phone hotspot makes a quick comparison.

[Wi-Fi and network requirements →](/getting-started#network)

</Accordion>

<Accordion title="Nanome Web shows 3D viewer unavailable" teaser="The browser can't use WebGL 2 right now.">

The viewer needs WebGL 2. The message lists fixes for the browser in use, such as restarting it or turning on hardware acceleration, and **Technical details** holds a report to send to support.

[Email support](mailto:support@nanome.ai)

</Accordion>

</AccordionGroup>
