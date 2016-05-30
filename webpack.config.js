var path = require('path')

module.exports = {
    entry: {
        factory: path.resolve(__dirname, 'factory/factory.js'),
        guest: path.resolve(__dirname, 'embed/guest/index.js'),
        host: path.resolve(__dirname, 'embed/host/index.js'),
        lib: path.resolve(__dirname, 'src/scripts/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js',
    },
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /(node_modules|bower_components)/,
                
            },
            {
                test: /\.json$/i,
                loader: 'json',
            }
        ],
    },
    postcss: function () {
        return [require('precss')];
    }
}
