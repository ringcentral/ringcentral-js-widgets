"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInternalTransferName = void 0;
require("core-js/modules/es.array.concat.js");
var getInternalTransferName = exports.getInternalTransferName = function getInternalTransferName(_ref) {
  var firstName = _ref.firstName,
    lastName = _ref.lastName,
    username = _ref.username;
  var isInvalidName = !firstName && !lastName;
  return isInvalidName ? username : "".concat(firstName, " ").concat(lastName);
};
//# sourceMappingURL=util.js.map
