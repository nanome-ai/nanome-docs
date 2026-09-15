---
title: Choose an MDM
---

# Managing a fleet of headsets

A mobile device management (MDM) service enrolls headsets into an
organization, pushes Wi-Fi and apps to them, and keeps every headset on the
version IT has approved. Managed headsets can also run without personal store
accounts.

<Callout type="note" title="For more than one headset">

A single headset is set up by hand in less time than it takes to enroll one.
This chapter matters once headsets are shared or spread across a team.

</Callout>

## Which service fits

<Chooser
  param="mdm"
  title="Answer three questions"
  :steps="[
    {
      id: 'device',
      label: 'Which headset?',
      options: [
        { id: 'meta', label: 'Meta Quest', detail: 'Quest 3 and 3S' },
        { id: 'galaxy', label: 'Samsung Galaxy XR', detail: 'Android XR' },
        { id: 'visionpro', label: 'Apple Vision Pro', detail: 'visionOS' }
      ]
    },
    {
      id: 'fleet',
      label: 'How many headsets?',
      when: 'device',
      options: [
        { id: 'one', label: 'One headset', detail: 'A single user, or a headset that stays with one user' },
        { id: 'many', label: 'Several headsets', detail: 'A lab, a classroom, or a fleet shared across users' }
      ]
    },
    {
      id: 'budget',
      label: 'Is there budget for device management?',
      hint: 'Asked for Meta Quest only — HMS is the one free service, and it manages Meta hardware.',
      when: 'device=meta fleet=many',
      options: [
        { id: 'none', label: 'Free tooling only', detail: 'No line item for device management' },
        { id: 'paid', label: 'Budget available', detail: 'Room for a paid service with vendor support' }
      ]
    }
  ]">

<ChooserResult when="device=meta fleet=one" verdict="No MDM needed.">

A single headset installs Nanome from the Meta Horizon Store and signs in with
its own Nanome account. Device management earns its place once headsets are
shared or spread across a team.

[Go to Download & install →](/getting-started/install)

</ChooserResult>

<ChooserResult when="device=galaxy fleet=one" verdict="No MDM needed.">

A single headset installs the Nanome APK and signs in with its own Nanome
account. Device management earns its place once headsets are shared or spread
across a team.

[Go to Download & install →](/getting-started/install)

</ChooserResult>

<ChooserResult when="device=visionpro fleet=one" verdict="No MDM needed.">

A single headset installs the Nanome beta through Apple TestFlight and signs in
with its own Nanome account. Device management earns its place once headsets
are shared or spread across a team.

[Go to Download & install →](/getting-started/install)

</ChooserResult>

<ChooserResult when="device=meta fleet=many budget=none" verdict="Use HMS on its own.">

Meta's free service enrolls Quest headsets, pushes Wi-Fi and Nanome to all of
them, and keeps every headset on the version IT approved. It covers a shared
lab or classroom without a budget line.

**Meta Horizon managed services (HMS)** — Free. Free since February 20, 2026.
Works with Quest 2, 3, 3S, and Pro.

- Enrolls Meta Quest headsets and runs them without personal Meta accounts
- Device presets, Wi-Fi profiles, app and file push, and remote wipe
- Nanome installs from the Managed App Store under Discover Apps

