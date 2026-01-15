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
exports.CopyBtn = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _CopyToClipboard = _interopRequireDefault(require("../CopyToClipboard"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _templateObject;
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _taggedTemplateLiteral(e, t) { return t || (t = e.slice(0)), Object.freeze(Object.defineProperties(e, { raw: { value: Object.freeze(t) } })); }
var BtnContainer = (0, _juno.styled)('div')(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  & {\n    width: ", ";\n  }\n"])), (0, _juno.spacing)(8));
var InnerBtn = function InnerBtn(_ref) {
  var size = _ref.size,
    currentLocale = _ref.currentLocale,
    executeCopy = _ref.executeCopy;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    variant: "round",
    size: size,
    color: "neutral.f04",
    "data-sign": "copyBtn",
    symbol: _junoIcon.Copy,
    title: _i18n["default"].getString('copy', currentLocale),
    onClick: executeCopy
  });
};
var CopyBtn = exports.CopyBtn = function CopyBtn(_ref2) {
  var value = _ref2.value,
    size = _ref2.size,
    currentLocale = _ref2.currentLocale,
    handleSuccess = _ref2.handleSuccess,
    handleFailure = _ref2.handleFailure;
  var memoizedBtn = (0, _react.useCallback)(function (_ref3) {
    var executeCopy = _ref3.executeCopy;
    return /*#__PURE__*/_react["default"].createElement(InnerBtn, {
      size: size,
      currentLocale: currentLocale,
      executeCopy: executeCopy
    });
  }, [size, currentLocale]);
  return /*#__PURE__*/_react["default"].createElement(BtnContainer, {
    "aria-disabled": true
  }, /*#__PURE__*/_react["default"].createElement(_CopyToClipboard["default"], {
    currentLocale: currentLocale,
    copiedText: value,
    button: memoizedBtn,
    handleSuccess: handleSuccess,
    handleFailure: handleFailure
  }));
};
CopyBtn.defaultProps = {
  handleSuccess: function handleSuccess() {},
  handleFailure: function handleFailure() {},
  currentLocale: 'en-US',
  value: '',
  size: 'small'
};
//# sourceMappingURL=CopyBtn.js.map
