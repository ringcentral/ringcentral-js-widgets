export function initLogger(level) {
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

export function isThenable(result) {
    if (result.then && typeof result.then === 'function')
        return true
    return false
}

export function isFunction(fn) {
    return typeof fn === 'function'
}

export function ensureTail(string, tail) {
    if (string.endsWith(tail))
        return string
    return string + tail
}

export function toFunction(fn, defalut) {
    if (fn && isFunction(fn))
        return fn
    else if (defalut && isFunction(defalut))
        return defalut
    else
        return function() {}
}

export function shallowCopy(target) {
    if (Array.isArray(target))
        return target.slice(0)
    return Object.assign({}, target)
}

export function assign(target, name, source) {
    var tmp = {}
    tmp[name] = source
    return Object.assign(target, tmp)
}

export function find(array, prop, value) {
    return array.find(item => item[prop] === value)
}

// From Vue
export function bind (fn, ctx) {
  return function (a) {
    var l = arguments.length
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
}

// From React
export function bindNoArgs(func, context) {
  if (!func) {
    return null;
  }
  return function () {
    return func.call(context);
  };
};

export function bind5Args (fn, ctx) {
  return function (a, b, c, d, e) {
    return fn.call(ctx, a, b, c, d, e)
  }
}
