"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _MessageStore = require("@ringcentral-integration/commons/modules/MessageStore");
var _react = _interopRequireDefault(require("react"));
var _FormattedMessage = _interopRequireDefault(require("../../FormattedMessage"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var MessageStoreAlert = function MessageStoreAlert(props) {
  var message = props.message.message;
  var view = /*#__PURE__*/_react["default"].createElement("span", null, _i18n["default"].getString(message, props.currentLocale));
  // Handle call record error
  if (message === _MessageStore.messageStoreErrors.deleteFailed) {
    view = /*#__PURE__*/_react["default"].createElement(_FormattedMessage["default"], {
      message: _i18n["default"].getString(message, props.currentLocale)
    });
  }
  return view;
};
// @ts-expect-error TS(2339): Property 'handleMessage' does not exist on type 'S... Remove this comment to see the full error message
MessageStoreAlert.handleMessage = function (_ref) {
  var message = _ref.message;
  return message === _MessageStore.messageStoreErrors.deleteFailed;
};
var _default = exports["default"] = MessageStoreAlert;
//# sourceMappingURL=index.js.map
