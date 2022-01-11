"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _messages = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Conference/messages"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ConferenceAlert = function ConferenceAlert(props) {
  var msg = _i18n["default"].getString(props.message.message, props.currentLocale);

  return /*#__PURE__*/_react["default"].createElement("span", null, msg);
};

ConferenceAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _messages["default"].requireAdditionalNumbers || message === _messages["default"].scheduledSuccess;
};

var _default = ConferenceAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
