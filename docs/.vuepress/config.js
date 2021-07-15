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
        title: 'Nanome Navigation',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          '/navigation/lobby',
          '/navigation/environment',
          '/navigation/menus',
          '/navigation/wristmenu',
          '/navigation/actionmenu',
          '/navigation/toolsmenu',
          '/navigation/2dui',
          '/navigation/voicecommand'
        ]
      },
      {
        title: 'Nanome Plugins (Stacks)',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          '/plugins/overview',
          '/plugins/vault',
          '/plugins/minimization',
          '/plugins/rmsd',
          '/plugins/realtimescoring',
          '/plugins/docking',
          '/plugins/chemicalproperties',
          '/plugins/structureprep',
          '/plugins/createyourown',
          '/plugins/stackstudio'
        ]
      },
      {
        title: 'Nanome Macros',
        collapsable: true,
        sidebarDepth: 1,
        children: ['/macros/overview']
      },
      {
        title: 'How To',
        collapsable: true,
        sidebarDepth: 2,
        children: ['/howto/howto']
      },
      {
        title: 'home.nanome.ai',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          '/home.nanome.ai/accounttiers',
          '/home.nanome.ai/invoice',
          '/home.nanome.ai/licenses'
        ]
      },
      {
        title: 'Help',
        collapsable: true,
        sidebarDepth: 1,
        children: [
          // '/help/howto',
          '/help/troubleshooting',
          '/help/hardwarerequirements',
          '/help/faq',
          '/help/contact'
        ]
      }
    ],
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Nanome.ai', link: 'https://nanome.ai/' },
      { text: 'Download', link: 'https://home.nanome.ai/setup' }
    ]
  },
  plugins: [
    ['@vuepress/google-analytics', { ga: 'UA-79179574-15' }],
    [
      'vuepress-plugin-zooming',
      {
        delay: 2000,
        options: {
          scaleBase: 0.8
        },
        selector: '.vimg > img'
      }
    ]
  ]
}
