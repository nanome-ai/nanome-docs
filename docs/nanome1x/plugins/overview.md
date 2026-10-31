---
title: Overview
---

# Overview

*The Plugin System, Nanome's Python API, lets scientists customize the interface and connect outside molecular simulation tools.*

## Plugin System and Python API


The Plugin System runs computational chemistry tools and calculations in the cloud, so standalone headsets such as Quest and standalone AR glasses can use them. A plugin can be set up to use a different computation package to fit a workflow.

There are many molecular computation packages for many kinds of scientists and uses, so it makes sense to group related plugins together. We call these groups "*Nanome Stacks*".

For example, the MedChem Stack includes the integrations medicinal chemists use most, such as real-time Minimization, Chemical Property prediction and Molecular Docking. These plugins were built so the software package or algorithm doing the calculation can be changed.


Some examples of plugins:
- Nanome Vault: drag and drop files on a website and open them on any device running Nanome
- Molecular Docking: Running and viewing docking results (Smina and AutoDock 4)
- Chemical Properties: Live chemical property prediction during design with RDKit
- All of our public plugins are on [GitHub](https://github.com/nanome-ai), with names that start with "plugin-".

Every new Nanome account gets a 14-day Full license trial.

To develop plugins for Nanome, [email us](mailto:hello@nanome.ai) and see the [API documentation](https://nanome.readthedocs.io).

## Nanome Plugins List

These plugins have their own pages:

- [Vault](vault.md)
- [Minimization](minimization.md)
- [RMSD](rmsd.md)
- [Real-time Scoring](realtimescoring.md)
- [Molecular Docking](docking.md)
- [Chemical Properties](chemicalproperties.md)
- [Structure Prep](structureprep.md)
- [Chemical Interactions](cheminteractions.md)
- [Superimpose Proteins](superimpose.md)
- [Antibody Representation](antibodies.md)
- [Conformer Generator](conformergenerator.md)
- [Cryo-EM](cryoem.md)
- [LiveDesign](LiveDesign.md)
- [Scene Viewer](sceneviewer.md)

Other plugins include Hydrogens, Electrostatic Potential Maps and 2D Chemical Preview.

Any third-party application that can be driven from a command line or a Python script is a good fit for a plugin. Plugins can run on Windows, Linux or Mac, depending on what the plugin needs.
