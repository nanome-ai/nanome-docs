module.exports = {
  description: "Documentation site for Nanome software.",
  themeConfig: {
    home: true,
    title: "Documentation",
    docsDir: "docs",
    logo: "../assets/features-page/nanome-logo.png",
    sidebar: [
      "/",
      "/navigating",
      "/home.nanome.ai",
      "/plugins",
      "/macros",
      "/how-to",
      "/faq",
      "/account-tiers",
      "/hardware-requirement",
      "/troubleshooting",
      "/contact"
    ],
    sidebarDepth: 2,
    lastUpdated: "Last Updated",
    nav: [
      { text: "Home", link: "/" },
      { text: "Nanome.ai", link: "https://nanome.ai/" },
      { text: "Download", link: "https://home.nanome.ai/setup" }
    ],
    ga: "UA-79179574-15"
  }
}
