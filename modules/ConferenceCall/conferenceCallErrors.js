"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.conferenceCallErrors = void 0;
var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");
var conferenceCallErrors = exports.conferenceCallErrors = _ObjectMap.ObjectMap.prefixKeys(['internalServerError', 'conferenceForbidden', 'conferenceBadRequest', 'conferenceNotFound', 'conferenceConflict', 'modeError', 'makeConferenceFailed', 'bringInFailed', 'removeFromConferenceFailed', 'terminateConferenceFailed', 'callIsRecording'], 'conferenceCall');
//# sourceMappingURL=conferenceCallErrors.js.map
