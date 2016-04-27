/*
*
* TODO:
* 1. [ ] compile style sheet in template also, inject to the right position
* 2. [x] preprocessor (Babel, postCSS, etc.)
* 3. [ ] watch (integrate with gulp? webpack?)
* 4. [ ] unit test
* 5. [ ] source map
* 6. [x] import files
* 7. [ ] support non-compiled file insertion
* 8. [ ] modulize
*/
var path = require('path')
var parse5 = require('parse5')
var babel = require('babel-core')
var postcss = require('postcss')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var es2015 = require('babel-preset-es2015')

var file = require('./file')

const GLOBAL_PREFIX = '__w_widgets = {};'


function compile(content) {
    var fragment = parse5.parseFragment(content, {
        locationInfo: true
    })
    var output = {
        script: null,
        template: null,
        style: null,
        imports: {
            scripts: [],
            styles: []
        }
    }
    fragment.childNodes.forEach(node => {
        var type = node.tagName
        var lang = getAttribute(node, 'lang')
        var src = getAttribute(node, 'src')
        // TODO: #6

        if (type === 'script') {
            if (src) {
                output.imports.scripts.push(src)
            } else {
                var start = node.childNodes[0].__location.startOffset
                var end = node.childNodes[node.childNodes.length - 1].__location.endOffset
                var script = output.script = extract(content, start, end)
            }
        } else if (type === 'template') {
            var start = node.__location.startTag.endOffset
            var end = node.__location.endTag.startOffset
            var template = output.template = extract(content, start, end)
        } else if (type === 'style') {
            if (src) {
                output.imports.styles.push(src)
            } else {
                var start = node.__location.startTag.endOffset
                var end = node.__location.endTag.startOffset
                var style = output.style = extract(content, start, end)
            }
        } else if (type === 'div' && !output.template) {
            var start = node.__location.startTag.startOffset
            var end = node.__location.endTag.endOffset
            var template = output.template = extract(content, start, end)
        }
    })
    return output
}
// var output = {
//     script: null,
//     template: null,
//     style: null,
//     imports: {
//         scripts: [],
//         styles: []
//     }
// }


// return a Promise
function transform(input) {
    return transformScript(input).then(transformStyle)
}

function transformScript(input) {
    // FIXME: don't modify original data
    input.script && (input.script = babel.transform(input.script, { presets: [es2015] }).code)
    return Promise.resolve(input)
}

function transformStyle(input) {
    // FIXME: don't modify original data
    if (!input.style)
        return Promise.resolve(input)
    return postcss([autoprefixer, precss]).process(input.style)
    .then(result => {
        input.style = result.css
        return input
    })
    .catch(e => console.error(e))
}

function extract(content, start, end) {
    return content.slice(start, end)
}

function getAttribute(node, name) {
    if (node.attrs) {
        var i = node.attrs.length
        var attr
        while (i--) {
            attr = node.attrs[i]
            if (attr.name === name) {
                return attr.value
            }
        }
    }
}
file.writeFile(GLOBAL_PREFIX, true)
// TODO
file.readFiles(function(content, id) {
    transform(compile(content)).then(output => {
        // console.log(prefix + JSON.stringify(output) + postfix);
        // console.log(output);
        console.log(id);
        var prefix = `__w_widgets['${id}'] = `
        var postfix = ';\n'
        file.writeFile(prefix + JSON.stringify(output) + postfix)
    }).catch(e => console.error(e))
})
