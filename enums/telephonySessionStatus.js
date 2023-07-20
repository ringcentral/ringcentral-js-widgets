"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.telephonySessionStatus = exports["default"] = void 0;
var _Session = require("ringcentral-call-control/lib/Session");
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var telephonySessionStatus = _ObjectMap.ObjectMap.fromObject(_Session.PartyStatusCode);
exports.telephonySessionStatus = telephonySessionStatus;
var _default = telephonySessionStatus;
exports["default"] = _default;
//# sourceMappingURL=telephonySessionStatus.js.map
