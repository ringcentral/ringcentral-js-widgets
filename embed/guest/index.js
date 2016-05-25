import { getURLParameter } from './utils'
import phone from './phone'
import store from './store'
import EventEmitter from './eventemitter'
import actions from '../actions'
const origin = getURLParameter('origin')
phone.mount(document.body)
window.addEventListener('message', function(e) {
    store.dispatch(e.data)
})
store.subscribe(() => {
    var { dialPad } = store.getState()
    phone.props.dialPad.setNumber(dialPad.phoneNumber)
})
parent.postMessage({
    type: 'init'
}, origin)
