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

require("regenerator-runtime/runtime");

var _di = require("ringcentral-integration/lib/di");

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

var RegionSettingsUI = (_dec = (0, _di.Module)({
  name: 'RegionSettingsUI',
  deps: ['Auth', 'Locale', 'RegionSettings', 'RouterInteraction']
}), _dec(_class =
/*#__PURE__*/
function (_RcUIModule) {
  _inherits(RegionSettingsUI, _RcUIModule);

  function RegionSettingsUI() {
    _classCallCheck(this, RegionSettingsUI);

    return _possibleConstructorReturn(this, _getPrototypeOf(RegionSettingsUI).apply(this, arguments));
  }

  _createClass(RegionSettingsUI, [{
    key: "getUIProps",
    value: function getUIProps(_ref) {
      var _ref$phone = _ref.phone,
          locale = _ref$phone.locale,
          regionSettings = _ref$phone.regionSettings;
      return {
        availableCountries: regionSettings.availableCountries,
        countryCode: regionSettings.countryCode,
        areaCode: regionSettings.areaCode,
        currentLocale: locale.currentLocale
      };
    }
  }, {
    key: "getUIFunctions",
    value: function getUIFunctions(_ref2) {
      var _ref2$phone = _ref2.phone,
          auth = _ref2$phone.auth,
          regionSettings = _ref2$phone.regionSettings,
          routerInteraction = _ref2$phone.routerInteraction;
      return {
        onBackButtonClick: function onBackButtonClick() {
          return routerInteraction.goBack();
        },
        onSave: function onSave(_ref3) {
          var areaCode = _ref3.areaCode,
              countryCode = _ref3.countryCode;
          return regionSettings.setData({
            areaCode: areaCode,
            countryCode: countryCode
          });
        },
        onLogoutButtonClick: function onLogoutButtonClick() {
          return regeneratorRuntime.async(function onLogoutButtonClick$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _context.next = 2;
                  return regeneratorRuntime.awrap(auth.logout());

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          });
        }
      };
    }
  }]);

  return RegionSettingsUI;
}(_RcUIModule2["default"])) || _class);
exports["default"] = RegionSettingsUI;
//# sourceMappingURL=index.js.map
