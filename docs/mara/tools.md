---
title: Tools
---

# Tools {#tools-page}

**Tools** in Nanome Web's top bar holds what MARA works with: the tools it runs, the integrations that connect it to other platforms, the workflows that chain tools together, and the knowledge it draws on. The left sidebar switches between them.

<ScreenMap src="mara/tools.webp" alt="The Tools page, listing tools" label="Tools page">
<MapCard icon="plus" title="New" side="bottom" area="0.9,15.0,10.9,6.9">Creates an Integration, a Tool or a Workflow.</MapCard>
<MapCard icon="tool" title="Tools" href="#tools" side="bottom" area="0,27.5,12.8,9.0">Every tool MARA can run, including your own.</MapCard>
<MapCard icon="triangle-square-circle" title="Integrations" href="#integrations" side="bottom" area="0,36.7,12.8,7.9">Connections to other platforms, each with its own tools.</MapCard>
<MapCard icon="route" title="Workflows" href="#workflows" side="bottom" area="0,45.2,12.8,7.9">Sequences of tools, saved as steps for MARA to follow.</MapCard>
<MapCard icon="file-info" title="Knowledge" href="#knowledge" side="bottom" area="0,53.7,12.8,8.1">Background information MARA uses in its answers.</MapCard>
<MapCard icon="search" title="Search" side="top" area="75.2,17.3,2.1,5.8">Searches the tools by name and description.</MapCard>
<MapCard icon="sparkles" title="What's New?" side="top" area="77.7,16.9,7.7,6.4">The tools added or updated most recently, with their authors and dates.</MapCard>
<MapCard icon="player-play" title="Tutorial" side="top" area="85.7,16.9,6.6,6.4">Plays the tool-creation part of the Welcome to MARA video.</MapCard>
<MapCard icon="plus" title="Create" href="#creating-a-tool" side="top" area="92.5,16.9,6.5,6.4">New Tool, Import from GitHub or Request a Tool.</MapCard>
<MapCard icon="key" title="All / Secrets" side="bottom" area="14.1,27.4,9.2,8.4">Every tool, or the secrets (such as API keys) that tools use.</MapCard>
<MapCard icon="filter" title="Filters" side="bottom" area="14.2,38.9,25.8,7.4">A category, then All, Custom or Nanome tools. In an organization, Custom also splits into Org and Me.</MapCard>
<MapCard icon="eye-off" title="Disabled" side="bottom" area="90.7,38.9,8.4,7.0">Shows the tools that are turned off or missing a secret instead.</MapCard>
<MapCard icon="list" title="A tool" side="bottom" area="14.3,49.3,83.7,23.3">Its name, tags and description. Clicking it opens the tool's page.</MapCard>
<MapCard icon="world" title="Tags" href="#tool-tags" side="bottom" area="46.6,54.3,10.5,5.2">The tool's type, such as Python, and Premium or integration where they apply.</MapCard>
<MapCard icon="dots" title="Tool menu" href="#tool-menu" side="bottom" area="94.6,58.8,1.8,4.8">Who the tool is on for, Edit and Delete.</MapCard>
</ScreenMap>

## <AppIcon name="tool" /> Tools {#tools}

The list shows every tool MARA can run, including your organization's custom tools and public ones. Clicking one opens its page, with its description, its arguments (**Args**), its script or endpoint, and a **Run** section that tests the tool on a file you pick.

### Tool tags {#tool-tags}

Tags beside a tool's name:

<UiList label="Tool tags">
<UiItem icon="world" name="Public">Shown only to Nanome's own team. Other users see Premium on public tools that are only for Premium users.</UiItem>
<UiItem icon="brand-python" name="Python">The tool runs a Python script. HTTP and SQL tools show their type the same way.</UiItem>
</UiList>

### <AppIcon name="dots" /> Tool menu {#tool-menu}

In an organization, the <AppIcon name="dots" /> button at the end of a tool's row opens its settings. Outside an organization, the row ends in an on/off switch instead.

<ShotRow src="mara/tool-menu.webp" alt="A tool's menu" crop="1.5,2.8,96.6,95.0">

<UiList label="Tool menu">
<UiItem name="Enabled for org" area="5.4,7.6,89.0,14.4">On or Off: whether the tool is available to everyone in your organization.</UiItem>
<UiItem name="Enabled for me" area="5.4,28.6,89.0,14.2">Org, On or Off: follow your organization's setting, or set it just for you.</UiItem>
<UiItem name="Public" area="5.4,49.3,89.0,10.5">Only Nanome's own team sees this switch. It makes the tool available to every Nanome user.</UiItem>
<UiItem name="Premium" area="5.4,66.9,89.0,9.9">Only Nanome's own team sees this switch. It limits a public tool to Premium users.</UiItem>
<UiItem icon="pencil" name="Edit" area="77.6,86.2,4.3,4.7">On custom tools. Opens the tool's form.</UiItem>
<UiItem icon="trash" name="Delete" area="87.4,85.9,4.3,5.2">On custom tools. Deletes the tool.</UiItem>
</UiList>

