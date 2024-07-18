"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.array.map");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _GlipPostItem = _interopRequireDefault(require("../GlipPostItem"));
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
var GlipPostList = /*#__PURE__*/function (_PureComponent) {
  _inherits(GlipPostList, _PureComponent);
  var _super = _createSuper(GlipPostList);
  function GlipPostList(props) {
    var _this;
    _classCallCheck(this, GlipPostList);
    _this = _super.call(this, props);
    _this._onScroll = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var currentScrollTop, clientHeight;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!_this._listRef || !_this._mounted)) {
                _context.next = 2;
                break;
              }
              return _context.abrupt("return");
            case 2:
              currentScrollTop = _this._listRef.scrollTop;
              _this._scrollHeight = _this._listRef.scrollHeight;
              clientHeight = _this._listRef.clientHeight;
              if (currentScrollTop < _this._scrollTop && currentScrollTop < _this._scrollHeight - 200) {
                // user scroll up
                _this._scrollUp = true;
              } else if (currentScrollTop + clientHeight > _this._scrollHeight - 200) {
                // user scroll down to bottom
                _this._scrollUp = false;
              }
              if (!(currentScrollTop < 20 && _this._scrollTop >= 20)) {
                _context.next = 13;
                break;
              }
              _this.setState({
                loadingNextPage: true
              });
              _context.next = 10;
              return _this.props.loadNextPage();
            case 10:
              if (_this._mounted) {
                _context.next = 12;
                break;
              }
              return _context.abrupt("return");
            case 12:
              _this.setState({
                loadingNextPage: false
              });
            case 13:
              _this._scrollTop = currentScrollTop;
            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));
    _this._scrollTop = 0;
    _this._scrollHeight = 0;
    _this.state = {
      loadingNextPage: false
    };
    return _this;
  }
  _createClass(GlipPostList, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
      this._scrollToLastMessage();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (!this._mounted) {
        return;
      }
      if (prevProps.groupId !== this.props.groupId) {
        this._scrollUp = false;
        this._scrollToLastMessage();
      } else if (prevProps.posts.length !== this.props.posts.length) {
        var prevLastPost = prevProps.posts[prevProps.posts.length - 1] || {};
        var lastPost = this.props.posts[this.props.posts.length - 1] || {};
        if (lastPost.id !== prevLastPost.id || prevProps.posts.length > this.props.posts.length) {
          if (!this._scrollUp) {
            this._scrollToLastMessage();
          }
        } else if (this._listRef && this._scrollHeight !== this._listRef.scrollHeight) {
          this._listRef.scrollTop = this._listRef.scrollTop + (this._listRef.scrollHeight - this._scrollHeight);
        }
      }
      this._scrollHeight = this._listRef.scrollHeight;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "_scrollToLastMessage",
    value: function _scrollToLastMessage() {
      if (this._listRef) {
        this._listRef.scrollTop = this._listRef.scrollHeight;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var _this$props = this.props,
        posts = _this$props.posts,
        className = _this$props.className,
        dateTimeFormatter = _this$props.dateTimeFormatter,
        showName = _this$props.showName,
        atRender = _this$props.atRender,
        viewProfile = _this$props.viewProfile;
      var lastDate;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _clsx["default"])(_styles["default"].root, className),
        ref: function ref(list) {
          _this2._listRef = list;
        },
        onScroll: this._onScroll
      }, this.state.loadingNextPage ? /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].loading
      }, "Loading...") : null, posts.map(function (post) {
        var date = new Date(post.creationTime);
        var time = date - lastDate < 60 * 1000 && date.getMinutes() === lastDate.getMinutes() ? null : dateTimeFormatter(post.creationTime);
        lastDate = date;
        return /*#__PURE__*/_react["default"].createElement(_GlipPostItem["default"], {
          post: post,
          key: post.id,
          creationTime: time,
          showName: showName,
          atRender: atRender,
          viewProfile: viewProfile
        });
      }));
    }
  }]);
  return GlipPostList;
}(_react.PureComponent);
exports["default"] = GlipPostList;
GlipPostList.propTypes = {
  className: _propTypes["default"].string,
  posts: _propTypes["default"].array,
  groupId: _propTypes["default"].string,
  showName: _propTypes["default"].bool,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  viewProfile: _propTypes["default"].func.isRequired,
  loadNextPage: _propTypes["default"].func.isRequired,
  atRender: _propTypes["default"].func
};
GlipPostList.defaultProps = {
  className: undefined,
  posts: [],
  showName: true,
  groupId: undefined,
  atRender: undefined
};
//# sourceMappingURL=index.js.map
