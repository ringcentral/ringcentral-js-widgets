"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPresenceStatusName = getPresenceStatusName;
exports["default"] = PresenceItem;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _dndStatus = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Presence/dndStatus"));

var _PresenceStatusIcon = _interopRequireDefault(require("../PresenceStatusIcon"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function getPresenceStatusName(currentUserStatus, currentDndStatus, currentLocale) {
  if (currentDndStatus === _dndStatus["default"].doNotAcceptAnyCalls) {
    return _i18n["default"].getString(currentDndStatus, currentLocale);
  }

  return _i18n["default"].getString(currentUserStatus, currentLocale);
}

function PresenceItem(props) {
  var className = (0, _classnames["default"])(_styles["default"].root, props.selected ? _styles["default"].selected : null, props.className);
  var name = getPresenceStatusName(props.userStatus, props.dndStatus, props.currentLocale);
  return /*#__PURE__*/_react["default"].createElement("a", {
    className: className,
    onClick: props.onClick
  }, /*#__PURE__*/_react["default"].createElement(_PresenceStatusIcon["default"], {
    className: _styles["default"].statusIcon,
    userStatus: props.userStatus,
    dndStatus: props.dndStatus
  }), /*#__PURE__*/_react["default"].createElement("span", null, name));
}

PresenceItem.propTypes = {
  className: _propTypes["default"].string,
  onClick: _propTypes["default"].func.isRequired,
  userStatus: _propTypes["default"].string.isRequired,
  dndStatus: _propTypes["default"].string,
  selected: _propTypes["default"].bool.isRequired,
  currentLocale: _propTypes["default"].string.isRequired
};
PresenceItem.defaultProps = {
  dndStatus: null,
  className: null
};
//# sourceMappingURL=index.js.map
