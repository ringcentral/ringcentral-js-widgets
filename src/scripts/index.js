import AuthPanel from './components/auth-panel'
import CallPanel from './components/call-panel'
import DialPad from './components/dial-pad'
import CallLog from './components/call-log'
import AutoComplete from './components/auto-complete'
import rcHelper from './helpers/helper'

window.AuthPanel = AuthPanel;
window.CallPanel = CallPanel;
window.DialPad = DialPad;
window.CallLog = CallLog;
window.AutoComplete = AutoComplete;
window.rcHelper = rcHelper;

export {
    AuthPanel,
    CallPanel,
    DialPad,
    CallLog,
    AutoComplete,
    rcHelper
}
