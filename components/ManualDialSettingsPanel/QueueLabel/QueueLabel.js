"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.QueueLabel = void 0;

require("core-js/modules/es6.string.sub");

var _react = _interopRequireDefault(require("react"));

var _juno = require("@ringcentral/juno");

var _i18n = _interopRequireDefault(require("../i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var QueueLabel = function QueueLabel(_ref) {
  var gateName = _ref.gateName,
      gateId = _ref.gateId,
      currentLocale = _ref.currentLocale;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].item
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcText, {
    variant: "inherit",
    component: "p",
    title: gateName,
    titleWhenOverflow: true
  }, gateName), gateId !== '-1' ? /*#__PURE__*/_react["default"].createElement("p", {
    className: _styles["default"].sub
  }, _i18n["default"].getString('queueID', currentLocale), ": ", gateId) : null);
};

exports.QueueLabel = QueueLabel;
//# sourceMappingURL=QueueLabel.js.map
