import Polyglot from 'node-polyglot'

var polyglots = {}
var polyglot = new Polyglot()
function loadLocale(name, file) {
    fetch(file)
    .then(response => response.json())
    .then(data => polyglots[name] = new Polyglot({phrases: data}))
}
function translate(locale) {
    return string => polyglots[locale] ? polyglots[locale].t(string) : ''
}
export {
    loadLocale,
    translate
}
