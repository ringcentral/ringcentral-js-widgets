import Polyglot from 'node-polyglot'

var polyglot = new Polyglot()
function loadLocale(file) {
    fetch(file)
    .then(response => response.json())
    .then(data => polyglot.replace(data))
}
function translate(string) {
    return polyglot.t(string)
}
export {
    loadLocale,
    translate
}
