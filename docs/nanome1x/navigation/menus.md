---
title: Main Menus
---

# Main Menus

## Entry List

<ScreenMap src="navigating-page/Limiter.png" alt="The Entry List with the Device Limit bar above it and the menu buttons down its left side" label="Entry List and menu buttons">
<MapCard icon="headset" title="Device Limit" href="#device-limiter" side="top" area="3.4,1.3,93.2,10.2">How close the atom count is to a standalone device's limit.</MapCard>
<MapCard icon="plus" title="Load" href="#load" side="left" area="2.8,13.3,13.0,10.3">Load molecules or structures into your workspace.</MapCard>
<MapCard icon="stack-2" title="Stacks" href="#stacks" side="left" area="2.6,23.9,13.0,10.2">Opens the list of plugins.</MapCard>
<MapCard icon="eye" title="Display" href="#display" side="left" area="2.5,34.4,13.2,10.1">Atoms, ribbons, surfaces, sub structures and labels.</MapCard>
<MapCard icon="palette" title="Color" href="#color" side="left" area="2.2,44.7,13.3,10.2">Apply a solid color or a color scheme.</MapCard>
<MapCard icon="edit" title="Modify" href="#modify" side="left" area="2.0,55.2,13.2,10.3">Edit, compute, tools and mutate.</MapCard>
<MapCard icon="lasso" title="Select" href="#select" side="left" area="1.9,65.7,13.2,10.3">Change the selection by atom type, residue type or distance.</MapCard>
<MapCard icon="list-check" title="Macro" href="#macro" side="left" area="1.6,76.3,13.3,10.6">Opens the Macro menu.</MapCard>
<MapCard icon="school" title="Content" href="#content-discovery" side="left" area="1.4,87.1,13.5,11.1">Tutorials presented using spatial recordings.</MapCard>
<MapCard icon="select-all" title="Top action bar" href="#menu-actions" side="right" area="20.5,19.6,59.1,5.6">Select, invert, lock, box and show or hide entities.</MapCard>
<MapCard icon="trash" title="Bottom action bar" href="#menu-actions" side="bottom" area="16.4,89.2,80.0,9.1">Export, align, sequence, save, new workspace and delete.</MapCard>
</ScreenMap>

The Entry List is a list of all of the structures that have been loaded into the environment.

The Load, Stacks (plugins), Display, Color, Modify, Select, Macro, and Content (spatial tutorials) Menus can be displayed by clicking their respective icons down the left side of the Entry List.

## Device Limiter

The Device Limiter is an indicator that shows how close the current amount of atoms is to hitting the limit of a standalone device's computing capability. This indicator only shows up when using a device in standalone mode (if applicable). When the amount of atoms approaches or hits the limit, the following prompts will show up.

<vimg src="navigating-page/Limiter-Close.jpg" />
<vimg src="navigating-page/Limiter-Max.jpg" />

## Hierarchy Menu

<ShotRow src="navigating-page/Entry-Hierarchy.jpg" alt="The Entry List with 6LU7 loaded, beside the Entry Hierarchy menu at the chain and residue levels">

<UiList label="Entry row">
<UiItem icon="hierarchy" name="Hierarchy" area="32.6,27.4,2.8,7.6">Opens the Hierarchy Menu for the structure.</UiItem>
<UiItem icon="player-play" name="Frame Data" href="#frame-data" area="29.7,27.2,2.9,7.6">Opens Frame Data for the structure.</UiItem>
</UiList>

<UiList label="Entry Hierarchy">
<UiItem icon="link" name="Chains" area="35.8,12.7,25.9,57.9">6LU7 at its top level, listing its chains.</UiItem>
<UiItem name="Residues" area="62.2,4.3,36.7,78.6">Chain A of 6LU7, listing its residues.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="navigating-page/Entry-HierarchyMenu.jpg" alt="The Entry Hierarchy menu for 6LU7, listing its chains">

The Hierarchy Menu lists out the components of an entity, such as chains and residues, in hierarchical levels.

<UiList label="Hierarchy Menu">
<UiItem icon="arrow-up" name="Up" area="3.2,15.0,7.9,8.3">Goes back up one level. It's grayed out at the top level, as here.</UiItem>
<UiItem name="Path" area="11.2,15.4,22.2,7.9">The level you're on, such as 6LU7 or 6LU7 &gt; A.</UiItem>
<UiItem icon="layout-list" name="View modes" href="#different-browsing-modes-small-medium-large" area="13.8,27.7,28.6,9.2">A list, or icons in different sizes. The list is on here.</UiItem>
<UiItem icon="link" name="Chains" area="2.6,39.0,42.7,38.0">One row per chain, with its atom count.</UiItem>
<UiItem icon="eye" name="Show / Hide" area="46.2,39.0,10.8,38.0">Shows or hides each chain. HA is hidden here.</UiItem>
<UiItem icon="zoom-in" name="Zoom" area="57.8,39.0,10.7,38.0">Zooms to each chain.</UiItem>
</UiList>

</ShotRow>

### Different Browsing Modes (Small, Medium, Large)

<ShotRow src="navigating-page/Entry-SmallIcon.jpg" alt="The Entry Hierarchy menu for chain A of 6LU7, with small icons">

