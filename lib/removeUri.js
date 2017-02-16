"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

exports.default = removeUri;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function removeUri() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var uri = _ref.uri,
      data = (0, _objectWithoutProperties3.default)(_ref, ["uri"]);

  return data;
}
//# sourceMappingURL=removeUri.js.map
