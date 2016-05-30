var path = require('path')

module.exports = {
    entry: [
        path.resolve(__dirname, 'factory/factory.js'),
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'factory.js',
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
        },
        ],
    },
}