Different Viewing Modes can be toggled to modify the substructure icon sizes in each menu.

<UiList label="View modes">
<UiItem name="Large" area="14.7,28.4,9.8,9.1">Large icons.</UiItem>
<UiItem icon="layout-grid" name="Medium" area="24.6,28.4,8.9,9.1">Medium icons.</UiItem>
<UiItem icon="grid-4x4" name="Small" area="33.6,28.4,9.6,9.1">Small icons, as here: one letter per residue.</UiItem>
<UiItem icon="number-123" name="Residue number" area="4.6,38.7,6.6,56.9">The number of the first residue in each row.</UiItem>
</UiList>

</ShotRow>

| Medium | Large |
|:-----:|:-----:|
| <vimg src="navigating-page/Entry-MediumIcon.jpg" alt="Chain A of 6LU7 with medium icons: each residue's name and number" /> | <vimg src="navigating-page/Entry-BigIcon.jpg" alt="Chain A of 6LU7 with large icons" /> |

### Frame Data

<ShotRow src="navigating-page/frame_menu_speeds.png" alt="The Frame Menu for 2HIU on its Playback and Edit tabs">

Frame data allows users to navigate and modify different frames of the same structure (Academic and Enterprise only).

<UiList label="Frame Menu tabs">
<UiItem icon="list-details" name="Frames" area="1.7,14.6,24.0,8.4">The list of frames, shown below.</UiItem>
<UiItem icon="player-play" name="Playback" area="25.7,14.6,23.8,8.4">Shown here. Steps through and plays the frames.</UiItem>
<UiItem icon="edit" name="Edit" area="50.1,14.6,24.0,8.4">Shown here. Moves, splits, duplicates and deletes frames.</UiItem>
<UiItem icon="tag" name="Meta Data" area="74.1,14.6,24.1,8.4">The frame's meta data, shown below.</UiItem>
</UiList>

<UiList label="Playback tab">
<UiItem icon="chevron-right" name="Previous / Next frame" area="5.2,25.0,40.8,10.0">The arrows change frame. The middle shows the frame and the total, here 1/10.</UiItem>
<UiItem name="Animator" area="5.2,36.3,40.8,7.8">Moves through the frames with a dial or a slider.</UiItem>
<UiItem name="Dial" area="14.5,45.7,22.5,24.9">The dial, from the first frame to the last.</UiItem>
<UiItem icon="player-pause" name="Play / Pause" area="5.2,72.3,40.8,9.6">Pause in the middle, with a play button on each side.</UiItem>
<UiItem name="Speed" area="5.2,82.5,32.7,10.3">1x, 5x, 50x or 100x.</UiItem>
<UiItem name="Loop" area="39.2,82.8,6.7,9.7">Loops the playback.</UiItem>
</UiList>

<UiList label="Edit tab">
<UiItem icon="arrow-up" name="Move up" area="53.8,25.2,20.2,12.0">Moves the current frame up one place.</UiItem>
<UiItem name="Move to top" area="74.0,25.2,20.3,12.0">Moves the current frame to the top.</UiItem>
<UiItem name="Move down" area="53.8,39.8,20.2,12.2">Moves the current frame down one place.</UiItem>
<UiItem name="Move to bottom" area="74.0,39.8,20.3,12.2">Moves the current frame to the bottom.</UiItem>
<UiItem name="Split frame" area="53.8,54.5,40.5,11.9">Splits the current frame.</UiItem>
<UiItem icon="copy-plus" name="Duplicate frame" area="53.8,66.4,40.5,11.6">Duplicates the current frame.</UiItem>
<UiItem icon="trash" name="Delete frame" area="53.8,80.6,40.5,12.2">Deletes the current frame.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="navigating-page/Entry-FrameData2.jpg" alt="The Frame Menu for 2HIU on its Frames and Meta Data tabs">

<UiList label="Frames and Meta Data tabs">
<UiItem icon="list" name="Model list" area="4.6,35.9,38.2,58.2">One row per frame. Selecting one switches to it.</UiItem>
<UiItem icon="tag" name="Meta data" area="53.8,34.3,38.6,59.2">The current frame's meta data, such as Notes and Ranking, each with an edit button.</UiItem>
</UiList>

</ShotRow>

### Electron Density Maps

<vimg src="features-page/edm.gif" />

<ShotRow src="navigating-page/Entry-EDM.jpg" alt="The Electron Density menu for 1A0M with two maps loaded">

The Electron Density tab shows the configuration of viewing the Electron Density Map of the structure (Academic and Enterprise only).

<UiList label="Electron Density">
<UiItem icon="list" name="Maps" area="1.9,23.8,45.8,19.6">The maps loaded for the structure, here two .dsn6 files.</UiItem>
<UiItem icon="palette" name="Color" area="52.5,53.8,18.4,28.6">The map's color.</UiItem>
<UiItem name="Sigma" area="74.0,53.8,22.1,28.6">The sigma level, from -10 to 10. Its value in e/Å³ shows beside it, here 0.61.</UiItem>
<UiItem name="Draw style" area="53.8,85.6,41.8,9.7">Three ways to draw the map.</UiItem>
</UiList>

