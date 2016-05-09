import sdk from './rc-sdk'
var LoginService = function(sdk) {
    var onLoginHandler = []
    return {
        login: function(username, extension, password) {
            return sdk.platform()
                .login({
                    'username': username,
                    'extension': extension,
                    'password': password
                })
        },
        logout: function() {
            return sdk.platform().logout()
        },
        checkLoginStatus: function() {
            return sdk.platform().loggedIn().then(function(isLoggedIn) {
                if (isLoggedIn) {
                    onLoginHandler.forEach(handler => handler())
                }
                return isLoggedIn
            })
        },

    }
}(sdk)
export default LoginService
