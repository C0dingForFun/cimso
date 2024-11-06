const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer:{
    proxy:{
      '/api':{
        target: 'https://demo.ix.cimsoweb.com',
        changeOrigin: true,
        pathRewrite: {'^/api': ''},
      }
    }
  }
})