</ShotRow>

### Alternative Conformations Menu

<ShotRow src="navigating-page/hierarchy-residue-conformations.png" alt="The Entry Hierarchy menu for 1H76, with the tooltip of its Residue Conformations button">

<UiList label="Hierarchy Menu">
<UiItem name="Residue Conformations" area="67.2,15.0,5.9,8.8">View residues with alternative conformations. Opens the menu below.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="navigating-page/residue-conformations.png" alt="The Residue Conformations menu for 1H76">

This menu specifies residue conformations.

<UiList label="Residue Conformations">
<UiItem icon="filter" name="Filter by structure" area="3.0,16.9,75.8,10.2">Lists the residues of one structure, here 1H76.</UiItem>
<UiItem name="Residue" area="3.4,32.4,31.3,51.9">Each residue with alternative conformations, with buttons to hide it and zoom to it.</UiItem>
<UiItem name="# Conformations" area="35.7,27.9,23.6,56.3">How many conformations are shown, and how many are available.</UiItem>
<UiItem name="Show Conformation" area="60.9,32.4,26.6,51.9">The conformations shown, such as A (.7), B (.3).</UiItem>
<UiItem icon="select-all" name="Select All Residues" area="3.2,85.8,33.8,10.0">Selects all the residues.</UiItem>
<UiItem icon="eye" name="Apply View" area="45.8,85.8,51.2,10.0">ALL, and two other views.</UiItem>
</UiList>

</ShotRow>

## Menu Actions

Action buttons on the Entry List provide quick access to common actions on the workspace.

<ShotRow src="navigating-page/entry_list_updated_1-24.png" alt="The Entry List with its action buttons above and below the list" crop="14.8,0,85.2,100">

<UiList label="Entry List actions">
<UiItem icon="select-all" name="Select/Deselect All" area="19.1,7.7,6.7,6.0">Select or deselect all present structures.</UiItem>
<UiItem icon="arrows-exchange" name="Invert Selection" area="30.6,7.7,7.5,6.0">Invert current selection.</UiItem>
<UiItem icon="lock-open" name="Toggle Lock" area="46.6,7.7,6.4,6.0">Lock or unlock selected entities.</UiItem>
<UiItem icon="box" name="Toggle Box" area="59.6,7.7,7.0,6.0">Show or hide the box frame of selected entities.</UiItem>
<UiItem icon="eye" name="Toggle Visibility" area="73.0,7.7,7.7,6.0">Show or hide the selected entities.</UiItem>
<UiItem name="Export" area="16.3,89.8,8.9,7.1">Export the selected structures in a desired format. Opens the Export menu.</UiItem>
<UiItem name="Align" area="32.5,89.8,8.5,7.1">Align the selected entities and place them in the same position under the same coordinate system. Caution: this does not necessarily align the entities by their atom position, and the entities could end up not overlapping after the alignment.</UiItem>
<UiItem name="Sequence" area="44.2,89.8,8.0,7.1">View the sequences of multiple chains and align them. Opens the Sequence menu.</UiItem>
<UiItem icon="device-floppy" name="Save" area="60.4,89.8,8.6,7.1">Save the current workspace.</UiItem>
<UiItem name="New Workspace" area="72.6,89.8,8.8,7.1">Discard the current workspace and create a new one.</UiItem>
<UiItem icon="trash" name="Delete" area="89.3,89.8,6.9,7.1">Delete the selected entities.</UiItem>
</UiList>

</ShotRow>

| Export menu | Sequence menu |
|:-----:|:-----:|
| <vimg src="navigating-page/export_menu_updated.png" alt="The Export menu" /> | <vimg src="navigating-page/Entry-SequenceMenu.jpg" alt="The Sequence menu" /> |

### Spatial ("Quick") Anchor

<vimg src="navigating-page/quick-anchor.png" />

When saving a workspace, you have the option to create a spatial anchor for your current physical location. When you re-launch Nanome in this same physical location, you'll be able to quickly access this workspace from the Nanome Lobby. (Only one workspace can be saved with a spatial anchor at a time.)

## Load

Load molecules or structures into your workspace. Supported file formats include (v1.26):

_Structural Coordinate File Formats_ <br />
.pdb, .cif, .mmcif, .pse, .nanome, .sdf, .mol, .xyz, .mol2

_Electron Density Map File Formats_ <br />
.ccp4, .dsn6

_Trajectory/Molecular Dynamics File Formats_ <br />
.dcd, .gro, .pqr, .trr, .xtc, .psf

_Image File Formats_ <br />
.png, .jpg, .jpeg, .pdf

For the file formats supported in Nanome v2, see [Supported File Formats](/nanome_web/fileformats).


### Featured

<vimg src="navigating-page/Load-Featured-Workspace.jpg" />

Workspaces that contain featured structures and tutorials.

<vimg src="navigating-page/Load-Featured-Molecule.jpg" />

Molecules featured by Nanome for their interesting properties or background.

### Database

<vimg src="navigating-page/Load-Database.jpg" />

From the Database tab, structures can be directly loaded from RCSB, DrugBank (Academic and Enterprise only), or Pubchem (Academic and Enterprise only). Custom database can also be added by changing the config file.

