'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _Spinner = require('../Spinner');

var _Spinner2 = _interopRequireDefault(_Spinner);

var _ConversationMessageList = require('../ConversationMessageList');

var _ConversationMessageList2 = _interopRequireDefault(_ConversationMessageList);

var _LogButton = require('../LogButton');

var _LogButton2 = _interopRequireDefault(_LogButton);

var _ContactDisplay = require('../ContactDisplay');

var _ContactDisplay2 = _interopRequireDefault(_ContactDisplay);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConversationPanel = function (_Component) {
  (0, _inherits3.default)(ConversationPanel, _Component);

  function ConversationPanel(props) {
    (0, _classCallCheck3.default)(this, ConversationPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ConversationPanel.__proto__ || (0, _getPrototypeOf2.default)(ConversationPanel)).call(this, props));

    _this.onSelectContact = function (value, idx) {
      var selected = _this.showContactDisplayPlaceholder ? parseInt(idx, 10) - 1 : parseInt(idx, 10);
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

    _this.logConversation = _this.logConversation.bind(_this);

    _this.state = {
      textValue: '',
      selected: _this.getInitialContactIndex(),
      isLogging: false
    };
    _this._userSelection = false;
    _this.onTextChange = function (e) {
      _this.setState({
        textValue: e.currentTarget.value
      });
    };
    _this.handleSubmit = function (e) {
      _this.props.replyToReceivers(_this.state.textValue);
      _this.setState({
        textValue: ''
      });
      e.preventDefault();
    };
    _this.onTextAreaKeyDown = function (e) {
      if (e.key === 'Enter') {
        _this.props.replyToReceivers(_this.state.textValue);
        _this.setState({
          textValue: ''
        });
        e.preventDefault();
      }
    };
    return _this;
  }

  (0, _createClass3.default)(ConversationPanel, [{
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
    key: 'logConversation',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2) {
        var _ref2$redirect = _ref2.redirect,
            redirect = _ref2$redirect === undefined ? true : _ref2$redirect,
            selected = _ref2.selected,
            _ref2$prefill = _ref2.prefill,
            prefill = _ref2$prefill === undefined ? true : _ref2$prefill;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(typeof this.props.onLogConversation === 'function' && this._mounted && !this.state.isLogging)) {
                  _context.next = 5;
                  break;
                }

                this.setState({
                  isLogging: true
                });
                _context.next = 4;
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
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function logConversation(_x3) {
        return _ref.apply(this, arguments);
      }

      return logConversation;
    }()
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var conversationBody = null;
      var loading = this.props.showSpinner;
      var recipients = this.props.recipients;
      if (loading) {
        conversationBody = _react2.default.createElement(
          'div',
          { className: _styles2.default.spinerContainer },
          _react2.default.createElement(_Spinner2.default, null)
        );
      } else {
        conversationBody = _react2.default.createElement(_ConversationMessageList2.default, {
          messages: this.props.messages,
          className: _styles2.default.conversationBody,
          dateTimeFormatter: this.props.dateTimeFormatter,
          showFrom: recipients && recipients.length > 1
        });
      }
      var _props$conversation = this.props.conversation,
          isLogging = _props$conversation.isLogging,
          conversationMatches = _props$conversation.conversationMatches,
          correspondentMatches = _props$conversation.correspondentMatches;

      var groupNumbers = this.getGroupPhoneNumbers();
      var phoneNumber = this.getPhoneNumber();
      var fallbackName = this.getFallbackContactName();

      var logButton = this.props.onLogConversation ? _react2.default.createElement(_LogButton2.default, {
        className: _styles2.default.logButton,
        onLog: this.logConversation,
        disableLinks: this.props.disableLinks,
        isLogged: conversationMatches.length > 0,
        isLogging: isLogging || this.state.isLogging,
        currentLocale: this.props.currentLocale
      }) : null;
      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.header },
          _react2.default.createElement(_ContactDisplay2.default, {
            brand: this.props.brand,
            className: _styles2.default.contactDisplay,
            selectClassName: _styles2.default.contactDisplaySelect,
            contactMatches: correspondentMatches,
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
            showGroupNumberName: this.props.showGroupNumberName
          }),
          _react2.default.createElement(
            'a',
            {
              onClick: function onClick() {
                return _this2.props.goBack();
              },
              className: _styles2.default.backButton
            },
            _react2.default.createElement('span', { className: _DynamicsFont2.default.arrow })
          ),
          logButton
        ),
        conversationBody,
        _react2.default.createElement(
          'div',
          { className: _styles2.default.messageForm },
          _react2.default.createElement(
            'form',
            { onSubmit: this.handleSubmit },
            _react2.default.createElement(
              'div',
              { className: _styles2.default.textField },
              _react2.default.createElement('textarea', {
                placeholder: _i18n2.default.getString('typeMessage', this.props.currentLocale),
                value: this.state.textValue,
                maxLength: '1000',
                onChange: this.onTextChange,
                onKeyPressCapture: this.onTextAreaKeyDown
              })
            ),
            _react2.default.createElement(
              'div',
              { className: _styles2.default.submitField },
              _react2.default.createElement('input', {
                type: 'submit',
                value: _i18n2.default.getString('send', this.props.currentLocale),
                className: _styles2.default.submitButton,
                disabled: this.props.disableLinks || this.props.sendButtonDisabled || loading || this.state.textValue.length === 0
              })
            )
          )
        )
      );
    }
  }]);
  return ConversationPanel;
}(_react.Component);

ConversationPanel.propTypes = {
  brand: _propTypes2.default.string.isRequired,
  replyToReceivers: _propTypes2.default.func.isRequired,
  messages: _ConversationMessageList2.default.propTypes.messages,
  recipients: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    phoneNumber: _propTypes2.default.string,
    extensionNumber: _propTypes2.default.string,
    name: _propTypes2.default.string
  })).isRequired,
  sendButtonDisabled: _propTypes2.default.bool.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  showSpinner: _propTypes2.default.bool.isRequired,
  disableLinks: _propTypes2.default.bool,
  conversation: _propTypes2.default.object.isRequired,
  onLogConversation: _propTypes2.default.func,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  autoLog: _propTypes2.default.bool,
  enableContactFallback: _propTypes2.default.bool,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  goBack: _propTypes2.default.func.isRequired,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  showGroupNumberName: _propTypes2.default.bool
};
ConversationPanel.defaultProps = {
  disableLinks: false,
  onLogConversation: undefined,
  autoLog: false,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  showGroupNumberName: false
};

exports.default = ConversationPanel;
//# sourceMappingURL=index.js.map
