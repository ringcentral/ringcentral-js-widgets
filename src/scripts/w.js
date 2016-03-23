import { register as registerComponent } from './component'
import { getServices } from './service'
import { getActions } from './action'
import { transitionIn, transitionOut, transitionInit, transitionToggle } from './transition'
import { ensureTail } from './util/index'

function fetchWidget(file) {
    return fetch(w.options.path + ensureTail(file, '.html'))
        .then(response => response.text())
        .then(body => {
            var template = document.createElement('template')
            template.innerHTML = body
            var clone = document.importNode(template.content, true)
            return clone
        })
}

function parseDocument(template) {
    return Promise.all(Array.from(template.querySelectorAll('*'))
        .filter(doc => doc.tagName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement)
        .reduce((result, doc) => {
            var temp = {}
            var name = doc.tagName.toLowerCase()
            temp[name] = name
            return result.concat(preload(temp))
        }, []))
}

function initNestedWidget(widget) {
    var template = widget.props.template
    var docs = template.querySelectorAll('*')
    Array.from(docs).forEach(doc => {
        if (doc.tagName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement) {
            if (typeof doc.getAttribute('dynamic') !== 'undefine' && doc.getAttribute('dynamic') !== null) {
                return
            }
            var name = doc.tagName.toLowerCase()
            var child = w(name, widget.custom[name])
            child.render(doc)
            var childName = doc.getAttribute('data-info');
            if (childName)
                widget.props[childName] = child
        }
    })
    return widget
}

function preload(widgets, callback) {
    return Promise.all(
        Object.keys(widgets).reduce(
            (result, name) => {
                if (!w.templates[name])
                    w.templates[name] = {}
                if (!w.templates[name].fetch)
                    w.templates[name].fetch = fetchWidget(widgets[name])
                return result.concat(
                    w.templates[name].fetch
                    .then(template => {
                        if (!w.templates[name].template) {
                            w.templates[name].template = template
                            var script = template.querySelector('script')
                            var style = template.querySelector('style')
                            if (script) {
                                document.body.appendChild(script)
                                document.body.removeChild(script)
                            }
                            if (style)
                                document.head.appendChild(style)
                        }
                        return template
                    })
                    .then(parseDocument)
                    .catch(err => console.error('Widgets preload error:' + err)))
            }, [])
    ).then(callback)
}

// Public API
function w(name, options = {}) {
    if (!w.templates[name] || !w.templates[name].widget)
        throw Error('you need to preload widget:' + name + ' before init it')
    return initNestedWidget(new w.templates[name].widget({
        template: w.templates[name].template.cloneNode(true),
        actions: options.actions || {},
        logLevel: w.options.logLevel,
        internal: true // for check it's called by internal
    }))
}
w.templates = {}
w.options = {}
w.register = function(options) {
    var settings = new options()
    Object.keys(w.templates).forEach(index => {
        var template = w.templates[index]
        if (template.template && !template.widget)
            template.widget = registerComponent(settings)
    })
}
w.config = function(options, callback) {
    w.options.preload = options.preload || {}
    w.options.path = options.path || ''
    w.options.logLevel = options.logLevel || 0
    preload(w.options.preload, callback)
}
w.customize = function(context, target, options) {
    context.custom[target] = options
}
w.service = getServices
w.action = function(name) {
    return Object.assign([], getActions()[name])
}
w.transition = function(effect) {
    return {
        init: target => transitionInit(effect,target),
        in: target => transitionIn(effect, target),
        out: target => transitionOut(effect, target),
        toggle: target => transitionToggle(effect, target)
    }
}

export default w
