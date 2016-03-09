import register from './component'

function fetchWidget(name) {
    // TODO: check cache
    return fetchTemplate(w.options.path + name + '.html')
        .then(clone => {
            var template = clone.querySelector('*');
            var script = clone.querySelector('script');
            console.log(clone);
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

function w(name, options) {
    options = options || {};
    return fetchWidget(name).then(() => {
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

export default w;
