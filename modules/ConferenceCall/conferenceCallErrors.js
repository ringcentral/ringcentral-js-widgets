"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.conferenceCallErrors = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var conferenceCallErrors = _ObjectMap.ObjectMap.prefixKeys(['internalServerError', 'conferenceForbidden', 'conferenceBadRequest', 'conferenceNotFound', 'conferenceConflict', 'modeError', 'makeConferenceFailed', 'bringInFailed', 'removeFromConferenceFailed', 'terminateConferenceFailed', 'callIsRecording'], 'conferenceCall');

exports.conferenceCallErrors = conferenceCallErrors;
var _default = conferenceCallErrors;
exports["default"] = _default;
//# sourceMappingURL=conferenceCallErrors.js.map
