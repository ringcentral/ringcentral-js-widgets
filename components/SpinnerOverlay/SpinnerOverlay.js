"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SpinnerOverlay = void 0;
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _commonStyles = require("../../lib/commonStyles");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  opacity: ", ";\n  ", ";\n"]);
  _templateObject2 = function _templateObject2() {
    return data;
  };
  return data;
}
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: ", ";\n  left: 50%;\n  width: 40px;\n  height: 40px;\n  transform: translate(-50%, -50%);\n\n  @media only screen and (max-width: 50px) {\n    width: 30px;\n    height: 30px;\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var JunoSpinnerWrapper = function JunoSpinnerWrapper() {
  return /*#__PURE__*/_react["default"].createElement(_juno.RcCircularProgress, {
    size: 43
  });
};
var StyledContainer = _juno.styled.div(_templateObject(), function (props) {
  return props.top;
});
var Mask = _juno.styled.div(_templateObject2(), (0, _juno.palette2)('neutral', 'b01'), (0, _juno.opacity)('48'), _commonStyles.fullSizeStyle);
var SpinnerOverlay = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var className = _ref.className,
    SpinnerComponent = _ref.custom,
    classes = _ref.classes,
    _ref$top = _ref.top,
    top = _ref$top === void 0 ? '40%' : _ref$top;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "spinnerOverlay"
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    ,
    className: (0, _clsx["default"])(_styles["default"].root, className, classes.root)
  }, /*#__PURE__*/_react["default"].createElement(Mask, {
    className: classes.mask
  }), /*#__PURE__*/_react["default"].createElement(StyledContainer, {
    className: classes.container,
    top: top
  }, /*#__PURE__*/_react["default"].createElement(SpinnerComponent, null)));
});
exports.SpinnerOverlay = SpinnerOverlay;
var _default = SpinnerOverlay;
exports["default"] = _default;
SpinnerOverlay.defaultProps = {
  className: undefined,
  custom: JunoSpinnerWrapper,
  classes: {},
  top: '40%'
};
//# sourceMappingURL=SpinnerOverlay.js.map
