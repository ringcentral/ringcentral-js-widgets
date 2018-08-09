'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = EmojiSelect;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactEmojione = require('react-emojione');

var _reactEmojione2 = _interopRequireDefault(_reactEmojione);

var _emojione = require('../../assets/images/emojione.png');

var _emojione2 = _interopRequireDefault(_emojione);

var _emojis = require('./emojis.json');

var _emojis2 = _interopRequireDefault(_emojis);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EmojiSelect(_ref) {
  var onSelect = _ref.onSelect,
      className = _ref.className;

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.root, className) },
    _emojis2.default.map(function (emoji) {
      var emojsStr = ':' + emoji + ':';
      return _react2.default.createElement(
        'span',
        {
          key: emoji,
          className: _styles2.default.emoji,
          onClick: function onClick() {
            return onSelect(emojsStr);
          }
        },
        _react2.default.createElement(
          _reactEmojione2.default,
          {
            style: {
              width: 25,
              height: 25,
              backgroundImage: 'url("' + _emojione2.default + '")'
            }
          },
          emojsStr
        )
      );
    })
  );
}

EmojiSelect.propTypes = {
  onSelect: _propTypes2.default.func.isRequired,
  className: _propTypes2.default.string
};

EmojiSelect.defaultProps = {
  className: undefined
};
//# sourceMappingURL=index.js.map
