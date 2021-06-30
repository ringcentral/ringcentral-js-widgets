"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.reflect.construct");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.index-of");

require("core-js/modules/es6.array.filter");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));

var _extensionTypes = require("@ringcentral-integration/commons/enums/extensionTypes");

var _messageDirection = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageDirection"));

var _parseNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/parseNumber"));

var _messageHelper = require("@ringcentral-integration/commons/lib/messageHelper");

var _formatDuration = _interopRequireDefault(require("../../lib/formatDuration"));

var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));

var _ActionMenuList = _interopRequireDefault(require("../ActionMenuList"));

var _VoicemailPlayer = _interopRequireDefault(require("../VoicemailPlayer"));

var _SlideMenu = _interopRequireDefault(require("../SlideMenu"));

var _VoicemailIcon = _interopRequireDefault(require("../../assets/images/VoicemailIcon.svg"));

var _FaxInbound = _interopRequireDefault(require("../../assets/images/FaxInbound.svg"));

var _FaxOutbound = _interopRequireDefault(require("../../assets/images/FaxOutbound.svg"));

var _ComposeText = _interopRequireDefault(require("../../assets/images/ComposeText.svg"));

var _GroupConversation = _interopRequireDefault(require("../../assets/images/GroupConversation.svg"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ConversationIcon = function ConversationIcon(_ref) {
  var group = _ref.group,
      type = _ref.type,
      currentLocale = _ref.currentLocale,
      direction = _ref.direction;
  var title;
  var icon;

  switch (type) {
    case _messageTypes["default"].voiceMail:
      title = _i18n["default"].getString(_messageTypes["default"].voiceMail, currentLocale);
      icon = /*#__PURE__*/_react["default"].createElement(_VoicemailIcon["default"], {
        width: 23,
        className: _styles["default"].icon
      });
      break;

    case _messageTypes["default"].fax:
      title = _i18n["default"].getString(_messageTypes["default"].fax, currentLocale);
      icon = direction === _messageDirection["default"].inbound ? /*#__PURE__*/_react["default"].createElement(_FaxInbound["default"], {
        width: 21,
        className: _styles["default"].icon
      }) : /*#__PURE__*/_react["default"].createElement(_FaxOutbound["default"], {
        width: 21,
        className: _styles["default"].icon
      });
      break;

    default:
      title = group ? _i18n["default"].getString('groupConversation', currentLocale) : _i18n["default"].getString('conversation', currentLocale);
      icon = group ? /*#__PURE__*/_react["default"].createElement(_GroupConversation["default"], {
        width: 19,
        className: _styles["default"].icon
      }) : /*#__PURE__*/_react["default"].createElement(_ComposeText["default"], {
        width: 18,
        className: _styles["default"].icon
      });
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: _styles["default"].conversationIcon
  }, /*#__PURE__*/_react["default"].createElement("span", {
    title: title
  }, icon));
};

ConversationIcon.propTypes = {
  group: _propTypes["default"].bool,
  type: _propTypes["default"].string,
  currentLocale: _propTypes["default"].string,
  direction: _propTypes["default"].string
};
ConversationIcon.defaultProps = {
  group: false,
  type: undefined,
  currentLocale: undefined,
  direction: undefined
};

var MessageItem = /*#__PURE__*/function (_Component) {
  _inherits(MessageItem, _Component);

  var _super = _createSuper(MessageItem);

  function MessageItem(props) {
    var _this;

    _classCallCheck(this, MessageItem);

    _this = _super.call(this, props);

    _this.preventEventPropogation = function (e) {
      if (e.target !== e.currentTarget) {
        e.stopPropagation();
      }
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

    _this.getSelectedContact = function () {
      var selected = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _this.state.selected;
      var contactMatches = _this.props.conversation.correspondentMatches;
      return selected > -1 && contactMatches[selected] || contactMatches.length === 1 && contactMatches[0] || null;
    };

    _this.viewSelectedContact = function () {
      if (typeof _this.props.onViewContact === 'function') {
        _this.props.onViewContact({
          contact: _this.getSelectedContact(),
          contactMatches: _this.getMatchEntities(),
          phoneNumber: _this.getPhoneNumber(),
          matchEntitiesIds: _this.getMatchEntitiesIds()
        });
      }
    };

    _this.createSelectedContact = _this.createSelectedContact.bind(_assertThisInitialized(_this));
    _this.logConversation = _this.logConversation.bind(_assertThisInitialized(_this));

    _this.clickToDial = function () {
      if (_this.props.onClickToDial) {
        var contact = _this.getSelectedContact() || {};

        var phoneNumber = _this.getPhoneNumber();

        if (phoneNumber) {
          _this.props.onClickToDial(_objectSpread(_objectSpread({}, contact), {}, {
            phoneNumber: phoneNumber,
            fromType: _this.props.conversation.type
          }));
        }
      }
    };

    _this.onClickToSms = function () {
      if (_this.props.onClickToSms) {
        var contact = _this.getSelectedContact() || {};

        var phoneNumber = _this.getPhoneNumber();

        if (phoneNumber) {
          _this.props.updateTypeFilter(_messageTypes["default"].text);

          _this.props.onClickToSms(_objectSpread(_objectSpread({}, contact), {}, {
            phoneNumber: phoneNumber
          }));
        }
      }
    };

    _this.onClickItem = function (e) {
      if (_this.contactDisplay && _this.contactDisplay.contains(e.target)) {
        return;
      }

      _this.toggleExtended();
    };

    _this.onClickWrapper = function (e) {
      if (_this.contactDisplay && _this.contactDisplay.contains(e.target)) {
        return;
      }

      if ((0, _messageHelper.messageIsTextMessage)(_this.props.conversation)) {
        _this.props.showConversationDetail(_this.props.conversation.conversationId);
      }
    };

    _this.onPlayVoicemail = function () {
      if (_this.props.conversation.unreadCounts > 0) {
        _this.props.readMessage(_this.props.conversation.conversationId);
      }
    };

    _this.onMarkMessage = function () {
      if (_this.props.conversation.unreadCounts === 0) {
        _this.props.markMessage(_this.props.conversation.conversationId);
      }
    };

    _this.onUnmarkMessage = function () {
      if (_this.props.conversation.unreadCounts > 0) {
        _this.props.unmarkMessage(_this.props.conversation.conversationId);
      }
    };

    _this.onPreviewFax = function (uri) {
      _this.props.previewFaxMessages(uri, _this.props.conversation.conversationId);
    };

    _this.onDeleteMessage = function () {
      _this.props.deleteMessage(_this.props.conversation.conversationId);
    };

    _this.getDisableClickToSms = function () {
      var _this$props2 = _this.props,
          areaCode = _this$props2.areaCode,
          countryCode = _this$props2.countryCode,
          onClickToSms = _this$props2.onClickToSms,
          internalSmsPermission = _this$props2.internalSmsPermission,
          outboundSmsPermission = _this$props2.outboundSmsPermission;

      var phoneNumber = _this.getPhoneNumber();

      var disableClickToSms = false;

      if (phoneNumber) {
        var parsedInfo = (0, _parseNumber["default"])({
          phoneNumber: phoneNumber,
          countryCode: countryCode,
          areaCode: areaCode
        });
        var isExtension = !parsedInfo.hasPlus && parsedInfo.number && parsedInfo.number.length <= 6;
        disableClickToSms = !(onClickToSms && (isExtension ? internalSmsPermission : outboundSmsPermission));
      }

      return disableClickToSms;
    };

    _this.state = {
      selected: _this.getInitialContactIndex(),
      isLogging: false,
      isCreating: false,
      extended: false
    };

    _this.toggleExtended = function () {
      _this.setState(function (preState) {
        return {
          extended: !preState.extended
        };
      });
    };

    _this._userSelection = false;
    /* [RCINT-4301] onSelection would trigger some state changes that would push new
     * properties before the state has been changed. Which would reset the selected value.
     */

    return _this;
  }

  _createClass(MessageItem, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._mounted = true;
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (!this._userSelection && (nextProps.conversation.conversationMatches !== this.props.conversation.conversationMatches || nextProps.conversation.correspondentMatches !== this.props.conversation.correspondentMatches)) {
        this.setState({
          selected: this.getInitialContactIndex(nextProps)
        });
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: "getInitialContactIndex",
    value: function getInitialContactIndex() {
      var nextProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      var _nextProps$conversati = nextProps.conversation,
          correspondentMatches = _nextProps$conversati.correspondentMatches,
          lastMatchedCorrespondentEntity = _nextProps$conversati.lastMatchedCorrespondentEntity;

      if (lastMatchedCorrespondentEntity) {
        var index = correspondentMatches.findIndex(function (contact) {
          return contact.id === lastMatchedCorrespondentEntity.id;
        });
        if (index > -1) return index;
      }

      return this.props.showContactDisplayPlaceholder ? -1 : 0;
    }
  }, {
    key: "getMatchEntities",
    value: function getMatchEntities() {
      return this.props.conversation.correspondentMatches || [];
    }
  }, {
    key: "getMatchEntitiesIds",
    value: function getMatchEntitiesIds() {
      var contactMatches = this.props.conversation.correspondentMatches || [];
      return contactMatches.map(function (item) {
        return item.id;
      });
    }
  }, {
    key: "getPhoneNumber",
    value: function getPhoneNumber() {
      var correspondents = this.props.conversation.correspondents;
      return correspondents.length === 1 && correspondents[0] && (correspondents[0].phoneNumber || correspondents[0].extensionNumber) || undefined;
    }
  }, {
    key: "getGroupPhoneNumbers",
    value: function getGroupPhoneNumbers() {
      var correspondents = this.props.conversation.correspondents;
      var groupNumbers = correspondents.length > 1 ? correspondents.map(function (correspondent) {
        return correspondent.extensionNumber || correspondent.phoneNumber || undefined;
      }) : null;
      return groupNumbers;
    }
  }, {
    key: "getFallbackContactName",
    value: function getFallbackContactName() {
      var correspondents = this.props.conversation.correspondents;
      return correspondents.length === 1 && correspondents[0].name || undefined;
    }
  }, {
    key: "createSelectedContact",
    value: function () {
      var _createSelectedContact = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(entityType) {
        var phoneNumber;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof this.props.onCreateContact === 'function' && this._mounted && !this.state.isCreating)) {
                  _context.next = 6;
                  break;
                }

                this.setState({
                  isCreating: true
                }); // console.log('start to create: isCreating...', this.state.isCreating);

                phoneNumber = this.getPhoneNumber();
                _context.next = 5;
                return this.props.onCreateContact({
                  phoneNumber: phoneNumber,
                  name: this.props.enableContactFallback ? this.getFallbackContactName() : '',
                  entityType: entityType
                });

              case 5:
                if (this._mounted) {
                  this.setState({
                    isCreating: false
                  }); // console.log('created: isCreating...', this.state.isCreating);
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createSelectedContact(_x) {
        return _createSelectedContact.apply(this, arguments);
      }

      return createSelectedContact;
    }()
  }, {
    key: "logConversation",
    value: function () {
      var _logConversation = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _ref2,
            _ref2$redirect,
            redirect,
            selected,
            _ref2$prefill,
            prefill,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _ref2 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, _ref2$redirect = _ref2.redirect, redirect = _ref2$redirect === void 0 ? true : _ref2$redirect, selected = _ref2.selected, _ref2$prefill = _ref2.prefill, prefill = _ref2$prefill === void 0 ? true : _ref2$prefill;

                if (!(typeof this.props.onLogConversation === 'function' && this._mounted && !this.state.isLogging)) {
                  _context2.next = 6;
                  break;
                }

                this.setState({
                  isLogging: true
                });
                _context2.next = 5;
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
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function logConversation() {
        return _logConversation.apply(this, arguments);
      }

      return logConversation;
    }()
  }, {
    key: "getDetail",
    value: function getDetail() {
      var _this$props3 = this.props,
          conversation = _this$props3.conversation,
          currentLocale = _this$props3.currentLocale;

      if ((0, _messageHelper.messageIsTextMessage)(conversation)) {
        if (conversation.mmsAttachments && conversation.mmsAttachments.length > 0) {
          var imageCount = conversation.mmsAttachments.filter(function (m) {
            return m.contentType.indexOf('image') > -1;
          }).length;

          if (imageCount > 0) {
            return (0, _formatMessage["default"])(_i18n["default"].getString('imageAttachment', currentLocale), {
              count: imageCount
            });
          }

          return (0, _formatMessage["default"])(_i18n["default"].getString('fileAttachment', currentLocale), {
            count: conversation.mmsAttachments.length
          });
        }

        return conversation.subject;
      }

      if (conversation.voicemailAttachment) {
        var duration = conversation.voicemailAttachment.duration;
        return "".concat(_i18n["default"].getString('voiceMessage', currentLocale), " (").concat((0, _formatDuration["default"])(duration), ")");
      }

      if ((0, _messageHelper.messageIsFax)(conversation)) {
        var pageCount = parseInt(conversation.faxPageCount, 10);

        if (conversation.direction === _messageDirection["default"].inbound) {
          return "".concat(_i18n["default"].getString('faxReceived', currentLocale), "(").concat(pageCount, " ").concat(_i18n["default"].getString('pages', currentLocale), ")");
        }

        return "".concat(_i18n["default"].getString('faxSent', currentLocale), "(").concat(pageCount, " ").concat(_i18n["default"].getString('pages', currentLocale), ")");
      }

      return '';
    }
  }, {
    key: "dateTimeFormatter",
    value: function dateTimeFormatter(creationTime) {
      try {
        return this.props.dateTimeFormatter({
          utcTimestamp: creationTime
        });
      } catch (e) {
        console.error('Format date time error', creationTime);
        return creationTime;
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this,
          _this$getSelectedCont,
          _this$getSelectedCont2;

      var _this$props4 = this.props,
          areaCode = _this$props4.areaCode,
          brand = _this$props4.brand,
          countryCode = _this$props4.countryCode,
          currentLocale = _this$props4.currentLocale,
          currentSiteCode = _this$props4.currentSiteCode,
          isMultipleSiteEnabled = _this$props4.isMultipleSiteEnabled,
          _this$props4$conversa = _this$props4.conversation,
          conversationId = _this$props4$conversa.conversationId,
          unreadCounts = _this$props4$conversa.unreadCounts,
          correspondents = _this$props4$conversa.correspondents,
          correspondentMatches = _this$props4$conversa.correspondentMatches,
          creationTime = _this$props4$conversa.creationTime,
          isLogging = _this$props4$conversa.isLogging,
          conversationMatches = _this$props4$conversa.conversationMatches,
          type = _this$props4$conversa.type,
          direction = _this$props4$conversa.direction,
          voicemailAttachment = _this$props4$conversa.voicemailAttachment,
          faxAttachment = _this$props4$conversa.faxAttachment,
          parentDisableLinks = _this$props4.disableLinks,
          disableCallButton = _this$props4.disableCallButton,
          disableClickToDial = _this$props4.disableClickToDial,
          onClickToDial = _this$props4.onClickToDial,
          onClickToSms = _this$props4.onClickToSms,
          onLogConversation = _this$props4.onLogConversation,
          onViewContact = _this$props4.onViewContact,
          onCreateContact = _this$props4.onCreateContact,
          createEntityTypes = _this$props4.createEntityTypes,
          enableContactFallback = _this$props4.enableContactFallback,
          contactPlaceholder = _this$props4.contactPlaceholder,
          showContactDisplayPlaceholder = _this$props4.showContactDisplayPlaceholder,
          sourceIcons = _this$props4.sourceIcons,
          phoneTypeRenderer = _this$props4.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props4.phoneSourceNameRenderer,
          showGroupNumberName = _this$props4.showGroupNumberName,
          renderExtraButton = _this$props4.renderExtraButton,
          onFaxDownload = _this$props4.onFaxDownload,
          showChooseEntityModal = _this$props4.showChooseEntityModal;
      var disableLinks = parentDisableLinks;
      var isVoicemail = type === _messageTypes["default"].voiceMail;
      var isFax = type === _messageTypes["default"].fax;

      if (isVoicemail && !voicemailAttachment) {
        disableLinks = true;
      }

      if (isFax && !faxAttachment) {
        disableLinks = true;
      }

      var groupNumbers = this.getGroupPhoneNumbers();
      var phoneNumber = this.getPhoneNumber();
      var fallbackName = this.getFallbackContactName();
      var detail = this.getDetail();
      var disableClickToSms = this.getDisableClickToSms();
      var player;
      var slideMenuHeight = 60;

      if (isVoicemail) {
        player = /*#__PURE__*/_react["default"].createElement(_VoicemailPlayer["default"], {
          className: _styles["default"].player,
          uri: voicemailAttachment.uri,
          duration: voicemailAttachment.duration,
          onPlay: this.onPlayVoicemail,
          disabled: disableLinks,
          currentLocale: currentLocale
        });
        slideMenuHeight = 88;
      }

      var extraButton = renderExtraButton ? renderExtraButton(this.props.conversation, {
        logConversation: this.logConversation,
        isLogging: isLogging || this.state.isLogging
      }) : null;
      var msgItem = "".concat(type, "MessageItem");
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": msgItem,
        "data-id": conversationId,
        className: _styles["default"].root,
        onClick: this.onClickItem
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "unread",
        className: (0, _classnames["default"])(_styles["default"].wrapper, unreadCounts && _styles["default"].unread),
        onClick: this.onClickWrapper
      }, /*#__PURE__*/_react["default"].createElement(ConversationIcon, {
        group: correspondents.length > 1,
        type: type,
        currentLocale: currentLocale,
        direction: direction
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].infoWrapper, !extraButton && _styles["default"].embellishInfoWrapper)
      }, /*#__PURE__*/_react["default"].createElement(_ContactDisplay["default"], {
        reference: function reference(ref) {
          _this2.contactDisplay = ref;
        },
        className: (0, _classnames["default"])(_styles["default"].contactDisplay, unreadCounts && _styles["default"].unread),
        selectedClassName: _styles["default"].selectedValue,
        selectClassName: _styles["default"].dropdownSelect,
        brand: brand,
        contactMatches: correspondentMatches,
        selected: this.state.selected,
        onSelectContact: this.onSelectContact,
        disabled: disableLinks,
        isLogging: isLogging || this.state.isLogging,
        fallBackName: fallbackName,
        areaCode: areaCode,
        countryCode: countryCode,
        phoneNumber: phoneNumber,
        groupNumbers: groupNumbers,
        showGroupNumberName: showGroupNumberName,
        currentLocale: currentLocale,
        currentSiteCode: currentSiteCode,
        isMultipleSiteEnabled: isMultipleSiteEnabled,
        enableContactFallback: enableContactFallback,
        stopPropagation: false,
        showType: false,
        showPlaceholder: showContactDisplayPlaceholder,
        placeholder: contactPlaceholder,
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer
      }), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].detailsWithTime
      }, /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "msgDetail",
        className: _styles["default"].details,
        title: detail
      }, detail), /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].separatrix
      }, "|"), /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "msgCreateTime",
        className: _styles["default"].creationTime
      }, this.dateTimeFormatter(creationTime)))), extraButton), /*#__PURE__*/_react["default"].createElement(_SlideMenu["default"], {
        extended: this.state.extended,
        onToggle: this.toggleExtended,
        extendIconClassName: _styles["default"].extendIcon,
        className: _styles["default"].slideMenu,
        minHeight: 0,
        maxHeight: slideMenuHeight
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: _styles["default"].playContainer,
        onClick: this.preventEventPropogation
      }, player), /*#__PURE__*/_react["default"].createElement(_ActionMenuList["default"], {
        className: _styles["default"].actionMenuList,
        type: type,
        currentLocale: currentLocale,
        onLog: isVoicemail || isFax || renderExtraButton ? undefined : onLogConversation && this.logConversation,
        onViewEntity: onViewContact && this.viewSelectedContact,
        onCreateEntity: onCreateContact && this.createSelectedContact,
        createEntityTypes: createEntityTypes,
        hasEntity: correspondents.length === 1 && !!correspondentMatches.length && ((_this$getSelectedCont = (_this$getSelectedCont2 = this.getSelectedContact()) === null || _this$getSelectedCont2 === void 0 ? void 0 : _this$getSelectedCont2.type) !== null && _this$getSelectedCont !== void 0 ? _this$getSelectedCont : '') !== _extensionTypes.extensionTypes.ivrMenu,
        onClickToDial: !isFax ? onClickToDial && this.clickToDial : undefined,
        onClickToSms: isVoicemail ? onClickToSms && this.onClickToSms : undefined,
        disableClickToSms: disableClickToSms,
        phoneNumber: phoneNumber,
        disableLinks: disableLinks,
        disableCallButton: disableCallButton,
        disableClickToDial: disableClickToDial,
        isLogging: isLogging || this.state.isLogging,
        isLogged: conversationMatches.length > 0,
        isCreating: this.state.isCreating,
        addLogTitle: _i18n["default"].getString('addLog', currentLocale),
        editLogTitle: _i18n["default"].getString('editLog', currentLocale),
        callTitle: _i18n["default"].getString('call', currentLocale),
        textTitle: _i18n["default"].getString('text', currentLocale),
        createEntityTitle: _i18n["default"].getString('addEntity', currentLocale),
        viewEntityTitle: _i18n["default"].getString('viewDetails', currentLocale),
        stopPropagation: false,
        onDelete: isVoicemail || isFax ? this.onDeleteMessage : undefined,
        deleteTitle: _i18n["default"].getString('delete', currentLocale),
        marked: unreadCounts > 0,
        onMark: isVoicemail || isFax && direction === _messageDirection["default"].inbound ? this.onMarkMessage : undefined,
        onUnmark: isVoicemail || isFax && direction === _messageDirection["default"].inbound ? this.onUnmarkMessage : undefined,
        onPreview: isFax ? this.onPreviewFax : undefined,
        markTitle: _i18n["default"].getString('mark', currentLocale),
        unmarkTitle: _i18n["default"].getString('unmark', currentLocale),
        faxAttachment: faxAttachment,
        previewTitle: _i18n["default"].getString('preview', currentLocale),
        downloadTitle: _i18n["default"].getString('download', currentLocale),
        onFaxDownload: onFaxDownload,
        showChooseEntityModal: showChooseEntityModal
      })));
    }
  }]);

  return MessageItem;
}(_react.Component);

