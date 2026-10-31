---
title: LiveDesign
---

# LiveDesign

## Authentication

This Nanome plugin uses an authentication token to interact with LiveDesign.

<ShotRow src="plugins-page/livedesign/main.jpg" alt="The LiveDesign Login menu with its three steps">

When starting the plugin for the first time, this is what the login menu looks like:

<UiList label="LiveDesign Login">
<UiItem name="1. Login to LD" area="4.4,11.7,91.5,17.0">Opens the Nanome web browser to log in to LiveDesign.</UiItem>
<UiItem name="2. Get Auth Token" area="4.4,28.9,91.5,16.7">Opens a web page with your token.</UiItem>
<UiItem name="Auth Token" area="4.4,61.5,91.5,17.3">Under 3. Paste Auth Token Below. The token goes here.</UiItem>
<UiItem name="Login with Token" area="4.4,81.5,91.5,14.0">Logs in with the pasted token.</UiItem>
</UiList>

</ShotRow>

First you will need to click on "Login to LD", which will open the Nanome web browser. Please log in to LiveDesign using your usual credentials.

<vimg src="plugins-page/livedesign/okta.jpg" alt="The LiveDesign Login menu beside the Nanome web browser open to a sign-in page, with the keyboard below" />

<ShotRow src="plugins-page/livedesign/token.jpg" alt="The Nanome web browser with a blank page, the keyboard open below it and Copy circled in red">

Once logged in, click "Get Auth Token". This opens a web page with your token.

If the keyboard is not opened, click on the keyboard icon on the lower left part of the web browser, then click to select the whole token string and click "Copy" button, next to the keyboard.

<UiList label="Web browser">
<UiItem icon="keyboard" name="Keyboard" area="8.3,68.5,5.8,5.5">Lower left of the web browser. Opens the keyboard.</UiItem>
<UiItem icon="copy" name="Copy" area="8.9,79.7,6.0,5.7">Copies the selected token.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/livedesign/token_paste.jpg" alt="The LiveDesign Login menu above the keyboard, with Paste circled in red">

Then, on the LiveDesign plugin, click on the "Auth Token" input field, just under the "Paste Auth Token Below" text. The keyboard will appear and you can use the "Paste" button to paste the authentication token.

<UiList label="Paste the token">
<UiItem name="Auth Token" area="34.1,41.4,45.7,13.7">Click here first. The keyboard appears.</UiItem>
<UiItem icon="clipboard" name="Paste" area="5.1,81.9,9.2,12.9">Pastes the token into the field.</UiItem>
</UiList>

</ShotRow>

Lastly, click on "Login with Token", the plugin will update to show this menu:

<vimg src="plugins-page/livedesign/main_page.jpg" alt="The LiveDesign Plugin menu with empty Project Name, LiveReport Name and 3D column lists, asking you to select a project, a LiveReport and a 3D column" />

You only need to do this once every 30 days, since LiveDesign tokens refresh every 30 days. Until then the plugin reuses the token.

## Usage

This plugin allows you to load molecular data from LiveDesign or send ligand poses to a LiveReport.

## Load data from LiveDesign

<ShotRow src="plugins-page/livedesign/unfiltered.jpg" alt="The LiveDesign Plugin menu with the LiveReport list open and unfiltered">

To load data from LiveDesign, first select a Project name in the list of projects. Only the first 50 projects will be shown. If the wanted project is not listed, type the first letters of the project name in the "Project filter" input field, the list of projects will update with names containing the typed letters.

Similarly, select a LiveReport name and 3D columns. Remember that you can filter both by typing text in the input fields on top of the dropdown menus.

<UiList label="Plugin menu">
<UiItem name="Project filter" area="0.5,8.9,29.0,8.5">Type the first letters of a project name.</UiItem>
<UiItem name="Project Name" area="0.5,19.3,29.0,8.7">The list of projects. Shows the one you picked, here Project 1.</UiItem>
<UiItem name="LiveReport filter" area="30.0,8.9,38.9,8.5">Filters the LiveReport names.</UiItem>
<UiItem name="LiveReport Name" area="30.0,19.3,38.9,45.4">The list of LiveReports, open here.</UiItem>
<UiItem name="3D column filter" area="69.4,8.9,29.0,8.5">Filters the 3D columns.</UiItem>
<UiItem name="3D column" area="69.4,19.3,29.0,8.7">The list of 3D columns.</UiItem>
</UiList>

