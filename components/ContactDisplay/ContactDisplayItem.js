"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDisplayItem = void 0;

var _react = _interopRequireDefault(require("react"));

var _phoneSources = require("@ringcentral-integration/commons/enums/phoneSources");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ContactDisplayItem = function ContactDisplayItem(_ref) {
  var entityName = _ref.entityName,
      entityType = _ref.entityType,
      phoneNumber = _ref.phoneNumber,
      sourceIcons = _ref.sourceIcons;
  var SourceIcon = null;

  if (entityType) {
    if (entityType === _phoneSources.phoneSources.rcContact) {
      SourceIcon = sourceIcons.brandIcon;
    } else {
      SourceIcon = sourceIcons[entityType];
    }
  }

  if (phoneNumber && entityName !== undefined && SourceIcon) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(SourceIcon, {
      className: _styles["default"].typeIcon,
      width: 10,
      height: 10
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].typeName
    }, entityName));
  }

  if (entityName !== undefined && SourceIcon) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(SourceIcon, {
      className: _styles["default"].typeIcon,
      width: 10,
      height: 10
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].typeName
    }, entityName));
  }

  if (entityName !== undefined) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, entityName);
  }

  if (phoneNumber) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, phoneNumber);
  }

  return null;
};

exports.ContactDisplayItem = ContactDisplayItem;
//# sourceMappingURL=ContactDisplayItem.js.map
