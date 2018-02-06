'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _messageTypes = require('ringcentral-integration/enums/messageTypes');

var _messageTypes2 = _interopRequireDefault(_messageTypes);

var _messageHelper = require('ringcentral-integration/lib/messageHelper');

var _formatDuration = require('../../lib/formatDuration');

var _formatDuration2 = _interopRequireDefault(_formatDuration);

var _ContactDisplay = require('../ContactDisplay');

var _ContactDisplay2 = _interopRequireDefault(_ContactDisplay);

var _ActionMenuList = require('../ActionMenuList');

var _ActionMenuList2 = _interopRequireDefault(_ActionMenuList);

var _VoicemailPlayer = require('../VoicemailPlayer');

var _VoicemailPlayer2 = _interopRequireDefault(_VoicemailPlayer);

var _SlideMenu = require('../SlideMenu');

var _SlideMenu2 = _interopRequireDefault(_SlideMenu);

var _VoicemailIcon = require('../../assets/images/VoicemailIcon.svg');

var _VoicemailIcon2 = _interopRequireDefault(_VoicemailIcon);

var _ComposeText = require('../../assets/images/ComposeText.svg');

var _ComposeText2 = _interopRequireDefault(_ComposeText);

var _GroupConversation = require('../../assets/images/GroupConversation.svg');

var _GroupConversation2 = _interopRequireDefault(_GroupConversation);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConversationIcon(_ref) {
  var group = _ref.group,
      type = _ref.type,
      currentLocale = _ref.currentLocale;

  var title = void 0;
  var icon = void 0;
  switch (type) {
    case _messageTypes2.default.voiceMail:
      title = _i18n2.default.getString(_messageTypes2.default.voiceMail, currentLocale);
      icon = _react2.default.createElement(_VoicemailIcon2.default, { width: 23, className: _styles2.default.icon });
      break;
    default:
      title = group ? _i18n2.default.getString('groupConversation', currentLocale) : _i18n2.default.getString('conversation', currentLocale);
      icon = group ? _react2.default.createElement(_GroupConversation2.default, { width: 19, className: _styles2.default.icon }) : _react2.default.createElement(_ComposeText2.default, { width: 18, className: _styles2.default.icon });
  }
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.conversationIcon },
    _react2.default.createElement(
      'span',
      { title: title },
      icon
    )
  );
}
ConversationIcon.propTypes = {
  group: _propTypes2.default.bool,
  type: _propTypes2.default.string,
  currentLocale: _propTypes2.default.string
};
ConversationIcon.defaultProps = {
  group: false,
  type: undefined,
  currentLocale: undefined
};

