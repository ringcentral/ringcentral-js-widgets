'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Dialog;

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

var _Button = require('../Button');

var _Button2 = _interopRequireDefault(_Button);

var _CloseIcon = require('../../assets/images/CloseIcon.svg');

var _CloseIcon2 = _interopRequireDefault(_CloseIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function FlatButton(_ref) {
  var className = _ref.className,
      disabled = _ref.disabled,
      onClick = _ref.onClick,
      children = _ref.children;

  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(className, _styles2.default.flatBtn, _styles2.default.text, disabled && _styles2.default.disabled),
      onClick: !disabled && onClick
    },
    children
  );
}
FlatButton.propTypes = {
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool,
  onClick: _propTypes2.default.func,
  children: _propTypes2.default.node
};

FlatButton.defaultProps = {
  className: undefined,
  disabled: false,
  onClick: undefined,
  children: undefined
};

function Dialog(_ref2) {
  var children = _ref2.children,
      title = _ref2.title,
      onConfirm = _ref2.onConfirm,
      onCancel = _ref2.onCancel,
      textConfirm = _ref2.textConfirm,
      textCancel = _ref2.textCancel,
      currentLocale = _ref2.currentLocale,
      className = _ref2.className,
      cancelBtnClassName = _ref2.cancelBtnClassName,
      confirmBtnClassName = _ref2.confirmBtnClassName,
      showTitle = _ref2.showTitle,
      showCloseBtn = _ref2.showCloseBtn,
      headerClassName = _ref2.headerClassName,
      contentClassName = _ref2.contentClassName,
      footerClassName = _ref2.footerClassName;

  var footer = !currentLocale || !onCancel && !onConfirm ? null : _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.footer, footerClassName) },
    onCancel ? _react2.default.createElement(
      FlatButton,
      {
        className: (0, _classnames2.default)(_styles2.default.btn, _styles2.default.cancelBtn, cancelBtnClassName),
        onClick: onCancel
      },
      textCancel || _i18n2.default.getString('cancel', currentLocale)
    ) : null,
    onConfirm ? _react2.default.createElement(
      FlatButton,
      {
        className: (0, _classnames2.default)(_styles2.default.btn, _styles2.default.confirmBtn, confirmBtnClassName),
        onClick: onConfirm
      },
      textConfirm || _i18n2.default.getString('confirm', currentLocale)
    ) : null
  );
  return _react2.default.createElement(
    'div',
    {
      className: (0, _classnames2.default)(_styles2.default.dialog, className)
    },
    showTitle ? _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_styles2.default.header, headerClassName) },
      '' + title || null
    ) : null,
    showCloseBtn ? _react2.default.createElement(
      _Button2.default,
      { dataSign: 'closeButton', className: _styles2.default.closeBtn, onClick: onCancel },
      _react2.default.createElement(_CloseIcon2.default, null)
    ) : null,
    _react2.default.createElement(
      'div',
      { className: (0, _classnames2.default)(_styles2.default.content, contentClassName) },
      children
    ),
    footer
  );
}

Dialog.propTypes = {
  className: _propTypes2.default.string,
  cancelBtnClassName: _propTypes2.default.string,
  confirmBtnClassName: _propTypes2.default.string,
  children: _propTypes2.default.node,
  onConfirm: _propTypes2.default.func,
  onCancel: _propTypes2.default.func,
  title: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string,
  textConfirm: _propTypes2.default.string,
  textCancel: _propTypes2.default.string,
  showCloseBtn: _propTypes2.default.bool,
  showTitle: _propTypes2.default.bool,
  headerClassName: _propTypes2.default.string,
  contentClassName: _propTypes2.default.string,
  footerClassName: _propTypes2.default.string
};
Dialog.defaultProps = {
  currentLocale: '',
  className: '',
  cancelBtnClassName: '',
  confirmBtnClassName: '',
  children: undefined,
  onConfirm: undefined,
  onCancel: undefined,
  title: '',
  textConfirm: '',
  textCancel: '',
  showCloseBtn: true,
  showTitle: true,
  headerClassName: undefined,
  contentClassName: undefined,
  footerClassName: undefined
};
//# sourceMappingURL=index.js.map
