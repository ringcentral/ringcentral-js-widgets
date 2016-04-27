var babel = require('babel-core')
var postcss = require('postcss')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var es2015 = require('babel-preset-es2015')

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
exports.transform = transform
