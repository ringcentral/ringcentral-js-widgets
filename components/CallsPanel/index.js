"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _debounce = _interopRequireDefault(require("ringcentral-integration/lib/debounce"));

require("core-js/fn/array/find");

var _Header = _interopRequireDefault(require("../Header"));

var _Panel = _interopRequireDefault(require("../Panel"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

var _CallList = _interopRequireDefault(require("../CallList"));

var _CallListV = _interopRequireDefault(require("../CallListV2"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var HEADER_HEIGHT = 38;

var CallsPanel =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(CallsPanel, _React$PureComponent);

  function CallsPanel(props) {
    var _this;

    _classCallCheck(this, CallsPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallsPanel).call(this, props));
    _this._onResize = (0, _debounce.default)(function () {
      if (_this._mounted) {
        _this._calculateContentSize();
      }
    }, 300);
    _this.state = {
      contentHeight: 0,
      contentWidth: 0
    };
    _this._mounted = false;
    _this._listWrapper = _react.default.createRef();
    return _this;
  }

  _createClass(CallsPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;

      this._calculateContentSize();

      window.addEventListener('resize', this._onResize);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: "_calculateContentSize",
    value: function _calculateContentSize() {
      if (this._listWrapper && this._listWrapper.current && this._listWrapper.current.getBoundingClientRect) {
        var react = this._listWrapper.current.getBoundingClientRect();

        this.setState({
          contentHeight: react.bottom - react.top - HEADER_HEIGHT,
          contentWidth: react.right - react.left
        });
        return;
      }

      this.setState({
        contentHeight: 0,
        contentWidth: 0
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          brand = _this$props.brand,
          currentLocale = _this$props.currentLocale,
          calls = _this$props.calls,
          areaCode = _this$props.areaCode,
          countryCode = _this$props.countryCode,
          onViewContact = _this$props.onViewContact,
          onCreateContact = _this$props.onCreateContact,
          onLogCall = _this$props.onLogCall,
          onClickToDial = _this$props.onClickToDial,
          onClickToSms = _this$props.onClickToSms,
          isLoggedContact = _this$props.isLoggedContact,
          disableLinks = _this$props.disableLinks,
          disableClickToDial = _this$props.disableClickToDial,
          outboundSmsPermission = _this$props.outboundSmsPermission,
          internalSmsPermission = _this$props.internalSmsPermission,
          dateTimeFormatter = _this$props.dateTimeFormatter,
          showSpinner = _this$props.showSpinner,
          title = _this$props.title,
          active = _this$props.active,
          loggingMap = _this$props.loggingMap,
          webphoneAnswer = _this$props.webphoneAnswer,
          webphoneReject = _this$props.webphoneReject,
          webphoneHangup = _this$props.webphoneHangup,
          webphoneResume = _this$props.webphoneResume,
          enableContactFallback = _this$props.enableContactFallback,
          autoLog = _this$props.autoLog,
          showContactDisplayPlaceholder = _this$props.showContactDisplayPlaceholder,
          sourceIcons = _this$props.sourceIcons,
          phoneTypeRenderer = _this$props.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props.phoneSourceNameRenderer,
          useNewList = _this$props.useNewList;
      var callsListView = useNewList ? _react.default.createElement(_CallListV.default, {
        brand: brand,
        currentLocale: currentLocale,
        calls: calls,
        areaCode: areaCode,
        countryCode: countryCode,
        onViewContact: onViewContact,
        onCreateContact: onCreateContact,
        onLogCall: onLogCall,
        onClickToDial: onClickToDial,
        onClickToSms: onClickToSms,
        isLoggedContact: isLoggedContact,
        disableLinks: disableLinks,
        disableClickToDial: disableClickToDial,
        outboundSmsPermission: outboundSmsPermission,
        internalSmsPermission: internalSmsPermission,
        dateTimeFormatter: dateTimeFormatter,
        active: active,
        loggingMap: loggingMap,
        webphoneAnswer: webphoneAnswer,
        webphoneReject: webphoneReject,
        webphoneHangup: webphoneHangup,
        webphoneResume: webphoneResume,
        enableContactFallback: enableContactFallback,
        autoLog: autoLog,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        width: this.state.contentWidth,
        height: this.state.contentHeight,
        useNewList: useNewList
      }) : _react.default.createElement(_CallList.default, {
        brand: brand,
        currentLocale: currentLocale,
        calls: calls,
        areaCode: areaCode,
        countryCode: countryCode,
        onViewContact: onViewContact,
        onCreateContact: onCreateContact,
        onLogCall: onLogCall,
        onClickToDial: onClickToDial,
        onClickToSms: onClickToSms,
        isLoggedContact: isLoggedContact,
        disableLinks: disableLinks,
        disableClickToDial: disableClickToDial,
        outboundSmsPermission: outboundSmsPermission,
        internalSmsPermission: internalSmsPermission,
        dateTimeFormatter: dateTimeFormatter,
        active: active,
        loggingMap: loggingMap,
        webphoneAnswer: webphoneAnswer,
        webphoneReject: webphoneReject,
        webphoneHangup: webphoneHangup,
        webphoneResume: webphoneResume,
        enableContactFallback: enableContactFallback,
        autoLog: autoLog,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer
      });
      var content = showSpinner ? _react.default.createElement(_SpinnerOverlay.default, null) : callsListView;
      return _react.default.createElement("div", {
        className: _styles.default.root,
        ref: this._listWrapper
      }, _react.default.createElement(_Header.default, null, title), _react.default.createElement(_Panel.default, {
        className: _styles.default.content
      }, content));
    }
  }]);

  return CallsPanel;
}(_react.default.PureComponent);

exports.default = CallsPanel;
CallsPanel.propTypes = {
  brand: _propTypes.default.string.isRequired,
  currentLocale: _propTypes.default.string.isRequired,
  calls: _propTypes.default.arrayOf(_propTypes.default.any).isRequired,
  areaCode: _propTypes.default.string.isRequired,
  countryCode: _propTypes.default.string.isRequired,
  onViewContact: _propTypes.default.func,
  onCreateContact: _propTypes.default.func,
  onClickToDial: _propTypes.default.func,
  onClickToSms: _propTypes.default.func,
  onLogCall: _propTypes.default.func,
  isLoggedContact: _propTypes.default.func,
  disableLinks: _propTypes.default.bool.isRequired,
  disableClickToDial: _propTypes.default.bool,
  outboundSmsPermission: _propTypes.default.bool,
  internalSmsPermission: _propTypes.default.bool,
  dateTimeFormatter: _propTypes.default.func.isRequired,
  showSpinner: _propTypes.default.bool,
  title: _propTypes.default.string,
  active: _propTypes.default.bool,
  loggingMap: _propTypes.default.object,
  webphoneAnswer: _propTypes.default.func,
  webphoneReject: _propTypes.default.func,
  webphoneHangup: _propTypes.default.func,
  webphoneResume: _propTypes.default.func,
  enableContactFallback: _propTypes.default.bool,
  autoLog: _propTypes.default.bool,
  showContactDisplayPlaceholder: _propTypes.default.bool,
  sourceIcons: _propTypes.default.object,
  phoneTypeRenderer: _propTypes.default.func,
  phoneSourceNameRenderer: _propTypes.default.func,
  useNewList: _propTypes.default.bool
};
CallsPanel.defaultProps = {
  onViewContact: undefined,
  onCreateContact: undefined,
  onLogCall: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  showSpinner: false,
  title: '',
  active: false,
  isLoggedContact: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  useNewList: false
};
//# sourceMappingURL=index.js.map
