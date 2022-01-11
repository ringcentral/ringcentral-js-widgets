"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.slice");

var _react = _interopRequireDefault(require("react"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  containerCls: null,
  mediaLeft: null,
  mediaBody: null,
  mediaRight: null,
  mediaHeading: null,
  leftCls: null,
  bodyCls: null,
  rightCls: null,
  headingCls: null,
  leftAlignment: 'middle',
  bodyAlignment: 'middle',
  rightAlignment: 'middle',
  flexible: true
};
var _default = MediaObject;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
