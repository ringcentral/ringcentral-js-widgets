"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _bind = _interopRequireDefault(require("classnames/bind"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _Spinner = _interopRequireDefault(require("../Spinner"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var cx = _bind["default"].bind(_styles["default"]);

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
    className: cx('messageItem', {
      localMessageItem: !message.fromRemote
    }),
    onClick: function onClick() {
      return !message.fromRemote && navigateTo("/conversations/".concat(conversationId));
    }
  }, /*#__PURE__*/_react["default"].createElement("dl", {
    className: _styles["default"].dl,
    "data-sign": "RecentMessage"
  }, /*#__PURE__*/_react["default"].createElement("dt", {
    className: cx('messageSubject', {
      unread: isUnread
    }),
    title: subject
  }, subject), /*#__PURE__*/_react["default"].createElement("dd", {
    className: cx('messageTime', {
      unread: isUnread
    }),
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
}(_react.Component);

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
