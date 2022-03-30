"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

require("core-js/modules/es6.object.define-properties");

require("core-js/modules/es7.object.get-own-property-descriptors");

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.symbol");

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.object.keys");

require("core-js/modules/es6.promise");

require("core-js/modules/es6.object.to-string");

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

require("core-js/modules/es6.function.name");

require("core-js/modules/es6.array.map");

require("core-js/modules/es6.array.find-index");

require("regenerator-runtime/runtime");

var _react = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _formatMessage = _interopRequireDefault(require("format-message"));

var _extensionTypes = require("@ringcentral-integration/commons/enums/extensionTypes");

var _messageDirection = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageDirection"));

var _messageTypes = _interopRequireDefault(require("@ringcentral-integration/commons/enums/messageTypes"));

var _messageHelper = require("@ringcentral-integration/commons/lib/messageHelper");

var _parseNumber = _interopRequireDefault(require("@ringcentral-integration/commons/lib/parseNumber"));

var _checkShouldHideContactUser = require("../../lib/checkShouldHideContactUser");

var _checkShouldHidePhoneNumber = require("../../lib/checkShouldHidePhoneNumber");

var _formatDuration = _interopRequireDefault(require("../../lib/formatDuration"));

var _ActionMenuList = _interopRequireDefault(require("../ActionMenuList"));

var _ContactDisplay = _interopRequireDefault(require("../ContactDisplay"));

var _SlideMenu = _interopRequireDefault(require("../SlideMenu"));

var _VoicemailPlayer = _interopRequireDefault(require("../VoicemailPlayer"));

var _ConversationIcon = require("./ConversationIcon");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

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

var MessageItem = /*#__PURE__*/function (_Component) {
  _inherits(MessageItem, _Component);

  var _super = _createSuper(MessageItem);

  function MessageItem(props) {
    var _this;

    _classCallCheck(this, MessageItem);

    _this = _super.call(this, props);
    _this._userSelection = false;
    _this.contactDisplay = void 0;
    _this._mounted = false;

    _this.toggleExtended = function () {
      _this.setState(function (preState) {
        return {
          extended: !preState.extended
        };
      });
    };

    _this.preventEventPropagating = function (e) {
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

    _this.createSelectedContact = /*#__PURE__*/function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(entityType) {
        var phoneNumber;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof _this.props.onCreateContact === 'function' && _this._mounted && !_this.state.isCreating)) {
                  _context.next = 6;
                  break;
                }

                _this.setState({
                  isCreating: true
                }); // console.log('start to create: isCreating...', this.state.isCreating);


                phoneNumber = _this.getPhoneNumber();
                _context.next = 5;
                return _this.props.onCreateContact({
                  phoneNumber: phoneNumber,
                  name: _this.props.enableContactFallback ? _this.getFallbackContactName() : '',
                  entityType: entityType
                });

              case 5:
                if (_this._mounted) {
                  _this.setState({
                    isCreating: false
                  }); // console.log('created: isCreating...', this.state.isCreating);

                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();

    _this.logConversation = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
      var _ref3,
          _ref3$redirect,
          redirect,
          selected,
          _ref3$prefill,
          prefill,
          _args2 = arguments;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _ref3 = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : {}, _ref3$redirect = _ref3.redirect, redirect = _ref3$redirect === void 0 ? true : _ref3$redirect, selected = _ref3.selected, _ref3$prefill = _ref3.prefill, prefill = _ref3$prefill === void 0 ? true : _ref3$prefill;

              if (!(typeof _this.props.onLogConversation === 'function' && _this._mounted && !_this.state.isLogging)) {
                _context2.next = 6;
                break;
              }

              _this.setState({
                isLogging: true
              });

              _context2.next = 5;
              return _this.props.onLogConversation({
                correspondentEntity: _this.getSelectedContact(selected),
                conversationId: _this.props.conversation.conversationId,
                redirect: redirect,
                prefill: prefill
              });

            case 5:
              if (_this._mounted) {
                _this.setState({
                  isLogging: false
                });
              }

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

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
        var pageCount = +conversation.faxPageCount;
        var nameKey = pageCount === 1 ? 'page' : 'pages';

        if (conversation.direction === _messageDirection["default"].inbound) {
          return "".concat(_i18n["default"].getString('faxReceived', currentLocale), "(").concat(pageCount, " ").concat(_i18n["default"].getString(nameKey, currentLocale), ")");
        }

        return "".concat(_i18n["default"].getString('faxSent', currentLocale), "(").concat(pageCount, " ").concat(_i18n["default"].getString(nameKey, currentLocale), ")");
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
          showChooseEntityModal = _this$props4.showChooseEntityModal,
          renderContactList = _this$props4.renderContactList,
          dropdownClassName = _this$props4.dropdownClassName,
          enableCDC = _this$props4.enableCDC;
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
      /**
       * TODO:
       * * Group message is supported for internal paging:
       * * What is the requirement when a hidden contact is part of a group conversation?
       * * Is it possible to ignore this edge case initially as group conversations are rare, especially when most people use glip now for internal conversations?
       */

      var shouldHideNumber = enableCDC && (0, _checkShouldHidePhoneNumber.checkShouldHidePhoneNumber)(phoneNumber, correspondentMatches);
      var isContactMatchesHidden = enableCDC && (0, _checkShouldHideContactUser.checkShouldHideContactUser)(correspondentMatches);
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
      }, /*#__PURE__*/_react["default"].createElement(_ConversationIcon.ConversationIcon, {
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
        unread: !!unreadCounts,
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
        phoneNumber: shouldHideNumber ? null : phoneNumber,
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
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        dropdownRenderFunction: renderContactList,
        dropdownClassName: dropdownClassName
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
        onClick: this.preventEventPropagating
      }, player), /*#__PURE__*/_react["default"].createElement(_ActionMenuList["default"], {
        shouldHideEntityButton: isContactMatchesHidden,
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

MessageItem.defaultProps = {
  currentSiteCode: '',
  isMultipleSiteEnabled: false,
  disableClickToDial: false,
  disableLinks: false,
  disableCallButton: false,
  autoLog: false,
  showContactDisplayPlaceholder: true,
  contactPlaceholder: '',
  showGroupNumberName: false,
  deleteMessage: function deleteMessage() {},
  internalSmsPermission: true,
  outboundSmsPermission: true,
  showChooseEntityModal: true,
  shouldLogSelectRecord: false,
  dropdownClassName: null,
  enableCDC: false
};
var _default = MessageItem;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
