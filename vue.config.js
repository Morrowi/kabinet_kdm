module.exports = {
    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .tap(options => ({
                ...options,
                compilerOptions: {
                    // treat any tag that starts with ion- as custom elements
                    isCustomElement: tagName => tagName === 'vue-advanced-chat'
                }
            }))
    },
    outputDir:'home/public/',
    configureWebpack: {
        devServer: {
            headers: { "Access-Control-Allow-Origin": "*" },
            watchOptions: {
                ignored: [/public/],
            }
        }
    },

}
