function register(globalSettings) {
    /*
     *
     * [register process]
     *
     * generate actions _____
     *                       |----> generate document --> [before, init, after] ----> generate handlers
     * fetch template   _____|                                                  ----> maybe [before, render, after]
     *
     */
    globalSettings = Object.assign({
        actions: {},
        handlers: {}
    }, globalSettings);

    var Widget = function(options) {
        var options = Object.assign({
            actions: {},
            handlers: {}
        }, options);
        var settings = {
            // For deep copy
            actions: Object.assign({}, globalSettings.actions),
            handlers: Object.assign({}, globalSettings.handlers)
        }
        if (!options.template) {
            throw new Error('need a template');
        }
        this.props = {};
        Object.keys(settings.actions).forEach(index => {
            settings.actions[index] = bindScope(this, settings.actions[index]);
        })
        Object.keys(settings.handlers).forEach(index => {
            settings.handlers[index] = bindScope(this, settings.handlers[index]);
        })
        Object.keys(options.actions).forEach(index => {
            options.actions[index] = bindScope(this, options.actions[index]);
        })
        Object.keys(options.handlers).forEach(index => {
            options.handlers[index] = bindScope(this, options.handlers[index]);
        })
        Object.keys(settings.actions).forEach(index => {
            console.info(this[index]);
            this[index] =
                generateActions(settings.actions[index], options.actions[index], index /* for debug */ );
        })
        this.render =
            generateActions({
                before: settings.actions.render.before,
                method: render.bind(this, settings.actions.render.method),
                after: settings.actions.render.after
            }, options.actions.render, 'render')

        function render(widgetRender, finish, target, callback) {
            if (typeof target === 'string') {
                target = document.querySelector(target);
            } else if (target instanceof HTMLElement) {
                target = target;
            } else {
                console.warn('first argument of render method should be selector string or dom');
            }
            target.appendChild(this.props.template);
            callback && typeof callback === 'function' && callback();
            if (widgetRender && typeof widgetRender === 'function')
                return widgetRender.call(this, finish);
        }
        this.props.dom = generateDocument(this, options.template);
        this.props.template = options.template;
        // init
        this.init();
        var handlers = settings.handlers;
        if (handlers) {
            Object.keys(handlers).forEach(index => {
                options.handlers[index].method.call(
                    this,
                    generateHandlers(settings.handlers[index])
                );
            })
        }
    };
    return Widget;
}

function bindScope(scope, action) {
    return {
        before: action.before ? action.before.bind(scope) : function() {}.bind(scope),
        method: action.method ? action.method.bind(scope) : function() {}.bind(scope),
        after: action.after ? action.after.bind(scope) : function() {}.bind(scope)
    }
}

function generateDocument(widget, template) {
    var dom = {};
    [].forEach.call(template.querySelectorAll('[data-info]'), doc => {
        var info = doc.getAttribute('data-info');
        dom[info] = doc;
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
            if (!widget[action]) {
                console.warn('No such method:' + action + ' in ' + events + ', check data-event and widget methods definition');
                return;
            }
            doc.addEventListener(eventName, widget[action].bind(widget));
        })
    })
    return dom;
}

function generateActions(widgetAction, userAction, name) {
    if (!userAction) {
        userAction = {
            before: function() {},
            method: function() {},
            after: function() {}
        };
        console.warn('Widget action [%s] is not defined by users', name);
    }
    return function(...args) {
        console.log('[%s][before](' + [].concat(...args) + ')', name);
        return Promise.resolve(wrapUserEvent(widgetAction.before, userAction.before, ...args))
            .then(function(arg) {
                console.log('[%s][method](' + (typeof arg === 'function' ? arg() : arg) + ')', name);
                if (typeof arg === 'function') {
                    return widgetAction.method(userAction.method, ...arg()) || arg;
                }
                return widgetAction.method(userAction.method, arg) || arg;
            })
            .then(function(arg) {
                console.log('[%s][after](' + (typeof arg === 'function' ? arg() : arg) + ')', name);
                if (typeof arg === 'function') {
                    return wrapUserEvent(widgetAction.after, userAction.after, ...arg()) || arg;
                }
                return wrapUserEvent(widgetAction.after, userAction.after, arg) || arg;
            })
            .catch(err => console.error(err.stack));
    }
}

function generateHandlers(widgetHandler) {
    return function(...args) {
        return Promise.resolve(wrapUserEvent(widgetHandler.before, widgetHandler.before, ...args))
            .then(function(...args) {
                var flatArgs = [].concat(...args);
                return widgetAction.method(...flatArgs) || flatArgs;
            })
            .then(function(...args) {
                var flatArgs = [].concat(...args);
                return widgetHandler.after(...flatArgs) || flatArgs;
            })
            .catch(err => console.error(err.stack));
    }
}

function wrapUserEvent(widget, user, ...args) {
    var continueDefault = !user || user() || true;
    if (continueDefault ||
        typeof continueDefault === 'undefined' ||
        continueDefault) {
        if (widget) {
            return widget(...args) || (() => args);
        }
        return null;
    }
    return [].concat(...args);
}

export default register;
