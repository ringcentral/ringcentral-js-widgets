import { createStore, combineReducers } from 'redux'

var initialState = {
    size: {
        width: 250,
        height: 500,
    },
    toolbarHeight: 40,
    minimized: false
}

function resize({width, height}) {
    return {
        type: 'RESIZE',
        width,
        height
    }
}
function minimize(minimized) {
    return {
        type: 'MINIMIZED',
        minimized
    }
}
function phone(state = initialState, action) {
    switch (action.type) {
        case 'MINIMIZED':
            return Object.assign({}, state, {
                minimized: action.minimized,
            })
        case 'RESIZE':
            return Object.assign({}, state, {
                size: {
                    width: action.width,
                    height: action.height
                }
            })
        default:
            return state
    }
}

// var reducer = combineReducers({
//     phone,
//     size
// })
var store = createStore(phone)
store.subscribe(() => {
    console.log(store.getState());
})
store.dispatch(resize({width: 200, height: 200}))

export default store
