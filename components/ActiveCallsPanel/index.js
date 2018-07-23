'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _ActiveCallList = require('../ActiveCallList');

var _ActiveCallList2 = _interopRequireDefault(_ActiveCallList);

var _ConfirmMergeModal = require('../ConfirmMergeModal');

var _ConfirmMergeModal2 = _interopRequireDefault(_ConfirmMergeModal);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActiveCallsPanel = function (_Component) {
  (0, _inherits3.default)(ActiveCallsPanel, _Component);

  function ActiveCallsPanel(props) {
    (0, _classCallCheck3.default)(this, ActiveCallsPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ActiveCallsPanel.__proto__ || (0, _getPrototypeOf2.default)(ActiveCallsPanel)).call(this, props));

    _this.state = {
      isModalOpen: false,
      callOfModal: null
    };

    _this.showConfirmMergeModal = function (call) {
      _this.setState({
        isModalOpen: true,
        callOfModal: call
      });
    };

    _this.hideConfirmMergeModal = function () {
      _this.setState({
        isModalOpen: false,
        callOfModal: null
      });
    };

    _this.confirmMergeCall = function () {
      _this.props.mergeToConference([_this.state.callOfModal.webphoneSession]);
      _this.hideConfirmMergeModal();
    };
    return _this;
  }

  (0, _createClass3.default)(ActiveCallsPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.hasCalls(this.props) && typeof this.props.onCallsEmpty === 'function') {
        this.props.onCallsEmpty();
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.hasCalls(this.props) && !this.hasCalls(nextProps) && typeof this.props.onCallsEmpty === 'function') {
        this.props.onCallsEmpty();
      }
    }
  }, {
    key: 'hasCalls',
    value: function hasCalls() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;

      return props.activeRingCalls.length > 0 || props.activeOnHoldCalls.length > 0 || props.activeCurrentCalls.length > 0 || props.otherDeviceCalls.length > 0;
    }
  }, {
    key: 'getCallList',
    value: function getCallList(calls, title) {
      var _props = this.props,
          currentLocale = _props.currentLocale,
          areaCode = _props.areaCode,
          countryCode = _props.countryCode,
          brand = _props.brand,
          showContactDisplayPlaceholder = _props.showContactDisplayPlaceholder,
          formatPhone = _props.formatPhone,
          onClickToSms = _props.onClickToSms,
          onCreateContact = _props.onCreateContact,
          onViewContact = _props.onViewContact,
          outboundSmsPermission = _props.outboundSmsPermission,
          internalSmsPermission = _props.internalSmsPermission,
          isLoggedContact = _props.isLoggedContact,
          onLogCall = _props.onLogCall,
          autoLog = _props.autoLog,
          loggingMap = _props.loggingMap,
          webphoneAnswer = _props.webphoneAnswer,
          webphoneReject = _props.webphoneReject,
          webphoneHangup = _props.webphoneHangup,
          webphoneResume = _props.webphoneResume,
          enableContactFallback = _props.enableContactFallback,
          webphoneToVoicemail = _props.webphoneToVoicemail,
          sourceIcons = _props.sourceIcons,
          activeCurrentCalls = _props.activeCurrentCalls,
          isWebRTC = _props.isWebRTC,
          conferenceCallEquipped = _props.conferenceCallEquipped,
          hasConferenceCall = _props.hasConferenceCall,
          disableMerge = _props.disableMerge,
          mergeToConference = _props.mergeToConference,
          isSessionAConferenceCall = _props.isSessionAConferenceCall;


      return _react2.default.createElement(_ActiveCallList2.default, {
        title: title,
        calls: calls,
        currentLocale: currentLocale,
        areaCode: areaCode,
        countryCode: countryCode,
        brand: brand,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        formatPhone: formatPhone,
        onClickToSms: onClickToSms,
        onCreateContact: onCreateContact,
        onViewContact: onViewContact,
        outboundSmsPermission: outboundSmsPermission,
        internalSmsPermission: internalSmsPermission,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall,
        autoLog: autoLog,
        loggingMap: loggingMap,
        webphoneAnswer: webphoneAnswer,
        webphoneReject: webphoneReject,
        webphoneHangup: webphoneHangup,
        webphoneResume: webphoneResume,
        webphoneToVoicemail: webphoneToVoicemail,
        enableContactFallback: enableContactFallback,
        sourceIcons: sourceIcons,
        isWebRTC: isWebRTC,
        conferenceCallEquipped: conferenceCallEquipped,
        hasConferenceCall: hasConferenceCall,
        disableMerge: disableMerge,
        currentCall: activeCurrentCalls[0],
        mergeToConference: mergeToConference,
        isSessionAConferenceCall: isSessionAConferenceCall,
        onConfirmMergeCall: this.showConfirmMergeModal
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          activeRingCalls = _props2.activeRingCalls,
          activeOnHoldCalls = _props2.activeOnHoldCalls,
          activeCurrentCalls = _props2.activeCurrentCalls,
          otherDeviceCalls = _props2.otherDeviceCalls,
          className = _props2.className,
          currentLocale = _props2.currentLocale,
          showSpinner = _props2.showSpinner,
          conferencePartiesAvatarUrls = _props2.conferencePartiesAvatarUrls;


      if (!this.hasCalls()) {
        return _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_styles2.default.root, className) },
          _react2.default.createElement(
            'p',
            { className: _styles2.default.noCalls },
            _i18n2.default.getString('noActiveCalls', currentLocale)
          ),
          showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, { className: _styles2.default.spinner }) : null
        );
      }

      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root },
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(_styles2.default.root, className),
            ref: function ref(target) {
              _this2.container = target;
            }
          },
          this.getCallList(activeRingCalls, _i18n2.default.getString('ringCall', currentLocale)),
          this.getCallList(activeCurrentCalls, _i18n2.default.getString('currentCall', currentLocale)),
          this.getCallList(activeOnHoldCalls, _i18n2.default.getString('onHoldCall', currentLocale)),
          this.getCallList(otherDeviceCalls, _i18n2.default.getString('otherDeviceCall', currentLocale)),
          _react2.default.createElement(_ConfirmMergeModal2.default, {
            currentLocale: currentLocale,
            show: this.state.isModalOpen,
            onMerge: this.confirmMergeCall,
            onCancel: this.hideConfirmMergeModal,
            avatarUrls: conferencePartiesAvatarUrls
          })
        ),
        showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, { className: _styles2.default.spinner }) : null
      );
    }
  }]);
  return ActiveCallsPanel;
}(_react.Component);

