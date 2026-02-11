---
title: Overview
---

# Overview

*The Nanome Platform's flexibility and extensibility comes from a robust Python API known as the Plugin System. It allows scientists and users to highly customize everything from the user interface to the integration of external molecular simulation tools.*

## Plugin System and Python API


The Plugin System was built with interface extensibility at its core and enables computational chemistry tools and calculations all to happen in the cloud. This is critical for supporting all-in-one devices such as the Oculus Quest 2 and standalone Augmented Reality glasses. Plugins are also easily configurable and swappable for different computation packages to easily adapt to different workflows. Plugins extend your scientific capabilities by leveraging existing expert tools and radically advanced computation techniques whose only limit is your AWS credits and creativity.

Since there can be many different molecular computational packages for a wide variety of scientists and use-cases - it makes sense to group relevant plugins together which we call "*Nanome Stacks*".

For example, in our "MedChem Stack", it includes critical integrations that are most commonly used by Medicinal Chemists such as real-time Minimization, Chemical Property prediction, and Molecular Docking. These plugins were built with swappability and extensibility in mind. This means it is easy to change what software package or algorithm is doing the calculation.


Some examples of plugins that our customers love are:
- Nanome Vault: Drag and Drop files on a website and access them on any device running Nanome (Amazing for Quest storage)
- Molecular Docking: Running and viewing docking results (Autodock, etc)
- Chemical Properties: Live chemical property prediction during design with RDKit
- All of our public plugins are available on our [Github](https://github.com/nanome-ai) with the "plugins-" prefix.

New users who sign up for a Nanome account get a 30-day free trial unlocking premium license capabilities and also early access to Nanome's cloud-hosted plugins.

If you would like to develop plugins for Nanome, please reach out to us by [contacting us](mailto:hello@nanome.ai) and take a look at our development resources such as our [API documentation](https://nanome.readthedocs.org).

## Nanome Plugins List

The following is the list of some of our favorite plugins we have made so far:

- [Vault](vault.md)
- [Minimization](minimization.md)
- [RMSD](rmsd.md)
- [Real-time Atom Scoring](realtimescoring.md)
- [Molecular Docking](docking.md)
- [Chemical Properties](chemicalproperties.md)
- [Structure Prep](structureprep.md)
- [Chemical Interactions](cheminteractions.md)
- [Superimpose Proteins](superimpose.md)
- Hydrogens
- Electrostatic Potential Maps
- 2D Chemical Preview


A general rule of thumb is that any 3rd Party application that can interact using a command line or a python script would be easy to build a plugin for. Plugins can be designed and run from different environments including Windows, Linux, and Mac operating systems depending on the requirements needed from the plugin.
