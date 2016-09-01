'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PhoneProvider = function (_React$Component) {
  _inherits(PhoneProvider, _React$Component);

  function PhoneProvider(props, context) {
    _classCallCheck(this, PhoneProvider);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PhoneProvider).call(this, props, context));

    _this.phone = props.phone;
    return _this;
  }

  _createClass(PhoneProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return { phone: this.phone };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.Children.only(this.props.children);
    }
  }]);

  return PhoneProvider;
}(_react2.default.Component);

exports.default = PhoneProvider;


PhoneProvider.propTypes = {
  phone: _react2.default.PropTypes.object,
  children: _react2.default.PropTypes.element.isRequired
};

PhoneProvider.childContextTypes = {
  phone: _react2.default.PropTypes.object
};