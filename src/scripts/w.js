import register from './component'

function fetchWidget(name) {
    return fetch(w.options.path + name + '.html')
        .then(response => response.text())
        .then(body => {
            var template = document.createElement('template');
            template.innerHTML = body;
            var clone = document.importNode(template.content, true);
            return clone;
        })
}

function parseDocument(template) {
    var docs = template.querySelectorAll('*');
    return Promise.all(Array.from(docs).reduce(
        (result, doc) => {
            if (doc.localName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement)
                return result.concat(preload([doc.localName]));
            return result;
        }, []));
}

function initNestedWidget(widget) {
    var template = widget.props.template;
    var docs = template.querySelectorAll('*');
    Array.from(docs).forEach(doc => {
        if (doc.localName.indexOf('-') > -1 || doc instanceof HTMLUnknownElement) {
            if (typeof doc.getAttribute('dynamic') !== 'undefine') {
                return;
            }
            var child = w(doc.localName, widget.custom[doc.localName]);
            child.render(doc);
            // FIXME: When multiple child element, has problems
            widget.props[doc.localName] = child;
        }
    })
}

function w(name, options) {
    options = options || {};
    var baseWidget;
    if (!w.templates[name] || !w.templates[name].widget) {
        throw Error('you need to preload widget:' + name + ' before init it');
    }
    baseWidget = new w.templates[name].widget({
        template: w.templates[name].template.cloneNode(true),
        actions: options.actions || {},
        handlers: options.handlers || {},
    })
    initNestedWidget(baseWidget);
    // initWidget(baseWidget).forEach(child => {
    //     baseWidget.props[child.name] = child.widget;
    // });
    return baseWidget;
}
w.templates = {};
w.options = {
    path: '/template/',
    preload: [],
}
w.register = function(constructor) {
    var settings = new constructor();
    Object.keys(w.templates).forEach(index => {
        var template = w.templates[index];
        if (template.template && !template.widget)
            template.widget = register(settings);
    })
};
w.config = function(options, callback) {
    w.options = Object.assign(w.options, options);
    preload(w.options.preload, callback);
};

function preload(widgets, callback) {
    return Promise.all(
        widgets.reduce(
            (result, name) => {
                if (!w.templates[name]) {
                    w.templates[name] = {};
                }
                if (!w.templates[name].fetch) {
                    w.templates[name].fetch = fetchWidget(name);
                }
                return result.concat(
                    w.templates[name].fetch
                    .then(template => {
                        if (!w.templates[name].template) {
                            w.templates[name].template = template;
                            // FIXME: script position
                            var script = template.querySelector('script');
                            document.body.appendChild(script);
                            return template;
                        }
                    })
                    .then(parseDocument)
                    .catch(err => console.error(err)))
            }, [])
    ).then(callback)
}

// setting custom elements when registering widgets
w.customize = function(context, target, options) {
    context.custom[target] = options;
}

export default w;
