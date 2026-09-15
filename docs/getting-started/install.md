---
title: Download & install
---

# Downloading and installing Nanome

Nanome comes from a store, through an MDM, or as a manual download to sideload.
Picking a method and a device shows the matching download and steps, always for
the latest release.

## Pick a method and a device

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
· [MDM setup guides →](/getting-started/mdm-setup)

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
· [MDM setup guides →](/getting-started/mdm-setup)

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
