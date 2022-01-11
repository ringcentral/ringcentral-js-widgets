"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.reduce");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConferenceUI = void 0;

require("core-js/modules/es6.function.name");

var _ramda = require("ramda");

var _di = require("@ringcentral-integration/commons/lib/di");

var _core = require("@ringcentral-integration/core");

var _countryNames = _interopRequireDefault(require("../../lib/countryNames"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } Object.defineProperty(subClass, "prototype", { value: Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }), writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ConferenceUI = (_dec = (0, _di.Module)({
  name: 'ConferenceUI',
  deps: ['Conference', 'RegionSettings', 'Locale', 'ComposeText', 'AppFeatures', 'Brand', 'Alert', 'RouterInteraction', 'Call']
}), _dec(_class = /*#__PURE__*/function (_RcUIModuleV) {
  _inherits(ConferenceUI, _RcUIModuleV);

  var _super = _createSuper(ConferenceUI);

  function ConferenceUI(deps) {
    _classCallCheck(this, ConferenceUI);

    return _super.call(this, {
      deps: deps
    });
  } // TODO: add type


  _createClass(ConferenceUI, [{
    key: "getDialInNumbers",
    value: function getDialInNumbers(phoneNumbers) {
      var _this = this;

      var countryCounter = (0, _ramda.reduce)(function (acc, item) {
        if (!acc[item.country.isoCode]) {
          acc[item.country.isoCode] = 1;
        } else {
          acc[item.country.isoCode] += 1;
        }

        return acc;
      }, {}, phoneNumbers);
      return (0, _ramda.map)(function (item) {
        var countryName = _countryNames["default"].getString(item.country.isoCode, _this._deps.locale.currentLocale); // only show the provinces of canada


        return {
          region: countryCounter[item.country.isoCode] > 1 ? "".concat(countryName, ", ").concat(item.location) : countryName,
          phoneNumber: item.phoneNumber
        };
      }, phoneNumbers);
    }
  }, {
    key: "getUIProps",
    value: function getUIProps() {
      var _ref = this._deps.conference.data || {},
          _ref$hostCode = _ref.hostCode,
          hostCode = _ref$hostCode === void 0 ? '' : _ref$hostCode,
          _ref$participantCode = _ref.participantCode,
          participantCode = _ref$participantCode === void 0 ? '' : _ref$participantCode,
          _ref$allowJoinBeforeH = _ref.allowJoinBeforeHost,
          allowJoinBeforeHost = _ref$allowJoinBeforeH === void 0 ? false : _ref$allowJoinBeforeH,
          _ref$phoneNumbers = _ref.phoneNumbers,
          phoneNumbers = _ref$phoneNumbers === void 0 ? [] : _ref$phoneNumbers;

      return {
        dialInNumbers: this.getDialInNumbers(phoneNumbers),
        dialInNumber: this._deps.conference.dialInNumber || '',
        hostCode: hostCode,
        participantCode: participantCode,
        allowJoinBeforeHost: allowJoinBeforeHost,
        additionalNumbers: this._deps.conference.additionalNumbers,
        disableTxtBtn: !this._deps.appFeatures.hasComposeTextPermission,
        countryCode: this._deps.regionSettings.countryCode,
        areaCode: this._deps.regionSettings.areaCode,
        currentLocale: this._deps.locale.currentLocale,
        brandName: this._deps.brand.name,
        dialInNumbersLink: this._deps.brand.brandConfig.conference.dialInNumbersLink,
        conferenceInviteText: this._deps.brand.brandConfig.conference.inviteText,
        showSpinner: !(this._deps.conference.ready && this._deps.regionSettings.ready && this._deps.locale.ready && this._deps.composeText.ready),
        showSaveAsDefault: this._deps.conference.showSaveAsDefault
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _this2 = this;

      var _ref2$enableAutoEnter = _ref2.enableAutoEnterHostKey,
          enableAutoEnterHostKey = _ref2$enableAutoEnter === void 0 ? false : _ref2$enableAutoEnter;
      return {
        alert: function alert(msg) {
          _this2._deps.alert.warning({
            message: msg
          });
        },
        updateDialInNumber: function updateDialInNumber(dialInNumber) {
          _this2._deps.conference.updateDialInNumber(dialInNumber);
        },
        updateAdditionalNumbers: function updateAdditionalNumbers(additionalDialInNumbers) {
          _this2._deps.conference.updateAdditionalNumbers(additionalDialInNumbers);
        },
        inviteWithText: function inviteWithText(text) {
          _this2._deps.composeText.updateMessageText(text); // for track


          _this2._deps.conference.onInviteWithText();

          _this2._deps.routerInteraction.push('/composeText'); // update settings

        },
        joinAsHost: function joinAsHost(dialInNumber) {
          // for track
          _this2._deps.conference.onJoinAsHost();

          _this2._deps.routerInteraction.history.push('/dialer');

          var theDialInNumber = dialInNumber || _this2._deps.conference.dialInNumber;
          var phoneNumber = enableAutoEnterHostKey ? "".concat(theDialInNumber, ",,").concat(_this2._deps.conference.data.hostCode, "#") : theDialInNumber; // TODO: check interface error

          _this2._deps.call.call({
            phoneNumber: phoneNumber
          });
        },
        onAllowJoinBeforeHostChange: function onAllowJoinBeforeHostChange(allowJoinBeforeHost) {
          _this2._deps.conference.updateEnableJoinBeforeHost(allowJoinBeforeHost);
        },
        showHelpCommands: function showHelpCommands() {
          _this2._deps.routerInteraction.push('/conference/commands');
        }
      };
    }
  }]);

  return ConferenceUI;
}(_core.RcUIModuleV2)) || _class);
exports.ConferenceUI = ConferenceUI;
//# sourceMappingURL=ConferenceUI.js.map
