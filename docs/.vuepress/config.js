module.exports = {
  title: 'Docs',
  description: 'Documentation site for Nanome software.',
  head: [['link', { rel: 'icon', href: '/assets/favicon.ico' }]],
  themeConfig: {
    home: true,
    title: 'Documentation',
    docsDir: 'docs',
    logo: '../assets/original/features-page/nanome-logo.png',
    sidebar: [
      '/',
      {
        title: 'Nanome 1.x (1st Gen)',
        sidebarDepth: 1,
        collapsable: true,
        children: [
          {
            title: 'Overview',
            path: '/nanome1x/overview'
          },
          {
            title: 'Nanome Controls',
            collapsable: true,
            sidebarDepth: 1,

            children: ['/controls/overview']
          },
          {
            title: 'Nanome Navigation',
            collapsable: true,
            children: [
              {
                title: 'Lobby',
                path: '/nanome1x/navigation/lobby'
              },
              {
                title: 'Environment',
                path: '/nanome1x/navigation/environment'
              },
              {
                title: 'Main Menus',
                path: '/nanome1x/navigation/menus'
              },
              {
                title: 'Wrist Menu',
                path: '/nanome1x/navigation/wristmenu'
              },
              {
                title: 'Action Menu',
                path: '/nanome1x/navigation/actionmenu'
              },
              {
                title: 'Tools Menu',
                path: '/nanome1x/navigation/toolsmenu'
              },
              {
                title: '2D UI',
                path: '/nanome1x/navigation/2dui'
              },
              {
                title: 'Voice Command',
                path: '/nanome1x/navigation/voicecommand'
              }
            ]
          },
          {
            title: 'Nanome Plugins (Stacks)',
            collapsable: true,
            children: [
              '/nanome1x/plugins/overview',
              '/nanome1x/plugins/cheminteractions',
              '/nanome1x/plugins/superimpose',
              '/nanome1x/plugins/antibodies',
              '/nanome1x/plugins/chemicalproperties',
              '/nanome1x/plugins/conformergenerator',
              '/nanome1x/plugins/docking',
              '/nanome1x/plugins/LiveDesign',
              '/nanome1x/plugins/minimization',
              '/nanome1x/plugins/realtimescoring',
              '/nanome1x/plugins/structureprep',
              '/nanome1x/plugins/vault',
              '/nanome1x/plugins/sceneviewer',
              '/nanome1x/plugins/rmsd',
              '/nanome1x/plugins/cryoem',
              '/nanome1x/plugins/createyourown',
              '/nanome1x/plugins/stackstudio',
            ]
          },
          {
            title: 'Nanome Macros',
            collapsable: true,
            children: ['/nanome1x/macros/overview']
          },
          {
            title: 'How To',
            collapsable: true,
            children: [

              {
                title: 'How To',
                path: '/nanome1x/howto/howto'
              }
            ]
          },
          {
            title: 'Open in Nanome button',
            collapsable: true,
            children: [
              {
                title: 'Deep Linking',
                path: '/nanome1x/integration/deeplinking'
              },
              {
                title: 'Quick Drop',
                path: '/nanome1x/integration/quickdrop'
              }
            ]
          }
        ]
      },
      {
        title: 'Nanome 2.0 (2nd Gen)',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          '/nanome_v2/login',
          '/nanome_v2/environment',
          '/nanome_v2/mainmenus',
          '/nanome_v2/wristmenu',
          '/nanome_v2/collaboration',
          '/nanome_v2/sampleworkflows',
          '/nanome_v2/tips',
        ],
      },
      {
        title: 'MARA',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          '/mara/overview',
          '/mara/navigation',
          '/mara/features',
          '/mara/resources',
          '/mara/deployment',
          '/mara/technical',
        ],
      },
      {
        title: 'Account Management\nhome.nanome.ai',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          '/home.nanome.ai/overview_home_nanome',
          '/home.nanome.ai/accounttiers',
          '/home.nanome.ai/invoice',
          '/home.nanome.ai/licenses',
          '/home.nanome.ai/meetings',
          '/home.nanome.ai/twofactorauth',
        ],
      },
      {
        title: 'Help',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          '/help/troubleshooting',
          '/help/hardwarerequirements',
          '/help/pchardware',
          '/help/choosinghardware',
          '/help/questforbusiness',
          '/help/enterprise',
          '/help/faq',
          '/help/contact',
        ],
      }
    ],
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Nanome.ai', link: 'https://nanome.ai/' },
      { text: 'Download', link: 'https://home.nanome.ai/setup' },
    ],
  },
  plugins: [
    ['@vuepress/google-analytics', { ga: 'UA-79179574-15' }],
    ['vuepress-plugin-sitemap', { hostname: 'https://docs.nanome.ai' }],
    [
      'vuepress-plugin-zooming',
      {
        delay: 2000,
        options: {
          scaleBase: 0.8,
        },
        selector: '.vimg > img',
      },
    ],
  ],
}
