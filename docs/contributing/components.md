---
title: Interactive components
---

# Interactive components

Every page here is markdown, and markdown pages can use the components below.
They cover the patterns a guided page needs: a picker that narrows to one
answer, collapsible detail, tabs, cards, numbered steps, and copyable blocks.

Headings still belong in markdown. The right-hand rail is built from the
headings on the page, so a heading rendered inside a component is one a reader
cannot navigate to.

## Chooser

A sequence of questions that ends in one answer. Questions appear one at a
time, and the answers are written to the query string, so any state of the
picker is a link that can be pasted into a ticket.

<Chooser
  param="mdm"
  title="Which device management service fits?"
  :steps="[
    {
      id: 'device',
      label: 'Which headset?',
      options: [
        { id: 'meta', label: 'Meta Quest', detail: 'Quest 3 and Quest 3S' },
        { id: 'samsung', label: 'Galaxy XR', detail: 'Android XR' },
        { id: 'apple', label: 'Apple Vision Pro', detail: 'visionOS' }
      ]
    },
    {
      id: 'fleet',
      label: 'How many headsets?',
      when: 'device',
      options: [
        { id: 'one', label: 'Just one', detail: 'A single shared headset' },
        { id: 'many', label: 'A fleet', detail: 'Several, across a team' }
      ]
    },
    {
      id: 'budget',
      label: 'Is there budget for device management?',
      when: 'device=meta fleet=many',
      options: [
        { id: 'no', label: 'Free tooling only' },
        { id: 'yes', label: 'There is budget' }
      ]
    }
  ]">

<ChooserResult when="fleet=one" verdict="A single headset needs no MDM">

One headset is set up by hand in less time than it takes to enrol it. Skip
device management and go straight to installing Nanome.

</ChooserResult>

<ChooserResult when="device=meta fleet=many budget=no" verdict="Meta Horizon Managed Services">

The only free option, and it manages Meta hardware only.

</ChooserResult>

<ChooserResult when="device=meta fleet=many budget=yes" verdict="ArborXR or ManageXR">

Both are paid, both manage Quest fleets, and both handle app distribution and
kiosk mode.

</ChooserResult>

<ChooserResult when="device=samsung|apple fleet=many" verdict="A paid service, or an Apple MDM">

Meta's free tooling manages Meta hardware only, so a Galaxy XR or Vision Pro
fleet needs a paid service.

</ChooserResult>

</Chooser>

Conditions are written as strings. `device=meta` matches one answer,
`device=meta fleet=many` requires both, `device=meta|samsung` matches either,
and `device!=meta` matches anything else. Give the last result `when="*"` to
catch whatever the others miss.

## Accordions

A row shows a title and a one-line teaser, and holds the detail behind a
toggle. Rows are native `<details>`, so the body is in the built HTML and both
the site search and a browser's own find-on-page still reach it.

<AccordionGroup label="6 network checks">

<Accordion title="Outbound HTTPS" teaser="Port 443 has to reach Nanome's hosts.">

Nanome connects outbound over 443. No inbound ports need opening.

</Accordion>

<Accordion title="Captive portals" teaser="A headset cannot sign in to a splash page." tag="Common">

Guest networks that open a sign-in page in a browser will not work, because a
headset has nowhere to show that page during setup.

</Accordion>

<Accordion title="Bandwidth" teaser="What a shared session actually uses.">

Plan for a few Mbps per user in a session. Loading a large structure is a
short burst; the session itself is steady and small.

</Accordion>

</AccordionGroup>

## Tabs

For content that splits by vendor or platform rather than by a sequence of
questions.

<Tabs :labels="['ArborXR', 'ManageXR', 'Meta HMS']" :notes="['Paid', 'Paid', 'Meta only']">
<Tab>

Enrol the headset from the ArborXR console, then push Nanome from the app
library.

</Tab>
<Tab>

Add the device to a group in ManageXR, then assign Nanome to that group.

</Tab>
<Tab>

Meta Horizon Managed Services is free and manages Meta hardware only.

</Tab>
</Tabs>

## Cards

<CardGrid :cols="3">

<Card badge="Free" title="Meta Horizon" meta="Meta hardware only" href="https://www.meta.com/business/" cta="Open site">

App distribution, kiosk mode, and remote enrolment for Quest.

</Card>

<Card badge="Paid" title="ArborXR" meta="Quest, Pico, Vision Pro" href="https://arborxr.com" cta="Open site">

Cross-vendor fleet management with remote support.

</Card>

<Card badge="Paid" title="ManageXR" meta="Quest, Pico" href="https://managexr.com" cta="Open site">

Fleet management with a configurable home screen.

</Card>

</CardGrid>

## Steps

<Steps>

1. Open the admin console and sign in.
2. Create a device group for the team that will use Nanome.
3. Add Nanome to that group's app library.
4. Enrol each headset into the group.

</Steps>

## Copyable blocks

<CopyBlock title="Allowlist" :lines="[
  '*.nanome.ai',
  'app.nanome.ai',
  'home.nanome.ai',
  '*.meta.com',
  '*.oculus.com'
]" />

## Callouts

<Callout type="tip" title="Recommended">

Build the workspace in the web app. Everything built there opens anywhere else.

</Callout>

<Callout type="warning" title="Check before the session">

Permissions are set per workspace, before anyone joins. Changing them after
invitations go out does not update who already has access.

</Callout>
