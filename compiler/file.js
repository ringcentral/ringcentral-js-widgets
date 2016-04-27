var fs = require('fs')
var path = require('path')
var dir = require('node-dir')

function readFiles(cb) {
    var p = path.resolve(__dirname) + '/../template'
    dir.readFiles(p,
    function(err, content, filename, next) {
        if (err) throw err
        cb(content, path.basename(filename).split('.')[0])
        next()
    },
    function(err, files) {
        if (err) throw err
    })
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
exports.readFiles = readFiles
exports.writeFile = writeFile
