import frame from './frame'
import { oauth as openOauthWindow } from './oauth'
window.addEventListener('message', function(e) {
    var state = e.data
    console.log('receive')
    console.log(state);
    frame.width = state.size.width
    frame.height = state.size.height
    if (state.status.unmount) {
        frame.parentNode.removeChild(frame)
    }
    if (state.status.ready) {
        frame.style['box-shadow'] = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'
        frame.style['transition'] = 'height .150s cubic-bezier(0.4, 0.0, 0.2, 1)'
    }
    if (state.call.incoming) {
        if (Ringcentral.widget.events.incoming)
            Ringcentral.widget.events.incoming.forEach(event => event())
    }
    if (state.call.loggedin) {
        if (Ringcentral.widget.events.loggedin)
            Ringcentral.widget.events.loggedin.forEach(event => event())
    }
})
if (!window.Ringcentral) window.Ringcentral = {}
console.log('poll window');
window.Ringcentral.widget = {
    events: {},
    on(name, fn) {
        if (!Ringcentral.widget.events[name]) Ringcentral.widget.events[name] = []
        Ringcentral.widget.events[name].push(fn)
    }
}
// Ringcentral.on()
// Ringcentral.oauth()
