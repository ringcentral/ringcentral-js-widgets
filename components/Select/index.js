'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Select;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

require('../../assets/DynamicsFont/DynamicsFont.scss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import font face

function Select(_ref) {
  var className = _ref.className,
      value = _ref.value,
      onChange = _ref.onChange,
      disabled = _ref.disabled,
      options = _ref.options,
      valueFunction = _ref.valueFunction,
      renderFunction = _ref.renderFunction,
      paddingLeft = _ref.paddingLeft;

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.root, className) },
    _react2.default.createElement(
      'select',
      {
        className: _styles2.default.select,
        disabled: disabled,
        value: value,
        style: {
          paddingLeft: paddingLeft
        },
        onChange: onChange },
      options.map(function (option, idx) {
        return (
          // eslint-disable-next-line react/no-array-index-key
          _react2.default.createElement(
            'option',
            { key: idx, value: valueFunction(option, idx) },
            renderFunction(option, idx)
          )
        );
      })
    )
  );
}

Select.propTypes = {
  className: _react.PropTypes.string,
  value: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  disabled: _react.PropTypes.bool,
  options: _react.PropTypes.arrayOf(_react.PropTypes.any).isRequired,
  paddingLeft: _react.PropTypes.number,
  valueFunction: _react.PropTypes.func,
  renderFunction: _react.PropTypes.func
};

Select.defaultProps = {
  className: undefined,
  value: undefined,
  onChange: undefined,
  disabled: false,
  paddingLeft: 10,
  valueFunction: function valueFunction(option) {
    return option;
  },
  renderFunction: function renderFunction(option) {
    return option;
  }
};
//# sourceMappingURL=index.js.map
