"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.array.from");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.array.slice");

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuButton = void 0;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _juno = require("@ringcentral/juno");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MenuButton = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var icon = _ref.icon,
      label = _ref.label,
      disabled = _ref.disabled,
      subMenu = _ref.subMenu,
      dataSign = _ref.dataSign;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];

  var handleClick = function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  var renderMenuItem = function renderMenuItem(_ref2) {
    var icon = _ref2.icon,
        label = _ref2.label,
        disabled = _ref2.disabled,
        action = _ref2.action,
        subMenu = _ref2.subMenu,
        dataSign = _ref2.dataSign;

    var menuIcon = icon && /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      symbol: icon,
      size: "small"
    });

    if (action) {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
        onClick: action,
        icon: menuIcon,
        key: label,
        disabled: disabled,
        "data-sign": dataSign
      }, label);
    }

    if (subMenu) {
      return /*#__PURE__*/_react["default"].createElement(_juno.RcSubMenu, {
        title: label,
        icon: menuIcon,
        key: label,
        disabled: disabled,
        "data-sign": dataSign
      }, subMenu.map(renderMenuItem));
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    onClick: handleClick,
    symbol: icon,
    size: "medium",
    variant: "plain",
    disabled: disabled,
    "data-sign": dataSign
  }), /*#__PURE__*/_react["default"].createElement(_juno.RcMenu, {
    anchorEl: anchorEl,
    keepMounted: true,
    autoClose: true,
    open: Boolean(anchorEl),
    onClose: handleClose
  }, subMenu.map(renderMenuItem)));
});
exports.MenuButton = MenuButton;
//# sourceMappingURL=MenuButton.js.map
