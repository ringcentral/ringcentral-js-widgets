"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LogIcon;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _UnloggedIcon = _interopRequireDefault(require("../../assets/images/UnloggedIcon.svg"));

var _LoggedIcon = _interopRequireDefault(require("../../assets/images/LoggedIcon.svg"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LogIcon(_ref) {
  var sessionId = _ref.sessionId,
      id = _ref.id,
      viewTask = _ref.viewTask,
      isSaving = _ref.isSaving,
      currentLocale = _ref.currentLocale,
      disabled = _ref.disabled,
      isFax = _ref.isFax;

  var loggedIcon = _react.default.createElement(_LoggedIcon.default, {
    width: 19,
    className: _styles.default.loggedIcon
  });

  var unLoggedIcon = _react.default.createElement(_UnloggedIcon.default, {
    width: 19,
    className: _styles.default.unloggedIcon
  });

  var tooltip = null;

  if (isFax) {
    tooltip = _i18n.default.getString('faxNotSupported', currentLocale);
  } else {
    tooltip = _i18n.default.getString(id ? 'logged' : 'unlogged', currentLocale);
  }

  var onClick = function onClick(e) {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    viewTask({
      sessionId: sessionId,
      id: id
    });
  };

  var logIconClassName = (0, _classnames.default)(_styles.default.logIcon, isSaving ? _styles.default.isSaving : null, disabled ? _styles.default.disabled : null);
  return _react.default.createElement("div", {
    className: logIconClassName,
    onClick: onClick,
    title: tooltip
  }, id ? loggedIcon : unLoggedIcon);
}

LogIcon.propTypes = {
  currentLocale: _propTypes.default.string.isRequired,
  sessionId: _propTypes.default.string,
  id: _propTypes.default.string,
  viewTask: _propTypes.default.func,
  isSaving: _propTypes.default.bool,
  disabled: _propTypes.default.bool,
  isFax: _propTypes.default.bool
};
LogIcon.defaultProps = {
  sessionId: undefined,
  id: undefined,
  viewTask: undefined,
  isSaving: false,
  disabled: false,
  isFax: false
};
//# sourceMappingURL=index.js.map
