var importedScripts = []
var importedStyles = []
function insertScript (script) {
    var tag = document.createElement('script')
    tag.text = script
    document.body.appendChild(tag)
    document.body.removeChild(tag)
}
function insertStyle(style) {
    var tag = document.createElement('style')
    tag.innerHTML = style
    document.head.appendChild(tag)
}
function importStyle(src) {
    var style = document.createElement('style')
    style.src = src
    document.head.appendChild(style)
}
function importScript(src) {
    var script = document.createElement('script')
    script.src = src
    document.body.appendChild(script)
}

function insert(name, input) {
    input.imports.scripts.forEach(importScript)
    input.imports.styles.forEach(importStyle)
    if (input.script && importedScripts.indexOf(name) === -1) {
        importedScripts.push(name)
        insertScript(input.script)
    } 
    if (input.style && importedStyles.indexOf(name) === -1) {
        importedStyles.push(name)
        insertStyle(input.style)
    }
}

export {
    insert
}
