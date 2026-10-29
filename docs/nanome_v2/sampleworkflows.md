---
title: Sample Workflows
---

# Sample Workflows and Usage

Examples of workflows in Nanome XR, including using MARA to open and prep structures.

<IconGrid label="Workflows">
<IconCard icon="sparkles" title="Opening from MARA" href="#opening-from-mara">Load a structure in a MARA chat, then open it in XR.</IconCard>
<IconCard icon="share" title="Sharing a workspace" href="#sharing-workspace">By workspace code, or by email.</IconCard>
<IconCard icon="polygon" title="Displaying interactions" href="#displaying-interactions-between-structures">Interaction components between structures.</IconCard>
<IconCard icon="minimize" title="Minimizing a ligand in its pocket" href="#minimizing-a-ligand-in-its-pocket">Pocket minimization in the Builder Tool.</IconCard>
<IconCard icon="arrow-left-to-arc" title="Aligning proteins" href="#aligning-proteins-in-xr">CE-Align or TM-Align, from Structure actions.</IconCard>
</IconGrid>

## <AppIcon name="sparkles" /> Opening from MARA {#opening-from-mara}

<Steps>

1. Sign in to Nanome Web and to Nanome XR with the same account.
2. In Nanome Web, open **Conversations** and start a new chat.
3. Ask MARA to load a structure, for example "Load 1KV2". MARA shows it in its 3D viewer (Mol*).
4. Click **Open in XR**, and a message appears in MARA.
5. Go to the Nanome app in your XR headset. The structure is there as a new workspace named after the chat.

</Steps>

<Callout type="note" title="After opening">

- The new workspace starts as private. Its permissions can be changed afterwards with **Share** in the [Users tab](/nanome_v2/mainpanel#share).
- Each **Open in XR** from MARA creates a new workspace.
- Representations might not match exactly between Mol* and Nanome. In those cases, our team is happy to help. Please reach out to us at support@nanome.ai to help us build solutions for representations.

</Callout>

## <AppIcon name="share" /> Sharing Workspace {#sharing-workspace}

Open the Users tab and click <Btn icon="share">Share</Btn>. There are two main methods:

<Tabs :labels="['Share the code', 'Invite by email']">
<Tab>

Set the **Global permission level** from **None** to **Viewer** or **Editor**, then tell your colleagues the workspace code.

</Tab>
<Tab>

Invite a user directly by email if they have a Nanome account. It must be an exact email match: there is no auto-completion.

Each user added by email appears in the Share dialog's list. Each user's <AppIcon name="dots" /> menu has **Make Editor** (or **Make Viewer** for an Editor) and, for the workspace owner, **Remove User**.

</Tab>
</Tabs>

## <AppIcon name="polygon" /> Displaying Interactions Between Structures {#displaying-interactions-between-structures}

### Video: Cross-Entry Interaction Components

<YoutubeEmbed videoId="tgocYV6N0X8" title="Nanome v2.4 Quick Tips: Cross-Entry Interaction Components" />

<Steps>

1. Make sure your structures show up as entries in the Main Panel's Components tab.
2. Find one of the entries, then click <Btn icon="layout-list">Structure actions</Btn>, to the right of the entry name.
3. Choose <Btn icon="polygon">Create interaction components</Btn>, then **Polymer-Ligand** or **Polymer-Polymer**, depending on the type of interaction you want to display. Polymer-Polymer works **Between Chains** or **Between Molecules**.
4. Select the target and click **Create**.

</Steps>

<vimg src="nanome-v2/display-interactions.gif" />

### Video: Chemical Interactions Menu

<YoutubeEmbed videoId="YHOGQq1dUck" title="Nanome v2.5 Quick Tips: Chemical Interactions Menu" />

Once interaction components exist, the <AppIcon name="link" /> **Interactions Tool** lists every interaction found, under **Visible**, **Pinned** and **All**. Hover over a row to highlight the interaction in 3D, and **Pin** the ones you want to keep to hand. A pinned interaction can also be labelled. Interaction types, including clashes, are switched on and off in the component's [representation panel](/nanome_v2/mainpanel#interactions).

## <AppIcon name="minimize" /> Minimizing a Ligand in Its Pocket {#minimizing-a-ligand-in-its-pocket}

<DocVideo src="v2-7/pocket-minimization.mp4" caption="Pocket minimization in Nanome XR, from the v2.7 release." />

<Steps>

1. Open the <Btn icon="hexagon-plus-2">Builder Tool</Btn> and pick the ligand in 3D or from the list.
2. Click <Btn icon="settings">Minimization settings</Btn>, the gear beside **Minimize**, and choose the protein entry as the **Receptor**.
3. Choose a **Receptor flexibility** (Rigid receptor, Flexible pocket or Flexible side chains) and a **Pocket radius**, then click **Apply**.
4. Click <Btn icon="minimize">Minimize</Btn>. The result shows the energy, the ligand RMSD and the pocket RMSD. <Btn icon="arrow-back-up">Undo</Btn> returns to the starting coordinates.
5. <Btn icon="device-floppy">Save</Btn> keeps the minimized ligand as a new ligand or updates the original.

</Steps>

<Callout type="note" title="Reading the energy">

The energy is the force-field energy that the minimization tool reports for the minimized system. It isn't a binding energy, and it can't be compared across different ligands or pockets.

</Callout>

## <AppIcon name="arrow-left-to-arc" /> Aligning Proteins in XR {#aligning-proteins-in-xr}

### Video: Aligning Proteins

<YoutubeEmbed videoId="jNaFAtmfaRE" title="Nanome v2.4 Quick Tips: Aligning Proteins" />

<Steps>

1. Make sure your proteins show up as entries in the Main Panel's Components tab.
2. Find one of the entries, then click <Btn icon="layout-list">Structure actions</Btn>, to the right of the entry name.
3. Choose <Btn icon="arrow-left-to-arc">Align proteins to this</Btn>, then **CE-Align** or **TM-Align**.
4. Choose which entries to align and click **Align**. Each aligned row shows the Cα **RMSD** and the number of aligned residues (**Length**).

</Steps>

<vimg src="nanome-v2/align-proteins.gif" />
