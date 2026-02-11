import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Docs',
  description: 'Documentation site for Nanome software.',

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
        text: 'Nanome 1.24 (1st Gen)',
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
        text: 'Nanome v2 (2nd Gen)',
        collapsed: true,
        items: [
          { text: 'Login', link: '/nanome_v2/login' },
          { text: 'Environment', link: '/nanome_v2/environment' },
          { text: 'Main Menus', link: '/nanome_v2/mainmenus' },
          { text: 'Wrist Menu', link: '/nanome_v2/wristmenu' },
          { text: 'Collaboration', link: '/nanome_v2/collaboration' },
          { text: 'Sample Workflows', link: '/nanome_v2/sampleworkflows' },
          { text: 'Tips', link: '/nanome_v2/tips' }
        ]
      },
      {
        text: 'MARA',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/mara/overview' },
          { text: 'Navigation', link: '/mara/navigation' },
          { text: 'Features', link: '/mara/features' },
          { text: 'Resources', link: '/mara/resources' },
          { text: 'Deployment', link: '/mara/deployment' },
          { text: 'Technical', link: '/mara/technical' }
        ]
      },
      {
        text: 'Account Management\nhome.nanome.ai',
        collapsed: true,
        items: [
          { text: 'Overview', link: '/home.nanome.ai/overview_home_nanome' },
          { text: 'Account Tiers', link: '/home.nanome.ai/accounttiers' },
          { text: 'Invoice', link: '/home.nanome.ai/invoice' },
          { text: 'Licenses', link: '/home.nanome.ai/licenses' },
          { text: 'Meetings', link: '/home.nanome.ai/meetings' },
          { text: 'Two Factor Auth', link: '/home.nanome.ai/twofactorauth' }
        ]
      },
      {
        text: 'Help',
        collapsed: true,
        items: [
          { text: 'Troubleshooting', link: '/help/troubleshooting' },
          { text: 'Hardware Requirements', link: '/help/hardwarerequirements' },
          { text: 'PC Hardware', link: '/help/pchardware' },
          { text: 'Choosing Hardware', link: '/help/choosinghardware' },
          { text: 'Quest for Business', link: '/help/questforbusiness' },
          { text: 'Enterprise', link: '/help/enterprise' },
          { text: 'FAQ', link: '/help/faq' },
          { text: 'Contact', link: '/help/contact' }
        ]
      }
    ],

    sidebarDepth: 2
  }
})