### Keyword

<vimg src="navigating-page/Load-Keyword.jpg" />

From the Keyword tab, structure can be loaded from a keyword search.

### My Files

<vimg src="navigating-page/Load-MyFiles.jpg" />

My Files tab allows users to load structures from their local directory.

### Recent

<vimg src="navigating-page/Load-Recent.jpg" />

Recent files loaded in Nanome.

### Cancel a load

<table>
<tbody>
<tr>
<td width="50%" ></td>
<td width="50%" ></td>
</tr>
<tr>
<td><vimg src="navigating-page/loadingtoolong.png" /></td>
<td><vimg src="navigating-page/cancelledload.png" /></td>
</tr>
</tbody>
</table>

Cancel the loading of structures from the menu source tab, perfect for if your structure is taking too long to load or you made a mistake in the PDB code.

## Stacks

<ShotRow src="navigating-page/Plugin-List.jpg" alt="The Stacks menu listing all plugins">

<UiList label="Stacks menu">
<UiItem icon="chevron-down" name="All Plugins" area="4.3,17.3,46.1,10.0">Picks which set of plugins to list.</UiItem>
<UiItem icon="list" name="Plugin list" area="4.3,28.1,45.6,66.9">The plugins in the set.</UiItem>
<UiItem name="Plugin panel" area="53.2,16.2,44.8,79.1">Shows the plugin you select.</UiItem>
</UiList>

</ShotRow>

[Please view the Nanome Stacks page to learn more.](/nanome1x/plugins/overview)

## Display


### Atom

<ShotRow src="navigating-page/Display-Atom-Menu.jpg" alt="The Display menu on its Atom tab">

This tab contains options for the visual of atoms and bonds.

<UiList label="Atom tab">
<UiItem name="Wire" area="20.4,17.9,25.1,38.8">Hide atoms and show bonds in thin wire visual.</UiItem>
<UiItem name="Stick" area="45.5,17.9,24.4,38.8">Show small atoms and bonds in volumetric stick visual.</UiItem>
<UiItem name="Van Der Waals" area="70.0,17.9,24.8,38.8">Show atoms in thin Van Der Waals visual and hide bonds.</UiItem>
<UiItem name="Adapt to color" area="20.4,56.7,25.1,38.7">Also called Adaptive. Show atoms with radius proportional to their b-factor value and hide bonds.</UiItem>
<UiItem name="Ball & Stick" area="45.5,56.7,24.4,38.7">Show atoms as small balls joined by stick bonds.</UiItem>
<UiItem icon="eye-off" name="Hide" area="70.0,56.7,24.8,38.7">Hide all atoms and bonds.</UiItem>
</UiList>

<UiList label="Display tabs">
<UiItem icon="atom" name="Atom" href="#atom" area="1.2,14.4,15.4,16.1">Atoms and bonds.</UiItem>
<UiItem name="Ribbon" href="#ribbon" area="1.2,30.6,15.4,16.2">Ribbons.</UiItem>
<UiItem name="Surface" href="#surface" area="1.2,46.7,15.4,15.6">The surface.</UiItem>
<UiItem icon="circle-dot" name="Sub Structure" href="#sub-structure" area="1.2,62.3,15.4,16.1">Hetatoms, waters and hydrogens.</UiItem>
<UiItem icon="tag" name="Labels" href="#labels" area="1.2,78.4,15.4,16.9">Atom, residue and chain labels.</UiItem>
</UiList>

</ShotRow>

| Wire | Stick | Van Der Waals | Adapt to color | Ball & Stick |
|:-----:|:-----:|:-----:|:-----:|:-----:|
| <vimg src="navigating-page/Display-Atom-Wire-Small.jpg" alt="A small molecule in Wire" /> | <vimg src="navigating-page/Display-Atom-Stick-Small.jpg" alt="A small molecule in Stick" /> | <vimg src="navigating-page/Display-Atom-Vanderwal-Small.jpg" alt="A small molecule in Van Der Waals" /> | <vimg src="navigating-page/Display-Atom-Adaptive-Small.jpg" alt="A small molecule in Adapt to color" /> | <vimg src="navigating-page/Display-Atom-BallnStick-Small.jpg" alt="A small molecule in Ball and Stick" /> |

### Ribbon

<ShotRow src="navigating-page/Display-Ribbon-Menu.jpg" alt="The Display menu on its Ribbon tab">

This tab contains options for the visual of ribbons.

<UiList label="Ribbon tab">
<UiItem name="Cartoon" area="22.9,20.9,34.7,35.5">Show ribbon in cartoon visual that highlight secondary structures using helix and arrows.</UiItem>
<UiItem name="Coil" area="57.6,20.9,34.2,35.5">Show ribbon in uniform tube visual.</UiItem>
<UiItem name="Putty" area="22.9,56.4,34.7,34.8">Show ribbon in tube with widths proportional to the atoms' b-factor value.</UiItem>
<UiItem icon="eye-off" name="Hide" area="57.6,56.4,34.2,34.8">Hide the ribbon.</UiItem>
</UiList>

</ShotRow>

