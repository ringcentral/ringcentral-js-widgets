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

var _CloseIcon = require('../../assets/images/CloseIcon.svg');

var _CloseIcon2 = _interopRequireDefault(_CloseIcon);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SlideoutBar = function (_React$Component) {
  (0, _inherits3.default)(SlideoutBar, _React$Component);

  function SlideoutBar() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SlideoutBar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SlideoutBar.__proto__ || (0, _getPrototypeOf2.default)(SlideoutBar)).call.apply(_ref, [this].concat(args))), _this), _this._onClose = function (evt) {
      evt.stopPropagation();
      _this.props.onClose();
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SlideoutBar, [{
    key: '_renderCloseButton',
    value: function _renderCloseButton() {
      return _react2.default.createElement(
        'i',
        { className: _styles2.default.closeBtn, onClick: this._onClose },
        _react2.default.createElement(_CloseIcon2.default, null)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          offset = _props.offset,
          onClick = _props.onClick,
          slideout = _props.slideout,
          className = _props.className,
          closable = _props.closable,
          children = _props.children;

      var slideStyle = slideout ? 'translateX(0)' : 'translateX(' + offset + 'px)';
      var cls = (0, _classnames2.default)(_styles2.default.container, className);
      var closeButton = closable ? this._renderCloseButton() : null;
      return _react2.default.createElement(
        'div',
        { className: cls, style: { transform: slideStyle }, onClick: onClick },
        children,
        closeButton
      );
    }
  }]);
  return SlideoutBar;
}(_react2.default.Component);

exports.default = SlideoutBar;


SlideoutBar.propTypes = {
  closable: _propTypes2.default.bool,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  offset: _propTypes2.default.number.isRequired,
  slideout: _propTypes2.default.bool.isRequired,
  onClick: _propTypes2.default.func,
  onClose: _propTypes2.default.func
};

SlideoutBar.defaultProps = {
  closable: true,
  className: undefined,
  children: undefined,
  onClick: function onClick() {},
  onClose: function onClose() {}
};
//# sourceMappingURL=index.js.map
