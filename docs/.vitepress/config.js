import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en-US',
  title: 'Stimulus Toggler',
  description: 'Hotwired stimulus toggler based on reactivity concept.',
  base: '/stimulus-toggler/',

  lastUpdated: false,
  cleanUrls: 'without-subfolders',

  markdown: {
    headers: {
      level: [0, 0]
    },
    config: (md) => {
      // md.use(RemoveIds)
    }
  },
  themeConfig: {
    sidebar: sidebar(),
  }
})


function sidebar() {
  return [
    {
      text: 'Introduction',
      collapsible: true,
      items: [
        { text: 'What is Stimulus Toggler?', link: '/' },
        { text: 'Getting Started', link: '/getting-started' },
        { text: 'Configuration', link: '/configuration' },
      ]
    },
    {
      text: 'Examples',
      collapsible: true,
      items: [
        { text: 'Basic', link: '/examples/basic' },
        { text: 'Multiple basic', link: '/examples/multiple-basic' },
        { text: 'Classes', link: '/examples/classes' },
        { text: 'Classes on/off', link: '/examples/classes-on-off' },
        { text: 'Classes on/off per var', link: '/examples/classes-on-off-per-var' },
      ]
    },
    {
      text: 'Utils',
      collapsible: true,
      items: [
        { text: 'Click outside', link: '/examples/click-outside' },
        { text: 'Tabs', link: '/examples/tabs' },
        { text: 'Transitions', link: '/examples/transitions' },
        // { text: 'Input forms', link: '/examples/input-forms' },
      ]
    },
    // {
    //   text: 'Development',
    //   collapsible: true,
    //   items: [
    //     { text: 'Introduction', link: '/development/introduction' },
    //     { text: 'Tests', link: '/development/tests' },
    //   ]
    // }
  ]
}