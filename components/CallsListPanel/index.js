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

var _CallListV = require('../CallListV2');

var _CallListV2 = _interopRequireDefault(_CallListV);

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
      createEntityTypes = _ref.createEntityTypes,
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
      phoneTypeRenderer = _ref.phoneTypeRenderer,
      phoneSourceNameRenderer = _ref.phoneSourceNameRenderer,
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
        createEntityTypes: createEntityTypes,
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
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
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
  createEntityTypes: _propTypes2.default.array,
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
  phoneTypeRenderer: _propTypes2.default.func,
  phoneSourceNameRenderer: _propTypes2.default.func,
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
  createEntityTypes: undefined,
  webphoneToVoicemail: undefined,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
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
    key: 'renderLogSection',
    value: function renderLogSection() {
      if (!this.props.currentLog) return null;

      var _props = this.props,
          formatPhone = _props.formatPhone,
          currentLocale = _props.currentLocale,
          currentLog = _props.currentLog,
          sectionContainerStyles = _props.sectionContainerStyles,
          sectionModalStyles = _props.sectionModalStyles,
          additionalInfo = _props.additionalInfo,
          showSaveLogBtn = _props.showSaveLogBtn,
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
          notificationContainerStyles = _props.notificationContainerStyles;


      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _InsideModal2.default,
          {
            title: currentLog.title,
            show: currentLog.showLog,
            onClose: onCloseLogSection,
            clickOutToClose: false,
            containerStyles: sectionContainerStyles,
            modalStyles: sectionModalStyles
          },
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
            onClose: onCloseNotification
          },
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
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          useNewList = _props2.useNewList,
          width = _props2.width,
          height = _props2.height,
          onlyHistory = _props2.onlyHistory,
          activeRingCalls = _props2.activeRingCalls,
          activeOnHoldCalls = _props2.activeOnHoldCalls,
          activeCurrentCalls = _props2.activeCurrentCalls,
          otherDeviceCalls = _props2.otherDeviceCalls,
          showSpinner = _props2.showSpinner,
          searchInput = _props2.searchInput,
          onSearchInputChange = _props2.onSearchInputChange,
          className = _props2.className,
          currentLocale = _props2.currentLocale,
          areaCode = _props2.areaCode,
          countryCode = _props2.countryCode,
          brand = _props2.brand,
          showContactDisplayPlaceholder = _props2.showContactDisplayPlaceholder,
          formatPhone = _props2.formatPhone,
          onClickToSms = _props2.onClickToSms,
          onCreateContact = _props2.onCreateContact,
          createEntityTypes = _props2.createEntityTypes,
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
          onClickToDial = _props2.onClickToDial,
          disableLinks = _props2.disableLinks,
          disableClickToDial = _props2.disableClickToDial,
          dateTimeFormatter = _props2.dateTimeFormatter,
          calls = _props2.calls,
          active = _props2.active,
          renderContactName = _props2.renderContactName,
          renderExtraButton = _props2.renderExtraButton,
          contactDisplayStyle = _props2.contactDisplayStyle,
          activeContactDisplayStyle = _props2.activeContactDisplayStyle,
          currentLog = _props2.currentLog,
          additionalInfo = _props2.additionalInfo,
          onCloseLogSection = _props2.onCloseLogSection,
          onUpdateCallLog = _props2.onUpdateCallLog,
          onSaveCallLog = _props2.onSaveCallLog,
          renderEditLogSection = _props2.renderEditLogSection,
          renderSaveLogButton = _props2.renderSaveLogButton,
          logNotification = _props2.logNotification,
          onCloseNotification = _props2.onCloseNotification,
          onDiscardNotification = _props2.onDiscardNotification,
          onSaveNotification = _props2.onSaveNotification,
          onExpandNotification = _props2.onExpandNotification,
          showSaveLogBtn = _props2.showSaveLogBtn,
          showNotiLogButton = _props2.showNotiLogButton,
          sectionContainerStyles = _props2.sectionContainerStyles,
          sectionModalStyles = _props2.sectionModalStyles,
          notificationContainerStyles = _props2.notificationContainerStyles,
          externalViewEntity = _props2.externalViewEntity,
          externalHasEntity = _props2.externalHasEntity,
          readTextPermission = _props2.readTextPermission,
          children = _props2.children;


      if (showSpinner) {
        return _react2.default.createElement(_SpinnerOverlay2.default, null);
      }
      var isShowMessageIcon = readTextPermission && !!onClickToSms;
      var CallsListView = useNewList ? _react2.default.createElement(_CallListV2.default, {
        width: width,
        height: height,
        brand: brand,
        currentLocale: currentLocale,
        calls: calls,
        areaCode: areaCode,
        countryCode: countryCode,
        onViewContact: onViewContact,
        onCreateContact: onCreateContact,
        createEntityTypes: createEntityTypes,
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
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        renderContactName: renderContactName,
        renderExtraButton: renderExtraButton,
        contactDisplayStyle: contactDisplayStyle,
        externalViewEntity: externalViewEntity,
        externalHasEntity: externalHasEntity,
        readTextPermission: isShowMessageIcon
      }) : _react2.default.createElement(_CallList2.default, {
        brand: brand,
        currentLocale: currentLocale,
        calls: calls,
        areaCode: areaCode,
        countryCode: countryCode,
        onViewContact: onViewContact,
        onCreateContact: onCreateContact,
        createEntityTypes: createEntityTypes,
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
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        renderContactName: renderContactName,
        renderExtraButton: renderExtraButton,
        contactDisplayStyle: contactDisplayStyle,
        externalViewEntity: externalViewEntity,
        externalHasEntity: externalHasEntity,
        readTextPermission: isShowMessageIcon
      });

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
          createEntityTypes: createEntityTypes,
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
          phoneTypeRenderer: phoneTypeRenderer,
          phoneSourceNameRenderer: phoneSourceNameRenderer,
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
        {
          className: (0, _classnames2.default)(_styles2.default.list, className)
        },
        _react2.default.createElement(
          'div',
          { className: _styles2.default.listTitle },
          onlyHistory ? null : _i18n2.default.getString('historyCalls', currentLocale)
        ),
        CallsListView
      );

      var noCalls = otherDeviceCalls.length === 0 && _react2.default.createElement(
        'p',
        { className: _styles2.default.noCalls },
        _i18n2.default.getString('noCalls', currentLocale)
      );

      return _react2.default.createElement(
        'div',
        {
          className: (0, _classnames2.default)(_styles2.default.container, onSearchInputChange ? _styles2.default.containerWithSearch : null)
        },
        children,
        search,
        _react2.default.createElement(
          'div',
          {
            className: (0, _classnames2.default)(_styles2.default.root, currentLog && currentLog.showLog ? _styles2.default.hiddenScroll : '', className),
            ref: this._root
          },
          onlyHistory || getCallList(activeRingCalls, _i18n2.default.getString('ringCall', currentLocale)),
          onlyHistory || getCallList(activeCurrentCalls, _i18n2.default.getString('currentCall', currentLocale)),
          onlyHistory || getCallList(activeOnHoldCalls, _i18n2.default.getString('onHoldCall', currentLocale)),
          onlyHistory || getCallList(otherDeviceCalls, _i18n2.default.getString('otherDeviceCall', currentLocale)),
          calls.length > 0 ? historyCall : noCalls
        ),
        this.renderLogSection()
      );
    }
  }]);
  return CallsListPanel;
}(_react.Component);

exports.default = CallsListPanel;


CallsListPanel.propTypes = {
  useNewList: _propTypes2.default.bool,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
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
  createEntityTypes: _propTypes2.default.array,
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
  children: _propTypes2.default.node,
  onlyHistory: _propTypes2.default.bool
};

CallsListPanel.defaultProps = {
  useNewList: false,
  width: 300,
  height: 315,
  className: undefined,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  onCreateContact: undefined,
  createEntityTypes: undefined,
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
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
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
  children: null,
  onlyHistory: false
};
//# sourceMappingURL=index.js.map
