---
title: Scenes
---

# Telling the story with scenes

Scenes are saved views inside a workspace. Instead of showing everything at once
and hiding the parts nobody needs yet, each scene shows one step and the group
moves through them together.

<Callout type="tip">

**A new scene starts empty on purpose.** New scenes have fresh, unset
representations, so each entry gets set up deliberately. Duplicating a scene
copies it exactly, which makes a small variation cheap and a clean slate equally
cheap.

</Callout>

## Building a sequence

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

## What makes a sequence work

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

## Scenes in 2 minutes

<YoutubeEmbed videoId="vngy1zlFvRA" title="Nanome v2.4 Quick Tips: Working with Scenes" />
