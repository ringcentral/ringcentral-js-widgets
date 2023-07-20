"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.agentScriptEvents = exports.EV_APP_PAGE_KEY = exports.EV_AGENT_SCRIPT_PAGE_KEY = exports.EV_AGENT_SCRIPT_BROADCAST_KEY = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var EV_APP_PAGE_KEY = 'ev_app';
exports.EV_APP_PAGE_KEY = EV_APP_PAGE_KEY;
var EV_AGENT_SCRIPT_PAGE_KEY = 'ev_agentScript';
exports.EV_AGENT_SCRIPT_PAGE_KEY = EV_AGENT_SCRIPT_PAGE_KEY;
var EV_AGENT_SCRIPT_BROADCAST_KEY = 'agent_script_channel$$';
exports.EV_AGENT_SCRIPT_BROADCAST_KEY = EV_AGENT_SCRIPT_BROADCAST_KEY;
var agentScriptEvents = _ObjectMap.ObjectMap.prefixKeys(['INIT', 'SET_SCRIPT_RESULT', 'GET_KNOWLEDGE_BASE_ARTICLES', 'UPDATE_DISPOSITION'], 'broadcast');
exports.agentScriptEvents = agentScriptEvents;
//# sourceMappingURL=agentScriptEvents.js.map
