function transitionIn(effect, target) {
    target.classList.add(effect);
    target.classList.add(`${effect}-in`);
    target.classList.remove(`${effect}-out`);
    window.setTimeout(() => target.classList.remove(`${effect}-in`), 17);
}
function transitionOut(effect, target) {
    target.classList.add(effect);
    target.classList.remove(`${effect}-in`);
    window.setTimeout(() => target.classList.add(`${effect}-out`), 17);
}
function transitionInit(effect, target) {
    target.classList.add(effect);
    target.classList.add(`${effect}-in`);
}
function transitionToggle(effect, target) {
    if (target.classList.contains(`${effect}-out`))
        transitionIn(effect, target)
    else
        transitionOut(effect, target)
}
export {
    transitionIn,
    transitionOut,
    transitionToggle,
    transitionInit
};
