/*
*
* TODO:
* 1. compile style sheet in template also, inject to the right position
* 2. preprocessor (Babel, postCSS, etc.)
* 3. watch (integrate with gulp? webpack?)
* 4. unit test
* 5. source map
* 6. import files
* 7. support non compiled file insertion
*/

var fs = require('fs')
var dir = require('node-dir')
var parse5 = require('parse5')
var path = require('path')
var babel = require('babel-core')
var postcss = require('postcss')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var es2015 = require('babel-preset-es2015')
const GLOBAL_PREFIX = '__w_widgets = {};'

function readFiles() {
    var p = path.resolve(__dirname) + '/../template'
    dir.readFiles(p,
    function(err, content, filename, next) {
        if (err) throw err
        var id = path.basename(filename).split('.')[0]
        var prefix = `__w_widgets['${id}'] = `
        var postfix = ';\n'
        writeFile(prefix + JSON.stringify(compile(content)) + postfix)
        next()
    },
    function(err, files) {
        if (err) throw err
    })
}

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
                var script = output.script = babel.transform(extract(content, start, end),
                    { presets: [es2015] }).code
            }
            
        } else if (type === 'template') {
            var start = node.__location.startTag.endOffset
            var end = node.__location.endTag.startOffset
            var template = output.template = extract(content, start, end)
        } else if (type === 'style') {
            var start = node.__location.startTag.endOffset
            var end = node.__location.endTag.startOffset

            // FIXME: ASYNC
            // postcss([autoprefixer, precss]).process(extract(content, start, end)).then(result => {
            //     console.log(result.css);
            // })

            var style = output.style = extract(content, start, end)
        } else if (type === 'div' && !output.template) {
            var start = node.__location.startTag.startOffset
            var end = node.__location.endTag.endOffset
            var template = output.template = extract(content, start, end)
        }
    })
    return output
}

function extract(content, start, end) {
    return content.slice(start, end)
}

function writeFile(content, override) {
    if (override)
        fs.writeFile('build/widgets.js', content, function(err) {
            if (err) {
                return console.log(err)
            }
        })
    else
        fs.appendFile('build/widgets.js', content, function(err) {
            if (err) {
                return console.log(err)
            }
        })
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
writeFile(GLOBAL_PREFIX, true)
readFiles()
