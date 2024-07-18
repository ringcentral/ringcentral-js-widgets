"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
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
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) { n[e] = r[e]; } return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0) { ; } } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
        key: "time-".concat(item.timeValue, "-").concat(index)
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
    return item.options ? /*#__PURE__*/_react["default"].createElement("div", {
      key: item.pattern
    }, /*#__PURE__*/_react["default"].createElement(_style.ReplyOptionItem, {
      selected: index === selectedIndex,
      onClick: function onClick(event) {
        setAnchorEl(event.currentTarget);
        setPopKey("pop-".concat(index));
      },
      onMouseOver: function onMouseOver() {
        setSelectedIndex(index);
      }
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcListItemText, {
      primary: item.text,
      "data-sign": item.text
    })), renderMenu(item, index)) : /*#__PURE__*/_react["default"].createElement(_style.ReplyOptionItem, {
      onMouseOver: function onMouseOver() {
        setSelectedIndex(index);
      },
      key: item.pattern,
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
