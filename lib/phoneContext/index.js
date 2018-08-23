'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.PhoneProvider = PhoneProvider;
exports.withPhone = withPhone;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhoneContext = _react2.default.createContext(null);
exports.default = PhoneContext;
function PhoneProvider(_ref) {
  var phone = _ref.phone,
      children = _ref.children;

  return _react2.default.createElement(
    PhoneContext.Provider,
    { value: phone },
    children
  );
}
PhoneProvider.propTypes = {
  phone: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.node
};
PhoneProvider.defaultProps = {
  children: null
};

function withPhone(Comp) {
  function WithPhone(props) {
    return _react2.default.createElement(
      PhoneContext.Consumer,
      null,
      function (phone) {
        return _react2.default.createElement(Comp, (0, _extends3.default)({
          phone: phone
        }, props));
      }
    );
  }
  return WithPhone;
}
//# sourceMappingURL=index.js.map
