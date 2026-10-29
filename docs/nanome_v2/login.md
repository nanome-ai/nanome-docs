---
title: Login Screen
---

# Login Screen

Nanome opens on the login screen. It has two tabs: one for your password, and one for a code you enter on another device.

<ShotRow src="nanome-v2/v2-7/login-password.webp" alt="The Nanome XR login screen on the Password tab">

<IconGrid label="Login screen">
<IconCard icon="password" title="Password" href="#password">Your Nanome username and password.</IconCard>
<IconCard icon="key" title="Code" href="#code">A 4-character code, entered on another device.</IconCard>
<IconCard icon="user-plus" title="Create Account" href="#create-account">A new account, made from the headset.</IconCard>
<IconCard icon="alert-triangle" title="Sign-in messages" href="#sign-in-messages">What went wrong, and device and license limits.</IconCard>
</IconGrid>

</ShotRow>

## <AppIcon name="password" /> Password {#password}

Enter your Nanome username and password, then <Btn icon="login-2">Log in</Btn>.

## <AppIcon name="key" /> Code {#code}

<ShotRow src="nanome-v2/v2-7/login-code.webp" alt="The Code tab with a 4-character code and the time until a new one">

The **Code** tab signs you in from another device.

<Steps>

1. The headset shows a 4-character code. A new code appears every 5 minutes.
2. Enter the code at [nanome.ai/activate](https://nanome.ai/activate), or in **Login via Device Code** on [app.nanome.ai](/nanome_web/account#login-via-device-code).

</Steps>

</ShotRow>

<Callout type="note" title="Accounts that sign in with a code">

Accounts created with Google, Microsoft or Apple, accounts that use single sign-on (SSO), and accounts with two-factor authentication sign in with the **Code** tab.

</Callout>

## <AppIcon name="user-plus" /> Create Account {#create-account}

**Create Account** makes a new account from the headset.

<UiList label="Create Account">
<UiItem name="Email">The account's email address.</UiItem>
<UiItem name="Username">6 to 120 characters: lowercase letters, numbers, dots, underscores and hyphens.</UiItem>
<UiItem name="Password">8 to 250 characters, with an uppercase letter, a lowercase letter and a symbol.</UiItem>
</UiList>

### Video: Creating Your Account

<YoutubeEmbed videoId="cB82b8xIZoY" title="Nanome v2.4 Quick Tips: Creating Your Account" />

## <AppIcon name="info-small" /> Also on the screen {#also-on-the-screen}

<UiList label="Login screen">
<UiItem name="Remember Me">Keeps you signed in on the headset.</UiItem>
<UiItem name="Close">Closes the tutorial banner on the left, which helps new users get started. Show tutorial guides in the Settings tab turns it back on.</UiItem>
<UiItem icon="wifi" name="Network status">Shows the network status.</UiItem>
<UiItem name="Version">Shows the Nanome version.</UiItem>
<UiItem icon="maximize" name="Passthrough">Below the login screen. On by default on headsets that support passthrough.</UiItem>
</UiList>

## <AppIcon name="alert-triangle" /> Sign-in messages {#sign-in-messages}

Since release 2.7, sign-in errors say what went wrong, with a **Details** button that shows the error code, HTTP status and time. The messages cover:

- a wrong username or password
- an account that has to use the **Code** tab (Google, Microsoft, Apple, SSO or 2FA)
- an organization IP restriction
- an account without a license for Nanome XR
- network problems

An account can be signed in on one device at a time. When it is already signed in somewhere else, a **Device Limit** screen asks you to sign out of the other device first. Signing in on another device can sign this one out, with a notice.

Nanome warns when your license will expire within 30 days. When it expires, Nanome signs out with a notice.