exports["default"] = MessageItem;
MessageItem.propTypes = {
  conversation: _propTypes["default"].shape({
    conversationId: _propTypes["default"].string.isRequired,
    isLogging: _propTypes["default"].bool,
    creationTime: _propTypes["default"].number,
    direction: _propTypes["default"].string,
    faxPageCount: _propTypes["default"].number,
    voicemailAttachment: _propTypes["default"].shape({
      duration: _propTypes["default"].number,
      uri: _propTypes["default"].string
    }),
    faxAttachment: _propTypes["default"].shape({
      uri: _propTypes["default"].string
    }),
    correspondents: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      name: _propTypes["default"].string,
      phoneNumber: _propTypes["default"].string,
      extensionNumber: _propTypes["default"].string
    })),
    correspondentMatches: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      name: _propTypes["default"].string,
      entityType: _propTypes["default"].string
    })),
    conversationMatches: _propTypes["default"].arrayOf(_propTypes["default"].shape({
      id: _propTypes["default"].string
    })),
    unreadCounts: _propTypes["default"].number.isRequired,
    type: _propTypes["default"].string.isRequired,
    uri: _propTypes["default"].string,
    mmsAttachments: _propTypes["default"].any,
    subject: _propTypes["default"].string
  }).isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  brand: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  currentSiteCode: _propTypes["default"].string,
  isMultipleSiteEnabled: _propTypes["default"].bool,
  onLogConversation: _propTypes["default"].func,
  onViewContact: _propTypes["default"].func,
  onCreateContact: _propTypes["default"].func,
  createEntityTypes: _propTypes["default"].array,
  onClickToDial: _propTypes["default"].func,
  onClickToSms: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool,
  disableCallButton: _propTypes["default"].bool,
  disableClickToDial: _propTypes["default"].bool,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  showConversationDetail: _propTypes["default"].func.isRequired,
  readMessage: _propTypes["default"].func.isRequired,
  markMessage: _propTypes["default"].func.isRequired,
  unmarkMessage: _propTypes["default"].func.isRequired,
  autoLog: _propTypes["default"].bool,
  enableContactFallback: _propTypes["default"].bool,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  contactPlaceholder: _propTypes["default"].string,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  showGroupNumberName: _propTypes["default"].bool,
  deleteMessage: _propTypes["default"].func,
  previewFaxMessages: _propTypes["default"].func,
  renderExtraButton: _propTypes["default"].func,
  internalSmsPermission: _propTypes["default"].bool,
  outboundSmsPermission: _propTypes["default"].bool,
  updateTypeFilter: _propTypes["default"].func,
  onFaxDownload: _propTypes["default"].func,
  showChooseEntityModal: _propTypes["default"].bool,
  shouldLogSelectRecord: _propTypes["default"].bool,
  onSelectContact: _propTypes["default"].func
};
MessageItem.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  onLogConversation: undefined,
  onClickToDial: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  createEntityTypes: undefined,
  disableClickToDial: false,
  onClickToSms: undefined,
  disableLinks: false,
  disableCallButton: false,
  autoLog: false,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  contactPlaceholder: '',
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  showGroupNumberName: false,
  deleteMessage: function deleteMessage() {},
  previewFaxMessages: undefined,
  renderExtraButton: undefined,
  internalSmsPermission: true,
  outboundSmsPermission: true,
  updateTypeFilter: undefined,
  onFaxDownload: undefined,
  showChooseEntityModal: true,
  shouldLogSelectRecord: false,
  onSelectContact: undefined
};
//# sourceMappingURL=index.js.map
