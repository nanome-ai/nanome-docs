---
title: Real-time Scoring
---

# Real-time Scoring

The Real-time Scoring plugin lets you score ligands against a receptor to determine binding affinity for their current structure, position and rotation. This plugin leverages DSX, a knowledge-based scoring function developed by Gerhard Klebe and colleagues for the evaluation of distance-dependent pair potentials, torsion angle potentials, and solvent accessible surface potentials for ligand-protein protein complexes.  The free energy (ΔG) of a protein-ligand complex is dependent on the sum of the ligand parts, or substructures.  

Ligand efficiency is an important predictive property in medicinal chemistry and is used to rank compounds.  It is defined as the Gibbs free energy (ΔG) divided by the number of non-hydrogen atoms in the ligand.  Therefore, understanding the contribution of each non-hydrogen atom is of value toward predicting ligand efficiency.  


## Instructions

<vimg src="plugins-page/realtimescoring_plugin.png" />

To use this plugin, simply select a receptor (left pane), the ligands you would like to score (right pane), and press "Start scoring". Each ligand's score will appear on the scoring window. Atom scores will be shown via their radii and atoms will be labeled with their symbol. Moving a complex around will update its score.

