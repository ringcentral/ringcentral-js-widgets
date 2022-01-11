"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipientInfo = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _phoneSourceNames = _interopRequireDefault(require("../../lib/phoneSourceNames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RecipientInfo = function RecipientInfo(_ref) {
  var currentLocale = _ref.currentLocale,
      name = _ref.name,
      entityType = _ref.entityType,
      enableTitle = _ref.enableTitle,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
      splitter = _ref.splitter;
  var phoneSourceName = phoneSourceNameRenderer ? phoneSourceNameRenderer(entityType) : _phoneSourceNames["default"].getString(entityType, currentLocale);
  var title = enableTitle ? "".concat(name, " ").concat(splitter, " ").concat(phoneSourceName) : undefined;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].nameSection,
    title: title
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].name
  }, name), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].splitter
  }, splitter), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].phoneSourceLabel
  }, phoneSourceName));
};

exports.RecipientInfo = RecipientInfo;
//# sourceMappingURL=RecipientInfo.js.map
