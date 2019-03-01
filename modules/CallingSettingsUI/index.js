"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _di = require("ringcentral-integration/lib/di");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var CallingSettingsUI = (_dec = (0, _di.Module)({
  name: 'CallingSettingsUI',
  deps: ['CallingSettings', 'Brand', 'Locale', {
    dep: 'Webphone',
    optional: true
  }, 'RouterInteraction']
}), _dec(_class =
/*#__PURE__*/
function (_RcUIModule) {
  _inherits(CallingSettingsUI, _RcUIModule);

  function CallingSettingsUI(_ref) {
    var _this;

    var callingSettings = _ref.callingSettings,
        brand = _ref.brand,
        locale = _ref.locale,
        webphone = _ref.webphone,
        routerInteraction = _ref.routerInteraction,
        options = _ref.options;

    _classCallCheck(this, CallingSettingsUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallingSettingsUI).call(this, _objectSpread({}, options)));
    _this._callingSettings = callingSettings;
    _this._brand = brand;
    _this._locale = locale;
    _this._webphone = webphone;
    _this._routerInteraction = routerInteraction;
    return _this;
  }

  _createClass(CallingSettingsUI, [{
    key: "getUIProps",
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
    key: "showSpinner",
    get: function get() {
      return !(this._callingSettings.ready && this._brand.ready && this._locale.ready && (!this._webphone || this._webphone.ready) && this._routerInteraction.ready);
    }
  }]);

  return CallingSettingsUI;
}(_RcUIModule2.default)) || _class);
exports.default = CallingSettingsUI;
//# sourceMappingURL=index.js.map
