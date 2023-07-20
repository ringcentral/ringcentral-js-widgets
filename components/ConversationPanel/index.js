"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
require("core-js/modules/es.array.find-index");
require("core-js/modules/es.array.map");
require("core-js/modules/es.function.bind");
require("core-js/modules/es.function.name");
require("core-js/modules/es.object.get-prototype-of");
require("core-js/modules/es.object.set-prototype-of");
require("core-js/modules/es.parse-int");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("regenerator-runtime/runtime");
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _juno = require("@ringcentral/juno");
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _checkShouldHidePhoneNumber = require("../../lib/checkShouldHidePhoneNumber");
var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));
var _ConversationMessageList = _interopRequireDefault(require("../ConversationMessageList"));
var _LogButton = _interopRequireDefault(require("../LogButton"));
var _MessageInput = _interopRequireDefault(require("../MessageInput"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
var ConversationPanel = /*#__PURE__*/function (_Component) {
  _inherits(ConversationPanel, _Component);
  var _super = _createSuper(ConversationPanel);
  function ConversationPanel(props) {
    var _this;
    _classCallCheck(this, ConversationPanel);
    _this = _super.call(this, props);
    _this._mounted = void 0;
    _this._userSelection = void 0;
    _this.dncAlert = void 0;
    _this.onSend = function (text, attachments) {
      var selectedContact = _this.getSelectedContact();
      // @ts-expect-error TS(2339): Property 'replyToReceivers' does not exist on type... Remove this comment to see the full error message
      _this.props.replyToReceivers(text, attachments, selectedContact);
    };
    _this.onInputHeightChange = function (value) {
      _this.setState({
        inputHeight: value
      });
    };
    _this.onSelectContact = function (value, idx) {
      var _this$props = _this.props,
        showContactDisplayPlaceholder = _this$props.showContactDisplayPlaceholder,
        autoLog = _this$props.autoLog,
        conversation = _this$props.conversation,
        shouldLogSelectRecord = _this$props.shouldLogSelectRecord,
        onSelectContact = _this$props.onSelectContact;
      var selected = showContactDisplayPlaceholder ? parseInt(idx, 10) - 1 : parseInt(idx, 10);
      _this._userSelection = true;
      _this.setState({
        selected: selected
      });
      if (autoLog) {
        _this.logConversation({
          redirect: false,
          selected: selected,
          prefill: false
        });
      }
      if (shouldLogSelectRecord && typeof onSelectContact === 'function') {
        onSelectContact({
          correspondentEntity: _this.getSelectedContact(selected),
          conversation: conversation
        });
      }
    };
    // @ts-expect-error TS(2339): Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
    _this.getSelectedContact = function () {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.selected;
      // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
      if (!_this.props.conversation) {
        return null;
      }
      // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
      var contactMatches = _this.props.conversation.correspondentMatches;
      return selected > -1 && contactMatches[selected] || contactMatches.length === 1 && contactMatches[0] || null;
    };
    // @ts-expect-error TS(2300): Duplicate identifier 'logConversation'.
    _this.logConversation = _this.logConversation.bind(_assertThisInitialized(_this));
    _this.state = {
      selected: _this.getInitialContactIndex(),
      isLogging: false,
      inputHeight: 63,
      loaded: false,
      alertHeight: 46
    };
    _this._userSelection = false;
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _createClass(ConversationPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // @ts-expect-error TS(2339): Property 'showSpinner' does not exist on type 'Rea... Remove this comment to see the full error message
      if (!this.props.showSpinner) {
        this.loadConversation();
      }
      this._mounted = true;
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (!this._userSelection &&
      // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
      this.props.conversation && nextProps.conversation && (nextProps.conversation.conversationMatches !==
      // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
      this.props.conversation.conversationMatches || nextProps.conversation.correspondentMatches !==
      // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
      this.props.conversation.correspondentMatches)) {
        this.setState({
          selected: this.getInitialContactIndex(nextProps)
        });
      }
      // @ts-expect-error TS(2339): Property 'showSpinner' does not exist on type 'Rea... Remove this comment to see the full error message
      if (!nextProps.showSpinner && this.props.showSpinner) {
        this.loadConversation();
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState) {
      // @ts-expect-error TS(2339): Property 'messages' does not exist on type 'Readon... Remove this comment to see the full error message
      if (prevProps.messages !== this.props.messages) {
        // @ts-expect-error TS(2339): Property 'readMessages' does not exist on type 'Re... Remove this comment to see the full error message
        this.props.readMessages(this.props.conversationId);
      }
      // @ts-expect-error TS(2339): Property 'loaded' does not exist on type 'Readonly... Remove this comment to see the full error message
      if (prevState.loaded === false && this.state.loaded === true) {
        // @ts-expect-error TS(2339): Property 'messages' does not exist on type 'Readon... Remove this comment to see the full error message
        if (this.props.messages.length < this.props.perPage) {
          // @ts-expect-error TS(2339): Property 'loadPreviousMessages' does not exist on ... Remove this comment to see the full error message
          this.props.loadPreviousMessages();
        }
        this.getDncAlertHeight();
      }
    } // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
      // @ts-expect-error TS(2339): Property 'unloadConversation' does not exist on ty... Remove this comment to see the full error message
      this.props.unloadConversation();
    }
  }, {
    key: "getMessageListHeight",
    value: function getMessageListHeight() {
      // @ts-expect-error TS(2339): Property 'restrictSendMessage' does not exist on t... Remove this comment to see the full error message
      var _this$props2 = this.props,
        restrictSendMessage = _this$props2.restrictSendMessage,
        renderLogInfoSection = _this$props2.renderLogInfoSection,
        isWide = _this$props2.isWide; // @ts-expect-error TS(2339): Property 'alertHeight' does not exist on type 'Rea... Remove this comment to see the full error message
      var _this$state = this.state,
        alertHeight = _this$state.alertHeight,
        inputHeight = _this$state.inputHeight;
      var headerHeight = 41;
      var alertMargin = 12;
      var logInfoHeight = isWide ? 60 : 100;
      var extraHeight = 0;
      if (restrictSendMessage === null || restrictSendMessage === void 0 ? void 0 : restrictSendMessage(this.getSelectedContact())) {
        extraHeight = alertHeight + alertMargin + headerHeight;
      } else {
        extraHeight = inputHeight + headerHeight;
      }
      if (typeof renderLogInfoSection === 'function') {
        extraHeight += logInfoHeight;
      }
      return "calc(100% - ".concat(extraHeight, "px)");
    }
  }, {
    key: "getDncAlertHeight",
    value: function getDncAlertHeight() {
      if (this.dncAlert) {
        this.setState({
          alertHeight: this.dncAlert.clientHeight
        });
      }
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
      } else if (correspondentMatches.length) {
        return 0;
      }
      return -1;
    }
  }, {
    key: "getPhoneNumber",
    value: function getPhoneNumber() {
      // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
      var _this$props$conversat = this.props.conversation;
      _this$props$conversat = _this$props$conversat === void 0 ? {} : _this$props$conversat;
      var _this$props$conversat2 = _this$props$conversat.correspondents,
        correspondents = _this$props$conversat2 === void 0 ? [] : _this$props$conversat2;
      return correspondents.length === 1 && (correspondents[0].phoneNumber || correspondents[0].extensionNumber) || undefined;
    }
  }, {
    key: "getGroupPhoneNumbers",
    value: function getGroupPhoneNumbers() {
      // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
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
      // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
      var _this$props$conversat5 = this.props.conversation;
      _this$props$conversat5 = _this$props$conversat5 === void 0 ? {} : _this$props$conversat5;
      var _this$props$conversat6 = _this$props$conversat5.correspondents,
        correspondents = _this$props$conversat6 === void 0 ? [] : _this$props$conversat6;
      return correspondents.length === 1 && correspondents[0].name || undefined;
    }
  }, {
    key: "loadConversation",
    value: function loadConversation() {
      // @ts-expect-error TS(2339): Property 'loadConversation' does not exist on type... Remove this comment to see the full error message
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
                if (!(
                // @ts-expect-error TS(2339): Property 'onLogConversation' does not exist on typ... Remove this comment to see the full error message
                typeof this.props.onLogConversation === 'function' && this._mounted &&
                // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
                !this.state.isLogging)) {
                  _context.next = 6;
                  break;
                }
                this.setState({
                  isLogging: true
                });
                // @ts-expect-error TS(2339): Property 'onLogConversation' does not exist on typ... Remove this comment to see the full error message
                _context.next = 5;
                return this.props.onLogConversation({
                  correspondentEntity: this.getSelectedContact(selected),
                  // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
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
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    value: function render() {
      var _this$props$renderCon,
        _this$props4,
        _this2 = this,
        _this$props$renderLog,
        _this$props5,
        _this$props$restrictS,
        _this$props6;
      // @ts-expect-error TS(2339): Property 'loaded' does not exist on type 'Readonly... Remove this comment to see the full error message
      if (!this.state.loaded) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          className: _styles["default"].root
        }, /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, null));
      }
      var conversationBody = null;
      // @ts-expect-error TS(2339): Property 'showSpinner' does not exist on type 'Rea... Remove this comment to see the full error message
      var loading = this.props.showSpinner;
      // @ts-expect-error TS(2339): Property 'recipients' does not exist on type 'Read... Remove this comment to see the full error message
      var _this$props3 = this.props,
        recipients = _this$props3.recipients,
        messageSubjectRenderer = _this$props3.messageSubjectRenderer;
      if (!loading) {
        conversationBody = /*#__PURE__*/_react["default"].createElement(_ConversationMessageList["default"]
        // @ts-expect-error TS(2769): No overload matches this call.
        , {
          currentLocale: this.props.currentLocale,
          height: this.getMessageListHeight()
          // @ts-expect-error TS(2339): Property 'messages' does not exist on type 'Readon... Remove this comment to see the full error message
          ,
          messages: this.props.messages,
          className: _styles["default"].conversationBody
          // @ts-expect-error TS(2339): Property 'dateTimeFormatter' does not exist on typ... Remove this comment to see the full error message
          ,
          dateTimeFormatter: this.props.dateTimeFormatter,
          showSender: recipients && recipients.length > 1,
          messageSubjectRenderer: messageSubjectRenderer
          // @ts-expect-error TS(2339): Property 'formatPhone' does not exist on type 'Rea... Remove this comment to see the full error message
          ,
          formatPhone: this.props.formatPhone
          // @ts-expect-error TS(2339): Property 'loadingNextPage' does not exist on type ... Remove this comment to see the full error message
          ,
          loadingNextPage: this.props.loadingNextPage
          // @ts-expect-error TS(2339): Property 'loadPreviousMessages' does not exist on ... Remove this comment to see the full error message
          ,
          loadPreviousMessages: this.props.loadPreviousMessages
          // @ts-expect-error TS(2339): Property 'onAttachmentDownload' does not exist on ... Remove this comment to see the full error message
          ,
          onAttachmentDownload: this.props.onAttachmentDownload
          // @ts-expect-error TS(2339): Property 'onLinkClick' does not exist on ... Remove this comment to see the full error message
          ,
          onLinkClick: this.props.onLinkClick
        });
      }
      var _this$props$conversat7 =
        // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
        this.props.conversation,
        isLogging = _this$props$conversat7.isLogging,
        conversationMatches = _this$props$conversat7.conversationMatches,
        correspondentMatches = _this$props$conversat7.correspondentMatches;
      var groupNumbers = this.getGroupPhoneNumbers();
      var phoneNumber = this.getPhoneNumber();
      // TODO: Confirm on group messages similar to MessageItem
      var shouldHideNumber =
      // @ts-expect-error TS(2339): Property 'enableCDC' does not exist on type 'Reado... Remove this comment to see the full error message
      this.props.enableCDC && (0, _checkShouldHidePhoneNumber.checkShouldHidePhoneNumber)(phoneNumber, correspondentMatches);
      var fallbackName = this.getFallbackContactName();
      // @ts-expect-error TS(2339): Property 'renderExtraButton' does not exist on typ... Remove this comment to see the full error message
      var extraButton = this.props.renderExtraButton ?
      // @ts-expect-error TS(2339): Property 'renderExtraButton' does not exist on typ... Remove this comment to see the full error message
      this.props.renderExtraButton(this.props.conversation, {
        logConversation: this.logConversation,
        // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
        isLogging: isLogging || this.state.isLogging
      }) : null;
      var logButton =
      // @ts-expect-error TS(2339): Property 'onLogConversation' does not exist on typ... Remove this comment to see the full error message
      this.props.onLogConversation &&
      // @ts-expect-error TS(2339): Property 'renderExtraButton' does not exist on typ... Remove this comment to see the full error message
      !this.props.renderExtraButton &&
      // @ts-expect-error TS(2339): Property 'renderLogInfoSection' does not exist on ... Remove this comment to see the full error message
      !this.props.renderLogInfoSection ? /*#__PURE__*/_react["default"].createElement(_LogButton["default"], {
        className: _styles["default"].logButton,
        onLog: this.logConversation
        // @ts-expect-error TS(2339): Property 'disableLinks' does not exist on type 'Re... Remove this comment to see the full error message
        ,
        disableLinks: this.props.disableLinks,
        isLogged: conversationMatches.length > 0
        // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
        ,
        isLogging: isLogging || this.state.isLogging
        // @ts-expect-error TS(2322): Type '{ className: string; onLog: ({ redirect, sel... Remove this comment to see the full error message
        ,
        currentLocale: this.props.currentLocale
      }) : null;
      var defaultContactDisplay = /*#__PURE__*/_react["default"].createElement(_ContactDisplay["default"]
      // @ts-expect-error TS(2339): Property 'currentSiteCode' does not exist on type ... Remove this comment to see the full error message
      , {
        currentSiteCode: this.props.currentSiteCode
        // @ts-expect-error TS(2339): Property 'maxExtensionNumberLength' does not exist... Remove this comment to see the full error message
        ,
        maxExtensionNumberLength: this.props.maxExtensionNumberLength
        // @ts-expect-error TS(2339): Property 'isMultipleSiteEnabled' does not exist on... Remove this comment to see the full error message
        ,
        isMultipleSiteEnabled: this.props.isMultipleSiteEnabled
        // @ts-expect-error TS(2339): Property 'brand' does not exist on type 'Readonly<... Remove this comment to see the full error message
        ,
        brand: this.props.brand,
        className: _styles["default"].contactDisplay,
        selectClassName: _styles["default"].contactDisplaySelect,
        contactMatches: correspondentMatches || []
        // @ts-expect-error TS(2339): Property 'selected' does not exist on type 'Readon... Remove this comment to see the full error message
        ,
        selected: this.state.selected,
        onSelectContact: this.onSelectContact
        // @ts-expect-error TS(2339): Property 'disableLinks' does not exist on type 'Re... Remove this comment to see the full error message
        ,
        disabled: this.props.disableLinks
        // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
        ,
        isLogging: isLogging || this.state.isLogging,
        fallBackName: fallbackName
        // @ts-expect-error TS(2339): Property 'areaCode' does not exist on type 'Readon... Remove this comment to see the full error message
        ,
        areaCode: this.props.areaCode
        // @ts-expect-error TS(2339): Property 'countryCode' does not exist on type 'Rea... Remove this comment to see the full error message
        ,
        countryCode: this.props.countryCode,
        phoneNumber: shouldHideNumber ? null : phoneNumber,
        groupNumbers: groupNumbers,
        showType: false
        // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
        ,
        currentLocale: this.props.currentLocale
        // @ts-expect-error TS(2339): Property 'enableContactFallback' does not exist on... Remove this comment to see the full error message
        ,
        enableContactFallback: this.props.enableContactFallback
        // @ts-expect-error TS(2339): Property 'contactPlaceholder' does not exist on ty... Remove this comment to see the full error message
        ,
        placeholder: this.props.contactPlaceholder
        // @ts-expect-error TS(2339): Property 'showContactDisplayPlaceholder' does not ... Remove this comment to see the full error message
        ,
        showPlaceholder: this.props.showContactDisplayPlaceholder
        // @ts-expect-error TS(2339): Property 'sourceIcons' does not exist on type 'Rea... Remove this comment to see the full error message
        ,
        sourceIcons: this.props.sourceIcons
        // @ts-expect-error TS(2322): Type '{ currentSiteCode: any; maxExtensionNumberLe... Remove this comment to see the full error message
        ,
        phoneTypeRenderer: this.props.phoneTypeRenderer
        // @ts-expect-error TS(2339): Property 'phoneSourceNameRenderer' does not exist ... Remove this comment to see the full error message
        ,
        phoneSourceNameRenderer: this.props.phoneSourceNameRenderer
        // @ts-expect-error TS(2339): Property 'showGroupNumberName' does not exist on t... Remove this comment to see the full error message
        ,
        showGroupNumberName: this.props.showGroupNumberName
        // @ts-expect-error TS(2339): Property 'renderContactList' does not exist on typ... Remove this comment to see the full error message
        ,
        dropdownRenderFunction: this.props.renderContactList
        // @ts-expect-error TS(2339): Property 'dropdownClassName' does not exist on typ... Remove this comment to see the full error message
        ,
        dropdownClassName: this.props.dropdownClassName
      });
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].root
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "conversationPanel",
        className: _styles["default"].header
      }, ((_this$props$renderCon = (_this$props4 = this.props).renderConversationTitle) === null || _this$props$renderCon === void 0 ? void 0 : _this$props$renderCon.call(_this$props4, {
        // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
        conversation: this.props.conversation,
        phoneNumber: phoneNumber,
        defaultContactDisplay: defaultContactDisplay
      })) || defaultContactDisplay, /*#__PURE__*/_react["default"].createElement("a", {
        // @ts-expect-error TS(2339): Property 'goBack' does not exist on type 'Readonly... Remove this comment to see the full error message
        onClick: function onClick() {
          return _this2.props.goBack();
        },
        "data-sign": "backButton",
        className: _styles["default"].backButton
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: _DynamicsFont["default"].arrow
      })), extraButton && /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].logButton
      }, extraButton), logButton), ((_this$props$renderLog = (_this$props5 = this.props).renderLogInfoSection) === null || _this$props$renderLog === void 0 ? void 0 : _this$props$renderLog.call(_this$props5, this.props.conversation)) || null, conversationBody, ((_this$props$restrictS = (_this$props6 = this.props).restrictSendMessage) === null || _this$props$restrictS === void 0 ? void 0 : _this$props$restrictS.call(_this$props6, this.getSelectedContact())) ? /*#__PURE__*/_react["default"].createElement(_juno.RcAlert, {
        ref: function ref(target) {
          _this2.dncAlert = target;
        },
        severity: "error",
        size: "small",
        className: _styles["default"].alert,
        "data-sign": "dncAlert"
      }, _i18n["default"].getString('dncAlert', this.props.currentLocale)) : /*#__PURE__*/_react["default"].createElement(_MessageInput["default"]
      // @ts-expect-error TS(2339): Property 'messageText' does not exist on type 'Rea... Remove this comment to see the full error message
      , {
        value: this.props.messageText
        // @ts-expect-error TS(2339): Property 'updateMessageText' does not exist on typ... Remove this comment to see the full error message
        ,
        onChange: this.props.updateMessageText
        // @ts-expect-error TS(2339): Property 'sendButtonDisabled' does not exist on ty... Remove this comment to see the full error message
        ,
        sendButtonDisabled: this.props.sendButtonDisabled
        // @ts-expect-error TS(2339): Property 'currentLocale' does not exist on type 'R... Remove this comment to see the full error message
        ,
        currentLocale: this.props.currentLocale,
        onSend: this.onSend,
        onHeightChange: this.onInputHeightChange
        // @ts-expect-error TS(2339): Property 'inputExpandable' does not exist on type ... Remove this comment to see the full error message
        ,
        inputExpandable: this.props.inputExpandable
        // @ts-expect-error TS(2339): Property 'attachments' does not exist on type 'Rea... Remove this comment to see the full error message
        ,
        attachments: this.props.attachments
        // @ts-expect-error TS(2339): Property 'supportAttachment' does not exist on typ... Remove this comment to see the full error message
        ,
        supportAttachment: this.props.supportAttachment
        // @ts-expect-error TS(2339): Property 'addAttachment' does not exist on type 'R... Remove this comment to see the full error message
        ,
        addAttachment: this.props.addAttachment
        // @ts-expect-error TS(2339): Property 'removeAttachment' does not exist on type... Remove this comment to see the full error message
        ,
        removeAttachment: this.props.removeAttachment
      }));
    }
  }]);
  return ConversationPanel;
}(_react.Component); // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
ConversationPanel.propTypes = {
  isWide: _propTypes["default"].bool,
  brand: _propTypes["default"].string.isRequired,
  replyToReceivers: _propTypes["default"].func.isRequired,
  // @ts-expect-error TS(2339): Property 'propTypes' does not exist on type 'typeo... Remove this comment to see the full error message
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
  contactPlaceholder: _propTypes["default"].string,
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
  removeAttachment: _propTypes["default"].func,
  onAttachmentDownload: _propTypes["default"].func,
  restrictSendMessage: _propTypes["default"].func,
  shouldLogSelectRecord: _propTypes["default"].bool,
  onSelectContact: _propTypes["default"].func,
  renderContactList: _propTypes["default"].func,
  renderLogInfoSection: _propTypes["default"].func,
  dropdownClassName: _propTypes["default"].string,
  enableCDC: _propTypes["default"].bool,
  renderConversationTitle: _propTypes["default"].func,
  isMultipleSiteEnabled: _propTypes["default"].bool,
  currentSiteCode: _propTypes["default"].string,
  maxExtensionNumberLength: _propTypes["default"].number
};
// @ts-expect-error TS(2339): Property 'defaultProps' does not exist on type 'ty... Remove this comment to see the full error message
ConversationPanel.defaultProps = {
  isWide: true,
  disableLinks: false,
  onLogConversation: undefined,
  autoLog: false,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  contactPlaceholder: '',
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
  },
  onAttachmentDownload: undefined,
  restrictSendMessage: undefined,
  shouldLogSelectRecord: false,
  onSelectContact: undefined,
  renderContactList: undefined,
  renderLogInfoSection: undefined,
  dropdownClassName: null,
  enableCDC: false,
  renderConversationTitle: undefined,
  isMultipleSiteEnabled: false,
  currentSiteCode: '',
  maxExtensionNumberLength: 6
};
var _default = ConversationPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
