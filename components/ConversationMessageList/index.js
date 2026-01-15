"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Message = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.big.js");
var _isBlank = require("@ringcentral-integration/commons/lib/isBlank");
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
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
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
var Message = exports.Message = function Message(_ref) {
  var subject = _ref.subject,
    time = _ref.time,
    direction = _ref.direction,
    sender = _ref.sender,
    SubjectRenderer = _ref.subjectRenderer,
    mmsAttachments = _ref.mmsAttachments,
    currentLocale = _ref.currentLocale,
    onAttachmentDownload = _ref.onAttachmentDownload,
    onLinkClick = _ref.onLinkClick,
    handleImageLoad = _ref.handleImageLoad;
  var subjectNode;
  if (subject && !(0, _isBlank.isBlank)(subject)) {
    var SubjectComp = SubjectRenderer || _SubjectRender.SubjectRender;
    subjectNode = /*#__PURE__*/_react["default"].createElement(SubjectComp, {
      subject: subject,
      onLinkClick: onLinkClick
    });
  }
  var imageAttachments = mmsAttachments.filter(function (m) {
    return m.contentType.indexOf('image') > -1;
  }).map(function (attachment) {
    return /*#__PURE__*/_react["default"].createElement(_ImageAttachmentRender.ImageAttachmentRender, {
      key: attachment.id,
      attachment: attachment,
      handleImageLoad: handleImageLoad
    });
  });
  var otherAttachments = mmsAttachments.filter(function (m) {
    return m.contentType.indexOf('image') === -1;
  }).map(function (attachment) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: attachment.id,
      "data-sign": "".concat(direction, "Attachment"),
      className: (0, _clsx["default"])(_styles["default"].messageBody, direction === 'Outbound' ? _styles["default"].outbound : _styles["default"].inbound)
    }, /*#__PURE__*/_react["default"].createElement(_FileAttachmentRender.FileAttachmentRender, {
      attachment: attachment,
      currentLocale: currentLocale,
      onLinkClick: onAttachmentDownload
    }));
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "message",
    className: _styles["default"].message
  }, time ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].time,
    "data-sign": "conversationSendTime"
  }, time) : null, sender && direction === 'Inbound' ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].sender
  }, sender) : null, !(0, _isBlank.isBlank)(subject) && /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "".concat(direction, "Text"),
    className: (0, _clsx["default"])(_styles["default"].messageBody, direction === 'Outbound' ? _styles["default"].outbound : _styles["default"].inbound, subject && subject.length > 500 && _styles["default"].big)
  }, subjectNode), imageAttachments.length > 0 && /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "".concat(direction, "Image"),
    className: (0, _clsx["default"])(_styles["default"].imageBody, direction === 'Outbound' ? _styles["default"].outbound : _styles["default"].inbound)
  }, imageAttachments), otherAttachments.length > 0 && /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, otherAttachments), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].clear
  }));
};
Message.propTypes = {
  direction: _propTypes["default"].string.isRequired,
  subject: _propTypes["default"].string,
  time: _propTypes["default"].string,
  sender: _propTypes["default"].string,
  subjectRenderer: _propTypes["default"].func,
  mmsAttachments: _propTypes["default"].array,
  currentLocale: _propTypes["default"].string.isRequired,
  onAttachmentDownload: _propTypes["default"].func,
  onLinkClick: _propTypes["default"].func,
  handleImageLoad: _propTypes["default"].func
};
Message.defaultProps = {
  subject: '',
  sender: undefined,
  time: undefined,
  subjectRenderer: undefined,
  mmsAttachments: [],
  onAttachmentDownload: undefined,
  handleImageLoad: undefined
};
var ConversationMessageList = /*#__PURE__*/function (_Component) {
  function ConversationMessageList() {
    var _this;
    _classCallCheck(this, ConversationMessageList);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, ConversationMessageList, [].concat(args));
    _this._listRef = void 0;
    _this._scrollHeight = void 0;
    _this._scrollTop = void 0;
    _this._scrollUp = void 0;
    _this.onScroll = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
      var currentScrollTop, clientHeight;
      return _regenerator().w(function (_context) {
        while (1) switch (_context.n) {
          case 0:
            if (_this._listRef) {
              _context.n = 1;
              break;
            }
            return _context.a(2);
          case 1:
            currentScrollTop = _this._listRef.scrollTop;
            _this._scrollHeight = _this._listRef.scrollHeight;
            clientHeight = _this._listRef.clientHeight;
            if (currentScrollTop < _this._scrollTop) {
              // user scroll up
              _this._scrollUp = true;
            } else if (currentScrollTop + clientHeight > _this._scrollHeight - 200) {
              // user scroll down to bottom
              _this._scrollUp = false;
            }
            if (currentScrollTop < 20 && _this._scrollTop >= 20) {
              // @ts-expect-error TS(2339): Property 'loadPreviousMessages' does not exist on ... Remove this comment to see the full error message
              _this.props.loadPreviousMessages();
            }
            _this._scrollTop = currentScrollTop;
          case 2:
            return _context.a(2);
        }
      }, _callee);
    }));
    _this.scrollToLastMessage = function () {
      if (_this._listRef) {
        _this._listRef.scrollTop = _this._listRef.scrollHeight;
      }
    };
    return _this;
  }
  _inherits(ConversationMessageList, _Component);
  return _createClass(ConversationMessageList, [{
    key: "componentDidMount",
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function componentDidMount() {
      this.scrollToLastMessage();
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(previousProps) {
      // @ts-expect-error TS(2339): Property 'messages' does not exist on type 'Readon... Remove this comment to see the full error message
      if (previousProps.messages.length === this.props.messages.length) {
        return;
      }
      if (!this._scrollUp) {
        this.scrollToLastMessage();
      } else if (this._listRef && this._scrollHeight !== this._listRef.scrollHeight) {
        this._listRef.scrollTop += this._listRef.scrollHeight - this._scrollHeight;
      }
    }
  }, {
    key: "render",
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
      var _this2 = this;
      var _this$props = this.props,
        className = _this$props.className,
        dateTimeFormatter = _this$props.dateTimeFormatter,
        messages = _this$props.messages,
        showSender = _this$props.showSender,
        height = _this$props.height,
        messageSubjectRenderer = _this$props.messageSubjectRenderer,
        formatPhone = _this$props.formatPhone,
        loadingNextPage = _this$props.loadingNextPage,
        currentLocale = _this$props.currentLocale,
        onAttachmentDownload = _this$props.onAttachmentDownload,
        onLinkClick = _this$props.onLinkClick;
      var lastDate = 0;
      var messageList = messages.map(function (message) {
        var sender = showSender ? message.from.name || formatPhone(message.from.extensionNumber || message.from.phoneNumber) : null;
        var date = new Date(message.creationTime);
        var time =
        // @ts-expect-error TS(2362): The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        date - lastDate < 60 * 60 * 1000 &&
        // @ts-expect-error TS(2339): Property 'getHours' does not exist on type 'number... Remove this comment to see the full error message
        date.getHours() === lastDate.getHours() ? null : dateTimeFormatter({
          utcTimestamp: message.creationTime,
          type: 'long'
        });
        // @ts-expect-error TS(2322): Type 'Date' is not assignable to type 'number'.
        lastDate = date;
        return /*#__PURE__*/_react["default"].createElement(Message, {
          key: message.id,
          sender: sender,
          time: time,
          direction: message.direction,
          subject: message.subject,
          subjectRenderer: messageSubjectRenderer,
          mmsAttachments: message.mmsAttachments,
          currentLocale: currentLocale,
          onAttachmentDownload: onAttachmentDownload,
          onLinkClick: onLinkClick,
          handleImageLoad: function handleImageLoad() {
            if (!_this2._scrollUp) {
              _this2.scrollToLastMessage();
            }
          }
        });
      });
      var loading = loadingNextPage ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].loading
      }, _i18n["default"].getString('loading', currentLocale)) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className),
        style: {
          height: height
        },
        ref: function ref(body) {
          _this2._listRef = body;
        },
        onScroll: this.onScroll
      }, loading, messageList);
    }
  }]);
}(_react.Component); // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ConversationMessageList.propTypes = {
  currentLocale: _propTypes["default"].string,
  messages: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    creationTime: _propTypes["default"].number,
    id: _propTypes["default"].number,
    direction: _propTypes["default"].string,
    subject: _propTypes["default"].string,
    mmsAttachments: _propTypes["default"].array
  })).isRequired,
  className: _propTypes["default"].string,
  showSender: _propTypes["default"].bool,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  messageSubjectRenderer: _propTypes["default"].func,
  formatPhone: _propTypes["default"].func.isRequired,
  loadPreviousMessages: _propTypes["default"].func,
  loadingNextPage: _propTypes["default"].bool,
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string]),
  onAttachmentDownload: _propTypes["default"].func
};

// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ConversationMessageList.defaultProps = {
  currentLocale: 'en-US',
  className: null,
  showSender: false,
  messageSubjectRenderer: undefined,
  height: '100%',
  loadingNextPage: false,
  loadPreviousMessages: function loadPreviousMessages() {
    return null;
  },
  onAttachmentDownload: undefined
};
var _default = exports["default"] = ConversationMessageList;
//# sourceMappingURL=index.js.map
