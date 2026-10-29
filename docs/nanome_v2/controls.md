---
outline: [2, 3]
title: Controls
---

# Controls

How to grab, move and scale structures, open the Main Panel, point, select and mute in Nanome XR, on each headset.

<IconGrid label="Controls by device" :cols="3">
<IconCard icon="hand-grab" title="Grab, move and scale" href="#grab-move-and-scale">The same on every headset.</IconCard>
<IconCard icon="headset" title="Quest controllers" href="#meta-quest-controllers">Every button, hand by hand.</IconCard>
<IconCard icon="hand-stop" title="Left-handed mode" href="#left-handed-mode">Swaps which hand does what.</IconCard>
<IconCard icon="hand-finger" title="Hand tracking" href="#hand-tracking">Pinch and touch, on Quest and Galaxy XR.</IconCard>
<IconCard icon="device-vision-pro" title="Apple Vision Pro" href="#apple-vision-pro">Look and pinch.</IconCard>
</IconGrid>

## <AppIcon name="hand-grab" /> Grab, move and scale {#grab-move-and-scale}

A grab is the grip button on a controller, or a pinch with hand tracking and on Vision Pro.

<UiList label="Grabbing">
<UiItem icon="hand-grab" name="Grab">Moves and turns the whole workspace with your hand: all the structures together.</UiItem>
<UiItem icon="arrows-maximize" name="Grab with both hands">Hands apart makes the structures bigger, hands together smaller, from a tenth to ten times Nanome's default size.</UiItem>
<UiItem icon="refresh" name="Turn both hands" href="/nanome_v2/mainpanel#settings-tab">While grabbing with both hands, turning the hands around each other rotates the workspace. Off when Allow two-handed grab rotation is off in Settings.</UiItem>
<UiItem icon="arrows-move" name="Position Molecules" href="/nanome_v2/mainpanel#components-tab">At the bottom of the Components tab. While it's on, grabbing a structure moves only that one. Scaling still sizes them all. Editors only.</UiItem>
<UiItem icon="lock-open" name="Grab the Main Panel" href="/nanome_v2/mainpanel">Moves the panel, unless Lock menu position is on.</UiItem>
</UiList>

The thumbsticks don't walk or turn you. To get closer to a structure, grab the workspace and pull it toward you.

## <AppIcon name="headset" /> Meta Quest controllers {#meta-quest-controllers}

