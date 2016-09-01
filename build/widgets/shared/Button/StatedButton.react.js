'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _button = require('./button.css');

var _button2 = _interopRequireDefault(_button);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatedButton = function (_React$Component) {
  _inherits(StatedButton, _React$Component);

  function StatedButton() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, StatedButton);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(StatedButton)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      isInState: false
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(StatedButton, [{
    key: 'handleClick',
    value: function handleClick(event) {
      if (this.props.handleClick) {
        this.props.handleClick.call(this, event);
      } else {
        this.setState({ isInState: !this.state.isInState });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classNames,
          _this2 = this;

      var content = this.props.children;
      return _react2.default.createElement(
        'button',
        {
          className: (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, this.props.className, true), _defineProperty(_classNames, this.props.stateStyles, this.state.isInState), _defineProperty(_classNames, this.props.initStyles, !this.state.isInState), _classNames)),
          onClick: function onClick() {
            return _this2.handleClick;
          }
        },
        content
      );
    }
  }]);

  return StatedButton;
}(_react2.default.Component);

StatedButton.propTypes = {
  children: _react2.default.PropTypes.node,
  onClick: _react2.default.PropTypes.func,
  onEnterState: _react2.default.PropTypes.func,
  onLeaveState: _react2.default.PropTypes.func,
  className: _react2.default.PropTypes.string,
  initStyles: _react2.default.PropTypes.string,
  stateStyles: _react2.default.PropTypes.string,
  handleClick: _react2.default.PropTypes.func
};
StatedButton.defaultProps = {
  stateStyles: _button2.default.buttonStated,
  initStyles: _button2.default.button
};
exports.default = StatedButton;