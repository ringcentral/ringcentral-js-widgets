"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ThemeProvider = ThemeProvider;
exports.ThemeConsumer = ThemeConsumer;
exports.ThemeContext = exports.themes = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var themes = {
  rc: {
    key: 'rc',
    isOldUI: false,
    UI: 'google'
  },
  att: {
    key: 'att',
    isOldUI: false,
    UI: 'google'
  },
  telus: {
    key: 'telus',
    isOldUI: false,
    UI: 'google'
  },
  bt: {
    key: 'bt',
    isOldUI: false,
    UI: 'google'
  },
  officeBlue: {
    key: 'officeBlue',
    isOldUI: false,
    UI: 'google'
  }
};
exports.themes = themes;

var ThemeContext = _react["default"].createContext(themes.rc);

exports.ThemeContext = ThemeContext;

function ThemeProvider(_ref) {
  var theme = _ref.theme,
      children = _ref.children;
  return _react["default"].createElement(ThemeContext.Provider, {
    value: theme
  }, children);
}

ThemeProvider.propTypes = {
  theme: _propTypes["default"].object.isRequired,
  children: _propTypes["default"].node
};
ThemeProvider.defaultProps = {
  children: null
};

function ThemeConsumer(Comp) {
  function WithTheme(props) {
    return _react["default"].createElement(ThemeContext.Consumer, null, function (theme) {
      return _react["default"].createElement(Comp, _extends({
        theme: theme
      }, props));
    });
  }

  return WithTheme;
}
//# sourceMappingURL=themeContext.js.map
