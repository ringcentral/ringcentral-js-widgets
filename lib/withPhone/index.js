'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = withPhone;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function withPhone(Comp) {
  var WithPhone = function WithPhone(props, context) {
    return _react2.default.createElement(Comp, (0, _extends3.default)({
      phone: context.phone
    }, props));
  };
  WithPhone.contextTypes = {
    phone: _propTypes2.default.object.isRequired
  };
  return WithPhone;
}
//# sourceMappingURL=index.js.map
