import frame from './frame'
import { oauth } from './oauth'
window.Ringcentral = window.Ringcentral || {}
window.Ringcentral.widgets = {
    oauth
}
window.addEventListener('message', function(e) {
    var state = e.data
    frame.width = state.size.width
    frame.height = state.size.height
    if (state.status.unmount) {
        frame.parentNode.removeChild(frame)
    }
    if (state.status.ready) {
        frame.style['box-shadow'] = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
        frame.style['transition'] = 'height .150s cubic-bezier(0.4, 0.0, 0.2, 1)'
    }
})
// Ringcentral.on()
// Ringcentral.oauth()
