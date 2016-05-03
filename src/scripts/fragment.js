import { find } from './util/index'
var fragments = []

// Create a fragment with a custom tag as wrapper
export function createFragment(name, template) {
    var frag
    if (frag = find(fragments, 'name', name)) return frag.fragment.cloneNode(true)

    frag = document.createDocumentFragment()
    var customTag = document.createElement(name)
    var wrapper = document.createElement('div')
    wrapper.innerHTML = template

    frag.appendChild(customTag)
    customTag.appendChild([...wrapper.childNodes].find(node => node.nodeType === 1))

    fragments.push({
        name: name,
        fragment: frag.cloneNode(true)
    })
    return frag
}
