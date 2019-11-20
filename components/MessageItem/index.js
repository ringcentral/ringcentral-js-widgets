"use strict";

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.array.filter");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.index-of");

require("regenerator-runtime/runtime");

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find-index");

require("core-js/modules/es6.function.bind");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _messageTypes = _interopRequireDefault(require("ringcentral-integration/enums/messageTypes"));

var _messageDirection = _interopRequireDefault(require("ringcentral-integration/enums/messageDirection"));

var _parseNumber = _interopRequireDefault(require("ringcentral-integration/lib/parseNumber"));

var _messageHelper = require("ringcentral-integration/lib/messageHelper");

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

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function ConversationIcon(_ref) {
  var group = _ref.group,
      type = _ref.type,
      currentLocale = _ref.currentLocale,
      direction = _ref.direction;
  var title;
  var icon;

  switch (type) {
    case _messageTypes["default"].voiceMail:
      title = _i18n["default"].getString(_messageTypes["default"].voiceMail, currentLocale);
      icon = _react["default"].createElement(_VoicemailIcon["default"], {
        width: 23,
        className: _styles["default"].icon
      });
      break;

    case _messageTypes["default"].fax:
      title = _i18n["default"].getString(_messageTypes["default"].fax, currentLocale);
      icon = direction === _messageDirection["default"].inbound ? _react["default"].createElement(_FaxInbound["default"], {
        width: 21,
        className: _styles["default"].icon
      }) : _react["default"].createElement(_FaxOutbound["default"], {
        width: 21,
        className: _styles["default"].icon
      });
      break;

    default:
      title = group ? _i18n["default"].getString('groupConversation', currentLocale) : _i18n["default"].getString('conversation', currentLocale);
      icon = group ? _react["default"].createElement(_GroupConversation["default"], {
        width: 19,
        className: _styles["default"].icon
      }) : _react["default"].createElement(_ComposeText["default"], {
        width: 18,
        className: _styles["default"].icon
      });
  }

  return _react["default"].createElement("div", {
    className: _styles["default"].conversationIcon
  }, _react["default"].createElement("span", {
    title: title
  }, icon));
}

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

