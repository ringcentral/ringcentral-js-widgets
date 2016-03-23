var actions = {}
function register(name, action) {
    actions[name] = action
}
function getActions() {
    return actions
}
export {
    register,
    getActions
}
