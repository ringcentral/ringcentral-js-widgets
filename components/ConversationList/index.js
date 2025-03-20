"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _clsx = _interopRequireDefault(require("clsx"));
var _react = _interopRequireWildcard(require("react"));
var _MessageItem = _interopRequireDefault(require("../MessageItem"));
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) { ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } } return n; }, _extends.apply(null, arguments); }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) { o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } } return t; }
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
var ConversationList = /*#__PURE__*/function (_Component) {
  _inherits(ConversationList, _Component);
  var _super = _createSuper(ConversationList);
  function ConversationList(props) {
    var _this;
    _classCallCheck(this, ConversationList);
    _this = _super.call(this, props);
    _this._scrollTop = void 0;
    _this.messagesListBody = void 0;
    _this.onScroll = function () {
      var totalScrollHeight = _this.messagesListBody.scrollHeight;
      var clientHeight = _this.messagesListBody.clientHeight;
      var currentScrollTop = _this.messagesListBody.scrollTop;
      // load next page if scroll near buttom
      if (totalScrollHeight - _this._scrollTop > clientHeight + 10 && totalScrollHeight - currentScrollTop <= clientHeight + 10) {
        if (typeof _this.props.loadNextPage === 'function') {
          _this.props.loadNextPage();
        }
      }
      _this._scrollTop = currentScrollTop;
    };
    _this._scrollTop = 0;
    return _this;
  }
  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(ConversationList, [{
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.typeFilter === prevProps.typeFilter) {
        return;
      }
      if (this.messagesListBody) {
        this.messagesListBody.scrollTop = 0;
      }
    }
  }, {
    key: "render",
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        className = _this$props.className,
        currentLocale = _this$props.currentLocale,
        currentSiteCode = _this$props.currentSiteCode,
        isMultipleSiteEnabled = _this$props.isMultipleSiteEnabled,
        conversations = _this$props.conversations,
        perPage = _this$props.perPage,
        disableLinks = _this$props.disableLinks,
        disableCallButton = _this$props.disableCallButton,
        placeholder = _this$props.placeholder,
        loadingNextPage = _this$props.loadingNextPage,
        formatPhone = _this$props.formatPhone,
        renderActionMenuExtraButton = _this$props.renderActionMenuExtraButton,
        childProps = _objectWithoutProperties(_this$props, ["className", "currentLocale", "currentSiteCode", "isMultipleSiteEnabled", "conversations", "perPage", "disableLinks", "disableCallButton", "placeholder", "loadingNextPage", "formatPhone", "renderActionMenuExtraButton"]);
      var content;
      if (conversations && conversations.length) {
        content = conversations.map(function (item) {
          return /*#__PURE__*/_react["default"].createElement(_MessageItem["default"], _extends({}, childProps, {
            formatPhone: formatPhone,
            conversation: item,
            currentLocale: currentLocale,
            currentSiteCode: currentSiteCode,
            isMultipleSiteEnabled: isMultipleSiteEnabled,
            key: item.id,
            disableLinks: disableLinks,
            disableCallButton: disableCallButton,
            renderActionMenuExtraButton: renderActionMenuExtraButton
          }));
        });
      }
      var loading = loadingNextPage ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].loading
      }, _i18n["default"].getString('loading', currentLocale)) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className),
        "data-sign": "conversationList",
        onScroll: this.onScroll,
        ref: function ref(list) {
          _this2.messagesListBody = list;
        }
      }, content, loading);
    }
  }]);
  return ConversationList;
}(_react.Component); // @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ConversationList.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  perPage: 20,
  className: undefined,
  disableLinks: false,
  disableCallButton: false,
  dateTimeFormatter: undefined,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  showGroupNumberName: false,
  placeholder: undefined,
  loadNextPage: undefined,
  loadingNextPage: false,
  typeFilter: undefined,
  renderExtraButton: undefined,
  enableCDC: false
};
var _default = ConversationList;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
