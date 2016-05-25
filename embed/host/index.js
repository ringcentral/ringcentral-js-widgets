import frame from './frame'
import { oauth } from './oauth'
var Ringcentral = Ringcentral || {}
Ringcentral.widgets = {
    oauth
}
window.addEventListener('message', function(e) {
    var state = e.data
    console.log(state);
    frame.width = state.size.width
    frame.height = state.size.height
})
// Ringcentral.on()
// Ringcentral.oauth()
