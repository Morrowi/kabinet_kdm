module.exports = {
    outputDir:'home/public/',
    configureWebpack: {
        devServer: {
            watchOptions: {
                ignored: [/public/],
            }
        }
    }
}
