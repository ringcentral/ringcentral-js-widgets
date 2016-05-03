var actions = {}
export function register(name, action) {
    actions[name] = action
}
export function getActions() {
    return actions
}
