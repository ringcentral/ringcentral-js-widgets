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

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _InsideModal = require('../InsideModal');

var _InsideModal2 = _interopRequireDefault(_InsideModal);

var _LogSection = require('../LogSection');

var _LogSection2 = _interopRequireDefault(_LogSection);

var _LogNotification = require('../LogNotification');

var _LogNotification2 = _interopRequireDefault(_LogNotification);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ActiveCallsPanel = function (_Component) {
  (0, _inherits3.default)(ActiveCallsPanel, _Component);

  function ActiveCallsPanel() {
    (0, _classCallCheck3.default)(this, ActiveCallsPanel);
    return (0, _possibleConstructorReturn3.default)(this, (ActiveCallsPanel.__proto__ || (0, _getPrototypeOf2.default)(ActiveCallsPanel)).apply(this, arguments));
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
    key: 'renderLogSection',
    value: function renderLogSection() {
      if (!this.props.currentLog) return null;

      var _props = this.props,
          formatPhone = _props.formatPhone,
          currentLocale = _props.currentLocale,
          currentLog = _props.currentLog,
          renderEditLogSection = _props.renderEditLogSection,
          renderSaveLogButton = _props.renderSaveLogButton,
          onSaveCallLog = _props.onSaveCallLog,
          onUpdateCallLog = _props.onUpdateCallLog,
          onCloseLogSection = _props.onCloseLogSection,
          logNotification = _props.logNotification,
          showNotiLogButton = _props.showNotiLogButton,
          onCloseNotification = _props.onCloseNotification,
          onSaveNotification = _props.onSaveNotification,
          onExpandNotification = _props.onExpandNotification,
          onDiscardNotification = _props.onDiscardNotification,
          notificationContainerStyles = _props.notificationContainerStyles,
          onLogBasicInfoClick = _props.onLogBasicInfoClick,
          renderSmallCallContrl = _props.renderSmallCallContrl;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _InsideModal2.default,
          {
            title: currentLog.title,
            show: currentLog.showLog,
            onClose: onCloseLogSection,
            clickOutToClose: false
            // containerStyles={sectionContainerStyles}
            // modalStyles={sectionModalStyles}
          },
          _react2.default.createElement(_LogSection2.default, {
            currentLocale: currentLocale,
            currentLog: currentLog
            // additionalInfo={additionalInfo}
            , isInnerMask: logNotification && logNotification.notificationIsExpand,
            renderEditLogSection: renderEditLogSection,
            renderSaveLogButton: renderSaveLogButton,
            formatPhone: formatPhone,
            onUpdateCallLog: onUpdateCallLog,
            onSaveCallLog: onSaveCallLog,
            onLogBasicInfoClick: onLogBasicInfoClick,
            renderSmallCallContrl: renderSmallCallContrl,
            showSaveLogBtn: true
          })
        ),
        logNotification ? _react2.default.createElement(
          _InsideModal2.default,
          {
            show: logNotification.showNotification,
            showTitle: false,
            containerStyles: (0, _classnames2.default)(_styles2.default.notificationContainer, notificationContainerStyles),
            modalStyles: _styles2.default.notificationModal,
            contentStyle: _styles2.default.notificationContent,
            onClose: onCloseNotification },
          _react2.default.createElement(_LogNotification2.default, {
            showLogButton: showNotiLogButton,
            currentLocale: currentLocale,
            formatPhone: formatPhone,
            currentLog: logNotification,
            isExpand: logNotification.notificationIsExpand,
            onSave: onSaveNotification,
            onExpand: onExpandNotification,
            onDiscard: onDiscardNotification,
            onStay: onCloseNotification
          })
        ) : null
      );
    }
  }, {
    key: 'getCallList',
    value: function getCallList(calls, title) {
      var showCallDetail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var _props2 = this.props,
          currentLocale = _props2.currentLocale,
          areaCode = _props2.areaCode,
          countryCode = _props2.countryCode,
          brand = _props2.brand,
          showContactDisplayPlaceholder = _props2.showContactDisplayPlaceholder,
          formatPhone = _props2.formatPhone,
          onClickToSms = _props2.onClickToSms,
          onCreateContact = _props2.onCreateContact,
          onViewContact = _props2.onViewContact,
          outboundSmsPermission = _props2.outboundSmsPermission,
          internalSmsPermission = _props2.internalSmsPermission,
          isLoggedContact = _props2.isLoggedContact,
          onLogCall = _props2.onLogCall,
          autoLog = _props2.autoLog,
          loggingMap = _props2.loggingMap,
          webphoneAnswer = _props2.webphoneAnswer,
          webphoneReject = _props2.webphoneReject,
          webphoneHangup = _props2.webphoneHangup,
          webphoneResume = _props2.webphoneResume,
          enableContactFallback = _props2.enableContactFallback,
          webphoneToVoicemail = _props2.webphoneToVoicemail,
          sourceIcons = _props2.sourceIcons,
          phoneTypeRenderer = _props2.phoneTypeRenderer,
          phoneSourceNameRenderer = _props2.phoneSourceNameRenderer,
          activeCurrentCalls = _props2.activeCurrentCalls,
          isWebRTC = _props2.isWebRTC,
          isSessionAConferenceCall = _props2.isSessionAConferenceCall,
          onCallItemClick = _props2.onCallItemClick,
          showAvatar = _props2.showAvatar,
          getAvatarUrl = _props2.getAvatarUrl,
          conferenceCallParties = _props2.conferenceCallParties,
          webphoneHold = _props2.webphoneHold,
          useV2 = _props2.useV2,
          updateSessionMatchedContact = _props2.updateSessionMatchedContact,
          renderExtraButton = _props2.renderExtraButton,
          renderContactName = _props2.renderContactName,
          ringoutHangup = _props2.ringoutHangup,
          ringoutTransfer = _props2.ringoutTransfer,
          ringoutReject = _props2.ringoutReject,
          disableLinks = _props2.disableLinks,
          showRingoutCallControl = _props2.showRingoutCallControl;


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
        renderExtraButton: renderExtraButton,
        renderContactName: renderContactName,
        enableContactFallback: enableContactFallback,
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        isWebRTC: isWebRTC,
        currentCall: activeCurrentCalls[0],
        isSessionAConferenceCall: isSessionAConferenceCall,
        useV2: useV2 // TODO: Maybe we should make all the call item consistent
        , onCallItemClick: onCallItemClick,
        showAvatar: showAvatar,
        getAvatarUrl: getAvatarUrl,
        conferenceCallParties: conferenceCallParties,
        webphoneHold: webphoneHold,
        showCallDetail: showCallDetail,
        updateSessionMatchedContact: updateSessionMatchedContact,
        ringoutHangup: ringoutHangup,
        ringoutTransfer: ringoutTransfer,
        ringoutReject: ringoutReject,
        disableLinks: disableLinks,
        showRingoutCallControl: showRingoutCallControl
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props3 = this.props,
          activeRingCalls = _props3.activeRingCalls,
          activeOnHoldCalls = _props3.activeOnHoldCalls,
          activeCurrentCalls = _props3.activeCurrentCalls,
          otherDeviceCalls = _props3.otherDeviceCalls,
          className = _props3.className,
          currentLocale = _props3.currentLocale,
          showSpinner = _props3.showSpinner,
          showOtherDevice = _props3.showOtherDevice;

      var logSection = this.renderLogSection();

      if (!this.hasCalls()) {
        return _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_styles2.default.root, className) },
          _react2.default.createElement(
            'p',
            { className: _styles2.default.noCalls },
            _i18n2.default.getString('noActiveCalls', currentLocale)
          ),
          logSection,
          showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, { className: _styles2.default.spinner }) : null
        );
      }
      var otherDevice = showOtherDevice ? this.getCallList(otherDeviceCalls, _i18n2.default.getString('otherDeviceCall', currentLocale), true) : null;
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
          otherDevice
        ),
        logSection,
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
  phoneTypeRenderer: _propTypes2.default.func,
  phoneSourceNameRenderer: _propTypes2.default.func,
  isWebRTC: _propTypes2.default.bool.isRequired,
  showSpinner: _propTypes2.default.bool,
  isSessionAConferenceCall: _propTypes2.default.func,
  onCallItemClick: _propTypes2.default.func,
  getAvatarUrl: _propTypes2.default.func,
  conferenceCallParties: _propTypes2.default.arrayOf(_propTypes2.default.object),
  webphoneHold: _propTypes2.default.func,
  useV2: _propTypes2.default.bool,
  updateSessionMatchedContact: _propTypes2.default.func,
  // CallLog related
  currentLog: _propTypes2.default.object,
  renderEditLogSection: _propTypes2.default.func,
  renderSaveLogButton: _propTypes2.default.func,
  renderExtraButton: _propTypes2.default.func,
  onSaveCallLog: _propTypes2.default.func,
  onUpdateCallLog: _propTypes2.default.func,
  onCloseLogSection: _propTypes2.default.func,
  // - Notification
  logNotification: _propTypes2.default.object,
  onCloseNotification: _propTypes2.default.func,
  onDiscardNotification: _propTypes2.default.func,
  onSaveNotification: _propTypes2.default.func,
  onExpandNotification: _propTypes2.default.func,
  showNotiLogButton: _propTypes2.default.bool,
  notificationContainerStyles: _propTypes2.default.string,
  // Contact
  showAvatar: _propTypes2.default.bool,
  renderContactName: _propTypes2.default.func,
  showOtherDevice: _propTypes2.default.bool,
  ringoutHangup: _propTypes2.default.func,
  ringoutTransfer: _propTypes2.default.func,
  ringoutReject: _propTypes2.default.func,
  disableLinks: _propTypes2.default.bool,
  showRingoutCallControl: _propTypes2.default.bool,
  onLogBasicInfoClick: _propTypes2.default.func,
  renderSmallCallContrl: _propTypes2.default.func
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
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  showSpinner: false,
  isSessionAConferenceCall: function isSessionAConferenceCall() {
    return false;
  },
  onCallItemClick: false,
  getAvatarUrl: function getAvatarUrl(i) {
    return i;
  },
  conferenceCallParties: [],
  webphoneHold: function webphoneHold(i) {
    return i;
  },
  useV2: false,
  updateSessionMatchedContact: function updateSessionMatchedContact(i) {
    return i;
  },
  // CallLog related
  currentLog: undefined,
  renderEditLogSection: undefined,
  renderSaveLogButton: undefined,
  renderExtraButton: undefined,
  onSaveCallLog: undefined,
  onUpdateCallLog: undefined,
  onCloseLogSection: undefined,
  // Notification
  logNotification: undefined,
  onCloseNotification: undefined,
  onDiscardNotification: undefined,
  onSaveNotification: undefined,
  onExpandNotification: undefined,
  showNotiLogButton: true,
  notificationContainerStyles: undefined,
  // Contact
  showAvatar: true,
  renderContactName: undefined,
  showOtherDevice: true,
  ringoutHangup: undefined,
  ringoutTransfer: undefined,
  ringoutReject: undefined,
  disableLinks: false,
  showRingoutCallControl: false,
  onLogBasicInfoClick: function onLogBasicInfoClick() {},
  renderSmallCallContrl: function renderSmallCallContrl() {}
};
//# sourceMappingURL=index.js.map