var MessageItem = function (_Component) {
  (0, _inherits3.default)(MessageItem, _Component);

  function MessageItem(props) {
    (0, _classCallCheck3.default)(this, MessageItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MessageItem.__proto__ || (0, _getPrototypeOf2.default)(MessageItem)).call(this, props));

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
      if (_this.props.conversation.conversationMatches.length > 0 && _this.props.autoLog) {
        _this.logConversation({ redirect: false, selected: selected, prefill: false });
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
          contact: _this.getSelectedContact()
        });
      }
    };

    _this.createSelectedContact = _this.createSelectedContact.bind(_this);
    _this.logConversation = _this.logConversation.bind(_this);

    _this.clickToDial = function () {
      if (_this.props.onClickToDial) {
        var contact = _this.getSelectedContact() || {};
        var phoneNumber = _this.getPhoneNumber();

        if (phoneNumber) {
          _this.props.onClickToDial((0, _extends3.default)({}, contact, {
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
          _this.props.onClickToSms((0, _extends3.default)({}, contact, {
            phoneNumber: phoneNumber
          }));
        }
      }
    };

    _this.onClickItem = function (e) {
      if (_this.contactDisplay && _this.contactDisplay.contains(e.target)) {
        return;
      }
      if ((0, _messageHelper.messageIsTextMessage)(_this.props.conversation)) {
        _this.props.showConversationDetail(_this.props.conversation.conversationId);
        return;
      }

      _this.toggleExtended();
    };

    _this.onPlayVoicemail = function () {
      if (_this.props.conversation.unreadCounts > 0) {
        _this.props.readVoicemail(_this.props.conversation.conversationId);
      }
    };

    _this.onMarkVoicemail = function () {
      if (_this.props.conversation.unreadCounts === 0) {
        _this.props.markVoicemail(_this.props.conversation.conversationId);
      }
    };

    _this.onUnmarkVoicemail = function () {
      if (_this.props.conversation.unreadCounts > 0) {
        _this.props.unmarkVoicemail(_this.props.conversation.conversationId);
      }
    };

    _this.onDeleteMessage = function () {
      _this.props.deleteMessage(_this.props.conversation.conversationId);
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

  (0, _createClass3.default)(MessageItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!this._userSelection && (nextProps.conversation.conversationMatches !== this.props.conversation.conversationMatches || nextProps.conversation.correspondentMatches !== this.props.conversation.correspondentMatches)) {
        this.setState({
          selected: this.getInitialContactIndex(nextProps)
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: 'getInitialContactIndex',
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
    key: 'getPhoneNumber',
    value: function getPhoneNumber() {
      var correspondents = this.props.conversation.correspondents;

      return correspondents.length === 1 && correspondents[0] && (correspondents[0].phoneNumber || correspondents[0].extensionNumber) || undefined;
    }
  }, {
    key: 'getGroupPhoneNumbers',
    value: function getGroupPhoneNumbers() {
      var correspondents = this.props.conversation.correspondents;

      var groupNumbers = correspondents.length > 1 ? correspondents.map(function (correspondent) {
        return correspondent.extensionNumber || correspondent.phoneNumber || undefined;
      }) : null;
      return groupNumbers;
    }
  }, {
    key: 'getFallbackContactName',
    value: function getFallbackContactName() {
      var correspondents = this.props.conversation.correspondents;

      return correspondents.length === 1 && correspondents[0].name || undefined;
    }
  }, {
    key: 'createSelectedContact',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(entityType) {
        var phoneNumber;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof this.props.onCreateContact === 'function' && this._mounted && !this.state.isCreating)) {
                  _context.next = 6;
                  break;
                }

                this.setState({
                  isCreating: true
                });
                // console.log('start to create: isCreating...', this.state.isCreating);
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
                  });
                  // console.log('created: isCreating...', this.state.isCreating);
                }

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function createSelectedContact(_x3) {
        return _ref2.apply(this, arguments);
      }

      return createSelectedContact;
    }()
  }, {
    key: 'logConversation',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4) {
        var _ref4$redirect = _ref4.redirect,
            redirect = _ref4$redirect === undefined ? true : _ref4$redirect,
            selected = _ref4.selected,
            _ref4$prefill = _ref4.prefill,
            prefill = _ref4$prefill === undefined ? true : _ref4$prefill;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(typeof this.props.onLogConversation === 'function' && this._mounted && !this.state.isLogging)) {
                  _context2.next = 5;
                  break;
                }

                this.setState({
                  isLogging: true
                });
                _context2.next = 4;
                return this.props.onLogConversation({
                  correspondentEntity: this.getSelectedContact(selected),
                  conversationId: this.props.conversation.conversationId,
                  redirect: redirect,
                  prefill: prefill
                });

              case 4:
                if (this._mounted) {
                  this.setState({
                    isLogging: false
                  });
                }

              case 5:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function logConversation(_x4) {
        return _ref3.apply(this, arguments);
      }

      return logConversation;
    }()
  }, {
    key: 'getDetail',
    value: function getDetail() {
      var _props = this.props,
          conversation = _props.conversation,
          currentLocale = _props.currentLocale;

      if ((0, _messageHelper.messageIsTextMessage)(conversation)) {
        return conversation.subject;
      }
      if (conversation.voicemailAttachment) {
        var duration = conversation.voicemailAttachment.duration;

        return _i18n2.default.getString('voiceMessage', currentLocale) + ' (' + (0, _formatDuration2.default)(duration) + ')';
      }
      return '';
    }
  }, {
    key: 'dateTimeFormatter',
    value: function dateTimeFormatter(creationTime) {
      try {
        return this.props.dateTimeFormatter({ utcTimestamp: creationTime });
      } catch (e) {
        console.error('Format date time error', creationTime);
        return creationTime;
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          areaCode = _props2.areaCode,
          brand = _props2.brand,
          countryCode = _props2.countryCode,
          currentLocale = _props2.currentLocale,
          _props2$conversation = _props2.conversation,
          unreadCounts = _props2$conversation.unreadCounts,
          correspondents = _props2$conversation.correspondents,
          correspondentMatches = _props2$conversation.correspondentMatches,
          creationTime = _props2$conversation.creationTime,
          isLogging = _props2$conversation.isLogging,
          conversationMatches = _props2$conversation.conversationMatches,
          type = _props2$conversation.type,
          voicemailAttachment = _props2$conversation.voicemailAttachment,
          parentDisableLinks = _props2.disableLinks,
          disableClickToDial = _props2.disableClickToDial,
          onClickToDial = _props2.onClickToDial,
          onClickToSms = _props2.onClickToSms,
          onLogConversation = _props2.onLogConversation,
          onViewContact = _props2.onViewContact,
          onCreateContact = _props2.onCreateContact,
          enableContactFallback = _props2.enableContactFallback,
          showContactDisplayPlaceholder = _props2.showContactDisplayPlaceholder,
          sourceIcons = _props2.sourceIcons,
          showGroupNumberName = _props2.showGroupNumberName;

      var disableLinks = parentDisableLinks;
      var isVoicemail = type === _messageTypes2.default.voiceMail;
      if (isVoicemail && !voicemailAttachment) {
        disableLinks = true;
      }
      var groupNumbers = this.getGroupPhoneNumbers();
      var phoneNumber = this.getPhoneNumber();
      var fallbackName = this.getFallbackContactName();
      var detail = this.getDetail();
      var player = void 0;
      var slideMenuHeight = 60;
      if (isVoicemail) {
        player = _react2.default.createElement(_VoicemailPlayer2.default, {
          className: _styles2.default.player,
          uri: voicemailAttachment.uri,
          duration: voicemailAttachment.duration,
          onPlay: this.onPlayVoicemail,
          disabled: disableLinks,
          currentLocale: currentLocale
        });
        slideMenuHeight = 88;
      }

      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root, onClick: this.onClickItem },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(_styles2.default.wrapper, unreadCounts && _styles2.default.unread)
          },
          _react2.default.createElement(ConversationIcon, {
            group: correspondents.length > 1,
            type: type,
            currentLocale: currentLocale
          }),
          _react2.default.createElement(_ContactDisplay2.default, {
            reference: function reference(ref) {
              _this2.contactDisplay = ref;
            },
            className: (0, _classnames2.default)(_styles2.default.contactDisplay, unreadCounts && _styles2.default.unread),
            selectClassName: _styles2.default.dropdownSelect,
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
            sourceIcons: sourceIcons
          }),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.details },
            detail
          ),
          _react2.default.createElement(
            'div',
            { className: _styles2.default.creationTime },
            this.dateTimeFormatter(creationTime)
          )
        ),
        _react2.default.createElement(
          _SlideMenu2.default,
          {
            extended: this.state.extended,
            onToggle: this.toggleExtended,
            extendIconClassName: _styles2.default.extendIcon,
            className: _styles2.default.slideMenu,
            minHeight: 0,
            maxHeight: slideMenuHeight
          },
          _react2.default.createElement(
            'div',
            { className: _styles2.default.playContainer, onClick: this.preventEventPropogation },
            player
          ),
          _react2.default.createElement(_ActionMenuList2.default, {
            className: _styles2.default.actionMenuList,
            currentLocale: currentLocale,
            onLog: isVoicemail ? undefined : onLogConversation && this.logConversation,
            onViewEntity: onViewContact && this.viewSelectedContact,
            onCreateEntity: onCreateContact && this.createSelectedContact,
            hasEntity: correspondents.length === 1 && !!correspondentMatches.length,
            onClickToDial: onClickToDial && this.clickToDial,
            onClickToSms: isVoicemail ? onClickToSms && this.onClickToSms : undefined,
            phoneNumber: phoneNumber,
            disableLinks: disableLinks,
            disableClickToDial: disableClickToDial,
            isLogging: isLogging || this.state.isLogging,
            isLogged: conversationMatches.length > 0,
            isCreating: this.state.isCreating,
            addLogTitle: _i18n2.default.getString('addLog', currentLocale),
            editLogTitle: _i18n2.default.getString('editLog', currentLocale),
            callTitle: _i18n2.default.getString('call', currentLocale),
            textTitle: _i18n2.default.getString('text', currentLocale),
            createEntityTitle: _i18n2.default.getString('addEntity', currentLocale),
            viewEntityTitle: _i18n2.default.getString('viewDetails', currentLocale),
            stopPropagation: false,
            onDelete: isVoicemail ? this.onDeleteMessage : undefined,
            deleteTitle: _i18n2.default.getString('delete', currentLocale),
            marked: unreadCounts > 0,
            onMark: isVoicemail ? this.onMarkVoicemail : undefined,
            onUnmark: isVoicemail ? this.onUnmarkVoicemail : undefined,
            markTitle: _i18n2.default.getString('mark', currentLocale),
            unmarkTitle: _i18n2.default.getString('unmark', currentLocale)
          })
        )
      );
    }
  }]);
  return MessageItem;
}(_react.Component);

