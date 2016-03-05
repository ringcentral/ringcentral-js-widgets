var Component = function(options) {
    if (!options.template) {
        throw new Error('need a template');
    }
    // TODO: use Object.extend or somewhat (es6) for default options setting
    this.options = options || {};
    this.props = {};
    this.fetchPromise = null;
    this.beforeUpdate('mount');
    this.fetchTemplate(options.template)
        .then(template => this.bindDOM(template))
        .then(template => this.afterUpdate('mount'))
        .catch(err => console.error(err.stack))
};
Component.prototype.fetchTemplate = function(src) {
    this.fetchPromise = fetch(src)
        .then(response => response.text())
        .then(body => {
            var template = document.createElement('template');
            template.innerHTML = body;
            var clone = document.importNode(template.content, true);
            return clone;
        })
        .catch(err => console.error(err.stack))
    return this.fetchPromise;
};
Component.prototype.bindDOM = function(template) {
    this.props.dom = {};
    [].forEach.call(template.querySelectorAll('[data-info]'), doc => {
        var info = doc.getAttribute('data-info');
        this.props.dom[info] = doc;
    });
    [].forEach.call(template.querySelectorAll('[data-event]'), doc => {
        var events = doc.getAttribute('data-event');
        // TODO: proper error messages
        events.split('|').forEach(event => {
            var eventName;
            var action;
            event.split(':').forEach((token, index) => {
                if (index === 0)
                    eventName = token;
                else if (index === 1)
                    action = token;
            })
            if (!this[action]) {
                console.warn('No such method:' + action + ' in ' + events + ', check data-event and widget methods definition');
                return;
            }
            doc.addEventListener(eventName, this[action].bind(this));
        })
    })
    return template;
}
Component.prototype.beforeUpdate = function(action) {
    if (this.options.beforeUpdate)
        return this.options.beforeUpdate.call(this, action, this.props);
    return true;
};
Component.prototype.afterUpdate = function(action) {
    if (this.options.afterUpdate)
        return this.options.afterUpdate.call(this, action, this.props);
    return true;
};
Component.prototype.remove = function() {
    while (this.props.targetDOM.firstChild) {
        this.props.targetDOM.removeChild(this.props.targetDOM.firstChild);
    }
};
Component.prototype.render = function(target, callback) {
    if (this.fetchPromise)
        return this.fetchPromise
            .then(template => {
                if (typeof target === 'string') {
                    target = document.querySelector(target);
                } else if (target instanceof HTMLElement) {
                    target = target;
                } else {
                    console.warn('first argument of render method should be selector string or dom');
                }
                this.props.targetDOM = target;
                this.props.targetDOM.appendChild(template);
            })
            .then(() => {
                if (callback && typeof callback === 'function')
                    callback.call(this);
            })
            .catch(err => console.error('render err:' + err));
};

function register(settings) {
    var beforeUpdate = settings.beforeUpdate;
    var afterUpdate = settings.afterUpdate;
    var methods = settings.methods;

    var Widget = function(options) {
        Component.call(this, options);
        // bind methods
        if (methods) {
            Object.keys(methods).forEach(index => {
                var method = methods[index];
                var action = options.actions[index];
                var handler = options.handlers[index];
                // Method which has same name in options.actions will be treated as a UI->Helper method
                // Other method will be treated as handlers(Helper->UI)
                if (options.actions && action) {
                    var actionWrapper = function(...args) {
                        this.beforeUpdate(index);
                        Promise.resolve(method.call(this, action.bind(this), ...args))
                            .then(() => this.afterUpdate(index))
                            .catch(err => console.error(err.stack));
                    }.bind(this)
                    Widget.prototype[index] = actionWrapper;
                } else if (options.handlers && handler) {
                    var handlerWrapper = function(...args) {
                        this.beforeUpdate(index);
                        Promise.resolve(method.call(this, ...args))
                            .then(() => this.afterUpdate(index))
                            .catch(err => console.error(err.stack));
                    }.bind(this)
                    handler.call(this, handlerWrapper);
                }
            })
        }
        console.log(this);
    };
    Widget.prototype = Object.create(Component.prototype);
    Widget.prototype.constructor = Widget;
    Widget.prototype.beforeUpdate = function(action, props) {
        var defaultAction = Component.prototype.beforeUpdate.call(this, action, props);
        if (typeof defaultAction !== 'undefined' && !defaultAction)
            return;
        if (!settings.beforeUpdate)
            return;
        return settings.beforeUpdate.call(this, action, props);
    };
    Widget.prototype.afterUpdate = function(action, props) {
        var defaultAction = Component.prototype.afterUpdate.call(this, action, props);
        if (typeof defaultAction !== 'undefined' && !defaultAction)
            return;
        if (!settings.afterUpdate)
            return;
        return settings.afterUpdate.call(this, action, props);
    };
    return Widget;
}
export {
    Component,
    register
};
