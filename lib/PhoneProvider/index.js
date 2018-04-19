'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PhoneProvider = function (_Component) {
  (0, _inherits3.default)(PhoneProvider, _Component);

  function PhoneProvider() {
    (0, _classCallCheck3.default)(this, PhoneProvider);
    return (0, _possibleConstructorReturn3.default)(this, (PhoneProvider.__proto__ || (0, _getPrototypeOf2.default)(PhoneProvider)).apply(this, arguments));
  }

  (0, _createClass3.default)(PhoneProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        phone: this.props.phone
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return this.props.children;
    }
  }]);
  return PhoneProvider;
}(_react.Component);

exports.default = PhoneProvider;


PhoneProvider.propTypes = {
  phone: _propTypes2.default.object.isRequired,
  children: _propTypes2.default.node
};
PhoneProvider.defaultProps = {
  children: null
};

PhoneProvider.childContextTypes = {
  phone: _propTypes2.default.object.isRequired
};
//# sourceMappingURL=index.js.map
