import { createStore, combineReducers } from 'redux'
import actions from '../actions'
var initialState = {
    status: {
        init: false,
        ready: false,
        unmount: false,
        minimized: false,
    },
    size: {
        width: 250,
        height: 400,
        toolbarHeight: 40,
    },
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

function status(state = initialState.status, action) {
    switch (action.type) {
        case actions.GUEST_INIT:
            return Object.assign({}, state, {
                init: true,
            })
        case actions.GUEST_PHONE_UNMOUNT:
            return Object.assign({}, state, {
                unmount: true
            })
        default:
            return state
    }
}

function size(state = initialState.size, action) {
    switch (action.type) {
        case actions.GUEST_INIT:
            return Object.assign({}, state, {
                width: action.width,
                height: action.height
            })
        case actions.GUEST_PHONE_RESIZE:
            return Object.assign({}, state, {
                width: action.width,
                height: action.height
            })
        default:
            return state
    }
}

function dialPad(state = initialState.dialPad, action) {
    switch (action.type) {
        case actions.HOST_DIALPAD_NUMBER:
        case actions.GUEST_DIALPAD_NUMBER:
            return Object.assign({}, state, {
                phoneNumber: action.value,
            })
        default:
            return state
    }
}

var reducer = combineReducers({
    status,
    size,
    dialPad
})
var store = createStore(reducer)
store.subscribe(() => {
    console.log(store.getState());
})

export default store
