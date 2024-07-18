"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _SpinnerOverlay = require("@ringcentral-integration/widgets/components/SpinnerOverlay");
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _left_arrow = _interopRequireDefault(require("../../assets/images/left_arrow.png"));
var _GlipChatForm = _interopRequireDefault(require("../GlipChatForm"));
var _GlipGroupName = _interopRequireDefault(require("../GlipGroupName"));
var _GlipPostList = _interopRequireDefault(require("../GlipPostList"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != _typeof(e) && "function" != typeof e) return { "default": e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) { if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } } return n["default"] = e, t && t.set(e, n), n; }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
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
var GlipChatPage = /*#__PURE__*/function (_Component) {
  _inherits(GlipChatPage, _Component);
  var _super = _createSuper(GlipChatPage);
  function GlipChatPage(props) {
    var _this;
    _classCallCheck(this, GlipChatPage);
    _this = _super.call(this, props);
    _this.state = {
      inputHeight: props.mobile ? 80 : 110,
      headerHeight: props.mobile ? 38 : 50
    };
    return _this;
  }
  _createClass(GlipChatPage, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.props.loadGroup(this.props.groupId);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.groupId !== nextProps.groupId) {
        this.props.loadGroup(nextProps.groupId);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
        group = _this$props.group,
        className = _this$props.className,
        posts = _this$props.posts,
        updateText = _this$props.updateText,
        createPost = _this$props.createPost,
        textValue = _this$props.textValue,
        dateTimeFormatter = _this$props.dateTimeFormatter,
        showSpinner = _this$props.showSpinner,
        atRender = _this$props.atRender,
        uploadFile = _this$props.uploadFile,
        viewProfile = _this$props.viewProfile,
        loadNextPage = _this$props.loadNextPage,
        onBackClick = _this$props.onBackClick,
        mobile = _this$props.mobile;
      var spinner = showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null) : null;
      // TODO: update alt with i18n
      var backIcon = onBackClick ? /*#__PURE__*/_react["default"].createElement("img", {
        src: _left_arrow["default"],
        alt: "Back",
        className: _styles["default"].backIcon,
        onClick: onBackClick
      }) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className)
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].header,
        style: {
          height: this.state.headerHeight,
          lineHeight: "".concat(this.state.headerHeight, "px")
        }
      }, backIcon, /*#__PURE__*/_react["default"].createElement(_GlipGroupName["default"], {
        group: group,
        showNumber: true
      })), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].content,
        style: {
          height: "calc(100% - ".concat(this.state.inputHeight + this.state.headerHeight, "px)")
        }
      }, /*#__PURE__*/_react["default"].createElement(_GlipPostList["default"], {
        posts: posts,
        atRender: atRender,
        groupId: group.id,
        showName: group.members && group.members.length > 2,
        dateTimeFormatter: dateTimeFormatter,
        viewProfile: viewProfile,
        loadNextPage: loadNextPage
      })), /*#__PURE__*/_react["default"].createElement(_GlipChatForm["default"], {
        className: _styles["default"].inputArea,
        height: this.state.inputHeight,
        textValue: textValue,
        onTextChange: updateText,
        groupId: group.id,
        onSubmit: createPost,
        onUploadFile: uploadFile,
        members: group.detailMembers,
        mobile: mobile
      }), spinner);
    }
  }]);
  return GlipChatPage;
}(_react.Component);
exports["default"] = GlipChatPage;
GlipChatPage.propTypes = {
  className: _propTypes["default"].string,
  group: _propTypes["default"].object,
  posts: _propTypes["default"].array,
  groupId: _propTypes["default"].string,
  textValue: _propTypes["default"].string,
  showSpinner: _propTypes["default"].bool,
  loadGroup: _propTypes["default"].func.isRequired,
  updateText: _propTypes["default"].func.isRequired,
  createPost: _propTypes["default"].func.isRequired,
  uploadFile: _propTypes["default"].func.isRequired,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  atRender: _propTypes["default"].func,
  onBackClick: _propTypes["default"].func,
  viewProfile: _propTypes["default"].func.isRequired,
  loadNextPage: _propTypes["default"].func.isRequired,
  mobile: _propTypes["default"].bool
};
GlipChatPage.defaultProps = {
  className: undefined,
  groupId: null,
  group: {},
  posts: [],
  textValue: '',
  showSpinner: false,
  atRender: undefined,
  onBackClick: undefined,
  mobile: false
};
//# sourceMappingURL=index.js.map
