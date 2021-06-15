"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallInfoBar = CallInfoBar;
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _DurationCounter = _interopRequireDefault(require("../DurationCounter"));

var _Button = require("../Button");

var _CarrouselBar = _interopRequireDefault(require("../CarrouselBar"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function CallInfoBar(_ref) {
  var label = _ref.label,
      onClick = _ref.onClick,
      currentLocale = _ref.currentLocale,
      shouldDisplayViewCallsBtn = _ref.shouldDisplayViewCallsBtn,
      useV2 = _ref.useV2;
  var buttonText = useV2 ? 'view' : 'viewCalls';
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: useV2 ? _styles["default"].callInfoBarV2 : _styles["default"].bar
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].currentCallInfo,
    title: label,
    onClick: onClick
  }, label), shouldDisplayViewCallsBtn ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
    className: _styles["default"].viewCallsBtn,
    tooltip: _i18n["default"].getString(buttonText, currentLocale),
    onClick: onClick
  }, _i18n["default"].getString(buttonText, currentLocale)) : null);
}

CallInfoBar.propTypes = {
  label: _propTypes["default"].string,
  onClick: _propTypes["default"].func,
  currentLocale: _propTypes["default"].string,
  shouldDisplayViewCallsBtn: _propTypes["default"].bool,
  useV2: _propTypes["default"].bool
};
CallInfoBar.defaultProps = {
  label: '',
  onClick: undefined,
  currentLocale: '',
  shouldDisplayViewCallsBtn: false,
  useV2: false
};