The right hand is the dominant hand to start: it holds the current tool. The left is the off hand, with the menu shortcuts and the [Wrist Menu](/nanome_v2/wristmenu). [Left-handed mode](#left-handed-mode) swaps them.

### Either controller

<UiList label="Either controller">
<UiItem icon="hand-click" name="Trigger, on a panel">Presses the button the pointer is on.</UiItem>
<UiItem icon="hand-grab" name="Grip" href="#grab-move-and-scale">Grabs.</UiItem>
<UiItem icon="arrows-sort" name="Thumbstick, on a panel">Scrolls the panel.</UiItem>
<UiItem icon="circle-dot" name="Thumbstick press">While held, outlines that hand's pointer in your color. Others in the workspace see the outline too, which makes it a way to point something out.</UiItem>
</UiList>

### Right hand (dominant) {#dominant-hand}

<UiList label="Dominant hand">
<UiItem icon="droplet" name="Trigger" href="/nanome_v2/toolspanel">Away from panels, uses the current tool. With the Pointer, selects or deselects the residue under the pointer.</UiItem>
<UiItem icon="x" name="Trigger, aimed at the sky">Clears the selection, in any tool. The pointer has to aim within 30° of straight up, with nothing under it.</UiItem>
<UiItem icon="chevron-right" name="Thumbstick left or right">Away from panels, switches the current tool's mode, for example between Distance, Angle and Dihedral. In the Residue Editor, steps through rotamers.</UiItem>
<UiItem name="A and B">Not used.</UiItem>
</UiList>

The current tool's icon shows on this controller. For a tool with several modes, the mode shows beside it, between arrows that light up as the thumbstick switches it.

### Left hand (off hand) {#off-hand}

<UiList label="Off hand">
<UiItem icon="menu-2" name="Menu button" href="/nanome_v2/mainpanel">Shows or hides the Main Panel, in front of you. Same as the big Wrist Menu button.</UiItem>
<UiItem icon="microphone" name="X" href="/nanome_v2/wristmenu#mute">Mutes or unmutes your mic. Same as the Wrist Menu's mic button, and does nothing while that button is grayed out.</UiItem>
<UiItem icon="sparkles" name="Y" href="/mara/overview">Opens MARA, already listening. Pressing it again while MARA listens closes MARA and drops the recording. Needs a loaded workspace and Editor access.</UiItem>
<UiItem icon="droplet" name="Trigger" href="/nanome_v2/toolspanel#pointer">Always the Pointer: selects or deselects the residue under this hand's pointer, whatever tool the right hand holds.</UiItem>
</UiList>

## <AppIcon name="hand-stop" /> Left-handed mode {#left-handed-mode}

**Left-handed mode**, in the [Settings tab](/nanome_v2/mainpanel#settings-tab), makes the left hand dominant. The tool and its display move to the left controller, and the Wrist Menu to the right wrist.

| | Right-handed (to start) | Left-handed |
|---|---|---|
| Current tool | Right trigger and thumbstick | Left trigger and thumbstick |
| Off-hand Pointer | Left trigger | Right trigger |
| Main Panel | Menu button or Wrist Menu | Wrist Menu |
| Mute | X | A |
| MARA | Y | B |
| Wrist Menu | Left wrist | Right wrist |

<Callout type="note" title="No Menu button on the right">

Nanome reads the Menu button on the off-hand controller. In the same place, the right Quest controller has the Meta button, which the headset keeps for itself. In left-handed mode the Main Panel opens from the Wrist Menu.

</Callout>

## <AppIcon name="hand-finger" /> Hand tracking {#hand-tracking}

Nanome reads hands the same way on Quest and Galaxy XR.

<UiList label="Hand gestures">
<UiItem icon="hand-grab" name="Pinch" href="#grab-move-and-scale">Thumb and index finger together. Grabs, like the grip. With the hand's ray on a panel, presses the button.</UiItem>
<UiItem icon="arrows-maximize" name="Pinch with both hands" href="#grab-move-and-scale">Scales and rotates, like grabbing with both controllers.</UiItem>
<UiItem icon="hand-finger" name="Point">Index finger out, the other fingers curled. Hides the hand's ray. A fingertip also presses panel buttons by touching them.</UiItem>
<UiItem icon="menu-2" name="Wrist Menu" href="/nanome_v2/wristmenu">On the off-hand wrist. A touch from the other hand opens the Main Panel or MARA, or mutes your mic.</UiItem>
</UiList>

<Callout type="note" title="Tools follow the controller trigger">

Selecting with the Pointer and the tools in the [Tools Panel](/nanome_v2/toolspanel) respond to the controller trigger, and the Menu, X and Y shortcuts to controller buttons.

</Callout>

### <AppIcon name="brand-android" /> Galaxy XR {#galaxy-xr}

Hand tracking on Galaxy XR needs the headset's hand-tracking permission for Nanome. Nanome checks it when it starts, so a permission allowed later takes effect the next time Nanome opens.

## <AppIcon name="device-vision-pro" /> Apple Vision Pro {#apple-vision-pro}

Nanome on Vision Pro is a [TestFlight beta](/getting-started#install), and uses the visionOS pinch.

<UiList label="Vision Pro gestures">
<UiItem icon="hand-grab" name="Look and pinch" href="#grab-move-and-scale">Looking at a structure and pinching grabs the workspace, and moving the hand moves it. Reaching out and pinching a structure directly does the same.</UiItem>
<UiItem icon="arrows-maximize" name="Pinch with both hands" href="#grab-move-and-scale">Scales and rotates.</UiItem>
<UiItem icon="window-maximize" name="Windows">Nanome's panels are visionOS windows: look at a button and pinch.</UiItem>
</UiList>

The Vision Pro beta has no Wrist Menu, tool display or button shortcuts.
