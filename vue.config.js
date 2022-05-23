module.exports = {
    outputDir:'home/public/',
    configureWebpack: {
        devServer: {
            headers: { "Access-Control-Allow-Origin": "*" },
            watchOptions: {
                ignored: [/public/],
            }
        }
    }
}
