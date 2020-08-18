"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.agentScriptEvents = exports.BROADCAST_KEY = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var BROADCAST_KEY = 'ringcentral_engage_voice';
exports.BROADCAST_KEY = BROADCAST_KEY;

var agentScriptEvents = _ObjectMap.ObjectMap.prefixKeys(['INIT', 'SET_SCRIPT_RESULT'], 'broadcast');

exports.agentScriptEvents = agentScriptEvents;
//# sourceMappingURL=agentScriptEvents.js.map
