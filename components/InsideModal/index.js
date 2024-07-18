"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _Modal = _interopRequireDefault(require("../Modal"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
  return /*#__PURE__*/_react["default"].createElement(_Modal["default"]
  // @ts-expect-error TS(2322): Type '{ children: ReactNode; title: string | undef... Remove this comment to see the full error message
  , {
    title: title,
    headerClassName: _styles["default"].title,
    className: (0, _clsx["default"])(_styles["default"].container, containerStyles),
    maskClassName: (0, _clsx["default"])(_styles["default"].mask, maskStyle),
    modalClassName: (0, _clsx["default"])(_styles["default"].modal, modalStyles),
    contentClassName: (0, _clsx["default"])(_styles["default"].content, contentStyle),
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
  // @ts-expect-error TS(2322): Type '{ title: string; showTitle: true; showCloseB... Remove this comment to see the full error message
  children: undefined,
  containerStyles: undefined,
  maskStyle: undefined,
  modalStyles: undefined,
  contentStyle: undefined
};
var _default = InsideModal;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
