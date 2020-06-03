"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInternalTransferName = void 0;

var getInternalTransferName = function getInternalTransferName(_ref) {
  var firstName = _ref.firstName,
      lastName = _ref.lastName,
      username = _ref.username;
  var isInvalidName = !firstName && !lastName;
  return isInvalidName ? username : "".concat(firstName, " ").concat(lastName);
};

exports.getInternalTransferName = getInternalTransferName;
//# sourceMappingURL=util.js.map
