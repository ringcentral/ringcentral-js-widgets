"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.subscriptionStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var subscriptionStatus = _ObjectMap.ObjectMap.prefixKeys(['subscribing', 'subscribed', 'unsubscribing', 'notSubscribed'], 'subscriptionStatus');

exports.subscriptionStatus = subscriptionStatus;
var _default = subscriptionStatus;
exports["default"] = _default;
//# sourceMappingURL=subscriptionStatus.js.map
