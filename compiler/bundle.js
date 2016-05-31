var rollup = require('rollup')
var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs    = require('rollup-plugin-commonjs')
var browserify = require('browserify')
var replace = require('rollup-plugin-replace')
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
            path: "/a/test/dir/",
            filename: 'test.js',
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
            var fileContent = fs.readFileSync('/a/test/dir/test.js').toString()
            resolve(fileContent)
        })
    })
    // return rollup.rollup({
    //     entry: file,
    //     sourceMap: true,
    //     plugins: [
    //         nodeResolve({
    //             // jsnext: true, 
    //             main: true
    //         }),
    //         commonjs(),
    //         replace({
    //             'process.env.NODE_ENV': JSON.stringify( 'production' )
    //         })
    //     ],
    // }).then(function(bundle) {
    //     var result = bundle.generate({
    //         format: 'umd',
    //         moduleName: '__Ringcentral_widgets'
    //     })
    //     return result.code
    // }).catch(e => console.error(e))
}
// bundle('./temp.js')
exports.bundle = bundle
