"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));
var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var CallInfo = function CallInfo(props) {
  var avatar;
  if (props.avatarUrl) {
    avatar = /*#__PURE__*/_react["default"].createElement(_CallAvatar["default"], {
      avatarUrl: props.avatarUrl
    });
  } else {
    // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
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
    formatPhone: props.formatPhone,
    className: _styles["default"].contactDisplay,
    callerIdName: props.callerIdName,
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
    showPlaceholder: props.showContactDisplayPlaceholder
    // @ts-expect-error TS(2322): Type 'object | undefined' is not assignable to typ... Remove this comment to see the full error message
    ,
    sourceIcons: props.sourceIcons,
    phoneTypeRenderer: props.phoneTypeRenderer,
    phoneSourceNameRenderer: props.phoneSourceNameRenderer
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].userPhoneNumber,
    "data-sign": "userPhoneNumber"
  }, props.formatPhone(props.phoneNumber)));
};
CallInfo.defaultProps = {
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  callerIdName: undefined
};
var _default = exports["default"] = CallInfo;
//# sourceMappingURL=CallInfo.js.map
