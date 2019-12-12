"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireDefault(require("react"));

var _di = require("ringcentral-integration/lib/di");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _AuthAlert = _interopRequireDefault(require("../../components/AuthAlert"));

var _CallAlert = _interopRequireDefault(require("../../components/CallAlert"));

var _CallingSettingsAlert = _interopRequireDefault(require("../../components/CallingSettingsAlert"));

var _ConferenceAlert = _interopRequireDefault(require("../../components/ConferenceAlert"));

var _ConferenceCallAlert = _interopRequireDefault(require("../../components/ConferenceCallAlert"));

var _ConnectivityAlert = _interopRequireDefault(require("../../components/ConnectivityAlert"));

var _MeetingAlert = _interopRequireDefault(require("../../components/MeetingAlert"));

var _MessageSenderAlert = _interopRequireDefault(require("../../components/MessageSenderAlert"));

var _MessageStoreAlert = _interopRequireDefault(require("../../components/MessageStoreAlert"));

var _RateExceededAlert = _interopRequireDefault(require("../../components/RateExceededAlert"));

var _RegionSettingsAlert = _interopRequireDefault(require("../../components/RegionSettingsAlert"));

var _RolesAndPermissionsAlert = _interopRequireDefault(require("../../components/RolesAndPermissionsAlert"));

var _WebphoneAlert = _interopRequireDefault(require("../../components/WebphoneAlert"));

var _AudioSettingsAlert = _interopRequireDefault(require("../../components/AudioSettingsAlert"));

var _CallLogAlert = _interopRequireDefault(require("../../components/CallLogAlert"));

var _CallControlAlert = _interopRequireDefault(require("../../components/CallControlAlert"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AlertUI = (_dec = (0, _di.Module)({
  name: 'AlertUI',
  deps: ['Brand', 'Alert', 'Locale', 'RouterInteraction', 'RateLimiter']
}), _dec(_class =
/*#__PURE__*/
function (_RcUIModule) {
  _inherits(AlertUI, _RcUIModule);

  function AlertUI() {
    _classCallCheck(this, AlertUI);

    return _possibleConstructorReturn(this, _getPrototypeOf(AlertUI).apply(this, arguments));
  }

  _createClass(AlertUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _ref$phone = _ref.phone,
          locale = _ref$phone.locale,
          brand = _ref$phone.brand,
          alert = _ref$phone.alert;
      return {
        currentLocale: locale.currentLocale,
        messages: alert.messages,
        brand: brand.fullName
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _ref2$phone = _ref2.phone,
          alert = _ref2$phone.alert,
          brand = _ref2$phone.brand,
          routerInteraction = _ref2$phone.routerInteraction,
          rateLimiter = _ref2$phone.rateLimiter,
          regionSettingsUrl = _ref2.regionSettingsUrl,
          callingSettingsUrl = _ref2.callingSettingsUrl,
          getAdditionalRenderer = _ref2.getAdditionalRenderer;

      var _getRenderer = this.getDefaultRenderer(alert, brand, rateLimiter, routerInteraction, regionSettingsUrl, callingSettingsUrl);

      var additionalRenderer = getAdditionalRenderer && getAdditionalRenderer();
      return {
        getRenderer: function getRenderer(message) {
          if (additionalRenderer) {
            var renderer = additionalRenderer(message);
            if (renderer) return renderer;
          }

          return _getRenderer(message);
        },
        dismiss: function dismiss(id) {
          return alert.dismiss(id);
        }
      };
    }
  }, {
    key: "getDefaultRenderer",
    value: function getDefaultRenderer(alert, brand, rateLimiter, routerInteraction, regionSettingsUrl, callingSettingsUrl) {
      var onRegionSettingsLinkClick = function onRegionSettingsLinkClick() {
        var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref3$alertId = _ref3.alertId,
            alertId = _ref3$alertId === void 0 ? 'default' : _ref3$alertId;

        routerInteraction.push(regionSettingsUrl);

        if (alertId) {
          alert.dismiss(alertId);
        }
      };

      var onCallingSettingsLinkClick = function onCallingSettingsLinkClick() {
        routerInteraction.push(callingSettingsUrl);
      };

      return function (message) {
        if (_AuthAlert["default"].handleMessage(message)) {
          return _AuthAlert["default"];
        }

        if (_CallAlert["default"].handleMessage(message)) {
          return function (props) {
            return _react["default"].createElement(_CallAlert["default"], _extends({}, props, {
              brand: brand,
              onAreaCodeLinkClick: onRegionSettingsLinkClick
            }));
          };
        }

        if (_CallingSettingsAlert["default"].handleMessage(message)) {
          return function (props) {
            return _react["default"].createElement(_CallingSettingsAlert["default"], _extends({}, props, {
              brand: brand.fullName,
              onCallingSettingsLinkClick: onCallingSettingsLinkClick
            }));
          };
        }

        if (_RegionSettingsAlert["default"].handleMessage(message)) {
          return function (props) {
            return _react["default"].createElement(_RegionSettingsAlert["default"], _extends({}, props, {
              onRegionSettingsLinkClick: onRegionSettingsLinkClick
            }));
          };
        }

        if (_MessageSenderAlert["default"].handleMessage(message)) {
          return function (props) {
            return _react["default"].createElement(_MessageSenderAlert["default"], _extends({}, props, {
              brand: brand.fullName,
              onAreaCodeLink: onRegionSettingsLinkClick
            }));
          };
        }

        if (_MessageStoreAlert["default"].handleMessage(message)) {
          return _MessageStoreAlert["default"];
        }

        if (_RateExceededAlert["default"].handleMessage(message)) {
          return function (props) {
            return _react["default"].createElement(_RateExceededAlert["default"], _extends({}, props, {
              timestamp: rateLimiter.timestamp,
              duration: rateLimiter._throttleDuration
            }));
          };
        }

        if (_ConnectivityAlert["default"].handleMessage(message)) {
          return _ConnectivityAlert["default"];
        }

        if (_WebphoneAlert["default"].handleMessage(message)) {
          return function (props) {
            return _react["default"].createElement(_WebphoneAlert["default"], _extends({}, props, {
              brand: brand
            }));
          };
        }

        if (_MeetingAlert["default"].handleMessage(message)) {
          return function (props) {
            return _react["default"].createElement(_MeetingAlert["default"], _extends({}, props, {
              application: brand.appName
            }));
          };
        }

        if (_RolesAndPermissionsAlert["default"].handleMessage(message)) {
          return function (props) {
            return _react["default"].createElement(_RolesAndPermissionsAlert["default"], _extends({}, props, {
              brand: brand.fullName,
              application: brand.appName
            }));
          };
        }

        if (_ConferenceAlert["default"].handleMessage(message)) {
          return _ConferenceAlert["default"];
        }

        if (_ConferenceCallAlert["default"].handleMessage(message)) {
          return _ConferenceCallAlert["default"];
        }

        if (_AudioSettingsAlert["default"].handleMessage(message)) {
          return function (props) {
            return _react["default"].createElement(_AudioSettingsAlert["default"], _extends({}, props, {
              application: brand.appName
            }));
          };
        }

        if (_CallLogAlert["default"].handleMessage(message)) {
          return function (props) {
            return _react["default"].createElement(_CallLogAlert["default"], props);
          };
        }

        if (_CallControlAlert["default"].handleMessage(message)) {
          return function (props) {
            return _react["default"].createElement(_CallControlAlert["default"], props);
          };
        }

        return undefined;
      };
    }
  }]);

  return AlertUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = AlertUI;
//# sourceMappingURL=AlertUI.js.map
