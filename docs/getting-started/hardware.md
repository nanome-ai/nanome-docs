---
title: Hardware
---

# Headsets, and where to buy them

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

## Where to buy

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
([Choose an MDM](/getting-started/choose-an-mdm)).

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
</style>
