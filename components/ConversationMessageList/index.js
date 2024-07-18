"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.concat");
require("core-js/modules/es.array.filter");
require("core-js/modules/es.array.index-of");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
require("core-js/modules/es.string.big");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Message = void 0;
require("regenerator-runtime/runtime");
var _isBlank = require("@ringcentral-integration/commons/lib/isBlank");
var _juno = require("@ringcentral/juno");
var _junoIcon = require("@ringcentral/juno-icon");
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _SubjectRender = require("./SubjectRender");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function getExtFromContentType(contentType) {
  var ext = contentType.split('/');
  return ext[1].split('+')[0];
}
var Message = function Message(_ref) {
  var subject = _ref.subject,
    time = _ref.time,
    direction = _ref.direction,
    sender = _ref.sender,
    SubjectRenderer = _ref.subjectRenderer,
    mmsAttachments = _ref.mmsAttachments,
    currentLocale = _ref.currentLocale,
    onAttachmentDownload = _ref.onAttachmentDownload,
    onLinkClick = _ref.onLinkClick;
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
    return /*#__PURE__*/_react["default"].createElement("img", {
      key: attachment.id,
      src: attachment.uri,
      alt: "attachment".concat(attachment.id),
      className: _styles["default"].picture
    });
  });
  var otherAttachments = mmsAttachments.filter(function (m) {
    return m.contentType.indexOf('image') === -1;
  }).map(function (attachment) {
    var fileName = attachment.fileName || "".concat(attachment.id, ".").concat(getExtFromContentType(attachment.contentType));
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: attachment.id,
      title: fileName,
      className: _styles["default"].file
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      size: "small",
      symbol: _junoIcon.DefaultFile
    }), /*#__PURE__*/_react["default"].createElement("span", {
      className: _styles["default"].fileName
    }, fileName), /*#__PURE__*/_react["default"].createElement("a", {
      target: "_blank",
      className: _styles["default"].download,
      download: fileName,
      onClick: function onClick(e) {
        if (typeof onAttachmentDownload === 'function') {
          onAttachmentDownload(attachment.uri, e);
        }
      },
      title: _i18n["default"].getString('download', currentLocale),
      href: "".concat(attachment.uri, "&contentDisposition=Attachment")
    }, /*#__PURE__*/_react["default"].createElement(_juno.RcIcon, {
      size: "small",
      symbol: _junoIcon.Download
    })));
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "message",
    className: _styles["default"].message
  }, time ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].time,
    "data-sign": "conversationSendTime"
  }, time) : null, sender && direction === 'Inbound' ? /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].sender
  }, sender) : null, /*#__PURE__*/_react["default"].createElement("div", {
    "data-sign": "".concat(direction, "Text"),
    className: (0, _clsx["default"])(_styles["default"].messageBody, direction === 'Outbound' ? _styles["default"].outbound : _styles["default"].inbound, subject && subject.length > 500 && _styles["default"].big)
  }, subjectNode, imageAttachments, otherAttachments), /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].clear
  }));
};
exports.Message = Message;
Message.propTypes = {
  direction: _propTypes["default"].string.isRequired,
  subject: _propTypes["default"].string,
  time: _propTypes["default"].string,
  sender: _propTypes["default"].string,
  subjectRenderer: _propTypes["default"].func,
  mmsAttachments: _propTypes["default"].array,
  currentLocale: _propTypes["default"].string.isRequired,
  onAttachmentDownload: _propTypes["default"].func,
  onLinkClick: _propTypes["default"].func
};
Message.defaultProps = {
  subject: '',
  sender: undefined,
  time: undefined,
  subjectRenderer: undefined,
  mmsAttachments: [],
  onAttachmentDownload: undefined
};
var ConversationMessageList = /*#__PURE__*/function (_Component) {
  _inherits(ConversationMessageList, _Component);
  var _super = _createSuper(ConversationMessageList);
  function ConversationMessageList() {
    var _this;
    _classCallCheck(this, ConversationMessageList);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this._listRef = void 0;
    _this._scrollHeight = void 0;
    _this._scrollTop = void 0;
    _this._scrollUp = void 0;
    _this.onScroll = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var currentScrollTop, clientHeight;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (_this._listRef) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
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
            case 8:
            case "end":
              return _context.stop();
          }
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
  _createClass(ConversationMessageList, [{
    key: "componentDidMount",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function componentDidMount() {
      this.scrollToLastMessage();
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
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
          onLinkClick: onLinkClick
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
  return ConversationMessageList;
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
var _default = ConversationMessageList;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
