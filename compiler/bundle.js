var webpack = require("webpack")
var path = require('path')
var MemoryFS = require("memory-fs")
var f = true
var fs = new MemoryFS()
function config(file) {
    return {
        entry: [
            path.resolve(__dirname) + '/../' + file,
        ],
        output: {
            path: "/a/virtual/dir/",
            filename: 'bundle.js',
        },
        devtool: 'source-map',
        module: {
            loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /(node_modules|bower_components|build)/,
                
            },
            {
                test: /\.json$/i,
                loader: 'json',
            },
            ],
        },
        plugins: []
    }
}
function bundle(file) {
    // console.log('transform: ' + id);
    var compiler = webpack(config(file))
    compiler.outputFileSystem = fs
    return new Promise(resolve => {
        compiler.run(function(err, stats) {
            var fileContent = fs.readFileSync('/a/virtual/dir/bundle.js').toString()
            resolve(fileContent)
        })
    })

}
// bundle('./temp.js')
exports.bundle = bundle
