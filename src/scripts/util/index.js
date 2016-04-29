function initLogger(level) {
    return {
        error: function(...args) {
            console.error(...args)
        },
        warn: function(...args) {
            if (level > 0)
                console.warn(...args)
        },
        info: function(...args) {
            if (level > 1)
                console.info(...args)
        },
        log: function(...args) {
            if (level > 1)
                console.log(...args)
        }
    }
}

function isThenable(result) {
    if (result.then && typeof result.then === 'function')
        return true
    return false
}

function isFunction(fn) {
    return typeof fn === 'function'
}

function ensureTail(string, tail) {
    if (string.endsWith(tail))
        return string
    return string + tail
}

function toFunction(fn, defalut) {
    if (fn && isFunction(fn))
        return fn
    else if (defalut && isFunction(defalut))
        return defalut
    else
        return function() {}
}

function shallowCopy(target) {
    if (Array.isArray(target))
        return target.slice(0)
    return Object.assign({}, target)
}

function assign(target, name, source) {
    var tmp = {}
    tmp[name] = source
    return Object.assign(target, tmp)
}

function find(array, prop, value) {
    return array.find(item => item[prop] === value)
}

export {
    initLogger,
    isThenable,
    isFunction,
    toFunction,
    shallowCopy,
    ensureTail,
    assign,
    find
}
