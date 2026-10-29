---
title: Troubleshooting
outline: [2, 3]
---

# Troubleshooting

Fixes for Nanome XR and Nanome Web: sign-in messages, the device limit, licenses, the network and sound. The ports, VPN and firewall steps for Nanome Classic (v1.24) are in [their own section](#classic) at the end.

<IconGrid label="Troubleshooting topics" :cols="3">
<IconCard icon="alert-triangle" title="Sign-in messages" href="#sign-in">What each message means, and what to do next.</IconCard>
<IconCard icon="devices" title="Device limit" href="#device-limit">One device at a time for each account.</IconCard>
<IconCard icon="license" title="License" href="#license">No license for Nanome XR, or one about to expire.</IconCard>
<IconCard icon="wifi" title="Network" href="#network">Checks to run before calling IT.</IconCard>
<IconCard icon="volume" title="No sound" href="#audio">Your mic, muted people and device audio.</IconCard>
<IconCard icon="headset" title="Nanome Classic" href="#classic">Ports, VPN and Windows Firewall for v1.24.</IconCard>
</IconGrid>

## <AppIcon name="alert-triangle" /> Sign-in messages {#sign-in}

Since release 2.7, the Nanome XR login screen says why a sign-in failed. **Details** shows the error code, HTTP status and time, which are worth including when you [contact support](/help/contact).

| The message is about | What to do |
| --- | --- |
| A wrong username or password | Check both. Forgotten passwords are reset at [home.nanome.ai](https://home.nanome.ai). |
| An account that has to use the Code tab | Accounts created with Google, Microsoft or Apple, accounts that use SSO, and accounts with two-factor authentication sign in with the <Btn icon="key">Code</Btn> tab. [How the Code tab works](/nanome_v2/login#code). |
| An organization IP restriction | The organization only allows sign-in from certain networks. Try again from one of them, or ask the organization's Nanome admin. |
| No license for Nanome XR | See [License](#license). |
| A network problem | See [Network](#network). |

[Login Screen](/nanome_v2/login#sign-in-messages) describes every button on the screen.

## <AppIcon name="devices" /> Device limit {#device-limit}

An account can be signed in on one device at a time.

- **A Device Limit screen at sign-in** means the account is already signed in on another device. Sign out of Nanome there, then sign in again.
- **Signed out with a notice** can mean the same account signed in on another device. An expired license also signs out with a notice (see [License](#license)).

On a shared headset, <Btn icon="outbound">Log Out</Btn> at the bottom of the [Settings tab](/nanome_v2/mainpanel#settings-tab) signs you out, so the next person starts with their own account.

## <AppIcon name="license" /> License {#license}

- **No license for Nanome XR.** Working in a headset takes a Collab or Full seat. A free license covers the browser at [app.nanome.ai](https://app.nanome.ai), with 1 owned project, 3 owned workspaces and 5 structures per workspace.
- **Assigning a seat.** An admin assigns licenses at home.nanome.ai under **Licenses** > **Assign Users**, using each user's account email. The license activates once that user confirms the email Nanome sends. Step by step: [Manage Licenses](/home.nanome.ai/licenses).
- **Expiring soon.** Nanome warns when a license will expire within 30 days. When it expires, Nanome signs out with a notice.

Every new account starts with a 14-day Full license trial. [Account Tiers](/home.nanome.ai/accounttiers) compares the seats and lists prices.

## <AppIcon name="wifi" /> Network {#network}

These checks narrow down most connection problems. The full checklist and the firewall allowlist for IT are in [Getting Started: Wi-Fi & network](/getting-started#network).

<Steps>

1. **Look at the network status.** The <AppIcon name="wifi" /> icon on the login screen shows it.
2. **Rule out a sign-in page.** Guest networks that ask for a browser sign-in (captive portals) block headset setup. A Quest also shows a no-internet message whenever it can't reach Meta, before Nanome opens.
3. **Check the firewall.** Nanome needs outbound TCP 443 to `*.nanome.ai` and `*.nanome.com`, allowed by hostname, since the servers' IP addresses change. These hosts should also be exempt from TLS/SSL inspection.
4. **Test the connection.** From the same network, `curl -v https://api.nanome.com` confirms port 443 is open (ping uses ICMP and doesn't test it). When a phone hotspot works and the office network doesn't, the office network is blocking something.

</Steps>

<Callout type="note" title="Private and on-premise deployments">

Nanome on a private cloud or on-premise server uses its own hosts and ports, covered in the [enterprise deployment guide](https://nanome.ai/deploy).

</Callout>

## <AppIcon name="volume" /> No sound {#audio}

- **Nobody can hear you.** Check <Btn icon="microphone">Mic</Btn> in the [Users tab](/nanome_v2/mainpanel#user-settings): its meter moves when your mic picks up sound. The off-hand controller's primary button (**X**, or **A** when left-handed) also mutes you.
- **You can't hear one person.** <Btn icon="volume-3">Mute</Btn> in that person's (...) menu, under **Users in workspace**, mutes them for you only. Check you haven't muted them.
- **No sound at all.** Check the device's own audio: [sound problems in Windows](https://support.microsoft.com/en-us/windows/hardware/audio/fix-sound-or-audio-problems-in-windows), or the [Meta Quest Help Center](https://www.meta.com/help/quest/).

## <AppIcon name="headset" /> Nanome Classic (v1.24) {#classic}

<Callout type="warning" title="For Nanome Classic only">

Everything in this section is for Nanome Classic (v1.24), the older app. For Nanome XR and Nanome Web, see [Network](#network) above.

</Callout>

### Ports Nanome Classic needs {#ports}

These are **required** from each machine or VR device:

| For | Port | To |
| --- | --- | --- |
| Authentication | TCP 443 | api.nanome.ai |
| Collaboration | UDP 5055-5056 | collaboration.nanome.ai, collaboration-us-east.nanome.ai and collaboration-us-west.nanome.ai |
| Plugins | TCP 8888 | plugins.nanome.ai |

These are **optional**, for molecular databases:

| For | Port | To |
| --- | --- | --- |
| Molecular databases | TCP 443 | files.rcsb.org, pubchem.ncbi.nlm.nih.gov and www.drugbank.ca |

### Oculus and Steam {#oculus-and-steam}

If the Steam or Oculus apps don't work at all, with or without Nanome, try opening these ports from each device.

<AccordionGroup label="3 port lists">

<Accordion title="Oculus" teaser="TCP 80 and 443, according to Oculus's documentation.">

TCP ports 80 and 443 for:

- oculus.com
- facebook.com
- fbcdn.net
- akamaihd.net

Oculus also recommends TCP 3478 and UDP 50000-59999 to each of these sites, but the drivers tend to work without them.

</Accordion>

<Accordion title="Oculus for Business only" teaser="TCP 443 to five more hosts.">

TCP port 443 for:

- graph.oculus.com
- graph.facebook-hardware.com
- graph.facebook.com
- mqtt.facebook.com
- my.workplace.com

</Accordion>

<Accordion title="Steam and SteamVR" teaser="TCP 80 and 443, according to Steam's documentation.">

TCP ports 80 and 443 for:

- steampowered.com
- steamcommunity.com
- steamgames.com
- steamusercontent.com
- steamcontent.com
- steamstatic.com
- akamaihd.net

Steam also recommends opening network traffic to the Steam application on UDP ports 27015-27030 and TCP ports 27015-27030.

</Accordion>

</AccordionGroup>

### Using a Quest on a VPN network {#vpn}

The Oculus Quest 2 with Oculus's v29 firmware update can run arbitrary APK files (Android apps). So you can sideload the APK of your VPN, log in, and use it as you would on an Android device. Your VPN provider has to offer an APK for this to work. We've seen it work with NordVPN, ExpressVPN, Cisco AnyConnect and several others.

<Accordion title="Older method: a VPN-enabled hotspot from a Windows 10 PC" teaser="Share a PC's VPN connection with the Quest over a mobile hotspot.">

You need:

1. An existing organizational VPN and VPN software on your PC
2. Admin access to your Windows 10 PC
3. Your VPN credentials
4. A wireless card that supports this. Check it: https://www.quora.com/How-do-i-know-if-i-have-Qualcomm-Atheros-wireless-card

Then create the VPN-enabled hotspot:

<Steps>

1. Open your VPN software, enter your credentials and connect to your VPN. Check that you have an internet connection through the VPN, and check that your IP address changed. Note the location and IP for later (https://whatismyipaddress.com/).
2. Press the Windows key and type Mobile Hotspot. Open **Mobile Hotspot**, change your Wi-Fi name and password, then turn on the hotspot.
3. Open **Control Panel** > **Network and Internet** > **Network and Sharing Center** > **Change adapter settings**.
4. Find the Ethernet # connection marked "Unidentified Network, TAP-&lt;VPNType&gt; Windows Adapter".
5. Right-click it and go to the **Sharing** tab.
6. Check allow sharing for other users in the network. From the dropdown, select your mobile hotspot connection, "Local Area Connection #". It should be labeled WiFi Direct Virtual Adapter.
7. Join the Mobile Hotspot Wi-Fi from your Oculus Quest.
8. Check that the VPN applies by checking your IP and location (https://whatismyipaddress.com/).
9. Launch Nanome behind your firewall.

</Steps>

</Accordion>

### Allow Nanome through Windows Firewall {#firewall}

<Steps>

1. In the Start menu, click **Settings**, then type Firewall in the **Find a Setting** search box.
2. Click **Windows Firewall** in the results. In the Windows Firewall window, click **Allow an App or Feature through Windows Firewall**.

   <vimg src="howto-page/Firewall1.png" alt="Allow an app or feature through Windows Firewall" />

3. In the **Allowed Apps** window, click **Change Settings**, then select the check box for Nanome.

   <vimg src="howto-page/Firewall2.png" alt="The Allowed Apps list with Nanome" />

   If Nanome isn't in the list, click **Allow another app**, then type the path to Nanome.exe or click **Browse** and select it. To find Nanome.exe, see below.

   <vimg src="howto-page/Firewall3.png" alt="The Allow another app dialog" />

4. Click **OK**, then **Close** to close the Windows Firewall window.

</Steps>

#### Find Nanome.exe {#find-nanome-exe}

<Tabs :labels="['Installed with Oculus', 'Installed with Steam']">
<Tab>

Click the three dots button, then **Details**. The location of Nanome is on the right.

<vimg src="howto-page/Path_Oculus0.png" alt="The three dots menu for Nanome in the Oculus app" />
<vimg src="howto-page/Path_Oculus1.png" alt="Nanome's install location in the Oculus app" />

</Tab>
<Tab>

Right-click Nanome in the library and click **Properties**. Select the **Local Files** tab and click **Browse Local Files** to open the folder that holds Nanome.

<vimg src="howto-page/Path_Steam0.png" alt="Nanome's Properties in the Steam library" />
<vimg src="howto-page/Path_Steam1.png" alt="The Local Files tab in Steam" />

</Tab>
</Tabs>

### Sound in Nanome Classic {#classic-audio}

- Vive headsets: [How to fix Vive audio](https://www.vive.com/uk/support/vive/category_howto/no-audio-while-using-extension-cable.html)
- Windows and headset audio work, but there's no sound in Nanome Classic: [Sound settings in the Wrist Menu](/nanome1x/navigation/wristmenu#sound)
