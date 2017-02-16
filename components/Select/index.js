'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Select = function (_Component) {
  (0, _inherits3.default)(Select, _Component);

  function Select(props) {
    (0, _classCallCheck3.default)(this, Select);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Select.__proto__ || (0, _getPrototypeOf2.default)(Select)).call(this, props));

    _this.state = {};
    return _this;
  }

  (0, _createClass3.default)(Select, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.root, this.props.className) },
        _react2.default.createElement(
          'select',
          {
            value: this.props.value,
            onChange: this.props.onChange },
          this.props.options.map(function (option, idx) {
            return _react2.default.createElement(
              'option',
              { key: idx, value: _this2.props.valueFunction(option) },
              _this2.props.displayFunction(option)
            );
          })
        )
      );
    }
  }]);
  return Select;
}(_react.Component);

Select.propTypes = {
  className: _react.PropTypes.string,
  value: _react.PropTypes.string,
  onChange: _react.PropTypes.func,
  options: _react.PropTypes.array.isRequired,
  valueFunction: _react.PropTypes.func,
  displayFunction: _react.PropTypes.func
};

Select.defaultProps = {
  valueFunction: function valueFunction(option) {
    return option;
  },
  displayFunction: function displayFunction(option) {
    return option;
  }
};
exports.default = Select;
//# sourceMappingURL=index.js.map
