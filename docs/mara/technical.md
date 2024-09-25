---
title: Technical Documentation
---

# Technical Documentation

## Architecture
<vimg src="mara/architecture.png" />
Enterprise deployment layout

## Tool Creation

You can create your own custom tools to integrate with MARA! For more information on tool creation, refer to <a href="https://nanome.ai/blog/introduction-to-mara-tool-creation/">this blog.</a>

## Creating API Keys & API Documentation

In the Settings page under the "System" tab, users can create and manage API keys to interact with MARA from third-party applications. These API keys enable developers to integrate MARA with existing web applications, communicate with MARA via chat platforms like Slack or Microsoft Teams, and perform all available MARA functionalities such as executing workflows. To generate a new API key, simply click on the "Create" button, and MARA will provide a key with an expiration date, which can be used to authenticate requests securely. Make sure to keep your API keys private to maintain security.

Official API documentation coming soon!

## Authentication

MARA supports Single Sign-On (SSO) integration through standard SAML methods, enabling seamless and secure user authentication across enterprise environments. This allows organizations to centralize identity management and improve security by leveraging widely used identity providers such as Microsoft Azure Active Directory (AD), Okta, and other SAML-compliant platforms. 
Additionally, administrators can configure organization-wide API keys for specific tools, granting controlled access to MARA’s resources, ensuring that integrations are both secure and scalable while simplifying the management of user permissions across the organization.
