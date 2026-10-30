---
title: How to
---

## How to enable/disable auto height adjustment

<ShotRow src="howto-page/autoheightsetting.png" alt="The Action Menu with Auto Height Adjust selected and its Enabled toggle open">

Auto height calibration can be toggled on/off using the action menu. If users are having height issues, we recommend using this toggle to help troubleshoot the issue. By default, the toggle is off when users are in Mixed Reality Passthrough and turned on when users are in virtual reality. If height issues persist, we recommend resetting your floor height by calibrating your device. EX: with meta devices, this is done by resetting the guardian.

<UiList label="Action Menu">
<UiItem name="Auto Height Adjust" area="32.7,77.9,30.8,8.4">Opens the toggle for auto height adjustment.</UiItem>
<UiItem icon="check" name="Enabled" area="64.4,1.9,29.4,8.6">Turns auto height adjustment on or off.</UiItem>
<UiItem icon="refresh" name="Reset To Default" area="64.4,10.4,29.4,7.3">Sets the toggle back to its default.</UiItem>
</UiList>

</ShotRow>

## How to export a molecule for future access or other software

1. Select the structure you want to save.
2. On the Entry List menu, click the [Export button](/nanome1x/navigation/menus#entry-list)
3. On the menu that appears after clicking Export, select where on your computer you want to save the structure (Desktop or Documents), and then select the file format you want to export to (pdb, sdf, or mmcif).

## How to load a structure stored on local computer

1. Go to the [Load menu](/nanome1x/navigation/menus#load).
2. Click on [Files](/nanome1x/navigation/menus#my-files) and then select the location (Desktop or Documents) where you saved the structure.
3. You should then see the filename for the structure you saved. Click on the file, then click "load files".

## How to load a MD trajectory file

<video src="https://user-images.githubusercontent.com/125503369/235212408-5e740ee3-1cb3-49a3-9bd9-0cc5aba5137a.mp4" controls="controls" style="width: 100%; max-width: 720px;" loop muted playsinline></video>

Nanome supports the following MD trajectory files (v1.26): .PDB, .PSE, .DCD, .GRO, .XTC, .TRR. For trajectory support in Nanome v2, see [Supported File Formats](/nanome_web/fileformats#trajectory-molecular-dynamics). 
1. Go to the [Load menu](/nanome1x/navigation/menus#load).
2. Click on [Files](/nanome1x/navigation/menus#my-files). Navigate to the folder that contains your trajectories and press load (you may also have to multi-select the topology file for trajectories generated via Gromacs or Desmond.
If a trajectory doesn’t load properly, please try reducing its frame count and/or export as a multi-model .PDB. Additionally, please let us know some details about the problematic files and we can look into resolving them. Relevant details would include the file format type and the number of frames. Typically, the shorter the trajectory the easier time you’ll have to load it in. 
3. Once loaded, you can play the trajectory by launching the “Frame” menu with its button on the [Entry List](/nanome1x/navigation/menus#entry-list), shown in [the next section](#how-to-open-the-frame-menu-and-execute-frame-operations).

## How to open the Frame Menu and execute frame operations

<ShotRow src="navigating-page/Entry-Hierarchy.jpg" alt="The Entry List with 6LU7 loaded, and the Frame Menu button on its row" crop="0,0,35.6,100">

Find the entity containing multiple frames that you have loaded on the [Entry Menu](/nanome1x/navigation/menus#main-menus). Click on the second button from the right on the same row. This is the [Frame Menu](/nanome1x/navigation/menus#frame-data) Button.

<UiList label="Entry List row">
<UiItem name="Entity row" area="0.7,23.8,34.6,11.1">The entity you loaded, here 6LU7.</UiItem>
<UiItem name="Frame Menu" area="29.5,27.2,3.3,7.6">Second button from the right. Opens the Frame Menu.</UiItem>
</UiList>

</ShotRow>

<ScreenMap src="navigating-page/frame_menu_speeds.png" alt="The Frame Menu for 2HIU with the Playback and Edit tabs open" label="Frame Menu">
<MapCard icon="list-details" title="Frames tab" href="#how-to-swap-molecules-from-the-list-of-frames" side="left" area="1.6,14.7,24.3,8.3">Top left. Lists the frames.</MapCard>
<MapCard icon="chevron-right" title="Previous / Next frame" href="#how-to-change-frame" side="left" area="5.2,25.2,40.8,9.7">The arrow buttons on the left side.</MapCard>
<MapCard icon="tag" title="Meta Data tab" href="#how-to-show-meta-data-on-frame" side="right" area="73.9,14.7,24.3,8.3">Top right. Shows the meta data.</MapCard>
<MapCard icon="copy-plus" title="Duplicate frame" href="#how-to-duplicate-a-frame" side="right" area="53.8,66.3,40.5,11.8">On the right side.</MapCard>
</ScreenMap>

### How to change frame

Click on the arrow buttons on the left side of the [Frame Menu](/nanome1x/navigation/menus#frame-data) to change frame.

### How to duplicate a frame 

Click on the Duplicate Frame button on the right side of the [Frame Menu](/nanome1x/navigation/menus#frame-data) to duplicate the current frame.

### How to swap molecules from the list of frames

<ShotRow src="navigating-page/Entry-FrameData2.jpg" alt="The Frame Menu for 2HIU with the Frames and Meta Data tabs open">

<Steps>

1. Click on the Frames Tab Button on the top left to switch to the Frames Tab.
2. Click on one of the models in the list to switch to that molecule.

</Steps>

<UiList label="Frames tab">
<UiItem icon="list-details" name="Frames tab" area="0.7,14.0,24.7,8.3">Top left.</UiItem>
<UiItem name="Model list" area="4.6,36.0,40.9,58.1">One row per frame. Click one to switch to it.</UiItem>
</UiList>

</ShotRow>

### How to show meta data on frame

Click on the Meta Data Tab Button on the top right to switch to Meta Data Tab.

## How to access the MedChem tool and build molecules

Hold down the B Button on the right controller to bring up the [Tool Menu](/nanome1x/navigation/toolsmenu), hover the ray over the [MedChem Tool](/nanome1x/navigation/toolsmenu#medchem-tools) button to the bottom left and release B button.

### How to open the library of molecules 

Click on the [Build Menu](/nanome1x/navigation/toolsmenu#build) Tab Button on the top right of the MedChem menu on the left hand

### How to build molecules using the MedChem tool

1. Click on a structure on the [Build menu](/nanome1x/navigation/toolsmenu#build) to select it for placement.
2. Overlap the structure on the right controller with an atom on the ligand. Once a yellow outline encloses the atom(s) that you want to build on, press down trigger button on your right controller in order to place the structure.

## How to use the Measurement tool

1. Hold down the B Button on the right controller to bring up the [Tool Menu](/nanome1x/navigation/toolsmenu), hover the ray over the [Measurement Tool](/nanome1x/navigation/toolsmenu#measurement-tool) button to the top right and release B button
2. Overlap the tip of the tool with the atom that you want to measure and press trigger on the right hand controller to place a measurement point.
3. Do the same action for another atom in order to create a distance measurement between the two atoms

## How to change the color of your avatar

VR:

1. Press the Y Button on the left controller to bring up the [Action Menu](/nanome1x/navigation/actionmenu#action-menu).

Desktop:

1. Right-click anywhere in the window.

2. Click on the Settings Button at the bottom of the [Action Menu](/nanome1x/navigation/actionmenu#action-menu) to open Settings Submenu.
3. Click on the Change My Color button to change avatar color.



## How to view Windows content in Nanome

<vimg src="howto-page/WindowsContent.gif" />

When using the Oculus Rift/Rift S or Oculus Link (Quest connected to a desktop), users can take advantage of Oculus Dash to ‘pin’ windows or their entire desktop in VR and Nanome. This means users can view excel sheets, websites, and other 3rd party software while the headset is on. This way, users can seamlessly work in Nanome with their existing desktop apps. However, please note that this pinned window is not visible to other users in the same room. If you want to collaboratively view a PDF file with your colleague in Nanome, please [load](/nanome1x/navigation/menus#load) the PDF file into your workspace.

To view the documentation on how to use Oculus Dash, please visit the official oculus support page: [https://support.oculus.com/166993604065478/](https://support.oculus.com/166993604065478/)

To view a tutorial on how to use oculus dash to pin windows, we recommend this uploadVR article here: [https://uploadvr.com/oculus-dash-windows-button/](https://uploadvr.com/oculus-dash-windows-button/)

### How to capture 2D videos in Oculus Quest

To view a tutorial on how to capture 2D videos and retrieve them in Oculus Quest, we recommend this uploadVR article here: [https://uploadvr.com/how-to-transfer-screenshots-videos-quest/](https://uploadvr.com/how-to-transfer-screenshots-videos-quest/)

## How to capture 2D videos on PC

To view a tutorial on how to capture 2D videos on PC, we recommend this PCMag article here: [https://www.pcmag.com/how-to/how-to-capture-video-clips-in-windows-10](https://www.pcmag.com/how-to/how-to-capture-video-clips-in-windows-10)


## How to find the log file of a previous session

<vimg src="howto-page/LogFile.png" />

If your session crashes or you encounter any issues in Nanome, you can go to "C:\Users\\[USERNAME]\AppData\LocalLow\Nanome Inc_\Nanome\History" to retrieve the log file and send it to us at support@nanome.ai so that we can help you troubleshoot the problem.

If you are using the Oculus Quest or Oculus Quest 2 VR headsets, then you can plug your device into a computer and go to "Quest\Internal shared storage\Android\data\com.Nanome.NanomeCurie\files\History" to access the log file.

A log file's name follows the format of "YYYY-MM-DD_HH-MM-SS_details.txt" and is determined by the starting time of the session.

## How to access Nanome on the Oculus Quest family of headsets

Nanome can be loaded onto the Oculus Quest or Oculus Quest 2 via a few different methods. In 2021, Nanome was added to the Oculus App Lab (see [here](https://www.oculus.com/experiences/quest/3077598929010226/)), which means Nanome can now be found in the Quest store. When searching for Nanome, the result will initially be hidden - you need to open the "App Lab" results to find the Nanome application. See the animation below for more details. (Note: this process was performed on a smartphone.)

<vimg src="howto-page/nanome_on_oculus_quest.gif"/>

Downloading Nanome from Oculus App Lab will be the easiest method for getting access to the software on your Quest device. For alternative methods (such as sideloading), you can refer to our [setup page](https://nanome.ai/setup).

## How to use Oculus Dash

<vimg src="howto-page/OculusDash.gif" />

When using the Oculus Rift/Rift S or Oculus Link (Quest connected to a desktop), users can take advantage of Oculus Dash to ‘pin’ windows or their entire desktop in VR and Nanome. This means users can view excel sheets, websites, and other 3rd party software while the headset is on. This way, users can seamlessly work in Nanome with their existing desktop apps.

To view the documentation on how to use Oculus Dash please visit the official oculus support page: [https://support.oculus.com/166993604065478/](https://support.oculus.com/166993604065478/)

To view a tutorial on how to use oculus dash to pin windows, we recommend this UploadVR article here: 
[https://uploadvr.com/oculus-dash-windows-button/](https://uploadvr.com/oculus-dash-windows-button/)

## How to access pre-release beta versions of Nanome

Prior to the official release of each new Nanome version, we will make available a beta release on the Steam and Oculus stores. These are strictly beta builds and are not meant for regular use; rather, you have an opportunity to preview the next version as we are putting the finishing touches on it.

On the Steam store, you can switch to the beta release by following [this guide](https://partner.steamgames.com/doc/store/application/branches). On the Oculus store, refer to the following GIF. (Be sure to switch back to the ‘LIVE’ for the latest stable release.)

<vimg src="howto-page/beta-release-oculus-store.gif" />

If you are participating in our Oculus Quest Nanome beta, please request the pre-release beta of the next version by emailing [support@nanome.ai](mailto:support@nanome.ai).

**REMINDER:** During collaborative sessions with other users, those on different versions will NOT be able to see each other’s lobbies or will have features that may not fully function. For collaborative sessions with other users, please ensure you are on the same version of Nanome.

If you'd like to leave us any feedback on the beta releases, you can fill out [this form](https://forms.gle/DsTkDCuqAzhP4vJR8).

<!--
## How to load molecules or workspace



## How to save my molecules or workspace

## How to change the display of the molecule

## How to view a Density Map

## How to change the Density Map Configuration

## How to play a trajectory

## How to view docked results

## How to focus on a binding site

## How to build a small molecule

## How to build an animation via frame duplication

## How to measure distances

## How to rotate a bond with measurements

## How to do advanced selection

## How to mutate a residue

## How to align structures through the RMSD plugin

## How to hide the environment

## How to export an image or file

## How to request presenter

## How to change the audio settings

## How to change your name

## How to teleport

## How to build/modify a macro -->
