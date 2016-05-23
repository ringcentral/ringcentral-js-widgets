/*
*
* TODO:
* 1. [x] compile style sheet in template also, inject to the right position
* 2. [x] preprocessor (Babel, postCSS, etc.)
* 3. [x] watch (integrate with gulp? webpack?)
* 4. [ ] unit test
* 5. [-] source map (it seems okay for now)
* 6. [x] import files
* 7. [ ] support non-compiled file insertion
* 8. [x] modulize
* 9. [ ] cli
* 10.[ ] minify
* 11.[ ] config
*/

var path = require('path')
var watch = require('node-watch')
var file = require('./file')
var compile = require('./compile').compile
var transform = require('./transform').transform
var minify = require('./minify').minify
const GLOBAL_PREFIX = '__w_widgets = {};'
const GLOBAL_POSTFIX = ''

function start() {
    console.log('compile')
    var data = ''
    file.writeFile(GLOBAL_PREFIX, true)
    file.readFiles(function(content, id) {
        var content = compile(content)
        return transform(content, {
            widgetId: id,
            scopedStyle: content.options.scopedStyle
        }).then(output => {
            var prefix = `__w_widgets['${id}'] = `
            var postfix = ';\n'
            // file.writeFile()
            console.log(id);
            data += (prefix + JSON.stringify(output) + postfix)
        }).catch(e => console.error(e))
    }, function() {
        file.writeFile(minify(data))
        console.log('finish');
    })
    file.writeFile(GLOBAL_POSTFIX, false)
    // file.removeFile('__w_temp.js')
}
watch(path.resolve(__dirname) + '/../template', start)
start()
