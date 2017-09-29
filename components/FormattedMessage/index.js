'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

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

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formatMessage = require('format-message');

var _formatMessage2 = _interopRequireDefault(_formatMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FormattedMessage = function (_Component) {
  (0, _inherits3.default)(FormattedMessage, _Component);

  function FormattedMessage() {
    (0, _classCallCheck3.default)(this, FormattedMessage);
    return (0, _possibleConstructorReturn3.default)(this, (FormattedMessage.__proto__ || (0, _getPrototypeOf2.default)(FormattedMessage)).apply(this, arguments));
  }

  (0, _createClass3.default)(FormattedMessage, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          message = _props.message,
          values = _props.values,
          tagName = _props.tagName;


      var uid = Math.floor(Math.random() * 0x10000000000).toString(16);
      var hashedParams = {};
      var elements = {};
      var tokenDelimeter = '@__' + uid + '__@';

      (0, _keys2.default)(values).forEach(function (key) {
        if ((0, _react.isValidElement)(values[key])) {
          hashedParams[key] = '' + tokenDelimeter + key + tokenDelimeter;
          elements[key] = values[key];
        } else {
          hashedParams[key] = values[key];
        }
      });

      var nodes = (0, _formatMessage2.default)(message, hashedParams).split(tokenDelimeter).filter(function (token) {
        return !!token;
      }).map(function (token) {
        return elements[token] || token;
      });
      return _react.createElement.apply(undefined, [tagName, null].concat((0, _toConsumableArray3.default)(nodes)));
    }
  }]);
  return FormattedMessage;
}(_react.Component);

exports.default = FormattedMessage;


FormattedMessage.propTypes = {
  message: _propTypes2.default.string.isRequired,
  values: _propTypes2.default.object,
  tagName: _propTypes2.default.string
};
FormattedMessage.defaultProps = {
  values: {},
  tagName: 'span'
};
//# sourceMappingURL=index.js.map
