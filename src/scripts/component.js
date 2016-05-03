import {
    initLogger,
    isThenable,
    isFunction,
    toFunction,
    shallowCopy,
    assign,
    bindNoArgs,
    bind6Args,
    bind
} from './util/index'

import { createFragment } from './fragment'
import lifecycle from './lifecycle'
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
        console.warn('Widgets do not have actions defined, maybe you get some typo.')

    ;['init', 'mount', 'unmount', 'destroy', 'error'].forEach(action => {
        actions[action] = Object.assign(
            shallowCopy(functionSet),
            actions[action]
        )
    })
    return Widget.bind(null, {actions, data})
}

function Widget({actions, data = {}}, options) {
    if (!options.internal) {
        return Error('You are trying to construct a widget manually, please use w()')
    }
    logger = initLogger(options.logLevel)

    this.refs = {}
    this.props = {}
    this.custom = {}
    this.children = []
    this.data = Object.assign(data, options.data)
    this._mounted = false
    this.fragment = createFragment(options.is, options.template)
    this.root = getDocumentRoot(options.is, this.fragment)
    this.dom = undefined

    var actions = shallowCopy(actions)
    options.actions = shallowCopy(options.actions)

    var ctx = this

    Object.keys(options.actions).forEach(index => bindToTarget(options.actions, index))
    Object.keys(actions).forEach(index => bindToTarget(actions, index))

    for (let prop in actions) {
        if (actions.hasOwnProperty(prop))
            this[prop] =
                generateActions(actions[prop], options.actions[prop], prop)
    }

    ['mount', 'unmount', 'destroy'].forEach(action => {
        this[action] = generateActions({
            before: actions[action].before,
            method: extendLifecycle(lifecycle[action].bind(this), actions[action].method),
            after: actions[action].after
        }, options.actions[action], action)
    })

    function bindToTarget(target, index) {
        target[index] = bindScope(ctx, target[index])
    }
    this.dom = generateDocument(this, this.fragment)
    this.init()
}

function extendLifecycle(base, extend) {
    return function(finish, ...args) {
        base(...args)
        if (extend && isFunction(extend))
            return extend.call(this, finish)
    }
}

function bindScope(scope, action) {
    return {
        before: bind6Args(toFunction(action.before), scope),
        method: bind6Args(toFunction(action.method), scope),
        after: bind6Args(toFunction(action.after), scope),
        error: bind6Args(toFunction(action.error, logger.error), scope),
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

function getDocumentRoot(name, fragment) {
    return fragment.querySelector(name)
}

function generateActions(widgetAction, userAction = shallowCopy(functionSet), name) {
    return function(a, b, c, d, e, f) {
        var before = function(a, b, c, d, e, f) {
            userAction.before(a, b, c, d, e, f)
            widgetAction.before(a, b, c, d, e, f)
            // Something like Monad
            return {
                __custom: true,
                data: [a, b, c, d, e, f].filter(item => item != null)
            }
        }
        var method = function(arg) {
            return widgetAction.method(userAction.method, ...arg.data) || arg
        }
        var after = function(arg) {
            if (arg.__custom) {
                arg = arg.data
                userAction.after(...arg)
                return widgetAction.after(...arg) || arg
            } else {
                userAction.after(arg)
                return widgetAction.after(arg) || arg
            }
        }
        var error = function(e) {
            widgetAction.error(e)
            userAction.error(e)
        }
        var finish = function(arg) {
            if (arg.__custom) {
                arg = arg.data
            }
            // if (isFunction(arg))
            //     // flatten one level
            //     return Array.isArray(arg()[0]) ? [].concat.apply([], arg()) : arg()[0]
            return arg
        }
        // try {
        return chainActions(before(a, b, c, d, e, f), [before, method, after, finish], error)
        // } catch (e) {
        // error(e)
        // }
    }
}

// function wrapUserAction(widget, user, ...args) {
//     var continueDefault = (user != null && user(...args))
//     if (continueDefault || typeof continueDefault === 'undefined')
//         return widget(...args) || (() => args)
//     return [].concat(...args)
// }

function chainActions(result, actions, error, start = 0) {
    if (start + 1 === actions.length)
        return result
    if (isThenable(result)) {
        return actions.reduce((res, action, index) => {
            if (index > start)
                return res.then(action)
            return res
        }, result).catch(error)
    } else {
        return chainActions(actions[start + 1](result), actions, error, start + 1)
    }
}

export { register }