| Cartoon | Coil | Putty |
|:-----:|:-----:|:-----:|
| <vimg src="navigating-page/Display-Ribbon-Cartoon-Small.jpg" alt="A protein ribbon in Cartoon" /> | <vimg src="navigating-page/Display-Ribbon-Coil-Small.jpg" alt="A protein ribbon in Coil" /> | <vimg src="navigating-page/Display-Ribbon-Putty-Small.jpg" alt="A protein ribbon in Putty" /> |

### Surface

<ShotRow src="navigating-page/Display-Surface-Menu-updated.png" alt="The Display menu on its Surface tab">

Toggle the visibility of solvent-excluded-surface, change its opacity, or change the probe length (in Angstroms).

<UiList label="Surface tab">
<UiItem name="Show Surface" area="22.0,17.6,35.7,23.5">Shows the surface.</UiItem>
<UiItem name="Hide Surface" area="57.7,17.6,35.6,23.5">Hides the surface.</UiItem>
<UiItem name="SAS Probe Radius" area="22.0,66.5,71.3,15.5">The probe length, in Angstroms.</UiItem>
<UiItem name="Opacity" area="22.0,84.7,71.3,15.1">The surface's opacity.</UiItem>
</UiList>

</ShotRow>

#### Mesh Surfaces (PCVR only)

<vimg src="navigating-page/mesh-surface.png" />

If you are using PCVR, you also have the option to display a mesh surface. This option can be found in the [Action Menu](/nanome1x/navigation/actionmenu).
Navigate to Display/Styles > Surface Styles, then check the "Mesh Surface" option.

### Sub Structure

<ShotRow src="navigating-page/Display-SubStructure-Menu.jpg" alt="The Display menu on its Sub Structure tab">

<UiList label="Sub Structure tab">
<UiItem icon="hexagon" name="Hetatoms" area="24.2,29.3,68.0,11.7">Show hetatoms.</UiItem>
<UiItem name="Waters" area="24.2,50.0,68.0,11.7">Show hetatoms, including water.</UiItem>
<UiItem name="Hydrogens" area="24.2,70.7,68.0,11.8">Show hydrogens.</UiItem>
</UiList>

</ShotRow>

| Hetatoms | Waters | Hydrogens |
|:-----:|:-----:|:-----:|
| <vimg src="navigating-page/Display-SubStructure-Hetatoms-Small.jpg" alt="A protein surface with its hetatoms shown" /> | <vimg src="navigating-page/Display-SubStructure-Water-Small.jpg" alt="A protein surface with its hetatoms and waters shown" /> | <vimg src="navigating-page/Display-SubStructure-Hydrogen-Small.jpg" alt="A protein surface with its hydrogens shown" /> |

### Labels

<ShotRow src="navigating-page/Display-Label-Menu.jpg" alt="The Display menu on its Labels tab">

<UiList label="Labels tab">
<UiItem icon="tag" name="Atom" area="23.3,29.5,68.5,11.7">Show labels on atoms.</UiItem>
<UiItem icon="tag" name="Residue" area="23.3,50.3,68.5,11.7">Show labels on residues.</UiItem>
<UiItem icon="tag" name="Chain" area="23.3,71.1,68.5,11.8">Greyed out in this screenshot.</UiItem>
</UiList>

</ShotRow>

| Atom | Residue |
|:-----:|:-----:|
| <vimg src="navigating-page/Display-Label-Atom-Small.jpg" alt="A molecule with a label on each atom" /> | <vimg src="navigating-page/Display-Label-Residue-Small.jpg" alt="A molecule with its residue label" /> |

## Color

Apply a solid color or a color scheme on the selected structures.

### Picker

<ShotRow src="navigating-page/Color-Picker-Menu.jpg" alt="The Color menu on its Picker tab, with Carbonite on">

Colors picked in picker are applied in a solid style.

<UiList label="Picker tab">
<UiItem name="Carbonite" area="37.1,31.7,29.1,11.1">Carbonite color applies only to carbons.</UiItem>
<UiItem name="Monochrome" area="66.2,31.7,28.7,11.1">Monochrome color applies to all atoms indifferently.</UiItem>
<UiItem icon="palette" name="Color picker" area="51.8,45.5,42.7,37.7">Picks a color to apply in a solid style.</UiItem>
<UiItem icon="star" name="Add Favorite" area="51.5,84.1,33.9,10.0">Adds the picked color as a favorite.</UiItem>
<UiItem icon="list-check" name="Apply on" area="4.4,17.8,23.2,43.0">Which parts get the color: Surface, Ribbon and Atom.</UiItem>
</UiList>

<UiList label="Color tabs">
<UiItem icon="palette" name="Picker" href="#picker" area="34.1,14.9,32.0,13.5">A solid color.</UiItem>
<UiItem icon="color-filter" name="Schemes" href="#schemes" area="66.1,14.9,32.0,13.5">A color scheme.</UiItem>
</UiList>

</ShotRow>

| Carbonite | Monochrome |
|:-----:|:-----:|
| <vimg src="navigating-page/Color-Carbonite-Small.jpg" alt="Benzene in red with Carbonite: the carbons are red and the hydrogens stay white" /> | <vimg src="navigating-page/Color-Monochrome-Small.jpg" alt="Benzene in red with Monochrome: every atom is red" /> |

