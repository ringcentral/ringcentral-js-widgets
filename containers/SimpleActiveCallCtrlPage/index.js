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

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _CallCtrlPanel = require('../../components/CallCtrlPanel');

var _CallCtrlPanel2 = _interopRequireDefault(_CallCtrlPanel);

var _callCtrlLayouts = require('../../enums/callCtrlLayouts');

var _callCtrlLayouts2 = _interopRequireDefault(_callCtrlLayouts);

var _ActiveCallPad = require('../../components/ActiveCallPad');

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      activeCallControl = _ref$phone.activeCallControl,
      regionSettings = _ref$phone.regionSettings,
      callMonitor = _ref$phone.callMonitor,
      locale = _ref$phone.locale,
      brand = _ref$phone.brand,
      params = _ref.params,
      renderContactName = _ref.renderContactName;
  var sessionId = params.sessionId;
  var activeSession = activeCallControl.activeSession;

  var nameMatches = [];
  if (activeSession && !renderContactName) {
    nameMatches = activeSession.direction === _callDirections2.default.outbound ? activeSession.toMatches : activeSession.fromMatches;
  }
  var phoneNumber = void 0;
  if (activeSession) {
    phoneNumber = activeSession.direction === _callDirections2.default.outbound ? activeSession.to : activeSession.from;
  }
  var fallBackName = _i18n2.default.getString('Unknown', locale.currentLocale);
  if (renderContactName) {
    var _pickFallBackInfo = (0, _utils.pickFallBackInfo)(activeSession, renderContactName({ sessionId: sessionId }), locale.currentLocale),
        fallBackNameFromThirdParty = _pickFallBackInfo.fallBackName,
        fallBackNumber = _pickFallBackInfo.fallBackNumber;

    phoneNumber = fallBackNumber;
    fallBackName = fallBackNameFromThirdParty;
  }
  return {
    currentLocale: locale.currentLocale,
    activeSession: activeSession,
    sessionId: sessionId,
    areaCode: regionSettings.areaCode,
    countryCode: regionSettings.countryCode,
    otherDeviceCalls: callMonitor.otherDeviceCalls,
    nameMatches: nameMatches,
    phoneNumber: phoneNumber,
    fallBackName: fallBackName,
    brand: brand.fullName,
    activeCallControl: activeCallControl
  };
} /**
   * @file simplify active call control page
   * detail: https://jira.ringcentral.com/browse/RCINT-8256
   */

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      routerInteraction = _ref2$phone.routerInteraction,
      activeCallControl = _ref2$phone.activeCallControl;

  return {
    onBackButtonClick: function onBackButtonClick() {
      return routerInteraction.goBack();
    },
    setActiveSessionId: function setActiveSessionId(sessionId) {
      return activeCallControl.setActiveSessionId(sessionId);
    }
  };
}

var ActiveCallControlPanel = function (_Component) {
  (0, _inherits3.default)(ActiveCallControlPanel, _Component);

  function ActiveCallControlPanel(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, ActiveCallControlPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveCallControlPanel.__proto__ || (0, _getPrototypeOf2.default)(ActiveCallControlPanel)).call(this, props));

    _this.state = {
      selectedMatcherIndex: 0
    };

    _this.onMute = function () {
      return _this.props.activeCallControl.mute(_this.props.sessionId);
    };
    _this.onUnmute = function () {
      return _this.props.activeCallControl.unmute(_this.props.sessionId);
    };
    _this.onHold = function () {
      return _this.props.activeCallControl.hold(_this.props.sessionId);
    };
    _this.onUnhold = function () {
      return _this.props.activeCallControl.unHold(_this.props.sessionId);
    };
    _this.onHangup = function () {
      return _this.props.activeCallControl.hangUp(_this.props.sessionId);
    };
    _this.onTransfer = function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(number) {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _this.props.activeCallControl.transfer(number, _this.props.sessionId));

              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }();

    _this.formatPhone = function (phoneNumber) {
      return (0, _formatNumber2.default)({
        phoneNumber: phoneNumber,
        areaCode: _this.props.areaCode,
        countryCode: _this.props.countryCode
      });
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
        selectedMatcherIndex: selectedMatcherIndex
      });
    };
    return _this;
  }

  (0, _createClass3.default)(ActiveCallControlPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadActCall();
    }
  }, {
    key: 'loadActCall',
    value: function loadActCall() {
      this.props.setActiveSessionId(this.props.sessionId);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.activeSession) {
        this.props.onBackButtonClick();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (!this.props.activeSession) {
        // or using skeleton screen here
        return null;
      }
      var muteCtrl = _ActiveCallPad.ACTIONS_CTRL_MAP.muteCtrl,
          transferCtrl = _ActiveCallPad.ACTIONS_CTRL_MAP.transferCtrl,
          holdCtrl = _ActiveCallPad.ACTIONS_CTRL_MAP.holdCtrl;


      return _react2.default.createElement(_CallCtrlPanel2.default, {
        currentLocale: this.props.currentLocale,
        fallBackName: this.props.fallBackName,
        phoneNumber: this.props.phoneNumber,
        onMute: this.onMute,
        onUnmute: this.onUnmute,
        onHold: this.onHold,
        onUnhold: this.onUnhold,
        onHangup: this.onHangup,
        onTransfer: this.onTransfer,
        showBackButton: true,
        backButtonLabel: _i18n2.default.getString('allCalls', this.props.currentLocale),
        onBackButtonClick: this.props.onBackButtonClick,
        formatPhone: this.formatPhone,
        areaCode: this.props.areaCode,
        countryCode: this.props.countryCode,
        selectedMatcherIndex: this.state.selectedMatcherIndex,
        layout: _callCtrlLayouts2.default.normalCtrl,
        startTime: this.props.activeSession.startTime,
        actions: [muteCtrl, transferCtrl, holdCtrl],
        isOnMute: this.props.activeSession.isOnMute,
        isOnHold: this.props.activeSession.isOnHold,
        nameMatches: this.props.nameMatches,
        onSelectMatcherName: this.onSelectMatcherName,
        brand: this.props.brand,
        showContactDisplayPlaceholder: this.props.showContactDisplayPlaceholder
      });
    }
  }]);
  return ActiveCallControlPanel;
}(_react.Component);

ActiveCallControlPanel.propTypes = {
  setActiveSessionId: _propTypes2.default.func,
  currentLocale: _propTypes2.default.string,
  sessionId: _propTypes2.default.string,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  activeSession: _propTypes2.default.object,
  onBackButtonClick: _propTypes2.default.func.isRequired,
  activeCallControl: _propTypes2.default.object,
  nameMatches: _propTypes2.default.array,
  fallBackName: _propTypes2.default.string,
  phoneNumber: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  brand: _propTypes2.default.string.isRequired
};

ActiveCallControlPanel.defaultProps = {
  setActiveSessionId: function setActiveSessionId() {},
  currentLocale: 'en-US',
  activeCallControl: {},
  activeSession: null,
  sessionId: null,
  nameMatches: [],
  fallBackName: '',
  phoneNumber: '',
  showContactDisplayPlaceholder: false
};

exports.default = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(ActiveCallControlPanel));
//# sourceMappingURL=index.js.map
