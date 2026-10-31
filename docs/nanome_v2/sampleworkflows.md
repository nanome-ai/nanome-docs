---
title: Sample Workflows
---

# Sample Workflows and Usage

Examples of workflows in Nanome XR, including using MARA to load a structure and open it in Nanome XR.

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
4. Click **Open in XR**. In **Add to Workspace**, pick a workspace or type a name for a new one, then click **Upload**.
5. Nanome Web opens that workspace and sends it to Nanome XR. In the headset it opens straight away when you're alone, or with a [Load from Web](/nanome_v2/collaboration#load-for-all-vs-load-for-me) prompt when others are in your session.

</Steps>

<Callout type="note" title="After opening">

- A new workspace starts as private. Its permissions can be changed afterwards with **Share** in the [Users tab](/nanome_v2/mainpanel#share).
- **Open in XR** can add the structure to an existing workspace or start a new one.
- Representations might not match exactly between Mol* and Nanome. If one looks wrong, support@nanome.ai can help.

</Callout>

## <AppIcon name="share" /> Sharing a workspace {#sharing-workspace}

Sharing starts with <Btn icon="share">Share</Btn> in the Users tab. There are 2 ways to share:

<Tabs :labels="['Share the code', 'Invite by email']">
<Tab>

Set the **Global permission level** from **None** to **Viewer** or **Editor**, then tell your colleagues the workspace code.

</Tab>
<Tab>

Invite a user directly by email if they have a Nanome account. It must be an exact email match: there is no auto-completion.

Each user added by email appears in the Share dialog's list. Each user's <AppIcon name="dots" /> menu has **Make Editor** (or **Make Viewer** for an Editor) and, for the workspace owner, **Remove User**.

</Tab>
</Tabs>

## <AppIcon name="polygon" /> Displaying interactions between structures {#displaying-interactions-between-structures}

### Video: Cross-Entry Interaction Components

<YoutubeEmbed videoId="tgocYV6N0X8" title="Nanome v2.4 Quick Tips: Cross-Entry Interaction Components" />

<ShotRow src="nanome-v2/display-interactions.gif" alt="Creating interaction components between 2 entries">

<Steps>

1. Make sure your structures show up as entries in the Main Panel's Components tab.
2. Find one of the entries and click <Btn icon="layout-list">Structure actions</Btn> to the right of its name.
3. Choose <Btn icon="polygon">Create interaction components</Btn> and then **Polymer-Ligand** or **Polymer-Polymer**, depending on the type of interaction you want to display. Polymer-Polymer works **Between Chains** or **Between Molecules**.
4. Select the target and click **Create**.

</Steps>

</ShotRow>

### Video: Chemical Interactions Menu

<YoutubeEmbed videoId="YHOGQq1dUck" title="Nanome v2.5 Quick Tips: Chemical Interactions Menu" />

Once interaction components exist, the <AppIcon name="link" /> **Interactions Tool** lists every interaction found, under **Visible**, **Pinned** and **All**. Hovering over a row highlights the interaction in 3D, and **Pin** adds it to the **Pinned** list. A pinned interaction can also be labeled. Interaction types, including clashes, are switched on and off in the component's [representation panel](/nanome_v2/mainpanel#interactions).

## <AppIcon name="minimize" /> Minimizing a ligand in its pocket {#minimizing-a-ligand-in-its-pocket}

<DocVideo src="v2-7/pocket-minimization.mp4" caption="Pocket minimization in Nanome XR, from the v2.7 release." />

<Steps>

1. Open the <Btn icon="hexagon-plus-2">Builder Tool</Btn> and pick the ligand in 3D or from the list.
2. Click <Btn icon="settings">Minimization settings</Btn> (the gear beside **Minimize**) and choose the protein entry as the **Receptor**.
3. Choose a **Receptor flexibility** (Rigid receptor, Flexible pocket or Flexible side chains) and a **Pocket radius**, then click **Apply**.
4. Click <Btn icon="minimize">Minimize</Btn>. The result shows the energy, the ligand RMSD and the pocket RMSD. <Btn icon="arrow-back-up">Undo</Btn> returns to the starting coordinates.
5. <Btn icon="device-floppy">Save</Btn> keeps the minimized ligand as a new ligand or updates the original.

</Steps>

<Callout type="note" title="Reading the energy">

The energy is the force-field energy that the minimization tool reports for the minimized system. It isn't a binding energy, and it can't be compared across different ligands or pockets.

</Callout>

## <AppIcon name="arrow-left-to-arc" /> Aligning proteins in XR {#aligning-proteins-in-xr}

### Video: Aligning Proteins

<YoutubeEmbed videoId="jNaFAtmfaRE" title="Nanome v2.4 Quick Tips: Aligning Proteins" />

<ShotRow src="nanome-v2/align-proteins.gif" alt="Aligning 2 proteins with Align proteins to this">

<Steps>

1. Make sure your proteins show up as entries in the Main Panel's Components tab.
2. Find one of the entries and click <Btn icon="layout-list">Structure actions</Btn> to the right of its name.
3. Choose <Btn icon="arrow-left-to-arc">Align proteins to this</Btn> and then **CE-Align** or **TM-Align**.
4. Choose which entries to align and click **Align**. Each aligned row shows the Cα **RMSD** and the number of aligned residues (**Length**).

</Steps>

</ShotRow>
