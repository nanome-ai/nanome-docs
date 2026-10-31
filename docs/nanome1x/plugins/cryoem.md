---
title: Cryo-EM
---

# Cryo-EM

The Cryo-EM plugin allows you to load Cryo-EM maps into Nanome.

There are two ways to load a map into Nanome:
1) Load a map from the Electron Microscopy Data Bank (EMDB), and align it with its corresponding model from RCSB database.

2) Load Maps and models from your Vault.

##  Instructions

### Load Map and Model

<ShotRow src="plugins-page/cryo-em/CryoMainMenu.png" alt="The Cryo-EM main menu, with Load From EMDB and Load From Vault on the left and MapGroup 1 under Current Groups on the right" crop="4.2,5.3,91.1,89.0">

<Steps>

1. Ensure that a MapGroup is selected on the right hand side of the main menu
    - Map groups are used to organize your maps and models. You can have 1 map per Mapgroup, with multiple models.
    - The map group with a green square next to it is the one that the maps/models will be added to in the following steps

2. Select which method you wish to load the map with

</Steps>

<UiList label="Cryo-EM main menu">
<UiItem name="Load From EMDB" href="#load-from-emdb" area="15.8,32.6,26.6,15.6">Loads a map from the Electron Microscopy Data Bank.</UiItem>
<UiItem name="Load From Vault" href="#load-from-vault" area="17.2,68.4,25.6,15.0">Loads maps and models from your Vault.</UiItem>
<UiItem name="Green square" area="54.0,32.4,4.4,5.6">Marks the map group that maps and models are added to.</UiItem>
<UiItem name="MapGroup 1" href="#edit-map" area="59.5,28.9,30.5,12.6">A map group. Click it to open the Edit Map Menu.</UiItem>
</UiList>

</ShotRow>

#### Load from Vault
- **Load From Vault** opens the Vault navigation menu.
- Find the maps and models you have already uploaded, select them, and press Load.

#### Load from EMDB

<ShotRow src="plugins-page/cryo-em/CryoEMDBMenu.png" alt="The Cryo-EM Load from EMDB menu, with EMDB ID 8216 entered in the map Textbox" crop="1.8,2.6,96.9,93.7">

Find the EMDB ID for the map you wish to load. Enter the id in the Textbox and press Load
- The Browse EMDB button will open EMDB in the web browser
- The plugin checks a map's size before downloading it, and shows an error if the map is over its size limit.
- After the Map loads, the RCSB code will be prepopulated in the next Textbox. Load this by pressing load.
- The structure will be added to your workspace, and aligned to the previously loaded map.

<UiList label="Load from EMDB">
<UiItem name="Browse EMDB" area="81.0,18.4,14.6,4.4">Opens EMDB in the web browser.</UiItem>
<UiItem name="EMDB ID" area="5.4,30.5,45.5,16.6">The Textbox for the map's EMDB ID.</UiItem>
<UiItem name="Load" area="51.7,30.4,43.8,16.7">Loads the map, if it's under the plugin's size limit.</UiItem>
<UiItem name="RCSB code" area="5.1,60.9,45.8,16.0">Filled in with the RCSB code after the map loads.</UiItem>
<UiItem name="Load" area="51.7,60.9,43.9,16.2">Adds the structure to your workspace, aligned to the map.</UiItem>
</UiList>

</ShotRow>

### Edit Map

<ShotRow src="plugins-page/cryo-em/CryoEditMapMenu.png" alt="The Edit Map Menu for 8216.map, with the Contour / Isovalue slider, Color Scheme dropdown and map boxing buttons" crop="3.9,2.7,94.1,94.0">

To edit map colors and isovalues, click the mapgroup on the right hand side. This will open the Edit Map Menu.

<UiList label="Cryo-EM Edit Map Menu">
<UiItem name="Contour / Isovalue" href="#edit-isovalue" area="49.2,58.1,43.9,4.8">The slider for a new isovalue.</UiItem>
<UiItem name="Redraw Map" href="#edit-isovalue" area="79.3,47.5,12.9,8.4">Redraws the map at the isovalue on the slider.</UiItem>
<UiItem name="Color Scheme" href="#change-color-scheme" area="47.7,76.7,46.4,6.3">Dropdown for the coloring scheme of the map.</UiItem>
<UiItem name="Show Full Map" href="#map-boxing-options" area="9.3,85.4,27.8,8.8">Renders the entire map.</UiItem>
<UiItem name="Box Around Model" href="#map-boxing-options" area="37.2,84.9,28.9,8.9">Renders the map only around the model.</UiItem>
<UiItem name="Box Around Selection" href="#map-boxing-options" area="66.2,84.5,26.9,8.8">Renders the map around selected atoms.</UiItem>
</UiList>

</ShotRow>

#### Edit Isovalue
Select a new isovalue on the slider, and press the "Redraw Map" button

#### Change Color Scheme
On the bottom of the menu, there is a dropdown to edit the coloring scheme of the map. 

Note that color schemes are based on loaded model, so just a map on its own will not be colored.

Color Options:
- **Element**: When a model is present, the map is colored according to the nearest element on the model
- **BFactor**: Colored according to model BFactor
- **Chain**: Each chain on the model is given a different color.

#### Map Boxing Options
We provide the ability to only show a subset of the loaded map.

There are 3 ways to edit the section of the map rendered.

1. **Show Full Map**: This will render the entire map. This is the default load mode, so it's useful for resetting after using other boxing methods.
2. **Box Around Model**: When a model has been added to the Mapgroup, this will only render the map around the model.
3. **Box Around Selection**: The map will be rendered around selected atoms on the model. This is useful around larger models, when you only want to see a small subset.
