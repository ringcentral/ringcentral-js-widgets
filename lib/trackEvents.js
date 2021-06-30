"use strict";

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.trackEvents = void 0;

require("core-js/modules/es6.object.define-property");

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _Analytics = require("@ringcentral-integration/commons/modules/Analytics");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var trackEvents = _ObjectMap.ObjectMap.fromObject(_objectSpread(_objectSpread({}, _Analytics.trackEvents), {}, {
  // EvAgentSession, Voice Connection & Persistent Voice Connection
  agentSessionSetLoginType: 'User Setting: Set Voice Connection',
  agentSessionSetTakingCall: 'User Setting: Set Persistent Voice Connection',
  agentSessionSetSkillProfileId: 'User Setting: Set Skill Profile',
  agentSessionSetInboundQueueIds: 'User Setting: Set Inbound Queue',
  agentSessionSetAutoAnswer: 'User Setting: Set Auto Answer',
  agentSessionConfigureAgent: 'User Setting: Configure Agent',
  // EvAuth, Authentication & Login & Agent UserId
  loginAgent: 'User Setting: Login Agent'
}));

exports.trackEvents = trackEvents;
//# sourceMappingURL=trackEvents.js.map
