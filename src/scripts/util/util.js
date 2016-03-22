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

function isThenable(result) {
    if (result.then && typeof result.then === 'function')
        return true;
    return false;
}

function isFunction(fn) {
    return typeof fn === 'function';
}

export {
    initLogger,
    isThenable,
    isFunction
};
