import frame from './frame'
import { oauth as openOauthWindow } from './oauth'
window.addEventListener('message', function(e) {
    // not for redux, for child iframe oauth
    // from child
    var redirectUri = 'https://ringcentral.github.io/ringcentral-js-widget/page/redirect.html'
    var interval = null
    if (e.data.type === 'oauth-request') {
        var oauthWindow = openOauthWindow(e.data.value)
        interval = setInterval(check, 500)
        function check() {
            console.log(oauthWindow);
            if (oauthWindow.closed) {
                frame.contentWindow.postMessage({
                    type: 'oauth-fail',
                }, '*')
                clearInterval(interval)
            }
        }
    // from child
    } else if (e.data.type === 'oauth-request-info') {
        
        frame.contentWindow.postMessage({
            type: 'oauth-info-response',
            value: redirectUri
        }, '*')

    // from oauth window
    } else if (e.data.type === 'oauth') {
        interval && clearInterval(interval)
        frame.contentWindow.postMessage({
            type: 'oauth-response',
            value: {
                url: e.data.value,
                redirectUri: redirectUri
            }
        }, '*')
    } else {
        // redux
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
    }
})
// Ringcentral.on()
// Ringcentral.oauth()
