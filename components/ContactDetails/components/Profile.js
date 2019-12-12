"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Profile = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _extensionStatusTypes = require("ringcentral-integration/enums/extensionStatusTypes");

var _Avatar = require("./Avatar");

var _styles = _interopRequireDefault(require("../styles.scss"));

var _i18n = _interopRequireDefault(require("../i18n"));

var _PresenceStatusIcon = _interopRequireDefault(require("../../PresenceStatusIcon"));

var _getPresenceStatusName = require("../../../lib/getPresenceStatusName");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Status = function Status(_ref) {
  var presence = _ref.presence,
      inactive = _ref.inactive,
      currentLocale = _ref.currentLocale;

  if (inactive) {
    return _react["default"].createElement("div", {
      className: _styles["default"].status
    }, _react["default"].createElement("div", null, _react["default"].createElement("span", {
      className: _styles["default"].inactiveText
    }, _i18n["default"].getString('notActivated', currentLocale))));
  }

  if (presence) {
    var presenceStatus = presence.presenceStatus,
        dndStatus = presence.dndStatus;
    var presenceName = (0, _getPresenceStatusName.getPresenceStatusName)(presenceStatus, dndStatus, currentLocale);
    return _react["default"].createElement("div", {
      className: _styles["default"].status
    }, _react["default"].createElement("div", {
      className: _styles["default"].presence
    }, _react["default"].createElement(_PresenceStatusIcon["default"], {
      className: _styles["default"].presenceIcon,
      presenceStatus: presenceStatus,
      dndStatus: dndStatus
    })), _react["default"].createElement("span", {
      className: _styles["default"].presenceName
    }, presenceName));
  }

  return null;
};

var Name = function Name(_ref2) {
  var presence = _ref2.presence,
      inactive = _ref2.inactive,
      name = _ref2.name;
  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].name, !presence && _styles["default"].withoutPresence, inactive && _styles["default"].inactiveText),
    title: name
  }, name);
};

var Profile = function Profile(_ref3) {
  var _ref3$contact = _ref3.contact,
      name = _ref3$contact.name,
      presence = _ref3$contact.presence,
      profileImageUrl = _ref3$contact.profileImageUrl,
      status = _ref3$contact.status,
      type = _ref3$contact.type,
      sourceNodeRenderer = _ref3.sourceNodeRenderer,
      currentLocale = _ref3.currentLocale;
  var inactive = status === _extensionStatusTypes.extensionStatusTypes.notActivated;
  return _react["default"].createElement("div", {
    className: _styles["default"].profile
  }, _react["default"].createElement("div", {
    className: _styles["default"].profileWrapper
  }, _react["default"].createElement(_Avatar.Avatar, {
    name: name,
    avatarUrl: profileImageUrl,
    inactive: inactive,
    source: sourceNodeRenderer({
      sourceType: type
    })
  }), _react["default"].createElement("div", {
    className: _styles["default"].info
  }, _react["default"].createElement(Name, {
    inactive: inactive,
    name: name,
    presence: presence
  }), _react["default"].createElement(Status, {
    inactive: inactive,
    presence: presence,
    currentLocale: currentLocale
  }))));
};

exports.Profile = Profile;
Profile.defaultProps = {
  sourceNodeRenderer: function sourceNodeRenderer() {
    return null;
  }
};
//# sourceMappingURL=Profile.js.map
