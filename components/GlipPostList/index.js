'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _GlipPostItem = require('../GlipPostItem');

var _GlipPostItem2 = _interopRequireDefault(_GlipPostItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var GlipPostList = function (_PureComponent) {
  (0, _inherits3.default)(GlipPostList, _PureComponent);

  function GlipPostList(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, GlipPostList);

    var _this = (0, _possibleConstructorReturn3.default)(this, (GlipPostList.__proto__ || (0, _getPrototypeOf2.default)(GlipPostList)).call(this, props));

    _this._onScroll = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var currentScrollTop, clientHeight;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!_this._listRef || !_this._mounted)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return');

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

              return _context.abrupt('return');

            case 12:
              _this.setState({
                loadingNextPage: false
              });

            case 13:
              _this._scrollTop = currentScrollTop;

            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this._scrollTop = 0;
    _this._scrollHeight = 0;
    _this.state = {
      loadingNextPage: false
    };
    return _this;
  }

  (0, _createClass3.default)(GlipPostList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      this._scrollToLastMessage();
    }
  }, {
    key: 'componentDidUpdate',
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
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: '_scrollToLastMessage',
    value: function _scrollToLastMessage() {
      if (this._listRef) {
        this._listRef.scrollTop = this._listRef.scrollHeight;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          posts = _props.posts,
          className = _props.className,
          dateTimeFormatter = _props.dateTimeFormatter,
          showName = _props.showName,
          atRender = _props.atRender,
          viewProfile = _props.viewProfile;

      var lastDate = void 0;
      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.root, className),
          ref: function ref(list) {
            _this3._listRef = list;
          },
          onScroll: this._onScroll
        },
        this.state.loadingNextPage ? _react2.default.createElement(
          'div',
          { className: _styles2.default.loading },
          'Loading...'
        ) : null,
        posts.map(function (post) {
          var date = new Date(post.creationTime);
          var time = date - lastDate < 60 * 1000 && date.getMinutes() === lastDate.getMinutes() ? null : dateTimeFormatter(post.creationTime);
          lastDate = date;
          return _react2.default.createElement(_GlipPostItem2.default, {
            post: post,
            key: post.id,
            creationTime: time,
            showName: showName,
            atRender: atRender,
            viewProfile: viewProfile
          });
        })
      );
    }
  }]);
  return GlipPostList;
}(_react.PureComponent);

exports.default = GlipPostList;


GlipPostList.propTypes = {
  className: _propTypes2.default.string,
  posts: _propTypes2.default.array,
  groupId: _propTypes2.default.string,
  showName: _propTypes2.default.bool,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  viewProfile: _propTypes2.default.func.isRequired,
  loadNextPage: _propTypes2.default.func.isRequired,
  atRender: _propTypes2.default.func
};

GlipPostList.defaultProps = {
  className: undefined,
  posts: [],
  showName: true,
  groupId: undefined,
  atRender: undefined
};
//# sourceMappingURL=index.js.map
