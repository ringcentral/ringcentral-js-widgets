"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tabManagerEvents = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var tabManagerEvents = _ObjectMap.ObjectMap.prefixKeys(['MUTE', 'MUTE_STATE_CHANGE', // Session config related
'SET_CONFIG_TAB_ID', 'AGENT_CONFIG_SUCCESS', 'RESET_WORKING_STATE', 'UPDATE_SESSION', 'UPDATE_SESSION_SUCCESS', 'UPDATE_SESSION_SUCCESS_ALERT', // WebRTC related
'ASK_AUDIO_PERMISSION', 'SET_WEB_RTC_TAB_ID', 'SIP_RECONNECTING_WHEN_CALL_CONNECTED', 'SIP_CONNECTING', 'SIP_RINGING', 'SIP_RINGING_MODAL', 'SIP_REGISTERED', 'SIP_UNREGISTERED', 'SIP_REGISTRATION_FAILED', 'SIP_CONNECTED', 'SIP_ENDED', // Disposition related
'CALL_DISPOSITION_SUCCESS', 'CLOSE_WHEN_CALL_CONNECTED', // Auth related
'LOGOUT'], 'tabManager');

exports.tabManagerEvents = tabManagerEvents;
//# sourceMappingURL=tabManagerEvents.js.map
