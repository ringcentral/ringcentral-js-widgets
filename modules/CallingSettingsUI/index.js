'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

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

var _RcUIModule2 = require('../../lib/RcUIModule');

var _RcUIModule3 = _interopRequireDefault(_RcUIModule2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallingSettingsUI = (_dec = (0, _di.Module)({
  name: 'CallingSettingsUI',
  deps: ['CallingSettings', 'Brand', 'Locale', { dep: 'Webphone', optional: true }, 'RouterInteraction']
}), _dec(_class = function (_RcUIModule) {
  (0, _inherits3.default)(CallingSettingsUI, _RcUIModule);

  function CallingSettingsUI(_ref) {
    var callingSettings = _ref.callingSettings,
        brand = _ref.brand,
        locale = _ref.locale,
        webphone = _ref.webphone,
        routerInteraction = _ref.routerInteraction,
        options = _ref.options;
    (0, _classCallCheck3.default)(this, CallingSettingsUI);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallingSettingsUI.__proto__ || (0, _getPrototypeOf2.default)(CallingSettingsUI)).call(this, (0, _extends3.default)({}, options)));

    _this._callingSettings = callingSettings;
    _this._brand = brand;
    _this._locale = locale;
    _this._webphone = webphone;
    _this._routerInteraction = routerInteraction;
    return _this;
  }

  (0, _createClass3.default)(CallingSettingsUI, [{
    key: 'getUIProps',
    value: function getUIProps() {
      return {
        brand: this._brand.fullName,
        currentLocale: this._locale.currentLocale,
        callWithOptions: this._callingSettings.callWithOptions,
        callWith: this._callingSettings.callWith,
        myLocation: this._callingSettings.myLocation,
        ringoutPrompt: this._callingSettings.ringoutPrompt,
        availableNumbers: this._callingSettings.availableNumbers,
        disabled: !!(this._webphone && this._webphone.sessions.length > 0),
        showSpinner: this.showSpinner
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
        onSave: function onSave(_ref2) {
          var callWith = _ref2.callWith,
              myLocation = _ref2.myLocation,
              ringoutPrompt = _ref2.ringoutPrompt;
          return _this2._callingSettings.setData({
            callWith: callWith,
            myLocation: myLocation,
            ringoutPrompt: ringoutPrompt
          }, true);
        }
      };
    }
  }, {
    key: 'showSpinner',
    get: function get() {
      return !(this._callingSettings.ready && this._brand.ready && this._locale.ready && (!this._webphone || this._webphone.ready) && this._routerInteraction.ready);
    }
  }]);
  return CallingSettingsUI;
}(_RcUIModule3.default)) || _class);
exports.default = CallingSettingsUI;
//# sourceMappingURL=index.js.map
