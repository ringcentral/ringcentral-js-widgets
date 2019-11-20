"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withPhone = withPhone;
exports.connectModule = connectModule;
exports.PhoneProvider = exports["default"] = void 0;

require("core-js/modules/es6.object.assign");

var _rcui = require("@ringcentral-integration/rcui");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _theme = require("./theme");

var _customIcon = _interopRequireDefault(require("./customIcon"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PhoneContext = _react["default"].createContext(null);

var _default = PhoneContext;
exports["default"] = _default;

var PhoneProvider = function PhoneProvider(_ref) {
  var phone = _ref.phone,
      _ref$theme = _ref.theme,
      theme = _ref$theme === void 0 ? _theme.defaultTheme : _ref$theme,
      _ref$icons = _ref.icons,
      icons = _ref$icons === void 0 ? _customIcon["default"] : _ref$icons,
      children = _ref.children;
  return _react["default"].createElement(PhoneContext.Provider, {
    value: phone
  }, _react["default"].createElement(_rcui.RcThemeProvider, {
    theme: theme,
    icons: icons
  }, children));
};

exports.PhoneProvider = PhoneProvider;

function withPhone(Comp) {
  function WithPhone(props) {
    return _react["default"].createElement(PhoneContext.Consumer, null, function (phone) {
      return _react["default"].createElement(Comp, _extends({
        phone: phone
      }, props));
    });
  }

  return WithPhone;
}

// router properties
function connectModule(fn) {
  return function (Comp) {
    var WithModule = (0, _reactRedux.connect)(function (_, props) {
      return fn(props.phone).getUIProps(props);
    }, function (_, props) {
      return fn(props.phone).getUIFunctions(props);
    })(Comp);
    return function (props) {
      return _react["default"].createElement(PhoneContext.Consumer, null, function (phone) {
        return _react["default"].createElement(WithModule, _extends({
          phone: phone
        }, props));
      });
    };
  };
}
//# sourceMappingURL=index.js.map
