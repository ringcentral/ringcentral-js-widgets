"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

var _di = require("ringcentral-integration/lib/di");

var _AlertRenderer = require("../../components/AlertRenderer");

var _RcUIModule2 = _interopRequireDefault(require("../../lib/RcUIModule"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
      return {
        getRenderer: function getRenderer(message) {
          if (getAdditionalRenderer) {
            var renderer = getAdditionalRenderer()(message);
            if (renderer) return renderer;
          }

          return (0, _AlertRenderer.AlertRenderer)(alert, brand, rateLimiter, routerInteraction, regionSettingsUrl, callingSettingsUrl)(message);
        },
        dismiss: function dismiss(id) {
          return alert.dismiss(id);
        }
      };
    }
  }]);

  return AlertUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = AlertUI;
//# sourceMappingURL=AlertUI.js.map
