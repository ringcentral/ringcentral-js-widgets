import { register as registerComponent } from './component'
import { getServices } from './service'
import { getActions } from './action'
import { transitionIn, transitionOut, transitionInit, transitionToggle } from './transition'
import { ensureTail } from './util/index'
import { loadLocale, translate } from './translation'
import { insert } from './insertion'
// function fetchWidget(file) {
//     return fetch(w.options.path + ensureTail(file, '.html'))
//         .then(response => response.text())
//         .then(body => {
//             var template = document.createElement('template')
//             template.innerHTML = body
//             var clone = document.importNode(template.content, true)
//             return clone
//         })
// }

// function parseDocument(template) {
//     return Promise.all(Array.from(template.querySelectorAll('*'))
//         .filter(doc => doc.tagName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement)
//         .reduce((result, doc) => {
//             return result.concat(preload({
//                 [doc.tagName.toLowerCase()]: doc.tagName.toLowerCase()
//             }))
//         }, []))
// }

function initNestedWidget(widget, template) {
    if (template.__flat) return widget
    // TODO: perf hit
    var docs = widget.root.querySelectorAll('*')
    var customElements = Array.from(docs)
        .filter(doc => doc.tagName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement)
    if (customElements.length === 0) template.__flat = true
    customElements
        .forEach(doc => {
            // FIXME: dynamic is not needed
            if (typeof doc.getAttribute('dynamic') !== 'undefine' && doc.getAttribute('dynamic') !== null) {
                return
            }
            var name = doc.tagName.toLowerCase()
            var child = w(name, widget.custom[name])
            // child.mount(doc)
            widget.children.push({
                target: doc,
                widget: child
            })
            widget.refs[name] = child
            var childName = doc.getAttribute('data-info')
            if (childName)
                widget.refs[name] = child
        })
    return widget
}

// function preload(widgets, callback) {
//     return Promise.all(
//         Object.keys(widgets).reduce(
//             (result, name) => {
//                 if (!w.templates[name])
//                     w.templates[name] = {}
//                 if (!w.templates[name].fetch)
//                     w.templates[name].fetch = fetchWidget(widgets[name])
//                 return result.concat(
//                     w.templates[name].fetch
//                     .then(template => {
//                         if (!w.templates[name].template) {
//                             w.templates[name].template = template
//                             var scripts = template.querySelectorAll('script')
//                             var style = template.querySelector('style')
//                             Array.from(scripts).forEach(script => {
//                                 if (script.src && script.src.indexOf('http') !== 0)
//                                     script.src = w.options.path + script.getAttribute('src')
//                                 document.body.appendChild(script)
//                                 document.body.removeChild(script)
//                             })
//                             if (style)
//                                 document.head.appendChild(style)
//                         }
//                         return template
//                     })
//                     .then(parseDocument)
//                     .catch(err => console.error('Widgets preload error:' + err)))
//             }, [])
//     ).then(callback)
// }

// Public API
// function w(name, options = {}) {
//     if (!w.templates[name] || !w.templates[name].widget)
//         throw Error('you need to preload widget:' + name + ' before init it')
//     return initNestedWidget(new w.templates[name].widget({
//         template: w.templates[name].template.cloneNode(true),
//         actions: options.actions || {},
//         data: options.data || {},
//         logLevel: w.options.logLevel,
//         internal: true // for check it's called by internal
//     }))
// }

const WIDGETS = __w_widgets
function w(name, options = {}) {
    var widgetInfo = WIDGETS[name]
    // template
    // var template = document.createElement('template')
    // template.innerHTML = widget.template
    // var clone = document.importNode(template.content, true)
    w.templates[name] = w.templates[name] || {
        __flat: false
    }
    w.templates[name].template = widgetInfo.template

    // widget.imports.scripts.forEach(src => {
    //     var script = document.createElement('script')
    //     script.src = src
    //     document.body.appendChild(script)
    // })

    //  widget.imports.scripts.forEach(src => {
    //     var style = document.createElement('style')
    //     style.src = src
    //     document.head.appendChild(style)
    // })

    // // script
    // if (widget.script) {
    //     console.log(widget.script)
    //     var script = document.createElement('script')
    //     script.text = widget.script
    //     document.body.appendChild(script)
    //     document.body.removeChild(script)
    // }
    
    // // style
    // if (widget.style) {
    //     var style = document.createElement('style')
    //     style.innerHTML = widget.style
    //     document.head.appendChild(style)
    // }
    insert(name, widgetInfo)
    return initNestedWidget(new w.templates[name].widget({
        is: name,
        template: w.templates[name].template,
        actions: options.actions || {},
        data: options.data || {},
        props: options.props || {},
        logLevel: w.options.logLevel,
        internal: true // for check it's called by internal
    }), w.templates[name])
}


w.templates = {}
w.options = {}
w.register = function(settings) {
    var settings = new settings()
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
    w.options.locale = options.locale || {}
    Promise.all([
        preload(w.options.preload),
        Object.keys(w.options.locale).forEach(index => {
            var locale = w.options.locale[index]
            loadLocale(index, locale)
        })
    ]).then(callback)
}
w.customize = function(context, target, options) {
    // inherit parent's data
    options.data = Object.assign(context.data , options.data)
    context.custom[target] = options
}
w.service = getServices
w.action = function(name) {
    return Object.assign({}, getActions()[name])
}
w.transition = function(effect) {
    return {
        init: (target, options) => transitionInit(effect, target, options),
        in: (target, options) => transitionIn(effect, target, options),
        out: (target, options) => transitionOut(effect, target, options),
        toggle: (target, options) => transitionToggle(effect, target, options)
    }
}
w.locale = loadLocale
w.translate = translate
w.t = translate
export default w
