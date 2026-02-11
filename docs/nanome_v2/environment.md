---
title: Environment
---

# Environment

The current Nanome v2 virtual environment is a simple square grid floor with a 'skybox' background. It is also possible to enable MR passthrough, which will show the real world.

## Central Structure Area

All structures are loaded into the Central Structure Area. Shifting the central area will move and scale all structures as they are positioned. Using “Position Structures” enables orienting each individual structure relative to itself, changing the arrangement of the central area.

## Raycast and Pointers

<vimg src="nanome-v2/raycast.jpg" />

Pointers are always positioned relative to the structure. They display the user's name and the scene that user is currently on. As a user moves their controllers around structures, other users in the session will see their pointers. These are not connected to avatars, instead they relate to the structure(s) in the central structure area.

<vimg src="nanome-v2/pointers.png" />

## Avatars

Avatars in Nanome v2 currently consist of an object representing the user's head, with a display on top showing the user's name and scene they are currently on, and abstract shapes representing the user's hands.

In a collaboration session, avatars are automatically laid out around the central structure area in a circle pattern as more people arrive. They do not directly interact or move, instead they simply show who is in the room. The pointers are the primary way to signal on the structure.
