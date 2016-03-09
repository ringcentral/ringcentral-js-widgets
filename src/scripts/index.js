// import AuthPanel from './components/auth-panel'
// import CallPanel from './components/call-panel'
// import DialPad from './components/dial-pad'
// import CallLog from './components/call-log'
// import CallLogItem from './components/call-log-item'
// import AutoComplete from './components/auto-complete'
import rcHelper from './helpers/helper'
import sdk from './helpers/rc-sdk'
import webPhone from './helpers/rc-webphone'
import LoginService from './helpers/login-service'
import CallLogService from './helpers/call-log-service'
import PhoneService from './helpers/phone-service'
import w from './w'

// window.AuthPanel = AuthPanel;
// window.CallPanel = CallPanel;
// window.DialPad = DialPad;
// window.CallLog = CallLog;
// window.CallLogItem = CallLogItem
// window.AutoComplete = AutoComplete;
window.rcHelper = rcHelper;
window.sdk = sdk;
window.webPhone = webPhone;
window.LoginService = LoginService;
window.CallLogService = CallLogService;
window.PhoneService = PhoneService;
window.w = w;
export {
    // AuthPanel,
    // CallPanel,
    // DialPad,
    // CallLog,
    // CallLogItem,
    // AutoComplete,
    rcHelper,
    sdk,
    webPhone,
    LoginService,
    CallLogService,
    PhoneService
}
