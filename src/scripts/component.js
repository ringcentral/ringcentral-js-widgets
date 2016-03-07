import fetch from 'isomorphic-fetch';

function register(settings) {
    /*
     *
     * [register process]
     *
     * generate actions _____
     *                       |------> generate document ------> generate handlers
     * fetch template   _____|                          ------> maybe render
     *
     */
    var Widget = function(options) {
        this.options = options || {};
        if (!options.template) {
            throw new Error('need a template');
        }
        this.props = {};
        this.fetchPromise =
            Promise.all([
                fetchTemplate(options.template),
                (() => {
                    Object.keys(settings.actions).forEach(index => {
                        Widget.prototype[index] =
                            generateActions(settings.actions[index], options.actions[index]);
                    })
                    Widget.prototype.render =
                        generateActions({
                            before: target => target,
                            method: render.bind(this),
                            after: () => {}
                        }, options.actions.render)

                    function render(finish, target, callback) {
                        if (this.fetchPromise)
                            return this.fetchPromise
                                .then(() => {
                                    if (typeof target === 'string') {
                                        target = document.querySelector(target);
                                    } else if (target instanceof HTMLElement) {
                                        target = target;
                                    } else {
                                        console.warn('first argument of render method should be selector string or dom');
                                    }
                                    this.props.targetDOM = target;
                                    this.props.targetDOM.appendChild(this.props.template);
                                })
                                .then(() => {
                                    if (callback && typeof callback === 'function')
                                        callback.call(this);
                                })
                                .then(finish)
                                .catch(err => console.error('render err:' + err));
                    }
                })()
            ])
            .then(args => generateDocument(this, args[0] /* template:DocumentFragment */ ))
            .then(args => {
                this.props.dom = args.dom;
                this.props.template = args.template;
            })
            .catch(err => console.error(err.stack))
        this.fetchPromise
            .then(() => {
                var handlers = settings.handlers;
                if (handlers) {
                    Object.keys(handlers).forEach(index => {
                        options.handlers[index].method.call(
                            this,
                            generateHandlers(settings.handlers[index])
                        );
                    })
                }
            })
            .catch(err => console.error(err.stack))
    };
    Widget.prototype.remove = function() {
        while (this.props.targetDOM.firstChild) {
            this.props.targetDOM.removeChild(this.props.targetDOM.firstChild);
        }
    };
    return Widget;
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
    return {
        template: template,
        dom: dom
    };
}

function generateActions(widgetAction, userAction) {
    if (!userAction) {
        userAction = {
            before: function() {},
            method: function() {},
            after: function() {}
        };
        console.warn('widget has some actions not defined');
    }
    if (!userAction.method) {
        userAction.method = function() {};
        console.warn('widget has some actions not defined');
    }
    return function(...args) {
        return Promise.resolve(wrapUserEvent(widgetAction.before, userAction.before, ...args))
            .then((...result) => widgetAction.method.call(this, userAction.method.bind(this), ...result))
            .then((...result) => wrapUserEvent(widgetAction.after, userAction.after, ...result))
            .catch(err => console.error(err.stack));
    }.bind(this)
}

function generateHandlers(widgetHandler) {
    return function(...args) {
        return Promise.resolve(wrapUserEvent(widgetHandler.before, widgetHandler.before, ...result))
            .then((...result) => widgetHandler.method.call(this, ...args))
            .then((...result) => wrapUserEvent(widgetHandler.after, widgetHandler.after, ...result))
            .catch(err => console.error(err.stack));
    }.bind(this)
}

function wrapUserEvent(widget, user, ...args) {
    var continueDefault = !user || user() || true;
    if (continueDefault ||
        typeof continueDefault === 'undefined' ||
        continueDefault) {
        return widget ? widget(...args) : null;
    }
    return null;
}

export default register;
