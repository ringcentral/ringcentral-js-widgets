"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.concat");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.function.name");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ContactInfo = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames2 = _interopRequireDefault(require("classnames"));
var _phoneSources = require("../../enums/phoneSources");
var _phoneSourceNames = _interopRequireDefault(require("../../lib/phoneSourceNames"));
var _splitter = require("./splitter");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ContactInfo = function ContactInfo(_ref) {
  var name = _ref.name,
    entityType = _ref.entityType,
    titleEnabled = _ref.titleEnabled,
    phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
    doNotCall = _ref.doNotCall;
  // align the type in contact search result so far temporarily,
  // need pass brand info here if need to use phoneSources.rcContact.
  // see also ringcentral-js-widgets/ringcentral-widgets/components/RecipientsInputV2/RecipientInfo.tsx
  var type = entityType === _phoneSources.phoneSources.rcContact ? _phoneSources.phoneSources.contact : entityType;
  var phoneSourceName = phoneSourceNameRenderer ? phoneSourceNameRenderer(type) : _phoneSourceNames["default"].getString(type);
  var nameTitle = "".concat(name, " ").concat(_splitter.splitter, " ").concat(phoneSourceName);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames2["default"])(_styles["default"].nameSection, _defineProperty({}, _styles["default"].dncNameSection, doNotCall))
    // @ts-expect-error TS(2322): Type 'string | false | undefined' is not assignabl... Remove this comment to see the full error message
    ,
    title: titleEnabled && nameTitle,
    "data-sign": "contactNameSection"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].name
  }, name), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].splitter
  }, _splitter.splitter), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].label
  }, phoneSourceName));
};
exports.ContactInfo = ContactInfo;
ContactInfo.defaultProps = {
  titleEnabled: undefined,
  phoneSourceNameRenderer: undefined,
  doNotCall: false
};
//# sourceMappingURL=ContactInfo.js.map
