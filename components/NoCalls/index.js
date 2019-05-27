"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = NoCalls;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function NoCalls(_ref) {
  var currentLocale = _ref.currentLocale,
      active = _ref.active;
  return _react["default"].createElement("p", {
    className: _styles["default"].noCalls
  }, _i18n["default"].getString(active ? 'noActiveCalls' : 'noRecords', currentLocale));
}

NoCalls.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  active: _propTypes["default"].bool.isRequired
};
//# sourceMappingURL=index.js.map