### Schemes

<ShotRow src="navigating-page/Color-Scheme-Menu.jpg" alt="The Color menu on its Schemes tab, with Element picked">

Colors picked in schemes are applied in a certain pattern.

<UiList label="Schemes tab">
<UiItem name="Carbonite / Monochrome" area="37.0,30.9,57.9,11.1">As in the Picker tab.</UiItem>
<UiItem name="Occupancy" area="37.3,53.6,28.5,8.0">Colors the selected structures by occupancy.</UiItem>
<UiItem name="BFactor" area="37.3,61.7,28.5,8.0">Colors the selected structures by b-factor.</UiItem>
<UiItem name="Rainbow" area="37.3,69.8,28.5,8.0">Colors the selected structures in rainbow colors.</UiItem>
<UiItem name="YRB Hydrophobe" area="66.0,69.8,28.6,8.0">Color selected structures by their hydrophobicity with yellow, red, blue colors.</UiItem>
<UiItem name="IMGT" area="37.3,86.0,28.5,8.2">Color selected antibody structures by their regions.</UiItem>
</UiList>

</ShotRow>

| YRB Hydrophobe | IMGT |
|:-----:|:-----:|
| <vimg src="navigating-page/Color-Hydrophobe-Small.jpg" alt="A protein surface in YRB Hydrophobe colors" /> | <vimg src="navigating-page/Color-IMGT-Small.jpg" alt="An antibody colored by its IMGT regions" /> |

Other available color schemes include coloring by occupancy, b-factor, rainbow and so on.

## Modify

### Edit

<ShotRow src="navigating-page/Modify-Edit.jpg" alt="The Modify menu on its Edit tab">

Edit the selected structures by applying actions from the buttons.

<UiList label="Edit tab">
<UiItem icon="copy-plus" name="Duplicate" area="24.6,18.6,68.3,10.1">Copies the selected structures.</UiItem>
<UiItem name="Split" area="24.6,28.7,68.3,9.7">Splits the selected structures.</UiItem>
<UiItem name="Combine" area="24.6,38.5,68.3,9.7">Combines the selected structures.</UiItem>
<UiItem name="Center" area="24.6,48.2,68.3,9.8">Centers the selected structures.</UiItem>
<UiItem icon="zoom-in" name="Zoom" area="24.6,58.1,68.3,9.9">Zooms to the selected structures.</UiItem>
<UiItem name="Mutate" href="#mutate" area="24.6,74.2,68.3,10.0">Opens the Mutate menu.</UiItem>
<UiItem name="Delete" area="24.6,84.2,68.3,10.1">Deletes the selected structures.</UiItem>
</UiList>

<UiList label="Modify tabs">
<UiItem icon="edit" name="Edit" href="#edit" area="1.9,14.7,17.6,26.4">This tab.</UiItem>
<UiItem name="Compute" href="#compute" area="1.9,41.1,17.6,26.4">Hydrogens, ESP, clashes, h-bonds and minimization.</UiItem>
<UiItem icon="tool" name="Tools" href="#tools" area="1.9,67.5,17.6,26.5">Tools that modify the structures directly.</UiItem>
</UiList>

</ShotRow>

### Compute

<ShotRow src="navigating-page/Modify-Compute.jpg" alt="The Modify menu on its Compute tab">

Apply certain computations on the selected structures and modify them according to the result.

<UiList label="Compute tab">
<UiItem name="Add" area="24.1,27.6,34.5,12.4">Under Hydrogens: adds hydrogens to the selected structures.</UiItem>
<UiItem name="Delete" area="58.7,27.6,34.4,12.4">Under Hydrogens: deletes hydrogens from the selected structures.</UiItem>
<UiItem name="Calculate ESP" area="24.1,47.0,56.3,12.1">Calculates the electrostatic potential (ESP) of the selected structure.</UiItem>
<UiItem icon="palette" name="ESP color key" area="80.5,47.0,12.6,12.1">Shows the Electrostatic Potential color key. It's on in the picture below.</UiItem>
<UiItem name="Calculate Clashes" area="24.1,59.1,56.3,11.7">Calculates atom clashes.</UiItem>
<UiItem name="Calculate H-bonds" area="24.1,70.8,56.3,11.7">Calculates h-bonds. Marked BETA.</UiItem>
<UiItem name="Minimize" area="24.1,82.6,56.3,12.0">Minimizes the potential energy of the selected structures.</UiItem>
<UiItem icon="settings" name="Settings" area="80.5,59.1,12.6,35.5">Opens the Clashes, H-bonds or Minimize menu, shown below.</UiItem>
</UiList>

</ShotRow>

<vimg src="navigating-page/Modify-ESP.jpg" alt="A protein surface colored by its electrostatic potential, with the Electrostatic Potential color key beside the Modify menu" />

<ShotRow src="navigating-page/Modify-Compute-Clashes.jpg" alt="The Clashes menu">

**Calculate Clashes:** config the tolerance of atom clashes.

