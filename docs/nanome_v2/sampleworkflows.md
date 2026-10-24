---
title: Sample Workflows
---

# Sample Workflows and Usage

Below are some examples of workflows that can be accomplished in Nanome v2, including using [MARA](/mara/overview) to open and prep structures.

## Opening from MARA

- Log into MARA and Nanome with the same account credentials.
- Create a new MARA chat.
- Prompt MARA to load a structure of your choice and MARA will render the structure in the Molstar Visualizer.
    - Example Prompt: "Load 67o" --> loads in Molstar viewer panel.
- Click the button to "Open in XR", and a message will appear in MARA.
- Go to the Nanome app in your XR headset - the structure will be there as a new workspace named after the chat.

Note: The new workspace starts as private. Its permissions can be changed afterwards with **Share** in the [Users Tab](/nanome_v2/mainpanel#share).

Limitation: Each 'open in headset' action from MARA will create a new workspace. Representations might not be exact between Molstar and Nanome. In those cases, our team is happy to help. Please reach out to us at support@nanome.ai to help us build solutions for representations.

## Sharing Workspace

- Open the [Users Tab](/nanome_v2/mainpanel#users-tab) and click **Share**. There are two main methods:
    - Set the global permission level from **None** to **Viewer** or **Editor**, then tell your colleagues the workspace code.
    - Invite a user directly by email if they have a Nanome account. (This must be an exact email match, there is no auto-completion.)
- Each user added by email appears in the Share dialog's list.
    - Each user's **(...)** menu has **Make Editor** (or **Make Viewer** for an Editor) and, for the workspace owner, **Remove User**.

## Displaying Interactions Between Structures

### Video: Cross-Entry Interaction Components

<YoutubeEmbed videoId="tgocYV6N0X8" title="Nanome v2.4 Quick Tips: Cross-Entry Interaction Components" />

- Make sure your structures show up as entries in the main section of the [Main Panel](/nanome_v2/mainpanel).
- Find one of the entries, then click on the ['Structure Actions'](/nanome_v2/mainpanel#structure-actions) button to the right of the entry name.
- Select 'Create interaction components' and choose either 'Polymer-Ligand' or 'Polymer-Polymer' depending on the type of interaction you want to display. Polymer-Polymer works **Between Chains** or **Between Molecules**. Select the target and click 'Create'.

<vimg src="nanome-v2/display-interactions.gif" />

### Video: Chemical Interactions Menu

<YoutubeEmbed videoId="YHOGQq1dUck" title="Nanome v2.5 Quick Tips: Chemical Interactions Menu" />

Once interaction components exist, the [Interactions Tool](/nanome_v2/toolspanel#interactions-tool) lists every interaction found, under **Visible**, **Pinned** and **All**. Hover over a row to highlight the interaction in 3D, and **Pin** the ones you want to keep to hand. A pinned interaction can also be labelled. Interaction types, including clashes, are switched on and off in the component's [representation panel](/nanome_v2/mainpanel#interactions).

## Minimizing a Ligand in Its Pocket

<DocVideo src="v2-7/pocket-minimization.mp4" caption="Pocket minimization in Nanome XR, from the v2.7 release." />

- Open the [Builder Tool](/nanome_v2/toolspanel#builder-tool) and pick the ligand in 3D or from the list.
- Click the gear beside **Minimize**, and choose the protein entry as the **Receptor**.
- Choose a **Receptor flexibility** (Rigid receptor, Flexible pocket or Flexible side chains) and a **Pocket radius**, then click **Apply**.
- Click **Minimize**. The result shows the energy, the ligand RMSD and the pocket RMSD. **Undo** returns to the starting coordinates.
- **Save** keeps the minimized ligand as a new ligand or updates the original.

The energy is the force-field energy that the minimization tool reports for the minimized system. It isn't a binding energy, and it can't be compared across different ligands or pockets. See [Pocket minimization](/nanome_v2/toolspanel#pocket-minimization).

## Aligning Proteins in XR

### Video: Aligning Proteins

<YoutubeEmbed videoId="jNaFAtmfaRE" title="Nanome v2.4 Quick Tips: Aligning Proteins" />

- Make sure your proteins show up as entries in the main section of the [Main Panel](/nanome_v2/mainpanel).
- Find one of the entries, then click on the ['Structure Actions'](/nanome_v2/mainpanel#structure-actions) button to the right of the entry name.
- Select 'Align proteins to this', choose **CE-Align** or **TM-Align**, then choose which entries to align and click 'Align'. Each aligned row shows the Cα **RMSD** and the number of aligned residues (**Length**).

<vimg src="nanome-v2/align-proteins.gif" />
