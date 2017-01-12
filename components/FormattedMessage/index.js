'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

exports.default = FormattedMessage;

var _react = require('react');

var _formatMessage = require('format-message');

var _formatMessage2 = _interopRequireDefault(_formatMessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FormattedMessage(_ref) {
  var message = _ref.message,
      values = _ref.values,
      _ref$tagName = _ref.tagName,
      tagName = _ref$tagName === undefined ? 'span' : _ref$tagName;

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

FormattedMessage.propTypes = {
  message: _react.PropTypes.string.isRequired,
  values: _react.PropTypes.object,
  tagName: _react.PropTypes.string
};
//# sourceMappingURL=index.js.map
