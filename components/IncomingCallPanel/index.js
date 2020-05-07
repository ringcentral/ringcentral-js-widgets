"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = IncomingCallPanel;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _IncomingCallPad = _interopRequireDefault(require("../IncomingCallPad"));

var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));

var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function UserInfo(props) {
  return _react["default"].createElement("div", {
    className: _styles["default"].userInfo
  }, _react["default"].createElement("div", {
    className: _styles["default"].avatarContainer
  }, _react["default"].createElement("div", {
    className: _styles["default"].avatarHolder
  }, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].ringOutside, _styles["default"].ringing)
  }), _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].ringInner, _styles["default"].ringing)
  }), _react["default"].createElement("div", {
    className: _styles["default"].avatar
  }, _react["default"].createElement(_CallAvatar["default"], {
    avatarUrl: props.avatarUrl
  })))), _react["default"].createElement("div", {
    className: _styles["default"].userNameContainer
  }, props.callQueueName, _react["default"].createElement(_ContactDisplay["default"], {
    className: _styles["default"].userName,
    selectClassName: _styles["default"].dropdown,
    contactMatches: props.nameMatches,
    phoneNumber: props.phoneNumber,
    fallBackName: props.fallBackName,
    currentLocale: props.currentLocale,
    areaCode: props.areaCode,
    countryCode: props.countryCode,
    showType: false,
    selected: props.selectedMatcherIndex,
    onSelectContact: props.onSelectMatcherName,
    isLogging: false,
    enableContactFallback: true,
    brand: props.brand,
    showPlaceholder: props.showContactDisplayPlaceholder,
    sourceIcons: props.sourceIcons,
    phoneTypeRenderer: props.phoneTypeRenderer,
    phoneSourceNameRenderer: props.phoneSourceNameRenderer
  })), _react["default"].createElement("div", {
    className: _styles["default"].userPhoneNumber
  }, props.formatPhone(props.phoneNumber)));
}

UserInfo.propTypes = {
  phoneNumber: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string.isRequired,
  formatPhone: _propTypes["default"].func.isRequired,
  nameMatches: _propTypes["default"].array.isRequired,
  fallBackName: _propTypes["default"].string.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  selectedMatcherIndex: _propTypes["default"].number.isRequired,
  onSelectMatcherName: _propTypes["default"].func.isRequired,
  avatarUrl: _propTypes["default"].string,
  brand: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  callQueueName: _propTypes["default"].string
};
UserInfo.defaultProps = {
  phoneNumber: null,
  avatarUrl: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  callQueueName: null
};

function IncomingCallPanel(props) {
  return _react["default"].createElement("div", {
    "data-sign": "IncomingCallPanel",
    className: (0, _classnames["default"])(_styles["default"].root, props.className)
  }, _react["default"].createElement("span", {
    "data-sign": "backButton",
    className: _styles["default"].backButton,
    onClick: props.onBackButtonClick
  }, _react["default"].createElement("i", {
    className: (0, _classnames["default"])(_DynamicsFont["default"].arrow, _styles["default"].backIcon)
  })), _react["default"].createElement(UserInfo, {
    phoneNumber: props.phoneNumber,
    callQueueName: props.callQueueName,
    currentLocale: props.currentLocale,
    className: _styles["default"].userInfo,
    formatPhone: props.formatPhone,
    nameMatches: props.nameMatches,
    fallBackName: props.fallBackName,
    areaCode: props.areaCode,
    countryCode: props.countryCode,
    selectedMatcherIndex: props.selectedMatcherIndex,
    onSelectMatcherName: props.onSelectMatcherName,
    avatarUrl: props.avatarUrl,
    brand: props.brand,
    showContactDisplayPlaceholder: props.showContactDisplayPlaceholder,
    sourceIcons: props.sourceIcons,
    phoneTypeRenderer: props.phoneTypeRenderer,
    phoneSourceNameRenderer: props.phoneSourceNameRenderer
  }), _react["default"].createElement(_IncomingCallPad["default"], {
    className: _styles["default"].callPad,
    forwardingNumbers: props.forwardingNumbers,
    formatPhone: props.formatPhone,
    answer: props.answer,
    reject: props.reject,
    toVoiceMail: props.toVoiceMail,
    replyWithMessage: props.replyWithMessage,
    onForward: props.onForward,
    currentLocale: props.currentLocale,
    hasOtherActiveCall: props.hasOtherActiveCall,
    answerAndEnd: props.answerAndEnd,
    answerAndHold: props.answerAndHold,
    sessionId: props.sessionId,
    searchContact: props.searchContact,
    searchContactList: props.searchContactList,
    phoneTypeRenderer: props.phoneTypeRenderer,
    phoneSourceNameRenderer: props.phoneSourceNameRenderer
  }), props.children);
}

IncomingCallPanel.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  phoneNumber: _propTypes["default"].string,
  className: _propTypes["default"].string,
  answer: _propTypes["default"].func.isRequired,
  reject: _propTypes["default"].func.isRequired,
  toVoiceMail: _propTypes["default"].func.isRequired,
  replyWithMessage: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].node,
  formatPhone: _propTypes["default"].func.isRequired,
  nameMatches: _propTypes["default"].array.isRequired,
  fallBackName: _propTypes["default"].string.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  selectedMatcherIndex: _propTypes["default"].number.isRequired,
  onSelectMatcherName: _propTypes["default"].func.isRequired,
  avatarUrl: _propTypes["default"].string,
  onBackButtonClick: _propTypes["default"].func.isRequired,
  forwardingNumbers: _propTypes["default"].array.isRequired,
  onForward: _propTypes["default"].func.isRequired,
  brand: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  answerAndEnd: _propTypes["default"].func,
  answerAndHold: _propTypes["default"].func,
  hasOtherActiveCall: _propTypes["default"].bool,
  sessionId: _propTypes["default"].string.isRequired,
  sourceIcons: _propTypes["default"].object,
  searchContactList: _propTypes["default"].array.isRequired,
  searchContact: _propTypes["default"].func.isRequired,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  callQueueName: _propTypes["default"].string
};
IncomingCallPanel.defaultProps = {
  className: null,
  phoneNumber: null,
  children: undefined,
  avatarUrl: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  answerAndEnd: undefined,
  answerAndHold: undefined,
  hasOtherActiveCall: false,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  callQueueName: null
};
//# sourceMappingURL=index.js.map
