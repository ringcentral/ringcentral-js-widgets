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
var watch = require('node-watch')
var file = require('./file')
var compile = require('./compile').compile
var transform = require('./transform').transform
const GLOBAL_PREFIX = '__w_widgets = {};'
const GLOBAL_POSTFIX = ''

function start() {
    console.log('compile')
    file.writeFile(GLOBAL_PREFIX, true)
    // TODO
    file.readFiles(function(content, id) {
        transform(compile(content)).then(output => {
            var prefix = `__w_widgets['${id}'] = `
            var postfix = ';\n'
            file.writeFile(prefix + JSON.stringify(output) + postfix)
        }).catch(e => console.error(e))
    })
    file.writeFile(GLOBAL_POSTFIX, false)

}
watch(path.resolve(__dirname) + '/../template', start)
start()
