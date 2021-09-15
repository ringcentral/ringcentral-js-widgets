"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.softphoneStatus = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var softphoneStatus = _ObjectMap.ObjectMap.prefixKeys(['idle', 'connecting'], 'softphone');

exports.softphoneStatus = softphoneStatus;
//# sourceMappingURL=softphoneStatus.js.map