var MessageItem =
/*#__PURE__*/
function (_Component) {
  _inherits(MessageItem, _Component);

  function MessageItem(props) {
    var _this;

    _classCallCheck(this, MessageItem);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(MessageItem).call(this, props));

    _this.preventEventPropogation = function (e) {
      if (e.target !== e.currentTarget) {
        e.stopPropagation();
      }
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
          _this.props.onClickToDial(_objectSpread({}, contact, {
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

          _this.props.onClickToSms(_objectSpread({}, contact, {
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
      var _this$props = _this.props,
          areaCode = _this$props.areaCode,
          countryCode = _this$props.countryCode,
          onClickToSms = _this$props.onClickToSms,
          internalSmsPermission = _this$props.internalSmsPermission,
          outboundSmsPermission = _this$props.outboundSmsPermission;

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
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
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
    value: function createSelectedContact(entityType) {
      var phoneNumber;
      return regeneratorRuntime.async(function createSelectedContact$(_context) {
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
              return regeneratorRuntime.awrap(this.props.onCreateContact({
                phoneNumber: phoneNumber,
                name: this.props.enableContactFallback ? this.getFallbackContactName() : '',
                entityType: entityType
              }));

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
      }, null, this);
    }
  }, {
    key: "logConversation",
    value: function logConversation() {
      var _ref2,
          _ref2$redirect,
          redirect,
          selected,
          _ref2$prefill,
          prefill,
          _args2 = arguments;

      return regeneratorRuntime.async(function logConversation$(_context2) {
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
              return regeneratorRuntime.awrap(this.props.onLogConversation({
                correspondentEntity: this.getSelectedContact(selected),
                conversationId: this.props.conversation.conversationId,
                redirect: redirect,
                prefill: prefill
              }));

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
      }, null, this);
    }
  }, {
    key: "getDetail",
    value: function getDetail() {
      var _this$props2 = this.props,
          conversation = _this$props2.conversation,
          currentLocale = _this$props2.currentLocale;

      if ((0, _messageHelper.messageIsTextMessage)(conversation)) {
        if (conversation.mmsAttachment && conversation.mmsAttachment.contentType.indexOf('image') > -1) {
          return _i18n["default"].getString('imageAttachment', currentLocale);
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
      var _this2 = this;

      var _this$props3 = this.props,
          areaCode = _this$props3.areaCode,
          brand = _this$props3.brand,
          countryCode = _this$props3.countryCode,
          currentLocale = _this$props3.currentLocale,
          _this$props3$conversa = _this$props3.conversation,
          conversationId = _this$props3$conversa.conversationId,
          unreadCounts = _this$props3$conversa.unreadCounts,
          correspondents = _this$props3$conversa.correspondents,
          correspondentMatches = _this$props3$conversa.correspondentMatches,
          creationTime = _this$props3$conversa.creationTime,
          isLogging = _this$props3$conversa.isLogging,
          conversationMatches = _this$props3$conversa.conversationMatches,
          type = _this$props3$conversa.type,
          direction = _this$props3$conversa.direction,
          voicemailAttachment = _this$props3$conversa.voicemailAttachment,
          faxAttachment = _this$props3$conversa.faxAttachment,
          parentDisableLinks = _this$props3.disableLinks,
          disableCallButton = _this$props3.disableCallButton,
          disableClickToDial = _this$props3.disableClickToDial,
          onClickToDial = _this$props3.onClickToDial,
          onClickToSms = _this$props3.onClickToSms,
          onLogConversation = _this$props3.onLogConversation,
          onViewContact = _this$props3.onViewContact,
          onCreateContact = _this$props3.onCreateContact,
          createEntityTypes = _this$props3.createEntityTypes,
          enableContactFallback = _this$props3.enableContactFallback,
          showContactDisplayPlaceholder = _this$props3.showContactDisplayPlaceholder,
          sourceIcons = _this$props3.sourceIcons,
          phoneTypeRenderer = _this$props3.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props3.phoneSourceNameRenderer,
          showGroupNumberName = _this$props3.showGroupNumberName,
          renderExtraButton = _this$props3.renderExtraButton,
          onFaxDownload = _this$props3.onFaxDownload;
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
        player = _react["default"].createElement(_VoicemailPlayer["default"], {
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
      return _react["default"].createElement("div", {
        "data-sign": msgItem,
        "data-id": conversationId,
        className: _styles["default"].root,
        onClick: this.onClickItem
      }, _react["default"].createElement("div", {
        "data-sign": "unread",
        className: (0, _classnames["default"])(_styles["default"].wrapper, unreadCounts && _styles["default"].unread),
        onClick: this.onClickWrapper
      }, _react["default"].createElement(ConversationIcon, {
        group: correspondents.length > 1,
        type: type,
        currentLocale: currentLocale,
        direction: direction
      }), _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].infoWrapper, !extraButton && _styles["default"].embellishInfoWrapper)
      }, _react["default"].createElement(_ContactDisplay["default"], {
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
        enableContactFallback: enableContactFallback,
        stopPropagation: false,
        showType: false,
        showPlaceholder: showContactDisplayPlaceholder,
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer
      }), _react["default"].createElement("div", {
        className: _styles["default"].detailsWithTime
      }, _react["default"].createElement("div", {
        "data-sign": "msgDetail",
        className: _styles["default"].details,
        title: detail
      }, detail), _react["default"].createElement("div", {
        className: _styles["default"].separatrix
      }, "|"), _react["default"].createElement("div", {
        "data-sign": "msgCreateTime",
        className: _styles["default"].creationTime
      }, this.dateTimeFormatter(creationTime)))), extraButton), _react["default"].createElement(_SlideMenu["default"], {
        extended: this.state.extended,
        onToggle: this.toggleExtended,
        extendIconClassName: _styles["default"].extendIcon,
        className: _styles["default"].slideMenu,
        minHeight: 0,
        maxHeight: slideMenuHeight
      }, _react["default"].createElement("div", {
        className: _styles["default"].playContainer,
        onClick: this.preventEventPropogation
      }, player), _react["default"].createElement(_ActionMenuList["default"], {
        className: _styles["default"].actionMenuList,
        type: type,
        currentLocale: currentLocale,
        onLog: isVoicemail || isFax || renderExtraButton ? undefined : onLogConversation && this.logConversation,
        onViewEntity: onViewContact && this.viewSelectedContact,
        onCreateEntity: onCreateContact && this.createSelectedContact,
        createEntityTypes: createEntityTypes,
        hasEntity: correspondents.length === 1 && !!correspondentMatches.length,
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
        onFaxDownload: onFaxDownload
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
    uri: _propTypes["default"].string
  }).isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  brand: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
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
  onFaxDownload: _propTypes["default"].func
};
MessageItem.defaultProps = {
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
  onFaxDownload: undefined
};
//# sourceMappingURL=index.js.map
