'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {

    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true,
    proxyTable: {
       
        
        //   测试
        // '/trade': {
        //     target: 'http://172.16.18.213:8000/txs',
        //     pathRewrite: {'^/trade' : ''}
        // },
        // 172.16.19.163
        '/trade': {
          target: 'http://172.16.17.112:8000/txs',
          pathRewrite: {'^/trade' : ''}
        },
        //208
        // '/trade': {
        //   target: 'http://172.16.21.22:8002/txs',
        //   pathRewrite: {'^/trade' : ''}
        // },
        // '/trade': {
        //   target: 'http://47.93.200.170:8002/txs',
        //   pathRewrite: {'^/trade' : ''}
        // },
        '/okcoin': {
            target: 'http://localhost/okcoin/',
            pathRewrite: {'^/okcoin' : ''}
        },

        '/biy': {
            target: 'http://localhost/biy/',
            pathRewrite: {'^/biy' : ''}
        },
        '/huobi': {
            target: 'http://localhost/huobi/',
            pathRewrite: {'^/huobi' : ''}
        },
    }
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'tradex/static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
