'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPresenceStatusName = getPresenceStatusName;
exports.default = PresenceItem;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _presenceStatus = require('ringcentral-integration/modules/Presence/presenceStatus');

var _presenceStatus2 = _interopRequireDefault(_presenceStatus);

var _PresenceStatusIcon = require('../PresenceStatusIcon');

var _PresenceStatusIcon2 = _interopRequireDefault(_PresenceStatusIcon);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getPresenceStatusName(currentUserStatus, currentDndStatus, currentLocale) {
  if (currentUserStatus !== _presenceStatus2.default.busy) {
    return _i18n2.default.getString(currentUserStatus, currentLocale);
  }
  return _i18n2.default.getString(currentUserStatus + currentDndStatus, currentLocale);
}

function PresenceItem(props) {
  var className = (0, _classnames2.default)(_styles2.default.root, props.selected ? _styles2.default.selected : null, props.className);
  var name = getPresenceStatusName(props.userStatus, props.dndStatus, props.currentLocale);
  return _react2.default.createElement(
    'a',
    { className: className, onClick: props.onClick },
    _react2.default.createElement(_PresenceStatusIcon2.default, {
      className: _styles2.default.statusIcon,
      userStatus: props.userStatus,
      dndStatus: props.dndStatus
    }),
    _react2.default.createElement(
      'span',
      null,
      name
    )
  );
}

PresenceItem.propTypes = {
  className: _propTypes2.default.string,
  onClick: _propTypes2.default.func.isRequired,
  userStatus: _propTypes2.default.string.isRequired,
  dndStatus: _propTypes2.default.string,
  selected: _propTypes2.default.bool.isRequired,
  currentLocale: _propTypes2.default.string.isRequired
};

PresenceItem.defaultProps = {
  dndStatus: null,
  className: null
};
//# sourceMappingURL=index.js.map
