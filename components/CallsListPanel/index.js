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

var _ActiveCallItem = require('../ActiveCallItem');

var _ActiveCallItem2 = _interopRequireDefault(_ActiveCallItem);

var _CallList = require('../CallList');

var _CallList2 = _interopRequireDefault(_CallList);

var _InsideModal = require('../InsideModal');

var _InsideModal2 = _interopRequireDefault(_InsideModal);

var _LogSection = require('../LogSection');

var _LogSection2 = _interopRequireDefault(_LogSection);

var _LogNotification = require('../LogNotification');

var _LogNotification2 = _interopRequireDefault(_LogNotification);

var _SearchInput = require('../SearchInput');

var _SearchInput2 = _interopRequireDefault(_SearchInput);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO it is ActiveCallsPanel's function is the same, and remove ActiveCallsPanel after migration.

function ActiveCallList(_ref) {
  var calls = _ref.calls,
      className = _ref.className,
      currentLocale = _ref.currentLocale,
      areaCode = _ref.areaCode,
      countryCode = _ref.countryCode,
      brand = _ref.brand,
      showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
      formatPhone = _ref.formatPhone,
      onClickToSms = _ref.onClickToSms,
      onCreateContact = _ref.onCreateContact,
      onViewContact = _ref.onViewContact,
      outboundSmsPermission = _ref.outboundSmsPermission,
      internalSmsPermission = _ref.internalSmsPermission,
      isLoggedContact = _ref.isLoggedContact,
      onLogCall = _ref.onLogCall,
      autoLog = _ref.autoLog,
      loggingMap = _ref.loggingMap,
      webphoneAnswer = _ref.webphoneAnswer,
      webphoneReject = _ref.webphoneReject,
      webphoneHangup = _ref.webphoneHangup,
      webphoneResume = _ref.webphoneResume,
      webphoneToVoicemail = _ref.webphoneToVoicemail,
      enableContactFallback = _ref.enableContactFallback,
      title = _ref.title,
      sourceIcons = _ref.sourceIcons,
      disableLinks = _ref.disableLinks,
      renderContactName = _ref.renderContactName,
      renderExtraButton = _ref.renderExtraButton,
      contactDisplayStyle = _ref.contactDisplayStyle,
      externalViewEntity = _ref.externalViewEntity,
      externalHasEntity = _ref.externalHasEntity,
      readTextPermission = _ref.readTextPermission;

  if (calls.length === 0) {
    return null;
  }
  return _react2.default.createElement(
    'div',
    { className: (0, _classnames2.default)(_styles2.default.list, className) },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.listTitle },
      title
    ),
    calls.map(function (call) {
      return _react2.default.createElement(_ActiveCallItem2.default, {
        call: call,
        key: call.id,
        currentLocale: currentLocale,
        areaCode: areaCode,
        countryCode: countryCode,
        brand: brand,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        formatPhone: formatPhone,
        onClickToSms: onClickToSms,
        internalSmsPermission: internalSmsPermission,
        outboundSmsPermission: outboundSmsPermission,
        isLoggedContact: isLoggedContact,
        onLogCall: onLogCall,
        onViewContact: onViewContact,
        onCreateContact: onCreateContact,
        loggingMap: loggingMap,
        webphoneAnswer: webphoneAnswer,
        webphoneReject: webphoneReject,
        webphoneHangup: webphoneHangup,
        webphoneResume: webphoneResume,
        webphoneToVoicemail: webphoneToVoicemail,
        enableContactFallback: enableContactFallback,
        autoLog: autoLog,
        sourceIcons: sourceIcons,
        disableLinks: disableLinks,
        renderContactName: renderContactName,
        renderExtraButton: renderExtraButton,
        contactDisplayStyle: contactDisplayStyle,
        externalViewEntity: externalViewEntity,
        externalHasEntity: externalHasEntity,
        readTextPermission: readTextPermission
      });
    })
  );
}

