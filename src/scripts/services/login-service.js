import sdk from './rc-sdk'
import { register } from '../service'
var LoginService = function(sdk) {
    var onLoginHandler = [];
    return {
        login: function(username, extension, password) {
            console.log('LoginService -> start login');
            return sdk.platform()
                .login({
                    'username': username,
                    'extension': extension,
                    'password': password
                }).then(function() {
                    onLoginHandler.forEach(handler => handler());
                }).catch(err => console.error(err));
        },
        checkLoginStatus: function() {
            return sdk.platform().loggedIn().then(function(isLoggedIn) {
                if (isLoggedIn) {
                    onLoginHandler.forEach(handler => handler());
                }
                return isLoggedIn;
            });
        },
        registerLoginHandler: function(handler) {
            onLoginHandler.push(handler);
        }
    }
}(sdk);
register('loginService', LoginService);
