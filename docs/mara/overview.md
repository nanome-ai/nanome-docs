---
title: MARA Overview
---

# MARA

**MARA** (Molecular Analysis and Reasoning Assistant) is Nanome's AI assistant. You ask in plain language, and MARA picks the tools that answer the question, runs them, and returns the results as text, files, tables, plots and 3D structures.

## Where MARA is {#where-mara-is}

<IconGrid label="Where MARA is">
<IconCard icon="messages" title="Conversations" href="/mara/conversations">In Nanome Web's top bar. Chats with MARA, with their files, tables and a 3D viewer.</IconCard>
<IconCard icon="tool" title="Tools" href="/mara/tools">In Nanome Web's top bar. The tools, integrations, workflows and knowledge MARA works with.</IconCard>
<IconCard icon="sparkles" title="MARA tab" href="/nanome_web/workspace#mara-tab">In a Nanome Web workspace: a MARA chat beside the 3D view.</IconCard>
<IconCard icon="device-vision-pro" title="In Nanome XR" href="#in-nanome-xr">Talk to MARA, and run MARA tools, from a headset.</IconCard>
</IconGrid>

## <AppIcon name="message-2-share" /> What you can ask {#what-you-can-ask}

The example chats on the [Conversations](/mara/conversations#examples) page show one complete task for each field:

<IconGrid label="Example chats">
<IconCard icon="hexagons" title="Cheminformatics" href="/mara/conversations#examples">Calculate molecular properties, analyze SAR data, visualize data.</IconCard>
<IconCard icon="dna2" title="Bioinformatics" href="/mara/conversations#examples">Design protein sequences, align sequences, fold a sequence with ESMFold.</IconCard>
<IconCard icon="microscope" title="Drug Discovery" href="/mara/conversations#examples">Find related structures, find binding pockets, run docking.</IconCard>
<IconCard icon="atom" title="Comp Chemistry" href="/mara/conversations#examples">Process molecular dynamics trajectories, calculate distances, prepare structures.</IconCard>
</IconGrid>

More tasks by kind, and what MARA does with tables and structures, are under [What MARA can do](/mara/features).

## <AppIcon name="device-vision-pro" /> In Nanome XR {#in-nanome-xr}

<ShotRow src="mara/xr-mara-buttons.webp" alt="The Wrist Menu and the Tools Panel in a headset, with MARA's buttons on each">

<UiList label="MARA in Nanome XR">
<UiItem icon="sparkles" name="MARA on the Wrist Menu" href="#talking-to-mara" area="18.0,78.9,6.4,11.5">Opens MARA and starts listening.</UiItem>
<UiItem icon="sparkles" name="Open MARA" href="#talking-to-mara" area="90.2,72.2,1.8,3.3">At the bottom of the Tools Panel. The same as the Wrist Menu button.</UiItem>
<UiItem icon="tool" name="MARA Tools" href="/nanome_v2/toolspanel#mara-tools" area="90.2,53.5,1.8,3.3">In the Tools Panel, in beta. Runs your MARA tools from the headset.</UiItem>
</UiList>

</ShotRow>

### Talking to MARA {#talking-to-mara}

In a headset, MARA changes how the workspace is drawn when you ask out loud. Changes to the selection aren't supported yet.

<Steps>

1. Open MARA from the Wrist Menu or the Tools Panel, or press the off-hand controller's second button (**Y**, or **B** when left-handed) once a workspace is open.
2. MARA shows **Listening...** and writes out what you say as you speak. **Cancel** stops without sending.
3. When you finish, MARA shows your request, then **MARA Processing...**, then its answer, and the workspace changes.
4. **New** asks something else. **Close** puts MARA away.

</Steps>

- MARA needs the headset's microphone. Without permission, it says so instead of listening.
- Its buttons need Editor access to the workspace.

## <AppIcon name="code" /> For administrators and developers {#administrators-and-developers}

<IconGrid label="More about MARA">
<IconCard icon="topology-star-3" title="Technical" href="/mara/technical">Architecture and deployment, tool creation, API keys and single sign-on.</IconCard>
<IconCard icon="player-play" title="Resources" href="/mara/resources">Videos, blog posts and webinars.</IconCard>
</IconGrid>
