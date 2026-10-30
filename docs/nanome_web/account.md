---
title: Account & Settings
---

# Account & Settings

The account menu sits at the right end of the top bar, under your initial. It shows your username and email, and links to the account pages. The last line of the menu shows the version of the web app.

<ShotRow src="nanome-web/account-menu.webp" alt="The account menu">

<UiList label="Account menu">
<UiItem icon="lock-cog" name="Login via Device Code" href="#login-via-device-code" area="37.9,31.6,54.0,6.5">Signs a headset in.</UiItem>
<UiItem name="Account / Billing / Organization" area="37.9,41.3,54.0,25.0">Open your account, billing and organization pages.</UiItem>
<UiItem name="Settings" href="#settings" area="37.9,69.4,54.0,6.3">API keys, MCP setup and display preferences.</UiItem>
<UiItem name="Logout" area="37.9,79.0,54.0,6.2">Signs out of Nanome Web.</UiItem>
</UiList>

</ShotRow>

## <AppIcon name="lock-cog" /> Login via Device Code {#login-via-device-code}

<ShotRow src="nanome-web/login-device-code.webp" alt="The Login via Device Code dialog">

Nanome XR can sign in with a 4-character code. The headset's login page shows the code, and entering it in **Login via Device Code** on Nanome Web signs the headset in to the same account. The same dialog opens from the <AppIcon name="lock-cog" /> lock icon in the top bar.

</ShotRow>

## Settings {#settings}

**Settings** has two tabs: **Account** and **System**.

### Account

<UiList label="Account settings">
<UiItem name="Nanome ID">Your account's ID.</UiItem>
<UiItem name="Username">Your username.</UiItem>
<UiItem name="Email">Your email address.</UiItem>
<UiItem name="Organization">Your organization.</UiItem>
<UiItem name="Change password">Sets a new password.</UiItem>
<UiItem name="Profile">First and last name, location, persona and bio.</UiItem>
</UiList>

### System

<ShotRow src="nanome-web/settings-api-keys.webp" alt="API Keys in System settings">

**API Keys** authenticate requests to Nanome's server from tool routes and the `mara-client` Python package. Each key shows only its last characters and its expiry date.

<UiList label="API Keys">
<UiItem name="+ Create" area="84.4,37.3,11.4,8.5">Makes a new key.</UiItem>
<UiItem icon="eye" name="Reveal" area="81.6,67.4,2.4,4.5">Shows the key.</UiItem>
<UiItem icon="copy" name="Copy" area="85.9,67.4,2.4,4.5">Copies the key.</UiItem>
<UiItem icon="trash" name="Delete" area="90.3,67.4,2.4,4.5">Deletes the key.</UiItem>
</UiList>

</ShotRow>

### MCP setup {#mcp-setup}

**MCP Setup** shows the command that connects an AI assistant to the Nanome MCP server, with versions for Claude Code, Codex and Gemini CLI. For Claude Code:

```bash
claude mcp add --transport http nanome https://workspaces.nanome.ai/mcp
```

The assistant asks you to sign in and approve access in a browser the first time it connects. Through the MCP server, an assistant can list and manage projects, workspaces, scenes, entries and components, read a summary of each workspace (chains, residue ranges, ligands and ions), export ligands as SDF, and add annotations.

### Preferences

<ShotRow src="nanome-web/settings-preferences.webp" alt="The preference switches in System settings">

<UiList label="Preferences">
<UiItem name="Auto-open Files" area="3.5,9.1,92.7,9.1">Opens supported files in the split view when they're added to a chat.</UiItem>
<UiItem name="Auto-run Workflows" area="3.5,27.9,92.7,9.1">Runs workflows in chat automatically.</UiItem>
<UiItem name="Dark Mode" area="3.5,46.7,92.7,9.2">Darker colors for the web app.</UiItem>
<UiItem name="Hide Credits" area="3.5,65.6,92.7,8.6">Hides the credits display.</UiItem>
<UiItem name="Reset chats" area="3.5,84.2,92.7,9.2">Delete all permanently deletes all MARA chats and uploaded files.</UiItem>
</UiList>

</ShotRow>

## Licenses and sign-in

Since release 2.7, Nanome XR warns when a license will expire within 30 days, and signs out with a notice when it does. Its sign-in errors say what went wrong: wrong credentials, an account that has to use Google, Microsoft, Apple or SSO sign-in, an organization IP restriction, or a network problem.

Free licenses are limited to 1 owned project, 3 owned workspaces and 5 structures per workspace, with view-only access to shared workspaces and projects. License details are on [home.nanome.ai](/home.nanome.ai/licenses).
