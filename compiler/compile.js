var fs = require('fs')
var dir = require('node-dir')
var parse5 = require('parse5')
var path = require('path')
const GLOBAL_PREFIX = `__w_widgets = {};`

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
writeFile(GLOBAL_PREFIX, true)
readFiles()
function compile(content) {
    var fragment = parse5.parseFragment(content, {
        locationInfo: true
    })
    var output = {
        script: null,
        template: null,
        style: null
    }
    fragment.childNodes.forEach(node => {
        var type = node.tagName
        if (type === 'script') {
            var start = node.childNodes[0].__location.startOffset
            var end = node.childNodes[node.childNodes.length - 1].__location.endOffset
            var script = output.script = extract(content, start, end)

        } else if (type === 'template') {
            var start = node.__location.startTag.endOffset
            var end = node.__location.endTag.startOffset
            var template = output.template = extract(content, start, end)

        } else if (type === 'style') {
            var start = node.__location.startTag.endOffset
            var end = node.__location.endTag.startOffset
            var style = output.style = extract(content, start, end)
        }
    })
    return output
}

function extract(content, start, end) {
    return content.slice(start, end)
}


function writeFile(content, override) {
    if (override)
        fs.writeFile('compiler/test.js', content, function(err) {
            if (err) {
                return console.log(err)
            }
        })
    else
        fs.appendFile('compiler/test.js', content, function(err) {
            if (err) {
                return console.log(err)
            }
        })
}

