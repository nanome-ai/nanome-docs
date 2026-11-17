/**
 * Network facts for the Getting Started guide: the hosts Nanome needs, the
 * per-vendor requirements, and the allowlist IT copies out of the Wi-Fi page.
 *
 * Ported verbatim from nanome.ai `app/data/setup-guide.js`. These change more
 * often than the prose does, so they live in one file rather than spread across
 * the markdown. Keep the two copies in step.
 *
 * The Nanome hosts were checked against the 2.7.1 client and Nanome Web source
 * (October 2026), which adds workspaces.nanome.ai, files.rcsb.org and the error
 * reporting host. Those additions and the on-prem block at the end are not on
 * nanome.ai yet.
 *
 * The on-prem block comes from Nanome's v2 deployment guide (nanome.ai/deploy)
 * and the nanome-deployer source. It only applies to deployments on the
 * organization's own VM, never to Nanome cloud.
 */

const SETUP_LINKS = {
  metaNetwork: 'https://work.meta.com/help/278069664862989',
  arborNetwork:
    'https://help.arborxr.com/en/articles/6399721-what-urls-and-ports-are-required-to-allow-whitelist-arborxr-traffic-in-my-local-network',
  manageXrNetwork: 'https://help.managexr.com/en/articles/6994017-network-requirements',
}

export const NANOME_HOSTS = [
  { host: 'app.nanome.ai', purpose: 'Web app and MARA' },
  { host: 'workspaces.nanome.ai', purpose: 'Workspaces, live collaboration, and voice' },
  { host: 'home.nanome.ai', purpose: 'Accounts, licenses, and organizations' },
  { host: 'api.nanome.com', purpose: 'Sign-in, device codes, and licensing, Nanome 2.6 and later and the web app' },
  { host: 'api.nanome.ai', purpose: 'Sign-in for earlier releases and Nanome Classic' },
  { host: 'downloads.nanome.ai', purpose: 'APK and Windows downloads' },
]

// From Meta's "Networking requirements for devices enrolled in Meta Horizon
// managed services". Meta also lists regional scontent CDN hosts, which vary by
// location, so the allowlist names one as an example instead of guessing a wildcard.
export const META_HOSTS = [
  'www.facebook.com',
  'graph.facebook.com',
  'graph.facebook-hardware.com',
  'edge-mqtt.facebook.com',
  'portal.fb.com',
  'static.xx.fbcdn.net',
  'www.oculus.com',
  'graph.oculus.com',
  'scontent.oculuscdn.com',
  'work.meta.com',
  'forwork.meta.com',
  'www.google.com',
]

// Not on Meta's page, but on ManageXR's Quest list, and it is the HMS console.
export const META_CONSOLE_HOSTS = ['devicemanager.meta.com']

export const META_PORTS = {
  tcp: '80, 443, 3478, 3479, 8080',
  udp: '40003, 40005, 40007, 40008, 50000-59999',
}

// From ArborXR's "What URLs and ports are required to allow ArborXR traffic".
export const ARBORXR_HOSTS = ['arborxr.com', '*.arborxr.com', 'xrdm.app', '*.xrdm.app', 'abxr.us', 'storage.googleapis.com']

// From ManageXR's "Network Requirements" (updated 2026-08-03).
export const MANAGEXR_HOSTS = [
  '*.managexr.com',
  'managexrapi.com',
  'managexrcdn.com',
  'mighty-platform-prod.appspot.com',
  'mighty-platform-prod.firebaseio.com',
  'us-central1-mighty-platform-prod.cloudfunctions.net',
  '*.googleapis.com',
]

function wrapList(items, perLine, indent = '  ') {
  const lines = []
  for (let i = 0; i < items.length; i += perLine) {
    lines.push(indent + items.slice(i, i + perLine).join(', '))
  }
  return lines
}

