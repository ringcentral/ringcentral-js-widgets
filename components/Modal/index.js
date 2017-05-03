'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FlatButton = FlatButton;
exports.default = Modal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FlatButton(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      children = _ref.children;

  return _react2.default.createElement(
    'button',
    { className: (0, _classnames2.default)(className, _styles2.default.flatBtn) },
    _react2.default.createElement(
      'div',
      {
        className: (0, _classnames2.default)(className, _styles2.default.text, disabled && _styles2.default.disabled),
        onClick: !disabled && onClick },
      children
    )
  );
}
FlatButton.propTypes = {
  className: _react.PropTypes.string,
  disabled: _react.PropTypes.bool,
  onClick: _react.PropTypes.func,
  children: _react.PropTypes.node
};

FlatButton.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined,
  children: undefined
};

function Modal(_ref2) {
  var className = _ref2.className,
      children = _ref2.children,
      title = _ref2.title,
      show = _ref2.show,
      onConfirm = _ref2.onConfirm,
      onCancel = _ref2.onCancel,
      textConfirm = _ref2.textConfirm,
      textCancel = _ref2.textCancel,
      currentLocale = _ref2.currentLocale,
      clickOutToClose = _ref2.clickOutToClose;

  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(className, show ? _styles2.default.container : _styles2.default.containerHidden) },
    _react2.default.createElement(
      'div',
      { className: show ? _styles2.default.modal : _styles2.default.modalHidden },
      title ? _react2.default.createElement(
        'div',
        { className: _styles2.default.header },
        title
      ) : null,
      _react2.default.createElement(
        'div',
        { className: _styles2.default.content },
        children
      ),
      _react2.default.createElement(
        'div',
        { className: _styles2.default.footer },
        _react2.default.createElement(
          FlatButton,
          {
            className: _styles2.default.btn,
            onClick: onCancel },
          textCancel || _i18n2.default.getString('cancel', currentLocale)
        ),
        _react2.default.createElement(
          FlatButton,
          {
            className: _styles2.default.btn,
            onClick: onConfirm },
          textConfirm || _i18n2.default.getString('confirm', currentLocale)
        )
      )
    ),
    _react2.default.createElement('div', {
      className: show ? _styles2.default.mask : _styles2.default.maskHidden,
      onClick: clickOutToClose ? onCancel : false })
  );
}
Modal.propTypes = {
  className: _react.PropTypes.string,
  children: _react.PropTypes.node,
  show: _react.PropTypes.bool,
  onConfirm: _react.PropTypes.func.isRequired,
  onCancel: _react.PropTypes.func.isRequired,
  clickOutToClose: _react.PropTypes.bool,
  title: _react.PropTypes.string,
  currentLocale: _react.PropTypes.string.isRequired,
  textConfirm: _react.PropTypes.string,
  textCancel: _react.PropTypes.string
};
Modal.defaultProps = {
  className: '',
  children: undefined,
  show: false,
  clickOutToClose: false,
  title: undefined,
  textConfirm: '',
  textCancel: ''
};
//# sourceMappingURL=index.js.map
