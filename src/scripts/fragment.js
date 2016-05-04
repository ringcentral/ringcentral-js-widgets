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

export function generateDocument(widget, fragment) {
    var dom = {}
    var getRefsToDOM = getRefsTo(dom)
    var assignEventToWidget = assignEventTo(widget)
    Array.from(fragment.querySelectorAll('[data-info]')).forEach(getRefsToDOM)
    Array.from(fragment.querySelectorAll('[data-event]')).forEach(assignEventToWidget)
    return dom
}

function getRefsTo(target) {
    return function(doc) {
        var info = doc.getAttribute('data-info')
        target[info] = doc
    }
}

function assignEventTo(widget) {
    return function(doc) {
        var events = doc.getAttribute('data-event').split('|')
        for (let i = 0; i < events.length; ++i) {
            let event = events[i]
            let eventName
            let action
            event.split(':').forEach((token, index) => {
                if (index === 0)
                    eventName = token
                else if (index === 1)
                    action = token
            })
            if (!widget[action]) {
                logger.warn(`No such method:${action} in ${events}, check data-event and widget methods definition.`)
                return
            }
            doc.addEventListener(eventName, widget[action].bind(widget))
        }
    }
}

export function getDocumentRoot(name, fragment) {
    return fragment.querySelector(name)
}
