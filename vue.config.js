
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const { externals, cssCdn, jsCdn } = require('./cdnConfig.js')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

// 生产环境开启gzip
const productionGzip = true

let plugins = []

if (isProd && productionGzip) {
  plugins.push(
    new CompressionWebpackPlugin({
      test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
      threshold: 10000,
      minRatio: 0.8
    })
  )
}

module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        // 生产环境时引入cdn
        if (isProd) {
          args[0].cdn = {
            css: cssCdn,
            js: jsCdn
          }
        }
        return args
      })
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH, // 静态资源路径
  productionSourceMap: false, // 生产环境 sourceMap
  configureWebpack: {
    externals: isProd ? externals : [], // 生产环境时配置cdn
    plugins,
    devServer: {
      proxy: {
        '/api': {
          target: 'http://admin.com:9099',
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
}
