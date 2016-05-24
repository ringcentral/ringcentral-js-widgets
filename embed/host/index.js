import _ from './host'
import store from './store'
import { oauth } from './oauth'
import EventEmitter from './eventemitter'
console.log(EventEmitter);
var Ringcentral = Ringcentral || {}
Ringcentral.widgets = {
    oauth
}
// Ringcentral.on()
// Ringcentral.oauth()
