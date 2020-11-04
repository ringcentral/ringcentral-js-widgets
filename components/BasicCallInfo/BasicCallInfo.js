"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BasicCallInfo = void 0;

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

var _juno = require("@ringcentral/juno");

var _iconChevron_left = _interopRequireDefault(require("@ringcentral/juno/icons/icon-chevron_left.svg"));

var _iconChevron_right = _interopRequireDefault(require("@ringcentral/juno/icons/icon-chevron_right.svg"));

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _AnimationPanel = require("../AnimationPanel");

var _ShinyBar = require("../LogBasicInfoV2/ShinyBar");

var _BasicCallInfoMain = require("./BasicCallInfoMain");

var _CallInfoList = require("./CallInfoList");

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

var BasicCallInfo = function BasicCallInfo(_ref) {
  var subject = _ref.subject,
      isInbound = _ref.isInbound,
      isRinging = _ref.isRinging,
      followInfos = _ref.followInfos,
      callInfos = _ref.callInfos,
      panelClass = _ref.classes.panel,
      status = _ref.status,
      callControlRef = _ref.callControlRef,
      onCopySuccess = _ref.onCopySuccess,
      currentLocale = _ref.currentLocale;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      open = _useState2[0],
      setOpen = _useState2[1];

  var _useState3 = (0, _react.useState)('100%'),
      _useState4 = _slicedToArray(_useState3, 2),
      panelHeight = _useState4[0],
      setPanelHeight = _useState4[1];

  var toggleOpen = function toggleOpen() {
    return setOpen(!open);
  };

  (0, _react.useEffect)(function () {
    if (callControlRef.current) {
      setPanelHeight("calc(100% - ".concat(callControlRef.current.clientHeight, "px)"));
    }
  }, [callControlRef, status]); // when ringing state change, close that info view

  (0, _react.useEffect)(function () {
    if (open && !isRinging) {
      toggleOpen();
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [isRinging]);
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "basicCallInfo",
    className: _styles["default"].container
  }, /*#__PURE__*/_react["default"].createElement(_BasicCallInfoMain.BasicCallInfoMain, {
    subject: subject,
    isInbound: isInbound,
    followInfos: followInfos
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].rightIcon
  }, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    variant: "round",
    size: "small",
    color: "grey.700",
    symbol: _iconChevron_right["default"],
    "data-sign": "detailButton",
    onClick: toggleOpen
  }))), /*#__PURE__*/_react["default"].createElement(_ShinyBar.ShinyBar, {
    isRinging: isRinging,
    className: _styles["default"].bottom,
    status: status
  })), /*#__PURE__*/_react["default"].createElement(_AnimationPanel.AnimationPanel, {
    open: open,
    className: (0, _classnames["default"])(_styles["default"].panelContainer, panelClass),
    style: {
      height: panelHeight
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].panel
  }, /*#__PURE__*/_react["default"].createElement("header", null, /*#__PURE__*/_react["default"].createElement(_juno.RcIconButton, {
    variant: "round",
    size: "small",
    color: "grey.700",
    symbol: _iconChevron_left["default"],
    "data-sign": "backButton",
    onClick: toggleOpen
  })), /*#__PURE__*/_react["default"].createElement("main", null, /*#__PURE__*/_react["default"].createElement(_BasicCallInfoMain.BasicCallInfoMain, {
    subject: subject,
    isInbound: isInbound,
    followInfos: followInfos,
    className: open && _styles["default"].infoMain
  }), /*#__PURE__*/_react["default"].createElement(_CallInfoList.CallInfoList, {
    callInfos: callInfos,
    className: _styles["default"].infoList,
    onCopySuccess: onCopySuccess,
    currentLocale: currentLocale
  })))));
};

exports.BasicCallInfo = BasicCallInfo;
BasicCallInfo.defaultProps = {
  classes: {}
};
//# sourceMappingURL=BasicCallInfo.js.map