</ShotRow>

### Creating a tool {#creating-a-tool}

<ShotRow src="mara/create-menu.webp" alt="The Create menu on the Tools page">

<UiList label="Create menu">
<UiItem icon="pencil" name="New Tool" area="10.8,28.6,78.4,18.5">Opens the Create Tool form.</UiItem>
<UiItem icon="brand-github" name="Import from GitHub" area="10.8,48.8,78.4,19.0">Makes a tool from code on GitHub.</UiItem>
<UiItem icon="message-2-plus" name="Request a Tool" area="10.8,69.6,78.4,18.5">Asks for a tool you need.</UiItem>
</UiList>

</ShotRow>

<Steps>

1. Under **Info**, give the tool a **Name**, a **Category** and a **Description**. MARA reads them to decide when to use the tool, so name what it does ("Convert SDF to SMILES" rather than "Conversion Tool") and describe its inputs and outputs.
2. Pick the **Type**: HTTP for web services, Python for scripts, SQL for database queries.
3. In an organization, choose **my org** or **myself** under **Install for**.
4. Fill in **Secrets**, **Arguments** and the script.
5. Choose **Test** to try the tool, then **Create**.

</Steps>

The **JSON** tab at the top of the form shows the same tool as JSON. Nanome's blog has an [introduction to MARA tool creation](https://nanome.ai/blog/introduction-to-mara-tool-creation/).

## <AppIcon name="triangle-square-circle" /> Integrations {#integrations}

An integration connects MARA to another platform, such as CDD Vault, KNIME Server or LiveDesign, and adds that platform's tools. Each row shows how many tools it adds.

<ShotRow src="mara/integrations.webp" alt="The Integrations page">

<UiList label="Integrations page">
<UiItem icon="search" name="Search" area="80.8,5.7,2.8,9.8">Searches the integrations.</UiItem>
<UiItem icon="download" name="Import" area="83.8,5.6,7.4,10.2">Imports an integration.</UiItem>
<UiItem icon="plus" name="Create" area="91.4,5.6,7.4,10.2">Creates an integration.</UiItem>
<UiItem name="All / Custom / Installed" area="1.7,21.3,17.7,11.4">Tabs: every integration, custom ones, or the ones you have installed.</UiItem>
<UiItem icon="plus" name="Install" area="94.4,44.9,3.2,11.4">At the end of a row. Installs the integration.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="route" /> Workflows {#workflows}

A workflow is a sequence of tools saved as steps, which MARA follows to plan more accurately. To run one, choose <Btn icon="route">Run workflow</Btn> in the [message box](/mara/conversations#message-box).

<ShotRow src="mara/workflows.webp" alt="The Workflows page">

<UiList label="Workflows page">
<UiItem icon="search" name="Search" area="88.4,5.5,2.8,9.5">Searches the workflows.</UiItem>
<UiItem icon="plus" name="Create" area="91.4,5.4,7.4,9.8">Opens the Create Workflow form.</UiItem>
<UiItem icon="world" name="Public" area="33.3,40.9,5.0,5.1">Tag: available to users outside your organization.</UiItem>
<UiItem icon="building" name="Org" area="24.6,78.3,3.8,5.5">Tag: available within your organization. A workflow saved just for you shows User instead.</UiItem>
<UiItem icon="dots" name="More (...)" href="#tool-menu" area="94.0,49.4,1.7,4.7">The same settings as a tool's menu, without Premium.</UiItem>
</UiList>

</ShotRow>

<Steps>

1. Choose **Create** and give the workflow a **Name** and a **Description**.
2. In an organization, choose **my org** or **myself** under **Install for**.
3. Add the steps with **Add step**. **Auto generalize workflow** has MARA make the steps general.
4. Choose **Create**.

</Steps>

## <AppIcon name="file-info" /> Knowledge {#knowledge}

<ShotRow src="mara/knowledge.webp" alt="The Base knowledge tab">

<UiList label="Knowledge tabs">
<UiItem name="Org knowledge" area="1.9,20.7,9.8,10.6">Your organization's notes for MARA, written in Markdown. <strong>Edit</strong> changes them. Headers that group related notes work best.</UiItem>
<UiItem name="Base knowledge" area="12.0,20.7,10.5,10.6">Nanome's own knowledge base, an example of the format.</UiItem>
<UiItem name="Query" area="22.7,20.7,5.5,10.6">Searches the knowledge. <strong>Include Base</strong> adds the base knowledge to the search.</UiItem>
</UiList>

</ShotRow>
