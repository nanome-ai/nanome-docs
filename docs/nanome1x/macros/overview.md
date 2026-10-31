---
title: Macros in Nanome
---

# Macros in Nanome

Macros are custom shortcuts you’ll be able to program yourself to speed up your work.

<vimg src="macros-page/macros.gif" alt="Running the SiteView.All macro from the Macro menu, which changes how the protein is shown" />

## Summary

Nanome macros provide functionality for all of the following:

- Selection manipulation (Highlight and Focus on certain parts of the loaded entities)
- Command scheduling (edit the rendering and content of the selection)
- Molecular manipulation (read and write Workspace, Complexes, Molecules, Chains, Residues, Atoms)
- Search and find (Locate, search or find molecular structures, residues, atoms etc within the scene)
- Menu manipulation (read, locate and move the UI menus available to the user)
- User manipulation (read, locate and move the User that is using the macro)
- Store manipulation (allow you to save/load states between macros)
- System manipulation (The basic functions to read and write files locally)
- Primitive types (The basic types used by the different API functions)
- Network manipulation (For experts: lets you fine-tune everything that the user can see)

## Using Macros

To access macros, you can open the Macro submenu on your wrist or under the Entry List. We’ve set up some preset Macros already as seen on these menus. These macros let you focus on the active site(s) of a protein.

## Building Your Own Macros

To customize and/or create your own, open up your Nanome download files in Windows as shown below. You’ll find them in your Oculus, Steam or Vive folder.

<vimg src="macros-page/macros1.png" alt="File Explorer in Oculus Apps, Software, with the nanome-nanome folder selected" />

Click the folder named ‘Build’, then ‘BuildAssets’, then ‘Macros’ to open up the folder seen below.

<vimg src="macros-page/macros2.png" alt="File Explorer in Build, BuildAssets, Macros, with the SiteView.All, SiteView.Cycle and SiteView.Selection Lua files" />

Each of these Lua files will appear in your Macro menu as a separate Macro.

1. Create a new file: “MyNewMacro.lua” (or MyNewMacro.lua.txt) on your desktop
2. Edit and save the macro file
3. Start the macro “MyNewMacro” within Nanome

## Hello world!

A macro can be just a few lines of code

```lua
--[[
    Add a short description of the macro here (optional)
]]
function main ()
    Command_Notification("Hello world, my first macro!");
    return "SUCCESS";
end;
```

The programming language used here is Lua.
See: [https://www.lua.org/start.html](https://www.lua.org/start.html)

## Available Commands

A macro has access to all of Nanome’s capabilities through custom functions:

See: [https://github.com/nanome-ai/nanome-macros/blob/master/Documentation/API.md](https://github.com/nanome-ai/nanome-macros/blob/master/Documentation/API.md)

## Sharing Macros

Macros can be shared by copy/pasting the “.lua” file on different machines.

You can store the macros in one of the following supported folders (configurable in the config-file):

```text
C:\Users\<USERNAME>\Desktop\
C:\Users\<USERNAME>\Downloads\
C:\Users\<USERNAME>\Documents\
C:\Users\<USERNAME>\Documents\Nanome\
C:\Users\<USERNAME>\Documents\Nanome\Macros\
```

Optionally, a macro can be hosted through an HTTP server (configurable in the config-file)
