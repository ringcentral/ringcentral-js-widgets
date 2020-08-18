"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callErrors = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var callErrors = _ObjectMap.ObjectMap.prefixKeys(['noToNumber', 'noAreaCode', 'specialNumber', 'connectFailed', 'internalError', 'notAnExtension', 'networkError', 'noRingoutEnable', 'noInternational'], 'callErrors');

exports.callErrors = callErrors;
//# sourceMappingURL=callErrors.js.map
