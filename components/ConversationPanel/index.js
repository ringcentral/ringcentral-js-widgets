"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));

var _SpinnerOverlay = require("../SpinnerOverlay");

var _ConversationMessageList = _interopRequireDefault(require("../ConversationMessageList"));

var _LogButton = _interopRequireDefault(require("../LogButton"));

var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));

var _MessageInput = _interopRequireDefault(require("../MessageInput"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ConversationPanel = /*#__PURE__*/function (_Component) {
  _inherits(ConversationPanel, _Component);

  var _super = _createSuper(ConversationPanel);

  function ConversationPanel(props) {
    var _this;

    _classCallCheck(this, ConversationPanel);

    _this = _super.call(this, props);

    _this.onSend = function () {
      var _this$props;

      (_this$props = _this.props).replyToReceivers.apply(_this$props, arguments);
    };

    _this.onInputHeightChange = function (value) {
      _this.setState({
        inputHeight: value
      });
    };

    _this.onSelectContact = function (value, idx) {
      var selected = _this.props.showContactDisplayPlaceholder ? parseInt(idx, 10) - 1 : parseInt(idx, 10);
      _this._userSelection = true;

      _this.setState({
        selected: selected
      });

      if (_this.props.autoLog) {
        _this.logConversation({
          redirect: false,
          selected: selected,
          prefill: false
        });
      }
    };

    _this.getSelectedContact = function () {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.selected;

      if (!_this.props.conversation) {
        return null;
      }

      var contactMatches = _this.props.conversation.correspondentMatches;
      return selected > -1 && contactMatches[selected] || contactMatches.length === 1 && contactMatches[0] || null;
    };

    _this.logConversation = _this.logConversation.bind(_assertThisInitialized(_this));
    _this.state = {
      selected: _this.getInitialContactIndex(),
      isLogging: false,
      inputHeight: 63,
      loaded: false
    };
    _this._userSelection = false;
    return _this;
  }

  _createClass(ConversationPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.props.showSpinner) {
        this.loadConversation();
      }

      this._mounted = true;
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!this._userSelection && this.props.conversation && nextProps.conversation && (nextProps.conversation.conversationMatches !== this.props.conversation.conversationMatches || nextProps.conversation.correspondentMatches !== this.props.conversation.correspondentMatches)) {
        this.setState({
          selected: this.getInitialContactIndex(nextProps)
        });
      }

      if (!nextProps.showSpinner && this.props.showSpinner) {
        this.loadConversation();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.messages !== this.props.messages) {
        this.props.readMessages(this.props.conversationId);
      }

      if (prevState.loaded === false && this.state.loaded === true) {
        if (this.props.messages.length < this.props.perPage) {
          this.props.loadPreviousMessages();
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      this.props.unloadConversation();
    }
  }, {
    key: "getMessageListHeight",
    value: function getMessageListHeight() {
      var headerHeight = 41;
      return "calc(100% - ".concat(this.state.inputHeight + headerHeight, "px)");
    }
  }, {
    key: "getInitialContactIndex",
    value: function getInitialContactIndex() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var _nextProps$conversati = nextProps.conversation,
          correspondentMatches = _nextProps$conversati.correspondentMatches,
          lastMatchedCorrespondentEntity = _nextProps$conversati.lastMatchedCorrespondentEntity,
          conversationMatches = _nextProps$conversati.conversationMatches;
      var index = null;
      var correspondentMatchId = lastMatchedCorrespondentEntity && lastMatchedCorrespondentEntity.id || conversationMatches[0] && conversationMatches[0].id;

      if (correspondentMatchId) {
        index = correspondentMatches.findIndex(function (contact) {
          return contact.id === correspondentMatchId;
        });
        if (index > -1) return index;
      }

      return -1;
    }
  }, {
    key: "getPhoneNumber",
    value: function getPhoneNumber() {
      var _this$props$conversat = this.props.conversation;
      _this$props$conversat = _this$props$conversat === void 0 ? {} : _this$props$conversat;
      var _this$props$conversat2 = _this$props$conversat.correspondents,
          correspondents = _this$props$conversat2 === void 0 ? [] : _this$props$conversat2;
      return correspondents.length === 1 && (correspondents[0].phoneNumber || correspondents[0].extensionNumber) || undefined;
    }
  }, {
    key: "getGroupPhoneNumbers",
    value: function getGroupPhoneNumbers() {
      var _this$props$conversat3 = this.props.conversation;
      _this$props$conversat3 = _this$props$conversat3 === void 0 ? {} : _this$props$conversat3;
      var _this$props$conversat4 = _this$props$conversat3.correspondents,
          correspondents = _this$props$conversat4 === void 0 ? [] : _this$props$conversat4;
      var groupNumbers = correspondents.length > 1 ? correspondents.map(function (correspondent) {
        return correspondent.extensionNumber || correspondent.phoneNumber || undefined;
      }) : null;
      return groupNumbers;
    }
  }, {
    key: "getFallbackContactName",
    value: function getFallbackContactName() {
      var _this$props$conversat5 = this.props.conversation;
      _this$props$conversat5 = _this$props$conversat5 === void 0 ? {} : _this$props$conversat5;
      var _this$props$conversat6 = _this$props$conversat5.correspondents,
          correspondents = _this$props$conversat6 === void 0 ? [] : _this$props$conversat6;
      return correspondents.length === 1 && correspondents[0].name || undefined;
    }
  }, {
    key: "loadConversation",
    value: function loadConversation() {
      this.props.loadConversation(this.props.conversationId);
      this.setState({
        loaded: true
      });
    }
  }, {
    key: "logConversation",
    value: function () {
      var _logConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _ref,
            _ref$redirect,
            redirect,
            selected,
            _ref$prefill,
            prefill,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref$redirect = _ref.redirect, redirect = _ref$redirect === void 0 ? true : _ref$redirect, selected = _ref.selected, _ref$prefill = _ref.prefill, prefill = _ref$prefill === void 0 ? true : _ref$prefill;

                if (!(typeof this.props.onLogConversation === 'function' && this._mounted && !this.state.isLogging)) {
                  _context.next = 6;
                  break;
                }

                this.setState({
                  isLogging: true
                });
                _context.next = 5;
                return this.props.onLogConversation({
                  correspondentEntity: this.getSelectedContact(selected),
                  conversationId: this.props.conversation.conversationId,
                  redirect: redirect,
                  prefill: prefill
                });

              case 5:
                if (this._mounted) {
                  this.setState({
                    isLogging: false
                  });
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function logConversation() {
        return _logConversation.apply(this, arguments);
      }

      return logConversation;
    }()
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      if (!this.state.loaded) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].root
        }, /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null));
      }

      var conversationBody = null;
      var loading = this.props.showSpinner;
      var _this$props2 = this.props,
          recipients = _this$props2.recipients,
          messageSubjectRenderer = _this$props2.messageSubjectRenderer;

      if (!loading) {
        conversationBody = /*#__PURE__*/_react["default"].createElement(_ConversationMessageList["default"], {
          currentLocale: this.props.currentLocale,
          height: this.getMessageListHeight(),
          messages: this.props.messages,
          className: _styles["default"].conversationBody,
          dateTimeFormatter: this.props.dateTimeFormatter,
          showSender: recipients && recipients.length > 1,
          messageSubjectRenderer: messageSubjectRenderer,
          formatPhone: this.props.formatPhone,
          loadingNextPage: this.props.loadingNextPage,
          loadPreviousMessages: this.props.loadPreviousMessages
        });
      }

      var _this$props$conversat7 = this.props.conversation,
          isLogging = _this$props$conversat7.isLogging,
          conversationMatches = _this$props$conversat7.conversationMatches,
          correspondentMatches = _this$props$conversat7.correspondentMatches;
      var groupNumbers = this.getGroupPhoneNumbers();
      var phoneNumber = this.getPhoneNumber();
      var fallbackName = this.getFallbackContactName();
      var extraButton = this.props.renderExtraButton ? this.props.renderExtraButton(this.props.conversation, {
        logConversation: this.logConversation,
        isLogging: isLogging || this.state.isLogging
      }) : null;
      var logButton = this.props.onLogConversation && !this.props.renderExtraButton ? /*#__PURE__*/_react["default"].createElement(_LogButton["default"], {
        className: _styles["default"].logButton,
        onLog: this.logConversation,
        disableLinks: this.props.disableLinks,
        isLogged: conversationMatches.length > 0,
        isLogging: isLogging || this.state.isLogging,
        currentLocale: this.props.currentLocale
      }) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "conversationPanel",
        className: _styles["default"].header
      }, /*#__PURE__*/_react["default"].createElement(_ContactDisplay["default"], {
        brand: this.props.brand,
        className: _styles["default"].contactDisplay,
        selectClassName: _styles["default"].contactDisplaySelect,
        contactMatches: correspondentMatches || [],
        selected: this.state.selected,
        onSelectContact: this.onSelectContact,
        disabled: this.props.disableLinks,
        isLogging: isLogging || this.state.isLogging,
        fallBackName: fallbackName,
        areaCode: this.props.areaCode,
        countryCode: this.props.countryCode,
        phoneNumber: phoneNumber,
        groupNumbers: groupNumbers,
        showType: false,
        currentLocale: this.props.currentLocale,
        enableContactFallback: this.props.enableContactFallback,
        showPlaceholder: this.props.showContactDisplayPlaceholder,
        sourceIcons: this.props.sourceIcons,
        phoneTypeRenderer: this.props.phoneTypeRenderer,
        phoneSourceNameRenderer: this.props.phoneSourceNameRenderer,
        showGroupNumberName: this.props.showGroupNumberName
      }), /*#__PURE__*/_react["default"].createElement("a", {
        onClick: function onClick() {
          return _this2.props.goBack();
        },
        "data-sign": "backButton",
        className: _styles["default"].backButton
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _DynamicsFont["default"].arrow
      })), extraButton && /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].logButton
      }, extraButton), logButton), conversationBody, /*#__PURE__*/_react["default"].createElement(_MessageInput["default"], {
        value: this.props.messageText,
        onChange: this.props.updateMessageText,
        disabled: this.props.sendButtonDisabled,
        currentLocale: this.props.currentLocale,
        onSend: this.onSend,
        onHeightChange: this.onInputHeightChange,
        inputExpandable: this.props.inputExpandable,
        attachments: this.props.attachments,
        supportAttachment: this.props.supportAttachment,
        addAttachment: this.props.addAttachment,
        removeAttachment: this.props.removeAttachment
      }));
    }
  }]);

  return ConversationPanel;
}(_react.Component);

