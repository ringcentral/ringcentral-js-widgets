import sdk from './helpers/rc-sdk'
import webPhone from './helpers/rc-webphone'
import LoginService from './helpers/login-service'
import CallLogService from './helpers/call-log-service'
import PhoneService from './helpers/phone-service'
import w from './w'

window.sdk = sdk;
window.webPhone = webPhone;
window.LoginService = LoginService;
window.CallLogService = CallLogService;
window.PhoneService = PhoneService;
window.w = w;
export {
    sdk,
    webPhone,
    LoginService,
    CallLogService,
    PhoneService
}
