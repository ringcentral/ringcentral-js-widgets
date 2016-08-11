import { RC } from './rc-sdk'
var LoginService = function(sdk) {
    var onLoginHandler = []
    return {
        login: function(username, extension, password) {
            return RC.sdk.platform()
                .login({
                    'username': username,
                    'extension': extension,
                    'password': password
                })
        },
        logout: function() {
            return RC.sdk.platform().logout()
        },
        checkLoginStatus: function() {
            return RC.sdk.platform().loggedIn().then(function(isLoggedIn) {
                if (isLoggedIn) {
                    onLoginHandler.forEach(handler => handler())
                }
                return isLoggedIn
            })
        },
        oauth: function() {
            return new Promise((resolve, reject) => {
                var redirectUri = 'https://apps.ringcentral.com/incontactwebphone/redirect.html'
                var url = RC.sdk.platform().authUrl({
                    redirectUri
                })
                var oauthWindow = window.open(
                    url,
                    'rc-iframe-2',
                    'width=400, height=600'
                )
                var interval = setInterval(check, 500)
                function check() {
                    if (!oauthWindow) {
                        return
                    }
                    if (oauthWindow.closed) {
                        reject(new Error(''))
                        window.removeEventListener('message', oauthChannel)
                        clearInterval(interval)
                    }
                }
                window.addEventListener('message', oauthChannel)
                function oauthChannel(e) {
                    if (e.data.type === 'oauth') {
                        var qs = RC.sdk.platform().parseAuthRedirectUrl(e.data.value)
                        qs.redirectUri = redirectUri
                        window.removeEventListener('message', oauthChannel)
                        clearInterval(interval)
                        resolve(RC.sdk.platform().login(qs))
                    }
                }
            })
        }
    }
}()
export default LoginService
