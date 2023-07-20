"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkingStateButton = void 0;
var _react = _interopRequireWildcard(require("react"));
var _classnames = _interopRequireDefault(require("classnames"));
var _Tooltip = require("@ringcentral-integration/widgets/components/Rcui/Tooltip");
var _toolTipDelayTime = require("@ringcentral-integration/widgets/lib/toolTipDelayTime");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var WorkingStateButton = function WorkingStateButton(_ref) {
  var label = _ref.label,
    options = _ref.options,
    optionIndex = _ref.optionIndex,
    color = _ref.color,
    onChange = _ref.onChange,
    disabled = _ref.disabled,
    timerText = _ref.timerText,
    classes = _ref.classes;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    anchorEl = _useState2[0],
    setAnchorEl = _useState2[1];
  var handleClick = function handleClick(event) {
    if (!disabled) {
      setAnchorEl(event.currentTarget);
    }
  };
  var handleClose = function handleClose() {
    setAnchorEl(null);
  };
  var menuOpened = Boolean(anchorEl);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    tabIndex: 0,
    role: "button",
    className: (0, _classnames["default"])(_styles["default"].state, _styles["default"][color]),
    onClick: handleClick
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcButtonBase, {
    disabled: disabled,
    className: _styles["default"].fullWidth,
    "data-sign": "workingStateButton"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].stateDot
  }), /*#__PURE__*/_react["default"].createElement(_Tooltip.Tooltip, {
    title: label,
    enterDelay: _toolTipDelayTime.TOOLTIP_LONG_DELAY_TIME
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].stateName,
    "data-sign": "stateName"
  }, label)), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].timer,
    "data-sign": "timer"
  }, timerText), /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
    className: _styles["default"].icon,
    symbol: menuOpened ? _junoIcon.ArrowUp : _junoIcon.ArrowDown
  }))), /*#__PURE__*/_react["default"].createElement(_juno.RcMenu, {
    PaperProps: {
      style: {
        maxHeight: 280
      }
    },
    classes: {
      paper: classes.paper
    },
    anchorEl: anchorEl,
    open: menuOpened,
    onClose: handleClose
  }, options.map(function (state, i) {
    var selected = optionIndex === i;
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      key: i,
      onClick: function onClick() {
        handleClose();
        onChange(state);
      },
      "data-sign": "workingStateItem",
      size: "medium",
      selected: selected
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: (0, _classnames["default"])(_styles["default"].stateListItemDot, _styles["default"][state.color])
    }), /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].stateItemName
    }, state.agentAuxState));
  })));
};
exports.WorkingStateButton = WorkingStateButton;
WorkingStateButton.defaultProps = {
  classes: {}
};
//# sourceMappingURL=WorkingStateButton.js.map
