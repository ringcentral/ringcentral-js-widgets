"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _phoneContext = require("./phoneContext");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function connectModule(fn) {
  return function (Comp) {
    var WithModule = (0, _reactRedux.connect)(function (_, props) {
      return fn(props.phone).getUIProps(props);
    }, function (_, props) {
      return fn(props.phone).getUIFunctions(props);
    })(Comp);
    return function (props) {
      return /*#__PURE__*/_react["default"].createElement(_phoneContext.PhoneContext.Consumer, null, function (phone) {
        return /*#__PURE__*/_react["default"].createElement(WithModule, _extends({
          phone: phone
        }, props));
      });
    };
  };
}

var _default = connectModule;
exports["default"] = _default;
//# sourceMappingURL=connectModule.js.map
