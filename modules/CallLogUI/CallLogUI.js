"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallLogUI = exports.CallLogUIBase = void 0;

require("core-js/modules/es6.regexp.match");

var _core = require("@ringcentral-integration/core");

var _react = _interopRequireDefault(require("react"));

var _di = require("ringcentral-integration/lib/di");

var _formatNumber = _interopRequireDefault(require("ringcentral-integration/lib/formatNumber"));

var _callingOptions = require("ringcentral-integration/modules/CallingSettingsV2/callingOptions");

var _CallLogCallCtrlContainer = _interopRequireDefault(require("../../containers/CallLogCallCtrlContainer"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _dec, _class, _dec2, _class2;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var CallLogCallControlRenderer = function CallLogCallControlRenderer(currentLocale, telephonySessionId, isWide, isCurrentDeviceCall) {
  return /*#__PURE__*/_react["default"].createElement(_CallLogCallCtrlContainer["default"], {
    currentLocale: currentLocale,
    telephonySessionId: telephonySessionId,
    isCurrentDeviceCall: isCurrentDeviceCall,
    isWide: isWide
  });
};

var CallLogUIBase = (_dec = (0, _di.Module)({
  name: 'CallLogUI',
  deps: ['Locale', 'CallLogger', 'RateLimiter', 'RegionSettings', 'DateTimeFormat', 'CallLogSection', 'RouterInteraction', 'ActiveCallControl', 'ExtensionFeatures', 'ConnectivityMonitor', 'CallingSettings', 'ForwardingNumber', {
    dep: 'CallLogUIOptions',
    optional: true
  }]
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(CallLogUIBase, _RcUIModuleV);

  var _super = _createSuper(CallLogUIBase);

  function CallLogUIBase(_ref) {
    var deps = _ref.deps,
        options = _objectWithoutProperties(_ref, ["deps"]);

    _classCallCheck(this, CallLogUIBase);

    return _super.call(this, _objectSpread({
      deps: deps
    }, options));
  }

  _createClass(CallLogUIBase, [{
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_deps = this._deps,
          locale = _this$_deps.locale,
          callLogger = _this$_deps.callLogger,
          rateLimiter = _this$_deps.rateLimiter,
          regionSettings = _this$_deps.regionSettings,
          dateTimeFormat = _this$_deps.dateTimeFormat,
          callLogSection = _this$_deps.callLogSection,
          routerInteraction = _this$_deps.routerInteraction,
          activeCallControl = _this$_deps.activeCallControl,
          extensionFeatures = _this$_deps.extensionFeatures,
          connectivityMonitor = _this$_deps.connectivityMonitor,
          callingSettings = _this$_deps.callingSettings,
          forwardingNumber = _this$_deps.forwardingNumber;
      var currentNotificationIdentify = callLogSection.currentNotificationIdentify,
          currentIdentify = callLogSection.currentIdentify;
      var isInTransferPage = routerInteraction.currentPath.match('^/transfer/') !== null;
      return {
        currentLocale: locale.currentLocale,
        header: true,
        showSpinner: !(locale.ready && regionSettings.ready && dateTimeFormat.ready && extensionFeatures.ready && (!callLogger || callLogger.ready)),
        isInTransferPage: isInTransferPage,
        disableLinks: !connectivityMonitor.connectivity || rateLimiter.throttling,
        currentIdentify: currentIdentify,
        // notification props
        currentNotificationIdentify: currentNotificationIdentify,
        currentSession: activeCallControl.getActiveSession(activeCallControl.sessionIdToTelephonySessionIdMapping[currentNotificationIdentify]),
        activeSession: activeCallControl.activeSession,
        isWebRTC: callingSettings.callWith === _callingOptions.callingOptions.browser,
        forwardingNumbers: forwardingNumber.forwardingNumbers
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this$_deps2 = this._deps,
          regionSettings = _this$_deps2.regionSettings,
          callLogSection = _this$_deps2.callLogSection,
          locale = _this$_deps2.locale,
          activeCallControl = _this$_deps2.activeCallControl,
          routerInteraction = _this$_deps2.routerInteraction;
      return {
        formatPhone: function formatPhone(phoneNumber) {
          return (0, _formatNumber["default"])({
            phoneNumber: phoneNumber,
            areaCode: regionSettings.areaCode,
            countryCode: regionSettings.countryCode
          }) || _i18n["default"].getString('unknown', locale.currentLocale);
        },
        goBack: function goBack() {
          callLogSection.closeLogSection();
          callLogSection.closeLogNotification();
        },
        renderCallLogCallControl: function renderCallLogCallControl(telephonySessionId, isWide, isCurrentDeviceCall) {
          return CallLogCallControlRenderer(locale.currentLocale, telephonySessionId, isWide, isCurrentDeviceCall);
        },
        // notification props
        onSaveNotification: function onSaveNotification() {
          return callLogSection.saveAndHandleNotification();
        },
        onDiscardNotification: function onDiscardNotification() {
          return callLogSection.discardAndHandleNotification();
        },
        onCloseNotification: function onCloseNotification() {
          return callLogSection.closeLogNotification();
        },
        onExpandNotification: function onExpandNotification() {
          return callLogSection.expandLogNotification();
        },
        onReject: function onReject(sessionId) {
          var telephonySessionId = activeCallControl.sessionIdToTelephonySessionIdMapping[sessionId];
          return activeCallControl.reject(telephonySessionId);
        },
        onHangup: function onHangup(sessionId) {
          var telephonySessionId = activeCallControl.sessionIdToTelephonySessionIdMapping[sessionId];
          return activeCallControl.hangUp(telephonySessionId);
        },
        onIgnore: function onIgnore(telephonySessionId) {
          var _activeCallControl$ig;

          (_activeCallControl$ig = activeCallControl.ignore) === null || _activeCallControl$ig === void 0 ? void 0 : _activeCallControl$ig.call(activeCallControl, telephonySessionId);
          callLogSection.closeLogNotification();
        },
        onForward: function onForward(phoneNumber, telephonySessionId) {
          if (phoneNumber === 'custom') {
            routerInteraction.push("/forward/".concat(telephonySessionId));
          } else {
            var _activeCallControl$fo;

            (_activeCallControl$fo = activeCallControl.forward) === null || _activeCallControl$fo === void 0 ? void 0 : _activeCallControl$fo.call(activeCallControl, phoneNumber, telephonySessionId);
            callLogSection.closeLogNotification();
          }
        },
        endAndAnswer: function endAndAnswer(telephonySessionId) {
          var _activeCallControl$an;

          (_activeCallControl$an = activeCallControl.answerAndEnd) === null || _activeCallControl$an === void 0 ? void 0 : _activeCallControl$an.call(activeCallControl, telephonySessionId);
          callLogSection.discardAndHandleNotification();
        },
        holdAndAnswer: function holdAndAnswer(telephonySessionId) {
          var _activeCallControl$an2;

          (_activeCallControl$an2 = activeCallControl.answerAndHold) === null || _activeCallControl$an2 === void 0 ? void 0 : _activeCallControl$an2.call(activeCallControl, telephonySessionId);
          callLogSection.discardAndHandleNotification();
        },
        toVoicemail: function toVoicemail(telephonySessionId) {
          activeCallControl.reject(telephonySessionId);
          callLogSection.closeLogNotification();
        },
        answer: function answer(telephonySessionId) {
          var _activeCallControl$an3;

          (_activeCallControl$an3 = activeCallControl.answer) === null || _activeCallControl$an3 === void 0 ? void 0 : _activeCallControl$an3.call(activeCallControl, telephonySessionId);
          callLogSection.discardAndHandleNotification();
        },
        clickForwardTrack: function clickForwardTrack() {
          var _activeCallControl$cl;

          return (_activeCallControl$cl = activeCallControl.clickForwardTrack) === null || _activeCallControl$cl === void 0 ? void 0 : _activeCallControl$cl.call(activeCallControl);
        }
      };
    }
  }]);

  return CallLogUIBase;
}(_core.RcUIModuleV2)) || _class);
exports.CallLogUIBase = CallLogUIBase;
var CallLogUI = (_dec2 = (0, _di.Module)(), _dec2(_class2 = /*#__PURE__*/function (_CallLogUIBase) {
  _inherits(CallLogUI, _CallLogUIBase);

  var _super2 = _createSuper(CallLogUI);

  function CallLogUI(deps) {
    _classCallCheck(this, CallLogUI);

    return _super2.call(this, {
      deps: deps
    });
  }

  return CallLogUI;
}(CallLogUIBase)) || _class2);
exports.CallLogUI = CallLogUI;
//# sourceMappingURL=CallLogUI.js.map
