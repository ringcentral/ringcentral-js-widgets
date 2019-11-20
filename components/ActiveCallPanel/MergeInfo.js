"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _sessionStatus = _interopRequireDefault(require("ringcentral-integration/modules/Webphone/sessionStatus"));

var _calleeTypes = _interopRequireDefault(require("ringcentral-integration/enums/calleeTypes"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _CallAvatar = _interopRequireDefault(require("../CallAvatar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var MergeInfo =
/*#__PURE__*/
function (_Component) {
  _inherits(MergeInfo, _Component);

  function MergeInfo(props) {
    var _this;

    _classCallCheck(this, MergeInfo);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MergeInfo).call(this, props));
    _this.state = {
      lastCallAvatar: null,
      lastCallInfoTimeout: false
    };
    _this.mounted = false;
    return _this;
  }

  _createClass(MergeInfo, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;

      if (this.timeout_clock) {
        clearTimeout(this.timeout_clock);
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      this.mounted = true;
      var _this$props = this.props,
          lastCallInfo = _this$props.lastCallInfo,
          getAvatarUrl = _this$props.getAvatarUrl;

      if (lastCallInfo && !lastCallInfo.avatarUrl && lastCallInfo.lastCallContact) {
        getAvatarUrl(lastCallInfo.lastCallContact).then(function (lastCallAvatar) {
          if (_this2.mounted) {
            _this2.setState({
              lastCallAvatar: lastCallAvatar
            });
          }
        });
      }

      if (lastCallInfo && lastCallInfo.calleeType !== _calleeTypes["default"].conference) {
        var isSimplifiedCallAndLastCallInfoNotReady = !lastCallInfo.name || !lastCallInfo.phoneNumber;

        if (isSimplifiedCallAndLastCallInfoNotReady) {
          this.timeout_clock = setTimeout(function () {
            if (_this2.mounted) {
              _this2.setState({
                lastCallInfoTimeout: true
              });
            }
          }, this.props.checkLastCallInfoTimeout);
        } else if (this.timeout_clock) {
          clearTimeout(this.timeout_clock);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _classnames;

      var _this$props2 = this.props,
          currentLocale = _this$props2.currentLocale,
          timeCounter = _this$props2.timeCounter,
          lastCallInfo = _this$props2.lastCallInfo,
          currentCallTitle = _this$props2.currentCallTitle,
          currentCallAvatarUrl = _this$props2.currentCallAvatarUrl,
          formatPhone = _this$props2.formatPhone;

      if (!lastCallInfo) {
        return _react["default"].createElement("div", {
          className: _styles["default"].userInfo
        });
      }

      var _this$state = this.state,
          lastCallAvatar = _this$state.lastCallAvatar,
          lastCallInfoTimeout = _this$state.lastCallInfoTimeout;
      var isLastCallInfoReady = !!lastCallInfo && (!!lastCallInfo.name || !!lastCallInfo.phoneNumber);
      var isLastCallEnded = lastCallInfo && lastCallInfo.status === _sessionStatus["default"].finished;
      var statusClasses = (0, _classnames2["default"])((_classnames = {}, _defineProperty(_classnames, _styles["default"].callee_status, true), _defineProperty(_classnames, _styles["default"].callee_status_disconnected, !!isLastCallEnded), _classnames));
      var isOnConferenceCall = !!(lastCallInfo && lastCallInfo.calleeType === _calleeTypes["default"].conference);
      var isContacts = !!(lastCallInfo && lastCallInfo.calleeType === _calleeTypes["default"].contacts);
      var calleeName = isContacts ? lastCallInfo.name : formatPhone(lastCallInfo.phoneNumber);

      var loadingText = _i18n["default"].getString('loading');

      var loadingTimeoutText = _i18n["default"].getString('loadingTimeout');

      var showSpinner = !lastCallInfoTimeout && !isLastCallInfoReady && !isOnConferenceCall;
      return _react["default"].createElement("div", {
        className: _styles["default"].mergeInfo
      }, _react["default"].createElement("div", {
        className: _styles["default"].merge_item
      }, _react["default"].createElement("div", {
        className: _styles["default"].callee_avatar
      }, _react["default"].createElement(_CallAvatar["default"], {
        avatarUrl: isContacts && !lastCallInfo.avatarUrl ? lastCallAvatar : lastCallInfo.avatarUrl,
        extraNum: isOnConferenceCall ? lastCallInfo.extraNum : 0,
        isOnConferenceCall: isOnConferenceCall,
        spinnerMode: showSpinner
      })), (isLastCallInfoReady || !isLastCallInfoReady && isOnConferenceCall) && _react["default"].createElement("div", {
        className: _styles["default"].callee_name
      }, isOnConferenceCall ? _react["default"].createElement("span", {
        title: _i18n["default"].getString('conferenceCall', currentLocale)
      }, _i18n["default"].getString('conferenceCall', currentLocale)) : _react["default"].createElement("span", {
        title: calleeName
      }, calleeName)), !isLastCallInfoReady && !isOnConferenceCall && (lastCallInfoTimeout ? _react["default"].createElement("div", {
        className: _styles["default"].last_call_info_load_timeout
      }, _react["default"].createElement("span", {
        title: loadingTimeoutText
      }, loadingTimeoutText)) : _react["default"].createElement("div", {
        className: _styles["default"].callee_name
      }, _react["default"].createElement("span", {
        title: loadingText
      }, loadingText))), (isLastCallInfoReady || !isLastCallInfoReady && isOnConferenceCall) && _react["default"].createElement("div", {
        className: statusClasses
      }, lastCallInfo.status === _sessionStatus["default"].finished ? _i18n["default"].getString('disconnected', currentLocale) : _i18n["default"].getString('onHold', currentLocale))), _react["default"].createElement("div", {
        className: _styles["default"].merge_item_active
      }, _react["default"].createElement("div", {
        className: _styles["default"].callee_avatar_active
      }, currentCallAvatarUrl ? _react["default"].createElement(_CallAvatar["default"], {
        avatarUrl: currentCallAvatarUrl
      }) : _react["default"].createElement(_CallAvatar["default"], {
        avatarUrl: null
      })), _react["default"].createElement("div", {
        className: _styles["default"].callee_name_active
      }, _react["default"].createElement("span", {
        title: currentCallTitle
      }, currentCallTitle)), _react["default"].createElement("div", {
        className: _styles["default"].callee_status_active
      }, timeCounter)));
    }
  }]);

  return MergeInfo;
}(_react.Component);

MergeInfo.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  timeCounter: _propTypes["default"].element.isRequired,
  lastCallInfo: _propTypes["default"].object,
  currentCallTitle: _propTypes["default"].string,
  currentCallAvatarUrl: _propTypes["default"].string,
  formatPhone: _propTypes["default"].func,
  getAvatarUrl: _propTypes["default"].func,
  checkLastCallInfoTimeout: _propTypes["default"].number
};
MergeInfo.defaultProps = {
  lastCallInfo: {
    calleeType: _calleeTypes["default"].unknown
  },
  currentCallTitle: undefined,
  currentCallAvatarUrl: undefined,
  formatPhone: function formatPhone() {
    return null;
  },
  getAvatarUrl: function getAvatarUrl() {
    return null;
  },

  /**
   * The timeout seconds to check if the last call info is received.
   */
  checkLastCallInfoTimeout: 30 * 1000
};
var _default = MergeInfo;
exports["default"] = _default;
//# sourceMappingURL=MergeInfo.js.map
