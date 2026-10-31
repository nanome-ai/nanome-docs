---
title: Supported File Formats
---

# Supported File Formats

Current through release 2.7.1. All parsing is server-side, and the format is detected by file extension.

Capability key: 👁 view static · ▶️ animates (type noted) · ✏️ editable · 💾 exportable · 🆕 new or changed in 2.7 · † loads via a MARA tool, not directly in a workspace (see below).

## Structures

Small molecule and macromolecule formats.

| Format | Extensions | Import | Animates? | Export |
|--------|------------|--------|-----------|--------|
| **PDB** | `.pdb` `.ent` | 👁 ✏️ 🆕 ligand bonds from the RCSB Chemical Component Dictionary when the file has a PDB ID | ▶️ model-index (multi-MODEL) | 💾 PDB |
| **mmCIF / PDBx** | `.cif` `.mmcif` `.mcif`† `.bcif`† | 👁 ✏️ 🆕 ligand bonds from the RCSB Chemical Component Dictionary when the file has a PDB ID | ▶️ model-index | — |
| **SDF** | `.sdf` `.sd`† `.mol`† | 👁 ✏️ | ▶️ model-index (multi-record) | 💾 SDF |
| **MOL / MOL2** | `.mol`† `.mol2`† | 👁 ✏️ | — | — |
| **SMILES** | `.smi` `.smiles` / typed | 👁 ✏️ | — | 💾 SMILES |
| **XYZ** | `.xyz` | 👁 ✏️ | ▶️ model-index | — |
| **PQR** | `.pqr` | 👁 ✏️ (charges and radii are discarded) | — | — |
| **PDBQT** | `.pdbqt` | 👁 (charges, occupancy and B-factors are discarded, the torsion tree is ignored, and bonds are inferred) | ▶️ model-index (each MODEL) | — |

<Callout type="note" title="† Requires a MARA tool">

A Nanome workspace on its own can't load `.bcif`, `.mcif`, `.sd`, `.mol` or `.mol2` directly. These and some other files need a MARA tool that supports them, which loads or converts the file into your workspace. The rest of the structure formats above load directly.

</Callout>

## Session and proprietary

| Format | Extensions | Import | Notes |
|--------|------------|--------|-------|
| **MAE (Maestro)** | `.mae` | 👁 | Schrödinger. Also the LiveDesign ingestion format. |
| **MAEGZ** | `.mae.gz` `.maegz` | 👁 | Via the LiveDesign gadget. Nanome Web's Import tab needs these unzipped to `.mae` first. |
| **MOE** | `.moe` | 👁 | CCG's Molecular Operating Environment. |
| **PSE (PyMOL session)** | `.pse` | 👁 | QM/MM link atoms can break loading. |

## Trajectory / Molecular Dynamics {#trajectory-molecular-dynamics}

Frame-trajectory formats.

| Format | Extensions | Import | Animates? | Limits |
|--------|------------|--------|-----------|--------|
| **GRO** | `.gro` | standalone | ▶️ frame-trajectory | 🆕 split into chains where residue numbering restarts; ACE, NME and NH2 caps stay in the protein |
| **XTC** | `.xtc` | attach to a loaded model | ▶️ frame-trajectory | atom count must match the host; file up to 200 MB |
| **TRR** | `.trr` | attach to a loaded model | ▶️ frame-trajectory | atom count must match the host; file up to 200 MB |
| **DCD** | `.dcd` | attach to a loaded model | ▶️ frame-trajectory | file up to 200 MB; 64-bit CHARMM DCD and fixed-atom DCD are not supported |

## Maps / volumetric

| Format | Extensions | Import | Notes |
|--------|------------|--------|-------|
| **DX (electrostatic map)** | `.dx` | overlay | Attaches to a loaded model; not standalone. |

## Export

Molecule export is single-frame, to **PDB, SDF, or SMILES**. Nanome Web, MARA and the API export PDB and SDF. SMILES (new in 2.6.0) comes from the API's MCP `export_entry` route, and isn't yet a download option in Nanome Web. The API also exports sequences as FASTA.

