---
title: Tools
---

# Tools {#tools-page}

**Tools** in Nanome Web's top bar holds what MARA works with: the tools it runs, the integrations that connect it to other platforms, the workflows that chain tools together, and the knowledge it draws on. The left sidebar switches between them.

<ScreenMap src="mara/tools.webp" alt="The Tools page" crop="0,0,41,100" label="Tools sidebar">
<MapCard icon="plus" title="New" side="left" area="0.9,15.0,10.9,6.9">Creates an Integration, a Tool or a Workflow.</MapCard>
<MapCard icon="tool" title="Tools" href="#tools" side="left" area="0,27.5,12.8,9.0">Every tool MARA can run, including your own.</MapCard>
<MapCard icon="triangle-square-circle" title="Integrations" href="#integrations" side="left" area="0,36.7,12.8,7.9">Connections to other platforms, each with its own tools.</MapCard>
<MapCard icon="route" title="Workflows" href="#workflows" side="left" area="0,45.2,12.8,7.9">Sequences of tools, saved as steps for MARA to follow.</MapCard>
<MapCard icon="file-info" title="Knowledge" href="#knowledge" side="left" area="0,53.7,12.8,8.1">Background information MARA uses in its answers.</MapCard>
</ScreenMap>

## <AppIcon name="tool" /> Tools {#tools}

<UiList label="Tools page">
<UiItem icon="search" name="Search">Searches the tools by name.</UiItem>
<UiItem name="What's New?">The tools added or updated most recently, with their authors and dates.</UiItem>
<UiItem icon="play" name="Tutorial">Plays the tool-creation part of the Welcome to MARA onboarding video.</UiItem>
<UiItem icon="plus" name="Create" href="#creating-a-tool">New Tool, Import from GitHub or Request a Tool.</UiItem>
<UiItem name="All / Secrets">Tabs: every tool, or the secrets (such as API keys) that tools use.</UiItem>
<UiItem name="All categories">Filters the list by category.</UiItem>
<UiItem name="All / Custom / Public">Every tool, custom tools only, or public tools only.</UiItem>
<UiItem name="Disabled">Shows the tools that are turned off instead.</UiItem>
</UiList>

Tags beside a tool's name:

<UiList label="Tool tags">
<UiItem icon="world" name="Public">Available to users outside your organization.</UiItem>
<UiItem icon="brand-python" name="Python">The tool runs a Python script.</UiItem>
</UiList>

Clicking a tool opens its page, with its description, its arguments (**Args**), its script or endpoint, and a **Run** section that tests the tool on a file you pick.

### <AppIcon name="dots" /> Tool menu {#tool-menu}

The <AppIcon name="dots" /> **(...)** button at the end of a tool's row opens its settings.

<ShotRow src="mara/tool-menu.webp" alt="A tool's menu">

<UiList label="Tool menu">
<UiItem name="Enabled for org" area="5.4,7.6,89.0,14.4">On or Off: whether the tool is available to everyone in your organization.</UiItem>
<UiItem name="Enabled for me" area="5.4,28.6,89.0,14.2">Org, On or Off: follow your organization's setting, or set it just for you.</UiItem>
<UiItem name="Public" area="5.4,49.3,89.0,10.5">Makes the tool available to users outside your organization.</UiItem>
<UiItem name="Premium" area="5.4,66.9,89.0,9.9">Makes the tool available only to Premium users.</UiItem>
<UiItem icon="pencil" name="Edit" area="77.6,86.2,4.3,4.7">Opens the tool's form.</UiItem>
<UiItem icon="trash" name="Delete" area="87.4,85.9,4.3,5.2">Deletes the tool.</UiItem>
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
3. Under **Install for**, choose **my org** or **myself**.
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
<UiItem icon="building" name="Org" area="24.6,78.3,3.8,5.5">Tag: available within your organization.</UiItem>
<UiItem icon="dots" name="More (...)" href="#tool-menu" area="94.0,49.4,1.7,4.7">The same settings as a tool's menu, without Premium.</UiItem>
</UiList>

</ShotRow>

<Steps>

1. Choose **Create** and give the workflow a **Name** and a **Description**.
2. Under **Install for**, choose **my org** or **myself**.
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
