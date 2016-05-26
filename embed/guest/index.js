import { getURLParameter } from './utils'
import phone from './phone'
import store from './store'
import actions from '../actions'
const origin = getURLParameter('origin')
const width = getURLParameter('width')
const height = getURLParameter('height')


phone.mount(document.body)
document.body.style.overflow = 'hidden'

window.addEventListener('message', function(e) {
    store.dispatch(e.data)
})
store.subscribe(() => {
    var state = store.getState()
    var {size, dialPad} = state
    phone.props.dialPad.number(dialPad.phoneNumber)
    phone.setSize(size.width, size.height)

    parent.postMessage(state, origin)
})
parent.postMessage(store.getState(), origin)
store.dispatch({
    type: actions.GUEST_INIT,
    width,
    height
})
phone.on('resize', function(width, height) {
    store.dispatch({
        type: actions.GUEST_PHONE_RESIZE,
        width,
        height
    })
})
phone.on('dialing', function(number) {
    console.log(number);
    store.dispatch({
        type: actions.GUEST_DIALPAD_NUMBER,
        value: number
    })
})
