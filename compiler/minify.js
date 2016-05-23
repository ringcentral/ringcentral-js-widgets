var UglifyJS = require("uglify-js");

function minify(source) {
    return UglifyJS.minify(source, {
        fromString: true
    }).code
}
exports.minify = minify
