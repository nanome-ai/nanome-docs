---
title: Stack Studio
---

# Stack Studio

*A drag and drop interface for creating Plugin Menus*

Stack studio is a GUI for creating plugin user interfaces that appear before users in Nanome. A Nanome plugin usually contains two major components: plugin scripts and plugin UI. While the scripts contain the behavior and computation of the plugin, the plugin UI is what the user sees and accesses in Nanome software. To create a sophisticated Nanome plugin, it's very likely that you would need to both write the script and create the UI.

## Get Started

You can send feedback to bugs@nanome.ai or chat with us in our Slack user group (https://nanome.ai/slack).

### Download Stack Studio

<a href="https://nanome.s3-us-west-1.amazonaws.com/installers/StackStudio/StackStudio_v5.2_Windows.zip" class="btn">Windows Download</a>
<a href="https://nanome.s3-us-west-1.amazonaws.com/installers/StackStudio/StackStudio_v0.5_Mac.zip" class="btn">Mac Download</a>


1. Download Stack Studio and extract the zip file. If you can't extract it, an archiver such as [7-Zip](https://www.7-zip.org/download.html) can.

2. Once you extract the file, open StackStudio.exe from the extracted content. Once StackStudio.exe is running, you'll see the interface below.
<vimg src="plugins-page/pluginator/stackstudio.JPG" alt="Stack Studio on first launch, with an empty menu view, the Outline, and the Editor reading Create a Menu" />

3. Create a JSON file at your preferred location. Copy the [RMSD plugin menu JSON](https://raw.githubusercontent.com/nanome-ai/plugin-rmsd/master/plugin/rmsd_pluginator.json) into the JSON file.

4. Open file option in Stack Studio and select [Import]. Choose the JSON file that you just created.
<vimg src="plugins-page/pluginator/import.JPG" alt="The File menu with Import highlighted" />

5. Once the JSON file is loaded, you'll see the interface below.
<vimg src="plugins-page/pluginator/rmsd.JPG" alt="Stack Studio with the RMSD plugin's menu in the menu view and its nodes in the Outline" />

6. This is the menu of Nanome's first-party plugin, RMSD. You can feel free to play with it to get a rough idea of how Stack Studio works.

## Workspace

<vimg src="plugins-page/pluginator/new1.JPG" alt="The Stack Studio workspace with a new menu titled Header, the Root node in the Outline, and the Editor on the Layout tab" />

### Menu View

<vimg src="plugins-page/pluginator/menu.JPG" alt="The menu view with an empty menu titled Header" />

Menu view renders a 2D interactable preview of the menu that you are creating. Any changes you make to the menu show up here right away. For interactable menu contents such as buttons and sliders, you can use your mouse to interact with them in the preview to check their visual behavior such as highlight color. However, since this is only a preview, interacting with the menu will not trigger any function.

### Outline View

<vimg src="plugins-page/pluginator/outline.JPG" alt="The Outline view with the Root node, and the Add Node and Delete Node buttons" />

Nanome plugin UI is managed in a hierarchical fashion, and Outline view gives easy access to this hierarchy. Each component in the menu is called a node. A node's size is always smaller than its parent node. You can collapse or expand a node that contains multiple children nodes. Click on the eye icon on a node to toggle its visibility. Drag and drop a node to move it in the hierarchy and change its parent.

### Editor View

<vimg src="plugins-page/pluginator/editor.JPG" alt="The Editor view on the Content tab, with an Add Content button" />

The Editor has options for a node's layout and content, and for the menu size. These options are organized into three tabs. Switch tab by clicking on the tab that you want to view or edit. Switch what node you are editing by clicking on that node in the outline view.

#### Layout Tab

<vimg src="plugins-page/pluginator/layout.JPG" alt="The Layout tab for the Root node, with Name, Orientation, Sizing Type, Padding and other settings" />

Here in layout tab, you can change the way children nodes are laid out under the node that you are editing.

#### Content Tab

<vimg src="plugins-page/pluginator/content.JPG" alt="The Content tab for a node with no content, showing only Add Content" />

Here in content tab, you can change the properties of a node's content. The properties that get displayed here depend on the type of the content. By default, a new node does not have any content. Click on [Add Content] to give this node content.

<vimg src="plugins-page/pluginator/button_content.JPG" alt="The Content tab for a button named newButton, with its Text, Icon, Mesh, Outline and Tooltip settings" />

When a node is assigned a content type, you can view and edit its properties, such as name and padding. The picture above shows the properties of a button. To learn more about what properties are available, check out the [UI Components](/nanome1x/plugins/stackstudio#ui-components) section.

#### Window Tab

<vimg src="plugins-page/pluginator/window.JPG" alt="The Window tab with the title Header, width 0.7 and height 0.6" />

Here in window tab, you can change the menu window title and size. This tab changes the menu window properties, so it is independent from the node you selected to edit.

## UI Components

<vimg src="plugins-page/pluginator/contenttype.JPG" alt="The Add Content menu: Button, Mesh, Slider, List, Image, Label, Text Input and Loading Bar" />

When you add content to a new node, these are the contents currently available.

### Button

<vimg src="plugins-page/pluginator/button.JPG" alt="A menu with one button that reads Button" />

Button is the fundamental interactable component of a plugin menu. When clicked on, a button sends an event to the plugin script with its name as payload. A button can include five sub-components, all of them optional: __Text__, __Icon__, __Mesh__, __Outline__, __Tooltip__. A button contains five states: __Idle__, __Selected__, __Highlighted__, __Both__, __Unusable__. You can customize the properties, such as color and visibility, of all five sub-components under all five states.

### Mesh

<vimg src="plugins-page/pluginator/mesh.JPG" alt="A menu filled with a solid blue mesh" />

Mesh is a solid chunk that serves as a background. You can customize its color.

### Slider

<vimg src="plugins-page/pluginator/slider.JPG" alt="A menu with a slider set partway" />

Slider is an interactable component that sends the current slider position to the plugin script. It is useful in allowing the plugin user to change a value.

### List

<vimg src="plugins-page/pluginator/list.JPG" alt="A menu with a list of numbered tiles in 2 columns and a scroll bar" />

List is a two-dimensional grid of children nodes that have to be assigned and managed during runtime in the plugin script. It allows the plugin to dynamically generate a menu of contents.

### Image

<vimg src="plugins-page/pluginator/image.JPG" alt="A menu showing an image of a worker in a hard hat" />

Image is a 2D image. You can change the image's color.

### Label

<vimg src="plugins-page/pluginator/label.JPG" alt="A menu with a label that reads Label" />

Label is static text that users can't interact with.

### Text Input

<vimg src="plugins-page/pluginator/textinput.JPG" alt="A menu with a text input that reads Type your text here" />

Text input is a text input field. The field's content is sent to the plugin script when the text is submitted.

### Loading Bar

<vimg src="plugins-page/pluginator/loadingbar.JPG" alt="A menu with a loading bar about a quarter full" />

Loading bar is a horizontal bar that can be empty or filled by a solid color that represents progress. It is mainly used to indicate progress for plugins that can take a longer time to run.

## Integrate a Plugin Menu

Integrating a menu created with Stack Studio into a plugin is simple:

### 1. Export the plugin menu as a JSON file

<vimg src="plugins-page/pluginator/export.jpg" alt="The File menu with Export highlighted" />

Open the file dropdown menu and select [Export].

### 2. Place the exported JSON file in the folder where you are creating your plugin

<vimg src="plugins-page/pluginator/integrate.JPG" alt="File Explorer showing a plugin folder with __init__.py, My_Plugin.py and the exported plugin_menu.json" />

Be sure to check that this is the same folder as the plugin script that you are writing.

## Hotkeys
__ctrl-n__: spawn a new menu

__n__: add a layoutnode

__c__: add a content

__1,2,3__: change tabs on the inspector

__up, down__: change selected node to the one above, below

__left, right__: change selected node to parent, child

__ctrl-up, ctrl-down__: move selected node up/down

__ctrl-left, ctrl-right__: deparent, parent selected node

__ctrl-c, ctrl-x, ctrl-v__: copy, cut, paste selected node

__ctrl-shift-c, ctrl-shift-v__: copy node to clipboard, paste node from clipboard

__ctrl-s, ctrl-o__: export, import

__F2__: rename selected node

__delete, backspace__: delete selected node
