var fs = require('fs')
var path = require('path')
var dir = require('node-dir')

const DIR_PATH = '/../template'
const BUILD_FILE = 'build/widgets.js'

function readFiles(cb, finishCb) {
    var p = path.resolve(__dirname) + DIR_PATH
    var currentOperation
    dir.readFiles(p, {
        match: /.html$/,
    },
    function(err, content, filename, next) {
        if (err) throw err
        currentOperation = cb(content, path.basename(filename).split('.')[0]).then(function() {
            return next()
        })
    },
    function(err, files) {
        currentOperation.then(function() {
            finishCb(files)
        })
        if (err) throw err
    })
}

function writeFile(content, override) {
    if (override)
        fs.writeFile(BUILD_FILE, content, function(err) {
            if (err) {
                return console.log(err)
            }
        })
    else
        fs.appendFile(BUILD_FILE, content, function(err) {
            if (err) {
                return console.log(err)
            }
        })
}

function removeFile(path) {
    fs.unlink(path)
}
exports.readFiles = readFiles
exports.writeFile = writeFile
exports.removeFile = removeFile
