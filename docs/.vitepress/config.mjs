import { defineConfig } from 'vitepress'

// Pages for people editing the docs. `docs:dev` serves them; `docs:build` leaves
// them out, so they never reach docs.nanome.ai, its sitemap or its search index.
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  title: 'Help & Documentation',
  description: 'Documentation site for Nanome software.',
  cleanUrls: true,

  srcExclude: isProduction ? ['contributing/**'] : [],

  head: [
    ['link', { rel: 'icon', href: '/assets/favicon.ico' }],
    [
      'script',
      {
        async: '',
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-79179574-15'
      }
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-79179574-15');`
    ]
  ],

  sitemap: {
    hostname: 'https://docs.nanome.ai'
  },

  lastUpdated: true,

  themeConfig: {
    logo: {
      light: '/assets/nanome-logo-dark.svg',
      dark: '/assets/nanome-logo.svg',
    },

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Nanome.ai', link: 'https://nanome.ai/' },
      { text: 'Download', link: 'https://home.nanome.ai/setup' },
      { text: 'Contact', link: '/help/contact' },
    ],

    search: {
      provider: 'local'
    },

    sidebar: [
      {
        text: 'Home',
        link: '/'
      },
      {
        text: 'Nanome',
        collapsed: true,
        items: [
          {
            text: 'Nanome XR',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/nanome_v2/overview' },
              { text: 'Getting Started', link: '/getting-started' },
              { text: "What's New in 2.7", link: '/nanome_v2/whatsnew' },
              { text: 'Login', link: '/nanome_v2/login' },
              { text: 'Main Panel', link: '/nanome_v2/mainpanel' },
              { text: 'Tools Panel', link: '/nanome_v2/toolspanel' },
              { text: 'Scenes Panel', link: '/nanome_v2/scenespanel' },
              { text: 'Wrist Menu', link: '/nanome_v2/wristmenu' },
              { text: 'Comments & Annotations', link: '/nanome_v2/comments' },
              { text: 'Sequence Panel', link: '/nanome_v2/sequencepanel' },
              { text: 'Environment', link: '/nanome_v2/environment' },
              { text: 'Collaboration', link: '/nanome_v2/collaboration' },
              { text: 'Session Guide', link: '/session-guide' },
              { text: 'Sample Workflows', link: '/nanome_v2/sampleworkflows' },
              { text: 'Tips', link: '/nanome_v2/tips' }
            ]
          },
          {
            text: 'Nanome Web',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/nanome_web/overview' },
              { text: 'Web App Basics (Video)', link: '/nanome_web/basics' },
              { text: 'Home, Workspaces & Projects', link: '/nanome_web/home' },
              { text: 'Workspace View', link: '/nanome_web/workspace' },
              { text: 'Selection & Measurement', link: '/nanome_web/workspace#tool-rail' },
              { text: 'Loading Structures', link: '/nanome_web/loading' },
              { text: 'Entries Tab', link: '/nanome_web/entries' },
              { text: 'Ligands Tab', link: '/nanome_web/ligands' },
              { text: 'Users & Sharing', link: '/nanome_web/collaboration' },
              { text: 'Comments', link: '/nanome_web/comments' },
              { text: 'MD Trajectory Playback', link: '/nanome_web/mdplayback' },
              { text: 'Account & Settings', link: '/nanome_web/account' },
              { text: 'Supported File Formats', link: '/nanome_web/fileformats' }
            ]
          }
        ]
      },
      {
        text: 'MARA',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/mara/overview' },
          { text: 'Features', link: '/mara/features' },
          { text: 'Navigation', link: '/mara/navigation' },
          { text: 'Technical', link: '/mara/technical' },
          { text: 'Resources', link: '/mara/resources' }
        ]
      },
      {
        text: 'Nanome Classic (v1.24)',
        collapsed: true,
        items: [
          {
            text: 'Overview',
            link: '/nanome1x/overview'
          },
          {
            text: 'Nanome Controls',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/controls/overview' }
            ]
          },
          {
            text: 'Nanome Navigation',
            collapsed: true,
            items: [
              { text: 'Lobby', link: '/nanome1x/navigation/lobby' },
              { text: 'Environment', link: '/nanome1x/navigation/environment' },
              { text: 'Main Menus', link: '/nanome1x/navigation/menus' },
              { text: 'Wrist Menu', link: '/nanome1x/navigation/wristmenu' },
              { text: 'Action Menu', link: '/nanome1x/navigation/actionmenu' },
              { text: 'Tools Menu', link: '/nanome1x/navigation/toolsmenu' },
              { text: '2D UI', link: '/nanome1x/navigation/2dui' },
              { text: 'Voice Command', link: '/nanome1x/navigation/voicecommand' }
            ]
          },
          {
            text: 'Nanome Plugins (Stacks)',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/nanome1x/plugins/overview' },
              { text: 'Chemical Interactions', link: '/nanome1x/plugins/cheminteractions' },
              { text: 'Superimpose', link: '/nanome1x/plugins/superimpose' },
              { text: 'Antibodies', link: '/nanome1x/plugins/antibodies' },
              { text: 'Chemical Properties', link: '/nanome1x/plugins/chemicalproperties' },
              { text: 'Conformer Generator', link: '/nanome1x/plugins/conformergenerator' },
              { text: 'Docking', link: '/nanome1x/plugins/docking' },
              { text: 'LiveDesign', link: '/nanome1x/plugins/LiveDesign' },
              { text: 'Minimization', link: '/nanome1x/plugins/minimization' },
              { text: 'Real-Time Scoring', link: '/nanome1x/plugins/realtimescoring' },
              { text: 'Structure Prep', link: '/nanome1x/plugins/structureprep' },
              { text: 'Vault', link: '/nanome1x/plugins/vault' },
              { text: 'Scene Viewer', link: '/nanome1x/plugins/sceneviewer' },
              { text: 'RMSD', link: '/nanome1x/plugins/rmsd' },
              { text: 'Cryo-EM', link: '/nanome1x/plugins/cryoem' },
              { text: 'Create Your Own', link: '/nanome1x/plugins/createyourown' },
              { text: 'Stack Studio', link: '/nanome1x/plugins/stackstudio' }
            ]
          },
          {
            text: 'Nanome Macros',
            collapsed: true,
            items: [
              { text: 'Overview', link: '/nanome1x/macros/overview' }
            ]
          },
          {
            text: 'How To',
            collapsed: true,
            items: [
              { text: 'How To', link: '/nanome1x/howto/howto' }
            ]
          },
          {
            text: 'Hardware & Deployment',
            collapsed: true,
            items: [
              { text: 'Choosing Hardware (Classic)', link: '/help/choosinghardware-classic' },
              { text: 'Hardware Requirements', link: '/help/hardwarerequirements' },
              { text: 'PC Hardware', link: '/help/pchardware' },
              { text: 'Enterprise Deployment', link: '/help/enterprise' }
            ]
          },
          {
            text: 'Open in Nanome button',
            collapsed: true,
            items: [
              { text: 'Deep Linking', link: '/nanome1x/integration/deeplinking' },
              { text: 'Quick Drop', link: '/nanome1x/integration/quickdrop' }
            ]
          }
        ]
      },
      {
        text: 'Accounts & Licenses',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/home.nanome.ai/overview_home_nanome' },
          { text: 'Licenses', link: '/home.nanome.ai/licenses' },
          { text: 'Two Factor Auth', link: '/home.nanome.ai/twofactorauth' },
          { text: 'Invoice', link: '/home.nanome.ai/invoice' },
          { text: 'Account Tiers (Classic)', link: '/home.nanome.ai/accounttiers' },
          { text: 'Meetings', link: '/home.nanome.ai/meetings' }
        ]
      },
      {
        text: 'Help',
        collapsed: true,
        items: [
          { text: 'FAQ', link: '/help/faq' },
          { text: 'Troubleshooting', link: '/help/troubleshooting' },
          { text: 'Choosing Hardware', link: '/help/choosinghardware' },
          { text: 'Contact', link: '/help/contact' }
        ]
      },
      ...(isProduction ? [] : [{
        text: 'For editors',
        collapsed: true,
        items: [
          { text: 'Interactive components', link: '/contributing/components' }
        ]
      }])
    ],

    sidebarDepth: 2
  }
})