ActiveCallList.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  title: _propTypes2.default.string.isRequired,
  calls: _propTypes2.default.array.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  formatPhone: _propTypes2.default.func.isRequired,
  onClickToSms: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  onViewContact: _propTypes2.default.func,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool,
  isLoggedContact: _propTypes2.default.func,
  onLogCall: _propTypes2.default.func,
  loggingMap: _propTypes2.default.object,
  webphoneAnswer: _propTypes2.default.func,
  webphoneReject: _propTypes2.default.func,
  webphoneHangup: _propTypes2.default.func,
  webphoneResume: _propTypes2.default.func,
  webphoneToVoicemail: _propTypes2.default.func,
  enableContactFallback: _propTypes2.default.bool,
  autoLog: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  disableLinks: _propTypes2.default.bool,
  renderContactName: _propTypes2.default.func,
  renderExtraButton: _propTypes2.default.func,
  contactDisplayStyle: _propTypes2.default.string,
  externalViewEntity: _propTypes2.default.func,
  externalHasEntity: _propTypes2.default.func,
  readTextPermission: _propTypes2.default.bool
};

ActiveCallList.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onLogCall: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  onViewContact: undefined,
  webphoneToVoicemail: undefined,
  sourceIcons: undefined,
  disableLinks: false,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true
};

