"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PRE_INSERT_ID_PREFIX = void 0;
exports.getPreinsertFakeId = getPreinsertFakeId;
exports.isPreinsertCall = isPreinsertCall;
exports.isPreinsertCallByTelephoneSessionId = isPreinsertCallByTelephoneSessionId;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.string.starts-with.js");
var PRE_INSERT_ID_PREFIX = exports.PRE_INSERT_ID_PREFIX = 'pre_insert_id';
function getPreinsertFakeId(id) {
  return "".concat(PRE_INSERT_ID_PREFIX, "_").concat(id);
}
function isPreinsertCallByTelephoneSessionId(telephoneSessionId) {
  return telephoneSessionId === null || telephoneSessionId === void 0 ? void 0 : telephoneSessionId.startsWith(PRE_INSERT_ID_PREFIX);
}
function isPreinsertCall(call) {
  return isPreinsertCallByTelephoneSessionId(
  // preinsert also use telephoneSessionId as sessionId so that is fine
  call.sessionId);
}
//# sourceMappingURL=isPreinsertCall.js.map
