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
        .then(clone => {
            return parseDocument(clone);
        })
        .then(template => {
            w.templates[name].template = template;
            // FIXME: script position and be inserted multiple times
            var script = template.querySelector('script');
            document.body.appendChild(script);
        })
}

function parseDocument(template) {
    var docs = template.querySelectorAll('*');
    var nestedFetch = Array.from(docs).reduce((aggr, doc) => {
        if (doc.tagName.indexOf('-') > -1 /* WebComponent spec */ || doc instanceof HTMLUnknownElement) {
            // custom element
            aggr.push(w(doc.localName).then(widget => {
                console.info(widget.options.fetch);
                // TODO: may 'customize' custom elements
                // var div = document.createElement('div');
                widget.render(doc)
                    .then(() => console.info(widget.props.template.cloneNode(true)))
                    .catch(err => console.error(err));
                // doc.parentNode.insertBefore(div, doc.nextSibling);
            }));

        }
        return aggr;
    }, [])
    return Promise.all(nestedFetch).then(() => template); // we don't care about nested template return value, but template
}

function w(name, options) {
    options = options || {};
    var fetch = false; //test
    if (!w.templates[name]) {
        w.templates[name] = {};
    }
    if (!w.templates[name].fetch) {
        w.templates[name].fetch = fetchWidget(name);
        fetch = true;
    }
    // w.templates[name].fetch = fetchWidget(name);
    return w.templates[name].fetch
        .then(() => {
            return new w.templates[name].widget({
                template: w.templates[name].template.cloneNode(true),
                actions: options.actions || {},
                handlers: options.handlers || {},
                fetch: fetch
            })
        })
        .catch(err => console.error(err));
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
