import frame from './frame'
import { oauth } from './oauth'
var Ringcentral = Ringcentral || {}
Ringcentral.widgets = {
    oauth
}
window.addEventListener('message', function(e) {
    var state = e.data
    frame.width = state.size.width
    frame.height = state.size.height
    if (state.status.unmount) {
        frame.parentNode.removeChild(frame)
    }
})
// Ringcentral.on()
// Ringcentral.oauth()
