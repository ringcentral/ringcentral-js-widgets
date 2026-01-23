"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageInput = void 0;
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/es.string.iterator.js");
var _hooks = require("@ringcentral-integration/micro-core/src/app/hooks");
var _springIcon = require("@ringcentral/spring-icon");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _EmojiMenu = require("./EmojiMenu");
var _FileAttacher = require("./FileAttacher");
var _i18n = _interopRequireDefault(require("./i18n"));
var _utils = require("./utils");
var _excluded = ["inputText", "acceptFileTypes", "supportAttachment", "toolbar", "attachments", "inputRef", "sendDisabled", "sendButton", "onAddAttachment", "onRemoveAttachment", "onChange", "onSend", "className", "maxLength", "endAdornment"];
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
var SMS_ACCEPT_TYPES = _FileAttacher.SUPPORTED_MMS_MIME_TYPES_IN_LOWERCASE.join();
var MessageInput = exports.MessageInput = function MessageInput(_ref) {
  var inputText = _ref.inputText,
    _ref$acceptFileTypes = _ref.acceptFileTypes,
    acceptFileTypes = _ref$acceptFileTypes === void 0 ? SMS_ACCEPT_TYPES : _ref$acceptFileTypes,
    _ref$supportAttachmen = _ref.supportAttachment,
    supportAttachment = _ref$supportAttachmen === void 0 ? true : _ref$supportAttachmen,
    toolbar = _ref.toolbar,
    inputAttachmentList = _ref.attachments,
    inputRefProp = _ref.inputRef,
    sendDisabled = _ref.sendDisabled,
    _ref$sendButton = _ref.sendButton,
    sendButton = _ref$sendButton === void 0 ? true : _ref$sendButton,
    onAddAttachment = _ref.onAddAttachment,
    onRemoveAttachment = _ref.onRemoveAttachment,
    _onChange = _ref.onChange,
    onSend = _ref.onSend,
    className = _ref.className,
    _ref$maxLength = _ref.maxLength,
    maxLength = _ref$maxLength === void 0 ? 1000 : _ref$maxLength,
    endAdornment = _ref.endAdornment,
    rest = _objectWithoutProperties(_ref, _excluded);
  var _useLocale = (0, _hooks.useLocale)(_i18n["default"]),
    t = _useLocale.t;
  var attachmentListLength = inputAttachmentList.length;
  var innerRef = (0, _react.useRef)(null);
  var scrollRef = (0, _react.useRef)(null);
  var inputRef = (0, _springUi.useForkRef)(innerRef, inputRefProp);
  var emojiActionRef = (0, _react.useRef)(null);
  var latestPosRef = (0, _react.useRef)(null);
  var prevAttachmentListLength = (0, _springUi.usePrevious)(function () {
    return attachmentListLength;
  }, true);
  var onSendSms = function onSendSms() {
    var _emojiActionRef$curre;
    if (sendDisabled) return;

    // after send message auto close emoji dialog
    (_emojiActionRef$curre = emojiActionRef.current) === null || _emojiActionRef$curre === void 0 ? void 0 : _emojiActionRef$curre.close();
    onSend === null || onSend === void 0 ? void 0 : onSend(inputText, inputAttachmentList);
  };

  // when have new attachment, scroll to bottom of attachment list
  (0, _react.useLayoutEffect)(function () {
    var addNewAttachment = attachmentListLength > prevAttachmentListLength;
    if (!addNewAttachment) return;
    var scrollElm = scrollRef.current;
    if (scrollElm) {
      scrollElm.scrollTop = scrollElm.scrollHeight;
    }
  });
  (0, _springUi.useEventListener)(innerRef, 'change-programmatically', function (e) {
    _onChange(e.detail);
  });
  return /*#__PURE__*/_react["default"].createElement("div", _extends({
    "data-sign": "message-editor",
    className: className
  }, rest), /*#__PURE__*/_react["default"].createElement("div", {
    className: "h-10 flex items-center justify-between px-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex items-center"
  }, supportAttachment && /*#__PURE__*/_react["default"].createElement(_FileAttacher.AttachButton, {
    multiple: true,
    acceptTypes: acceptFileTypes,
    TooltipProps: {
      title: t('attachFiles')
    },
    onUpload: function onUpload(files) {
      var _emojiActionRef$curre2;
      // when upload be trigger also close popup
      (_emojiActionRef$curre2 = emojiActionRef.current) === null || _emojiActionRef$curre2 === void 0 ? void 0 : _emojiActionRef$curre2.close();
      onAddAttachment(files);
    }
  }), /*#__PURE__*/_react["default"].createElement(_EmojiMenu.EmojiMenu, {
    action: emojiActionRef,
    getInputElement: function getInputElement() {
      return innerRef.current;
    },
    onSelect: function onSelect(data, position) {
      var textarea = innerRef.current;
      if (!textarea) return;
      var emoji = data["native"];
      var result = (0, _utils.getTextFieldInsertResult)({
        input: textarea,
        insertValue: emoji,
        sourcePosition: position
      });
      var nextPositionInfo = result.start;
      if (nextPositionInfo) {
        requestAnimationFrame(function () {
          (0, _springUi.setSelectionPosition)(textarea, {
            start: nextPositionInfo,
            end: nextPositionInfo
          });
        });
      }
      (0, _utils.setNativeValue)(textarea, result.value);
      textarea.focus();
    }
  }), toolbar), inputText && /*#__PURE__*/_react["default"].createElement("span", {
    title: t('smsNewLineHint'),
    className: "typography-descriptor text-neutral-b2 truncate"
  }, t('smsNewLineHint'))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "relative px-3 pb-2"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.Textarea, {
    maxRows: 17,
    size: "medium",
    placeholder: t('smsEditHint'),
    classes: {
      formFieldContent: 'flex-col items-start'
    },
    variant: "outlined",
    value: inputText,
    inputRef: inputRef,
    onChange: function onChange(e) {
      _onChange(e.target.value);
    },
    onPaste: function onPaste(e) {
      if (!supportAttachment) return;
      var files = Array.from(e.clipboardData.files);
      if (files.length > 0) {
        onAddAttachment(files);
      }
    },
    className: "w-full",
    inputProps: {
      'data-sign': 'messageInput',
      onKeyPress: sendButton ? function (e) {
        if (e.key === 'Enter' && !e.shiftKey) {
          e.preventDefault();
          return onSendSms();
        }
      } : undefined,
      onKeyDown: function onKeyDown(e) {
        if (e.key === 'Escape') {
          var _emojiActionRef$curre3;
          (_emojiActionRef$curre3 = emojiActionRef.current) === null || _emojiActionRef$curre3 === void 0 ? void 0 : _emojiActionRef$curre3.close();
        }
      },
      onBlur: function onBlur(e) {
        // save the latest position when the textarea is blurred for we can insert the template at the right position
        latestPosRef.current = (0, _springUi.getSelectionPosition)(e.currentTarget);
        e.currentTarget.dataset.latestPos = JSON.stringify(latestPosRef.current);
      },
      maxLength: maxLength
    },
    clearBtn: false,
    endAdornment: sendButton ? /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, endAdornment, /*#__PURE__*/_react["default"].createElement("div", {
      className: "absolute right-1 bottom-1"
    }, /*#__PURE__*/_react["default"].createElement(_springUi.IconButton, {
      TooltipProps: {
        title: sendDisabled ? undefined : t('smsSendTooltip')
      },
      disabled: sendDisabled,
      color: "primary",
      size: "small",
      "data-sign": "messageButton",
      variant: "icon",
      onMouseDown: function onMouseDown(e) {
        return e.preventDefault();
      },
      symbol: _springIcon.SendMd,
      onClick: onSendSms
    })), /*#__PURE__*/_react["default"].createElement("div", {
      className: "w-6"
    })) : endAdornment
  })), inputAttachmentList.length > 0 && /*#__PURE__*/_react["default"].createElement("section", {
    ref: scrollRef,
    className: "max-h-[125px] overflow-y-auto px-3 pb-3"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "flex flex-1 flex-wrap gap-2"
  }, /*#__PURE__*/_react["default"].createElement(_FileAttacher.AttachmentList, {
    files: inputAttachmentList,
    onRemoveAttachment: onRemoveAttachment,
    "data-sign": "textAttachmentsList"
  }))));
};
//# sourceMappingURL=MessageInput.js.map