</ShotRow>

Example of unfiltered (above) and filtered LiveReport names:

<vimg src="plugins-page/livedesign/filtered.jpg" alt="The LiveDesign Plugin menu with wee typed in the LiveReport filter, leaving only Wee1 Data Snapshot in the list" />

<ShotRow src="plugins-page/livedesign/preview.jpg" alt="The entity list, with a larger preview of a compound's 2D picture">

Now, a list of entities presented in rows should be displayed. You can hover over the compound 2D picture to get a larger preview of the image:

Entity names can be filtered using the "Entity names" input field to only show part of the entity list.

<UiList label="Entity list">
<UiItem name="Compound picture" area="4.6,37.9,16.0,23.5">Hover over it for a larger preview.</UiItem>
<UiItem name="Larger preview" area="31.1,37.2,37.9,54.0">Shows while you hover.</UiItem>
<UiItem name="Entity names" area="2.5,28.4,78.0,8.6">Filters the entity list.</UiItem>
<UiItem name="Check box" area="22.2,47.2,3.6,5.4">Selects the entity.</UiItem>
<UiItem name="Select all" area="6.3,91.4,20.4,8.4">Selects every entity.</UiItem>
<UiItem name="Load" area="41.1,91.4,13.6,8.4">Loads the 3D data of the selected entities into Nanome.</UiItem>
<UiItem name="Send to LiveDesign" href="#send-3d-poses-to-livedesign" area="63.1,91.4,31.7,8.4">Sends selected ligand poses to the LiveReport.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/livedesign/column.jpg" alt="The LiveDesign Plugin menu with two added column filters, Lot Scientist and Glide Docking">

You can also add up to 2 descriptive columns and filter entities using the added column by clicking on the "+" sign:

<UiList label="Added columns">
<UiItem icon="plus" name="Add column" area="93.9,79.2,4.4,16.8">The "+" sign. Adds a descriptive column, up to 2.</UiItem>
<UiItem name="Column filter" area="35.1,74.7,25.3,23.9">One for each added column, such as Lot Scientist. Filters entities by that column.</UiItem>
</UiList>

</ShotRow>

Select one or more entities and click "Load" to retrieve their 3D data and display them in Nanome:

<vimg src="plugins-page/livedesign/loaded.jpg" alt="V35000 checked in the LiveDesign Plugin menu and loaded into the Entry List, beside the protein in the workspace" />

<ShotRow src="plugins-page/livedesign/advanced.jpg" alt="The Entry List with the Advanced Menus button circled in red">

Poses of the same ligand appear as a single entry that contains several frames. You can change frames by clicking on the advanced menu here:

<UiList label="Entry List">
<UiItem name="Advanced Menus" area="77.8,29.0,5.8,5.8">On the entry's row. Toggles advanced menus such as Frames.</UiItem>
</UiList>

</ShotRow>

<ShotRow src="plugins-page/livedesign/advanced2.jpg" alt="The advanced menu for V35000 beside the Entry List, with the next frame arrow circled in red">

<UiList label="Advanced menu">
<UiItem icon="chevron-left" name="Previous frame" area="49.0,19.2,4.7,8.7">Goes back one frame.</UiItem>
<UiItem icon="chevron-right" name="Next frame" area="65.8,19.1,4.9,9.2">Goes to the next frame. The counter shows the frame, here 1/3.</UiItem>
</UiList>

</ShotRow>

## Send 3D poses to LiveDesign

To upload to LiveDesign, first select the ligand(s) you want to send, then open the LiveDesign plugin, select the Project and the LiveReport you want to upload to.
Lastly, click on the "Send to LiveDesign" button.

If the LiveReport already contains the uploaded ligand, it will add poses to this ligand in the "Nanome Upload (3D)" column.
If not, a new row will be created and poses will be added to it in the "Nanome Upload (3D)" column.

<vimg src="plugins-page/livedesign/sending.jpg" alt="The Entry List with V35000_modif selected, beside the LiveDesign Plugin menu set to Project 1 and the TestImport LiveReport" />
<vimg src="plugins-page/livedesign/ld.jpg" alt="A LiveReport in LiveDesign with the sent pose in the Nanome Upload (3D) column of the V35000 row" />

## Experiencing issues or not seeing the plugin?
Feel free to reach out to support@nanome.ai and we'll get back to you soon. 
