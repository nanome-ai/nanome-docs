---
title: Stack Studio
---

# Stack Studio

*A drag and drop interface for creating Plugin Menus*

Stack studio is a GUI for creating plugin user interfaces that appear before users in Nanome. A Nanome plugin usually contains two major components: plugin scripts and plugin UI. While the scripts contain the behavior and computation of the plugin, the plugin UI is what the users sees and accesses in Nanome software. To create a sophisticated Nanome plugin, it's very likely that you would need to both write the script and create the UI.

## Get Started

Currently, Stack Studio is still in beta and we would love to hear your feedback! You can either send us an email (bugs@nanome.ai) or join our Slack user group to chat (https://nanome.ai/slack).

### Download the latest StackStudio version 0.5.2:

<a href="https://nanome.s3-us-west-1.amazonaws.com/installers/StackStudio/StackStudio_v5.2_Windows.zip" class="btn">Windows Download </a>
<a href="https://nanome.s3-us-west-1.amazonaws.com/installers/StackStudio/StackStudio_v0.5_Mac.zip" class="btn">Mac Download </a>


1. If you are a Nanome Stack beta user, please download Stack Studio from the provided link and extract the compressed file. If you can't extract it, you can download any archiver such as [7zip](https://www.7-zip.org/download.html) to do so.

2. Once you extract the file, open StackStudio.exe from the extracted content. Once StackStudio.exe is running, you should be seeing the interface below.
<vimg src="plugins-page/pluginator/stackstudio.JPG" />

3. Create a JSON file at your preferred location. Copy paste the RMSD plugin menu content from [here](https://raw.githubusercontent.com/nanome-ai/plugin-rmsd/master/nanome_rmsd/rmsd_pluginator.json) into the JSON file.

4. Open file option in Stack Studio and select [Import]. Choose the JSON file that you just created.
<vimg src="plugins-page/pluginator/import.JPG" />

5. Once the JSON file is loaded, you should be seeing the interface below.
<vimg src="plugins-page/pluginator/rmsd.JPG" />

6. This is the menu of Nanome's first-party plugin, RMSD. You can feel free to play with it to get a rough idea of how Stack Studio works.

## Workspace

<vimg src="plugins-page/pluginator/new1.JPG" />

### Menu View

<vimg src="plugins-page/pluginator/menu.JPG" />

Menu view renders a 2D interactable preview of the menu that you are creating. Any changes that you make to the menu is immediately reflected here. For interactable menu contents such as buttons and sliders, you can use your mouse to interact with them in the preview to check their visual behavior such as highlight color. However, since this is only a preview, interacting with the menu will not trigger any function.

### Outline View

<vimg src="plugins-page/pluginator/outline.JPG" />

Nanome plugin UI is managed in a hierarchical fashion, and layout provides an easy access to this hierarchy. Each component in the menu is called a node. A node's size is always smaller than its parent node. You can collapse or expand a node that contains multiple children nodes. Click on the eye icon on a node to toggle its visibility. Drag and drop a node to move it in the hierarchy and change it's parent.

### Editor View

<vimg src="plugins-page/pluginator/editor.JPG" />

Editor provides options in editing the layout of a node, the node's content, and the menu size. These options are organized into three tabs. Switch tab by clicking on the tab that you want to view or edit. Switch what node you are editing by clicking on that node in the outline view.

#### Layout Tab

<vimg src="plugins-page/pluginator/layout.JPG" />

Here in layout tab, you can change the way children nodes are laid out under the node that you are editing.

#### Content Tab

<vimg src="plugins-page/pluginator/content.JPG" />

Here in content tab, you can change the properties of a node's content. The properties that get displayed here depend on the type of the content. By default, a new node does not have any content. Click on [Add Content] to assign a content to this node.

<vimg src="plugins-page/pluginator/button_content.JPG" />

When a node is assigned a content type, you can view and edit its properties, such as name and padding. The picture above shows the properties of a button. To learn more about what properties are available, check out the [UI Components](https://docs.nanome.ai/plugins/stackstudio.html#ui-components) section.

#### Window Tab

<vimg src="plugins-page/pluginator/window.JPG" />

Here in window tab, you can change the menu window title and size. This tab changes the menu window properties, so it is independent from the node you selected to edit.

## UI Components

<vimg src="plugins-page/pluginator/contenttype.JPG" />

When you add content to a new node, these are the contents currently available.

### Button

<vimg src="plugins-page/pluginator/button.JPG" />

Button is the fundamental interactable component of a plugin menu. When clicked on, a button sends an event to the plugin script with its name as payload. A button can include five sub-components, all of which being optional: __Text__, __Icon__, __Mesh__, __Outline__, __Tooltip__. A button contains five states: __Idle__, __Selected__, __Highlighted__, __Both__, __Unusable__. You can customize the properties, such as color and visibility, of all five sub-components under all five states.

### Mesh

<vimg src="plugins-page/pluginator/mesh.JPG" />

Mesh is a solid chunk that serves as a background. You can customize its color.

### Slider

<vimg src="plugins-page/pluginator/slider.JPG" />

Slider is an interactable component that sends the current slider position to the plugin script. It is useful in allowing the plugin user to change a value.

### List

<vimg src="plugins-page/pluginator/list.JPG" />

List is a two-dimensional grid of children nodes that have to be assigned and managed during runtime in the plugin script. It allows the plugin to dynamically generate a menu of contents.

### Image

<vimg src="plugins-page/pluginator/image.JPG" />

Image is a 2D image. You can change the image's color.

### Label

<vimg src="plugins-page/pluginator/label.JPG" />

Label is a static text that cannot be interacted.

### Text Input

<vimg src="plugins-page/pluginator/textinput.JPG" />

Text input is a text input field. The field's content is sent to the plugin script when the text is submitted.

### Loading Bar

<vimg src="plugins-page/pluginator/loadingbar.JPG" />

Loading bar is a horizontal bar that can be empty or filled by a solid color that represents progress. It is mainly used to indicate progress for plugins that can take a longer time to run.

## Integrate a Plugin Menu

Integrating a menu created with Stack Studio into a plugin is simple:

### 1. Export the plugin menu as a JSON file

<vimg src="plugins-page/pluginator/export.JPG" />

Open the file dropdown menu and select [Export].

### 2. Place the exported JSON file in the folder where you are creating your plugin

<vimg src="plugins-page/pluginator/integrate.JPG" />

Be sure to check that this is the same folder as the plugin script that you are writing.

## Hotkeys
__ctrl-n__ – spawn a new menu

__n__ – add a layoutnode

__c__ – add a content

__1,2,3__ – change tabs on the inspector

__up, down__ – change selected node to the one above, below

__left, right__ – change selected node to parent, child.

__ctrl-up, ctrl-down__ – move selected node up/down

__ctrl-left, ctrl-right__ – deparent, parent selected node

__ctrl-c, ctrl-x, ctrl-v__ – copy, cut , paste selected node

__ctrl-shift-c, ctrl-shift-v__ – copy node to clipboard, paste node from clipboard

__ctrl-s, ctrl-o__ – export import

__F2__ – rename selected node

__delete, backspace__ – delete selected node
