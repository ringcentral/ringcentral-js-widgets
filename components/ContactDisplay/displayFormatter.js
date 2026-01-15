"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayFormatter = void 0;
require("core-js/modules/es.array.concat.js");
var _utils = require("@ringcentral-integration/utils");
var _phoneSourceNames = _interopRequireDefault(require("../../lib/phoneSourceNames"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var displayFormatter = exports.displayFormatter = function displayFormatter(_ref) {
  var entityName = _ref.entityName,
    entityType = _ref.entityType,
    phoneNumber = _ref.phoneNumber,
    currentLocale = _ref.currentLocale,
    brand = _ref.brand,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer;
  var typeName;
  if (entityType) {
    typeName = phoneSourceNameRenderer ? phoneSourceNameRenderer(entityType) : (0, _utils.format)(_phoneSourceNames["default"].getString(entityType, currentLocale), {
      brand: brand
    });
  }
  if (phoneNumber && entityName && entityType) {
    return "".concat(entityName, " | ").concat(typeName, " ").concat(phoneNumber);
  }
  if (entityName && entityType) {
    return "".concat(entityName, " | ").concat(typeName);
  }
  if (entityName) {
    return entityName;
  }
  if (phoneNumber) {
    return "".concat(phoneNumber);
  }
  return '';
};
//# sourceMappingURL=displayFormatter.js.map
