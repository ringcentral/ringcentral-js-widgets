"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callErrors = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var callErrors = exports.callErrors = _ObjectMap.ObjectMap.prefixKeys(['noToNumber', 'noAreaCode', 'connectFailed', 'internalError', 'notAnExtension', 'networkError', 'noRingoutEnable', 'noInternational', 'emergencyNumber', 'numberParseError', 'fromAndToNumberIsSame'], 'callErrors');
//# sourceMappingURL=callErrors.js.map
