'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = LogIcon;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _UnloggedIcon = require('../../assets/images/UnloggedIcon.svg');

var _UnloggedIcon2 = _interopRequireDefault(_UnloggedIcon);

var _LoggedIcon = require('../../assets/images/LoggedIcon.svg');

var _LoggedIcon2 = _interopRequireDefault(_LoggedIcon);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function LogIcon(_ref) {
  var sessionId = _ref.sessionId,
      id = _ref.id,
      viewTask = _ref.viewTask,
      isSaving = _ref.isSaving,
      currentLocale = _ref.currentLocale,
      disabled = _ref.disabled,
      isFax = _ref.isFax;

  var loggedIcon = _react2.default.createElement(_LoggedIcon2.default, { width: 23, className: _styles2.default.loggedIcon });
  var unLoggedIcon = _react2.default.createElement(_UnloggedIcon2.default, { width: 23, className: _styles2.default.unloggedIcon });
  var tooltip = null;
  if (isFax) {
    tooltip = _i18n2.default.getString('faxNotSupported', currentLocale);
  } else {
    tooltip = _i18n2.default.getString(id ? 'logged' : 'unlogged', currentLocale);
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
  var logIconClassName = (0, _classnames2.default)(_styles2.default.logIcon, isSaving ? _styles2.default.isSaving : null, disabled ? _styles2.default.disabled : null);
  return _react2.default.createElement(
    'div',
    {
      className: logIconClassName,
      onClick: onClick,
      title: tooltip },
    id ? loggedIcon : unLoggedIcon
  );
}

LogIcon.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  sessionId: _propTypes2.default.string,
  id: _propTypes2.default.string,
  viewTask: _propTypes2.default.func,
  isSaving: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  isFax: _propTypes2.default.bool
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
