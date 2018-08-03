'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function InsideModal(_ref) {
  var show = _ref.show,
      onClose = _ref.onClose,
      children = _ref.children,
      title = _ref.title,
      showTitle = _ref.showTitle,
      showCloseBtn = _ref.showCloseBtn,
      clickOutToClose = _ref.clickOutToClose,
      containerStyles = _ref.containerStyles,
      maskStyle = _ref.maskStyle,
      modalStyles = _ref.modalStyles,
      contentStyle = _ref.contentStyle;

  return _react2.default.createElement(
    _Modal2.default,
    {
      title: title,
      headerClassName: _styles2.default.title,
      className: (0, _classnames2.default)(_styles2.default.container, containerStyles),
      maskClassName: (0, _classnames2.default)(_styles2.default.mask, maskStyle),
      modalClassName: (0, _classnames2.default)(_styles2.default.modal, modalStyles),
      contentClassName: (0, _classnames2.default)(_styles2.default.content, contentStyle),
      show: show,
      showTitle: showTitle,
      showCloseBtn: showCloseBtn,
      clickOutToClose: clickOutToClose,
      onCancel: onClose
    },
    children
  );
}

InsideModal.propTypes = {
  show: _propTypes2.default.bool,
  onClose: _propTypes2.default.func,
  children: _propTypes2.default.node,
  title: _propTypes2.default.string,
  showTitle: _propTypes2.default.bool,
  showCloseBtn: _propTypes2.default.bool,
  clickOutToClose: _propTypes2.default.bool,
  containerStyles: _propTypes2.default.string,
  maskStyle: _propTypes2.default.string,
  modalStyles: _propTypes2.default.string,
  contentStyle: _propTypes2.default.string
};

InsideModal.defaultProps = {
  title: '',
  showTitle: true,
  showCloseBtn: true,
  clickOutToClose: true,
  show: undefined,
  onClose: undefined,
  children: undefined,
  containerStyles: undefined,
  maskStyle: undefined,
  modalStyles: undefined,
  contentStyle: undefined
};
//# sourceMappingURL=index.js.map
