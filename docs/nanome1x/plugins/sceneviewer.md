---
title: Scene Viewer

---

# Scene Viewer

The Scene Viewer is an extension of Nanome’s Vault.  Users can arrange content in 3D with informative rendering and label annotations and save these Scenes into a Scene Deck, a .nanoscenes file that is saved in Vault.  This provides a way to organize presentations and work that involves multiple protein entries that are best studied alone or in smaller groups, sequentially.

In **Edit** mode, users can create scenes, name them, and provide short descriptions to help direct focus on key aspects of the scene.  Scenes can be updated, reordered, added, and deleted.   Content from one scene may be copied and pasted into another scene.

In view mode (Edit mode toggled Off), the scenes of the deck can be viewed by clicking forward and backward, and the name and description can be hidden or shown, and independently positioned and scaled in the space to support various presentation scenarios.

## Instructions

1.  Accessing the Scene Viewer

    The Scene Viewer is accessible from Vault, in the Stacks menu.

<ShotRow src="plugins-page/scene-viewer/access-viewer-1.png" alt="The Stacks menu with Vault picked in the plugin list, and its Deactivate and Open buttons">

Activate and open Vault.

<UiList label="Stacks menu">
<UiItem name="Vault" area="2.7,88.3,47.0,10.5">Vault in the list of plugins.</UiItem>
<UiItem name="Activate" area="59.5,87.4,16.4,10.5">Reads Deactivate here, since Vault is already active.</UiItem>
<UiItem name="Open" area="78.2,87.6,16.1,10.1">Opens Vault.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/scene-viewer/access-viewer-2.png" alt="Vault at its top folder, with Actions in the lower left corner">

Click on **Actions** in the lower left corner.

<UiList label="Vault">
<UiItem name="Actions" area="3.3,91.7,30.5,7.9">Shows more options, including Open Scene Viewer.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/scene-viewer/access-viewer-3.png" alt="Vault with the Actions options open: Open Website, Open Scene Viewer and Sort by">

Choose the **Open Scene Viewer** option to open the Scene Viewer menu.

<UiList label="Vault Actions">
<UiItem name="Open Scene Viewer" area="7.4,30.6,40.2,8.3">Opens the Scene Viewer menu.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/scene-viewer/access-viewer-4.png" alt="The Scene Viewer menu with no scenes yet and a Create New Scene button">

*The Scene Viewer menu, before any scene is made.*

<UiList label="Scene Viewer">
<UiItem icon="plus" name="Create New Scene" area="25.2,81.0,48.7,17.6">Makes the first scene.</UiItem>
</UiList>

</ShotRow>

2. Creating the First Scene

<ShotRow src="plugins-page/scene-viewer/create-scene-1.png" alt="The Scene Viewer in Edit Mode with Scene 1 and its Update, Notes and Delete buttons">

Arrange and render the 3D content, including size, location and hiding of any workspace content that is not wanted for the scene. Click **update**.

<UiList label="Scene Viewer in Edit Mode">
<UiItem name="Edit Mode" area="1.4,27.9,26.4,18.3">On to create and edit scenes. Off for view mode.</UiItem>
<UiItem icon="files" name="Copy Selection" area="29.6,27.1,23.8,20.1">Copies content from one scene to paste into another.</UiItem>
<UiItem icon="plus" name="New Scene" area="55.0,27.1,19.9,20.1">Adds a scene below the active one.</UiItem>
<UiItem name="Scene 1" area="3.1,55.5,50.9,42.4">The active scene, with its default name.</UiItem>
<UiItem icon="refresh" name="Update" area="54.5,61.1,9.5,29.3">Saves the current 3D content to the scene.</UiItem>
<UiItem icon="info-circle" name="Notes" area="64.2,61.1,9.2,29.3">Opens the entry menu for the scene's name and description.</UiItem>
<UiItem icon="trash" name="Delete" area="73.7,61.1,9.8,29.3">Deletes the scene.</UiItem>
<UiItem icon="arrows-sort" name="Up and down arrows" area="86.1,60.3,5.7,33.2">Move the scene up or down the deck.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/scene-viewer/create-scene-2.png" alt="The Scene Info entry menu over the Scene Viewer, with the name Loaded protein and a description" crop="27.8,8.2,40.1,91.8">

Select **notes** to open the entry menu for name and description of the scene. A character counter is provided. Click **update**. This will update the scene viewer menu with the scene name.

<UiList label="Scene Info">
<UiItem name="Name" area="30.6,50.2,34.7,9.2">The scene's name. Loaded protein here.</UiItem>
<UiItem name="Description" area="30.7,60.0,34.6,24.2">A short description, with a character counter (36/500 here).</UiItem>
<UiItem name="Cancel" area="44.9,86.7,9.8,10.0">Closes the menu without changes.</UiItem>
<UiItem name="Update" area="55.0,86.8,10.0,10.2">Saves the name and description to the scene.</UiItem>
</UiList>

</ShotRow>

<vimg src="plugins-page/scene-viewer/create-scene-3.png" alt="The Scene Viewer in Edit Mode with the scene now named Loaded protein" />

<em>The scene now shows its new name.</em>

3. Creating subsequent Scenes

<ShotRow src="plugins-page/scene-viewer/more-scenes-1.png" alt="The Scene Viewer with Loaded protein and a new scene, Scene 2, below it">

