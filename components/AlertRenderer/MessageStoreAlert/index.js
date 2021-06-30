"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = MessageStoreAlert;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _errors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageStore/errors"));

var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function MessageStoreAlert(props) {
  var message = props.message.message;

  var view = /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString(message, props.currentLocale)); // Handle call record error


  if (message === _errors["default"].deleteFailed) {
    view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, props.currentLocale)
    });
  }

  return view;
}

MessageStoreAlert.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  message: _propTypes["default"].shape({
    message: _propTypes["default"].string.isRequired
  }).isRequired
};

MessageStoreAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _errors["default"].deleteFailed;
};
//# sourceMappingURL=index.js.map
