---
title: Getting Started
outline: [2, 3]
---

<script setup>
import { NANOME_HOSTS, NETWORK_ALLOWLIST } from './.vitepress/data/setup-network.js'
</script>

# Getting started with Nanome XR

7 steps from boxed headsets to a shared session: hardware, choosing an MDM, setting it up, Wi-Fi, installation, accounts, and sign-in.

Nanome is **device-agnostic** — best experienced in VR or MR, but no headset is required. Jump in from any browser at [app.nanome.ai](https://app.nanome.ai) and start exploring molecules right away.

## Hardware {#hardware}

<p class="chapter-kicker">Step 1 of 7 · Headsets, and where to buy them</p>

Nanome runs on Meta Quest 3 and 3S, Samsung Galaxy XR, Apple Vision Pro, and
Windows PCs over Meta Link.

<div class="lineup">
  <figure>
    <img src="/assets/original/setup/meta-devices.png" alt="" loading="lazy" />
    <figcaption>Meta Quest 3 and 3S</figcaption>
  </figure>
  <figure>
    <img src="/assets/original/setup/galaxy-xr-headset.png" alt="" loading="lazy" />
    <figcaption>Samsung Galaxy XR</figcaption>
  </figure>
  <figure>
    <img src="/assets/original/setup/vision-pro-headset.png" alt="" loading="lazy" />
    <figcaption>Apple Vision Pro</figcaption>
  </figure>
</div>

### Where to buy

<CardGrid :cols="2">

<Card badge="Nanome hardware partner" title="Preconfigured through VR Expert" meta="Offices in the US and Europe">

VR Expert prepares each headset before it ships: enrolled in the organization's
MDM, configured, and loaded with Nanome. The US order form lists ready-to-go
Nanome kits for Quest 3 and Galaxy XR, and installation and a year of support
can be added to every headset.

[Order Nanome kits (US)](https://dashboard.vr-expert.com/order-form/a0jTg00000LTeqnIAD)
· [Europe and global](https://vr-expert.com/)

</Card>

<Card badge="Buy direct" title="From a retailer">

Meta Quest 3 and 3S are sold by Meta, Best Buy, and Amazon. Meta stopped
selling business editions in February 2026, so organizations now buy the
standard headsets and enroll them in Meta's free device management
([Choose an MDM](#mdm)).

[Meta](https://www.meta.com/quest/quest-3/)
· [Best Buy](https://www.bestbuy.com/site/meta/meta-quest/pcmcat1767121486992.c?id=pcmcat1767121486992)
· [Amazon](https://www.amazon.com/s?k=meta+quest+3)

</Card>

</CardGrid>

<Callout type="note" title="Accessories">

For shared headsets, the accessories worth adding are an Elite Strap for long
sessions, a facial interface that wipes clean, and a carrying case. A Link
Cable only matters for Windows PCVR.
[Meta accessories](https://www.meta.com/quest/shop-all/accessories/)

</Callout>

## Choose an MDM {#mdm}

<p class="chapter-kicker">Step 2 of 7 · Managing a fleet of headsets</p>

A mobile device management (MDM) service enrolls headsets into an
organization, pushes Wi-Fi and apps to them, and keeps every headset on the
version IT has approved. Managed headsets can also run without personal store
accounts.

<Callout type="note" title="For more than one headset">

A single headset is set up by hand in less time than it takes to enroll one.
This chapter matters once headsets are shared or spread across a team.

</Callout>

### Which service fits

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

[Go to Download & install →](#install)

</ChooserResult>

<ChooserResult when="device=galaxy fleet=one" verdict="No MDM needed.">

A single headset installs the Nanome APK and signs in with its own Nanome
account. Device management earns its place once headsets are shared or spread
across a team.

[Go to Download & install →](#install)

</ChooserResult>

<ChooserResult when="device=visionpro fleet=one" verdict="No MDM needed.">

A single headset installs the Nanome beta through Apple TestFlight and signs in
with its own Nanome account. Device management earns its place once headsets
are shared or spread across a team.

[Go to Download & install →](#install)

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
· [Go to the HMS setup guide →](#mdm-setup)

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
· [Go to the ArborXR and ManageXR guides →](#mdm-setup)

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
· [Go to the ArborXR and ManageXR guides →](#mdm-setup)

</ChooserResult>

<ChooserResult when="device=visionpro fleet=many" verdict="Managed with an Apple MDM.">

ArborXR does not manage Apple hardware and ManageXR lists visionOS as planned,
so Vision Pro headsets enroll in Apple Business Manager alongside an Apple MDM.
Several of those have free tiers at small fleet sizes, including Mosyle Business
for up to 30 devices and Jamf Now for the first 3.

Nanome on Vision Pro is a TestFlight beta, so a fleet rollout is worth planning
with the Nanome team.

[Apple's device enrollment guide](https://support.apple.com/en-us/121160)
· [Go to Download & install →](#install)

</ChooserResult>

</Chooser>

### Compare all three side by side

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

## MDM setup guides {#mdm-setup}

<p class="chapter-kicker">Step 3 of 7 · Setting up an MDM</p>

Enrollment happens during a headset's first-time setup, so it comes before apps
and accounts. Each guide covers signing up, enrolling headsets, and pushing
Nanome.

<Callout type="warning" title="Before new headsets are switched on">

Enrollment happens during a headset's first-time setup, and that setup needs a
working Wi-Fi network ([Wi-Fi & network](#network)). On Meta
Quest, a headset already signed in to a personal Meta account needs a factory
reset before it can enroll.

</Callout>

### Choose a service

<Tabs :labels="['HMS setup', 'ArborXR setup', 'ManageXR setup']" :notes="['Meta only', 'Multi-brand', 'Multi-brand']">
<Tab>

Manages Meta Quest headsets only.

[**Official Meta Horizon managed services documentation** — work.meta.com/help](https://work.meta.com/help/1088202249750609)

<Steps>

1. [Sign up for a free HMS organization](https://work.meta.com/help/944423209536772)
   with Meta. Adding at least 2 System admins, on shared role-based email
   addresses, keeps access from depending on one admin.
2. Factory reset any headset that has already been set up. Enrollment only
   happens during first-time setup.
3. During setup, choose **Connect to your organization** and note the 8-digit
   code. Enter it at [work.meta.com/device](https://work.meta.com/device) while
   signed in to a managed account. The Meta Horizon Device Setup app enrolls
   headsets over USB instead, straight into Shared Mode, with no account needed.
4. In [Device Manager](https://devicemanager.meta.com), put shared headsets in a
   Shared Mode device preset and assign the Wi-Fi network to it.
5. Add Nanome from **Apps & Content** > **Discover Apps** in Device Manager.

</Steps>

[Meta's enrollment guide →](https://work.meta.com/help/258897560520071/)
· [HMS sign-up walkthrough →](https://help.arborxr.com/en/articles/12821712-how-to-sign-up-for-horizon-managed-services-free)

</Tab>
<Tab>

Manages Meta Quest, Samsung Galaxy XR, PICO, HTC VIVE, and Magic Leap 2, with
features that vary by model.

[**Official ArborXR help center** — help.arborxr.com](https://help.arborxr.com/en/)

<Steps>

1. Set up the free HMS organization first (steps 1 and 2 of the HMS guide).
   Quest headsets that are not already enrolled in an MDM enroll through HMS on
   Horizon OS v74 and later.
2. Start an [ArborXR free trial](https://arborxr.com/demo/free-trial) and create
   a device group.
3. In the group's **Enrollment** tab, create a JSON enrollment file in the
   **Horizon managed services** format, then upload it in Meta's Device Manager
   under **Third Party MDMs**.
4. Enroll each headset with its device code, then confirm it appears in ArborXR.
5. Upload the Nanome APK to **Content Library** and add it to the group.
6. Set the group's **Kiosk Experience** to ArborXR Home, ArborXR Kiosk Mode, or
   an in-house launcher, then check that **Offline Mode** is on in its Shared
   Mode settings.
7. Wi-Fi comes from the network details in the enrollment file. Once headsets
   are enrolled in ArborXR, app and settings changes happen there.

</Steps>

[Enroll through HMS →](https://help.arborxr.com/en/articles/10305755-enroll-meta-quest-devices-through-horizon-managed-services)
· [Group devices →](https://help.arborxr.com/en/articles/6342954-add-devices-to-groups)
· [Upload apps →](https://help.arborxr.com/en/articles/6333163-upload-apps-to-arborxr)
· [Share apps with an organization →](https://help.arborxr.com/en/articles/9535199-share-apps-with-organizations)
· [Kiosk mode →](https://help.arborxr.com/en/articles/6378802-configure-arborxr-kiosk-mode)
· [Shared Mode settings →](https://help.arborxr.com/en/articles/11408552-configure-shared-mode-settings-on-horizon-managed-services-devices)

</Tab>
<Tab>

Manages Meta Quest, Samsung Galaxy XR, PICO, and HTC VIVE, with features that
vary by model.

[**Official ManageXR help center** — help.managexr.com](https://help.managexr.com/en/)

<Steps>

1. Set up the free HMS organization first (steps 1 and 2 of the HMS guide),
   then start a [ManageXR free trial](https://www.managexr.com/free-trial).
2. In ManageXR, open **Devices** > **Add Device**, check that the default
   configuration uses the intended Meta device mode (Shared or Individual), and
   download the **Organization Enrollment Token**.
3. In Meta Admin Center, open **Devices** > **Third-party enrollments** >
   **Create third-party enrollment**, choose ManageXR as the provider, and
   upload the token.
4. During each headset's setup, choose **Connect to your organization** and
   enter the code at work.meta.com/device.
5. Save Nanome in HMS **Discover Apps**, export the app list as a CSV, and
   import it in ManageXR under **VR Content** > **Add Content** > **Meta Horizon
   Store Apps**. Repeat that export when the app list changes. Organizations on
   a private Nanome server upload the matching APK instead.
6. Deploy Nanome and the Wi-Fi network in the configuration, then save it.

</Steps>

[Quest enrollment →](https://help.managexr.com/en/articles/10447105-meta-quest-device-enrollment)
· [Galaxy XR enrollment →](https://help.managexr.com/en/articles/14128691-samsung-galaxy-xr-device-enrollment-guide)
· [Meta store apps →](https://help.managexr.com/en/articles/13199177-meta-horizon-managed-app-store-integration)
· [Upload an APK →](https://help.managexr.com/en/articles/5281561-upload-a-managed-app)
· [Wi-Fi profiles →](https://help.managexr.com/en/articles/5983636-configure-wi-fi-network-profiles)

</Tab>
</Tabs>

<Callout type="note">

Meta also supports Ivanti, Microsoft Intune, and Omnissa Workspace ONE as
third-party enrollment providers, so an IT team already standardized on one of
those can enroll Quest headsets the same way.

</Callout>

## Wi-Fi & network {#network}

<p class="chapter-kicker">Step 4 of 7 · A network Nanome can reach</p>

Headsets need Wi-Fi with direct internet access and a short list of hostnames
allowed through the firewall. The checklist below is written to hand straight
to IT.

### Six checks for IT

<AccordionGroup label="6 checks for IT">

<Accordion title="Direct internet, no sign-in page" teaser="Guest networks with a browser sign-in block headset setup.">

Guest networks that ask for a browser sign-in (captive portals) block
first-time headset setup. Quest also shows a no-internet message whenever it
can't reach Meta, before Nanome ever opens.

</Accordion>

<Accordion title="Nanome allowed by hostname" teaser="Outbound TCP 443 to *.nanome.ai and *.nanome.com.">

Allow outbound TCP 443 to `*.nanome.ai` and `*.nanome.com`. Nanome's servers
run on Cloudflare and AWS, where IP addresses change, so IP-based rules
eventually break.

<ul class="hosts">
  <li v-for="entry in NANOME_HOSTS" :key="entry.host">
    <code>{{ entry.host }}</code>
    <span>{{ entry.purpose }}</span>
  </li>
</ul>

</Accordion>

<Accordion title="Enterprise Wi-Fi from the MDM" teaser="802.1X networks and certificates pushed to every headset.">

HMS pushes WPA2 and WPA2-Enterprise networks (EAP-TLS and EAP-PEAP). ArborXR
and ManageXR add WPA3, proxy settings, EAP-TTLS, and SCEP certificate
enrollment, and ArborXR also supports EST. Headsets enrolled in ArborXR or
ManageXR take their apps and settings, Wi-Fi included, from that MDM.

802.1X profiles need the RADIUS server's domain and a root certificate served
with its full chain, intermediates included.

[HMS Wi-Fi profiles →](https://work.meta.com/help/326024393156613/)
· [ArborXR Wi-Fi options →](https://help.arborxr.com/en/articles/6333203-supported-wifi-certificate-configurations)
· [ManageXR Wi-Fi profiles →](https://help.managexr.com/en/articles/5983636-configure-wi-fi-network-profiles)

</Accordion>

<Accordion title="Networks that register devices by MAC" teaser="Headsets randomize their MAC address by default.">

Quest 3 uses a randomized MAC address for each network by default, and other
Android-based headsets and Vision Pro do the same. For MAC registration, switch
that saved network to the device MAC, or turn off randomization in the HMS,
ArborXR, or ManageXR Wi-Fi profile.

[Finding a Quest's MAC address →](https://www.meta.com/help/quest/342215010667284/)

</Accordion>

<Accordion title="Firewall allowlist" teaser="Nanome, Meta, and MDM hosts and ports in one list to copy.">

<CopyBlock title="Firewall allowlist" :text="NETWORK_ALLOWLIST" />

</Accordion>

<Accordion title="Testing the connection" teaser="A curl check and a phone hotspot narrow down network problems.">

From the same network, `curl -v https://api.nanome.com` confirms port 443 is
open (ping uses ICMP and doesn't test it). When a phone hotspot works and the
office network doesn't, the network is blocking something. ArborXR and ManageXR
both publish network tests that also run in the headset's browser.

[ArborXR network test →](https://network-test.arborxr.com/)
· [ManageXR network test →](https://console.managexr.com/network-test)

</Accordion>

</AccordionGroup>

<Callout type="note" title="Private and on-premise deployments">

Running Nanome on a private cloud or on-premise server? Those deployments use
their own hosts and ports, covered in the
[enterprise deployment guide](https://nanome.ai/deploy). Samsung Galaxy XR
fleets managed under Android Enterprise also need
[Google's endpoints](https://support.google.com/work/android/answer/10513641).

</Callout>

## Download & install {#install}

<p class="chapter-kicker">Step 5 of 7 · Downloading and installing Nanome</p>

Nanome comes from a store, through an MDM, or as a manual download to sideload.
Picking a method and a device shows the matching download and steps, always for
the latest release.

### Pick a method and a device

<Chooser
  param="install"
  :steps="[
    {
      id: 'method',
      label: 'How will Nanome be installed?',
      options: [
        { id: 'store', label: 'Store', detail: 'Meta Horizon Store, or TestFlight on Vision Pro' },
        { id: 'mdm', label: 'Through an MDM', detail: 'The APK or managed store app, pushed to every headset' },
        { id: 'sideload', label: 'Manual download & sideload', detail: 'The APK or Windows build, downloaded and installed directly' }
      ]
    },
    {
      id: 'device',
      label: 'Which device?',
      when: 'method',
      options: [
        { id: 'meta', label: 'Meta Quest', detail: 'Quest headsets' },
        { id: 'galaxy', label: 'Android XR', detail: 'Samsung Galaxy XR' },
        { id: 'windows', label: 'Windows', detail: 'PCVR over Meta Link' },
        { id: 'visionpro', label: 'Apple Vision Pro', detail: 'TestFlight beta' }
      ]
    }
  ]">

<ChooserResult when="method=store device=meta" verdict="Install from the Meta Horizon Store">

<Steps>

1. On the headset, open the Store and search for **Nanome v2**.
2. Install the app with the purple icon. The blue icon is Nanome Classic.

</Steps>

[Open the store listing](https://www.meta.com/experiences/nanome-v2/25124020873911281/)

Headsets in HMS Shared Mode can't open the consumer store, so they get Nanome
from Discover Apps through an MDM.

</ChooserResult>

<ChooserResult when="method=store device=visionpro" verdict="Join the TestFlight beta">

<Steps>

1. Install **TestFlight** from the App Store on Vision Pro.
2. Open the Nanome TestFlight link, then choose **Accept** and **Install**.

</Steps>

[Join the TestFlight beta](https://testflight.apple.com/join/NEmqrrPF)

TestFlight builds expire 90 days after upload. Newer builds show up as updates
in the TestFlight app.

</ChooserResult>

<ChooserResult when="method=store device=galaxy" verdict="Not available from a store">

Nanome isn't listed on Google Play. Android XR headsets install the APK, either
sideloaded or through an MDM.

</ChooserResult>

<ChooserResult when="method=store device=windows" verdict="Not available from a store">

Current Nanome for Windows isn't sold through a store (the Steam listing is
Nanome Classic). It's a direct download.

</ChooserResult>

<ChooserResult when="method=mdm device=meta" verdict="Push it from the MDM's app library">

Quest headsets enroll through HMS first. Each MDM then adds Nanome from its own
app library:

- **HMS** — Add Nanome from **Apps & Content** > **Discover Apps** in Device
  Manager, or upload the APK as a private app.
- **ArborXR** — Upload the APK to **Content Library** and assign it to a device
  group.
- **ManageXR** — Save Nanome in HMS Discover Apps and import the exported list
  under **VR Content** > **Add Content** > **Meta Horizon Store Apps**, or
  upload the APK under VR Content.

Nanome added from the Meta managed store updates through Meta. An uploaded APK
stays on its version until IT uploads a newer build, which keeps headsets
matched to a private Nanome server.

[Download the Quest APK](https://nanome.ai/versions)
· [MDM setup guides →](#mdm-setup)

</ChooserResult>

<ChooserResult when="method=mdm device=galaxy" verdict="Upload the Android XR APK to the MDM">

HMS manages Meta Quest only. ArborXR and ManageXR both manage Samsung Galaxy XR
headsets; ManageXR enrolls them over USB with its Device Setup Tool for now and
can't lock them into kiosk mode yet.

<Steps>

1. Download the Android XR APK.
2. Upload it to the MDM's app library and assign it to the Galaxy XR headsets.

</Steps>

For Managed Google Play deployments, such as through Microsoft Intune,
[support@nanome.ai](mailto:support@nanome.ai) has the current guidance.

[Download the Android XR APK](https://nanome.ai/versions)
· [MDM setup guides →](#mdm-setup)

</ChooserResult>

<ChooserResult when="method=mdm device=windows" verdict="Not managed this way">

Headset MDMs don't manage Windows PCs. Nanome for Windows is a direct download.

</ChooserResult>

<ChooserResult when="method=mdm device=visionpro" verdict="Not managed this way">

The Vision Pro beta installs through Apple TestFlight.

</ChooserResult>

<ChooserResult when="method=sideload device=meta" verdict="Sideload the Quest APK">

<Steps>

1. Turn on **Developer Mode** for the headset in the Meta Horizon phone app,
   under **Headset Settings**. Meta requires a verified developer account for
   this.
2. Connect the headset to a computer with a USB-C data cable. In the headset,
   open **Settings** > **Developer**, turn on **MTP Notification**, and allow
   USB debugging with **Always allow from this computer**.
3. Install the APK with
   [Meta Quest Developer Hub](https://developers.meta.com/horizon/documentation/unity/ts-mqdh-deploy-build/)
   (**Device Manager** > **Apps** > **Add Build**) or
   [SideQuest](https://sidequestvr.com/setup).
4. Open Nanome from **Library** > **Unknown Sources**.

</Steps>

Sideloaded apps don't update themselves, so each new release installs the same
way.
[Meta's developer mode guide](https://developers.meta.com/horizon/documentation/native/android/mobile-device-setup/)

[Download the Quest APK](https://nanome.ai/versions)

</ChooserResult>

<ChooserResult when="method=sideload device=galaxy" verdict="Sideload the Android XR APK">

<Steps>

1. Open nanome.ai/setup in the headset's browser and download the Android XR APK.
2. Allow installs from unknown sources when Android asks, then install.

</Steps>

Sideloaded apps don't update themselves, so each new release installs the same
way.

[Download the Android XR APK](https://nanome.ai/versions)

</ChooserResult>

<ChooserResult when="method=sideload device=windows" verdict="Download and run the Windows build">

<Steps>

1. Check the PC against
   [Meta's Link requirements](https://www.meta.com/help/quest/140991407990979/)
   and install the Meta Horizon Link app.
2. Unzip the download and connect a Quest with a Link cable or Air Link.
3. Open Nanome. If Windows SmartScreen appears, choose **More info** >
   **Run anyway**.

</Steps>

[Download for Windows](https://nanome.ai/versions)

</ChooserResult>

<ChooserResult when="method=sideload device=visionpro" verdict="Not installed this way">

Vision Pro apps install through Apple, and the Nanome beta is on TestFlight.

</ChooserResult>

</Chooser>

<Callout type="note" title="Looking for prior versions?">

Nanome Classic downloads, earlier Nanome builds for version-matched enterprise
deployments, and the full release notes are on the
[Versions page](https://nanome.ai/versions).

</Callout>

## Accounts & licenses {#account}

<p class="chapter-kicker">Step 6 of 7 · Accounts and licenses</p>

Each user signs in with their own Nanome account, even on a shared headset.
Users work in the web app at app.nanome.ai, and admins manage licenses and
organization membership at home.nanome.ai.

### Two sites, two jobs

<CardGrid :cols="2">

<Card title="app.nanome.ai" meta="The Nanome web app" href="https://app.nanome.ai/register" cta="Create an account">

Where users create their Nanome account, with an email or a Google, Microsoft,
Apple, or SSO sign-in. It's also where the work lives: projects and workspaces,
structures loaded by PDB ID or dragged in from a computer, and sharing by link,
8-digit code, or email invite.

New accounts include a 14-day Full license trial.

</Card>

<Card title="home.nanome.ai" meta="License management" href="https://home.nanome.ai" cta="Open home.nanome.ai">

Where admins assign and reassign licenses, invite members to the organization,
set up single sign-on, download invoices under Billing, and turn on two-factor
authentication.

</Card>

</CardGrid>

<vimg src="setup/accounts/enable-2fa.jpg" />

*Account Settings > Security. See [Two Factor Auth](/home.nanome.ai/twofactorauth).*

### Getting a team ready

<AccordionGroup label="4 steps">

<Accordion title="1. An account for each user" teaser="Created at app.nanome.ai, with a 14-day Full trial.">

Each user creates a Nanome account at app.nanome.ai, including users who share
a headset. Every new account starts with a 14-day Full license trial.

</Accordion>

<Accordion title="2. A seat that includes XR" teaser="Headset use takes a Collab or Full seat.">

Working in a headset takes a Collab or Full seat. The Free Web Seat covers 3
workspaces in the browser and view-only collaboration.

</Accordion>

<Accordion title="3. Licenses once the trial ends" teaser="Seats and pricing, or a quote from the Nanome team.">

After the trial, headset access continues on a paid seat. The pricing page
lists what each seat includes, and the Nanome team quotes volume and academic
pricing by email.

[Plans and seats](https://nanome.ai/pricing)
· [Ask for a quote](mailto:support@nanome.ai)

</Accordion>

<Accordion title="4. Licenses assigned by an admin" teaser="Assigned at home.nanome.ai by account email.">

An admin assigns licenses in home.nanome.ai under **Licenses** >
**Assign Users**, using each user's account email. The license activates once
that user confirms the email Nanome sends.

<vimg src="setup/accounts/assign-licenses.jpg" />

*Licenses > Assign Users. See [Licenses](/home.nanome.ai/licenses).*

</Accordion>

</AccordionGroup>

<Callout type="note" title="Enterprise rollouts">

Enterprise rollouts start with a dedicated license-admin account (for example,
CompanyName-admin) registered at home.nanome.ai and shared with the Nanome
team, who add the organization's licenses to it.

</Callout>

Related pages: [Web App Basics](/nanome_web/basics)
· [Licenses](/home.nanome.ai/licenses)
· [home.nanome.ai overview](/home.nanome.ai/overview_home_nanome)
· [Plans and seats](https://nanome.ai/pricing)

## Log in {#login}

<p class="chapter-kicker">Step 7 of 7 · Signing in on a headset</p>

The headset login screen has 2 tabs: Code, for a short code confirmed from a
phone or laptop, and Password, for a username and password typed in the headset.

### Two ways in

<AccordionGroup label="2 ways to log in on a headset">

<Accordion title="Log in with a code" teaser="Quickest in a headset, and the sign-in for SSO accounts.">

<Steps>

1. On the headset's login screen, open the **Code** tab. Nanome shows a short
   code.
2. On a phone or computer, sign in at app.nanome.ai and choose
   **Login via Device Code**.
3. Enter the code. The headset signs in to that account.

</Steps>

Each code signs in one user's account. Accounts that use single sign-on (SSO)
sign in to headsets this way.

</Accordion>

<Accordion title="Log in with username and password" teaser="The Password tab on the headset's login screen.">

<Steps>

1. On the **Password** tab, enter the Nanome username and password, then choose
   **Log in**.
2. **Create Account** on the same screen starts a new account with a 14-day free
   trial.

</Steps>

Forgotten passwords are reset at home.nanome.ai.

[Login screen guide →](/nanome_v2/login)

</Accordion>

</AccordionGroup>

<Callout type="note" title="Shared headsets">

On shared headsets, **Log Out** sits at the bottom of the Settings tab, so the
next user starts with their own account.

</Callout>

### Next

Headsets are set up and everyone can sign in. The
[Session Guide](/session-guide#plan) picks up from there: planning a session,
building a workspace, and running it with a group.

<style scoped>
.lineup {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 28px 0;
}

.lineup figure {
  margin: 0;
  padding: 18px;
  border: 1px solid var(--n-border);
  border-radius: var(--n-radius-lg);
  background: var(--n-surface);
  text-align: center;
}

.lineup img {
  display: block;
  width: 100%;
  max-width: 190px;
  height: 130px;
  margin: 0 auto 12px;
  border: 0;
  object-fit: contain;
}

.lineup figcaption {
  color: var(--n-text);
  font-size: var(--n-text-sm);
  font-weight: 600;
}

@media (max-width: 640px) {
  .lineup {
    grid-template-columns: 1fr;
  }
}
.hosts {
  margin: 16px 0;
  padding: 0;
  list-style: none;
}

.hosts li {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 4px 12px;
  padding: 8px 0;
  border-top: 1px solid var(--n-border-soft);
}

.hosts li::before {
  display: none;
}

.hosts code {
  flex-shrink: 0;
}

.hosts span {
  color: var(--n-text-faint);
  font-size: var(--n-text-sm);
}
</style>
