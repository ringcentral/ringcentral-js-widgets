"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-properties.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.freeze.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SpinnerOverlay = void 0;
var _juno = require("@ringcentral/juno");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _commonStyles = require("../../lib/commonStyles");
var _styles = _interopRequireDefault(require("./styles.scss"));
var _templateObject, _templateObject2;
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var JunoSpinnerWrapper = function JunoSpinnerWrapper() {
  return /*#__PURE__*/_react["default"].createElement(_juno.RcCircularProgress, {
    size: 43
  });
};
var StyledContainer = _juno.styled.div(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  position: absolute;\n  top: ", ";\n  left: 50%;\n  width: 40px;\n  height: 40px;\n  transform: translate(-50%, -50%);\n\n  @media only screen and (max-width: 50px) {\n    width: 30px;\n    height: 30px;\n  }\n"])), function (props) {
  return props.top;
});
var Mask = _juno.styled.div(_templateObject2 || (_templateObject2 = _taggedTemplateLiteral(["\n  background: ", ";\n  opacity: ", ";\n  ", ";\n"])), (0, _juno.palette2)('neutral', 'b01'), (0, _juno.opacity)('48'), _commonStyles.fullSizeStyle);
var SpinnerOverlay = exports.SpinnerOverlay = /*#__PURE__*/(0, _react.memo)(function (_ref) {
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
var _default = exports["default"] = SpinnerOverlay;
SpinnerOverlay.defaultProps = {
  className: undefined,
  custom: JunoSpinnerWrapper,
  classes: {},
  top: '40%'
};
//# sourceMappingURL=SpinnerOverlay.js.map
