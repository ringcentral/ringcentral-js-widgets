"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.symbol.to-primitive.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.date.to-primitive.js");
require("core-js/modules/es.number.constructor.js");
require("core-js/modules/es.object.create.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.object.get-own-property-descriptor.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/es.reflect.construct.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/es.weak-map.js");
require("core-js/modules/web.dom-collections.iterator.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.find-index.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.set-prototype-of.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.parse-int.js");
var _juno = require("@ringcentral/juno");
var _propTypes = _interopRequireDefault(require("prop-types"));
var _react = _interopRequireWildcard(require("react"));
var _DynamicsFont = _interopRequireDefault(require("../../assets/DynamicsFont/DynamicsFont.scss"));
var _checkShouldHidePhoneNumber = require("../../lib/checkShouldHidePhoneNumber");
var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));
var _ConversationMessageList = _interopRequireDefault(require("../ConversationMessageList"));
var _LogButton = _interopRequireDefault(require("../LogButton"));
var _MessageInput = _interopRequireWildcard(require("../MessageInput"));
var _SpinnerOverlay = require("../SpinnerOverlay");
var _i18n = _interopRequireDefault(require("./i18n"));
var _styles = _interopRequireDefault(require("./styles.scss"));
function _interopRequireWildcard(e, t) { if ("function" == typeof WeakMap) var r = new WeakMap(), n = new WeakMap(); return (_interopRequireWildcard = function _interopRequireWildcard(e, t) { if (!t && e && e.__esModule) return e; var o, i, f = { __proto__: null, "default": e }; if (null === e || "object" != _typeof(e) && "function" != typeof e) return f; if (o = t ? n : r) { if (o.has(e)) return o.get(e); o.set(e, f); } for (var _t in e) "default" !== _t && {}.hasOwnProperty.call(e, _t) && ((i = (o = Object.defineProperty) && Object.getOwnPropertyDescriptor(e, _t)) && (i.get || i.set) ? o(f, _t, i) : f[_t] = e[_t]); return f; })(e, t); }
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); } /* eslint-disable jsx-a11y/no-static-element-interactions */ /* eslint-disable jsx-a11y/click-events-have-key-events */
var ConversationPanel = /*#__PURE__*/function (_Component) {
  function ConversationPanel(props) {
    var _this;
    _classCallCheck(this, ConversationPanel);
    _this = _callSuper(this, ConversationPanel, [props]);
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
    _this.logConversation = _this.logConversation.bind(_this);
    _this.state = {
      selected: _this.getInitialContactIndex(),
      isLogging: false,
      inputHeight: 41,
      loaded: false,
      alertHeight: 46
    };
    _this._userSelection = false;
    return _this;
  }

  // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
  _inherits(ConversationPanel, _Component);
  return _createClass(ConversationPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      // @ts-expect-error TS(2339): Property 'showSpinner' does not exist on type 'Rea... Remove this comment to see the full error message
      if (!this.props.showSpinner) {
        this.loadConversation();
      }
      this._mounted = true;
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
    }

    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
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
      var _this$props2 = this.props,
        restrictSendMessage = _this$props2.restrictSendMessage,
        renderLogInfoSection = _this$props2.renderLogInfoSection,
        isWide = _this$props2.isWide,
        supportAttachment = _this$props2.supportAttachment,
        supportEmoji = _this$props2.supportEmoji,
        attachments = _this$props2.attachments;

      // @ts-expect-error TS(2339): Property 'alertHeight' does not exist on type 'Rea... Remove this comment to see the full error message
      var _this$state = this.state,
        alertHeight = _this$state.alertHeight,
        inputHeight = _this$state.inputHeight;
      var headerHeight = 41;
      var alertMargin = 12;
      var logInfoHeight = isWide ? 60 : 100;
      var inputToolBarHeight = 40;
      var attachmentItemHeight = 50;
      var extraHeight = 0;
      if (restrictSendMessage === null || restrictSendMessage === void 0 ? void 0 : restrictSendMessage(this.getSelectedContact())) {
        extraHeight = alertHeight + alertMargin + headerHeight;
      } else {
        // padding 2px and border 1px
        extraHeight = inputHeight + headerHeight + 3;
      }
      if (typeof renderLogInfoSection === 'function') {
        extraHeight += logInfoHeight;
      }
      if (supportAttachment || supportEmoji) {
        extraHeight += inputToolBarHeight;
      } else {
        // default UI top offset for input
        extraHeight += 10;
      }
      if (supportAttachment && (attachments === null || attachments === void 0 ? void 0 : attachments.length)) {
        extraHeight += (attachments.length > _MessageInput.MAX_PREVIEW_ATTACHMENT_SIZE ? _MessageInput.MAX_PREVIEW_ATTACHMENT_SIZE : attachments.length) * attachmentItemHeight;
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
        // @ts-ignore
      } else if (correspondentMatches.length && !this.props.disableAutoSelect) {
        return 0;
      }
      return -1;
    }
  }, {
    key: "getPhoneNumber",
    value: function getPhoneNumber() {
      // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
      var _this$props$conversat = this.props.conversation,
        _this$props$conversat2 = _this$props$conversat === void 0 ? {} : _this$props$conversat,
        _this$props$conversat3 = _this$props$conversat2.correspondents,
        correspondents = _this$props$conversat3 === void 0 ? [] : _this$props$conversat3;
      return correspondents.length === 1 && (correspondents[0].phoneNumber || correspondents[0].extensionNumber) || undefined;
    }
  }, {
    key: "getGroupPhoneNumbers",
    value: function getGroupPhoneNumbers() {
      // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
      var _this$props$conversat4 = this.props.conversation,
        _this$props$conversat5 = _this$props$conversat4 === void 0 ? {} : _this$props$conversat4,
        _this$props$conversat6 = _this$props$conversat5.correspondents,
        correspondents = _this$props$conversat6 === void 0 ? [] : _this$props$conversat6;
      var groupNumbers = correspondents.length > 1 ? correspondents.map(function (correspondent) {
        return correspondent.extensionNumber || correspondent.phoneNumber || undefined;
      }) : null;
      return groupNumbers;
    }
  }, {
    key: "getFallbackContactName",
    value: function getFallbackContactName() {
      // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
      var _this$props$conversat7 = this.props.conversation,
        _this$props$conversat8 = _this$props$conversat7 === void 0 ? {} : _this$props$conversat7,
        _this$props$conversat9 = _this$props$conversat8.correspondents,
        correspondents = _this$props$conversat9 === void 0 ? [] : _this$props$conversat9;
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
      var _logConversation = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var _ref,
          _ref$redirect,
          redirect,
          selected,
          _ref$prefill,
          prefill,
          _args = arguments;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.n) {
            case 0:
              _ref = _args.length > 0 && _args[0] !== undefined ? _args[0] : {}, _ref$redirect = _ref.redirect, redirect = _ref$redirect === void 0 ? true : _ref$redirect, selected = _ref.selected, _ref$prefill = _ref.prefill, prefill = _ref$prefill === void 0 ? true : _ref$prefill;
              if (!(
              // @ts-expect-error TS(2339): Property 'onLogConversation' does not exist on typ... Remove this comment to see the full error message
              typeof this.props.onLogConversation === 'function' && this._mounted &&
              // @ts-expect-error TS(2339): Property 'isLogging' does not exist on type 'Reado... Remove this comment to see the full error message
              !this.state.isLogging)) {
                _context.n = 2;
                break;
              }
              this.setState({
                isLogging: true
              });
              // @ts-expect-error TS(2339): Property 'onLogConversation' does not exist on typ... Remove this comment to see the full error message
              _context.n = 1;
              return this.props.onLogConversation({
                correspondentEntity: this.getSelectedContact(selected),
                // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
                conversationId: this.props.conversation.conversationId,
                redirect: redirect,
                prefill: prefill
              });
            case 1:
              if (this._mounted) {
                this.setState({
                  isLogging: false
                });
              }
            case 2:
              return _context.a(2);
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
    value:
    // @ts-expect-error TS(4114): This member must have an 'override' modifier becau... Remove this comment to see the full error message
    function render() {
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
      var _this$props$conversat0 =
        // @ts-expect-error TS(2339): Property 'conversation' does not exist on type 'Re... Remove this comment to see the full error message
        this.props.conversation,
        isLogging = _this$props$conversat0.isLogging,
        conversationMatches = _this$props$conversat0.conversationMatches,
        correspondentMatches = _this$props$conversat0.correspondentMatches;
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
        // @ts-expect-error TS(2339): Property 'supportEmoji' does not exist on typ... Remove this comment to see the full error message
        ,
        supportEmoji: this.props.supportEmoji
        // @ts-expect-error TS(2339): Property 'addAttachments' does not exist on type 'R... Remove this comment to see the full error message
        ,
        addAttachments: this.props.addAttachments
        // @ts-expect-error TS(2339): Property 'removeAttachment' does not exist on type... Remove this comment to see the full error message
        ,
        removeAttachment: this.props.removeAttachment
      }));
    }
  }]);
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
  supportEmoji: _propTypes["default"].bool,
  addAttachments: _propTypes["default"].func,
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
  supportEmoji: false,
  addAttachments: function addAttachments() {
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
var _default = exports["default"] = ConversationPanel;
//# sourceMappingURL=index.js.map