exports.default = ActiveCallsPanel;


ActiveCallsPanel.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  activeRingCalls: _propTypes2.default.array.isRequired,
  activeOnHoldCalls: _propTypes2.default.array.isRequired,
  activeCurrentCalls: _propTypes2.default.array.isRequired,
  otherDeviceCalls: _propTypes2.default.array.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  formatPhone: _propTypes2.default.func.isRequired,
  onClickToSms: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool,
  isLoggedContact: _propTypes2.default.func,
  onLogCall: _propTypes2.default.func,
  webphoneAnswer: _propTypes2.default.func,
  webphoneReject: _propTypes2.default.func,
  webphoneHangup: _propTypes2.default.func,
  webphoneResume: _propTypes2.default.func,
  webphoneToVoicemail: _propTypes2.default.func,
  autoLog: _propTypes2.default.bool,
  onViewContact: _propTypes2.default.func,
  enableContactFallback: _propTypes2.default.bool,
  loggingMap: _propTypes2.default.object,
  onCallsEmpty: _propTypes2.default.func,
  sourceIcons: _propTypes2.default.object,
  isWebRTC: _propTypes2.default.bool.isRequired,
  conferenceCallEquipped: _propTypes2.default.bool,
  hasConferenceCall: _propTypes2.default.bool,
  showSpinner: _propTypes2.default.bool,
  disableMerge: _propTypes2.default.bool,
  mergeToConference: _propTypes2.default.func,
  isSessionAConferenceCall: _propTypes2.default.func,
  conferencePartiesAvatarUrls: _propTypes2.default.arrayOf(_propTypes2.default.string)
};

ActiveCallsPanel.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  onViewContact: undefined,
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  webphoneToVoicemail: undefined,
  enableContactFallback: undefined,
  loggingMap: {},
  autoLog: false,
  onCallsEmpty: undefined,
  sourceIcons: undefined,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  showSpinner: false,
  disableMerge: false,
  mergeToConference: function mergeToConference(i) {
    return i;
  },
  isSessionAConferenceCall: function isSessionAConferenceCall() {
    return false;
  },
  conferencePartiesAvatarUrls: []
};
//# sourceMappingURL=index.js.map
