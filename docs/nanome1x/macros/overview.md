---
title: Macros In Nanome
---

# Macros In Nanome

Macros are custom shortcuts you’ll be able to program yourself to speed up your work.

<vimg src="macros-page/macros.gif" />

## Summary

Nanome macros provide functionality for all of the following:

- Selection manipulation (Highlight and Focus on certain parts of the loaded entities)
- Command scheduling (edit the rendering and content of the selection)
- Molecular manipulation (read and write Workspace, Complexes, Molecules, Chains, Residues, Atoms)
- Search and find (Easily locate, search or find molecular structures, residues, atoms etc within the scene)
- Menus manipulation (read, locate and move the UI menus available to the user)
- User manipulation (read, locate and move the User that is using the macro)
- Store manipulation (allow you to save/load states between macros)
- System manipulation (The basics functions to read and write files locally)
- Primitive types (The basics types functions used by the different API functions)
- Network manipulation (FOR EXPERTS, allow you to fine-tune everything that the user can see)

## Using Macros

To access macros, you’ll simply open up the new Macro submenu on your wrist or under the Entry Menu. We’ve set up some preset Macros already as seen on these menus. These macros allow you to easily focus on the active site(s) of a protein.

## Building Your Own Macros

To customize and/or create your own, open up your Nanome download files in Windows as shown below. You’ll find them in your Oculus, Steam or Vive folder.

<vimg src="macros-page/macros1.png" />

Click the folder named ‘Build’, then ‘Build Assets’, then ‘Macros’ to open up the folder seen below.

<vimg src="macros-page/macros2.png" />

Each of these LUA files will appear in your Macro menu as a separate Macro.

1. Create a new file: “MyNewMacro.lua” (or MyNewMacro.lua.txt) on your desktop
2. Edit and save the macro file
3. Start the macro “MyNewMacro” within Nanome

## Hello world!

A macro can be just a few lines of code

```
--[[
    You can add a small description to the macro here (This is optional)
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

Macros can be shared simply by copy/pasting the “.lua” file on different machines.

You can store the macros in one of the following supported folders (configurable in the config-file):

C://Users/{{USERNAME}}/Desktop/

C://Users/{{USERNAME}}/Downloads/

C://Users/{{USERNAME}}/Documents/

C://Users/{{USERNAME}}/Documents/Nanome/

C://Users/{{USERNAME}}/Documents/Nanome/Macros/

Optionally, a macro can be hosted through an HTTP server (configurable in the config-file)
