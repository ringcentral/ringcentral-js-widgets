"use strict";

require("core-js/modules/es.symbol");
require("core-js/modules/es.symbol.description");
require("core-js/modules/es.symbol.to-primitive");
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.to-primitive");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.object.to-string");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx4 = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _Spinner = _interopRequireDefault(require("../Spinner"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _createSuper(t) { var r = _isNativeReflectConstruct(); return function () { var e, o = _getPrototypeOf(t); if (r) { var s = _getPrototypeOf(this).constructor; e = Reflect.construct(o, arguments, s); } else e = o.apply(this, arguments); return _possibleConstructorReturn(this, e); }; }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MessageItem = function MessageItem(_ref) {
  var message = _ref.message,
    navigateTo = _ref.navigateTo,
    dateTimeFormatter = _ref.dateTimeFormatter;
  var subject = message.subject,
    creationTime = message.creationTime,
    readStatus = message.readStatus,
    conversationId = message.conversationId;
  var isUnread = readStatus !== 'Read';
  var time = dateTimeFormatter({
    utcTimestamp: creationTime
  });
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: (0, _clsx4["default"])(_styles["default"].messageItem, _defineProperty({}, _styles["default"].localMessageItem, !message.fromRemote)),
    onClick: function onClick() {
      return !message.fromRemote && navigateTo("/conversations/".concat(conversationId));
    }
  }, /*#__PURE__*/_react["default"].createElement("dl", {
    className: _styles["default"].dl,
    "data-sign": "RecentMessage"
  }, /*#__PURE__*/_react["default"].createElement("dt", {
    className: (0, _clsx4["default"])(_styles["default"].messageSubject, _defineProperty({}, _styles["default"].unread, isUnread)),
    title: subject
  }, subject), /*#__PURE__*/_react["default"].createElement("dd", {
    className: (0, _clsx4["default"])(_styles["default"].messageTime, _defineProperty({}, _styles["default"].unread, isUnread)),
    title: time
  }, time)));
};
MessageItem.propTypes = {
  message: _propTypes["default"].object.isRequired,
  navigateTo: _propTypes["default"].func.isRequired,
  dateTimeFormatter: _propTypes["default"].func.isRequired
};
var RecentActivityMessages = /*#__PURE__*/function (_Component) {
  _inherits(RecentActivityMessages, _Component);
  var _super = _createSuper(RecentActivityMessages);
  function RecentActivityMessages() {
    _classCallCheck(this, RecentActivityMessages);
    return _super.apply(this, arguments);
  }
  _createClass(RecentActivityMessages, [{
    key: "shouldComponentUpdate",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function shouldComponentUpdate(nextProps) {
      return (
        // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
        nextProps.currentLocale !== this.props.currentLocale ||
        // @ts-expect-error TS(2339): Property 'messages' does not exist on type 'Readon... Remove this comment to see the full error message
        nextProps.messages !== this.props.messages ||
        // @ts-expect-error TS(2339): Property 'isMessagesLoaded' does not exist on type... Remove this comment to see the full error message
        nextProps.isMessagesLoaded !== this.props.isMessagesLoaded
      );
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        currentLocale = _this$props.currentLocale,
        messages = _this$props.messages,
        isMessagesLoaded = _this$props.isMessagesLoaded,
        navigateTo = _this$props.navigateTo,
        dateTimeFormatter = _this$props.dateTimeFormatter;
      var messageListView = null;
      if (!isMessagesLoaded) {
        messageListView = /*#__PURE__*/_react["default"].createElement(_Spinner["default"], {
          className: _styles["default"].spinner,
          ringWidth: 4
        });
      } else if (messages.length > 0) {
        messageListView = messages.map(function (message) {
          return /*#__PURE__*/_react["default"].createElement(MessageItem, {
            key: message.id,
            message: message,
            navigateTo: navigateTo,
            dateTimeFormatter: dateTimeFormatter
          });
        });
      } else {
        messageListView = /*#__PURE__*/_react["default"].createElement("p", {
          className: _styles["default"].noRecords
        }, _i18n["default"].getString('noRecords', currentLocale));
      }
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].messages
      }, messageListView);
    }
  }]);
  return RecentActivityMessages;
}(_react.Component); // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
RecentActivityMessages.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  messages: _propTypes["default"].array.isRequired,
  isMessagesLoaded: _propTypes["default"].bool.isRequired,
  navigateTo: _propTypes["default"].func.isRequired,
  dateTimeFormatter: _propTypes["default"].func.isRequired
};
var _default = RecentActivityMessages;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
