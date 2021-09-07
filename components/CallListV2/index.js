"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactVirtualized = require("react-virtualized");

var _CallItem = _interopRequireDefault(require("../CallItem"));

var _NoCalls = _interopRequireDefault(require("../NoCalls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
      if (_this.state.extendedIndex === index) {
        _this._setExtendedIndex(null);
      } else {
        _this._setExtendedIndex(index);
      }
    };

    _this._renderRowHeight = function (_ref) {
      var index = _ref.index;
      // If we don't add extra height for the last item
      // the toggle button will be cut off
      var margin = index === _this.props.calls.length - 1 ? 15 : 0;
      var rowHeight = index === _this.state.extendedIndex ? _this.props.extendedRowHeight : _this.props.rowHeight;
      return rowHeight + margin;
    };

    _this._rowRender = function (_ref2) {
      var index = _ref2.index,
          key = _ref2.key,
          style = _ref2.style;
      var _this$props = _this.props,
          className = _this$props.className,
          brand = _this$props.brand,
          currentLocale = _this$props.currentLocale,
          calls = _this$props.calls,
          areaCode = _this$props.areaCode,
          countryCode = _this$props.countryCode,
          onViewContact = _this$props.onViewContact,
          onCreateContact = _this$props.onCreateContact,
          createEntityTypes = _this$props.createEntityTypes,
          onLogCall = _this$props.onLogCall,
          onClickToDial = _this$props.onClickToDial,
          onClickToSms = _this$props.onClickToSms,
          isLoggedContact = _this$props.isLoggedContact,
          disableLinks = _this$props.disableLinks,
          disableCallButton = _this$props.disableCallButton,
          disableClickToDial = _this$props.disableClickToDial,
          outboundSmsPermission = _this$props.outboundSmsPermission,
          internalSmsPermission = _this$props.internalSmsPermission,
          active = _this$props.active,
          dateTimeFormatter = _this$props.dateTimeFormatter,
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
          renderContactName = _this$props.renderContactName,
          renderExtraButton = _this$props.renderExtraButton,
          contactDisplayStyle = _this$props.contactDisplayStyle,
          externalViewEntity = _this$props.externalViewEntity,
          externalHasEntity = _this$props.externalHasEntity,
          readTextPermission = _this$props.readTextPermission,
          currentSiteCode = _this$props.currentSiteCode,
          isMultipleSiteEnabled = _this$props.isMultipleSiteEnabled,
          showChooseEntityModal = _this$props.showChooseEntityModal,
          enableCDC = _this$props.enableCDC;
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
          extended: _this.state.extendedIndex === index,
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
      var _this$props2 = _this.props,
          currentLocale = _this$props2.currentLocale,
          active = _this$props2.active;
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

      if (extendedIndex !== null && this.props.calls[extendedIndex] !== nextProps.calls[extendedIndex]) {
        this._setExtendedIndex(null);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props,
          width = _this$props3.width,
          height = _this$props3.height,
          calls = _this$props3.calls,
          className = _this$props3.className;
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

exports["default"] = CallListV2;
CallListV2.propTypes = {
  currentSiteCode: _propTypes["default"].string,
  isMultipleSiteEnabled: _propTypes["default"].bool,
  className: _propTypes["default"].string,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  brand: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  calls: _propTypes["default"].arrayOf(_CallItem["default"].propTypes.call).isRequired,
  active: _propTypes["default"].bool,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  onViewContact: _propTypes["default"].func,
  onCreateContact: _propTypes["default"].func,
  createEntityTypes: _propTypes["default"].array,
  onLogCall: _propTypes["default"].func,
  onClickToDial: _propTypes["default"].func,
  onClickToSms: _propTypes["default"].func,
  isLoggedContact: _propTypes["default"].func,
  loggingMap: _propTypes["default"].object,
  disableLinks: _propTypes["default"].bool,
  disableCallButton: _propTypes["default"].bool,
  disableClickToDial: _propTypes["default"].bool,
  outboundSmsPermission: _propTypes["default"].bool,
  internalSmsPermission: _propTypes["default"].bool,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  webphoneAnswer: _propTypes["default"].func,
  webphoneReject: _propTypes["default"].func,
  webphoneHangup: _propTypes["default"].func,
  webphoneResume: _propTypes["default"].func,
  enableContactFallback: _propTypes["default"].bool,
  autoLog: _propTypes["default"].bool,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  renderContactName: _propTypes["default"].func,
  renderExtraButton: _propTypes["default"].func,
  contactDisplayStyle: _propTypes["default"].string,
  externalViewEntity: _propTypes["default"].func,
  externalHasEntity: _propTypes["default"].func,
  readTextPermission: _propTypes["default"].bool,
  rowHeight: _propTypes["default"].number,
  extendedRowHeight: _propTypes["default"].number,
  showChooseEntityModal: _propTypes["default"].bool,
  enableCDC: _propTypes["default"].bool
};
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
//# sourceMappingURL=index.js.map