<UiList label="Clashes menu">
<UiItem name="Overlap Tolerance" area="6.8,26.2,86.1,25.7">The tolerance, from -1 to 1 Å.</UiItem>
<UiItem name="Calculate: Once / Continuously" area="6.7,58.3,86.2,20.3">Calculates clashes one time, or keeps calculating them.</UiItem>
<UiItem name="Clear All Clashes" area="6.7,80.1,86.2,12.5">Clears every clash.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="navigating-page/Modify-Compute-Hbond.jpg" alt="The H-bonds menu">

**Calculate H-bonds:** config the threshold for generating h-bonds.

<UiList label="H-bonds menu">
<UiItem name="Relax H-bonds" area="7.1,25.2,83.1,6.2">Relaxes the h-bond constraints. On here.</UiItem>
<UiItem name="Relax Constraints By" area="6.8,33.6,83.6,33.7">The threshold, in Angstrom and degrees.</UiItem>
<UiItem name="Calculate: Once / Continuously" area="6.9,69.4,85.4,14.2">Calculates h-bonds one time, or keeps calculating them.</UiItem>
<UiItem name="Clear All H-bonds" area="6.9,84.3,85.4,9.8">Clears every h-bond.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="navigating-page/Modify-Compute-Minimize.jpg" alt="The Minimize menu">

**Minimize:** config forcefield and step for minimizing potential energy of selected structures.

<UiList label="Minimize menu">
<UiItem name="Force Fields" area="4.0,20.4,42.9,75.0">The force field to use.</UiItem>
<UiItem name="Number of Steps" area="53.1,19.5,42.5,20.2">The arrows change the number of steps.</UiItem>
<UiItem name="Start minimization" area="53.1,82.9,42.7,12.4">Starts minimizing the selected structures.</UiItem>
</UiList>

</ShotRow>

### Tools

<ShotRow src="navigating-page/Modify-Tools.jpg" alt="The Modify menu on its Tools tab">

Switch to a certain tool to directly apply modification to the structures.

<UiList label="Tools tab">
<UiItem icon="hand-stop" name="Hand" href="/nanome1x/navigation/toolsmenu#hand-tool" area="24.6,18.6,23.1,37.4">The default tool, for grabbing and clicking.</UiItem>
<UiItem icon="ruler-2" name="Measure" href="/nanome1x/navigation/toolsmenu#measurement-tool" area="47.6,18.6,22.4,37.4">Measures distances and angles between atoms.</UiItem>
<UiItem name="Selector" href="/nanome1x/navigation/toolsmenu#selection-tool" area="70.0,18.6,22.7,37.4">Selects structures directly in the workspace.</UiItem>
<UiItem name="Torsion" href="/nanome1x/navigation/toolsmenu#torsion-tool" area="24.6,56.1,23.1,37.5">Twists rotatable bonds.</UiItem>
<UiItem name="Med Chem" href="/nanome1x/navigation/toolsmenu#medchem-tools" area="47.6,56.1,22.4,37.5">Edits atoms directly with your hands.</UiItem>
<UiItem icon="atom" name="Builder" area="70.0,56.1,22.7,37.5">Switches to the Builder tool.</UiItem>
</UiList>

</ShotRow>

### Mutate

<ShotRow src="navigating-page/Mutate.jpg" alt="The Mutate menu with amino acids grouped by polarity">

Mutate the R-groups of the selected amino acids.

<UiList label="Mutate menu">
<UiItem name="Polarity" area="3.8,26.8,25.1,15.6">Under Layout: lays the amino acids out by polarity, as here.</UiItem>
<UiItem name="Side Chain" area="3.8,42.4,25.2,15.1">Under Layout: lays them out by side chain.</UiItem>
<UiItem name="NonPolar" area="31.5,19.9,37.9,43.9">Nonpolar amino acids.</UiItem>
<UiItem name="Polar: -ve" area="72.3,19.9,17.4,25.6">Polar, negatively charged.</UiItem>
<UiItem name="Polar: 0" area="31.6,69.8,37.5,25.0">Polar, uncharged.</UiItem>
<UiItem name="Polar: +ve" area="72.1,69.8,23.5,25.0">Polar, positively charged.</UiItem>
<UiItem name="Rotamer" area="3.2,64.9,25.9,29.8">The slider and arrows step through rotamers.</UiItem>
</UiList>

</ShotRow>

## Select

Quickly modify selection range using certain criteria.

### Refine

<ShotRow src="navigating-page/Selection-Refine.jpg" alt="The Selection menu on its Refine tab">

Refine selection by applying certain changes.

<UiList label="Refine tab">
<UiItem icon="square-x" name="Deselect All" area="28.8,25.5,62.2,13.7">Deselects everything.</UiItem>
<UiItem icon="replace" name="Replace Selection" area="28.8,39.3,62.2,13.4">Opens the Replace Selection menu, shown below.</UiItem>
<UiItem icon="plus" name="Append to Selection" area="28.8,52.9,62.2,13.3">Adds to the current selection.</UiItem>
<UiItem icon="filter" name="Filter within Selection" area="28.8,66.3,62.2,13.4">Filters the current selection.</UiItem>
<UiItem icon="minus" name="Remove from Selection" area="28.8,79.9,62.2,13.6">Removes from the current selection.</UiItem>
</UiList>

