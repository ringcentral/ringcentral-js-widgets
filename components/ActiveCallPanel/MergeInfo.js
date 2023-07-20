"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/web.timers");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames2 = _interopRequireDefault(require("classnames"));
var _calleeTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/calleeTypes"));
var _sessionStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Webphone/sessionStatus"));
var _CallAvatar = require("../CallAvatar");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var MergeInfo = /*#__PURE__*/function (_Component) {
  _inherits(MergeInfo, _Component);
  var _super = _createSuper(MergeInfo);
  function MergeInfo(props) {
    var _this;
    _classCallCheck(this, MergeInfo);
    _this = _super.call(this, props);
    _this.mounted = void 0;
    _this.timeout_clock = void 0;
    _this.state = {
      lastCallAvatar: null,
      lastCallInfoTimeout: false
    };
    _this.mounted = false;
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(MergeInfo, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.mounted = false;
      if (this.timeout_clock) {
        clearTimeout(this.timeout_clock);
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;
      this.mounted = true;
      var _this$props = this.props,
        lastCallInfo = _this$props.lastCallInfo,
        getAvatarUrl = _this$props.getAvatarUrl;
      if (lastCallInfo &&
      // @ts-expect-error TS(2339): Property 'avatarUrl' does not exist on type 'objec... Remove this comment to see the full error message
      !lastCallInfo.avatarUrl &&
      // @ts-expect-error TS(2339): Property 'lastCallContact' does not exist on type ... Remove this comment to see the full error message
      lastCallInfo.lastCallContact) {
        // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
        getAvatarUrl(lastCallInfo.lastCallContact).then(function (lastCallAvatar) {
          if (_this2.mounted) {
            _this2.setState({
              lastCallAvatar: lastCallAvatar
            });
          }
        });
      }
      // @ts-expect-error TS(2339): Property 'calleeType' does not exist on type 'obje... Remove this comment to see the full error message
      if (lastCallInfo && lastCallInfo.calleeType !== _calleeTypes["default"].conference) {
        var isSimplifiedCallAndLastCallInfoNotReady =
        // @ts-expect-error TS(2339): Property 'name' does not exist on type 'object'.
        !lastCallInfo.name || !lastCallInfo.phoneNumber;
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
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].userInfo
        });
      }
      var _this$state = this.state,
        lastCallAvatar = _this$state.lastCallAvatar,
        lastCallInfoTimeout = _this$state.lastCallInfoTimeout;
      var isLastCallInfoReady =
      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'object'.
      !!lastCallInfo && (!!lastCallInfo.name || !!lastCallInfo.phoneNumber);
      var isLastCallEnded =
      // @ts-expect-error TS(2339): Property 'status' does not exist on type 'object'.
      lastCallInfo && lastCallInfo.status === _sessionStatus["default"].finished;
      var statusClasses = (0, _classnames2["default"])((_classnames = {}, _defineProperty(_classnames, _styles["default"].callee_status, true), _defineProperty(_classnames, _styles["default"].callee_status_disconnected, !!isLastCallEnded), _classnames));
      var isOnConferenceCall = !!(
      // @ts-expect-error TS(2339): Property 'calleeType' does not exist on type 'obje... Remove this comment to see the full error message
      lastCallInfo && lastCallInfo.calleeType === _calleeTypes["default"].conference);
      var isContacts = !!(
      // @ts-expect-error TS(2339): Property 'calleeType' does not exist on type 'obje... Remove this comment to see the full error message
      lastCallInfo && lastCallInfo.calleeType === _calleeTypes["default"].contacts);
      var calleeName = isContacts ?
      // @ts-expect-error TS(2339): Property 'name' does not exist on type 'object'.
      lastCallInfo.name :
      // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
      formatPhone(lastCallInfo.phoneNumber);
      var loadingText = _i18n["default"].getString('loading');
      var loadingTimeoutText = _i18n["default"].getString('loadingTimeout');
      var showSpinner = !lastCallInfoTimeout && !isLastCallInfoReady && !isOnConferenceCall;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].mergeInfo,
        "data-sign": "mergeInfo"
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].merge_item
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callee_avatar
      }, /*#__PURE__*/_react["default"].createElement(_CallAvatar.CallAvatar, {
        avatarUrl:
        // @ts-expect-error TS(2339): Property 'avatarUrl' does not exist on type 'objec... Remove this comment to see the full error message
        isContacts && !lastCallInfo.avatarUrl ? lastCallAvatar :
        // @ts-expect-error TS(2339): Property 'avatarUrl' does not exist on type 'objec... Remove this comment to see the full error message
        lastCallInfo.avatarUrl
        // @ts-expect-error TS(2339): Property 'extraNum' does not exist on type 'object... Remove this comment to see the full error message
        ,
        extraNum: isOnConferenceCall ? lastCallInfo.extraNum : 0,
        isOnConferenceCall: isOnConferenceCall,
        spinnerMode: showSpinner
      })), (isLastCallInfoReady || !isLastCallInfoReady && isOnConferenceCall) && /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callee_name
      }, isOnConferenceCall ? /*#__PURE__*/_react["default"].createElement("span", {
        title: _i18n["default"].getString('conferenceCall', currentLocale)
      }, _i18n["default"].getString('conferenceCall', currentLocale)) : /*#__PURE__*/_react["default"].createElement("span", {
        title: calleeName
      }, calleeName)), !isLastCallInfoReady && !isOnConferenceCall && (lastCallInfoTimeout ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].last_call_info_load_timeout
      }, /*#__PURE__*/_react["default"].createElement("span", {
        title: loadingTimeoutText
      }, loadingTimeoutText)) : /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callee_name
      }, /*#__PURE__*/_react["default"].createElement("span", {
        title: loadingText
      }, loadingText))), (isLastCallInfoReady || !isLastCallInfoReady && isOnConferenceCall) && /*#__PURE__*/_react["default"].createElement("div", {
        className: statusClasses
      }, lastCallInfo.status === _sessionStatus["default"].finished ? _i18n["default"].getString('disconnected', currentLocale) : _i18n["default"].getString('onHold', currentLocale))), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].merge_item_active
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callee_avatar_active
      }, currentCallAvatarUrl ? /*#__PURE__*/_react["default"].createElement(_CallAvatar.CallAvatar, {
        avatarUrl: currentCallAvatarUrl
      }) :
      /*#__PURE__*/
      // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
      _react["default"].createElement(_CallAvatar.CallAvatar, {
        avatarUrl: null
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callee_name_active,
        "data-sign": "activeCalleeName"
      }, /*#__PURE__*/_react["default"].createElement("span", {
        title: currentCallTitle
      }, currentCallTitle)), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].callee_status_active
      }, timeCounter)));
    }
  }]);
  return MergeInfo;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
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
