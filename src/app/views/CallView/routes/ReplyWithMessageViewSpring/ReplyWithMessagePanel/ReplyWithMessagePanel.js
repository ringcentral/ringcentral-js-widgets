"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReplyWithMessagePanel = void 0;
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.trim.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _hooks2 = require("../../../../../hooks");
var _i18n = _interopRequireDefault(require("./i18n"));
var _sanitizedMessage = require("./sanitizedMessage");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
/**
 * base on container height, calculate the max row of textarea dynamically
 *
 * TODO: if other place need that, move to react-hooks and make that be more generic
 */
var useSpringTextareaDynamicMaxRows = function useSpringTextareaDynamicMaxRows() {
  var _useState = (0, _react.useState)(20),
    _useState2 = _slicedToArray(_useState, 2),
    maxRow = _useState2[0],
    setMaxRow = _useState2[1];
  var textareaContainerRef = (0, _react.useRef)(null);
  (0, _springUi.useResizeObserver)(textareaContainerRef, function () {
    var hullElm = textareaContainerRef.current;
    if (!hullElm) return;
    var formField = textareaContainerRef.current.querySelector('.sui-form-field-container');
    if (!formField) return;
    var clientHeight = hullElm.clientHeight;
    formField.style.display = 'none';
    var spaceHeight = clientHeight - formField.clientHeight -
    // space
    32 -
    // textarea padding
    32 -
    // buffer
    32;
    formField.style.display = '';
    var newMaxRow = Math.floor((spaceHeight || 16 * 20) / 16);
    setMaxRow(newMaxRow);
  }, {
    mode: 'throttle'
  });
  return {
    textareaContainerRef: textareaContainerRef,
    maxRow: maxRow
  };
};
var ReplyWithMessagePanel = exports.ReplyWithMessagePanel = function ReplyWithMessagePanel(_ref) {
  var call = _ref.call,
    options = _ref.options,
    replayMessageProp = _ref.replayMessage,
    onAction = _ref.onAction,
    onOptionClick = _ref.onOptionClick,
    onReplayMessageChangeProp = _ref.onReplayMessageChange;
  var _useAsyncState = (0, _reactHooks.useAsyncState)(replayMessageProp, onReplayMessageChangeProp),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    replayMessage = _useAsyncState2[0],
    onReplayMessageChange = _useAsyncState2[1];
  var _useContactRenderInfo = (0, _hooks2.useContactRenderInfoFromCall)(call, {
      phoneNumberDisplayMode: 'unknown',
      hideBlockedFromInfo: true
    }),
    DisplayName = _useContactRenderInfo.DisplayName,
    displayPhoneNumber = _useContactRenderInfo.displayPhoneNumber,
    Avatar = _useContactRenderInfo.Avatar;
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var _useSpringTextareaDyn = useSpringTextareaDynamicMaxRows(),
    textareaContainerRef = _useSpringTextareaDyn.textareaContainerRef,
    maxRow = _useSpringTextareaDyn.maxRow;
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "replyWithMessagePage",
    className: "flex flex-col h-full"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "call-information",
    className: "mt-5 mx-2 gap-1 flex items-center flex-none"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
    symbol: _springIcon.CaretLeftMd,
    color: "secondary",
    variant: "icon",
    "data-sign": "backButton",
    onClick: function onClick() {
      onAction('activeCall');
    }
  }), /*#__PURE__*/_react["default"].createElement(Avatar, {
    size: "xlarge"
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "ml-2"
  }, /*#__PURE__*/_react["default"].createElement("h3", {
    className: "typography-title text-neutral-b0 truncate w-full flex flex-col",
    "data-sign": "userDisplayName"
  }, /*#__PURE__*/_react["default"].createElement(DisplayName, {
    displayControl: {
      maybe: true,
      viewable: true,
      matchCounts: true
    }
  })), /*#__PURE__*/_react["default"].createElement("p", {
    className: "typography-descriptorMini text-neutral-b0",
    "data-sign": "userPhoneNumber"
  }, displayPhoneNumber))), /*#__PURE__*/_react["default"].createElement(_springUi.List, {
    className: "mt-8 flex-none"
  }, options.map(function (item, index) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.ListItem, {
      key: index,
      divider: false,
      onClick: function onClick() {
        onOptionClick === null || onOptionClick === void 0 ? void 0 : onOptionClick(item);
      },
      className: "group",
      "data-sign": item.text
    }, /*#__PURE__*/_react["default"].createElement(_springUi.ListItemText, {
      primary: item.text
    }), /*#__PURE__*/_react["default"].createElement("i", {
      className: "flex-auto"
    }), !item.options && /*#__PURE__*/_react["default"].createElement(_springUi.Icon, {
      color: "action.grayLight",
      size: "small",
      symbol: _springIcon.SendMd,
      className: "hidden group-hover:block",
      "data-sign": "sendIcon"
    }));
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "mt-5 mb-3 mx-4 flex-auto overflow-hidden",
    ref: textareaContainerRef,
    "data-sign": "customMessage"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Textarea, {
    fullWidth: true,
    value: replayMessage,
    minRows: 2,
    maxRows: maxRow,
    onChange: function onChange(event) {
      var result = (0, _sanitizedMessage.sanitizedMessage)(event.target.value);
      onReplayMessageChange(result);
    },
    label: t('customMessage'),
    placeholder: t('customMessagePlaceholder'),
    inputProps: {
      maxLength: 100
    },
    showCharacterCount: true,
    onKeyDown: function onKeyDown(e) {
      var _event$target;
      // when in composition mode, do not handle enter key, user still typing
      if (e.nativeEvent.isComposing) return;
      var event = e;
      var value = (_event$target = event.target) === null || _event$target === void 0 ? void 0 : _event$target.value;
      if (!event.shiftKey && event.key === 'Enter') {
        onAction('startReply', {
          // remove leading and trailing spaces
          replyWithText: value.trim()
        });
        e.preventDefault();
      }
    }
  })));
};
//# sourceMappingURL=ReplyWithMessagePanel.js.map
