---
title: Troubleshooting
---

# Troubleshooting

Fixes for trouble logging in, network ports, firewalls and sound.

<IconGrid label="Troubleshooting topics">
<IconCard icon="wifi" title="Ports Nanome needs" href="#ports">What each machine or headset has to reach to log in.</IconCard>
<IconCard icon="plug-connected" title="Oculus and Steam" href="#oculus-and-steam">Ports for the Oculus and Steam apps themselves.</IconCard>
<IconCard icon="lock" title="Quest on a VPN" href="#vpn">Using a Quest on a VPN network.</IconCard>
<IconCard icon="brand-windows" title="Windows Firewall" href="#firewall">Allow Nanome through the firewall.</IconCard>
<IconCard icon="volume" title="No sound" href="#audio">Audio fixes for Windows, Oculus, Vive and Nanome.</IconCard>
</IconGrid>

## <AppIcon name="wifi" /> Trouble logging in: ports Nanome needs {#ports}

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

## <AppIcon name="plug-connected" /> Oculus and Steam {#oculus-and-steam}

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

[Oculus for Business FAQ](https://developer.oculus.com/documentation/ofb/latest/concepts/ofb-developer-reference/)

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

## <AppIcon name="lock" /> Using a Quest on a VPN network {#vpn}

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

## <AppIcon name="brand-windows" /> Allow Nanome through Windows Firewall {#firewall}

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

### Find Nanome.exe {#find-nanome-exe}

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

## <AppIcon name="volume" /> Trouble hearing anything? {#audio}

- Windows: [How to fix Windows audio](https://support.microsoft.com/en-us/help/4520288/windows-10-fix-sound-problems)
- Oculus: [How to fix Oculus audio](https://support.oculus.com/948087951934283/)
- Vive: [How to fix Vive audio](https://www.vive.com/uk/support/vive/category_howto/no-audio-while-using-extension-cable.html)
- Windows and Oculus audio work, but there's no sound in Nanome: [Settings in Nanome](/nanome1x/navigating#settings)
