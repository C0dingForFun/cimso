const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      'https://demo.ix.cimsoweb.com':{
        target: 'https://demo.ix.cimsoweb.com',
        changeOrigin: true,
        pathRewrite: {'^https://demo.ix.cimsoweb.com': ''},
      }
    }
  }
})
