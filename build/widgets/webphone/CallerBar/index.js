'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Dropdown = require('../Dropdown');

var _Dropdown2 = _interopRequireDefault(_Dropdown);

var _style = require('../../../utils/style');

var _style2 = _interopRequireDefault(_style);

var _Icon = require('../../shared/Icon');

var _Icon2 = _interopRequireDefault(_Icon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _prefix = (0, _style2.default)(['caller', 'callerSpan', 'callerButton', 'callerIcon'], 'CallerBar');

var caller = _prefix.caller;
var callerSpan = _prefix.callerSpan;
var callerButton = _prefix.callerButton;
var callerIcon = _prefix.callerIcon;

var CallerBar = function (_React$Component) {
  _inherits(CallerBar, _React$Component);

  function CallerBar() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, CallerBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(CallerBar)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      isDropdownOpen: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(CallerBar, [{
    key: 'triggerDropdown',
    value: function triggerDropdown() {
      this.setState({
        isDropdownOpen: !this.state.isDropdownOpen
      });
    }
  }, {
    key: 'handleClick',
    value: function handleClick(number) {
      this.props.setCaller(number);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: caller, onClick: function onClick() {
            return _this2.triggerDropdown();
          } },
        _react2.default.createElement(
          'span',
          { className: callerSpan },
          this.props.getString('From')
        ),
        _react2.default.createElement(
          'button',
          { className: callerButton },
          this.props.caller ? this.props.caller.mid : ''
        ),
        _react2.default.createElement(
          'div',
          { className: callerIcon },
          _react2.default.createElement(_Icon2.default, { id: 'icon-uni2463' })
        ),
        this.state.isDropdownOpen ? _react2.default.createElement(_Dropdown2.default, {
          items: this.props.numbers,
          onClick: function onClick(selectedCaller) {
            return _this2.handleClick(selectedCaller);
          }
        }) : null
      );
    }
  }]);

  return CallerBar;
}(_react2.default.Component);

CallerBar.propTypes = {
  caller: _react2.default.PropTypes.object,
  numbers: _react2.default.PropTypes.array,
  setCaller: _react2.default.PropTypes.func,
  getString: _react2.default.PropTypes.func
};
CallerBar.defaultProps = {
  getString: function getString(key) {
    return key;
  },
  numbers: []
};
exports.default = CallerBar;