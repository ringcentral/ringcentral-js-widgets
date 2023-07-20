"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _LoggedIcon = _interopRequireDefault(require("../../assets/images/LoggedIcon.svg"));
var _UnloggedIcon = _interopRequireDefault(require("../../assets/images/UnloggedIcon.svg"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var LogIcon = function LogIcon(_ref) {
  var sessionId = _ref.sessionId,
    id = _ref.id,
    viewTask = _ref.viewTask,
    isSaving = _ref.isSaving,
    currentLocale = _ref.currentLocale,
    disabled = _ref.disabled,
    isFax = _ref.isFax;
  var loggedIcon = /*#__PURE__*/_react["default"].createElement(_LoggedIcon["default"], {
    width: 19,
    className: _styles["default"].loggedIcon
  });
  var unLoggedIcon = /*#__PURE__*/_react["default"].createElement(_UnloggedIcon["default"], {
    width: 19,
    className: _styles["default"].unloggedIcon
  });
  var tooltip = null;
  if (isFax) {
    tooltip = _i18n["default"].getString('faxNotSupported', currentLocale);
  } else {
    tooltip = _i18n["default"].getString(id ? 'logged' : 'unlogged', currentLocale);
  }
  var onClick = function onClick(e) {
    e.stopPropagation();
    if (disabled) {
      return;
    }
    // @ts-expect-error TS(2722): Cannot invoke an object which is possibly 'undefin... Remove this comment to see the full error message
    viewTask({
      sessionId: sessionId,
      id: id
    });
  };
  var logIconClassName = (0, _classnames["default"])(_styles["default"].logIcon, isSaving ? _styles["default"].isSaving : null, disabled ? _styles["default"].disabled : null);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: logIconClassName,
    onClick: onClick,
    title: tooltip,
    "data-sign": "log"
  }, id ? loggedIcon : unLoggedIcon);
};
LogIcon.defaultProps = {
  sessionId: undefined,
  id: undefined,
  viewTask: undefined,
  isSaving: false,
  disabled: false,
  isFax: false
};
var _default = LogIcon;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
