"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.SpinnerOverlay = void 0;

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es6.object.freeze");

require("core-js/modules/es6.array.slice");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _juno = require("@ringcentral/juno");

var _commonStyles = require("../../lib/commonStyles");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

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
    "data-sign": "spinnerOverlay",
    className: (0, _classnames["default"])(_styles["default"].root, className, classes.root)
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
