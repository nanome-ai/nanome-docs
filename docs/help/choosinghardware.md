---
title: Choosing Hardware
pageClass: n-wide
---

# Choosing Hardware

<Callout type="note" title="Nanome v2, as of v2.6.1">

This page covers the current release of Nanome. For Nanome Classic (v1.24), see
[Choosing Hardware (Nanome Classic)](/help/choosinghardware-classic).

</Callout>

Nanome v2 runs on Meta Quest 3 and 3S, Apple Vision Pro, Samsung Galaxy XR,
Windows PCs over Meta Link (PCVR), and in any modern browser at
[app.nanome.ai](https://app.nanome.ai). Setting up a fleet of headsets is
covered step by step in [Getting Started](/getting-started).

## Nanome Headset Comparison Matrix

<table class="matrix">
  <thead>
    <tr>
      <th></th>
      <th colspan="3">All-in-one headsets (no PC)</th>
      <th>PCVR</th>
      <th>Web</th>
    </tr>
    <tr>
      <th></th>
      <th>Meta Quest 3 / 3S</th>
      <th>Samsung Galaxy XR</th>
      <th>Apple Vision Pro</th>
      <th>Windows PC over Meta Link</th>
      <th>app.nanome.ai</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>Processor</th>
      <td>Snapdragon XR2 Gen 2</td>
      <td>Snapdragon XR2+ Gen 2 (same GPU as Quest 3, clocked 15% higher)</td>
      <td>Apple M2 (M5 on the late-2025 model)</td>
      <td>PC GPU: GTX 1070 minimum, RTX 3060 recommended</td>
      <td>Whatever GPU the computer has</td>
    </tr>
    <tr>
      <th>Display, per eye</th>
      <td>2,064 × 2,208 (3S: 1,832 × 1,920), 72–120 Hz</td>
      <td>3,552 × 3,840 micro-OLED, 72 Hz default, 90 Hz max</td>
      <td>~3,660 × 3,200 micro-OLED, 90–100 Hz (up to 120 Hz on M5)</td>
      <td>Set by the Quest headset</td>
      <td>Monitor</td>
    </tr>
    <tr>
      <th>Mixed reality passthrough</th>
      <td>Yes, full colour, stereoscopic (Quest 3 adds a depth sensor)</td>
      <td>Yes, full colour, stereoscopic</td>
      <td>Yes, full colour, stereoscopic</td>
      <td>No</td>
      <td>No</td>
    </tr>
    <tr>
      <th>How Nanome installs</th>
      <td>Meta Horizon Store, through an MDM, or a sideloaded APK</td>
      <td>APK, through an MDM or sideloaded (not on Google Play)</td>
      <td>Apple TestFlight beta</td>
      <td>Direct download from nanome.ai/versions</td>
      <td>Nothing to install</td>
    </tr>
    <tr>
      <th>MDM support</th>
      <td>Meta Horizon managed services (HMS); ArborXR and ManageXR on top of it</td>
      <td>ArborXR, ManageXR, Samsung Knox Manage</td>
      <td>Apple Business Manager with an Apple MDM (Jamf, Mosyle, Intune, Omnissa)</td>
      <td>Standard Windows endpoint management; headset MDMs do not manage PCs</td>
      <td>None needed</td>
    </tr>
    <tr>
      <th>MDM cost</th>
      <td>HMS is free; ArborXR and ManageXR from $7 per headset per month</td>
      <td>ArborXR and ManageXR from $7 per headset per month</td>
      <td>Depends on the MDM; Mosyle Business is free up to 30 devices, Jamf Now for the first 3</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <th>Shared headset without a personal store account</th>
      <td>Yes, HMS Shared Mode</td>
      <td>Yes, once enrolled in an MDM</td>
      <td>Yes, once enrolled through an Apple MDM</td>
      <td>—</td>
      <td>—</td>
    </tr>
    <tr>
      <th>Offline installation</th>
      <td>No</td>
      <td>No</td>
      <td>No</td>
      <td>The installer runs offline; signing in needs a network</td>
      <td>No</td>
    </tr>
    <tr>
      <th>Signing in</th>
      <td>Code, or username and password</td>
      <td>Code, or username and password</td>
      <td>Code, or username and password</td>
      <td>Code, or username and password</td>
      <td>Email, Google, Microsoft, Apple, or SSO</td>
    </tr>
    <tr>
      <th>Seat needed</th>
      <td>Collab or Full</td>
      <td>Collab or Full</td>
      <td>Collab or Full</td>
      <td>Collab or Full</td>
      <td>Free Web Seat covers 3 workspaces and view-only collaboration</td>
    </tr>
    <tr>
      <th>Price (US, September 2026)</th>
      <td>Quest 3 $599.99; Quest 3S from $349.99</td>
      <td>$1,799</td>
      <td>From $3,699</td>
      <td>A VR-ready PC, a Quest, and a Link cable ($30–100)</td>
      <td>Free</td>
    </tr>
    <tr>
      <th>Where to buy</th>
      <td><a href="https://www.meta.com/quest/quest-3/">Meta</a>, Best Buy, Amazon, or preconfigured <a href="https://dashboard.vr-expert.com/order-form/a0jTg00000LTeqnIAD">Nanome kits from VR Expert</a></td>
      <td><a href="https://www.samsung.com/us/xr/galaxy-xr/">Samsung</a>, or preconfigured <a href="https://dashboard.vr-expert.com/order-form/a0jTg00000LTeqnIAD">Nanome kits from VR Expert</a></td>
      <td><a href="https://www.apple.com/apple-vision-pro/">Apple</a></td>
      <td><a href="https://www.meta.com/help/quest/140991407990979/">Meta Link requirements</a></td>
      <td>—</td>
    </tr>
  </tbody>
</table>

Prices are list prices at the time of writing and change; the links above carry
the current figure. MDM details, enrollment steps and network requirements are
in [Getting Started](/getting-started#mdm).

## Headsets Not Supported

**Meta Quest 1**, originally sold as Oculus Quest, is not supported. Nanome v2
targets Meta Quest 3 and 3S; Quest 2 and Quest Pro run Nanome Classic (v1.24),
covered on the [Classic hardware page](/help/choosinghardware-classic).

## Nanome All-In-One vs PCVR vs Web Comfort Comparison

The tables below show how much structure each platform shows comfortably. Please
also note the following:

1. 'Shown Atom Count' only refers to the count of atoms displayed in the
   workspace. Larger structures can be loaded within the workspace and hidden.
2. Surfaces (on/off), secondary structures (ribbons on/off), and supplemental
   materials (PDF/JPEGs, whiteboards, web browsers, labels) all affect
   performance in different ways significantly. The 'Shown Atom Count' column
   is given assuming nothing else is displayed in the scene.
3. Desktop is assumed to be "VR ready"; see the
   [minimum and recommended PC specs](/help/pchardware).
4. Web performance depends entirely on the computer's GPU, so the Web column
   has no single rating. The example column shows an Apple M1 Max (32-core
   GPU); a lower-end laptop GPU will sit a band or two lower, and a desktop GPU
   higher.
5. Samsung Galaxy XR ratings are a projection, not a measurement. Its chip
   carries the same GPU as the Quest 3 clocked 15% higher, but drives about
   three times as many pixels at a 72 Hz default, so the extra headroom goes to
   the displays. Its 16 GB of memory (Quest 3: 8 GB) helps large structures
   load, not how many atoms render comfortably.

### Comfort Legend

<table class="legend">
  <thead>
    <tr>
      <th>Comfortability</th>
      <th>Frames Per Second (FPS)</th>
    </tr>
  </thead>
  <tbody>
    <tr><td class="rate-good">Comfortable</td><td>72 FPS +</td></tr>
    <tr><td class="rate-ok">Moderate</td><td>60 FPS +</td></tr>
    <tr><td class="rate-bad">Not recommended</td><td>30 FPS or less</td></tr>
  </tbody>
</table>

### Comfort Comparison XR

<table class="comfort">
  <thead>
    <tr>
      <th>Shown Atom Count<sup>1,2</sup></th>
      <th>Meta Quest 3 / 3S</th>
      <th>Samsung Galaxy XR<sup>5</sup></th>
      <th>Apple Vision Pro</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>7,500</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-good">Comfortable (projected)</td>
      <td class="rate-good">Comfortable</td>
    </tr>
    <tr>
      <td>10,000</td>
      <td class="rate-ok">Moderate</td>
      <td class="rate-ok">Moderate (projected)</td>
      <td class="rate-good">Comfortable</td>
    </tr>
    <tr>
      <td>15,000</td>
      <td class="rate-bad">Not recommended</td>
      <td class="rate-bad">Not recommended (projected)</td>
      <td class="rate-good">Comfortable</td>
    </tr>
    <tr>
      <td>20,000</td>
      <td class="rate-bad">Not recommended</td>
      <td class="rate-bad">Not recommended (projected)</td>
      <td class="rate-good">Comfortable</td>
    </tr>
    <tr>
      <td>30,000</td>
      <td class="rate-bad">Not recommended</td>
      <td class="rate-bad">Not recommended (projected)</td>
      <td class="rate-bad">Not recommended</td>
    </tr>
    <tr>
      <td>100,000</td>
      <td class="rate-bad">Not recommended</td>
      <td class="rate-bad">Not recommended (projected)</td>
      <td class="rate-bad">Not recommended</td>
    </tr>
    <tr>
      <td>100,000+</td>
      <td class="rate-bad">Not recommended</td>
      <td class="rate-bad">Not recommended (projected)</td>
      <td class="rate-bad">Not recommended</td>
    </tr>
  </tbody>
</table>

### Comfort Comparison PC & Web

<table class="comfort">
  <thead>
    <tr>
      <th></th>
      <th>PCVR</th>
      <th colspan="2">Web</th>
    </tr>
    <tr>
      <th>Shown Atom Count<sup>1,2</sup></th>
      <th>Windows PC over Meta Link<sup>3</sup></th>
      <th>app.nanome.ai, any computer<sup>4</sup></th>
      <th>Example: Apple M1 Max<sup>4</sup></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>7,500</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-gpu">Depends on GPU</td>
      <td class="rate-good">Comfortable</td>
    </tr>
    <tr>
      <td>10,000</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-gpu">Depends on GPU</td>
      <td class="rate-good">Comfortable</td>
    </tr>
    <tr>
      <td>15,000</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-gpu">Depends on GPU</td>
      <td class="rate-good">Comfortable</td>
    </tr>
    <tr>
      <td>20,000</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-gpu">Depends on GPU</td>
      <td class="rate-good">Comfortable</td>
    </tr>
    <tr>
      <td>30,000</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-gpu">Depends on GPU</td>
      <td class="rate-good">Comfortable</td>
    </tr>
    <tr>
      <td>100,000</td>
      <td class="rate-good">Comfortable</td>
      <td class="rate-gpu">Depends on GPU</td>
      <td class="rate-ok">Moderate</td>
    </tr>
    <tr>
      <td>100,000+</td>
      <td class="rate-gpu">Depends on GPU model</td>
      <td class="rate-gpu">Depends on GPU</td>
      <td class="rate-gpu">Depends on GPU model</td>
    </tr>
  </tbody>
</table>

Keeping a session inside these numbers is covered in
[Keep it comfortable](/session-guide#comfort): hide what a scene does not need,
step surfaces down a density, and show one atomistic representation per
component.
