"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabManagerEvents = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var tabManagerEvents = _ObjectMap.ObjectMap.prefixKeys(['MUTE', 'MUTE_STATE_CHANGE', 'NOTIFY_ACTIVE_TAB_CALL_ACTIVE', // Session config related
'SET_MIAN_TAB_ID', 'MAIN_TAB_WILL_UNLOAD', 'SET_MAIN_TAB_COMPLETE', 'AGENT_CONFIG_SUCCESS', 'RESET_WORKING_STATE', 'UPDATE_SESSION', 'UPDATE_SESSION_FAIL', 'UPDATE_SESSION_SUCCESS', 'UPDATE_SESSION_SUCCESS_ALERT', // WebRTC related
'ASK_AUDIO_PERMISSION', 'SIP_RECONNECTING_WHEN_CALL_CONNECTED', 'SIP_CONNECTING', 'SIP_RINGING', 'SIP_RINGING_MODAL', 'SIP_REGISTERED', 'SIP_UNREGISTERED', 'SIP_REGISTRATION_FAILED', 'SIP_CONNECTED', 'SIP_ENDED', 'SIP_REGISTRATION_FAILED_RELOAD', // Disposition related
'CALL_DISPOSITION_SUCCESS', 'CLOSE_WHEN_CALL_CONNECTED', // Auth related
'LOGOUT', 'LOGGED_OUT', 'OPEN_SOCKET', 'RELOGIN', 'CONFIGURE_FAIL', 'RE_CHOOSE_ACCOUNT'], 'tabManager');

exports.tabManagerEvents = tabManagerEvents;
//# sourceMappingURL=tabManagerEvents.js.map
