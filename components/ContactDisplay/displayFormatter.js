"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.displayFormatter = void 0;

var _formatMessage = _interopRequireDefault(require("format-message"));

var _phoneSourceNames = _interopRequireDefault(require("../../lib/phoneSourceNames"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var displayFormatter = function displayFormatter(_ref) {
  var entityName = _ref.entityName,
      entityType = _ref.entityType,
      phoneNumber = _ref.phoneNumber,
      currentLocale = _ref.currentLocale,
      brand = _ref.brand,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer;
  var typeName;

  if (entityType) {
    typeName = phoneSourceNameRenderer ? phoneSourceNameRenderer(entityType) : (0, _formatMessage["default"])(_phoneSourceNames["default"].getString(entityType, currentLocale), {
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

exports.displayFormatter = displayFormatter;
//# sourceMappingURL=displayFormatter.js.map
