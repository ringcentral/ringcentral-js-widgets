"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.extensionStatusTypes = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var extensionStatusTypes = _ObjectMap.ObjectMap.fromObject({
  enabled: 'Enabled',
  notActivated: 'NotActivated',
  disabled: 'Disabled'
});

exports.extensionStatusTypes = extensionStatusTypes;
//# sourceMappingURL=extensionStatusTypes.js.map
