---
title: Chemical Properties
---

# Chemical Properties

The Chemical Properties plugin display chemical properties for a complex using rdkit.

<vimg src="plugins-page/chemicalproperties_plugin.png" />

This plugin requires rdkit to be installed and in the PATH variable. To install, follow the instructions [here](http://www.rdkit.org/docs/Install.html).

nanome-chemical-properties has a "snapshots" feature where you can take a snapshot of a complex to compare properties against other snapshots. Snapshots only persist while the plugin is active, so deactivating the plugin will lose the current snapshots.

To create a snapshot, select a complex and press the "snapshot" button.

To view a table comparison of your snapshots, press the "view snapshots" button.

In the snapshots view:

Pressing a column header will switch through the sorting options for that column. Pressing it once will sort ascending, a second time will sort descending, and a third time will remove sorting on that column.
Pressing on a snapshot row will bring up a window containing a 2D rendering of the snapshot, as well as the snapshot timestamp and options to rename, load, or delete the snapshot.
Pressing "export csv" will save the snapshot names, SMILES string, and properties to ~\Documents\nanome\snaphots on the computer running Nanome.