var babel = require('babel-core')
var postcss = require('postcss')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var es2015 = require('babel-preset-es2015')
var rollup = require('rollup')
var fs = require('fs')
var nodeResolve = require('rollup-plugin-node-resolve')
var commonjs    = require('rollup-plugin-commonjs')

var id = ''
var scope = postcss.plugin('scope', function() {
    return function(root) {
        root.each(function rewriteSelector(node) {
            if (!node.selector) {
                // handle media queries
                if (node.type === 'atrule' && node.name === 'media') {
                    node.each(rewriteSelector)
                }
                return
            }
            node.selector = id + ' ' + node.selector
        })
    }
})

function transform(input, options) {
    id = options.widgetId
    return transformScript(input).then(input => transformStyle(input, options.scopedStyle))
}

function transformScript(input) {
    // FIXME: don't modify original data
    input.script && (input.script = babel.transform(input.script, {presets: [es2015]}).code)
    fs.writeFileSync('__w_temp.js', input.script)
    // TODO: remove temp.js
    return bundle('__w_temp.js').then(bundle => {
        input.script && (input.script = bundle)
        return input
    })
}

function transformStyle(input, scopedStyle) {
    var processors = [autoprefixer, precss]
    if (scopedStyle)
        processors.push(scope)
    // FIXME: don't modify original data
    if (!input.style)
        return Promise.resolve(input)
    return postcss(processors).process(input.style)
    .then(result => {
        input.style = result.css
        return input
    })
    .catch(e => console.error(e))
}
exports.transform = transform

function bundle(file) {
    console.log('transform: ' + id);

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
            moduleName: id
        })
        return result.code
    }).catch(e => console.error(e))
}
