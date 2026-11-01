---
title: Docking
---

# Docking

The docking plugin interfaces with a variety of docking software to dock ligands to a receptor and display the result in Nanome. Currently supported docking software includes:

- Smina
- AutoDock 4


## Instructions

To use the plugin, select a receptor to bind to.

Then, select one or more ligands to bind.

With Smina, finally select the site at which to dock the ligands. For most cases, the ligand is used as the site, and it is placed in the approximate pocket of the receptor.

Set **Max Poses**, the number of poses to keep for each ligand. With Smina, also set **Size(angstroms)**, the size of the box around the site.

Then click **Run Dock**. It reads Running... until docking finishes.

You'll get a notification when docking has finished.
