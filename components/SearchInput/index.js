'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _Search = require('../../assets/images/Search.svg');

var _Search2 = _interopRequireDefault(_Search);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SearchInput(props) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.root, props.className)
    },
    _react2.default.createElement(_Search2.default, { className: _styles2.default.icon }),
    _react2.default.createElement('input', {
      name: 'search',
      value: props.value,
      onChange: props.onChange,
      onKeyUp: props.onKeyUp,
      className: _styles2.default.input,
      maxLength: props.maxLength,
      placeholder: props.placeholder,
      autoComplete: 'off',
      disabled: props.disabled
    })
  );
}

SearchInput.propTypes = {
  className: _propTypes2.default.string,
  value: _propTypes2.default.string.isRequired,
  onChange: _propTypes2.default.func.isRequired,
  onKeyUp: _propTypes2.default.func,
  maxLength: _propTypes2.default.number,
  placeholder: _propTypes2.default.string,
  disabled: _propTypes2.default.bool
};

SearchInput.defaultProps = {
  className: null,
  disabled: false,
  placeholder: '',
  maxLength: undefined,
  onKeyUp: undefined
};

exports.default = SearchInput;
//# sourceMappingURL=index.js.map
