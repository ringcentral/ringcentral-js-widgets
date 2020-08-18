"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WorkingStateButton = void 0;

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.map");

var _rcui = require("@ringcentral-integration/rcui");

var _iconArrowDown = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-arrow-down.svg"));

var _iconArrowUp = _interopRequireDefault(require("@ringcentral-integration/rcui/icons/icon-arrow-up.svg"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _Tooltip = require("ringcentral-widgets/components/Rcui/Tooltip");

var _toolTipDelayTime = require("ringcentral-widgets/lib/toolTipDelayTime");

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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
    className: (0, _classnames["default"])(_styles["default"].state, _styles["default"][color]),
    onClick: handleClick
  }, /*#__PURE__*/_react["default"].createElement(_rcui.RcButtonBase, {
    disabled: disabled,
    className: _styles["default"].fullWidth
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
  }, timerText), /*#__PURE__*/_react["default"].createElement(_rcui.RcIcon, {
    className: _styles["default"].icon,
    symbol: menuOpened ? _iconArrowUp["default"] : _iconArrowDown["default"]
  }))), /*#__PURE__*/_react["default"].createElement(_rcui.RcMenu, {
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
    return /*#__PURE__*/_react["default"].createElement(_rcui.RcMenuItem, {
      key: i,
      classes: {
        root: _styles["default"].item
      },
      onClick: function onClick() {
        handleClose();
        onChange(state);
      },
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
