"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logTypes = void 0;

var _Enum = require("ringcentral-integration/lib/Enum");

var logTypes = (0, _Enum.createEnum)(['CALL_DISPOSITION_FAILURE', 'CALL_DISPOSITION_SUCCESS']);
exports.logTypes = logTypes;
//# sourceMappingURL=logTypes.js.map
