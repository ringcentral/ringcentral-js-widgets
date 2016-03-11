import register from './component'

function fetchWidget(name) {
    // TODO: check cache
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
    var nestedFetch = Array.from(docs).reduce((aggr, doc) => {
        if (doc.tagName.indexOf('-') > -1 /* WebComponent spec */ || doc instanceof HTMLUnknownElement) {
            // custom element
            aggr.push(w(doc.localName).then(widget => {
                // TODO: may 'customize' custom elements
                widget.render(doc);
                return {
                    name: doc.localName,
                    widget: widget
                };
            }));
        }
        return aggr;
    }, [])

    return Promise.all(nestedFetch);
}


function w(name, options) {
    options = options || {};
    var baseWidget;
    if (!w.templates[name]) {
        w.templates[name] = {};
    }
    if (!w.templates[name].fetch) {
        w.templates[name].fetch = fetchWidget(name);
    }
    // w.templates[name].fetch = fetchWidget(name);
    return w.templates[name].fetch
        .then((template) => {
            w.templates[name].template = template;
            // FIXME: script position
            var script = template.querySelector('script');
            document.body.appendChild(script);
            //
            baseWidget = new w.templates[name].widget({
                template: w.templates[name].template.cloneNode(true),
                actions: options.actions || {},
                handlers: options.handlers || {},
            })
            return baseWidget.props.template;
        })
        .then(clone => {
            return parseDocument(clone);
        })
        .then(children => {
            children.forEach(child => {
                console.log(baseWidget);
                baseWidget.props[child.name] = child.widget;
            });
            return baseWidget;
        })
}
w.templates = {};
w.options = {
    path: '/template/'
}
w.register = function(setting) {
    Object.keys(w.templates).forEach(index => {
        var template = w.templates[index];
        if (template.template && !template.widget)
            template.widget = register(setting);
    })
};
w.config = function(options) {
    w.options = Object.assign(w.options, options);
};
w.preload = function() {}

// setting custom elements when registering widgets
w.custom = function() {

}

export default w;
