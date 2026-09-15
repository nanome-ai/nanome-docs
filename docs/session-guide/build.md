---
title: Build the workspace
---

# Three ways to build a workspace

A workspace holds structures, their representations, scenes, and permissions.
Build it in the web app, describe it to a coding agent, or assemble it in a
headset. The web app is the recommended route, and everything built there opens
anywhere else.

<YoutubeEmbed videoId="aOICs-LXoj4" title="Nanome v2.4 Quick Tips: Setting Up a New Workspace" />

## Pick a build path

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

## More on building

<YoutubeEmbed videoId="Mw3oZhPD14k" title="Nanome v2.4 Quick Tips: Building Custom Components" />

<YoutubeEmbed videoId="wdECz2HmR3o" title="Nanome v2.4 Quick Tips: Changing Molecular Representations" />
