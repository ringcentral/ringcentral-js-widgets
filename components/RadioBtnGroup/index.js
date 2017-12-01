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

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function RadioOption(props) {
  var btnClassName = '';
  if (props.currentIndex === props.selectedIndex) {
    btnClassName = (0, _classnames2.default)(_styles2.default.radioBtn, _styles2.default.active);
  } else {
    btnClassName = _styles2.default.radioBtn;
  }
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.radioOption, onClick: function onClick() {
        props.onSelect(props.currentIndex);
      } },
    _react2.default.createElement('span', { className: btnClassName }),
    _react2.default.createElement(
      'span',
      { className: _styles2.default.optionNumber },
      props.phoneNumber
    ),
    _react2.default.createElement(
      'span',
      { className: _styles2.default.optionLabel, title: props.label },
      _i18n2.default.getString(props.label, props.currentLocale)
    )
  );
}
RadioOption.propTypes = {
  currentIndex: _propTypes2.default.number.isRequired,
  phoneNumber: _propTypes2.default.string.isRequired,
  label: _propTypes2.default.string,
  selectedIndex: _propTypes2.default.number.isRequired,
  onSelect: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};
RadioOption.defaultProps = {
  label: ''
};

var RadioButtonGroup = function (_Component) {
  (0, _inherits3.default)(RadioButtonGroup, _Component);

  function RadioButtonGroup(props) {
    (0, _classCallCheck3.default)(this, RadioButtonGroup);

    var _this = (0, _possibleConstructorReturn3.default)(this, (RadioButtonGroup.__proto__ || (0, _getPrototypeOf2.default)(RadioButtonGroup)).call(this, props));

    _this.state = {
      selectedIndex: 0
    };
    _this.chooseOption = function (index) {
      if (!_this.props.disabled) {
        _this.setState({
          selectedIndex: index
        });
        _this.props.onRadioSelect(_this.props.radioOptions[index].phoneNumber);
      }
    };
    return _this;
  }

  (0, _createClass3.default)(RadioButtonGroup, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, this.props.className) },
        this.props.radioOptions.map(function (number, idx) {
          return _react2.default.createElement(RadioOption, {
            currentIndex: idx,
            selectedIndex: _this2.state.selectedIndex,
            key: number.id,
            phoneNumber: _this2.props.formatPhone(number.phoneNumber),
            label: number.label,
            onSelect: _this2.chooseOption,
            currentLocale: _this2.props.currentLocale
          });
        })
      );
    }
  }]);
  return RadioButtonGroup;
}(_react.Component);

exports.default = RadioButtonGroup;


RadioButtonGroup.propTypes = {
  className: _propTypes2.default.string.isRequired,
  radioOptions: _propTypes2.default.array.isRequired,
  disabled: _propTypes2.default.bool.isRequired,
  formatPhone: _propTypes2.default.func.isRequired,
  onRadioSelect: _propTypes2.default.func.isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};
//# sourceMappingURL=index.js.map
