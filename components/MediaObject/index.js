"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.slice.js");
var _clsx2 = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
function getMeidaCls(str) {
  return _styles["default"]["media".concat(capitalize(str))];
}
var MediaObject = function MediaObject(_ref) {
  var containerCls = _ref.containerCls,
    mediaLeft = _ref.mediaLeft,
    mediaBody = _ref.mediaBody,
    mediaRight = _ref.mediaRight,
    leftCls = _ref.leftCls,
    bodyCls = _ref.bodyCls,
    rightCls = _ref.rightCls,
    mediaHeading = _ref.mediaHeading,
    headingCls = _ref.headingCls,
    leftAlignment = _ref.leftAlignment,
    bodyAlignment = _ref.bodyAlignment,
    rightAlignment = _ref.rightAlignment,
    flexible = _ref.flexible;
  var leftAlignmentClassName = getMeidaCls(leftAlignment);
  var rightAlignmentClassName = getMeidaCls(rightAlignment);
  var bodyAlignmentClassName = getMeidaCls(bodyAlignment);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx2["default"])(_defineProperty(_defineProperty(_defineProperty({}, _styles["default"].media, true), _styles["default"].flex, !!flexible), containerCls, !!containerCls))
  }, mediaLeft ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx2["default"])(_styles["default"].mediaLeft, leftAlignmentClassName, leftCls)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].mediaObject
  }, mediaLeft)) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx2["default"])(_styles["default"].mediaBody, bodyAlignmentClassName, bodyCls)
  }, mediaHeading ? /*#__PURE__*/_react["default"].createElement("h4", {
    className: (0, _clsx2["default"])(_styles["default"].mediaHeading, headingCls)
  }, mediaHeading) : null, mediaBody), mediaRight ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx2["default"])(_styles["default"].mediaRight, rightAlignmentClassName, rightCls)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].mediaObject
  }, mediaRight)) : null);
};
MediaObject.defaultProps = {
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  containerCls: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Element | u... Remove this comment to see the full error message
  mediaLeft: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | El... Remove this comment to see the full error message
  mediaBody: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'Element | u... Remove this comment to see the full error message
  mediaRight: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  mediaHeading: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  leftCls: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  bodyCls: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  rightCls: null,
  // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
  headingCls: null,
  leftAlignment: 'middle',
  bodyAlignment: 'middle',
  rightAlignment: 'middle',
  flexible: true
};
var _default = exports["default"] = MediaObject;
//# sourceMappingURL=index.js.map
