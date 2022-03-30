"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireDefault(require("react"));

var _reactVirtualized = require("react-virtualized");

var _CallItem = _interopRequireDefault(require("../CallItem"));

var _NoCalls = _interopRequireDefault(require("../NoCalls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CallListV2 = /*#__PURE__*/function (_React$PureComponent) {
  _inherits(CallListV2, _React$PureComponent);

  var _super = _createSuper(CallListV2);

  function CallListV2(props) {
    var _this;

    _classCallCheck(this, CallListV2);

    _this = _super.call(this, props);

    _this._setExtendedIndex = function (extendedIndex) {
      _this.setState({
        extendedIndex: extendedIndex
      }, function () {
        if (_this._list && _this._list.current) {
          _this._list.current.recomputeRowHeights(0);
        }
      });
    };

    _this._onSizeChanged = function (index) {
      var extendedIndex = _this.state.extendedIndex;

      if (extendedIndex === index) {
        _this._setExtendedIndex(null);
      } else {
        _this._setExtendedIndex(index);
      }
    };

    _this._renderRowHeight = function (_ref) {
      var index = _ref.index;
      // If we don't add extra height for the last item
      // the toggle button will be cut off
      var _this$props = _this.props,
          calls = _this$props.calls,
          extendedRowHeight = _this$props.extendedRowHeight,
          rowHeight = _this$props.rowHeight;
      var extendedIndex = _this.state.extendedIndex;
      var margin = index === calls.length - 1 ? 15 : 0;
      var height = index === extendedIndex ? extendedRowHeight : rowHeight;
      return height + margin;
    };

    _this._rowRender = function (_ref2) {
      var index = _ref2.index,
          key = _ref2.key,
          style = _ref2.style;
      var _this$props2 = _this.props,
          className = _this$props2.className,
          brand = _this$props2.brand,
          currentLocale = _this$props2.currentLocale,
          calls = _this$props2.calls,
          areaCode = _this$props2.areaCode,
          countryCode = _this$props2.countryCode,
          onViewContact = _this$props2.onViewContact,
          onCreateContact = _this$props2.onCreateContact,
          createEntityTypes = _this$props2.createEntityTypes,
          onLogCall = _this$props2.onLogCall,
          onClickToDial = _this$props2.onClickToDial,
          onClickToSms = _this$props2.onClickToSms,
          isLoggedContact = _this$props2.isLoggedContact,
          disableLinks = _this$props2.disableLinks,
          disableCallButton = _this$props2.disableCallButton,
          disableClickToDial = _this$props2.disableClickToDial,
          outboundSmsPermission = _this$props2.outboundSmsPermission,
          internalSmsPermission = _this$props2.internalSmsPermission,
          active = _this$props2.active,
          dateTimeFormatter = _this$props2.dateTimeFormatter,
          loggingMap = _this$props2.loggingMap,
          webphoneAnswer = _this$props2.webphoneAnswer,
          webphoneReject = _this$props2.webphoneReject,
          webphoneHangup = _this$props2.webphoneHangup,
          webphoneResume = _this$props2.webphoneResume,
          enableContactFallback = _this$props2.enableContactFallback,
          autoLog = _this$props2.autoLog,
          showContactDisplayPlaceholder = _this$props2.showContactDisplayPlaceholder,
          sourceIcons = _this$props2.sourceIcons,
          phoneTypeRenderer = _this$props2.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props2.phoneSourceNameRenderer,
          renderContactName = _this$props2.renderContactName,
          renderSubContactName = _this$props2.renderSubContactName,
          renderExtraButton = _this$props2.renderExtraButton,
          contactDisplayStyle = _this$props2.contactDisplayStyle,
          externalViewEntity = _this$props2.externalViewEntity,
          externalHasEntity = _this$props2.externalHasEntity,
          readTextPermission = _this$props2.readTextPermission,
          currentSiteCode = _this$props2.currentSiteCode,
          isMultipleSiteEnabled = _this$props2.isMultipleSiteEnabled,
          showChooseEntityModal = _this$props2.showChooseEntityModal,
          enableCDC = _this$props2.enableCDC;
      var extendedIndex = _this.state.extendedIndex;
      var content;

      if (index >= calls.length) {
        content = /*#__PURE__*/_react["default"].createElement("div", {
          className: className
        }, /*#__PURE__*/_react["default"].createElement(_NoCalls["default"], {
          currentLocale: currentLocale,
          active: active
        }));
      } else {
        var call = calls[index];
        content = /*#__PURE__*/_react["default"].createElement(_CallItem["default"], {
          key: call.id,
          renderIndex: index,
          extended: extendedIndex === index,
          style: style,
          call: call,
          currentLocale: currentLocale,
          currentSiteCode: currentSiteCode,
          isMultipleSiteEnabled: isMultipleSiteEnabled,
          brand: brand,
          areaCode: areaCode,
          countryCode: countryCode,
          onViewContact: onViewContact,
          onCreateContact: onCreateContact,
          createEntityTypes: createEntityTypes,
          onLogCall: onLogCall,
          onClickToDial: onClickToDial,
          onClickToSms: onClickToSms,
          isLoggedContact: isLoggedContact,
          disableLinks: disableLinks,
          disableCallButton: disableCallButton,
          disableClickToDial: disableClickToDial,
          outboundSmsPermission: outboundSmsPermission,
          internalSmsPermission: internalSmsPermission,
          active: active,
          dateTimeFormatter: dateTimeFormatter,
          isLogging: !!loggingMap[call.sessionId],
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
          renderContactName: renderContactName,
          renderSubContactName: renderSubContactName,
          renderExtraButton: renderExtraButton,
          contactDisplayStyle: contactDisplayStyle,
          externalViewEntity: externalViewEntity,
          externalHasEntity: externalHasEntity,
          readTextPermission: readTextPermission,
          onSizeChanged: _this._onSizeChanged // disable animation when rendered with react-virtualized
          ,
          withAnimation: false,
          showChooseEntityModal: showChooseEntityModal,
          enableCDC: enableCDC
        });
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        key: key,
        style: style
      }, content);
    };

    _this.noRowsRender = function () {
      var _this$props3 = _this.props,
          currentLocale = _this$props3.currentLocale,
          active = _this$props3.active;
      return /*#__PURE__*/_react["default"].createElement(_NoCalls["default"], {
        currentLocale: currentLocale,
        active: active
      });
    };

    _this.state = {
      extendedIndex: null
    };
    _this._list = /*#__PURE__*/_react["default"].createRef();
    return _this;
  }

  _createClass(CallListV2, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      var extendedIndex = this.state.extendedIndex;
      var calls = this.props.calls;

      if (extendedIndex !== null && calls[extendedIndex] !== nextProps.calls[extendedIndex]) {
        this._setExtendedIndex(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          width = _this$props4.width,
          height = _this$props4.height,
          calls = _this$props4.calls,
          className = _this$props4.className;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_reactVirtualized.List, {
        style: {
          outline: 'none',
          overflowY: 'auto'
        },
        containerStyle: {
          overflow: 'visible'
        },
        ref: this._list,
        width: width,
        height: height,
        overscanRowCount: 15,
        className: className,
        rowCount: calls.length,
        rowHeight: this._renderRowHeight,
        rowRenderer: this._rowRender,
        noRowsRenderer: this.noRowsRender
      }));
    }
  }]);

  return CallListV2;
}(_react["default"].PureComponent);

CallListV2.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  className: null,
  active: false,
  disableLinks: false,
  disableCallButton: false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  onViewContact: undefined,
  onCreateContact: undefined,
  createEntityTypes: undefined,
  onLogCall: undefined,
  isLoggedContact: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  autoLog: false,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  renderContactName: undefined,
  renderSubContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  rowHeight: 65,
  extendedRowHeight: 130,
  showChooseEntityModal: true,
  enableCDC: false
};
var _default = CallListV2;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