ConversationPanel.propTypes = {
  brand: _propTypes["default"].string.isRequired,
  replyToReceivers: _propTypes["default"].func.isRequired,
  messages: _ConversationMessageList["default"].propTypes.messages,
  updateMessageText: _propTypes["default"].func,
  messageText: _propTypes["default"].string,
  recipients: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    phoneNumber: _propTypes["default"].string,
    extensionNumber: _propTypes["default"].string,
    name: _propTypes["default"].string
  })).isRequired,
  sendButtonDisabled: _propTypes["default"].bool.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  showSpinner: _propTypes["default"].bool.isRequired,
  disableLinks: _propTypes["default"].bool,
  conversation: _propTypes["default"].object.isRequired,
  onLogConversation: _propTypes["default"].func,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  autoLog: _propTypes["default"].bool,
  enableContactFallback: _propTypes["default"].bool,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  goBack: _propTypes["default"].func.isRequired,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  showGroupNumberName: _propTypes["default"].bool,
  messageSubjectRenderer: _propTypes["default"].func,
  formatPhone: _propTypes["default"].func.isRequired,
  readMessages: _propTypes["default"].func.isRequired,
  loadPreviousMessages: _propTypes["default"].func.isRequired,
  unloadConversation: _propTypes["default"].func.isRequired,
  perPage: _propTypes["default"].number,
  conversationId: _propTypes["default"].string.isRequired,
  loadConversation: _propTypes["default"].func,
  renderExtraButton: _propTypes["default"].func,
  loadingNextPage: _propTypes["default"].bool,
  inputExpandable: _propTypes["default"].bool,
  attachments: _propTypes["default"].arrayOf(_propTypes["default"].shape({
    size: _propTypes["default"].number,
    name: _propTypes["default"].string
  })),
  supportAttachment: _propTypes["default"].bool,
  addAttachment: _propTypes["default"].func,
  removeAttachment: _propTypes["default"].func
};
ConversationPanel.defaultProps = {
  disableLinks: false,
  onLogConversation: undefined,
  autoLog: false,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  showGroupNumberName: false,
  messageText: '',
  updateMessageText: function updateMessageText() {
    return null;
  },
  messageSubjectRenderer: undefined,
  perPage: undefined,
  loadConversation: function loadConversation() {
    return null;
  },
  renderExtraButton: undefined,
  loadingNextPage: false,
  inputExpandable: undefined,
  attachments: [],
  supportAttachment: false,
  addAttachment: function addAttachment() {
    return null;
  },
  removeAttachment: function removeAttachment() {
    return null;
  }
};
var _default = ConversationPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
