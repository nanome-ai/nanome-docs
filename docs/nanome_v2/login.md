---
title: Login Screen
---

# Login Screen

### Video: Creating Your Account

<YoutubeEmbed videoId="cB82b8xIZoY" title="Nanome v2.4 Quick Tips: Creating Your Account" />

<vimg src="nanome-v2/loginscreen.jpg" />

Nanome opens on the login screen. It has two tabs:

- **Password**: your Nanome username and password.
- **Code**: a 4-character code for signing in from another device. The headset shows the code and asks for it to be entered at [nanome.ai/activate](https://nanome.ai/activate), or in **Login via Device Code** on [app.nanome.ai](/nanome_web/account#login-via-device-code). A new code appears every 5 minutes. **Remember Me** keeps you signed in on the headset.

Accounts created with Google, Microsoft or Apple, accounts that use single sign-on (SSO), and accounts with [two-factor authentication](/home.nanome.ai/twofactorauth) sign in with the **Code** tab.

**Create Account** makes a new account from the headset, with an email, a username (6 to 120 characters: lowercase letters, numbers, `.`, `_` and `-`) and a password (8 to 250 characters, with an uppercase letter, a lowercase letter and a symbol).

A tutorial banner on the left helps new users get started. It can be closed, and turned back on with **Show tutorial guides** in the [Settings tab](/nanome_v2/mainpanel#settings-tab). The screen also shows the network status and the Nanome version.

Below the login screen is the passthrough toggle. It's on by default on headsets that support passthrough.

## Sign-in messages

Since release 2.7, sign-in errors say what went wrong, with a **Details** button that shows the error code, HTTP status and time. The messages cover:

- a wrong username or password
- an account that has to use the **Code** tab (Google, Microsoft, Apple, SSO or 2FA)
- an organization IP restriction
- an account without a license for Nanome XR
- network problems

Nanome can run on a limited number of devices at a time per account. Past the limit, a **Device Limit** screen asks you to sign out of another device first. Signing in on another device can sign this one out, with a notice.

Nanome warns when your license will expire within 30 days. When it expires, Nanome signs out with a notice.