var CallMonitorBar = /*#__PURE__*/function (_Component) {
  _inherits(CallMonitorBar, _Component);

  var _super = _createSuper(CallMonitorBar);

  function CallMonitorBar(props) {
    var _this;

    _classCallCheck(this, CallMonitorBar);

    _this = _super.call(this, props);
    _this.state = {
      hoverBar: false
    };

    _this.showBtn = function () {
      if (_this.props.currentCalls.length > 0) {
        _this.setState({
          hoverBar: true
        });
      }
    };

    _this.hideBtn = function () {
      _this.setState({
        hoverBar: false
      });
    };

    return _this;
  }

  _createClass(CallMonitorBar, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          ringingCalls = _this$props.ringingCalls,
          onHoldCalls = _this$props.onHoldCalls,
          currentCalls = _this$props.currentCalls,
          otherDeviceCalls = _this$props.otherDeviceCalls,
          currentLocale = _this$props.currentLocale,
          onCurrentCallBtnClick = _this$props.onCurrentCallBtnClick,
          onViewCallBtnClick = _this$props.onViewCallBtnClick,
          shouldDisplayCurrentCallBtn = _this$props.shouldDisplayCurrentCallBtn,
          shouldDisplayViewCallsBtn = _this$props.shouldDisplayViewCallsBtn,
          shouldHideRingingCallStatus = _this$props.shouldHideRingingCallStatus,
          clickHeaderTrack = _this$props.clickHeaderTrack,
          useV2 = _this$props.useV2;
      var numberOfIncomingCalls = ringingCalls.length;
      var numberOfOnHoldCalls = onHoldCalls.length;
      var numberOfOtherDeviceCalls = otherDeviceCalls.length;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].bar,
        onMouseOver: this.showBtn,
        onMouseLeave: this.hideBtn,
        onClick: clickHeaderTrack
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].box
      }, /*#__PURE__*/_react["default"].createElement(_CarrouselBar["default"], {
        hoverBar: this.state.hoverBar
      }, numberOfOnHoldCalls > 0 ? /*#__PURE__*/_react["default"].createElement(CallInfoBar, {
        label: numberOfOnHoldCalls === 1 ? (0, _formatMessage["default"])(_i18n["default"].getString('callOnHold', currentLocale), {
          numberOf: numberOfOnHoldCalls
        }) : (0, _formatMessage["default"])(_i18n["default"].getString('callsOnHold', currentLocale), {
          numberOf: numberOfOnHoldCalls
        }),
        currentLocale: currentLocale,
        onClick: onViewCallBtnClick,
        shouldDisplayViewCallsBtn: shouldDisplayViewCallsBtn,
        useV2: useV2
      }) : null, !shouldHideRingingCallStatus && numberOfIncomingCalls > 0 ? /*#__PURE__*/_react["default"].createElement(CallInfoBar, {
        label: numberOfIncomingCalls === 1 ? (0, _formatMessage["default"])(_i18n["default"].getString('incomingCall', currentLocale), {
          numberOf: numberOfIncomingCalls
        }) : (0, _formatMessage["default"])(_i18n["default"].getString('incomingCalls', currentLocale), {
          numberOf: numberOfIncomingCalls
        }),
        currentLocale: currentLocale,
        onClick: onViewCallBtnClick,
        shouldDisplayViewCallsBtn: shouldDisplayViewCallsBtn,
        useV2: useV2
      }) : null, numberOfOtherDeviceCalls > 0 ? /*#__PURE__*/_react["default"].createElement(CallInfoBar, {
        label: numberOfOtherDeviceCalls === 1 ? (0, _formatMessage["default"])(_i18n["default"].getString('otherDeviceCall', currentLocale), {
          numberOf: numberOfOtherDeviceCalls
        }) : (0, _formatMessage["default"])(_i18n["default"].getString('otherDeviceCalls', currentLocale), {
          numberOf: numberOfOtherDeviceCalls
        }),
        currentLocale: currentLocale,
        onClick: onViewCallBtnClick,
        shouldDisplayViewCallsBtn: shouldDisplayViewCallsBtn,
        useV2: useV2
      }) : null, currentCalls.length > 0 ? /*#__PURE__*/_react["default"].createElement("div", {
        className: useV2 ? _styles["default"].callInfoBarV2 : _styles["default"].bar
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "callDuration",
        className: _styles["default"].duration,
        onClick: onCurrentCallBtnClick
      }, /*#__PURE__*/_react["default"].createElement(_DurationCounter["default"], {
        startTime: currentCalls[0].startTime
      })), shouldDisplayCurrentCallBtn && onCurrentCallBtnClick ? /*#__PURE__*/_react["default"].createElement(_Button.Button, {
        dataSign: "currentCallButton",
        className: _styles["default"].currentCallBtn,
        onClick: onCurrentCallBtnClick
      }, _i18n["default"].getString('currentCall', currentLocale)) : null) : null)));
    }
  }]);

  return CallMonitorBar;
}(_react.Component);

exports["default"] = CallMonitorBar;
CallMonitorBar.propTypes = {
  ringingCalls: _propTypes["default"].array,
  currentCalls: _propTypes["default"].array,
  onHoldCalls: _propTypes["default"].array,
  otherDeviceCalls: _propTypes["default"].array,
  currentLocale: _propTypes["default"].string.isRequired,
  onCurrentCallBtnClick: _propTypes["default"].func,
  onViewCallBtnClick: _propTypes["default"].func,
  shouldDisplayCurrentCallBtn: _propTypes["default"].bool,
  shouldDisplayViewCallsBtn: _propTypes["default"].bool,
  shouldHideRingingCallStatus: _propTypes["default"].bool,
  clickHeaderTrack: _propTypes["default"].func,
  useV2: _propTypes["default"].bool
};
CallMonitorBar.defaultProps = {
  ringingCalls: [],
  currentCalls: [],
  onHoldCalls: [],
  otherDeviceCalls: [],
  onCurrentCallBtnClick: undefined,
  onViewCallBtnClick: undefined,
  shouldDisplayCurrentCallBtn: false,
  shouldDisplayViewCallsBtn: false,
  shouldHideRingingCallStatus: false,
  clickHeaderTrack: function clickHeaderTrack() {},
  useV2: false
};
//# sourceMappingURL=index.js.map
