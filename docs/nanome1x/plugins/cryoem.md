---
title: Cryo-EM
---

# Cryo-EM

The Cryo-EM plugin allows you to load Cryo-EM maps into Nanome.

There are two ways to load a map into Nanome
1) Load a map from the Electron Microscopy Data Bank (EMDB), and align it with it's corresponding model from RCSB database.

2) Load Maps and models from your Vault.

##  Instructions

### Load Map and Model
<vimg src="plugins-page/cryo-em/CryoMainMenu.png" />
<i>Cryo-EM main menu</i>

1. Ensure that a MapGroup is selected on the right hand side of the main menu
    - Map groups are used to organize your maps and models. You can have 1 map per Mapgroup, with multiple models.
    - The map group with a green square next to it is the one that the maps/models will be added to in the following steps

2. Select which method you wish to load the map with
    #### Load from Vault
    - The Browse Vault button will open the Vault navigation menu.
    - Find the maps and models you have already uploaded, select them, and press Load.

    #### Load from EMDB
    <vimg src="plugins-page/cryo-em/CryoEMDBMenu.png" />
    <i>Load from EMDB Menu</i>

    Find the EMDB ID for the map you wish to load. Enter the id in the Textbox and press Load
    - The Browse EMDB button will open EMDB in the web browser
    - Files must be under 500MB. Unfortunately there is no way to tell unless you try loading it.
    - After the Map loads, the RCSB code will be prepopulated in the next Textbox. Load this by pressing load.
    - The structure will be added to your workspace, and aligned to the previously loaded map.

### Edit Map
<vimg src="plugins-page/cryo-em/CryoEditMapMenu.png" />
<i>Cryo-EM Edit Map Menu</i>

To edit map colors and isovalues, click the mapgroup on the right hand side. This will open the Edit Map Menu.

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

1. **Show Full Map**: This will render the entire map. This is the default load mode, so its useful for resetting after using other boxing methods.
2. **Box Around Model**: When a model has been added to the Mapgroup, this will only render the map around the model.
3. **Box Around Selection**: The map will be rendered around selected atoms on the model. This is useful around larger models, when you only want to see a small subset.
