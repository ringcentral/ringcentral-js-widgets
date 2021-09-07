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
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _CallItem = _interopRequireDefault(require("../CallItem"));

var _NoCalls = _interopRequireDefault(require("../NoCalls"));

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

var CallList = /*#__PURE__*/function (_PureComponent) {
  _inherits(CallList, _PureComponent);

  var _super = _createSuper(CallList);

  function CallList() {
    _classCallCheck(this, CallList);

    return _super.apply(this, arguments);
  }

  _createClass(CallList, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          className = _this$props.className,
          brand = _this$props.brand,
          currentLocale = _this$props.currentLocale,
          currentSiteCode = _this$props.currentSiteCode,
          isMultipleSiteEnabled = _this$props.isMultipleSiteEnabled,
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
          enableCDC = _this$props.enableCDC;

      if (calls && calls.length) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: className
        }, calls.map(function (call, index) {
          return /*#__PURE__*/_react["default"].createElement(_CallItem["default"], {
            key: call.id,
            call: call,
            renderIndex: index,
            currentLocale: currentLocale,
            brand: brand,
            areaCode: areaCode,
            countryCode: countryCode,
            currentSiteCode: currentSiteCode,
            isMultipleSiteEnabled: isMultipleSiteEnabled,
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
            enableCDC: enableCDC
          });
        }));
      }

      return /*#__PURE__*/_react["default"].createElement("div", {
        className: className
      }, /*#__PURE__*/_react["default"].createElement(_NoCalls["default"], {
        currentLocale: currentLocale,
        active: active
      }));
    }
  }]);

  return CallList;
}(_react.PureComponent);

exports["default"] = CallList;
CallList.propTypes = {
  className: _propTypes["default"].string,
  brand: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  currentSiteCode: _propTypes["default"].string,
  isMultipleSiteEnabled: _propTypes["default"].bool,
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
  enableCDC: _propTypes["default"].bool
};
CallList.defaultProps = {
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
  enableCDC: false
};
//# sourceMappingURL=index.js.map
