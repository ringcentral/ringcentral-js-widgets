import {initLogger, isThenable, isFunction, toFunction, shallowCopy, assign} from './util/index'
var logger
var functionSet = {
    before: function() {},
    method: function() {},
    after: function() {},
    error: function(e) {
        logger.error(e)
        throw e
    }
}
function register({actions, data} = settings) {
    if (!actions)
        console.warn('Widgets do not have actions defined, maybe you get some typo.');
    ['init', 'render', 'remove', 'error'].forEach(action => {
        actions[action] = Object.assign(
            shallowCopy(functionSet),
            actions[action]
        )
    })
    return widget.bind(null, {actions, data})
}

function widget({actions, data = {}}, options) {
    if (!options.internal) {
        return Error('You are trying to construct a widget manually, please use w()')
    }
    var defaultActions = shallowCopy(actions)
    this.props = {}
    this.custom = {}
    this.data = Object.assign(data, options.data)
    logger = initLogger(options.logLevel)

    Object.keys(defaultActions).forEach(index => {
        defaultActions[index] = bindScope(this, defaultActions[index])
    })
    Object.keys(options.actions).forEach(index => {
        options.actions[index] = bindScope(this, options.actions[index])
    })
    Object.keys(defaultActions).forEach(index => {
        this[index] =
            generateActions(defaultActions[index], options.actions[index], index)
    })
    this.props.dom = generateDocument(this, options.template)
    this.props.root = getDocumentRoot(options.template)
    this.props.template = options.template
    this.render =
        generateActions({
            before: defaultActions.render.before,
            method: render.bind(this, defaultActions.render.method, this.props.template),
            after: defaultActions.render.after
        }, options.actions.render, 'render')
    this.remove =
        generateActions({
            before: defaultActions.remove.before,
            method: remove.bind(this, defaultActions.remove.method),
            after: defaultActions.remove.after
        }, options.actions.remove, 'remove')
    this.init()

    function remove(widgetRemove) {
        while (this.props.target.firstChild)
            this.props.target.removeChild(this.props.target.firstChild)
    }

    function render(widgetRender, template, finish, target, callback) {
        if (typeof target === 'string') {
            target = document.querySelector(target)
        } else if (target instanceof HTMLElement) {
            target = target
        } else {
            logger.warn('first argument of render method should be selector string or dom')
        }
        target.appendChild(template)
        this.props.target = target
        callback && isFunction(callback) && callback()
        if (widgetRender && isFunction(widgetRender))
            return widgetRender.call(this, finish)
    }
}

function bindScope(scope, action) {
    return {
        before: toFunction(action.before).bind(scope),
        method: toFunction(action.method).bind(scope),
        after: toFunction(action.after).bind(scope),
        error: toFunction(action.error, logger.error).bind(scope),
    }
}

function generateDocument(widget, template) {
    var dom = {}
    Array.from(template.querySelectorAll('[data-info]')).forEach(doc => {
        var info = doc.getAttribute('data-info')
        dom[info] = doc
    })
    Array.from(template.querySelectorAll('[data-event]')).forEach(doc => {
        var events = doc.getAttribute('data-event')
        events.split('|').forEach(event => {
            var eventName
            var action
            event.split(':').forEach((token, index) => {
                if (index === 0)
                    eventName = token
                else if (index === 1)
                    action = token
            })
            if (!widget[action]) {
                logger.warn(`No such method:${action} in ${events}, check data-event and widget methods definition.`)
                return
            }
            doc.addEventListener(eventName, widget[action].bind(widget))
        })
    })
    return dom
}

function getDocumentRoot(template) {
    // Assume the template only have one root
    return template.querySelector('*')
}

function generateActions(widgetAction, userAction = shallowCopy(functionSet), name) {
    return function(...args) {
        var before = function(...args) {
            logger.info(`[${name}][before](${[].concat(...args)})`)
            return wrapUserEvent(widgetAction.before, userAction.before, ...args)
        }
        var method = function(arg) {
            logger.info(`[${name}][before](${isFunction(arg) ? arg() : arg})`)
            if (isFunction(arg))
                return widgetAction.method(userAction.method, ...arg()) || arg
            return widgetAction.method(userAction.method, arg) || arg
        }
        var after = function(arg) {
            logger.info(`[${name}][after](${isFunction(arg) ? arg() : arg})`)
            if (isFunction(arg))
                return wrapUserEvent(widgetAction.after, userAction.after, ...arg()) || arg
            return wrapUserEvent(widgetAction.after, userAction.after, arg) || arg
        }
        var error = function(e) {
            return wrapUserEvent(widgetAction.error, userAction.error, e)
        }
        var finish = function(arg) {
            if (isFunction(arg))
                // flatten one level
                return Array.isArray(arg()[0]) ? [].concat.apply([], arg()) : arg()[0]
            return arg
        }
        try {
            return nextAction(before(...args), [before, method, after, finish], error)
        } catch (e) {
            error(e)
        }
    }
}

function wrapUserEvent(widget, user, ...args) {
    var continueDefault = (user != null && user(...args))
    if (continueDefault || typeof continueDefault === 'undefined')
        return widget(...args) || (() => args)
    return [].concat(...args)
}

function nextAction(result, actions, error, start = 0) {
    if (start + 1 === actions.length)
        return result
    if (isThenable(result)) {
        return actions.reduce((res, action, index) => {
            if (index > start)
                return res.then(action)
            return res
        }, result).catch(error)
    } else {
        return nextAction(actions[start + 1](result), actions, error, start + 1)
    }
}

export { register }
