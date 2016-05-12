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

import { 
    createFragment,
    generateDocument,
    getDocumentRoot
} from './fragment'
 
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
function register({actions, events, data, props} = settings) {
    if (!actions)
        console.warn('Widgets do not have actions defined, maybe you get some typo.')
    ;['init', 'mount', 'unmount', 'destroy', 'error'].forEach(action => {
        actions[action] = Object.assign(
            shallowCopy(functionSet),
            actions[action]
        )
    })
    var Clone = function(options) {
        Widget.call(this, {actions, events, data, props}, options)
    }
    for (let prop in actions) {
        if (actions.hasOwnProperty(prop))
            Clone.prototype[prop] = generateActions(actions[prop])
    }
    return Clone
}

function Widget({actions, events, data = {}, props = {}}, options) {
    if (!options || !options.internal) {
        return Error('You are trying to construct a widget manually, please use w()')
    }
    logger = initLogger(options.logLevel)
    this._mounted = false

    this.refs = {}
    this.props = props
    this.custom = {}
    this.children = []
    this.data = Object.assign(data, options.data)
    this.fragment = createFragment(options.is, options.template)
    this.root = getDocumentRoot(options.is, this.fragment)
    this.dom = undefined
    // var actions = shallowCopy(actions)
    // options.actions = shallowCopy(options.actions)

    // Object.keys(options.actions).forEach(index => bindToTarget(options.actions, index))
    // Object.keys(actions).forEach(index => bindToTarget(actions, index))
    for (let prop in options.actions) {
        if (options.actions.hasOwnProperty(prop))
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

    this.dom = generateDocument(this, this.fragment)
    // bind event
    events.forEach(event => {
        var target
        var capture = false
        if (event.event === 'scroll')
            capture = true
        if (!event.target) 
            target = this.root
        else if (event.target === 'document')
            target = document
        else
            target = this.dom[event.target]
        target.addEventListener(event.event, event.callback.bind(this), capture || event.capture);
    })
    this.init.call(this)
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
        before: action.before? bind6Args(action.before, scope): null,
        method: action.method? bind6Args(action.method, scope): null,
        after: action.after? bind6Args(action.after, scope): null,
        error: action.error? bind6Args(action.error, scope): null,
    }
}


function generateActions(widgetAction, userAction = shallowCopy(functionSet)) {
    return function(a, b, c, d, e, f) {
        var before = (a, b, c, d, e, f) => {
            userAction.before && userAction.before.call(this, a, b, c, d, e, f)
            var result = widgetAction.before? widgetAction.before.call(this, a, b, c, d, e, f): undefined
            // Something like Monad
            if (typeof result !== 'undefined') return result
            return {
                __custom: true,
                data: [a, b, c, d, e, f].filter(item => typeof item !== 'undefined')
            }
        }
        var method = arg => {
            if (arg && arg.__custom)
                return (widgetAction.method && 
                    widgetAction.method.call(this, bind6Args(userAction.method, this), ...arg.data)) || arg
            else
                return (widgetAction.method && 
                    widgetAction.method.call(this, bind6Args(userAction.method, this), arg)) || arg
        }
        var after = arg => {
            if (arg && arg.__custom) {
                arg = arg.data
                userAction.after && userAction.after.call(this, ...arg)
                return (widgetAction.after && widgetAction.after.call(this, ...arg)) || arg
            } else {
                userAction.after && userAction.after.call(this, arg)
                return (widgetAction.after && widgetAction.after.call(this, arg)) || arg
            }
        }
        var error = e => {
            widgetAction.error && widgetAction.error.call(this, e)
            userAction.error && userAction.error.call(this, e)
        }
        
        return chainActions(before(a, b, c, d, e, f), [before, method, after], error)
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
