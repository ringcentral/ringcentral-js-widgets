"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.slice");
require("core-js/modules/es.object.define-properties");
require("core-js/modules/es.object.freeze");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CopyBtn = void 0;
var _react = _interopRequireWildcard(require("react"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _CopyToClipboard = _interopRequireDefault(require("../CopyToClipboard"));
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  & {\n    width: ", ";\n  }\n"]);
  _templateObject = function _templateObject() {
    return data;
  };
  return data;
}
function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }
var BtnContainer = (0, _juno.styled)('div')(_templateObject(), (0, _juno.spacing)(8));
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
var CopyBtn = function CopyBtn(_ref2) {
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
exports.CopyBtn = CopyBtn;
CopyBtn.defaultProps = {
  handleSuccess: function handleSuccess() {},
  handleFailure: function handleFailure() {},
  currentLocale: 'en-US',
  value: '',
  size: 'small'
};
//# sourceMappingURL=CopyBtn.js.map
