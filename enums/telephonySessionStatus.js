"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.telephonySessionStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _Session = require("ringcentral-call-control/lib/Session");

var telephonySessionStatus = _ObjectMap.ObjectMap.fromObject(_Session.PartyStatusCode);

exports.telephonySessionStatus = telephonySessionStatus;
var _default = telephonySessionStatus;
exports["default"] = _default;
//# sourceMappingURL=telephonySessionStatus.js.map
