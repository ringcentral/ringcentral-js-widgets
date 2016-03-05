import AuthPanel from './components/auth-panel'
import CallPanel from './components/call-panel'
import DialPad from './components/dial-pad'
import AutoComplete from './components/auto-complete'
import rcHelper from './helpers/helper'
import sdk from './helpers/rc-sdk'
import LoginService from './helpers/login-service'

window.AuthPanel = AuthPanel;
window.CallPanel = CallPanel;
window.DialPad = DialPad;
window.AutoComplete = AutoComplete;
window.rcHelper = rcHelper;
window.sdk = sdk;
window.LoginService = LoginService;

export {
    AuthPanel,
    CallPanel,
    DialPad,
    AutoComplete,
    rcHelper,
    sdk,
    LoginService
}
