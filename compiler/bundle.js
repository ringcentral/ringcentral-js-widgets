var rollup = require('rollup')
var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs    = require('rollup-plugin-commonjs')

function bundle(file) {
    // console.log('transform: ' + id);

    return rollup.rollup({
      entry: file,
      sourceMap: true,
      plugins: [
            nodeResolve({jsnext: true, main: true}),
            commonjs()
        ]}
    ).then(function(bundle) {
        var result = bundle.generate({
            format: 'iife',
        })
        return result.code
    }).catch(e => console.error(e))
}
exports.bundle = bundle
