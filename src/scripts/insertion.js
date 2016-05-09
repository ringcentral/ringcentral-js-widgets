var importedScripts = []
var importedStyles = []
function insertScript (script, shadow) {
    var tag = document.createElement('script')
    tag.text = script
    if (shadow)
        shadow.appendChild(tag)
    else {
        document.body.appendChild(tag)
        document.body.removeChild(tag)
    }
}
function insertStyle(style, shadow) {
    var tag = document.createElement('style')
    tag.innerHTML = style
    shadow? shadow.appendChild(tag): document.body.appendChild(tag)
}
function importStyle(src, shadow) {
    var style = document.createElement('style')
    style.src = src
    shadow? shadow.appendChild(style): document.body.appendChild(style)
}
function importScript(src, shadow) {
    var script = document.createElement('script')
    script.src = src
    shadow? shadow.appendChild(script): document.body.appendChild(script)
    
}

export function insert(name, input, shadow) {
    input.imports.scripts.forEach(src => importScript(src, shadow))
    input.imports.styles.forEach(src => importStyle(src, shadow))
    if (input.script && importedScripts.indexOf(name) === -1) {
        importedScripts.push(name)
        insertScript(input.script, shadow)
    } 
    if (input.style && importedStyles.indexOf(name) === -1) {
        importedStyles.push(name)
        insertStyle(input.style, shadow)
    }
}
