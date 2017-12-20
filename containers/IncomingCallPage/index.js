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

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _formatNumber = require('ringcentral-integration/lib/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _callDirections = require('ringcentral-integration/enums/callDirections');

var _callDirections2 = _interopRequireDefault(_callDirections);

var _IncomingCallPanel = require('../../components/IncomingCallPanel');

var _IncomingCallPanel2 = _interopRequireDefault(_IncomingCallPanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var IncomingCallPage = function (_Component) {
  (0, _inherits3.default)(IncomingCallPage, _Component);

  function IncomingCallPage(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, IncomingCallPage);

    var _this = (0, _possibleConstructorReturn3.default)(this, (IncomingCallPage.__proto__ || (0, _getPrototypeOf2.default)(IncomingCallPage)).call(this, props));

    _this.answer = function () {
      return _this.props.answer(_this.props.session.id);
    };

    _this.reject = function () {
      return _this.props.reject(_this.props.session.id);
    };

    _this.toVoiceMail = function () {
      return _this.props.toVoiceMail(_this.props.session.id);
    };

    _this.replyWithMessage = function (message) {
      return _this.props.replyWithMessage(_this.props.session.id, message);
    };

    _this.toggleMinimized = function () {
      return _this.props.toggleMinimized(_this.props.session.id);
    };

    _this.answerAndEnd = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.props.hangup(_this.props.activeSessionId);
              _context.next = 3;
              return _this.props.answer(_this.props.session.id);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));
    _this.answerAndHold = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _this.props.onHold(_this.props.activeSessionId);

            case 2:
              _context2.next = 4;
              return _this.props.answer(_this.props.session.id);

            case 4:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2);
    }));

    _this.onForward = function (forwardNumber) {
      return _this.props.onForward(_this.props.session.id, forwardNumber);
    };

    _this.state = {
      selectedMatcherIndex: 0,
      avatarUrl: null,
      hasOtherActiveCall: false
    };

    _this.onSelectMatcherName = function (option) {
      var nameMatches = _this.props.nameMatches || [];
      var selectedMatcherIndex = nameMatches.findIndex(function (match) {
        return match.id === option.id;
      });
      if (selectedMatcherIndex < 0) {
        selectedMatcherIndex = 0;
      }
      _this.setState({
        selectedMatcherIndex: selectedMatcherIndex,
        avatarUrl: null
      });
      var contact = nameMatches[selectedMatcherIndex];
      if (contact) {
        _this.props.updateSessionMatchedContact(_this.props.session.id, contact);
        _this.props.getAvatarUrl(contact).then(function (avatarUrl) {
          _this.setState({ avatarUrl: avatarUrl });
        });
      }
    };
    return _this;
  }

  (0, _createClass3.default)(IncomingCallPage, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      this._updateAvatarAndMatchIndex(this.props);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.session.id !== nextProps.session.id) {
        this._updateAvatarAndMatchIndex(nextProps);
        this.setState({
          hasOtherActiveCall: !!nextProps.activeSessionId
        });
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
    }
  }, {
    key: '_updateAvatarAndMatchIndex',
    value: function _updateAvatarAndMatchIndex(props) {
      var _this3 = this;

      var selectedMatcherIndex = 0;
      var contact = props.session.contactMatch;
      if (!contact) {
        contact = props.nameMatches && props.nameMatches[0];
      } else {
        selectedMatcherIndex = props.nameMatches.findIndex(function (match) {
          return match.id === contact.id;
        });
      }
      this.setState({
        selectedMatcherIndex: selectedMatcherIndex,
        avatarUrl: null
      });
      if (contact) {
        props.getAvatarUrl(contact).then(function (avatarUrl) {
          if (!_this3._mounted) {
            return;
          }
          _this3.setState({ avatarUrl: avatarUrl });
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var session = this.props.session;

      var active = !!session.id;
      if (!active) {
        return null;
      }
      if (session.minimized) {
        return null;
      }
      var phoneNumber = session.direction === _callDirections2.default.outbound ? session.to : session.from;
      var fallbackUserName = void 0;
      if (session.direction === _callDirections2.default.inbound && session.from === 'anonymous') {
        fallbackUserName = _i18n2.default.getString('anonymous', this.props.currentLocale);
      }
      if (!fallbackUserName) {
        fallbackUserName = _i18n2.default.getString('unknown', this.props.currentLocale);
      }
      return _react2.default.createElement(
        _IncomingCallPanel2.default,
        {
          currentLocale: this.props.currentLocale,
          nameMatches: this.props.nameMatches,
          fallBackName: fallbackUserName,
          phoneNumber: phoneNumber,
          answer: this.answer,
          reject: this.reject,
          replyWithMessage: this.replyWithMessage,
          toVoiceMail: this.toVoiceMail,
          formatPhone: this.props.formatPhone,
          areaCode: this.props.areaCode,
          countryCode: this.props.countryCode,
          selectedMatcherIndex: this.state.selectedMatcherIndex,
          onSelectMatcherName: this.onSelectMatcherName,
          avatarUrl: this.state.avatarUrl,
          onBackButtonClick: this.toggleMinimized,
          forwardingNumbers: this.props.forwardingNumbers,
          onForward: this.onForward,
          brand: this.props.brand,
          showContactDisplayPlaceholder: this.props.showContactDisplayPlaceholder,
          hasOtherActiveCall: this.state.hasOtherActiveCall,
          answerAndEnd: this.answerAndEnd,
          answerAndHold: this.answerAndHold,
          sessionId: this.props.session.id,
          sourceIcons: this.props.sourceIcons,
          searchContact: this.props.searchContact,
          searchContactList: this.props.searchContactList,
          phoneTypeRenderer: this.props.phoneTypeRenderer
        },
        this.props.children
      );
    }
  }]);
  return IncomingCallPage;
}(_react.Component);

