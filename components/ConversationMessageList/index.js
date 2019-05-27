"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = Message;
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.string.big");

require("core-js/modules/es6.array.index-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _isBlank = _interopRequireDefault(require("ringcentral-integration/lib/isBlank"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

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

function Message(_ref) {
  var subject = _ref.subject,
      time = _ref.time,
      direction = _ref.direction,
      sender = _ref.sender,
      SubjectRenderer = _ref.subjectRenderer,
      mmsAttachment = _ref.mmsAttachment;
  var content;

  if (subject && !(0, _isBlank["default"])(subject)) {
    content = SubjectRenderer ? _react["default"].createElement(SubjectRenderer, {
      subject: subject
    }) : subject;
  } else if (mmsAttachment && mmsAttachment.contentType.indexOf('image') > -1) {
    content = _react["default"].createElement("img", {
      src: mmsAttachment.uri,
      alt: "attactment",
      className: _styles["default"].picture
    });
  }

  return _react["default"].createElement("div", {
    "data-sign": "message",
    className: _styles["default"].message
  }, time ? _react["default"].createElement("div", {
    className: _styles["default"].time
  }, time) : null, sender && direction === 'Inbound' ? _react["default"].createElement("div", {
    className: _styles["default"].sender
  }, sender) : null, _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].messageBody, direction === 'Outbound' ? _styles["default"].outbound : _styles["default"].inbound, subject && subject.length > 500 && _styles["default"].big)
  }, content), _react["default"].createElement("div", {
    className: _styles["default"].clear
  }));
}

Message.propTypes = {
  direction: _propTypes["default"].string.isRequired,
  subject: _propTypes["default"].string,
  time: _propTypes["default"].string,
  sender: _propTypes["default"].string,
  subjectRenderer: _propTypes["default"].func,
  mmsAttachment: _propTypes["default"].object
};
Message.defaultProps = {
  subject: '',
  sender: undefined,
  time: undefined,
  subjectRenderer: undefined,
  mmsAttachment: null
};

var ConversationMessageList =
/*#__PURE__*/
function (_Component) {
  _inherits(ConversationMessageList, _Component);

  function ConversationMessageList() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ConversationMessageList);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ConversationMessageList)).call.apply(_getPrototypeOf2, [this].concat(args)));
    _this.onScroll =
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
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
    value: function componentDidMount() {
      this.scrollToLastMessage();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(previousProps) {
      if (previousProps.messages.length === this.props.messages.length) {
        return;
      }

      if (!this._scrollUp) {
        this.scrollToLastMessage();
      } else if (this._listRef && this._scrollHeight !== this._listRef.scrollHeight) {
        this._listRef.scrollTop = this._listRef.scrollTop + (this._listRef.scrollHeight - this._scrollHeight);
      }
    }
  }, {
    key: "render",
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
          currentLocale = _this$props.currentLocale;
      var lastDate = 0;
      var messageList = messages.map(function (message) {
        var sender = showSender ? message.from.name || formatPhone(message.from.extensionNumber || message.from.phoneNumber) : null;
        var date = new Date(message.creationTime);
        var time = date - lastDate < 60 * 60 * 1000 && date.getHours() === lastDate.getHours() ? null : dateTimeFormatter({
          utcTimestamp: message.creationTime,
          type: 'long'
        });
        lastDate = date;
        return _react["default"].createElement(Message, {
          key: message.id,
          sender: sender,
          time: time,
          direction: message.direction,
          subject: message.subject,
          subjectRenderer: messageSubjectRenderer,
          mmsAttachment: message.mmsAttachment
        });
      });
      var loading = loadingNextPage ? _react["default"].createElement("div", {
        className: _styles["default"].loading
      }, _i18n["default"].getString('loading', currentLocale)) : null;
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className),
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
}(_react.Component);

ConversationMessageList.propTypes = {
  currentLocale: _propTypes["default"].string,
  messages: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    creationTime: _propTypes["default"].number,
    id: _propTypes["default"].number,
    direction: _propTypes["default"].string,
    subject: _propTypes["default"].string,
    mmsAttachment: _propTypes["default"].object
  })).isRequired,
  className: _propTypes["default"].string,
  showSender: _propTypes["default"].bool,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  messageSubjectRenderer: _propTypes["default"].func,
  formatPhone: _propTypes["default"].func.isRequired,
  loadPreviousMessages: _propTypes["default"].func,
  loadingNextPage: _propTypes["default"].bool,
  height: _propTypes["default"].oneOfType([_propTypes["default"].number, _propTypes["default"].string])
};
ConversationMessageList.defaultProps = {
  currentLocale: 'en-US',
  className: null,
  showSender: false,
  messageSubjectRenderer: undefined,
  height: '100%',
  loadingNextPage: false,
  loadPreviousMessages: function loadPreviousMessages() {
    return null;
  }
};
var _default = ConversationMessageList;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
