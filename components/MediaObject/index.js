"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.slice");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(require("react"));
var _classnames2 = _interopRequireDefault(require("classnames"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}
function getMeidaCls(str) {
  return _styles["default"]["media".concat(capitalize(str))];
}
var MediaObject = function MediaObject(_ref) {
  var _classnames;
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
    className: (0, _classnames2["default"])((_classnames = {}, _defineProperty(_classnames, _styles["default"].media, true), _defineProperty(_classnames, _styles["default"].flex, !!flexible), _defineProperty(_classnames, containerCls, !!containerCls), _classnames))
  }, mediaLeft ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames2["default"])(_styles["default"].mediaLeft, leftAlignmentClassName, leftCls)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].mediaObject
  }, mediaLeft)) : null, /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames2["default"])(_styles["default"].mediaBody, bodyAlignmentClassName, bodyCls)
  }, mediaHeading ? /*#__PURE__*/_react["default"].createElement("h4", {
    className: (0, _classnames2["default"])(_styles["default"].mediaHeading, headingCls)
  }, mediaHeading) : null, mediaBody), mediaRight ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _classnames2["default"])(_styles["default"].mediaRight, rightAlignmentClassName, rightCls)
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
var _default = MediaObject;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
