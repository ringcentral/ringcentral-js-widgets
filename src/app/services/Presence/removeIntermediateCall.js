"use strict";

require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.reduce.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeIntermediateCall = void 0;
var _callLogHelpers = require("@ringcentral-integration/commons/lib/callLogHelpers");
var _ramda = require("ramda");
var removeIntermediateCall = exports.removeIntermediateCall = (0, _ramda.reduce)(function (result, activeCall) {
  if (!(0, _callLogHelpers.isIntermediateCall)(activeCall) && !(0, _ramda.find)(function (item) {
    return item.sessionId === activeCall.sessionId && item.direction === activeCall.direction;
  }, result)) {
    result.push(activeCall);
  }
  return result;
});
//# sourceMappingURL=removeIntermediateCall.js.map
