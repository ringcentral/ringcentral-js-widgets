function transitionIn(effect, target, options) {
    options && options.before && options.before()
    target.classList.add(effect);
    target.classList.add(`${effect}-in`);
    target.classList.remove(`${effect}-out`);
    window.setTimeout(() => target.classList.remove(`${effect}-in`), 17);
    target.addEventListener('transitionend', () => options && options.after && options.after());
}
function transitionOut(effect, target, options) {
    options && options.before && options.before()
    target.classList.add(effect);
    target.classList.remove(`${effect}-in`);
    window.setTimeout(() => target.classList.add(`${effect}-out`), 17);
    target.addEventListener('transitionend', () => options && options.after && options.after());
}
function transitionInit(effect, target, options) {
    options && options.before && options.before()
    target.classList.add(effect);
    target.classList.add(`${effect}-in`);
    target.addEventListener('transitionend', () => options && options.after && options.after());
}
function transitionToggle(effect, target, options) {
    if (target.classList.contains(`${effect}-out`) || target.classList.contains(`${effect}-in`))
        transitionIn(effect, target, options)
    else
        transitionOut(effect, target, options)
}
export {
    transitionIn,
    transitionOut,
    transitionToggle,
    transitionInit
};