Since 2.7.0, **Export analysis** in Nanome Web downloads the current scene's chemical interactions, measurements and minimization history as a ZIP of 3 CSV files.

## Import and export surfaces

All of these use the same parser on Nanome's server.

| Surface | Imports | Exports |
|---------|---------|---------|
| **Nanome XR** | RCSB fetch by PDB code | view-only |
| **Nanome Web and MARA** | all structures, trajectory attach (GRO/XTC/TRR/DCD), and DX | PDB, SDF (molecules); CSV (data tables); FASTA/GenBank (tools) |
| **Nanome API (GraphQL / REST / MCP)** | every format above | PDB, SDF, SMILES, FASTA |
| **LiveDesign gadget** | MAE / MAEGZ (one-way: LiveReport → Nanome) | — |

## Not supported

- **Electron density maps**: CCP4, MRC and DSN6 are not supported.
- **LAMMPS** native trajectories (`.lammpstrj` / dump) are not read directly. LAMMPS can write DCD or XTC, which attach to a structure with the same atom count.
- **No workspace-file export**: workspaces live in the database, and there's no portable workspace file.
- **No trajectory export**: export is single-frame only.
- **No export** for mmCIF, MAE, MOE, or PSE (import-only).
- **Surfaces are held during trajectory playback.** Surface controls are disabled while frames play, and changes apply when playback stops.

## How animation works

Both animation types are driven by the same play, pause, and scrub controls, but they step over different things.

| Type | A "step" is… | Source formats |
|-----------|--------------|----------------|
| **Model-indexing** | a whole model (full topology) | multi-MODEL **PDB / mmCIF**, multi-record **SDF**, multi-block **XYZ** |
| **Frame-trajectory** | a coordinate set on one shared model | **GRO** (standalone), **XTC / TRR / DCD** (attached to a loaded model) |

There's no frame limit. An attached trajectory file can be up to **200 MB**, and every frame's atom count must equal the host model's.

- **Multi-entry**: several separate structures in the workspace (they don't animate together).
- **Multi-model**: one entry holding many models, each a full topology. It animates by stepping through models.
- **Multi-frame**: one model with many coordinate frames. It animates by stepping through frames.

## Version history

Each row names the format or IO capability that changed in that release.

| Version | Format / IO change |
|---------|--------------------|
| 2.0.x | SDF (charges, aromatic, multi-model) and **SDF export**; MAE parser; PDB / mmCIF parsing; PSE loading |
| 2.1.x | SDF metadata; SMILES load; PSE multi-state |
| 2.2.0 | PSE metadata parsing |
| 2.3.0 | **PDB export** (`.pdb`); mmCIF parser refactor; multi-model annotations |
| 2.4.x | **XYZ import** (`.xyz`); component export as PDB / SDF; **model-index playback** for multi-model files |
| 2.5.0 | **MAE / PSE / MOE** as entries; **PQR import** (`.pqr`); **frame-trajectory playback** (GRO / XTC / TRR / DCD); **DX map** overlay |
| 2.5.1 | WebGL instanced rendering: real-time playback of 20k+ atom MD trajectories |
| **2.6.0** | **PDBQT import** (`.pdbqt` → PDB, charges dropped); **SMILES export** (`.smi`, via MCP `export_entry`); **multi-block XYZ playback fixed**; frame-trajectory cap removed; attached trajectory files limited to 200 MB |
| **2.7.0** | **CCD ligand bonds** fetched from the RCSB instead of PDBe, for PDB and mmCIF files that carry a PDB ID; CCD bonds flagged as metal coordination no longer drawn as covalent bonds; covalently bound ligands keep their protein bond, and modified residues with an attached group are split; faster DNA/RNA loading with corrected bonds and charges; **GRO** loads much faster, splits into chains where residue numbering restarts, and keeps ACE/NME/NH2 caps in the protein; faster, smaller MD trajectories; **Export analysis** ZIP of CSVs; file load errors give a short readable message and, where the parser can give one, a line number |
