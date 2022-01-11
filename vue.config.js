module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) =>
        Object.assign(options, {
          transformAssetUrls: {
            VImg: ['src', 'lazy-src'],
            VCard: 'src',
            VCardMedia: 'src',
            VResponsive: 'src',
          },
        })
      )
  },
  configureWebpack: {
    // We provide the app's title in Webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: process.env.VUE_APP_TITLE,
    // Set up all the aliases we use in our app.
    resolve: {
      alias: require('./aliases.config').webpack,
    },
  },
  css: {
    // Enable CSS source maps.
    sourceMap: true,
  },
  // Configure Webpack's dev server.
  // https://cli.vuejs.org/guide/cli-service.html
  devServer: {
    port: process.env.VUE_APP_PORT,
  },
}
