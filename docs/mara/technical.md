---
title: Technical Documentation
---

# Technical Documentation

<IconGrid label="Technical topics">
<IconCard icon="topology-star-3" title="Architecture and deployment" href="#architecture">How an enterprise deployment is laid out.</IconCard>
<IconCard icon="tool" title="Tool creation" href="#tool-creation">Build your own tools for MARA.</IconCard>
<IconCard icon="key" title="API keys" href="#api-keys">Use MARA and Nanome from other applications.</IconCard>
<IconCard icon="lock" title="Authentication" href="#authentication">Single sign-on with SAML, and organization-wide keys.</IconCard>
</IconGrid>

## <AppIcon name="topology-star-3" /> Architecture and deployment {#architecture}

MARA can run inside an organization's firewall and connect to its internal informatics systems. The layout of an enterprise deployment:

<vimg src="mara/architecture.png" alt="Inside the customer firewall: the MARA server, the tool server, an internally hosted LLM API, users, and internal services and databases. Outside it: Nanome's authentication and SSO provider, and third-party services and public databases." />

## <AppIcon name="tool" /> Tool creation {#tool-creation}

Custom tools are Python scripts, SQL queries or HTTP endpoints, made on the [Tools page](/mara/tools#creating-a-tool) or imported from GitHub. MARA reads each tool's name and description to decide when to use it. Nanome's blog has an [introduction to MARA tool creation](https://nanome.ai/blog/introduction-to-mara-tool-creation/).

## <AppIcon name="key" /> API keys {#api-keys}

API keys let other applications work with MARA and Nanome: tool routes, the `mara-client` Python package, or a chat platform such as Slack or Microsoft Teams. Keys are made under **API Keys** on the **System** tab of [Settings](/nanome_web/account#system), and each one has an expiry date.

<Callout type="warning" title="Keep API keys private">

A key works for anyone who has it, so a key that's no longer used, or that may have leaked, is best deleted.

</Callout>

The same tab has [MCP setup](/nanome_web/account#mcp-setup), which connects an AI assistant such as Claude Code to your Nanome projects and workspaces.

## <AppIcon name="lock" /> Authentication {#authentication}

MARA supports single sign-on (SSO) through standard SAML methods, so organizations can manage identity in one place with providers such as Microsoft Entra ID (formerly Azure Active Directory), Okta and other SAML-compliant platforms.

Tools can also share secrets, such as an API key, across an organization. Under **Secrets** on the [Tools page](/mara/tools), **Create for** sets a secret for **my org** or for **myself**.
