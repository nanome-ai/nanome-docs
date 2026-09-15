/**
 * Network facts for the Getting Started guide: the hosts Nanome needs, the
 * per-vendor requirements, and the allowlist IT copies out of the Wi-Fi page.
 *
 * Ported verbatim from nanome.ai `app/data/setup-guide.js`. These change more
 * often than the prose does, so they live in one file rather than spread across
 * the markdown. Keep the two copies in step.
 */

const SETUP_LINKS = {
  metaNetwork: 'https://work.meta.com/help/278069664862989',
  arborNetwork:
    'https://help.arborxr.com/en/articles/6399721-what-urls-and-ports-are-required-to-allow-whitelist-arborxr-traffic-in-my-local-network',
  manageXrNetwork: 'https://help.managexr.com/en/articles/6994017-network-requirements',
}

export const NANOME_HOSTS = [
  { host: 'app.nanome.ai', purpose: 'Web app and workspaces' },
  { host: 'home.nanome.ai', purpose: 'Accounts, licenses, and organizations' },
  { host: 'api.nanome.com', purpose: 'Sign-in and licensing, Nanome 2.6 and later' },
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
