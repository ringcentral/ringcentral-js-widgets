"use strict";

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

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

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

var _di = require("ringcentral-integration/lib/di");

var _ramda = require("ramda");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _countryNames = _interopRequireDefault(require("../../lib/countryNames"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var ConferenceUI = (_dec = (0, _di.Module)({
  name: 'ConferenceUI',
  deps: ['Conference', 'RegionSettings', 'Locale', 'ComposeText', 'ExtensionInfo', 'Brand', 'Alert', 'RouterInteraction', 'Call']
}), _dec(_class =
/*#__PURE__*/
function (_RcUIModule) {
  _inherits(ConferenceUI, _RcUIModule);

  function ConferenceUI(_ref) {
    var _this;

    var conference = _ref.conference,
        regionSettings = _ref.regionSettings,
        locale = _ref.locale,
        composeText = _ref.composeText,
        extensionInfo = _ref.extensionInfo,
        brand = _ref.brand,
        alert = _ref.alert,
        routerInteraction = _ref.routerInteraction,
        call = _ref.call,
        options = _objectWithoutProperties(_ref, ["conference", "regionSettings", "locale", "composeText", "extensionInfo", "brand", "alert", "routerInteraction", "call"]);

    _classCallCheck(this, ConferenceUI);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConferenceUI).call(this, _objectSpread({}, options)));
    _this._conference = conference;
    _this._regionSettings = regionSettings;
    _this._locale = locale;
    _this._composeText = composeText;
    _this._extensionInfo = extensionInfo;
    _this._brand = brand;
    _this._alert = alert;
    _this._routerInteraction = routerInteraction;
    _this._call = call;
    return _this;
  }

  _createClass(ConferenceUI, [{
    key: "getDialInNumbers",
    value: function getDialInNumbers(phoneNumbers) {
      var _this2 = this;

      var countryCounter = (0, _ramda.reduce)(function (acc, item) {
        if (!acc[item.country.isoCode]) {
          acc[item.country.isoCode] = 1;
        } else {
          acc[item.country.isoCode] += 1;
        }

        return acc;
      }, {}, phoneNumbers);
      return (0, _ramda.map)(function (item) {
        var countryName = _countryNames["default"].getString(item.country.isoCode, _this2._locale.currentLocale); // only show the provinces of canada


        return {
          region: countryCounter[item.country.isoCode] > 1 ? "".concat(countryName, ", ").concat(item.location) : countryName,
          phoneNumber: item.phoneNumber
        };
      }, phoneNumbers);
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _ref2 = this._conference.data || {},
          _ref2$hostCode = _ref2.hostCode,
          hostCode = _ref2$hostCode === void 0 ? '' : _ref2$hostCode,
          _ref2$participantCode = _ref2.participantCode,
          participantCode = _ref2$participantCode === void 0 ? '' : _ref2$participantCode,
          _ref2$allowJoinBefore = _ref2.allowJoinBeforeHost,
          allowJoinBeforeHost = _ref2$allowJoinBefore === void 0 ? false : _ref2$allowJoinBefore,
          _ref2$phoneNumbers = _ref2.phoneNumbers,
          phoneNumbers = _ref2$phoneNumbers === void 0 ? [] : _ref2$phoneNumbers;

      return {
        dialInNumbers: this.getDialInNumbers(phoneNumbers),
        dialInNumber: this._conference.dialInNumber || '',
        hostCode: hostCode,
        participantCode: participantCode,
        allowJoinBeforeHost: allowJoinBeforeHost,
        additionalNumbers: this._conference.additionalNumbers,
        disableTxtBtn: (!this.serviceFeatures.SMS || !this.serviceFeatures.SMS.enabled) && (!this.serviceFeatures.Pager || !this.serviceFeatures.Pager.enabled),
        countryCode: this._regionSettings.countryCode,
        areaCode: this._regionSettings.areaCode,
        currentLocale: this._locale.currentLocale,
        brand: {
          code: this._brand.code,
          name: this._brand.name
        },
        showSpinner: !(this._conference.ready && this._regionSettings.ready && this._locale.ready && this._composeText.ready),
        showSaveAsDefault: this._conference.showSaveAsDefault
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref3) {
      var _this3 = this;

      var _ref3$enableAutoEnter = _ref3.enableAutoEnterHostKey,
          enableAutoEnterHostKey = _ref3$enableAutoEnter === void 0 ? false : _ref3$enableAutoEnter;
      return {
        alert: function alert(msg) {
          _this3._alert.warning({
            message: msg
          });
        },
        updateDialInNumber: function updateDialInNumber(dialInNumber) {
          _this3._conference.updateDialInNumber(dialInNumber);
        },
        updateAdditionalNumbers: function updateAdditionalNumbers(additionalDialInNumbers) {
          _this3._conference.updateAdditionalNumbers(additionalDialInNumbers);
        },
        inviteWithText: function inviteWithText(text) {
          _this3._composeText.updateMessageText(text); // for track


          _this3._conference.onInviteWithText();

          _this3._routerInteraction.push('/composeText'); // update settings

        },
        joinAsHost: function joinAsHost(dialInNumber) {
          // for track
          _this3._conference.onJoinAsHost();

          _this3._routerInteraction.history.push('/dialer');

          var theDialInNumber = dialInNumber || _this3._conference.dialInNumber;
          var phoneNumber = enableAutoEnterHostKey ? "".concat(theDialInNumber, ",,").concat(_this3._conference.data.hostCode, "#") : theDialInNumber;

          _this3._call.call({
            phoneNumber: phoneNumber
          });
        },
        onAllowJoinBeforeHostChange: function onAllowJoinBeforeHostChange(allowJoinBeforeHost) {
          _this3._conference.updateEnableJoinBeforeHost(allowJoinBeforeHost);
        },
        showHelpCommands: function showHelpCommands() {
          _this3._routerInteraction.push('/conference/commands');
        }
      };
    }
  }, {
    key: "serviceFeatures",
    get: function get() {
      return this._extensionInfo.serviceFeatures;
    }
  }]);

  return ConferenceUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = ConferenceUI;
//# sourceMappingURL=index.js.map
