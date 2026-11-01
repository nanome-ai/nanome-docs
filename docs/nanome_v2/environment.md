---
title: Environment
---

# Environment

The Nanome XR environment is a floor with a skybox around it, with the structures in the middle.

<ScreenMap src="nanome-v2/v2-7/xr-environment.webp" alt="The view from a headset: a structure in the middle, two other people's avatars beside it, and a pointer at the tip of each of your controllers" label="The Nanome XR environment">
<MapCard icon="view-360" title="Skybox" href="#skybox-and-floor" side="top" area="0,0,100,50">Mountains in your theme's colors, by day or by night, or plain black in Pure Black. Passthrough shows your room instead.</MapCard>
<MapCard icon="users-group" title="Avatars" href="#avatars" side="top" area="29.8,32.4,9.0,19.2;59.9,35.0,8.6,18.6">A head and hands for each person in the session. Off to start.</MapCard>
<MapCard icon="tag" title="Name tag" href="#avatars" side="top" area="60.4,35.0,7.7,3.2;30.3,32.6,7.7,2.8">Their name, their mic, and the number of the scene they're in.</MapCard>
<MapCard icon="droplet" title="Pointer" href="#pointers" side="bottom" area="68.4,77.0,4.2,7.0;13.1,73.0,4.5,7.0">At the tip of each controller. Everyone in the same scene sees it on the same part of the structure.</MapCard>
<MapCard icon="view-360" title="Floor" href="#skybox-and-floor" side="bottom" area="0,50,100,50">A grid under the structures. It can be turned off.</MapCard>
</ScreenMap>

## <AppIcon name="view-360" /> Skybox and floor {#skybox-and-floor}

Since release 2.7 the skyboxes are procedurally generated mountains in the colors of each theme, in day and night versions. Pure Black is a plain black sky.

<ShotRow src="nanome-v2/v2-7/settings-tab.webp" alt="The top of the Settings tab, with night mode, floor, theme and passthrough" crop="0,6.6,100,10.65">

They're set at the top of the [Settings tab](/nanome_v2/mainpanel#settings-tab):

<UiList label="Environment settings">
<UiItem icon="moon" name="Night mode" area="4.4,9.1,6.9,5.3">Switches the skybox between its day and night versions, when Passthrough is off. On to start. The icon is a sun while it's off.</UiItem>
<UiItem icon="view-360" name="Floor" area="12.0,9.1,6.9,5.3">Shows or hides the floor overlay. The icon is crossed out while the floor is hidden.</UiItem>
<UiItem name="Skybox theme" area="19.7,9.2,25.2,5.1">7 themes, each with a day and a night version except Pure Black.</UiItem>
<UiItem icon="scan-eye" name="Passthrough" area="50.9,9.1,44.4,5.3">Mixed reality: the real room shows around the structures. On to start where the headset supports it, grayed out where it doesn't. While it's on, Night mode, Floor and Skybox theme are grayed out.</UiItem>
</UiList>

</ShotRow>

The view below shows each theme from a headset, by day and by night.

<ThemeDemo app="xr" />

## <AppIcon name="droplet" /> Pointers {#pointers}

Pointers are positioned relative to the structures. As someone moves their controllers around a structure, everyone in the same scene sees their pointer on the same structural feature. The pointers of people in another scene are hidden. A pointer shows its owner's name, and the name of the tool they're holding when it isn't the Pointer.

With the Pointer, pointing at an interaction, a measurement or a text note shows a tooltip with its details.

## <AppIcon name="users-group" /> Avatars {#avatars}

An avatar is a shape for the person's head, with a name tag above it, and abstract shapes for their hands. The name tag shows their name, whether their mic is on, and the number of the scene they're in. In a session, avatars are laid out in a circle around the structures as people arrive. They show who's in the room, and the pointers do the signaling on the structure.

<UiList label="Avatar setting">
<UiItem icon="users-group" name="Show other user Avatars">In the Settings tab: turns avatars on. They're hidden by default since release 2.6.</UiItem>
</UiList>

Nanome Web doesn't show avatars.
