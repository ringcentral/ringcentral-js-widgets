"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports["default"] = void 0;

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("regenerator-runtime/runtime");

var _reactRedux = require("react-redux");

var _RegionSettingsPanel = _interopRequireDefault(require("../../components/RegionSettingsPanel"));

var _phoneContext = require("../../lib/phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function mapToProps(_, _ref) {
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

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      auth = _ref2$phone.auth,
      regionSettings = _ref2$phone.regionSettings,
      routerInteraction = _ref2$phone.routerInteraction;
  return {
    onLogoutButtonClick: function () {
      var _onLogoutButtonClick = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return auth.logout();

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function onLogoutButtonClick() {
        return _onLogoutButtonClick.apply(this, arguments);
      }

      return onLogoutButtonClick;
    }(),
    onBackButtonClick: function onBackButtonClick() {
      routerInteraction.goBack();
    },
    onSave: function onSave(_ref3) {
      var areaCode = _ref3.areaCode,
          countryCode = _ref3.countryCode;
      regionSettings.setData({
        areaCode: areaCode,
        countryCode: countryCode
      });
    }
  };
}

var RegionSettingsPage = (0, _phoneContext.withPhone)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_RegionSettingsPanel["default"]));
exports["default"] = RegionSettingsPage;
//# sourceMappingURL=index.js.map
