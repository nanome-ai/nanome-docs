---
title: Real-time Scoring
---

# Real-time Scoring

The Real-time Scoring plugin lets you score ligands against a receptor to estimate how well they bind in their current position and pose. It uses DSX, a knowledge-based scoring function from Gerhard Klebe's group built from distance-dependent pair potentials, torsion angle potentials and solvent-accessible surface potentials for protein-ligand complexes. DSX scores a complex as a sum of per-atom contributions.

Ligand efficiency is an important predictive property in medicinal chemistry and is used to rank compounds.  It is defined as the binding free energy (−ΔG) divided by the number of non-hydrogen atoms in the ligand.  Therefore, understanding the contribution of each non-hydrogen atom is of value toward predicting ligand efficiency.  


## Instructions

<vimg src="plugins-page/realtimescoring_plugin.png" />

To use this plugin, select a receptor (left pane), the ligands you would like to score (right pane), and press "Start scoring". Each ligand's score will appear on the scoring window. Atom scores will be shown via their radii and atoms will be labeled with their symbol. Moving a complex around will update its score.

