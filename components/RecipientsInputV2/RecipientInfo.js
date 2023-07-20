"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.function.name");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RecipientInfo = void 0;
var _react = _interopRequireDefault(require("react"));
var _phoneSources = require("../../enums/phoneSources");
var _phoneSourceNames = _interopRequireDefault(require("../../lib/phoneSourceNames"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var RecipientInfo = function RecipientInfo(_ref) {
  var currentLocale = _ref.currentLocale,
    name = _ref.name,
    entityType = _ref.entityType,
    enableTitle = _ref.enableTitle,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
    splitter = _ref.splitter;
  // align the type in contact search result so far temporarily,
  // need pass brand info here if need to use phoneSources.rcContact.
  // see also ringcentral-js-widgets/ringcentral-widgets/components/ContactDropdownList/ContactInfo.tsx
  var type = entityType === _phoneSources.phoneSources.rcContact ? _phoneSources.phoneSources.contact : entityType;
  var phoneSourceName = phoneSourceNameRenderer ?
  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
  phoneSourceNameRenderer(type) :
  // @ts-expect-error TS(2345): Argument of type 'string | undefined' is not assig... Remove this comment to see the full error message
  _phoneSourceNames["default"].getString(type, currentLocale);
  var title = enableTitle ? "".concat(name, " ").concat(splitter, " ").concat(phoneSourceName) : undefined;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].nameSection,
    title: title
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].name
  }, name), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].splitter
  }, splitter), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].phoneSourceLabel
  }, phoneSourceName));
};
exports.RecipientInfo = RecipientInfo;
//# sourceMappingURL=RecipientInfo.js.map
