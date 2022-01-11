"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _errors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageStore/errors"));

var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var MessageStoreAlert = function MessageStoreAlert(props) {
  var message = props.message.message;

  var view = /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString(message, props.currentLocale)); // Handle call record error


  if (message === _errors["default"].deleteFailed) {
    view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, props.currentLocale)
    });
  }

  return view;
};

MessageStoreAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _errors["default"].deleteFailed;
};

var _default = MessageStoreAlert;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
