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
    ['init', 'mount', 'unmount', 'destroy', 'error'].forEach(action => {
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
    var ctx = this
    options.actions = shallowCopy(options.actions)
    this.props = {}
    this.custom = {}
    this.children = []
    this.data = Object.assign(data, options.data)
    logger = initLogger(options.logLevel)
    Object.keys(options.actions).forEach(index => bindToTarget(options.actions, index))
    Object.keys(defaultActions).forEach(index => bindToTarget(defaultActions, index))

    for (let prop in defaultActions) {
        if (defaultActions.hasOwnProperty(prop))
            this[prop] =
                generateActions(defaultActions[prop], options.actions[prop], prop)
    }

    function bindToTarget(target, index) {
        target[index] = bindScope(ctx, target[index])
    }
    var container = document.createElement(options.is)
    container.appendChild(options.template)

    this.props.dom = generateDocument(this, container)
    this.props.root = getDocumentRoot(container)
    this.props.template = container
    this.mount =
        generateActions({
            before: defaultActions.mount.before,
            method: mount.bind(this, defaultActions.mount.method, this.props.template),
            after: defaultActions.mount.after
        }, options.actions.mount, 'mount')
    this.unmount =
        generateActions({
            before: defaultActions.unmount.before,
            method: unmount.bind(this, defaultActions.unmount.method),
            after: defaultActions.unmount.after
        }, options.actions.unmount, 'unmount')
    this.destroy =
        generateActions({
            before: defaultActions.destroy.before,
            method: destroy.bind(this, defaultActions.destroy.method),
            after: defaultActions.destroy.after
        }, options.actions.destroy, 'destroy')
    this.init()

    function destroy(widgetdestroy, finish) {
        this.unmount()
        for (var property in this)
            this[property] = null
        if (widgetdestroy && isFunction(widgetdestroy))
            return widgetdestroy.call(this, finish)
    }

    function unmount(widgetUnmount, finish) {
        if (!this.target || !this.target.parentNode)
            return
        this.target.parentNode.removeChild(this.target)
        if (widgetUnmount && isFunction(widgetUnmount))
            return widgetUnmount.call(this, finish)
    }

    function mount(widgetMount, template, finish, target, prepend) {
        if (typeof target === 'string') {
            target = document.querySelector(target)
        } else {
            logger.warn('first argument of mount method should be selector string')
        }
        if (this.target) {
            // Already mounted before
            if (prepend)
                target.insertBefore(this.target, target.firstChild)
            else
                target.appendChild(this.target)
        } else {
            // First time mount
            this.children.forEach(child => child.widget.mount(child.target))
            // templates can only have one root
            this.target = shallowCopy(
                Array.from(template.childNodes).filter(node => node.nodeType === 1)
            )[0]
            if (prepend)
                target.insertBefore(template, target.firstChild)
            else
                target.appendChild(template)
        }
        if (widgetMount && isFunction(widgetMount))
            return widgetMount.call(this, finish)
        return this
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
