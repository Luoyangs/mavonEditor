var { sidebar } = require('../../gen-sidebar');

module.exports = {
  base: '/',
  themeConfig: {
    nav: [
      {
        text: '首页',
        link: '/'
      },
      {
        text: '组件',
        link: '../components/'
      },
      {
        text: 'External',
        link: 'https://google.com'
      }
    ],
    sidebar: sidebar
  },
  plugins: [
    '@vuepress/register-components',
    'rpurl'
  ],
  markdown: {
    extendMarkdown: md => {
      md
        .use(require('markdown-it-imsize'))
        .use(require('./md-plugins/toc'), {
          includeLevel: [1, 2],
        })
        .use(require('./md-container/row'))
        .use(require('./md-container/col'))
    }
  },
  chainWebpack: (config, isServer) => {
    const inlineLimit = 10000
    config.module.rule('images')
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: inlineLimit,
        name: `assets/img/[name].[hash:8].[ext]`
      })
  }

}