var babel = require('babel-core')
var postcss = require('postcss')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var es2015 = require('babel-preset-es2015')
var fs = require('fs')
var bundle = require('./bundle').bundle

const TEMP_FILE = '__w_temp'
var scope = (id) => postcss.plugin('scope', function() {
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
    var id = options.widgetId
    return transformScript(input).then(input => transformStyle(input, options.scopedStyle, id))
}

function transformScript(input) {
    // FIXME: don't modify original data
    input.script && (input.script = babel.transform(input.script, {presets: [es2015]}).code)
    fs.writeFileSync(TEMP_FILE, input.script)
    // TODO: remove temp.js
    return bundle(TEMP_FILE).then(bundle => {
        input.script && (input.script = bundle)
        return input
    })
}

function transformStyle(input, scopedStyle, id) {
    console.log(id);
    console.log(input.style);
    var processors = [autoprefixer, precss]
    if (scopedStyle)
        processors.push(scope(id))
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
