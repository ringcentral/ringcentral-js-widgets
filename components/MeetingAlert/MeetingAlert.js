"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MeetingAlert = void 0;

var _react = _interopRequireDefault(require("react"));

var _Alert = require("@ringcentral/juno/es6/components/Alert/Alert.js");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MeetingAlert = function MeetingAlert(_ref) {
  var content = _ref.content,
      severity = _ref.severity;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].wrapper
  }, /*#__PURE__*/_react["default"].createElement(_Alert.RcAlert, {
    severity: severity,
    className: _styles["default"].alert
  }, content));
};

exports.MeetingAlert = MeetingAlert;
//# sourceMappingURL=MeetingAlert.js.map
