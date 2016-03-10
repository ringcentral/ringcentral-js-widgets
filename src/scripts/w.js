import register from './component'

function fetchWidget(name) {
    // TODO: check cache
    return fetchTemplate(w.options.path + name + '.html')
        .then(clone => {
            // FIXME: buggy
            var template = clone.querySelector('*');
            var script = clone.querySelector('script');
            template = parseDocument(template);
            console.log(template);
            if (!w.templates[name])
                w.templates[name] = {};
            w.templates[name].template = template;
            document.body.appendChild(script);
        })
}

function fetchTemplate(src) {
    var fetchPromise = fetch(src)
        .then(response => response.text())
        .then(body => {
            var template = document.createElement('template');
            template.innerHTML = body;
            var clone = document.importNode(template.content, true);
            return clone;
        })
        .catch(err => console.error(err.stack))
    return fetchPromise;
};

function parseDocument(template) {
    var docs = template.querySelectorAll('*');
    Array.from(docs).forEach(doc => {
        if (doc.tagName.indexOf('-') > -1 /* WebComponent spec */ || doc instanceof HTMLUnknownElement) {
            // custom element
            // TODO: may have race condition in nested promise
            w(doc.localName).then(widget => {
                // TODO: may 'customize' custom elements
                widget.render(doc);
            })

        }
    })
    return template;
}

function w(name, options) {
    options = options || {};
    var fetch;
    if (w.templates.hasOwnProperty(name)) {
        fetch = Promise.resolve(); // already registered
    } else {
        w.templates[name] = {}; // set a placeholder, means we are fetching, for cache
        fetch = fetchWidget(name);
    }
    return fetch.then(() => {
        return new w.templates[name].widget({
            template: w.templates[name].template,
            actions: options.actions || {},
            handlers: options.handlers || {}
        })
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
w.custom = function() {}
export default w;
