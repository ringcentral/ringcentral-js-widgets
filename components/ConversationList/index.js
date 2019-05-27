"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.assign");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _MessageItem = _interopRequireDefault(require("../MessageItem"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ConversationList =
/*#__PURE__*/
function (_Component) {
  _inherits(ConversationList, _Component);

  function ConversationList(props) {
    var _this;

    _classCallCheck(this, ConversationList);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ConversationList).call(this, props));

    _this.onScroll = function () {
      var totalScrollHeight = _this.messagesListBody.scrollHeight;
      var clientHeight = _this.messagesListBody.clientHeight;
      var currentScrollTop = _this.messagesListBody.scrollTop; // load next page if scroll near buttom

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
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          className = _this$props.className,
          currentLocale = _this$props.currentLocale,
          conversations = _this$props.conversations,
          perPage = _this$props.perPage,
          disableLinks = _this$props.disableLinks,
          disableCallButton = _this$props.disableCallButton,
          placeholder = _this$props.placeholder,
          loadingNextPage = _this$props.loadingNextPage,
          childProps = _objectWithoutProperties(_this$props, ["className", "currentLocale", "conversations", "perPage", "disableLinks", "disableCallButton", "placeholder", "loadingNextPage"]);

      var content;

      if (conversations && conversations.length) {
        content = conversations.map(function (item) {
          return _react["default"].createElement(_MessageItem["default"], _extends({}, childProps, {
            conversation: item,
            currentLocale: currentLocale,
            key: item.id,
            disableLinks: disableLinks,
            disableCallButton: disableCallButton
          }));
        });
      }

      var loading = loadingNextPage ? _react["default"].createElement("div", {
        className: _styles["default"].loading
      }, _i18n["default"].getString('loading', currentLocale)) : null;
      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className),
        onScroll: this.onScroll,
        ref: function ref(list) {
          _this2.messagesListBody = list;
        }
      }, content, loading);
    }
  }]);

  return ConversationList;
}(_react.Component);

exports["default"] = ConversationList;
ConversationList.propTypes = {
  brand: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  conversations: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    id: _propTypes["default"].number,
    conversationId: _propTypes["default"].string.isRequired,
    subject: _propTypes["default"].string
  })).isRequired,
  disableLinks: _propTypes["default"].bool,
  disableCallButton: _propTypes["default"].bool,
  perPage: _propTypes["default"].number,
  className: _propTypes["default"].string,
  showConversationDetail: _propTypes["default"].func.isRequired,
  readMessage: _propTypes["default"].func.isRequired,
  markMessage: _propTypes["default"].func.isRequired,
  unmarkMessage: _propTypes["default"].func.isRequired,
  dateTimeFormatter: _propTypes["default"].func,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  showGroupNumberName: _propTypes["default"].bool,
  placeholder: _propTypes["default"].string,
  typeFilter: _propTypes["default"].string,
  loadNextPage: _propTypes["default"].func,
  loadingNextPage: _propTypes["default"].bool,
  renderExtraButton: _propTypes["default"].func
};
ConversationList.defaultProps = {
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
  renderExtraButton: undefined
};
//# sourceMappingURL=index.js.map
