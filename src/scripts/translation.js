import Polyglot from 'node-polyglot'

var polyglots = {}
var polyglot = new Polyglot()
export function loadLocale(name, file) {
    fetch(file)
    .then(response => response.json())
    .then(data => polyglots[name] = new Polyglot({phrases: data}))
}
export function translate(locale) {
    return string => polyglots[locale] ? polyglots[locale].t(string) : ''
}