IncomingCallPage.propTypes = {
  session: _propTypes2.default.shape({
    id: _propTypes2.default.string,
    direction: _propTypes2.default.string,
    startTime: _propTypes2.default.number,
    isOnMute: _propTypes2.default.bool,
    isOnHold: _propTypes2.default.bool,
    isOnRecord: _propTypes2.default.bool,
    to: _propTypes2.default.string,
    from: _propTypes2.default.string,
    contactMatch: _propTypes2.default.object
  }).isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  toggleMinimized: _propTypes2.default.func.isRequired,
  answer: _propTypes2.default.func.isRequired,
  reject: _propTypes2.default.func.isRequired,
  onForward: _propTypes2.default.func.isRequired,
  toVoiceMail: _propTypes2.default.func.isRequired,
  replyWithMessage: _propTypes2.default.func.isRequired,
  formatPhone: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node,
  nameMatches: _propTypes2.default.array.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  getAvatarUrl: _propTypes2.default.func.isRequired,
  forwardingNumbers: _propTypes2.default.array.isRequired,
  updateSessionMatchedContact: _propTypes2.default.func.isRequired,
  showContactDisplayPlaceholder: _propTypes2.default.bool.isRequired,
  brand: _propTypes2.default.string.isRequired,
  activeSessionId: _propTypes2.default.string,
  sourceIcons: _propTypes2.default.object,
  hangup: _propTypes2.default.func.isRequired,
  onHold: _propTypes2.default.func.isRequired,
  searchContactList: _propTypes2.default.array.isRequired,
  searchContact: _propTypes2.default.func.isRequired,
  phoneTypeRenderer: _propTypes2.default.func
};

IncomingCallPage.defaultProps = {
  children: undefined,
  activeSessionId: null,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined
};

function mapToProps(_, _ref3) {
  var _ref3$phone = _ref3.phone,
      webphone = _ref3$phone.webphone,
      locale = _ref3$phone.locale,
      contactMatcher = _ref3$phone.contactMatcher,
      contactSearch = _ref3$phone.contactSearch,
      regionSettings = _ref3$phone.regionSettings,
      forwardingNumber = _ref3$phone.forwardingNumber,
      brand = _ref3$phone.brand,
      _ref3$showContactDisp = _ref3.showContactDisplayPlaceholder,
      showContactDisplayPlaceholder = _ref3$showContactDisp === undefined ? false : _ref3$showContactDisp,
      phoneTypeRenderer = _ref3.phoneTypeRenderer;

  var currentSession = webphone.ringSession || {};
  var contactMapping = contactMatcher && contactMatcher.dataMapping;
  var fromMatches = contactMapping && contactMapping[currentSession.from] || [];
  var toMatches = contactMapping && contactMapping[currentSession.to] || [];
  var nameMatches = currentSession.direction === _callDirections2.default.outbound ? toMatches : fromMatches;
  return {
    brand: brand.fullName,
    nameMatches: nameMatches,
    currentLocale: locale.currentLocale,
    session: currentSession,
    activeSessionId: webphone.activeSessionId,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    forwardingNumbers: forwardingNumber.forwardingNumbers,
    showContactDisplayPlaceholder: showContactDisplayPlaceholder,
    searchContactList: contactSearch.sortedResult,
    phoneTypeRenderer: phoneTypeRenderer
  };
}

function mapToFunctions(_, _ref4) {
  var _ref4$phone = _ref4.phone,
      webphone = _ref4$phone.webphone,
      regionSettings = _ref4$phone.regionSettings,
      contactSearch = _ref4$phone.contactSearch,
      _ref4$getAvatarUrl = _ref4.getAvatarUrl,
      getAvatarUrl = _ref4$getAvatarUrl === undefined ? function () {
    return null;
  } : _ref4$getAvatarUrl;

  return {
    formatPhone: function formatPhone(phoneNumber) {
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        areaCode: regionSettings.areaCode,
        countryCode: regionSettings.countryCode
      });
    },
    answer: function answer(sessionId) {
      return webphone.answer(sessionId);
    },
    reject: function reject(sessionId) {
      return webphone.reject(sessionId);
    },
    toVoiceMail: function toVoiceMail(sessionId) {
      return webphone.toVoiceMail(sessionId);
    },
    onForward: function onForward(sessionId, forwardNumber) {
      return webphone.forward(sessionId, forwardNumber);
    },
    replyWithMessage: function replyWithMessage(sessionId, message) {
      return webphone.replyWithMessage(sessionId, message);
    },
    toggleMinimized: function toggleMinimized(sessionId) {
      return webphone.toggleMinimized(sessionId);
    },
    updateSessionMatchedContact: function updateSessionMatchedContact(sessionId, contact) {
      return webphone.updateSessionMatchedContact(sessionId, contact);
    },
    getAvatarUrl: getAvatarUrl,
    hangup: function hangup(sessionId) {
      return webphone.hangup(sessionId);
    },
    onHold: function onHold(sessionId) {
      return webphone.hold(sessionId);
    },
    searchContact: function searchContact(pattern) {
      return contactSearch.debouncedSearch({ searchString: pattern });
    }
  };
}

var IncomingCallContainer = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(IncomingCallPage));

exports.default = IncomingCallContainer;
//# sourceMappingURL=index.js.map
