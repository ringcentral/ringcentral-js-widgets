"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.object.assign.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.weak-map.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationPanel = void 0;
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.iterator.js");
var _components = require("@ringcentral-integration/micro-core/src/app/components");
var _hooks = require("@ringcentral-integration/micro-phone/src/app/hooks");
var _components2 = require("@ringcentral-integration/micro-phone/src/app/hooks/useContactRenderInfo/components");
var _components3 = require("@ringcentral-integration/next-widgets/components");
var _reactHooks = require("@ringcentral-integration/react-hooks");
var _utils = require("@ringcentral-integration/utils");
var _springUi = require("@ringcentral/spring-ui");
var _react = _interopRequireWildcard(require("react"));
var _useConversationActionButtons = require("../../ConversationsViewSpring/useConversationActionButtons");
var _useThreadInfoDisplay2 = require("../../MessageThreadsView/useThreadInfoDisplay");
var _ConversationMessageList = require("./ConversationMessageList");
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
var ConversationPanel = exports.ConversationPanel = function ConversationPanel(_ref) {
  var _threadMetadata$loadi;
  var _ref$messageText = _ref.messageText,
    _messageText = _ref$messageText === void 0 ? '' : _ref$messageText,
    _ref$updateMessageTex = _ref.updateMessageText,
    updateMessageText = _ref$updateMessageTex === void 0 ? function () {
      return null;
    } : _ref$updateMessageTex,
    _ref$attachments = _ref.attachments,
    attachments = _ref$attachments === void 0 ? [] : _ref$attachments,
    _ref$supportAttachmen = _ref.supportAttachment,
    supportAttachment = _ref$supportAttachmen === void 0 ? false : _ref$supportAttachmen,
    _ref$addAttachments = _ref.addAttachments,
    addAttachments = _ref$addAttachments === void 0 ? function () {
      return null;
    } : _ref$addAttachments,
    _ref$removeAttachment = _ref.removeAttachment,
    removeAttachment = _ref$removeAttachment === void 0 ? function () {
      return null;
    } : _ref$removeAttachment,
    conversation = _ref.conversation,
    messages = _ref.messages,
    replyToReceivers = _ref.replyToReceivers,
    sendButtonDisabled = _ref.sendButtonDisabled,
    acceptFileTypes = _ref.acceptFileTypes,
    onLinkClick = _ref.onLinkClick,
    goBack = _ref.goBack,
    inputRef = _ref.inputRef,
    toolbar = _ref.toolbar,
    createNewEntityTooltip = _ref.createNewEntityTooltip,
    alertProps = _ref.alertProps,
    showAlert = _ref.showAlert,
    _ref$displayLogStatus = _ref.displayLogStatus,
    displayLogStatus = _ref$displayLogStatus === void 0 ? false : _ref$displayLogStatus,
    showLogPopover = _ref.showLogPopover,
    useConversationItemInfo = _ref.useConversationItemInfo,
    useActionsHandler = _ref.useActionsHandler,
    threadInfo = _ref.threadInfo,
    extensionId = _ref.extensionId,
    threadMetadata = _ref.threadMetadata,
    timeKey = _ref.timeKey,
    endAdornment = _ref.endAdornment;
  var viewLogAnchorRef = (0, _react.useRef)(null);
  var _useAsyncState = (0, _reactHooks.useAsyncState)(_messageText, updateMessageText),
    _useAsyncState2 = _slicedToArray(_useAsyncState, 2),
    messageText = _useAsyncState2[0],
    setMessageText = _useAsyncState2[1];
  var _useContactRenderInfo = (0, _hooks.useContactRenderInfoFromConversation)(conversation, {
      timePresentationMode: 'withTime',
      displayLogStatus: displayLogStatus
    }),
    DisplayName = _useContactRenderInfo.DisplayName,
    correspondentsDisplayInfoMap = _useContactRenderInfo.correspondentsDisplayInfoMap;
  var _useConversationItemI = useConversationItemInfo(conversation),
    info = _useConversationItemI.info,
    _useConversationItemI2 = _useConversationItemI.actions,
    actions = _useConversationItemI2 === void 0 ? [] : _useConversationItemI2;
  var onAction = useActionsHandler(conversation, info, 'Text conversation page');
  var _useThreadInfoDisplay = (0, _useThreadInfoDisplay2.useThreadInfoDisplay)({
      info: threadInfo,
      extensionId: extensionId,
      onAction: onAction,
      metadata: threadMetadata
    }),
    bannerDisplay = _useThreadInfoDisplay.bannerDisplay,
    ThreadBanner = _useThreadInfoDisplay.ThreadBanner,
    ThreadStatus = _useThreadInfoDisplay.ThreadStatus,
    threadShowInput = _useThreadInfoDisplay.showInput;
  var isLoading = (_threadMetadata$loadi = threadMetadata === null || threadMetadata === void 0 ? void 0 : threadMetadata.loading) !== null && _threadMetadata$loadi !== void 0 ? _threadMetadata$loadi : false;
  // Hide input when alert is shown (e.g., opt out)
  var showInput = !showAlert && threadShowInput;
  var buttons = (0, _useConversationActionButtons.useConversationActionButtons)({
    actions: actions,
    conversation: conversation,
    showLogPopover: showLogPopover,
    onAction: onAction,
    createNewEntityTooltip: createNewEntityTooltip,
    variant: 'plain',
    displayCount: 2,
    moreButtonProps: {
      variant: 'contained'
    }
  });
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_components.AppHeaderNav, {
    override: true
  }, /*#__PURE__*/_react["default"].createElement(_components3.PageHeader, {
    onBackClick: function onBackClick() {
      return goBack();
    },
    endAdornment: buttons
  }, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "currentName",
    className: "flex justify-center items-center gap-1 overflow-hidden"
  }, /*#__PURE__*/_react["default"].createElement(DisplayName, {
    displayControl: {
      maybe: true,
      matchCounts: true
    }
  }), /*#__PURE__*/_react["default"].createElement(ThreadStatus, null)))), /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "conversationPanel",
    ref: viewLogAnchorRef,
    className: "relative h-full"
  }, isLoading && /*#__PURE__*/_react["default"].createElement("div", {
    className: "absolute bottom-2 left-2"
  }, /*#__PURE__*/_react["default"].createElement(_springUi.CircularProgressIndicator, {
    size: "xsmall"
  })), /*#__PURE__*/_react["default"].createElement(_ConversationMessageList.ConversationMessageList, {
    messages: messages,
    className: "h-full",
    timeKey: timeKey,
    renderSenderName: function renderSenderName(message) {
      var _message$from$extensi;
      var phoneNumber = message.from && ((_message$from$extensi = message.from.extensionNumber) !== null && _message$from$extensi !== void 0 ? _message$from$extensi : message.from.phoneNumber);
      var displayInfo = phoneNumber ? correspondentsDisplayInfoMap === null || correspondentsDisplayInfoMap === void 0 ? void 0 : correspondentsDisplayInfoMap.get(phoneNumber) : undefined;
      if (!displayInfo) return null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "text-neutral-b2 typography-detailBold mb-1"
      }, /*#__PURE__*/_react["default"].createElement(_components2.ContactDisplayRender, {
        info: displayInfo
      }));
    },
    onLinkClick: onLinkClick
  })), /*#__PURE__*/_react["default"].createElement(_components.AppFooterNav, null, showAlert ? /*#__PURE__*/_react["default"].createElement(_springUi.Alert, _extends({
    className: "m-4",
    severity: "error",
    startSlot: null
  }, alertProps)) : bannerDisplay ? /*#__PURE__*/_react["default"].createElement(ThreadBanner, null) : null, showInput ? /*#__PURE__*/_react["default"].createElement("div", {
    className: "border-t border-neutral-b0-t20"
  }, /*#__PURE__*/_react["default"].createElement(_components3.MessageInput, {
    inputText: messageText,
    acceptFileTypes: acceptFileTypes,
    onChange: setMessageText,
    sendDisabled: sendButtonDisabled,
    onSend: replyToReceivers,
    attachments: attachments,
    supportAttachment: supportAttachment,
    onAddAttachment: (/*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(data) {
        var files;
        return _regenerator().w(function (_context2) {
          while (1) switch (_context2.n) {
            case 0:
              _context2.n = 1;
              return Promise.all(data.map(/*#__PURE__*/function () {
                var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(file) {
                  var name, size, base64Url;
                  return _regenerator().w(function (_context) {
                    while (1) switch (_context.n) {
                      case 0:
                        name = file.name, size = file.size;
                        _context.n = 1;
                        return (0, _utils.fileToBase64)(file);
                      case 1:
                        base64Url = _context.v;
                        return _context.a(2, {
                          name: name,
                          size: size,
                          file: file,
                          base64Url: base64Url
                        });
                    }
                  }, _callee);
                }));
                return function (_x2) {
                  return _ref3.apply(this, arguments);
                };
              }()));
            case 1:
              files = _context2.v;
              addAttachments(files);
            case 2:
              return _context2.a(2);
          }
        }, _callee2);
      }));
      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }()),
    onRemoveAttachment: removeAttachment,
    inputRef: inputRef,
    endAdornment: endAdornment,
    toolbar: toolbar
  })) : null));
};
ConversationPanel.displayName = 'ConversationPanel';
//# sourceMappingURL=ConversationPanel.js.map
