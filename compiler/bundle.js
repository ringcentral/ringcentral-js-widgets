var rollup = require('rollup')
var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs    = require('rollup-plugin-commonjs')
var browserify = require('browserify');
var f = true
function bundle(file) {
    // console.log('transform: ' + id);

    return rollup.rollup({
        entry: file,
        sourceMap: true,
        plugins: [
            nodeResolve({
                jsnext: true, 
                main: true
            }),
            commonjs()
        ],
    }).then(function(bundle) {
        var result = bundle.generate({
            format: 'umd',
            moduleName: '__Ringcentral_widgets'
        })
        return result.code
    }).catch(e => console.error(e))
}
// bundle('./temp.js')
exports.bundle = bundle
