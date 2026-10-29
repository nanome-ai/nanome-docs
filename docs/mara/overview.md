---
title: MARA Overview
---

# MARA

**MARA** (Molecular Analysis and Reasoning Assistant) is Nanome's AI assistant for scientific informatics. It's an agentic system: you ask in plain language, and MARA builds and runs the workflow of tools that answers it. In Nanome Web, it lives on the **Conversations** and **Tools** pages and in the **MARA** tab of a workspace.

<IconGrid label="Where MARA lives" :cols="3">
<IconCard icon="messages" title="Conversations" href="/mara/conversations">Chat with MARA, and go back to earlier chats.</IconCard>
<IconCard icon="sparkles" title="MARA tab" href="/nanome_web/workspace#mara-tab">Change a workspace's representations in plain language.</IconCard>
<IconCard icon="tool" title="Tools" href="/mara/tools">Every tool MARA can use, and your custom tools.</IconCard>
<IconCard icon="route" title="Workflows" href="/mara/tools#workflows">Sequences of tools that you define.</IconCard>
<IconCard icon="triangle-square-circle" title="Integrations" href="/mara/tools#integrations">Links to your existing tools and data sources.</IconCard>
<IconCard icon="file-info" title="Knowledge" href="/mara/tools#knowledge">Org knowledge, base knowledge and queries.</IconCard>
</IconGrid>

## <AppIcon name="sparkles" /> What MARA does {#what-mara-does}

MARA works with your existing workflows, tools and data sources, and handles data processing, analysis and communication across drug discovery, materials science, genomics and bioinformatics.

- It uses large language models and its tools to run tasks from complex data analysis to molecular modeling, and returns results in real time.
- You can write your own tools as Python scripts, SQL queries or HTTP endpoints, for anything from molecule manipulation to data querying.
- It works with platforms like CDD Vault for drug discovery, and aims to expand into other fields.
- It can run inside your organization's firewall, with data privacy and compliance in mind, and fit in with internal informatics systems.

### Applications

<AccordionGroup label="4 application areas">

<Accordion title="Drug discovery and development" teaser="Molecular libraries, lead selection and SAR analysis.">

In cheminformatics, MARA helps create molecular libraries and supports lead selection and SAR analysis by automating tasks such as R-group variation, SMILES-to-SDF conversion, and preparing molecules for docking studies.

</Accordion>

<Accordion title="Genomics and bioinformatics" teaser="Sequencing, proteomics and multi-omics workflows.">

MARA manages workflows for genomic sequencing, proteomic data analysis and multi-omics integration, for working with large datasets.

</Accordion>

<Accordion title="Materials science and engineering" teaser="Design and simulation of new compounds.">

MARA is positioned to support materials science research, helping with the design and simulation of new compounds for advanced materials, nanotechnology and sustainable engineering.

</Accordion>

<Accordion title="Collaborative research and informatics" teaser="One place for databases, experimental data and analysis tools.">

MARA brings traditional databases, experimental data and analysis tools together in one place for interdisciplinary teams, and works within a networked environment to support communication and decisions across R&D.

</Accordion>

</AccordionGroup>
