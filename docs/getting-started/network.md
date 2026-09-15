---
title: Wi-Fi & network
---

<script setup>
import { NANOME_HOSTS, NETWORK_ALLOWLIST } from '../.vitepress/data/setup-network.js'
</script>

# A network Nanome can reach

Headsets need Wi-Fi with direct internet access and a short list of hostnames
allowed through the firewall. The checklist below is written to hand straight
to IT.

## Six checks for IT

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

<style scoped>
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
