"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ConversationMessageList = void 0;
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.big.js");
var _isBlank = require("@ringcentral-integration/commons/lib/isBlank");
var _hooks = require("@ringcentral-integration/micro-phone/src/app/hooks");
var _springUi = require("@ringcentral/spring-ui");
var _clsx = _interopRequireDefault(require("clsx"));
var _dayjs = _interopRequireDefault(require("dayjs"));
var _localizedFormat = _interopRequireDefault(require("dayjs/plugin/localizedFormat"));
var _react = _interopRequireWildcard(require("react"));
var _FileAttachmentRender = require("./FileAttachmentRender");
var _ImageAttachmentRender = require("./ImageAttachmentRender");
var _SubjectRender = require("./SubjectRender");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
_dayjs["default"].extend(_localizedFormat["default"]);
var Message = function Message(_ref) {
  var subject = _ref.subject,
    time = _ref.time,
    direction = _ref.direction,
    mmsAttachments = _ref.mmsAttachments,
    currentLocale = _ref.currentLocale,
    onAttachmentDownload = _ref.onAttachmentDownload,
    onLinkClick = _ref.onLinkClick,
    handleImageLoad = _ref.handleImageLoad,
    renderSenderName = _ref.renderSenderName,
    title = _ref.title;
  var subjectNode;
  if (subject && !(0, _isBlank.isBlank)(subject)) {
    subjectNode = /*#__PURE__*/_react["default"].createElement(_SubjectRender.SubjectRender, {
      onLinkClick: onLinkClick
    }, subject);
  }
  var imageAttachments = mmsAttachments.filter(function (m) {
    return m.contentType.indexOf('image') > -1;
  }).map(function (attachment) {
    return /*#__PURE__*/_react["default"].createElement(_ImageAttachmentRender.ImageAttachmentRender, {
      key: attachment.id,
      attachment: attachment,
      direction: direction,
      handleImageLoad: handleImageLoad
    });
  });
  var otherAttachments = mmsAttachments.filter(function (m) {
    return m.contentType.indexOf('image') === -1;
  }).map(function (attachment) {
    return /*#__PURE__*/_react["default"].createElement(_springUi.Block, {
      key: attachment.id,
      "data-sign": "".concat(direction, "Attachment"),
      className: (0, _clsx["default"])(_styles["default"].messageBody, direction === 'Outbound' ? 'float-right clear-both' : '', 'text-neutral-b0 rounded-br-sui-md bg-neutral-base')
    }, /*#__PURE__*/_react["default"].createElement(_FileAttachmentRender.FileAttachmentRender, {
      attachment: attachment,
      currentLocale: currentLocale,
      onLinkClick: onAttachmentDownload
    }));
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "message",
    className: (0, _clsx["default"])(_styles["default"].message, 'typography-mainText text-neutral-static-w0'),
    title: title
  }, time ? /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].time, 'typography-detailBold text-neutral-b2'),
    "data-sign": "conversationSendTime"
  }, time) : null, renderSenderName === null || renderSenderName === void 0 ? void 0 : renderSenderName(), !(0, _isBlank.isBlank)(subject) && /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "".concat(direction, "Text"),
    className: (0, _clsx["default"])(_styles["default"].messageBody, subject && subject.length > 500 && _styles["default"].big, direction === 'Outbound' ? 'bg-primary-b text-neutral-w0 float-right rounded-br-none' : 'bg-neutral-b4 text-neutral-b0 float-left rounded-bl-none')
  }, subjectNode), imageAttachments.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "".concat(direction, "Image"),
    className: (0, _clsx["default"])(_styles["default"].imageBody, direction === 'Outbound' ? 'float-right' : 'float-left')
  }, imageAttachments), otherAttachments.length > 0 && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, otherAttachments), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].clear
  }));
};
var ConversationMessageList = exports.ConversationMessageList = function ConversationMessageList(_ref2) {
  var className = _ref2.className,
    messages = _ref2.messages,
    _ref2$loadingNextPage = _ref2.loadingNextPage,
    loadingNextPage = _ref2$loadingNextPage === void 0 ? false : _ref2$loadingNextPage,
    _ref2$currentLocale = _ref2.currentLocale,
    currentLocale = _ref2$currentLocale === void 0 ? 'en-US' : _ref2$currentLocale,
    onAttachmentDownload = _ref2.onAttachmentDownload,
    onLinkClick = _ref2.onLinkClick,
    renderSenderName = _ref2.renderSenderName,
    _ref2$timeKey = _ref2.timeKey,
    timeKey = _ref2$timeKey === void 0 ? 'creationTime' : _ref2$timeKey;
  var listRef = (0, _react.useRef)(null);
  var _useState = (0, _react.useState)(0),
    _useState2 = _slicedToArray(_useState, 2),
    scrollHeight = _useState2[0],
    setScrollHeight = _useState2[1];
  var _useState3 = (0, _react.useState)(0),
    _useState4 = _slicedToArray(_useState3, 2),
    scrollTop = _useState4[0],
    setScrollTop = _useState4[1];
  var _useState5 = (0, _react.useState)(false),
    _useState6 = _slicedToArray(_useState5, 2),
    scrollUp = _useState6[0],
    setScrollUp = _useState6[1];
  var endRef = (0, _react.useRef)(null);
  var scrollToLastMessage = (0, _react.useCallback)(function () {
    var _endRef$current;
    (_endRef$current = endRef.current) === null || _endRef$current === void 0 ? void 0 : _endRef$current.scrollIntoView();
  }, []);
  var handleScroll = (0, _react.useCallback)(/*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
    var currentScrollTop, currentScrollHeight, clientHeight;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          if (listRef.current) {
            _context.n = 1;
            break;
          }
          return _context.a(2);
        case 1:
          currentScrollTop = listRef.current.scrollTop;
          currentScrollHeight = listRef.current.scrollHeight;
          clientHeight = listRef.current.clientHeight;
          setScrollHeight(currentScrollHeight);
          if (currentScrollTop < scrollTop) {
            // user scroll up
            setScrollUp(true);
          } else if (currentScrollTop + clientHeight > currentScrollHeight - 200) {
            // user scroll down to bottom
            setScrollUp(false);
          }
          setScrollTop(currentScrollTop);
        case 2:
          return _context.a(2);
      }
    }, _callee);
  })), [scrollTop]);

  // Initial scroll to last message
  (0, _react.useEffect)(function () {
    scrollToLastMessage();
  }, [scrollToLastMessage]);

  // Handle messages length change
  (0, _react.useEffect)(function () {
    if (!scrollUp) {
      scrollToLastMessage();
    } else if (listRef.current && scrollHeight !== listRef.current.scrollHeight) {
      listRef.current.scrollTop += listRef.current.scrollHeight - scrollHeight;
    }
  }, [messages.length, scrollUp, scrollHeight, scrollToLastMessage]);
  var formattedDateFromNow = (0, _hooks.useFormattedDateFromNowFn)();
  var lastDate = 0;
  var messageList = messages.map(function (message) {
    var date = new Date(message[timeKey] || 0);
    var timestamp = date.getTime();
    var time = timestamp - lastDate < 60 * 60 * 1000 && date.getHours() === new Date(lastDate).getHours() ? undefined : formattedDateFromNow(timestamp, 'withTime');
    lastDate = date.getTime();
    var direction = message.direction || 'Inbound';
    var messageType = message.messageType || 'message';

    // add a title for the message to show the full date and time for user and us easy to know the message time
    var title = (0, _dayjs["default"])(timestamp).format('LLL');
    if (messageType === 'info' && message.lastModifiedTime) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        key: message.id,
        className: "w-full text-center px-4 py-2 typography-detailBold text-primary-f",
        title: title
      }, /*#__PURE__*/_react["default"].createElement("div", null, message.subject), /*#__PURE__*/_react["default"].createElement("div", {
        className: "mt-1"
      }, formattedDateFromNow(message.lastModifiedTime, 'withTime')));
    }
    return /*#__PURE__*/_react["default"].createElement(Message, {
      title: title,
      key: message.id,
      time: time,
      direction: direction,
      subject: message.subject,
      mmsAttachments: message.mmsAttachments || [],
      currentLocale: currentLocale,
      onAttachmentDownload: onAttachmentDownload,
      onLinkClick: onLinkClick,
      handleImageLoad: function handleImageLoad() {
        if (!scrollUp) {
          scrollToLastMessage();
        }
      },
      renderSenderName: renderSenderName && direction === 'Inbound' ? function () {
        return renderSenderName === null || renderSenderName === void 0 ? void 0 : renderSenderName(message);
      } : undefined
    });
  });
  var loading = loadingNextPage ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].loading
  }, _i18n["default"].getString('loading', currentLocale)) : null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx["default"])(_styles["default"].root, className),
    ref: listRef,
    onScroll: handleScroll
  }, loading, messageList, /*#__PURE__*/_react["default"].createElement("div", {
    ref: endRef
  }));
};
//# sourceMappingURL=ConversationMessageList.js.map
