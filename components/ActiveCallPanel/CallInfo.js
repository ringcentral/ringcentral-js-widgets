"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = CallInfo;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function CallInfo(props) {
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
    className: _styles["default"].avatar
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
}

CallInfo.propTypes = {
  phoneNumber: _propTypes["default"].string,
  formatPhone: _propTypes["default"].func.isRequired,
  nameMatches: _propTypes["default"].array.isRequired,
  fallBackName: _propTypes["default"].string.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
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
//# sourceMappingURL=CallInfo.js.map
