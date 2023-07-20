"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DirectlyProceedLine = void 0;
var _react = _interopRequireWildcard(require("react"));
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _i18n = _interopRequireDefault(require("./i18n"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var DirectlyProceedLine = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var onClick = _ref.onClick,
    number = _ref.number,
    currentLocale = _ref.currentLocale,
    inMessagePage = _ref.inMessagePage;
  return /*#__PURE__*/_react["default"].createElement(_juno.RcListItem, {
    "data-sign": "directlyProceedEntrance",
    color: "highlight.f01",
    singleLine: true,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItemAvatar, null, /*#__PURE__*/_react["default"].createElement(_juno.RcAvatar, {
    color: "avatar.global",
    size: "xsmall",
    iconSymbol: _junoIcon.DefaultAvatar
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
    primary: "".concat(_i18n["default"].getString(inMessagePage ? 'message' : 'dial', currentLocale)),
    secondary: number
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemSecondaryAction, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    color: "action.primary",
    symbol: _junoIcon.Dial
  })));
});
exports.DirectlyProceedLine = DirectlyProceedLine;
//# sourceMappingURL=DirectlyProceedLine.js.map
