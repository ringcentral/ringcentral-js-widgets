function register(globalSettings) {
    if (!globalSettings.actions)
        console.warn('Widgets do not have actions defined, maybe you get some typo.');

    ['init', 'render', 'remove', 'error'].forEach(action => {
        globalSettings.actions[action] = Object.assign({
            before: function() {},
            method: function() {},
            after: function() {},
            error: function(e) {
                console.error(e);
                throw e;
            }
        }, globalSettings.actions[action]);
    });
    return widget.bind(null, globalSettings);
}

function widget(globalSettings, options) {
    if (!options.internal) {
        return Error('You are trying to construct a widget manually, please use w()');
    }
    var options = Object.assign({
        actions: {}
    }, options);
    var settings = {
        // For deep copy
        actions: Object.assign({}, globalSettings.actions),
    };
    this.props = {};
    this.custom = {};
    logger = initLogger(options.logLevel);

    Object.keys(settings.actions).forEach(index => {
        settings.actions[index] = bindScope(this, settings.actions[index]);
    });
    Object.keys(options.actions).forEach(index => {
        options.actions[index] = bindScope(this, options.actions[index]);
    });
    Object.keys(settings.actions).forEach(index => {
        this[index] =
            generateActions(settings.actions[index], options.actions[index], index);
    });
    this.props.dom = generateDocument(this, options.template);
    this.props.root = getDocumentRoot(options.template);
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
    this.init();

    function remove(widgetRemove) {
        while (this.props.target.firstChild)
            this.props.target.removeChild(this.props.target.firstChild);
    }

    function render(widgetRender, template, finish, target, callback) {
        if (typeof target === 'string') {
            target = document.querySelector(target);
        } else if (target instanceof HTMLElement) {
            target = target;
        } else {
            logger.warn('first argument of render method should be selector string or dom');
        }
        target.appendChild(template);
        this.props.target = target;
        callback && typeof callback === 'function' && callback();
        if (widgetRender && typeof widgetRender === 'function')
            return widgetRender.call(this, finish);
    }
}

function bindScope(scope, action) {
    return {
        before: action.before ? action.before.bind(scope) : function() {}.bind(scope),
        method: action.method ? action.method.bind(scope) : function() {}.bind(scope),
        after: action.after ? action.after.bind(scope) : function() {}.bind(scope),
        error: action.error ? action.error.bind(scope) : function(err) {
            logger.error(err);
        }.bind(scope)
    };
}

function generateDocument(widget, template) {
    var dom = {};
    Array.from(template.querySelectorAll('[data-info]')).forEach(doc => {
        var info = doc.getAttribute('data-info');
        dom[info] = doc;
    });
    Array.from(template.querySelectorAll('[data-event]')).forEach(doc => {
        var events = doc.getAttribute('data-event');
        events.split('|').forEach(event => {
            var eventName;
            var action;
            event.split(':').forEach((token, index) => {
                if (index === 0)
                    eventName = token;
                else if (index === 1)
                    action = token;
            });
            if (!widget[action]) {
                logger.warn('No such method:' + action + ' in ' + events + ', check data-event and widget methods definition');
                return;
            }
            doc.addEventListener(eventName, widget[action].bind(widget));
        });
    });
    return dom;
}

function getDocumentRoot(template) {
    // Assume the template only have one root
    return template.querySelector('*');
}

function generateActions(widgetAction, userAction, name) {
    if (!userAction) {
        userAction = {
            before: function() {},
            method: function() {},
            after: function() {},
            error: function(e) {
                logger.error(e);
                throw e;
            }
        };
        logger.warn('Widget action [%s] is not defined by users', name);
    }
    return function(...args) {
        var before = function(...args) {
            logger.info('[%s][before](' + [].concat(...args) + ')', name);
            return wrapUserEvent(widgetAction.before, userAction.before, ...args);
        };
        var method = function(arg) {
            logger.info('[%s][method](' + (typeof arg === 'function' ? arg() : arg) + ')', name);
            if (typeof arg === 'function') {
                return widgetAction.method(userAction.method, ...arg()) || arg;
            }
            return widgetAction.method(userAction.method, arg) || arg;
        };
        var after = function(arg) {
            logger.info('[%s][after](' + (typeof arg === 'function' ? arg() : arg) + ')', name);
            if (typeof arg === 'function') {
                return wrapUserEvent(widgetAction.after, userAction.after, ...arg()) || arg;
            }
            return wrapUserEvent(widgetAction.after, userAction.after, arg) || arg;
        };
        var error = function(e) {
            return wrapUserEvent(widgetAction.error, userAction.error, e);
        };
        var finish = function(arg) {
            if (typeof arg === 'function') {
                // flatten one level
                return Array.isArray(arg()[0])? [].concat.apply([], arg()) : arg()[0];
            }
            return arg;
        };
        try {
            return nextAction(before(...args), [before, method, after, finish], error, 0);
        } catch (e) {
            error(e);
        }
    };
}

function wrapUserEvent(widget, user, ...args) {
    var continueDefault = (user != null && user(...args));
    if (continueDefault || typeof continueDefault === 'undefined')
        return widget(...args) || (() => args);
    return [].concat(...args);
}

function isThenable(result) {
    if (result.then && typeof result.then === 'function')
        return true;
    return false;
}

function nextAction(result, actions, error, start) {
    if (start + 1 === actions.length)
        return result;
    if (isThenable(result)) {
        return actions.reduce((res, action, index) => {
            if (index > start)
                return res.then(action);
            return res;
        }, result).catch(error);
    } else {
        return nextAction(actions[start + 1](result), actions, error, start + 1);
    }
}

function initLogger(level) {
    return {
        error: function(...args) {
            console.error(...args);
        },
        warn: function(...args) {
            if (level > 0)
                console.warn(...args);
        },
        info: function(...args) {
            if (level > 1)
                console.info(...args);
        },
        log: function(...args) {
            if (level > 1)
                console.log(...args);
        }
    };
}
var logger;
export { register };
