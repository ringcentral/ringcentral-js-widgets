"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var _default = _ObjectMap.ObjectMap.prefixKeys(['noToNumber', 'noAreaCode', 'connectFailed', 'internalError', 'notAnExtension', 'networkError', 'noRingoutEnable', 'noInternational', 'emergencyNumber'], 'callErrors');

exports["default"] = _default;
//# sourceMappingURL=callErrors.js.map
