"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _GlipPostItem = _interopRequireDefault(require("../GlipPostItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var GlipPostList =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(GlipPostList, _PureComponent);

  function GlipPostList(props) {
    var _this;

    _classCallCheck(this, GlipPostList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GlipPostList).call(this, props));
    _this._onScroll =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
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
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className),
        ref: function ref(list) {
          _this2._listRef = list;
        },
        onScroll: this._onScroll
      }, this.state.loadingNextPage ? _react["default"].createElement("div", {
        className: _styles["default"].loading
      }, "Loading...") : null, posts.map(function (post) {
        var date = new Date(post.creationTime);
        var time = date - lastDate < 60 * 1000 && date.getMinutes() === lastDate.getMinutes() ? null : dateTimeFormatter(post.creationTime);
        lastDate = date;
        return _react["default"].createElement(_GlipPostItem["default"], {
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
