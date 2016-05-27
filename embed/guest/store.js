import { createStore, combineReducers } from 'redux'
import actions from '../actions'
var initialState = {
    init: false,
    unmount: false,
    minimized: false,
    size: {
        width: 250,
        height: 400,
    },
    toolbarHeight: 40,
    dialPad: {
        phoneNumber: ''
    },
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
        case actions.HOST_DIALPAD_NUMBER:
        case actions.GUEST_DIALPAD_NUMBER:
            return Object.assign({}, state, {
                dialPad: {
                    phoneNumber: action.value,
                }
            })
        case actions.GUEST_INIT:
            return Object.assign({}, state, {
                init: true,
                size: {
                    width: action.width,
                    height: action.height
                }
            })
        case actions.GUEST_PHONE_RESIZE:
            return Object.assign({}, state, {
                size: {
                    width: action.width,
                    height: action.height
                }
            })
        case actions.GUEST_PHONE_UNMOUNT:
            return Object.assign({}, state, {
                unmount: true
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

export default store
