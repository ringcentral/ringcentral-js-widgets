"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = InsideModal;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
  return _react.default.createElement(_Modal.default, {
    title: title,
    headerClassName: _styles.default.title,
    className: (0, _classnames.default)(_styles.default.container, containerStyles),
    maskClassName: (0, _classnames.default)(_styles.default.mask, maskStyle),
    modalClassName: (0, _classnames.default)(_styles.default.modal, modalStyles),
    contentClassName: (0, _classnames.default)(_styles.default.content, contentStyle),
    show: show,
    showTitle: showTitle,
    showCloseBtn: showCloseBtn,
    clickOutToClose: clickOutToClose,
    onCancel: onClose
  }, children);
}

InsideModal.propTypes = {
  show: _propTypes.default.bool,
  onClose: _propTypes.default.func,
  children: _propTypes.default.node,
  title: _propTypes.default.string,
  showTitle: _propTypes.default.bool,
  showCloseBtn: _propTypes.default.bool,
  clickOutToClose: _propTypes.default.bool,
  containerStyles: _propTypes.default.string,
  maskStyle: _propTypes.default.string,
  modalStyles: _propTypes.default.string,
  contentStyle: _propTypes.default.string
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
