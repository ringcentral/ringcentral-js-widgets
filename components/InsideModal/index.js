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
      appendDOM = _ref2.appendDOM,
      children = _ref2.children,
      title = _ref2.title;

  var closeBtn = _react2.default.createElement(CloseBtn, { onClick: onClose });
  if (!appendDOM) return null;
  return _react2.default.createElement(
    _Modal2.default,
    {
      title: title,
      headerClassName: _styles2.default.title,
      className: _styles2.default.container,
      maskClassName: _styles2.default.mask,
      modalClassName: _styles2.default.modal,
      contentClassName: _styles2.default.content,
      closeBtn: closeBtn,
      show: show,
      appendDOM: appendDOM },
    children
  );
}

InsideModal.propTypes = {
  show: _propTypes2.default.bool,
  onClose: _propTypes2.default.func,
  appendDOM: _propTypes2.default.object,
  children: _propTypes2.default.node,
  title: _propTypes2.default.string
};

InsideModal.defaultProps = {
  title: null,
  show: undefined,
  onClose: undefined,
  appendDOM: undefined,
  children: undefined
};
//# sourceMappingURL=index.js.map
