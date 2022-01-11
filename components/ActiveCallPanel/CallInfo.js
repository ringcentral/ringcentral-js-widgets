"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));

var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var CallInfo = function CallInfo(props) {
  var avatar;

  if (props.avatarUrl) {
    avatar = /*#__PURE__*/_react["default"].createElement(_CallAvatar["default"], {
      avatarUrl: props.avatarUrl
    });
  } else {
    avatar = /*#__PURE__*/_react["default"].createElement(_CallAvatar["default"], {
      avatarUrl: null
    });
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].userInfo
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].avatarContainer
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].avatar,
    "data-sign": "avatar"
  }, avatar)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].userName
  }, props.callQueueName, /*#__PURE__*/_react["default"].createElement(_ContactDisplay["default"], {
    className: _styles["default"].contactDisplay,
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
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].userPhoneNumber,
    "data-sign": "userPhoneNumber"
  }, props.formatPhone(props.phoneNumber)));
};

CallInfo.defaultProps = {
  phoneNumber: null,
  avatarUrl: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  callQueueName: null
};
var _default = CallInfo;
exports["default"] = _default;
//# sourceMappingURL=CallInfo.js.map
