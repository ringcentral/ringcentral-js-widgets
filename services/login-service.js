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
            return parent.oauth(RC.sdk).then(qs => RC.sdk.platform().login(qs))
        }
    }
}()
export default LoginService