- New scenes are created by clicking on **+ New Scene** in the top bar of the menu. The new scene will consist of the content at the time **+ New Scene** is chosen. The new scene will be added to the deck in the position just below the scene from which **+ New Scene** was chosen. For example, if scenes ordered A, B, C, D have been made, and scene B is active when a new scene is added, the new scene will be positioned between B and C in the deck. When finished editing the new scene and associated notes, click **update**.  
    - Users may select any scene in the deck from which to start a new scene.  
    - Users may edit the active scene,  then add a new scene and update, or
    - Users may add a new scene, then edit and update it.
- Remember to choose update before switching scenes in edit mode. 

*A new scene has been added, with default name Scene 2.*

<UiList label="Scene Viewer with two scenes">
<UiItem icon="plus" name="New Scene" area="54.5,18.7,20.4,13.1">Adds a scene below the active one.</UiItem>
<UiItem name="Loaded protein" area="3.6,37.0,89.3,29.4">The first scene, under the name given in Notes.</UiItem>
<UiItem name="Scene 2" area="3.7,66.4,50.2,29.4">The new scene, now active.</UiItem>
</UiList>

</ShotRow>

<vimg src="plugins-page/scene-viewer/more-scenes-2.png" alt="A new scene, pink sheets, with some sheets colored pink" />

<em>An example of a new scene with rendering changes.</em>

<vimg src="plugins-page/scene-viewer/more-scenes-3.png" alt="A Scene Deck with several scenes and labeled residues in the workspace" />

<em>Several scenes in a Scene Deck have been created.</em>

4. Reviewing scenes in View mode (Edit mode toggled off)

<ShotRow src="plugins-page/scene-viewer/review-scenes-1.png" alt="The Scene Viewer with Edit Mode off, showing the scene list, Open Scene Info and the arrows" crop="0,11.1,53.6,85.6">

- When **Edit mode** is toggled off, the menu options are simplified to viewing controls. Select a scene to view it, or use the arrows (<< , < , > , >>) to navigate through the scenes.
- Click **Open Scene Info** to see the notes on the scene in a separate panel. Move and scale the panel to preference; it will remain in position with only content changes as scenes are changed.

*The Scene Viewer when Edit Mode is toggled off.*

<UiList label="Scene Viewer in view mode">
<UiItem name="Edit Mode" area="1.5,20.3,14.2,6.3">Off here, so only viewing controls show.</UiItem>
<UiItem icon="info-circle" name="Open Scene Info" area="38.3,20.6,13.6,5.5">Shows the scene's name and description in a separate panel.</UiItem>
<UiItem name="Scenes" area="2.5,28.8,48.4,56.9">Select a scene to view it.</UiItem>
<UiItem name="Arrows" area="17.9,87.6,17.7,6.3">Navigate through the scenes.</UiItem>
</UiList>

</ShotRow>

<vimg src="plugins-page/scene-viewer/review-scenes-2.png" alt="The Scene Info panel showing the name and description of the long sheets scene" />

<em>Clicking Open Scene Info opens a new panel with the name and description.</em>

<vimg src="plugins-page/scene-viewer/review-scenes-3.png" alt="The Scene Info panel moved beside the structure" />

<em>Move the Scene Info panel to a suitable position and scale for viewing.</em>

<vimg src="plugins-page/scene-viewer/review-scenes-4.png" alt="The Scene Info panel moved above the Scene Viewer" />

<em>Move the Scene Info panel to a suitable position and scale for viewing.</em>

5. Saving Scene Decks (.nanoscenes files)

<ShotRow src="plugins-page/scene-viewer/save-scene-1.png" alt="The Scene Viewer in Edit Mode with Save Deck to Vault below the scene list">

In **Edit Mode**, choose **Save Deck to Vault**.

<UiList label="Scene Viewer in Edit Mode">
<UiItem name="Edit Mode" area="3.7,10.3,26.2,8.8">On, since saving is done in Edit Mode.</UiItem>
<UiItem name="Save Deck to Vault" area="27.1,86.1,46.2,11.0">Opens a pop up menu to name the deck.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/scene-viewer/save-scene-2.png" alt="The Name your Scene Deck pop up with the name My 5ly6 deck">

In the pop up menu, enter a name and click **Save**.

<UiList label="Name your Scene Deck">
<UiItem name="Deck name" area="6.1,54.3,87.6,10.2">The name of the .nanoscenes file.</UiItem>
<UiItem name="Cancel" area="42.8,86.0,24.6,10.2">Closes the pop up without saving.</UiItem>
<UiItem name="Save" area="68.2,85.6,25.1,11.1">Saves the deck. Vault then asks where.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/scene-viewer/save-scene-3.png" alt="Vault asking where to save the file, with my org/ picked">

Vault will open; choose where to save the file in your vault. If Vault is already open, check the menu after clicking save to choose the save location.

<UiList label="Vault save location">
<UiItem icon="folder" name="Folders" area="32.9,19.7,54.9,61.3">The folders in your vault.</UiItem>
<UiItem name="Save Here" area="59.7,81.5,27.5,8.4">Saves the deck to the chosen location.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/scene-viewer/save-scene-4.png" alt="Vault showing My 5ly6 deck .nanoscenes in a folder">

*The saved deck in Vault.*

<UiList label="Vault">
<UiItem name="My 5ly6 deck .nanoscenes" area="34.3,19.8,59.2,10.9">The Scene Deck file.</UiItem>
</UiList>

</ShotRow>
