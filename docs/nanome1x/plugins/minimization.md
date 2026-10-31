---
title: Minimization
---

# Minimization

The minimization plugin optimizes the conformation of the selected molecule or complex to find a geometry where the net force on each atom is as close to zero as possible.  The [molecular mechanics](https://open-babel.readthedocs.io/en/latest/Forcefields/Overview.html) methods developed by [Open Babel](https://openbabel.org/) are employed.

<vimg src="plugins-page/minimization_plugin.png" alt="The Plugin List with Minimization selected and its Advanced Settings button" />

## Instructions

To use the minimization plugin, Activate it from the plugin menu, and select one or more complexes from the entry menu. At this point, you can press Run to use the default settings. 

The minimization window is also accessible in the **Modify Menu** under the Compute Tab. Click on the gear wheel icon to access settings.

**Auto-minimize** is a separate feature that can be toggled on or off in the Prep tab of the [MedChem Tools](/nanome1x/navigation/toolsmenu#medchem-tools).  Small molecules or edits to the protein will be minimized automatically when the feature is on.  See [MedChem Tools](/nanome1x/navigation/toolsmenu#medchem-tools) for more.

The minimization process can be stopped at any time by pressing the 'Stop' button.


## Settings

Settings can be viewed and changed before running the minimization from the Advanced Settings icon button; this is the “gear wheel” in the main minimization window.

Force fields that are supported in Nanome: *General AMBER*, *Ghemical*, *MMFF94*, *MMFF94s*, and *Universal*. The default force field is **Universal**. 

Choose from two first derivative techniques:
- **Steepest Descent** to find a local minimum, best suited for starting structures far from the minimum; 
    
- **Conjugate Gradients**, which accumulates stepwise information toward convergence and is best suited for larger systems.

Select up to 5000 steps (default is 2500) and press Run with the trigger button.  The selected structures will have their bounding boxes turned on and their energies minimized.


