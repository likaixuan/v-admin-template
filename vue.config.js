
const { externals, cssCdn, jsCdn } = require('./cdnConfig.js')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        // 生产环境时引入cdn
        if(isProd) {
          args[0].cdn = {
            css: cssCdn,
            js: jsCdn
          }
        }
        return args
      })
  },
  configureWebpack: {
    externals: isProd ? externals:[], // 生产环境时配置cdn
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
