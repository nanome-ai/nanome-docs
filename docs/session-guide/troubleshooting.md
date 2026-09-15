---
title: Troubleshooting
---

# What to check when something feels wrong

Most live problems come from 4 places: too much on screen, a permission set
after the invitation went out, Position Molecules left on, or a network the
headsets cannot reach.

<AccordionGroup label="6 checks">

<Accordion title="The headset feels slow or uncomfortable" teaser="Almost always the shown atom count, not the network.">

Hide everything, then bring back only what the current scene is about. A Quest is
Comfortable at about 2,500 shown atoms and past its budget at 10,000, and atoms
hidden behind an opaque surface still count. Dropping a surface from Opaque to
Semi or Sheer buys frames without losing the shape.

[Keep it comfortable →](/session-guide/comfort)

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

[Wi-Fi and firewall requirements →](/getting-started/network)

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

[Plan the session →](/session-guide/plan)

</Accordion>

</AccordionGroup>
