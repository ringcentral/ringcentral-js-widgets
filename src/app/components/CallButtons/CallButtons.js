"use strict";

require("core-js/modules/es.symbol.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EndAndAnswerButton = exports.CallButtonContainer = exports.AnswerAndHoldButton = void 0;
var _Tooltip = require("@ringcentral-integration/next-widgets/components/Tooltip");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireDefault(require("react"));
var _excluded = ["size", "children", "onClick"],
  _excluded2 = ["onClick", "disabled", "size"],
  _excluded3 = ["onClick", "disabled", "size"];
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var CallButtonContainer = exports.CallButtonContainer = function CallButtonContainer(_ref) {
  var children = _ref.children,
    size = _ref.size,
    label = _ref.label,
    TooltipProps = _ref.TooltipProps,
    className = _ref.className,
    onMouseOver = _ref.onMouseOver,
    onMouseLeave = _ref.onMouseLeave;
  // TODO: spring-ui issue focus inside on children should also show the tooltip
  return /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, TooltipProps, /*#__PURE__*/_react["default"].createElement("div", {
    onMouseOver: onMouseOver,
    onMouseLeave: onMouseLeave,
    "data-button-container": true,
    className: (0, _springUi.twMerge)('inline-flex items-center justify-start flex-col', size === 'small' && 'gap-1', size === 'large' && 'gap-1', size === 'xlarge' && 'gap-2 w-20', className)
  }, children, label && /*#__PURE__*/_react["default"].createElement("div", {
    className: "typography-descriptorMini text-center"
  }, label)));
};
var CUSTOM_SIZE_MAP = {
  small: {
    answer: 'size-7',
    action: 'size-5'
  },
  medium: {
    answer: 'size-6',
    action: 'size-4'
  },
  large: null,
  xlarge: null
};
var ICON_MAP = {
  small: {
    size: 'small',
    iconSize: 'xsmall'
  },
  medium: {
    size: 'small',
    iconSize: 'xsmall'
  },
  large: {
    size: 'small',
    iconSize: 'xsmall'
  },
  xlarge: {
    size: 'medium',
    iconSize: 'small'
  }
};
var ICON_CONTAINER_MAP = {
  small: 'size-9',
  medium: 'size-8',
  large: 'size-[48px]',
  xlarge: 'size-16'
};
var GroupButton = function GroupButton(_ref2) {
  var size = _ref2.size,
    children = _ref2.children,
    onClick = _ref2.onClick,
    rest = _objectWithoutProperties(_ref2, _excluded);
  var handleKeyDown = (0, _springUi.useA11yKeyEvent)(onClick);
  return /*#__PURE__*/_react["default"].createElement("div", _extends({}, rest, {
    tabIndex: 0,
    role: "button",
    onClick: onClick,
    onKeyDown: handleKeyDown,
    className: (0, _clsx["default"])('relative focus-visible:focus-ring-normal outline-none', ICON_CONTAINER_MAP[size])
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "pointer-events-none"
  }, children), /*#__PURE__*/_react["default"].createElement("div", {
    className: "hover:bg-neutral-base/20 active:bg-neutral-base/30 absolute top-0 left-0 size-full"
  }));
};
var EndAndAnswerButton = exports.EndAndAnswerButton = function EndAndAnswerButton(_ref3) {
  var onClick = _ref3.onClick,
    disabled = _ref3.disabled,
    size = _ref3.size,
    rest = _objectWithoutProperties(_ref3, _excluded2);
  var iconSizes = ICON_MAP[size];
  var customClasses = CUSTOM_SIZE_MAP[size];
  var icon = /*#__PURE__*/_react["default"].createElement(GroupButton, {
    size: size,
    onClick: onClick,
    "data-sign": rest['data-sign']
  }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, _extends({
    tabIndex: -1,
    className: (0, _clsx["default"])(customClasses === null || customClasses === void 0 ? void 0 : customClasses.action, 'absolute top-0 left-0 rotate-[135deg]')
  }, iconSizes, {
    symbol: _springIcon.CallFilledMd,
    color: "danger",
    variant: "contained",
    disabled: disabled
  })), /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    tabIndex: -1,
    className: (0, _clsx["default"])(customClasses === null || customClasses === void 0 ? void 0 : customClasses.answer, 'absolute bottom-0 right-0'),
    size: size,
    symbol: _springIcon.CallFilledMd,
    color: "success",
    variant: "contained",
    disabled: disabled
  }));
  return /*#__PURE__*/_react["default"].createElement(CallButtonContainer, _extends({
    size: size
  }, rest), icon);
};
var AnswerAndHoldButton = exports.AnswerAndHoldButton = function AnswerAndHoldButton(_ref4) {
  var onClick = _ref4.onClick,
    disabled = _ref4.disabled,
    size = _ref4.size,
    rest = _objectWithoutProperties(_ref4, _excluded3);
  var iconSizes = ICON_MAP[size];
  var customClasses = CUSTOM_SIZE_MAP[size];
  var icon = /*#__PURE__*/_react["default"].createElement(GroupButton, {
    size: size,
    onClick: onClick,
    "data-sign": rest['data-sign']
  }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, _extends({
    tabIndex: -1,
    className: (0, _clsx["default"])(customClasses === null || customClasses === void 0 ? void 0 : customClasses.action, 'absolute top-0 left-0')
  }, iconSizes, {
    symbol: _springIcon.HoldFilledMd,
    color: "primary",
    variant: "contained",
    disabled: disabled
  })), /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    tabIndex: -1,
    className: (0, _clsx["default"])(customClasses === null || customClasses === void 0 ? void 0 : customClasses.answer, 'absolute bottom-0 right-0'),
    size: size,
    symbol: _springIcon.CallFilledMd,
    color: "success",
    variant: "contained",
    disabled: disabled
  }));
  return /*#__PURE__*/_react["default"].createElement(CallButtonContainer, _extends({
    size: size
  }, rest), icon);
};
//# sourceMappingURL=CallButtons.js.map
