'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CloseBtn = CloseBtn;
exports.default = InsideModal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Modal = require('../Modal');

var _Modal2 = _interopRequireDefault(_Modal);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _InsideModalClose = require('../../assets/images/InsideModalClose.svg');

var _InsideModalClose2 = _interopRequireDefault(_InsideModalClose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CloseBtn(_ref) {
  var onClick = _ref.onClick;

  return _react2.default.createElement(
    'div',
    {
      className: _styles2.default.closeBtn,
      onClick: onClick },
    _react2.default.createElement(_InsideModalClose2.default, null)
  );
}

CloseBtn.propTypes = {
  onClick: _propTypes2.default.func
};

CloseBtn.defaultProps = {
  onClick: undefined
};

function InsideModal(_ref2) {
  var show = _ref2.show,
      onClose = _ref2.onClose,
      children = _ref2.children,
      title = _ref2.title,
      containerStyles = _ref2.containerStyles,
      maskStyle = _ref2.maskStyle,
      modalStyles = _ref2.modalStyles,
      contentStyle = _ref2.contentStyle;

  var closeBtn = _react2.default.createElement(CloseBtn, { onClick: onClose });
  return _react2.default.createElement(
    _Modal2.default,
    {
      title: title,
      headerClassName: _styles2.default.title,
      className: (0, _classnames2.default)(_styles2.default.container, containerStyles),
      maskClassName: (0, _classnames2.default)(_styles2.default.mask, maskStyle),
      modalClassName: (0, _classnames2.default)(_styles2.default.modal, modalStyles),
      contentClassName: (0, _classnames2.default)(_styles2.default.content, contentStyle),
      closeBtn: closeBtn,
      show: show },
    children
  );
}

InsideModal.propTypes = {
  show: _propTypes2.default.bool,
  onClose: _propTypes2.default.func,
  children: _propTypes2.default.node,
  title: _propTypes2.default.string,
  containerStyles: _propTypes2.default.string,
  maskStyle: _propTypes2.default.string,
  modalStyles: _propTypes2.default.string,
  contentStyle: _propTypes2.default.string
};

InsideModal.defaultProps = {
  title: null,
  show: undefined,
  onClose: undefined,
  children: undefined,
  containerStyles: undefined,
  maskStyle: undefined,
  modalStyles: undefined,
  contentStyle: undefined
};
//# sourceMappingURL=index.js.map
