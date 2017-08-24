'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _ContactDisplay = require('../ContactDisplay');

var _ContactDisplay2 = _interopRequireDefault(_ContactDisplay);

var _ActionMenu = require('../ActionMenu');

var _ActionMenu2 = _interopRequireDefault(_ActionMenu);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConversationIcon(_ref) {
  var group = _ref.group,
      conversationTitle = _ref.conversationTitle,
      groupConversationTitle = _ref.groupConversationTitle;

  var title = group ? groupConversationTitle : conversationTitle;
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.conversationIcon },
    _react2.default.createElement('span', {
      className: (0, _classnames2.default)(group ? _DynamicsFont2.default.groupConversation : _DynamicsFont2.default.composeText),
      title: title
    })
  );
}
ConversationIcon.propTypes = {
  group: _propTypes2.default.bool,
  conversationTitle: _propTypes2.default.string,
  groupConversationTitle: _propTypes2.default.string
};
ConversationIcon.defaultProps = {
  group: false,
  conversationTitle: undefined,
  groupConversationTitle: undefined
};

var MessageItem = function (_Component) {
  (0, _inherits3.default)(MessageItem, _Component);

  function MessageItem(props) {
    (0, _classCallCheck3.default)(this, MessageItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (MessageItem.__proto__ || (0, _getPrototypeOf2.default)(MessageItem)).call(this, props));

    _this.onSelectContact = function (value, idx) {
      var selected = parseInt(idx, 10) - 1;
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
          phoneNumber: _this.getPhoneNumber(),
          contact: _this.getSelectedContact()
        });
      }
    };

    _this.createSelectedContact = _this.createSelectedContact.bind(_this);
    _this.logConversation = _this.logConversation.bind(_this);

    _this.clickToDial = function () {
      if (_this.props.onClickToDial) {
        _this.props.onClickToDial(_this.getPhoneNumber());
      }
    };

    _this.showConversationDetail = function (e) {
      // if (e.captureClick === false) {
      //   delete e.captureClick;
      //   return;
      // }
      if (_this.contactDisplay && _this.contactDisplay.contains(e.target) || _this.actionMenu.contains(e.target)) {
        return;
      }
      _this.props.showConversationDetail(_this.props.conversation.conversationId);
    };

    _this.state = {
      selected: _this.getInitialContactIndex(),
      isLogging: false,
      isCreating: false
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
      return -1;
    }
  }, {
    key: 'getPhoneNumber',
    value: function getPhoneNumber() {
      var correspondents = this.props.conversation.correspondents;
      return correspondents.length === 1 && (correspondents[0].phoneNumber || correspondents[0].extensionNumber) || undefined;
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
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          areaCode = _props.areaCode,
          countryCode = _props.countryCode,
          currentLocale = _props.currentLocale,
          _props$conversation = _props.conversation,
          unreadCounts = _props$conversation.unreadCounts,
          correspondents = _props$conversation.correspondents,
          correspondentMatches = _props$conversation.correspondentMatches,
          creationTime = _props$conversation.creationTime,
          subject = _props$conversation.subject,
          isLogging = _props$conversation.isLogging,
          conversationMatches = _props$conversation.conversationMatches,
          disableLinks = _props.disableLinks,
          disableClickToDial = _props.disableClickToDial,
          onClickToDial = _props.onClickToDial,
          onLogConversation = _props.onLogConversation,
          onViewContact = _props.onViewContact,
          onCreateContact = _props.onCreateContact,
          dateTimeFormatter = _props.dateTimeFormatter,
          enableContactFallback = _props.enableContactFallback;


      var groupNumbers = this.getGroupPhoneNumbers();
      var phoneNumber = this.getPhoneNumber();
      var fallbackName = this.getFallbackContactName();

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.root, unreadCounts && _styles2.default.unread),
          onClick: this.showConversationDetail
        },
        _react2.default.createElement(ConversationIcon, {
          group: correspondents.length > 1,
          conversationTitle: _i18n2.default.getString('conversation', currentLocale),
          groupConversationTitle: _i18n2.default.getString('groupConversation', currentLocale)
        }),
        _react2.default.createElement(_ContactDisplay2.default, {
          reference: function reference(ref) {
            _this2.contactDisplay = ref;
          },
          className: (0, _classnames2.default)(_styles2.default.contactDisplay, unreadCounts && _styles2.default.unread),
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
          currentLocale: currentLocale,
          enableContactFallback: enableContactFallback,
          stopPropagation: false
        }),
        _react2.default.createElement(
          'div',
          { className: _styles2.default.details },
          dateTimeFormatter({ utcTimestamp: creationTime }),
          ' | ',
          subject
        ),
        _react2.default.createElement(_ActionMenu2.default, {
          reference: function reference(ref) {
            _this2.actionMenu = ref;
          },
          currentLocale: currentLocale,
          onLog: onLogConversation && this.logConversation,
          onViewEntity: onViewContact && this.viewSelectedContact,
          onCreateEntity: onCreateContact && this.createSelectedContact,
          hasEntity: correspondents.length === 1 && !!correspondentMatches.length,
          onClickToDial: onClickToDial && this.clickToDial,
          phoneNumber: phoneNumber,
          disableLinks: disableLinks,
          disableClickToDial: disableClickToDial,
          isLogging: isLogging || this.state.isLogging,
          isLogged: conversationMatches.length > 0,
          isCreating: this.state.isCreating,
          addLogTitle: _i18n2.default.getString('addLog', currentLocale),
          editLogTitle: _i18n2.default.getString('editLog', currentLocale),
          callTitle: _i18n2.default.getString('call', currentLocale),
          createEntityTitle: _i18n2.default.getString('addEntity', currentLocale),
          viewEntityTitle: _i18n2.default.getString('viewDetails', currentLocale),
          stopPropagation: false
        })
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
    }))
  }).isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  onLogConversation: _propTypes2.default.func,
  onViewContact: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  onClickToDial: _propTypes2.default.func,
  disableLinks: _propTypes2.default.bool,
  disableClickToDial: _propTypes2.default.bool,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  showConversationDetail: _propTypes2.default.func.isRequired,
  autoLog: _propTypes2.default.bool,
  enableContactFallback: _propTypes2.default.bool
};

MessageItem.defaultProps = {
  onLogConversation: undefined,
  onClickToDial: undefined,
  onViewContact: undefined,
  onCreateContact: undefined,
  disableClickToDial: false,
  disableLinks: false,
  autoLog: false,
  enableContactFallback: undefined
};
//# sourceMappingURL=index.js.map
