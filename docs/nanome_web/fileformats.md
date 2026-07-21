---
title: Supported File Formats
---

# Supported File Formats (Nanome v2)

This page lists the file formats supported in Nanome v2, current through 2.6.0. Per-release changes are in the [version history](#version-history) below.

All parsing is server-side, and the format is detected by file extension.

Capability key: 👁 view static · ▶️ animates (substrate noted) · ✏️ editable · 💾 exportable · 🆕 new or changed in 2.6.0.

## Structures

Small molecule and macromolecule formats.

| Format | Extensions | Import | Animates? | Export |
|--------|------------|--------|-----------|--------|
| **PDB** | `.pdb` `.ent` | 👁 ✏️ | ▶️ model-index (multi-MODEL) | 💾 PDB |
| **mmCIF / PDBx** | `.cif` `.mmcif` `.mcif` `.bcif` | 👁 ✏️ | ▶️ model-index | — |
| **SDF** | `.sdf` `.sd` `.mol` | 👁 ✏️ | ▶️ model-index (multi-record) | 💾 SDF |
| **MOL / MOL2** | `.mol` `.mol2` | 👁 ✏️ | — | — |
| **SMILES** | `.smi` `.smiles` / typed | 👁 ✏️ | — | 🆕 💾 SMILES |
| **XYZ** | `.xyz` | 👁 ✏️ | 🆕 ▶️ model-index (playback fixed in 2.6.0) | — |
| **PQR** | `.pqr` | 👁 ✏️ | — | — |
| **PDBQT** | `.pdbqt` | 🆕 👁 (imported as PDB; charges dropped) | — | — |

## Session and proprietary

| Format | Extensions | Import | Notes |
|--------|------------|--------|-------|
| **MAE (Maestro)** | `.mae` | 👁 | Schrödinger. Also the LiveDesign ingestion format. |
| **MAEGZ** | `.mae.gz` `.maegz` | 👁 | Via the LiveDesign gadget. |
| **MOE** | `.moe` | 👁 | CCG's Molecular Operating Environment. |
| **PSE (PyMOL session)** | `.pse` | 👁 | QM/MM link atoms can break loading. |

## Trajectory / Molecular Dynamics

Frame-trajectory formats. See [How animation works](#how-animation-works) for the difference between a frame trajectory and a multi-model file.

| Format | Extensions | Import | Animates? | Limits |
|--------|------------|--------|-----------|--------|
| **GRO** | `.gro` | standalone | ▶️ frame-trajectory | ≤ 2000 frames |
| **XTC** | `.xtc` | attach to a loaded model | ▶️ frame-trajectory | atom count must match the host |
| **TRR** | `.trr` | attach to a loaded model | ▶️ frame-trajectory | atom count must match the host |
| **DCD** | `.dcd` | attach to a loaded model | ▶️ frame-trajectory | 64-bit CHARMM DCD and fixed-atom DCD are not supported |

## Maps / volumetric

| Format | Extensions | Import | Notes |
|--------|------------|--------|-------|
| **DX (electrostatic map)** | `.dx` | overlay | Attaches to a loaded model; not standalone. |

## Export

Molecule export is single-frame, to **PDB, SDF, or SMILES**. PDB and SDF are offered on every export surface. SMILES (new in 2.6.0) is produced through the WorkspaceAPI/MCP `export_entry` route, and is not yet a download option in the client or MARA.

## Import and export surfaces

Every surface funnels into the same server-side parser.

| Surface | Imports | Exports |
|---------|---------|---------|
| **XR / WebGL client** | RCSB fetch (PDB/CIF by code); local entry files (SDF/SMILES/XYZ); session files (MAE/MOE/PSE) | view-only |
| **MARA (web app)** | all structures, trajectory attach (GRO/XTC/TRR/DCD), and DX | PDB, SDF (molecules); CSV (data tables); FASTA/GenBank (tools) |
| **WorkspaceAPI (GraphQL / REST / MCP)** | every format above | PDB, SDF, SMILES |
| **LiveDesign gadget** | MAE / MAEGZ (one-way: LiveReport → Nanome) | — |

## Not supported

- **Electron density maps** — CCP4, MRC, and DSN6 are not supported.
- **LAMMPS** native trajectories (`.lammpstrj` / dump) — not supported; XYZ is the only bridge.
- **No workspace-file export** — workspaces live in the database; there is no portable workspace file.
- **No trajectory export** — export is single-frame only.
- **No export** for mmCIF, MAE, MOE, or PSE (import-only).
- **Surfaces are disabled during trajectory playback** — recompute-per-frame is too slow today.

## How animation works

Both animation types are driven by the same play, pause, and scrub controls, but they step over different things.

| Substrate | A "step" is… | Source formats |
|-----------|--------------|----------------|
| **Model-indexing** | a whole model (full topology) | multi-MODEL **PDB / mmCIF**, multi-record **SDF**, multi-block **XYZ** |
| **Frame-trajectory** | a coordinate set on one shared model | **GRO** (standalone), **XTC / TRR / DCD** (attached to a loaded model) |

Frame trajectories are limited to **2000 frames**, and an attached frame's atom count must equal the host model's.

A helpful way to keep the terms straight:

- **Multi-entry** — several separate structures in the workspace (they don't animate together).
- **Multi-model** — one entry holding many models, each a full topology; animates by stepping through models.
- **Multi-frame** — one model with many coordinate frames; animates by stepping through frames.

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
| 2.5.1 | WebGL instanced rendering — real-time playback of 20k+ atom MD trajectories |
| **2.6.0** | **PDBQT import** (`.pdbqt` → PDB, charges dropped); **SMILES export** (`.smi`, via MCP `export_entry`); **multi-block XYZ playback fixed** |
