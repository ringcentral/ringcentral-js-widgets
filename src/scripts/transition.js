function transitionIn(effect, target, options = {}) {
    options && options.before && options.before();
    target.classList.add(effect)
    target.classList.add(`${effect}-in`)
    target.classList.remove(`${effect}-out`)
    window.setTimeout(() => target.classList.remove(`${effect}-in`), 17)
    var after = function() {
        options && options.after && options.after()
        target.removeEventListener('transitionend', after)
    }
    target.addEventListener('transitionend', after)
}
function transitionOut(effect, target, options = {}) {
    options && options.before && options.before();
    target.classList.add(effect)
    target.classList.remove(`${effect}-in`)
    window.setTimeout(() => target.classList.add(`${effect}-out`), 17)
    var after = function() {
        options && options.after && options.after()
        target.removeEventListener('transitionend', after)
    }
    target.addEventListener('transitionend', after)
}
function transitionInit(effect, target, options = {}) {
    options && options.before && options.before();
    target.classList.add(`${effect}-in`)
    // window.setTimeout(() => target.classList.add(effect), 17)
    var after = function() {
        options && options.after && options.after()
        target.removeEventListener('transitionend', after)
    }
    target.addEventListener('transitionend', after)
}
function transitionToggle(effect, target, options = {}) {
    if (target.classList.contains(`${effect}-out`) || target.classList.contains(`${effect}-in`))
        transitionIn(effect, target, options);
    else
        transitionOut(effect, target, options);
}
export {
    transitionIn,
    transitionOut,
    transitionToggle,
    transitionInit
}
