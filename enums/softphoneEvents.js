"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EvSoftphoneEvents = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var EvSoftphoneEvents = _ObjectMap.ObjectMap.prefixKeys(['REGISTERED', 'NEW_CALL', 'CALL_CONNECTED', 'CALL_TERMINATED', 'CALL_ANSWERED', 'CALL_REJECTED', 'AUDIO_STREAM_REJECTED', 'RESET', 'UPDATE_OFFHOOK_FLAGS'], 'softphone');

exports.EvSoftphoneEvents = EvSoftphoneEvents;
//# sourceMappingURL=softphoneEvents.js.map
