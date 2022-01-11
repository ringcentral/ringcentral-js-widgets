"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationIcon = void 0;

var _react = _interopRequireDefault(require("react"));

var _messageDirection = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageDirection"));

var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));

var _ComposeText = _interopRequireDefault(require("../../assets/images/ComposeText.svg"));

var _FaxInbound = _interopRequireDefault(require("../../assets/images/FaxInbound.svg"));

var _FaxOutbound = _interopRequireDefault(require("../../assets/images/FaxOutbound.svg"));

var _GroupConversation = _interopRequireDefault(require("../../assets/images/GroupConversation.svg"));

var _VoicemailIcon = _interopRequireDefault(require("../../assets/images/VoicemailIcon.svg"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ConversationIcon = function ConversationIcon(_ref) {
  var group = _ref.group,
      type = _ref.type,
      currentLocale = _ref.currentLocale,
      direction = _ref.direction;
  var title;
  var icon;

  switch (type) {
    case _messageTypes["default"].voiceMail:
      title = _i18n["default"].getString(_messageTypes["default"].voiceMail, currentLocale);
      icon = /*#__PURE__*/_react["default"].createElement(_VoicemailIcon["default"], {
        width: 23,
        className: _styles["default"].icon
      });
      break;

    case _messageTypes["default"].fax:
      title = _i18n["default"].getString(_messageTypes["default"].fax, currentLocale);
      icon = direction === _messageDirection["default"].inbound ? /*#__PURE__*/_react["default"].createElement(_FaxInbound["default"], {
        width: 21,
        className: _styles["default"].icon
      }) : /*#__PURE__*/_react["default"].createElement(_FaxOutbound["default"], {
        width: 21,
        className: _styles["default"].icon
      });
      break;

    default:
      title = group ? _i18n["default"].getString('groupConversation', currentLocale) : _i18n["default"].getString('conversation', currentLocale);
      icon = group ? /*#__PURE__*/_react["default"].createElement(_GroupConversation["default"], {
        width: 19,
        className: _styles["default"].icon
      }) : /*#__PURE__*/_react["default"].createElement(_ComposeText["default"], {
        width: 18,
        className: _styles["default"].icon
      });
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].conversationIcon
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: title
  }, icon));
};

exports.ConversationIcon = ConversationIcon;
ConversationIcon.defaultProps = {
  group: false,
  type: undefined,
  currentLocale: undefined,
  direction: undefined
};
//# sourceMappingURL=ConversationIcon.js.map
