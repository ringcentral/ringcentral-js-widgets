var parse5 = require('parse5')
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
        },
        options: {
            scopedStyle: false
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
                if (getAttribute(node, 'scoped') != null)
                    output.options.scopedStyle = true
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
exports.compile = compile
