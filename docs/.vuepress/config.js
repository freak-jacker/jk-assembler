module.exports = {
  base: '/docs/.vuepress/dist/',
  title: '集成组件 JkAssembler',
  head: [['link', { rel: 'stylesheet', href: '/public/style.scss' }]],
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      {
        text: '主页',
        link: '/'
      },
      {
        text: '文档',
        link: '/components/install/'
      },
      {
        text: 'github',
        link: ''
      }
    ],
    sidebar: {
      '/components/': [
        {
          title: '入门',
          children: ['/components/install/', '/components/get-started/']
        },
        {
          title: '集成组件',
          children: [
            {
              title: 'JkAssembler',
              path: '/components/JkAssembler/JkAssembler/'
            },
            {
              title: 'JkAssemblerFilter',
              path: '/components/JkAssembler/JkAssemblerFilter/'
            },
            {
              title: 'JkAssemblerTable',
              path: '/components/JkAssembler/JkAssemblerTable/'
            },
            {
              title: 'JkAssemblerForm',
              path: '/components/JkAssembler/JkAssemblerForm/'
            },
            {
              title: 'JkAssemblerFormPanel',
              path: '/components/JkAssembler/JkAssemblerFormPanel/'
            },
            {
              title: 'JkAssemblerPagination',
              path: '/components/JkAssembler/JkAssemblerPagination/'
            }
          ]
        },
        {
          title: '通用组件',
          children: [
            {
              title: 'JkBannerCard',
              path: '/components/common/JkBannerCard/'
            },
            {
              title: 'JkBannerCardList',
              path: '/components/common/JkBannerCardList/'
            }
          ]
        }
      ]
    }
  }
};
