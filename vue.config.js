const isProd = process.env.NODE_ENV === 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
module.exports = {
  pages: {
    index: {
      // 页面入口
      entry: 'examples/main.js',
      // 模板来源
      template: 'examples/pubilc/index.html',
      // 输出文件名
      filename: 'index.html'
    }
  },
  productionSourceMap: false,

  // 扩展 webpack 配置，使 packages 加入编译
  chainWebpack: config => {
    if (isProd) {
      config.module
        .rule('js')
        .include.add('/packages')
        .end()
        .use('babel')
        .loader('babel-loader');
    }
    if (isProd) {
      config
        .plugin('webpack-report')
        .use(BundleAnalyzerPlugin, [{ analyzerMode: 'static' }]);
    }
  }
};
