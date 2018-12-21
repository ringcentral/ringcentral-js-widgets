'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _dec, _class;

var _di = require('ringcentral-integration/lib/di');

var _callingOptions = require('ringcentral-integration/modules/CallingSettings/callingOptions');

var _callingOptions2 = _interopRequireDefault(_callingOptions);

var _RcUIModule2 = require('../../lib/RcUIModule');

var _RcUIModule3 = _interopRequireDefault(_RcUIModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AudioSettingsUI = (_dec = (0, _di.Module)({
  name: 'AudioSettingsUI',
  deps: ['AudioSettings', 'Locale', 'CallingSettings', 'RouterInteraction', { dep: 'Webphone', optional: true }]
}), _dec(_class = function (_RcUIModule) {
  (0, _inherits3.default)(AudioSettingsUI, _RcUIModule);

  function AudioSettingsUI(_ref) {
    var audioSettings = _ref.audioSettings,
        locale = _ref.locale,
        callingSettings = _ref.callingSettings,
        routerInteraction = _ref.routerInteraction,
        webphone = _ref.webphone,
        options = (0, _objectWithoutProperties3.default)(_ref, ['audioSettings', 'locale', 'callingSettings', 'routerInteraction', 'webphone']);
    (0, _classCallCheck3.default)(this, AudioSettingsUI);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AudioSettingsUI.__proto__ || (0, _getPrototypeOf2.default)(AudioSettingsUI)).call(this, (0, _extends3.default)({}, options)));

    _this._audioSettings = audioSettings;
    _this._locale = locale;
    _this._callingSettings = callingSettings;
    _this._routerInteraction = routerInteraction;
    _this._webphone = webphone;
    return _this;
  }

  (0, _createClass3.default)(AudioSettingsUI, [{
    key: 'getUIProps',
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
        isWebRTC: this._callingSettings.callWith === _callingOptions2.default.browser,
        outputDeviceDisabled: !this._audioSettings.availableOutputDevices.length,
        inputDeviceDisabled: !!(!this._audioSettings.availableInputDevices.length || this._webphone && this._webphone.sessions.length > 0)
      };
    }
  }, {
    key: 'getUIFunctions',
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
}(_RcUIModule3.default)) || _class);
exports.default = AudioSettingsUI;
//# sourceMappingURL=index.js.map
