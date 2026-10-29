---
title: Environment
---

# Environment

The Nanome XR environment is a floor with a skybox around it, with the structures in the middle.

<IconGrid label="Environment">
<IconCard icon="view-360" title="Skybox and floor" href="#skybox-and-floor">Themes, night mode, the floor and passthrough.</IconCard>
<IconCard icon="target" title="Central Structure Area" href="#central-structure-area">Where every structure loads.</IconCard>
<IconCard icon="droplet" title="Pointers" href="#pointers">Everyone sees a pointer on the same feature.</IconCard>
<IconCard icon="users-group" title="Avatars" href="#avatars">Who's in the room. Hidden by default.</IconCard>
</IconGrid>

## <AppIcon name="view-360" /> Skybox and floor {#skybox-and-floor}

Since release 2.7 the skyboxes are procedurally generated mountains in the colors of each theme, in day and night versions.

They're set in the [Settings tab](/nanome_v2/mainpanel#settings-tab):

<UiList label="Environment settings">
<UiItem icon="moon" name="Night mode">Switches the skybox between its day and night versions.</UiItem>
<UiItem icon="view-360" name="Floor">Shows or hides the floor overlay.</UiItem>
<UiItem name="Skybox theme">Sets the theme.</UiItem>
<UiItem icon="scan-eye" name="Passthrough">Mixed reality: the real room shows around the structures.</UiItem>
</UiList>

<vimg src="nanome-v2/v2-7/skybox-themes.webp" alt="The seven skybox themes, by day and by night" />

## <AppIcon name="target" /> Central Structure Area {#central-structure-area}

All structures load into the central structure area. Moving the central area moves and scales every structure together.

<UiList label="Moving structures and yourself">
<UiItem name="Position Molecules">At the bottom of the Components tab: lets each structure be moved on its own.</UiItem>
<UiItem icon="target" name="Recenter Self" href="/nanome_v2/scenespanel#scene-settings">In the Scene settings: resets your position as the viewing origin.</UiItem>
</UiList>

## <AppIcon name="droplet" /> Pointers {#pointers}

Pointers are positioned relative to the structures. As someone moves their controllers around a structure, everyone in the session sees their pointer pointing at the same structural feature. A pointer shows its owner's name, and when you follow someone, their pointer also shows the tool they're using.

Pointing at an interaction, a measurement or a text note shows a tooltip with its details.

## <AppIcon name="users-group" /> Avatars {#avatars}

An avatar is an object for the person's head, with their name and current scene above it, and abstract shapes for their hands. In a session, avatars are laid out in a circle around the central structure area as people arrive. They show who's in the room, and the pointers do the signalling on the structure.

<UiList label="Avatar setting">
<UiItem icon="users-group" name="Show other user Avatars">In the Settings tab: turns avatars on. They're hidden by default since release 2.6.</UiItem>
</UiList>

Nanome Web doesn't show avatars.
