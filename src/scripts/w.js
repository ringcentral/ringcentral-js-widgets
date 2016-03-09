function fetchWidget(name) {
    return fetchTemplate('template/' + name + '.html')
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
w.register = function() {};
w.config = function() {};
