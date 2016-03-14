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
    ['init', 'render', 'remove'].forEach(action => {
        globalSettings.actions[action] = Object.assign({
            before: function() {},
            method: function() {},
            after: function() {}
        }, globalSettings.actions[action])
    })


    var Widget = function(options) {
        console.warn(options.actions);
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
        this.custom = {};
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
            this[index] =
                generateActions(settings.actions[index], options.actions[index], index /* for debug */ );
        })
        this.props.dom = generateDocument(this, options.template);
        this.props.template = options.template;
        this.render =
            generateActions({
                before: settings.actions.render.before,
                method: render.bind(this, settings.actions.render.method, this.props.template),
                after: settings.actions.render.after
            }, options.actions.render, 'render');
        this.remove =
            generateActions({
                before: settings.actions.remove.before,
                method: remove.bind(this, settings.actions.remove.method),
                after: settings.actions.remove.after
            }, options.actions.remove, 'remove');

        function remove(widgetRemove) {
            while (this.props.target.firstChild)
                this.props.target.removeChild(this.props.target.firstChild)
        }

        function render(widgetRender, template, finish, target, callback) {
            if (typeof target === 'string') {
                target = document.querySelector(target);
            } else if (target instanceof HTMLElement) {
                target = target;
            } else {
                console.warn('first argument of render method should be selector string or dom');
            }
            target.appendChild(template);
            this.props.target = target;
            callback && typeof callback === 'function' && callback();
            if (widgetRender && typeof widgetRender === 'function')
                return widgetRender.call(this, finish);
        }
        this.init();
        Object.keys(settings.handlers).forEach(index => {
            if (options.handlers[index]) {
                options.handlers[index].method.call(
                    this,
                    generateHandlers(settings.handlers[index], index)
                );
            }
        })
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
        var before = function(...args) {
            console.info('[%s][before](' + [].concat(...args) + ')', name);
            return wrapUserEvent(widgetAction.before, userAction.before, ...args);
        }
        var method = function(arg) {
            console.info('[%s][method](' + (typeof arg === 'function' ? arg() : arg) + ')', name);
            if (typeof arg === 'function') {
                return widgetAction.method(userAction.method, ...arg()) || arg;
            }
            return widgetAction.method(userAction.method, arg) || arg;
        };
        var after = function(arg) {
            console.info('[%s][after](' + (typeof arg === 'function' ? arg() : arg) + ')', name);
            if (typeof arg === 'function') {
                return wrapUserEvent(widgetAction.after, userAction.after, ...arg()) || arg;
            }
            return wrapUserEvent(widgetAction.after, userAction.after, arg) || arg;
        }
        var finish = function(arg) {
            if (typeof arg === 'function') {
                // flatten one level
                return [].concat.apply([], arg());
            }
            return arg;
        }
        before = before(...args);
        if (isThennable(before)) {
            return before.then(function(...args) {
                return method(arg);
            }).then(function(arg) {
                return after(arg);
            }).then(function(arg) {
                return finish(arg);
            })
        } else {
            method = method(before);
            if (isThennable(method)) {
                return method.then(function(arg) {
                    return after(arg);
                }).then(function(arg) {
                    return finish(arg);
                })
            } else {
                after = after(method);
                if (isThennable(after)) {
                    return after.then(function(arg) {
                        return finish(arg);
                    })
                } else {
                    return finish(after);
                }
            }
        }



        // return Promise.resolve(wrapUserEvent(widgetAction.before, userAction.before, ...args))
        //     .then(function(arg) {
        //         console.info('[%s][method](' + (typeof arg === 'function' ? arg() : arg) + ')', name);
        //         if (typeof arg === 'function') {
        //             return widgetAction.method(userAction.method, ...arg()) || arg;
        //         }
        //         return widgetAction.method(userAction.method, arg) || arg;
        //     })
        //     .then(function(arg) {
        //         console.info('[%s][after](' + (typeof arg === 'function' ? arg() : arg) + ')', name);
        //         if (typeof arg === 'function') {
        //             return wrapUserEvent(widgetAction.after, userAction.after, ...arg()) || arg;
        //         }
        //         return wrapUserEvent(widgetAction.after, userAction.after, arg) || arg;
        //     })
        //     .then(function(arg) {
        //         if (typeof arg === 'function') {
        //             // flatten one level
        //             return [].concat.apply([], arg());
        //         }
        //         return arg;
        //     })
        //     .catch(err => console.error(err.stack));
    }
}

function generateHandlers(widgetHandler, name) {
    return function(...args) {
        console.info('[%s][before](' + [].concat(...args) + ')', name);
        return Promise.resolve(wrapUserEvent(widgetHandler.before, widgetHandler.before, ...args))
            .then(function(arg) {
                console.info('[%s][method](' + (typeof arg === 'function' ? arg() : arg) + ')', name);
                if (typeof arg === 'function') {
                    return widgetHandler.method(...arg()) || arg;
                }
                return widgetAction.method(arg) || arg;
            })
            .then(function(arg) {
                console.info('[%s][after](' + (typeof arg === 'function' ? arg() : arg) + ')', name);
                if (typeof arg === 'function') {
                    return widgetHandler.after(...arg()) || arg;
                }
                return widgetHandler.after(arg) || arg;
            })
            .then(function(arg) {
                if (typeof arg === 'function') {
                    // flatten one level
                    return [].concat.apply([], arg());
                }
                return arg;
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

function isThennable(result) {
    if (result.then && typeof result.then === 'function')
        return true;
    return false;
}

export default register;
