---
title: MDM setup guides
---

# Setting up an MDM

Enrollment happens during a headset's first-time setup, so it comes before apps
and accounts. Each guide covers signing up, enrolling headsets, and pushing
Nanome.

<Callout type="warning" title="Before new headsets are switched on">

Enrollment happens during a headset's first-time setup, and that setup needs a
working Wi-Fi network ([Wi-Fi & network](/getting-started/network)). On Meta
Quest, a headset already signed in to a personal Meta account needs a factory
reset before it can enroll.

</Callout>

## Choose a service

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
