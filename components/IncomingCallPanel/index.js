"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _CallAvatar = require("../CallAvatar");
var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));
var _IncomingCallPad = _interopRequireDefault(require("../IncomingCallPad"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// TODO: fix that props type when full refactor ready
var UserInfo = function UserInfo(_ref) {
  var avatarUrl = _ref.avatarUrl,
    callQueueName = _ref.callQueueName,
    nameMatches = _ref.nameMatches,
    phoneNumber = _ref.phoneNumber,
    fallBackName = _ref.fallBackName,
    currentLocale = _ref.currentLocale,
    areaCode = _ref.areaCode,
    callerIdName = _ref.callerIdName,
    countryCode = _ref.countryCode,
    selectedMatcherIndex = _ref.selectedMatcherIndex,
    onSelectMatcherName = _ref.onSelectMatcherName,
    _ref$brand = _ref.brand,
    brand = _ref$brand === void 0 ? 'RingCentral' : _ref$brand,
    _ref$showContactDispl = _ref.showContactDisplayPlaceholder,
    showContactDisplayPlaceholder = _ref$showContactDispl === void 0 ? true : _ref$showContactDispl,
    sourceIcons = _ref.sourceIcons,
    phoneTypeRenderer = _ref.phoneTypeRenderer,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
    formatPhone = _ref.formatPhone;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].userInfo
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].avatarContainer
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].avatarHolder
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].ringOutside, _styles["default"].ringing)
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].ringInner, _styles["default"].ringing)
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].avatar,
    "data-sign": "avatar"
  }, /*#__PURE__*/_react["default"].createElement(_CallAvatar.CallAvatar, {
    avatarUrl: avatarUrl
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].userNameContainer
  }, callQueueName, /*#__PURE__*/_react["default"].createElement(_ContactDisplay["default"], {
    callerIdName: callerIdName,
    className: _styles["default"].userName,
    selectClassName: _styles["default"].dropdown,
    contactMatches: nameMatches,
    phoneNumber: phoneNumber,
    fallBackName: fallBackName,
    currentLocale: currentLocale,
    areaCode: areaCode,
    countryCode: countryCode,
    showType: false,
    selected: selectedMatcherIndex,
    onSelectContact: onSelectMatcherName,
    isLogging: false,
    enableContactFallback: true,
    brand: brand,
    showPlaceholder: showContactDisplayPlaceholder,
    sourceIcons: sourceIcons
    // @ts-expect-error TS(2322): Type '{ name: any; className: string; selectClassN... Remove this comment to see the full error message
    ,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].userPhoneNumber,
    "data-sign": "userPhoneNumber"
  }, formatPhone(phoneNumber)));
};
var IncomingCallPanel = function IncomingCallPanel(_ref2) {
  var className = _ref2.className,
    onBackButtonClick = _ref2.onBackButtonClick,
    phoneNumber = _ref2.phoneNumber,
    callQueueName = _ref2.callQueueName,
    currentLocale = _ref2.currentLocale,
    formatPhone = _ref2.formatPhone,
    nameMatches = _ref2.nameMatches,
    fallBackName = _ref2.fallBackName,
    areaCode = _ref2.areaCode,
    countryCode = _ref2.countryCode,
    selectedMatcherIndex = _ref2.selectedMatcherIndex,
    onSelectMatcherName = _ref2.onSelectMatcherName,
    avatarUrl = _ref2.avatarUrl,
    _ref2$brand = _ref2.brand,
    brand = _ref2$brand === void 0 ? 'RingCentral' : _ref2$brand,
    showContactDisplayPlaceholder = _ref2.showContactDisplayPlaceholder,
    sourceIcons = _ref2.sourceIcons,
    phoneTypeRenderer = _ref2.phoneTypeRenderer,
    phoneSourceNameRenderer = _ref2.phoneSourceNameRenderer,
    forwardingNumbers = _ref2.forwardingNumbers,
    answer = _ref2.answer,
    reject = _ref2.reject,
    toVoiceMail = _ref2.toVoiceMail,
    replyWithMessage = _ref2.replyWithMessage,
    onForward = _ref2.onForward,
    hasOtherActiveCall = _ref2.hasOtherActiveCall,
    answerAndEnd = _ref2.answerAndEnd,
    answerAndHold = _ref2.answerAndHold,
    sessionId = _ref2.sessionId,
    searchContact = _ref2.searchContact,
    searchContactList = _ref2.searchContactList,
    children = _ref2.children,
    callerIdName = _ref2.callerIdName;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "IncomingCallPanel",
    className: (0, _clsx["default"])(_styles["default"].root, className)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    "data-sign": "backButton",
    className: _styles["default"].backButton,
    onClick: onBackButtonClick
  }, /*#__PURE__*/_react["default"].createElement("i", {
    className: (0, _clsx["default"])(_DynamicsFont["default"].arrow, _styles["default"].backIcon)
  })), /*#__PURE__*/_react["default"].createElement(UserInfo, {
    callerIdName: callerIdName,
    phoneNumber: phoneNumber,
    callQueueName: callQueueName,
    currentLocale: currentLocale,
    className: _styles["default"].userInfo,
    formatPhone: formatPhone,
    nameMatches: nameMatches,
    fallBackName: fallBackName,
    areaCode: areaCode,
    countryCode: countryCode,
    selectedMatcherIndex: selectedMatcherIndex,
    onSelectMatcherName: onSelectMatcherName,
    avatarUrl: avatarUrl,
    brand: brand,
    showContactDisplayPlaceholder: showContactDisplayPlaceholder,
    sourceIcons: sourceIcons,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer
  }), /*#__PURE__*/_react["default"].createElement(_IncomingCallPad["default"], {
    className: _styles["default"].callPad,
    forwardingNumbers: forwardingNumbers,
    formatPhone: formatPhone,
    answer: answer,
    reject: reject,
    toVoiceMail: toVoiceMail,
    replyWithMessage: replyWithMessage,
    onForward: onForward,
    currentLocale: currentLocale,
    hasOtherActiveCall: hasOtherActiveCall,
    answerAndEnd: answerAndEnd,
    answerAndHold: answerAndHold,
    sessionId: sessionId,
    searchContact: searchContact,
    searchContactList: searchContactList,
    phoneTypeRenderer: phoneTypeRenderer,
    phoneSourceNameRenderer: phoneSourceNameRenderer
  }), children);
};
var _default = exports["default"] = /*#__PURE__*/(0, _react.memo)(IncomingCallPanel);
//# sourceMappingURL=index.js.map
