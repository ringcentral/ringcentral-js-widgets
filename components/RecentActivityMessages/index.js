"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _bind = _interopRequireDefault(require("classnames/bind"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var cx = _bind["default"].bind(_styles["default"]);

function MessageItem(_ref) {
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
  return _react["default"].createElement("div", {
    className: cx('messageItem', {
      localMessageItem: !message.fromRemote
    }),
    onClick: function onClick() {
      return !message.fromRemote && navigateTo("/conversations/".concat(conversationId));
    }
  }, _react["default"].createElement("dl", {
    className: _styles["default"].dl
  }, _react["default"].createElement("dt", {
    className: cx('messageSubject', {
      unread: isUnread
    }),
    title: subject
  }, subject), _react["default"].createElement("dd", {
    className: cx('messageTime', {
      unread: isUnread
    }),
    title: time
  }, time)));
}

MessageItem.propTypes = {
  message: _propTypes["default"].object.isRequired,
  navigateTo: _propTypes["default"].func.isRequired,
  dateTimeFormatter: _propTypes["default"].func.isRequired
};

var RecentActivityMessages =
/*#__PURE__*/
function (_Component) {
  _inherits(RecentActivityMessages, _Component);

  function RecentActivityMessages() {
    _classCallCheck(this, RecentActivityMessages);

    return _possibleConstructorReturn(this, _getPrototypeOf(RecentActivityMessages).apply(this, arguments));
  }

  _createClass(RecentActivityMessages, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps) {
      return nextProps.currentLocale !== this.props.currentLocale || nextProps.messages !== this.props.messages || nextProps.isMessagesLoaded !== this.props.isMessagesLoaded;
    }
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
        messageListView = _react["default"].createElement(_Spinner["default"], {
          className: _styles["default"].spinner,
          ringWidth: 4
        });
      } else if (messages.length > 0) {
        messageListView = messages.map(function (message) {
          return _react["default"].createElement(MessageItem, {
            key: message.id,
            message: message,
            navigateTo: navigateTo,
            dateTimeFormatter: dateTimeFormatter
          });
        });
      } else {
        messageListView = _react["default"].createElement("p", {
          className: _styles["default"].noRecords
        }, _i18n["default"].getString('noRecords', currentLocale));
      }

      return _react["default"].createElement("div", {
        className: _styles["default"].messages
      }, messageListView);
    }
  }]);

  return RecentActivityMessages;
}(_react.Component);

exports["default"] = RecentActivityMessages;
RecentActivityMessages.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  messages: _propTypes["default"].array.isRequired,
  isMessagesLoaded: _propTypes["default"].bool.isRequired,
  navigateTo: _propTypes["default"].func.isRequired,
  dateTimeFormatter: _propTypes["default"].func.isRequired
};
//# sourceMappingURL=index.js.map
