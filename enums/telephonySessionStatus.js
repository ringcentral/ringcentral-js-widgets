"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.telephonySessionStatus = exports["default"] = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var _Session = require("ringcentral-call-control/lib/Session");
var telephonySessionStatus = exports.telephonySessionStatus = _ObjectMap.ObjectMap.fromObject(_Session.PartyStatusCode);
var _default = exports["default"] = telephonySessionStatus;
//# sourceMappingURL=telephonySessionStatus.js.map
