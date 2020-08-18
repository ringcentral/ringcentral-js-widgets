"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CallingSettingsUI = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

var _di = require("ringcentral-integration/lib/di");

var _callingOptions = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingOptions"));

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

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

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CallingSettingsUI = (_dec = (0, _di.Module)({
  name: 'CallingSettingsUI',
  deps: ['CallingSettings', 'Brand', 'Locale', {
    dep: 'Webphone',
    optional: true
  }, 'RouterInteraction', {
    dep: 'CallingSettingsUIOptions',
    optional: true
  }]
}), _dec(_class = (_temp = /*#__PURE__*/function (_RcUIModule) {
  _inherits(CallingSettingsUI, _RcUIModule);

  var _super = _createSuper(CallingSettingsUI);

  function CallingSettingsUI(_ref) {
    var _this;

    var callingSettings = _ref.callingSettings,
        brand = _ref.brand,
        locale = _ref.locale,
        webphone = _ref.webphone,
        routerInteraction = _ref.routerInteraction,
        _ref$locationSearchab = _ref.locationSearchable,
        locationSearchable = _ref$locationSearchab === void 0 ? true : _ref$locationSearchab,
        _ref$ringtoneSettings = _ref.ringtoneSettings,
        ringtoneSettings = _ref$ringtoneSettings === void 0 ? false : _ref$ringtoneSettings,
        options = _objectWithoutProperties(_ref, ["callingSettings", "brand", "locale", "webphone", "routerInteraction", "locationSearchable", "ringtoneSettings"]);

    _classCallCheck(this, CallingSettingsUI);

    _this = _super.call(this, _objectSpread({}, options));
    _this._callingSettings = void 0;
    _this._brand = void 0;
    _this._locale = void 0;
    _this._webphone = void 0;
    _this._routerInteraction = void 0;
    _this._locationSearchable = void 0;
    _this._ringtoneSettings = void 0;
    _this._callingSettings = callingSettings;
    _this._brand = brand;
    _this._locale = locale;
    _this._webphone = webphone;
    _this._routerInteraction = routerInteraction;
    _this._locationSearchable = locationSearchable;
    _this._ringtoneSettings = ringtoneSettings;
    return _this;
  }

  _createClass(CallingSettingsUI, [{
    key: "getUIProps",
    value: function getUIProps() {
      var _this$_webphone, _this$_webphone2, _this$_webphone3, _this$_webphone4, _this$_webphone5, _this$_webphone6, _this$_webphone7, _this$_webphone8;

      return {
        brandCode: this._brand.code,
        brandName: this._brand.name,
        currentLocale: this._locale.currentLocale,
        callWithOptions: this._callingSettings.callWithOptions,
        callWith: this._callingSettings.callWith,
        myLocation: this._callingSettings.myLocation,
        ringoutPrompt: this._callingSettings.ringoutPrompt,
        defaultRingoutPrompt: this._callingSettings.defaultRingoutPrompt,
        availableNumbersWithLabel: this._callingSettings.availableNumbersWithLabel,
        disabled: !!(this._webphone && this._webphone.sessions.length > 0),
        showSpinner: this.showSpinner,
        locationSearchable: this.locationSearchable,
        showRingToneSettings: this._ringtoneSettings && this._callingSettings.isChangeRingToneAllowed,
        incomingAudioFile: (_this$_webphone = this._webphone) === null || _this$_webphone === void 0 ? void 0 : _this$_webphone.incomingAudioFile,
        incomingAudio: (_this$_webphone2 = this._webphone) === null || _this$_webphone2 === void 0 ? void 0 : _this$_webphone2.incomingAudio,
        outgoingAudioFile: (_this$_webphone3 = this._webphone) === null || _this$_webphone3 === void 0 ? void 0 : _this$_webphone3.outgoingAudioFile,
        outgoingAudio: (_this$_webphone4 = this._webphone) === null || _this$_webphone4 === void 0 ? void 0 : _this$_webphone4.outgoingAudio,
        defaultIncomingAudioFile: (_this$_webphone5 = this._webphone) === null || _this$_webphone5 === void 0 ? void 0 : _this$_webphone5.defaultIncomingAudioFile,
        defaultIncomingAudio: (_this$_webphone6 = this._webphone) === null || _this$_webphone6 === void 0 ? void 0 : _this$_webphone6.defaultIncomingAudio,
        defaultOutgoingAudioFile: (_this$_webphone7 = this._webphone) === null || _this$_webphone7 === void 0 ? void 0 : _this$_webphone7.outgoingAudioFile,
        defaultOutgoingAudio: (_this$_webphone8 = this._webphone) === null || _this$_webphone8 === void 0 ? void 0 : _this$_webphone8.outgoingAudio
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions() {
      var _this2 = this;

      return {
        onBackButtonClick: function onBackButtonClick() {
          return _this2._routerInteraction.goBack();
        },
        onSave: function onSave(_ref2) {
          var callWith = _ref2.callWith,
              myLocation = _ref2.myLocation,
              ringoutPrompt = _ref2.ringoutPrompt,
              isCustomLocation = _ref2.isCustomLocation,
              incomingAudio = _ref2.incomingAudio,
              incomingAudioFile = _ref2.incomingAudioFile,
              outgoingAudio = _ref2.outgoingAudio,
              outgoingAudioFile = _ref2.outgoingAudioFile;

          _this2._callingSettings.setData({
            callWith: callWith,
            myLocation: myLocation,
            ringoutPrompt: ringoutPrompt,
            isCustomLocation: isCustomLocation
          }, true);

          if (_this2._webphone && callWith === _callingOptions["default"].browser) {
            _this2._webphone.setRingtone({
              incomingAudio: incomingAudio,
              incomingAudioFile: incomingAudioFile,
              outgoingAudio: outgoingAudio,
              outgoingAudioFile: outgoingAudioFile
            });
          }
        }
      };
    }
  }, {
    key: "showSpinner",
    get: function get() {
      return !(this._callingSettings.ready && this._brand.ready && this._locale.ready && (!this._webphone || this._webphone.ready) && this._routerInteraction.ready);
    }
  }, {
    key: "locationSearchable",
    get: function get() {
      return !!this._locationSearchable;
    }
  }]);

  return CallingSettingsUI;
}(_RcUIModule2["default"]), _temp)) || _class);
exports.CallingSettingsUI = CallingSettingsUI;
//# sourceMappingURL=CallingSettingsUI.js.map
