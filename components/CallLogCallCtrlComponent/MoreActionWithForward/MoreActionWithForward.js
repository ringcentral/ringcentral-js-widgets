"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MoreActionWithForward = void 0;

require("core-js/modules/es6.object.define-property");

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

var _juno = require("@ringcentral/juno");

var _Ignore = _interopRequireDefault(require("@ringcentral/juno/icon/Ignore"));

var _classnames2 = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _DynamicsFont = _interopRequireDefault(require("../../../assets/DynamicsFont/DynamicsFont.scss"));

var _Forward_white = _interopRequireDefault(require("../../../assets/images/Forward_white.svg"));

var _MoreIcon = _interopRequireDefault(require("../../../assets/images/MoreIcon.svg"));

var _CircleButton = _interopRequireDefault(require("../../CircleButton"));

var _i18n = _interopRequireDefault(require("../i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MoreActionWithForward = function MoreActionWithForward(props) {
  var disabled = props.disabled,
      currentLocale = props.currentLocale,
      forwardingNumbers = props.forwardingNumbers,
      forward = props.forward,
      ignore = props.ignore,
      clickForwardTrack = props.clickForwardTrack;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      anchorEl = _useState2[0],
      setAnchorEl = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      forwardListEl = _useState4[0],
      setForwardListEl = _useState4[1];

  var handleClick = function handleClick(event) {
    setAnchorEl(event.currentTarget);
  };

  var handleClose = function handleClose() {
    setAnchorEl(null);
  };

  var handleForwardListClick = function handleForwardListClick(event) {
    var _event$currentTarget$;

    clickForwardTrack();
    setForwardListEl((_event$currentTarget$ = event.currentTarget.children) === null || _event$currentTarget$ === void 0 ? void 0 : _event$currentTarget$[0]);
  };

  var handleForwardListClose = function handleForwardListClose() {
    setForwardListEl(null);
  };

  var onForward = function onForward(event) {
    var selectedValue = event.currentTarget.attributes['data-value'].value;

    if (selectedValue === 'custom') {
      setForwardListEl(null);
      setAnchorEl(null);
    }

    forward(selectedValue);
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("span", {
    title: _i18n["default"].getString('more', currentLocale)
  }, /*#__PURE__*/_react["default"].createElement(_CircleButton["default"], {
    dataSign: "more",
    icon: _MoreIcon["default"],
    onClick: handleClick,
    className: (0, _classnames2["default"])(_styles["default"].button, _defineProperty({}, _styles["default"].buttonDisabled, disabled))
  })), /*#__PURE__*/_react["default"].createElement(_juno.RcPopover, {
    open: !!anchorEl,
    onClose: handleClose,
    anchorEl: anchorEl,
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    }
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuList, null, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    onClick: handleForwardListClick,
    className: _styles["default"].menuItem,
    "data-sign": "forward"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].itemIconLeft
  }, /*#__PURE__*/_react["default"].createElement(_Forward_white["default"], null)), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].itemText
  }, "Forward"), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].backIcon
  }, /*#__PURE__*/_react["default"].createElement("i", {
    "data-sign": "backButton",
    className: _DynamicsFont["default"].arrow
  }))), /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
    className: _styles["default"].menuItem,
    onClick: ignore,
    "data-sign": "ignore"
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: (0, _classnames2["default"])(_styles["default"].itemIconLeft, _styles["default"].ignoreIcon)
  }, /*#__PURE__*/_react["default"].createElement(_Ignore["default"], null)), /*#__PURE__*/_react["default"].createElement("span", {
    className: _styles["default"].itemText
  }, "Ignore")))), /*#__PURE__*/_react["default"].createElement(_juno.RcPopover, {
    open: !!forwardListEl,
    onClose: handleForwardListClose,
    anchorEl: forwardListEl,
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'left'
    },
    transformOrigin: {
      vertical: 'bottom',
      horizontal: 'right'
    }
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcMenuList, {
    classes: {
      root: _styles["default"].forwardMenuList
    }
  }, [].concat(_toConsumableArray(forwardingNumbers), [{
    phoneNumber: 'custom',
    label: _i18n["default"].getString('custom', currentLocale)
  }]).map(function (item) {
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenuItem, {
      onClick: onForward,
      key: item.phoneNumber,
      "data-value": item.phoneNumber,
      "data-sign": item.phoneNumber
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: _styles["default"].forwardNumberItem
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].actionText
    }, item.label), item.phoneNumber !== 'custom' && /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].subText
    }, item.phoneNumber)));
  }))));
};

exports.MoreActionWithForward = MoreActionWithForward;
//# sourceMappingURL=MoreActionWithForward.js.map
