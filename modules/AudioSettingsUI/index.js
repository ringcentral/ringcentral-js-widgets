"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

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

require("core-js/modules/es6.object.set-prototype-of");

var _di = require("ringcentral-integration/lib/di");

var _callingOptions = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingOptions"));

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AudioSettingsUI = (_dec = (0, _di.Module)({
  name: 'AudioSettingsUI',
  deps: ['AudioSettings', 'Locale', 'CallingSettings', 'RouterInteraction', {
    dep: 'Webphone',
    optional: true
  }]
}), _dec(_class =
/*#__PURE__*/
function (_RcUIModule) {
  _inherits(AudioSettingsUI, _RcUIModule);

  function AudioSettingsUI(_ref) {
    var _this;

    var audioSettings = _ref.audioSettings,
        locale = _ref.locale,
        callingSettings = _ref.callingSettings,
        routerInteraction = _ref.routerInteraction,
        webphone = _ref.webphone,
        options = _objectWithoutProperties(_ref, ["audioSettings", "locale", "callingSettings", "routerInteraction", "webphone"]);

    _classCallCheck(this, AudioSettingsUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AudioSettingsUI).call(this, _objectSpread({}, options)));
    _this._audioSettings = audioSettings;
    _this._locale = locale;
    _this._callingSettings = callingSettings;
    _this._routerInteraction = routerInteraction;
    _this._webphone = webphone;
    return _this;
  }

  _createClass(AudioSettingsUI, [{
    key: "getUIProps",
    value: function getUIProps() {
      return {
        currentLocale: this._locale.currentLocale,
        dialButtonVolume: this._audioSettings.dialButtonVolume,
        dialButtonMuted: this._audioSettings.dialButtonMuted,
        ringtoneVolume: this._audioSettings.ringtoneVolume,
        ringtoneMuted: this._audioSettings.ringtoneMuted,
        callVolume: this._audioSettings.callVolume,
        availableInputDevices: this._audioSettings.availableInputDevices,
        inputDeviceId: this._audioSettings.inputDeviceId,
        availableOutputDevices: this._audioSettings.availableOutputDevices,
        outputDeviceId: this._audioSettings.outputDeviceId,
        supportDevices: this._audioSettings.supportDevices,
        userMedia: this._audioSettings.userMedia,
        isWebRTC: this._callingSettings.callWith === _callingOptions["default"].browser,
        outputDeviceDisabled: !this._audioSettings.availableOutputDevices.length,
        inputDeviceDisabled: !!(!this._audioSettings.availableInputDevices.length || this._webphone && this._webphone.sessions.length > 0)
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
        onSave: function onSave(data) {
          return _this2._audioSettings.setData(data);
        },
        checkUserMedia: function checkUserMedia() {
          return _this2._audioSettings.getUserMedia();
        }
      };
    }
  }]);

  return AudioSettingsUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = AudioSettingsUI;
//# sourceMappingURL=index.js.map
