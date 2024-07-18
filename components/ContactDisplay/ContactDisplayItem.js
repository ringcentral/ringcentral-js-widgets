"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactDisplayItem = void 0;
var _phoneSources = require("@ringcentral-integration/commons/enums/phoneSources");
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var ContactDisplayItem = function ContactDisplayItem(_ref) {
  var entityName = _ref.entityName,
    entityType = _ref.entityType,
    phoneNumber = _ref.phoneNumber,
    sourceIcons = _ref.sourceIcons;
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'ComponentTy... Remove this comment to see the full error message
  var SourceIcon = null;
  if (entityType) {
    if (entityType === _phoneSources.phoneSources.rcContact) {
      // @ts-expect-error TS(2322): Type 'ComponentType<any> | undefined' is not assig... Remove this comment to see the full error message
      SourceIcon = sourceIcons.brandIcon;
    } else {
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
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
