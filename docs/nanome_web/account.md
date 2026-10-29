---
title: Account & Settings
---

# Account & Settings

The account menu sits at the right end of the top bar, under your initial. It shows your username and email, and links to the account pages.

<vimg src="nanome-web/account-menu.webp" alt="The account menu" />

- **Login via Device Code**: signs a headset in. See [below](#login-via-device-code).
- **Account**, **Billing** and **Organization**: open those pages.
- **Settings**: API keys, MCP setup and display preferences. See [Settings](#settings).
- **Logout**: signs out of Nanome Web.

The last line of the menu shows the version of the web app.

## Login via Device Code

Nanome XR can sign in with a 4-character code. The headset's login page shows the code, and entering it in **Login via Device Code** on Nanome Web signs the headset in to the same account. The same dialog opens from the lock icon in the top bar.

<vimg src="nanome-web/login-device-code.webp" alt="The Login via Device Code dialog" />

See [Login](/nanome_v2/login) for the headset side.

## Settings

**Settings** has two tabs.

### Account

Your **Nanome ID**, **Username**, **Email** and **Organization**, a **Change password** button, and a **Profile** with first and last name, location, persona and bio.

### System

**API Keys** authenticate requests to Nanome's server from tool routes and the `mara-client` Python package. **+ Create** makes a new key. Each key shows only its last characters and its expiry date, with buttons to reveal, copy or delete it.

<vimg src="nanome-web/settings-api-keys.webp" alt="API Keys in System settings" />

### MCP setup

**MCP Setup** shows the command that connects an AI assistant to the Nanome MCP server, with versions for Claude Code, Codex and Gemini CLI. For Claude Code:

```bash
claude mcp add --transport http nanome https://workspaces.nanome.ai/mcp
```

The assistant asks you to sign in and approve access in a browser the first time it connects. Through the MCP server, an assistant can list and manage projects, workspaces, scenes, entries and components, read a summary of each workspace (chains, residue ranges, ligands and ions), export ligands as SDF, and add annotations.

### Preferences

- **Auto-open Files**: opens supported files in the split view when they're added to a chat.
- **Auto-run Workflows**: runs workflows in chat automatically.
- **Dark Mode**: darker colors for the web app.
- **Hide Credits**: hides the credits display.
- **Reset chats**: **Delete all** permanently deletes all MARA chats and uploaded files.

<vimg src="nanome-web/settings-preferences.webp" alt="The preference switches in System settings" />

## Licenses and sign-in

Since release 2.7, Nanome XR warns when a license will expire within 30 days, and signs out with a notice when it does. Its sign-in errors say what went wrong: wrong credentials, an account that has to use Google, Microsoft, Apple or SSO sign-in, an organization IP restriction, or a network problem. See [Login Screen](/nanome_v2/login#sign-in-messages).

Free licenses are limited to 1 owned project, 3 owned workspaces and 5 structures per workspace, with view-only access to shared workspaces and projects. License details are on [home.nanome.ai](/home.nanome.ai/licenses).
