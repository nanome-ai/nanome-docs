---
title: Technical Documentation
---

# Technical Documentation

<IconGrid label="Technical topics">
<IconCard icon="topology-star-3" title="Architecture" href="#architecture">How an enterprise deployment is laid out.</IconCard>
<IconCard icon="tool" title="Tool creation" href="#tool-creation">Build your own tools for MARA.</IconCard>
<IconCard icon="key" title="API keys" href="#api-keys">Use MARA from other applications.</IconCard>
<IconCard icon="lock" title="Authentication" href="#authentication">Single sign-on with SAML, and organization-wide keys.</IconCard>
</IconGrid>

## <AppIcon name="topology-star-3" /> Architecture {#architecture}

The layout of an enterprise deployment:

<vimg src="mara/architecture.png" alt="Enterprise deployment layout" />

## <AppIcon name="tool" /> Tool creation {#tool-creation}

You can create your own custom tools to integrate with MARA. Nanome's blog has an [introduction to MARA tool creation](https://nanome.ai/blog/introduction-to-mara-tool-creation/).

## <AppIcon name="key" /> API keys {#api-keys}

API keys let third-party applications work with MARA. With one, developers can integrate MARA with existing web applications, talk to MARA from chat platforms like Slack or Microsoft Teams, and use everything MARA can do, such as running workflows.

<Steps>

1. Open the **Settings** page and its **System** tab.
2. Choose **Create**. MARA gives you a key with an expiration date, which authenticates requests securely.

</Steps>

<Callout type="warning" title="Keep API keys private">

Keep your API keys private to maintain security.

</Callout>


## <AppIcon name="lock" /> Authentication {#authentication}

MARA supports single sign-on (SSO) through standard SAML methods, so organizations can manage identity in one place with providers such as Microsoft Azure Active Directory (AD), Okta and other SAML-compliant platforms.

Administrators can also set organization-wide API keys for specific tools. They give controlled access to MARA's resources, keep integrations secure and scalable, and make user permissions simpler to manage across the organization.
