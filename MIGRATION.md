# Keeping the guides in step with nanome.ai

Getting Started and Session Guide were ported from two pull requests on the
`nanome.ai` site while both were still open:

| Docs section | Source | Branch | Commit |
| --- | --- | --- | --- |
| Nanome › Getting Started | [nanome-ai/nanome.ai#85](https://github.com/nanome-ai/nanome.ai/pull/85) | `feature/setup-onboarding` | `0682fa4` |
| Nanome › Session Guide | [nanome-ai/nanome.ai#86](https://github.com/nanome-ai/nanome.ai/pull/86) | `feature/session-playbook` | `ac6eb48` |

PR 86 branches off PR 85 but has not picked up its last 7 commits, so the two
guides came from different tips: the setup chapters from 85, which has the
newer MDM picker and a third fact-check pass, and the session chapters from 86,
which is the only place they exist.

**Both PRs were still open when this landed.** Anything that changed on either
branch afterwards, or during review before merge, is not reflected here.

## What maps to what

Each guide is one page, as it is on the website, with each chapter as a section.
Chapter anchors match the website's, so `/setup#network` on nanome.ai and
`/getting-started#network` here point at the same chapter. The website renders a
chapter as a Vue component; here it is markdown plus the components documented at
[/contributing/components](docs/contributing/components.md).

### `docs/getting-started.md`

| Section | Anchor | Source component |
| --- | --- | --- |
| Hardware | `#hardware` | `setup/SetupHardware.vue` |
| Choose an MDM | `#mdm` | `setup/SetupMdm.vue` |
| MDM setup guides | `#mdm-setup` | `setup/SetupMdmGuides.vue` |
| Wi-Fi & network | `#network` | `setup/SetupNetwork.vue` |
| Download & install | `#install` | `setup/SetupInstall.vue` |
| Accounts & licenses | `#account` | `setup/SetupAccount.vue` |
| Log in | `#login` | `setup/SetupLogin.vue` |

### `docs/session-guide.md`

| Section | Anchor | Source component |
| --- | --- | --- |
| Plan the session | `#plan` | `session-guide/SessionPlan.vue` |
| Build the workspace | `#build` | `session-guide/SessionBuild.vue` |
| Scenes | `#scenes` | `session-guide/SessionScenes.vue` |
| Keep it comfortable | `#comfort` | `session-guide/SessionComfort.vue` |
| Permissions | `#roles` | `session-guide/SessionRoles.vue` |
| Share the workspace | `#share` | `session-guide/SessionShare.vue` |
| Run the session | `#live` | `session-guide/SessionLive.vue` |
| Troubleshooting | `#fixes` | `session-guide/SessionFixes.vue` |

## Where the two copies deliberately differ

Nine things could not carry over as they were. Each is a decision worth
revisiting rather than a gap to close silently.

1. **Download URLs.** The website reads the latest build from the CMS, so its
   buttons update on release. There is no CMS here, so every download button
   points at [nanome.ai/versions](https://nanome.ai/versions) — which is also
   where the website's own picker falls back to when the CMS has no URL.
2. **Query parameters.** The website uses one compact key per picker
   (`?mdm=meta-paid`). Here each question gets its own
   (`?mdm-device=meta&mdm-fleet=many&mdm-budget=paid`), which is what the
   `Chooser` component does everywhere. Old `?mdm=` links do not carry over.
3. **Chapter rail.** The website has its own sticky chapter rail with progress
   markers. Here the right-hand rail does that job, listing each chapter and
   the sections inside it.
4. **Unavailable install combinations.** The website greys out a device that a
   method cannot reach. `Chooser` has no disabled state, so picking an
   impossible pair shows the explanation instead — the same copy the website
   shows once the pair is selected.
5. **Icons.** The website uses PrimeIcons throughout. There is no icon font
   here; components draw their own inline SVG and prose does without.
6. **Links back into the docs.** Anything pointing at `help.nanome.ai` became a
   relative link, so it stays inside the site.
7. **Screenshots.** 11 of the 15 session-guide images were already in the docs
   under `nanome-v2/` — the website had pulled them from help.nanome.ai in the
   first place. Those pages reference the existing copies. The 4 MCP blog
   screenshots PR 86 commits are not referenced by any component on that branch
   either, so they were left behind.
8. **Nanome Classic and /versions.** PR 85 also rebuilds the website's
   `/versions` page. That is marketing-site material and was not ported; the
   docs already cover Classic under Nanome Classic (v1.24).
9. **Network facts.** The hosts, ports and generated allowlist live in
   `docs/.vitepress/data/setup-network.js`, copied from the website's
   `app/data/setup-guide.js`. They change more often than the prose, so they sit
   in one file rather than spread across the markdown. **Keep the two copies in
   step.**

## Re-syncing after the PRs merge

```bash
git -C /path/to/nanome.ai log --oneline 0682fa4..master -- app/components/pages/setup app/data/setup-guide.js
git -C /path/to/nanome.ai log --oneline ac6eb48..master -- app/components/pages/session-guide app/data/session-guide.js
```

Anything those list is a change made after this port, and needs applying by hand
to the matching section above.

## The overlap worth deciding

`/setup` and `/session-guide` stay on nanome.ai as marketing pages, so the same
guide now exists twice. Two copies of 15 chapters will drift within a release or
two. Worth settling which one is canonical, and whether the other should link to
it rather than repeat it.
