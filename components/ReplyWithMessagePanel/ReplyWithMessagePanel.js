"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.is-array");
require("core-js/modules/es.array.map");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplyWithMessagePanel = void 0;
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _react = _interopRequireWildcard(require("react"));
var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _style = require("./style");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
var ReplyWithMessagePanel = function ReplyWithMessagePanel(_ref) {
  var onBackClick = _ref.onBackClick,
    displayCustomMessage = _ref.displayCustomMessage,
    reply = _ref.reply,
    currentLocale = _ref.currentLocale,
    children = _ref.children,
    options = _ref.options;
  var _useState = (0, _react.useState)(null),
    _useState2 = _slicedToArray(_useState, 2),
    anchorEl = _useState2[0],
    setAnchorEl = _useState2[1];
  var _useState3 = (0, _react.useState)(null),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedIndex = _useState4[0],
    setSelectedIndex = _useState4[1];
  var _useState5 = (0, _react.useState)(null),
    _useState6 = _slicedToArray(_useState5, 2),
    popKey = _useState6[0],
    setPopKey = _useState6[1];
  var handleClose = function handleClose() {
    setAnchorEl(null);
    setPopKey(null);
  };
  var renderMenu = function renderMenu(_ref2, index) {
    var options = _ref2.options,
      pattern = _ref2.pattern;
    return /*#__PURE__*/_react["default"].createElement(_juno.RcMenu, {
      key: "pop-".concat(index),
      open: "pop-".concat(index) === popKey,
      onClose: handleClose,
      anchorEl: anchorEl,
      anchorOrigin: {
        horizontal: 'right',
        vertical: 'top'
      },
      PaperProps: {
        style: {
          minWidth: 128
        }
      }
    }, options.map(function (item, subIndex) {
      return /*#__PURE__*/_react["default"].createElement(_style.TimeOptionItem, {
        onClick: function onClick() {
          reply({
            replyWithPattern: {
              pattern: pattern,
              time: item.timeValue,
              timeUnit: item.timeUnits
            }
          });
          onBackClick();
        },
        key: "time-".concat(index, "-").concat(subIndex)
      }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
        primary: item.text
      }), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemSecondaryAction, null, /*#__PURE__*/_react["default"].createElement(_style.TimeSendIcon, {
        color: "action.grayLight",
        size: "small",
        symbol: _junoIcon.Send
      })));
    }));
  };
  return /*#__PURE__*/_react["default"].createElement(_style.ReplyWithMessagePage, {
    "data-sign": "replyWithMessagePage"
  }, /*#__PURE__*/_react["default"].createElement(_BackHeaderV["default"], {
    onBackClick: onBackClick,
    title: _i18n["default"].getString('title', currentLocale)
  }), /*#__PURE__*/_react["default"].createElement(_style.ReplyOptionsList, null, options.map(function (item, index) {
    return item.options ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_style.ReplyOptionItem, {
      selected: index === selectedIndex,
      onClick: function onClick(event) {
        setAnchorEl(event.currentTarget);
        setPopKey("pop-".concat(index));
      },
      onMouseOver: function onMouseOver() {
        setSelectedIndex(index);
      },
      key: index
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
      primary: item.text,
      "data-sign": item.text
    })), renderMenu(item, index)) : /*#__PURE__*/_react["default"].createElement(_style.ReplyOptionItem, {
      onMouseOver: function onMouseOver() {
        setSelectedIndex(index);
      },
      key: index,
      selected: index === selectedIndex,
      onClick: function onClick() {
        reply({
          replyWithPattern: {
            pattern: item.pattern
          }
        });
        onBackClick();
      }
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
      primary: item.text,
      "data-sign": item.text
    }), /*#__PURE__*/_react["default"].createElement(_juno.RcListItemSecondaryAction, null, /*#__PURE__*/_react["default"].createElement(_style.SendIcon, {
      color: "action.grayLight",
      size: "small",
      symbol: _junoIcon.Send
    })));
  })), displayCustomMessage && /*#__PURE__*/_react["default"].createElement(_style.StyledCustomMessage, {
    "data-sign": "customMessage",
    fullWidth: true,
    label: _i18n["default"].getString('customMessage', currentLocale),
    placeholder: _i18n["default"].getString('customMessagePlaceholder', currentLocale),
    onKeyDown: function onKeyDown(event) {
      var _event$target;
      var reg = /([^\s])/g;
      if (event.key === 'Enter') {
        event.preventDefault();
      }
      if (event.key === 'Enter' && reg.test((_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value)) {
        reply({
          replyWithText: event.target.value
        });
        onBackClick();
      }
    }
  }), children);
};
exports.ReplyWithMessagePanel = ReplyWithMessagePanel;
//# sourceMappingURL=ReplyWithMessagePanel.js.map