export const NETWORK_ALLOWLIST = [
  'Nanome (headsets and web app)',
  '  Outbound TCP 443 (HTTPS and secure WebSockets), allowed by hostname:',
  '  *.nanome.ai, *.nanome.com',
  `  Includes ${NANOME_HOSTS.map((h) => h.host).join(', ')}`,
  '  Exempt these hosts from TLS/SSL inspection.',
  '  Collaboration and voice use a secure WebSocket on TCP 443, so no UDP ports are needed.',
  '  Nothing inbound: Nanome does not listen for incoming connections.',
  '',
  'Also outbound TCP 443 from headsets',
  '  files.rcsb.org (loading structures by PDB ID)',
  '  o185819.ingest.us.sentry.io (error reports, optional)',
  '',
  'Meta Quest (Meta Horizon managed services requirements)',
  `  TCP ${META_PORTS.tcp}`,
  `  UDP ${META_PORTS.udp}`,
  ...wrapList([...META_HOSTS, ...META_CONSOLE_HOSTS], 5),
  '  Plus regional CDN hosts under xx.fbcdn.net, such as scontent-iad3-2.xx.fbcdn.net',
  `  Full per-task list: ${SETUP_LINKS.metaNetwork}`,
  '',
  'ArborXR (when used as the MDM)',
  '  TCP 443:',
  ...wrapList(ARBORXR_HOSTS, 6),
  '  arborxrstatic.com on ports 53, 80, and 443 (captive portal detection)',
  '  Remote Assistance: stun.cloudflare.com (53, 1473, 3478), turn.cloudflare.com (53, 443, 3478, 5349)',
  `  Full list: ${SETUP_LINKS.arborNetwork}`,
  '',
  'ManageXR (when used as the MDM)',
  '  TCP 443:',
  ...wrapList(MANAGEXR_HOSTS, 3),
  '  *.crashlytics.com on ports 80 and 443 (error reporting)',
  '  clients3.google.com and connectivitycheck.gstatic.com on port 80 (connectivity checks)',
  '  Remote screen streaming: openrelay.metered.ca, stun.relay.metered.ca, and global.relay.metered.ca on ports 80 and 443 (TCP and UDP)',
  `  Full list: ${SETUP_LINKS.manageXrNetwork}`,
].join('\n')

// The names come from the Nanome v2 deployment guide (https://nanome.ai/deploy),
// which writes the organization's domain as company.com. What each one serves
// comes from nanome-deployer, whose nginx proxy routes each name to a container.
export const ONPREM_DNS = [
  { host: 'nanome.company.com', purpose: 'Web app, its API, and MARA' },
  { host: 'nanome-tools.company.com', purpose: 'MARA tool server, called by MARA rather than by headsets' },
  { host: 'workspaces.company.com', purpose: 'Workspace API and live collaboration' },
  { host: 'nanome-auth.company.com', purpose: 'Auth proxy to api.nanome.com' },
]

// What the VM itself connects to, from nanome-deployer and the services it runs.
export const ONPREM_OUTBOUND = [
  'api.nanome.com, for sign-in and licensing',
  "Nanome's container registry on AWS (ECR, us-west-1) and Docker Hub, to pull images",
  'github.com, download.docker.com, and awscli.amazonaws.com, during installation',
  'The LLM provider: Anthropic (with api.voyageai.com for embeddings), api.openai.com, AWS Bedrock, or Microsoft Foundry',
  'ghcr.io, only for local embeddings (HF-TEI)',
  'RCSB and EBI, for structure and ligand data',
  'api.github.com, for importing tools from GitHub',
]

export const ONPREM_ALLOWLIST = [
  'Nanome v2 on a private VM (on-prem deployments only, not Nanome cloud)',
  '  VM inbound: TCP 80 (HTTP)',
  '  VM inbound: TCP 443 (HTTPS), only if SSL certificates are provisioned',
  '  Headsets and browsers reach the VM only through the names below.',
  '',
  'DNS A or CNAME records pointing to the VM, shared with the Nanome team',
  ...ONPREM_DNS.map((d) => `  ${d.host} (${d.purpose})`),
  '  HTTPS: one certificate for *.company.com, or one for each name above',
  '',
  'VM outbound',
  ...ONPREM_OUTBOUND.map((o) => `  ${o}`),
  '',
  'Headsets without internet access',
  '  Sign-in and licensing go through the auth proxy on the VM, which forwards them to api.nanome.com.',
  '  Meta Quest and Galaxy XR read the proxy setting from an MDM file:',
  '  /sdcard/Managed files/nanome_config containing',
  '  auth_proxy=http://nanome-auth.company.com',
  '',
  'Deployment guide: https://nanome.ai/deploy',
].join('\n')
