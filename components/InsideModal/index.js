"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _Modal = _interopRequireDefault(require("../Modal"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var InsideModal = function InsideModal(_ref) {
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
  return /*#__PURE__*/_react["default"].createElement(_Modal["default"], {
    title: title,
    headerClassName: _styles["default"].title,
    className: (0, _classnames["default"])(_styles["default"].container, containerStyles),
    maskClassName: (0, _classnames["default"])(_styles["default"].mask, maskStyle),
    modalClassName: (0, _classnames["default"])(_styles["default"].modal, modalStyles),
    contentClassName: (0, _classnames["default"])(_styles["default"].content, contentStyle),
    show: show,
    showTitle: showTitle,
    showCloseBtn: showCloseBtn,
    clickOutToClose: clickOutToClose,
    onCancel: onClose
  }, children);
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
var _default = InsideModal;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
