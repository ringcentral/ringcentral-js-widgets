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

function parseDocument(baseWidget) {
    var template = baseWidget.props.template;
    var custom = baseWidget.custom;
    var docs = template.querySelectorAll('*');
    var nestedFetch = Array.from(docs).reduce((aggr, doc) => {
        if (doc.tagName.indexOf('-') > -1 /* WebComponent spec */ || doc instanceof HTMLUnknownElement) {
            // custom element
            aggr.push(w(doc.localName, custom[doc.localName]).then(widget => {
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
    return w.templates[name].fetch
        .then((template) => {
            
            if(!w.templates[name].template){
                w.templates[name].template = template;
                // FIXME: script position
                var script = template.querySelector('script');
                document.body.appendChild(script);                
            }
            
            baseWidget = new w.templates[name].widget({
                template: w.templates[name].template.cloneNode(true),
                actions: options.actions || {},
                handlers: options.handlers || {},
            })
            return baseWidget;
        })
        .then(baseWidget => {
            return parseDocument(baseWidget);
        })
        .then(children => {
            children.forEach(child => {
                baseWidget.props[child.name] = child.widget;
            });
            return baseWidget;
        })
}
w.templates = {};
w.options = {
    path: '/template/'
}
w.register = function(constructor) {
    var settings = new constructor();
    Object.keys(w.templates).forEach(index => {
        var template = w.templates[index];
        if (template.template && !template.widget)
            template.widget = register(settings);
    })
};
w.config = function(options) {
    w.options = Object.assign(w.options, options);
};
w.preload = function() {}

// setting custom elements when registering widgets
w.customize = function(context, target, options) {
    context.custom[target] = options;
}

export default w;