var CallsListPanel = function (_Component) {
  (0, _inherits3.default)(CallsListPanel, _Component);

  function CallsListPanel() {
    (0, _classCallCheck3.default)(this, CallsListPanel);
    return (0, _possibleConstructorReturn3.default)(this, (CallsListPanel.__proto__ || (0, _getPrototypeOf2.default)(CallsListPanel)).apply(this, arguments));
  }

  (0, _createClass3.default)(CallsListPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (!this.hasCalls(this.props) && typeof this.props.onCallsEmpty === 'function') {
        this.props.onCallsEmpty();
      }
      this.forceUpdate();
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

      return props.activeRingCalls.length > 0 || props.activeOnHoldCalls.length > 0 || props.activeCurrentCalls.length > 0 || props.otherDeviceCalls.length > 0 || props.calls.length > 0;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          activeRingCalls = _props.activeRingCalls,
          activeOnHoldCalls = _props.activeOnHoldCalls,
          activeCurrentCalls = _props.activeCurrentCalls,
          otherDeviceCalls = _props.otherDeviceCalls,
          showSpinner = _props.showSpinner,
          searchInput = _props.searchInput,
          onSearchInputChange = _props.onSearchInputChange,
          className = _props.className,
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
          onClickToDial = _props.onClickToDial,
          disableLinks = _props.disableLinks,
          disableClickToDial = _props.disableClickToDial,
          dateTimeFormatter = _props.dateTimeFormatter,
          calls = _props.calls,
          active = _props.active,
          renderContactName = _props.renderContactName,
          renderExtraButton = _props.renderExtraButton,
          contactDisplayStyle = _props.contactDisplayStyle,
          activeContactDisplayStyle = _props.activeContactDisplayStyle,
          currentLog = _props.currentLog,
          additionalInfo = _props.additionalInfo,
          onCloseLogSection = _props.onCloseLogSection,
          onUpdateCallLog = _props.onUpdateCallLog,
          onSaveCallLog = _props.onSaveCallLog,
          renderEditLogSection = _props.renderEditLogSection,
          renderSaveLogButton = _props.renderSaveLogButton,
          logNotification = _props.logNotification,
          onCloseNotification = _props.onCloseNotification,
          onDiscardNotification = _props.onDiscardNotification,
          onSaveNotification = _props.onSaveNotification,
          onExpandNotification = _props.onExpandNotification,
          showSaveLogBtn = _props.showSaveLogBtn,
          showNotiLogButton = _props.showNotiLogButton,
          sectionContainerStyles = _props.sectionContainerStyles,
          sectionModalStyles = _props.sectionModalStyles,
          notificationContainerStyles = _props.notificationContainerStyles,
          externalViewEntity = _props.externalViewEntity,
          externalHasEntity = _props.externalHasEntity,
          readTextPermission = _props.readTextPermission,
          children = _props.children;

      if (showSpinner) {
        return _react2.default.createElement(_SpinnerOverlay2.default, null);
      }
      var search = onSearchInputChange ? _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.searchContainer) },
        _react2.default.createElement(_SearchInput2.default, {
          key: '100',
          className: _styles2.default.searchInput,
          value: searchInput,
          onChange: onSearchInputChange,
          placeholder: _i18n2.default.getString('searchPlaceholder', currentLocale),
          disabled: disableLinks
        })
      ) : null;

      var logSection = currentLog ? _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _InsideModal2.default,
          {
            title: currentLog.title,
            show: currentLog.showLog,
            onClose: onCloseLogSection,
            containerStyles: sectionContainerStyles,
            modalStyles: sectionModalStyles },
          _react2.default.createElement(_LogSection2.default, {
            currentLocale: currentLocale,
            currentLog: currentLog,
            additionalInfo: additionalInfo,
            isInnerMask: logNotification && logNotification.notificationIsExpand,
            renderEditLogSection: renderEditLogSection,
            renderSaveLogButton: renderSaveLogButton,
            formatPhone: formatPhone,
            onUpdateCallLog: onUpdateCallLog,
            onSaveCallLog: onSaveCallLog,
            showSaveLogBtn: showSaveLogBtn
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
      ) : null;
      var isShowMessageIcon = readTextPermission && !!onClickToSms;
      var getCallList = function getCallList(calls, title) {
        return _react2.default.createElement(ActiveCallList, {
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
          disableLinks: disableLinks,
          renderContactName: renderContactName,
          renderExtraButton: renderExtraButton,
          contactDisplayStyle: activeContactDisplayStyle,
          externalViewEntity: externalViewEntity,
          externalHasEntity: externalHasEntity,
          readTextPermission: isShowMessageIcon
        });
      };

      var historyCall = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.list, className) },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.listTitle },
          _i18n2.default.getString('historyCalls', currentLocale)
        ),
        _react2.default.createElement(_CallList2.default, {
          brand: brand,
          currentLocale: currentLocale,
          calls: calls,
          areaCode: areaCode,
          countryCode: countryCode,
          onViewContact: onViewContact,
          onCreateContact: onCreateContact,
          onLogCall: onLogCall,
          onClickToDial: onClickToDial,
          onClickToSms: onClickToSms,
          isLoggedContact: isLoggedContact,
          disableLinks: disableLinks,
          disableClickToDial: disableClickToDial,
          outboundSmsPermission: outboundSmsPermission,
          internalSmsPermission: internalSmsPermission,
          dateTimeFormatter: dateTimeFormatter,
          active: active,
          loggingMap: loggingMap,
          webphoneAnswer: webphoneAnswer,
          webphoneReject: webphoneReject,
          webphoneHangup: webphoneHangup,
          webphoneResume: webphoneResume,
          enableContactFallback: enableContactFallback,
          autoLog: autoLog,
          showContactDisplayPlaceholder: showContactDisplayPlaceholder,
          sourceIcons: sourceIcons,
          renderContactName: renderContactName,
          renderExtraButton: renderExtraButton,
          contactDisplayStyle: contactDisplayStyle,
          externalViewEntity: externalViewEntity,
          externalHasEntity: externalHasEntity,
          readTextPermission: isShowMessageIcon
        })
      );

      var noCalls = _react2.default.createElement(
        'p',
        { className: _styles2.default.noCalls },
        _i18n2.default.getString('noCalls', currentLocale)
      );

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.container, onSearchInputChange ? _styles2.default.containerWithSearch : null) },
        children,
        search,
        _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_styles2.default.root, currentLog && currentLog.showLog ? _styles2.default.hiddenScroll : '', className) },
          getCallList(activeRingCalls, _i18n2.default.getString('ringCall', currentLocale)),
          getCallList(activeCurrentCalls, _i18n2.default.getString('currentCall', currentLocale)),
          getCallList(activeOnHoldCalls, _i18n2.default.getString('onHoldCall', currentLocale)),
          getCallList(otherDeviceCalls, _i18n2.default.getString('otherDeviceCall', currentLocale)),
          calls.length > 0 ? historyCall : noCalls
        ),
        logSection
      );
    }
  }]);
  return CallsListPanel;
}(_react.Component);

