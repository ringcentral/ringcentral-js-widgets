'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function SearchInput(props) {
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.root, props.className)
    },
    _react2.default.createElement('span', { className: (0, _classnames2.default)(_DynamicsFont2.default.search, _styles2.default.icon) }),
    _react2.default.createElement('input', {
      name: 'search',
      value: props.value,
      onChange: props.onChange,
      onKeyUp: props.onKeyUp,
      className: _styles2.default.input,
      maxLength: props.maxLength,
      placeholder: props.placeholder,
      autoComplete: 'off'
    })
  );
}

SearchInput.propTypes = {
  className: _react.PropTypes.string,
  value: _react.PropTypes.string.isRequired,
  onChange: _react.PropTypes.func.isRequired,
  onKeyUp: _react.PropTypes.func.isRequired,
  maxLength: _react.PropTypes.number.isRequired,
  placeholder: _react.PropTypes.string.isRequired
};

SearchInput.defaultProps = {
  className: null
};

exports.default = SearchInput;
//# sourceMappingURL=index.js.map
