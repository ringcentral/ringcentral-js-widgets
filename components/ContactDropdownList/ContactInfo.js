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
var _clsx2 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _phoneSources = require("../../enums/phoneSources");
var _phoneSourceNames = _interopRequireDefault(require("../../lib/phoneSourceNames"));
var _splitter = require("./splitter");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
    className: (0, _clsx2["default"])(_styles["default"].nameSection, _defineProperty({}, _styles["default"].dncNameSection, doNotCall))
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