[HMS sign-up](https://work.meta.com/help/944423209536772)
· [Go to the HMS setup guide →](/getting-started/mdm-setup)

</ChooserResult>

<ChooserResult when="device=meta fleet=many budget=paid" verdict="Add ArborXR or ManageXR on top of HMS.">

Both enroll Quest headsets through HMS and add premium device management with
a support team, plus headsets HMS cannot manage. Either one works with Nanome,
so the choice comes down to price, headset mix, and which team you would rather
have on a call.

**ArborXR** — From $7 per headset per month, billed annually. 30-day free trial.

- Also manages PICO, HTC VIVE, Galaxy XR, and Magic Leap 2 headsets
- ArborXR Home launcher or single-app kiosk, locked with an admin PIN
- Release channels hold each group on the Nanome version IT approved

[ArborXR pricing](https://arborxr.com/pricing)

**ManageXR** — From $7 per headset per month, billed annually. 30-day free trial.

- Also manages Samsung Galaxy XR, PICO, and HTC VIVE headsets
- Imports Nanome from the Meta managed store as a CSV, or an uploaded APK
- Single-app kiosk and Wi-Fi with certificates on the Essential plan, though
  Galaxy XR cannot be kiosk-locked yet

[ManageXR pricing](https://www.managexr.com/pricing)
· [Go to the ArborXR and ManageXR guides →](/getting-started/mdm-setup)

</ChooserResult>

<ChooserResult when="device=galaxy fleet=many" verdict="ArborXR or ManageXR.">

HMS manages Meta Quest headsets only, and Android XR has no free equivalent, so
managing Galaxy XR headsets starts at a paid service. Both enroll Galaxy XR and
push the Nanome APK. Samsung Knox Manage also reached Galaxy XR in 2026, quoted
by Samsung sales rather than listed per device.

ManageXR supports most Galaxy XR features today, apart from locking a headset
into a kiosk home screen.

[ArborXR supported devices](https://arborxr.com/supported-devices)
· [ManageXR supported devices](https://help.managexr.com/en/articles/5281345-supported-devices)
· [Samsung Knox Manage](https://www.samsungknox.com/en/solutions/it-solutions/knox-manage)
· [Go to the ArborXR and ManageXR guides →](/getting-started/mdm-setup)

</ChooserResult>

<ChooserResult when="device=visionpro fleet=many" verdict="Managed with an Apple MDM.">

ArborXR does not manage Apple hardware and ManageXR lists visionOS as planned,
so Vision Pro headsets enroll in Apple Business Manager alongside an Apple MDM.
Several of those have free tiers at small fleet sizes, including Mosyle Business
for up to 30 devices and Jamf Now for the first 3.

Nanome on Vision Pro is a TestFlight beta, so a fleet rollout is worth planning
with the Nanome team.

[Apple's device enrollment guide](https://support.apple.com/en-us/121160)
· [Go to Download & install →](/getting-started/install)

</ChooserResult>

</Chooser>

## Compare all three side by side

<AccordionGroup label="Cost, supported headsets, and features">

<Accordion title="Meta Horizon managed services (HMS)" teaser="Free. Manages Meta Quest only." tag="Free">

**Free** — Free since February 20, 2026. Works with Quest 2, 3, 3S, and Pro.
Manages Meta Quest only.

- Manages Meta Quest headsets only, on Quest 2, 3, 3S, and Pro
- Quest headsets that are not already enrolled in an MDM enroll through HMS on
  Horizon OS v74 and later
- Runs shared headsets without personal Meta accounts, with a fresh session for
  each user
- Device presets, Wi-Fi profiles, app and file push, and remote wipe
- Nanome is listed in the Managed App Store under Discover Apps
- Meta supports the current version for Quest 3 and 3S through January 4, 2030,
  with no stated date for Quest 2 and Pro

[Meta Horizon managed services](https://work.meta.com/)
· [HMS sign-up](https://work.meta.com/help/944423209536772)

</Accordion>

<Accordion title="ArborXR" teaser="From $7 per headset per month. Multi-brand." tag="Paid">

**From $7** — Per headset per month, billed annually. 30-day free trial.
Manages Meta Quest, Galaxy XR, PICO, HTC VIVE, Magic Leap 2.

- Adds a management layer on top of HMS for Quest headsets
- Also manages PICO, HTC VIVE, Samsung Galaxy XR, and Magic Leap 2 headsets,
  with features that vary by model
- ArborXR Home launcher or single-app kiosk, locked with an admin PIN
- Secure Wi-Fi provisioning and app, video, and file push on every plan
- Release channels hold each device group on the Nanome version IT has approved
- Remote casting and usage analytics on the Essential plan

[ArborXR](https://arborxr.com/) · [ArborXR pricing](https://arborxr.com/pricing)

</Accordion>

<Accordion title="ManageXR" teaser="From $7 per headset per month. Multi-brand." tag="Paid">

**From $7** — Per headset per month, billed annually. 30-day free trial.
Manages Meta Quest, Galaxy XR, PICO, HTC VIVE.

- Enrolls Quest headsets through HMS with an organization enrollment token
- Also manages Samsung Galaxy XR, PICO, and HTC VIVE headsets, with features
  that vary by model
- Imports Nanome from the Meta managed store as a CSV, or deploys an uploaded APK
- Single-app kiosk and Wi-Fi with certificates on the Essential plan, though
  Galaxy XR cannot be kiosk-locked yet
- Multi-app home screen, release channels, remote screen streaming, and usage
  analytics on the Premium plan

[ManageXR](https://www.managexr.com/)
· [ManageXR pricing](https://www.managexr.com/pricing)

</Accordion>

</AccordionGroup>