<UiList label="Selection tabs">
<UiItem icon="search" name="Refine" href="#refine" area="2.1,14.6,19.3,19.7">This tab.</UiItem>
<UiItem icon="atom" name="Atom Type" href="#atom-type" area="2.1,34.5,19.3,19.7">Carbons and hetatoms.</UiItem>
<UiItem icon="droplet" name="Residue Type" href="#residue-type" area="2.1,54.4,19.3,19.6">Waters and amino acids.</UiItem>
<UiItem icon="ruler-measure" name="Distance" href="#distance" area="2.1,74.2,19.3,19.7">Grows or shrinks the selection by distance.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="navigating-page/Selection-Sub-Residue.jpg" alt="The Replace Selection menu over the Selection menu, on its Residue tab">

**Replace Selection**

<UiList label="Replace Selection">
<UiItem icon="link" name="Chain" area="12.4,38.4,24.7,7.4">Lists the chains, such as A, HA, B and HB.</UiItem>
<UiItem name="Residue" area="37.2,38.4,25.6,7.4">Lists the residue names, as here.</UiItem>
<UiItem icon="atom" name="Atom" area="63.0,38.4,24.5,7.4">Lists the atom names, such as N, CA and CB.</UiItem>
<UiItem icon="list" name="List" area="14.2,47.0,68.1,13.1">The items on the open tab.</UiItem>
<UiItem icon="check" name="Apply" area="67.0,67.6,19.2,6.4">Replaces the selection.</UiItem>
</UiList>

</ShotRow>

| Chain tab | Atom tab |
|:-----:|:-----:|
| <vimg src="navigating-page/Selection-Sub-Chain.jpg" alt="The Replace Selection menu on its Chain tab, listing chains A, HA, B and HB" /> | <vimg src="navigating-page/Selection-Sub-Atom.jpg" alt="The Replace Selection menu on its Atom tab, listing atom names from N and CA to NH1 and NH2" /> |

### Atom Type

<ShotRow src="navigating-page/Selection.jpg" alt="The Selection menu on its Atom Type tab">

Select or deselect certain types of atoms.

<UiList label="Atom Type tab">
<UiItem icon="plus" name="Select all carbons" area="28.7,24.4,62.2,15.1">Selects every carbon atom.</UiItem>
<UiItem icon="minus" name="Deselect all carbons" area="28.7,39.7,62.2,15.1">Deselects every carbon atom.</UiItem>
<UiItem icon="plus" name="Select all hetatoms" area="28.7,64.4,62.2,15.1">Selects every hetatom.</UiItem>
<UiItem icon="minus" name="Deselect all hetatoms" area="28.7,79.6,62.2,15.2">Deselects every hetatom.</UiItem>
</UiList>

</ShotRow>

### Residue Type

<ShotRow src="navigating-page/Selection-ResidueType.jpg" alt="The Selection menu on its Residue Type tab">

Select or deselect certain types of residues.

<UiList label="Residue Type tab">
<UiItem icon="plus" name="Select all waters" area="28.1,23.8,62.7,15.1">Selects every water.</UiItem>
<UiItem icon="minus" name="Deselect all waters" area="28.1,39.1,62.7,15.1">Deselects every water.</UiItem>
<UiItem icon="plus" name="Select all amino acids" area="28.1,63.8,62.7,15.1">Selects every amino acid.</UiItem>
<UiItem icon="minus" name="Deselect all amino acids" area="28.1,79.1,62.7,15.2">Deselects every amino acid.</UiItem>
</UiList>

</ShotRow>

### Distance

<ShotRow src="navigating-page/Selection-Distance.jpg" alt="The Selection menu on its Distance tab">

Expand or shrink the selection range by physical proximity.

<UiList label="Distance tab">
<UiItem icon="ruler-2" name="Angstrom" area="27.9,20.2,62.7,18.7">The distance, in Angstroms. 5 here.</UiItem>
<UiItem icon="arrows-maximize" name="Extend Selection" area="28.1,43.0,62.2,15.6">Grows the selection by the distance above. Greyed out here.</UiItem>
<UiItem icon="minimize" name="Shrink Selection" area="28.1,58.8,62.2,15.8">Shrinks the selection by the distance above. Greyed out here.</UiItem>
</UiList>

</ShotRow>

## Macro

<vimg src="navigating-page/Macro.jpg" />

[Please view the macros page to learn more.](/nanome1x/macros/overview)

## Content Discovery

<vimg src="navigating-page/content_discovery_menu.png" />

Tutorials of advanced concepts and features in Nanome, presented using spatial recordings.

## Advanced Tutorials

See [Content Discovery](#content-discovery).

## Spatial Recordings

<vimg src="navigating-page/spat_rec_menu.png" />

Record your entire workspace, including structures, menus, and virtual movements; then, playback at a later time. During the playback you can pause and even interact with the structures in the recording.

Spatial recordings can be accessed from either the Wrist Menu (see below) or the [Action Menu](/nanome1x/navigation/actionmenu).

<vimg src="navigating-page/wrist_menu_spatrec.png" />

As of April 2021 (Nanome 1.20), this feature is in BETA - in particular, spatial recordings created in version 1.20 will not be playable in future versions.
