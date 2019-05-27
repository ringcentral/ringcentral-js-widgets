"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PhoneProvider = PhoneProvider;
exports.withPhone = withPhone;
exports.connectModule = connectModule;
exports["default"] = void 0;

require("core-js/modules/es6.object.assign");

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var PhoneContext = _react["default"].createContext(null);

var _default = PhoneContext;
exports["default"] = _default;

function PhoneProvider(_ref) {
  var phone = _ref.phone,
      children = _ref.children;
  return _react["default"].createElement(PhoneContext.Provider, {
    value: phone
  }, children);
}

PhoneProvider.propTypes = {
  phone: _propTypes["default"].object.isRequired,
  children: _propTypes["default"].node
};
PhoneProvider.defaultProps = {
  children: null
};

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
