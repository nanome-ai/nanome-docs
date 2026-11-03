---
title: Real-time Scoring
---

# Real-time Scoring

The Real-time Scoring plugin lets you score ligands against a receptor to estimate how well they bind in their current position and pose. It uses DSX, a knowledge-based scoring function from Gerhard Klebe's group built from distance-dependent pair potentials, torsion angle potentials and solvent-accessible surface potentials for protein-ligand complexes. DSX scores a complex as a sum of per-atom contributions.

Medicinal chemists often rank compounds by ligand efficiency: the binding free energy (−ΔG) divided by the number of non-hydrogen atoms in the ligand. Per-atom DSX scores show which atoms add most to the score, which can help when weighing changes to a ligand.


## Instructions

<vimg src="plugins-page/realtimescoring_plugin.png" alt="The Realtime Scoring menu with 1TYL as the receptor and 1TYL {a} as the ligand" />

To use this plugin, select a receptor (left pane), the ligands you would like to score (right pane), and press "Start scoring". Each ligand's score will appear on the scoring window. Each ligand atom gets a sphere whose size and color show its score. To show each atom's score as a label, turn on Label Atoms with Scores in the plugin's Advanced Settings. Moving a complex around will update its score.

