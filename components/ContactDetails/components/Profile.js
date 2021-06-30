"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Profile = void 0;

require("core-js/modules/es6.function.name");

var _react = _interopRequireDefault(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _extensionStatusTypes = require("@ringcentral-integration/commons/enums/extensionStatusTypes");

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
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].status
    }, /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].inactiveText
    }, _i18n["default"].getString('notActivated', currentLocale))));
  }

  if (presence) {
    var presenceStatus = presence.presenceStatus,
        dndStatus = presence.dndStatus;
    var presenceName = (0, _getPresenceStatusName.getPresenceStatusName)(presenceStatus, dndStatus, currentLocale);
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].status
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].presence
    }, /*#__PURE__*/_react["default"].createElement(_PresenceStatusIcon["default"], {
      className: _styles["default"].presenceIcon,
      presenceStatus: presenceStatus,
      dndStatus: dndStatus
    })), /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].presenceName
    }, presenceName));
  }

  return null;
};

var Name = function Name(_ref2) {
  var presence = _ref2.presence,
      inactive = _ref2.inactive,
      name = _ref2.name;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].name, !presence && _styles["default"].withoutPresence, inactive && _styles["default"].inactiveText),
    title: name,
    "data-sign": "contactName"
  }, name);
};

var Profile = function Profile(_ref3) {
  var _ref3$contact = _ref3.contact,
      name = _ref3$contact.name,
      presence = _ref3$contact.presence,
      profileImageUrl = _ref3$contact.profileImageUrl,
      status = _ref3$contact.status,
      site = _ref3$contact.site,
      type = _ref3$contact.type,
      sourceNodeRenderer = _ref3.sourceNodeRenderer,
      currentLocale = _ref3.currentLocale,
      isMultipleSiteEnabled = _ref3.isMultipleSiteEnabled;
  var inactive = status === _extensionStatusTypes.extensionStatusTypes.notActivated;
  return /*#__PURE__*/_react["default"].createElement("section", {
    className: _styles["default"].profile,
    "aria-label": "profile"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].profileWrapper
  }, /*#__PURE__*/_react["default"].createElement(_Avatar.Avatar, {
    name: name,
    avatarUrl: profileImageUrl,
    inactive: inactive,
    source: sourceNodeRenderer && sourceNodeRenderer({
      sourceType: type
    })
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].info
  }, /*#__PURE__*/_react["default"].createElement(Name, {
    inactive: inactive,
    name: name,
    presence: presence
  }), /*#__PURE__*/_react["default"].createElement(Status, {
    inactive: inactive,
    presence: presence,
    currentLocale: currentLocale
  }))), isMultipleSiteEnabled && (site === null || site === void 0 ? void 0 : site.name) && /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].site,
    "aria-label": "Site: ".concat(site.name)
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].label
  }, _i18n["default"].getString('site', currentLocale)), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].content
  }, site.name)));
};

exports.Profile = Profile;
Profile.defaultProps = {
  sourceNodeRenderer: function sourceNodeRenderer() {
    return null;
  }
};
//# sourceMappingURL=Profile.js.map
