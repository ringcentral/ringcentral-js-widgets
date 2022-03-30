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
exports.DirectlyProceedLine = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ListItem = require("@ringcentral/juno/es6/components/List/ListItem/ListItem.js");

var _ListItemAvatar = require("@ringcentral/juno/es6/components/List/ListItemAvatar/ListItemAvatar.js");

var _Avatar = require("@ringcentral/juno/es6/components/Avatar/Avatar.js");

var _ListItemText = require("@ringcentral/juno/es6/components/List/ListItemText/ListItemText.js");

var _ListItemSecondaryAction = require("@ringcentral/juno/es6/components/List/ListItemSecondaryAction/ListItemSecondaryAction.js");

var _Icon = require("@ringcentral/juno/es6/components/Icon/Icon.js");

var _Dial = _interopRequireDefault(require("@ringcentral/juno/es6/icon/Dial.js"));

var _DefaultAvatar = _interopRequireDefault(require("@ringcentral/juno/es6/icon/DefaultAvatar.js"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var DirectlyProceedLine = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var onClick = _ref.onClick,
      number = _ref.number,
      currentLocale = _ref.currentLocale,
      inMessagePage = _ref.inMessagePage;
  return /*#__PURE__*/_react["default"].createElement(_ListItem.RcListItem, {
    "data-sign": "directlyProceedEntrance",
    color: "highlight.f01",
    singleLine: true,
    onClick: onClick
  }, /*#__PURE__*/_react["default"].createElement(_ListItemAvatar.RcListItemAvatar, null, /*#__PURE__*/_react["default"].createElement(_Avatar.ExportType, {
    color: "avatar.global",
    size: "xsmall",
    iconSymbol: _DefaultAvatar["default"]
  })), /*#__PURE__*/_react["default"].createElement(_ListItemText.RcListItemText, {
    primary: "".concat(_i18n["default"].getString(inMessagePage ? 'message' : 'dial', currentLocale)),
    secondary: number
  }), /*#__PURE__*/_react["default"].createElement(_ListItemSecondaryAction.RcListItemSecondaryAction, null, /*#__PURE__*/_react["default"].createElement(_Icon.RcIcon, {
    color: "action.primary",
    symbol: _Dial["default"]
  })));
});
exports.DirectlyProceedLine = DirectlyProceedLine;
//# sourceMappingURL=DirectlyProceedLine.js.map