exports.default = CallsListPanel;


CallsListPanel.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  activeRingCalls: _propTypes2.default.array.isRequired,
  activeOnHoldCalls: _propTypes2.default.array.isRequired,
  activeCurrentCalls: _propTypes2.default.array.isRequired,
  otherDeviceCalls: _propTypes2.default.array.isRequired,
  onSearchInputChange: _propTypes2.default.func,
  searchInput: _propTypes2.default.string,
  showSpinner: _propTypes2.default.bool.isRequired,
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
  calls: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  onClickToDial: _propTypes2.default.func,
  disableLinks: _propTypes2.default.bool.isRequired,
  disableClickToDial: _propTypes2.default.bool,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  active: _propTypes2.default.bool,
  renderContactName: _propTypes2.default.func,
  renderExtraButton: _propTypes2.default.func,
  contactDisplayStyle: _propTypes2.default.string,
  activeContactDisplayStyle: _propTypes2.default.string,
  currentLog: _propTypes2.default.object,
  additionalInfo: _propTypes2.default.object,
  onCloseLogSection: _propTypes2.default.func,
  onUpdateCallLog: _propTypes2.default.func,
  onSaveCallLog: _propTypes2.default.func,
  renderEditLogSection: _propTypes2.default.func,
  renderSaveLogButton: _propTypes2.default.func,
  logNotification: _propTypes2.default.object,
  onCloseNotification: _propTypes2.default.func,
  onDiscardNotification: _propTypes2.default.func,
  onSaveNotification: _propTypes2.default.func,
  onExpandNotification: _propTypes2.default.func,
  showSaveLogBtn: _propTypes2.default.bool,
  showNotiLogButton: _propTypes2.default.bool,
  sectionContainerStyles: _propTypes2.default.string,
  sectionModalStyles: _propTypes2.default.string,
  notificationContainerStyles: _propTypes2.default.string,
  externalViewEntity: _propTypes2.default.func,
  externalHasEntity: _propTypes2.default.func,
  readTextPermission: _propTypes2.default.bool,
  children: _propTypes2.default.node
};

CallsListPanel.defaultProps = {
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  onClickToSms: undefined,
  outboundSmsPermission: true,
  internalSmsPermission: true,
  isLoggedContact: undefined,
  onSearchInputChange: undefined,
  searchInput: '',
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
  onClickToDial: undefined,
  disableClickToDial: false,
  active: false,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: _styles2.default.contactDisplay,
  activeContactDisplayStyle: _styles2.default.activeContactDisplay,
  currentLog: undefined,
  additionalInfo: undefined,
  onCloseLogSection: undefined,
  onUpdateCallLog: undefined,
  onSaveCallLog: undefined,
  renderEditLogSection: undefined,
  renderSaveLogButton: undefined,
  logNotification: undefined,
  onCloseNotification: undefined,
  onDiscardNotification: undefined,
  onSaveNotification: undefined,
  onExpandNotification: undefined,
  showSaveLogBtn: true,
  showNotiLogButton: true,
  sectionContainerStyles: undefined,
  sectionModalStyles: undefined,
  notificationContainerStyles: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true,
  children: null
};
//# sourceMappingURL=index.js.map