exports.default = MessageItem;


MessageItem.propTypes = {
  conversation: _propTypes2.default.shape({
    conversationId: _propTypes2.default.string.isRequired,
    isLogging: _propTypes2.default.bool,
    correspondents: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      name: _propTypes2.default.string,
      phoneNumber: _propTypes2.default.string,
      extensionNumber: _propTypes2.default.string
    })),
    correspondentMatches: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      name: _propTypes2.default.string,
      entityType: _propTypes2.default.string
    })),
    conversationMatches: _propTypes2.default.arrayOf(_propTypes2.default.shape({
      id: _propTypes2.default.string
    })),
    unreadCounts: _propTypes2.default.number.isRequired,
    type: _propTypes2.default.string.isRequired
  }).isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  brand: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  onLogConversation: _propTypes2.default.func,
  onViewContact: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  onClickToDial: _propTypes2.default.func,
  onClickToSms: _propTypes2.default.func,
  disableLinks: _propTypes2.default.bool,
  disableClickToDial: _propTypes2.default.bool,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  showConversationDetail: _propTypes2.default.func.isRequired,
  readVoicemail: _propTypes2.default.func.isRequired,
  markVoicemail: _propTypes2.default.func.isRequired,
  unmarkVoicemail: _propTypes2.default.func.isRequired,
  autoLog: _propTypes2.default.bool,
  enableContactFallback: _propTypes2.default.bool,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  showGroupNumberName: _propTypes2.default.bool,
  deleteMessage: _propTypes2.default.func
};

MessageItem.defaultProps = {
  onLogConversation: undefined,
  onClickToDial: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  disableClickToDial: false,
  onClickToSms: undefined,
  disableLinks: false,
  autoLog: false,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  showGroupNumberName: false,
  deleteMessage: function deleteMessage() {}
};
//# sourceMappingURL=index.js.map
