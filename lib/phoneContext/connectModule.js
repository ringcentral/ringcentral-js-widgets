"use strict";

require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.assign");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRedux = require("react-redux");
var _phoneContext = require("./phoneContext");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
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
