"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.object.set-prototype-of");

require("core-js/modules/es6.array.map");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

var _ActiveCallItem = _interopRequireDefault(require("../ActiveCallItem"));

var _CallListV = _interopRequireDefault(require("../CallListV2"));

var _CallList = _interopRequireDefault(require("../CallList"));

var _InsideModal = _interopRequireDefault(require("../InsideModal"));

var _LogSection = _interopRequireDefault(require("../LogSection"));

var _LogNotification = _interopRequireDefault(require("../LogNotification"));

var _SearchInput = _interopRequireDefault(require("../SearchInput"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

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

  return _react["default"].createElement("div", {
    className: (0, _classnames["default"])(_styles["default"].list, className)
  }, _react["default"].createElement("div", {
    className: _styles["default"].listTitle
  }, title), calls.map(function (call) {
    return _react["default"].createElement(_ActiveCallItem["default"], {
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
  }));
}

ActiveCallList.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  title: _propTypes["default"].string.isRequired,
  calls: _propTypes["default"].array.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  brand: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  formatPhone: _propTypes["default"].func.isRequired,
  onClickToSms: _propTypes["default"].func,
  onCreateContact: _propTypes["default"].func,
  createEntityTypes: _propTypes["default"].array,
  onViewContact: _propTypes["default"].func,
  outboundSmsPermission: _propTypes["default"].bool,
  internalSmsPermission: _propTypes["default"].bool,
  isLoggedContact: _propTypes["default"].func,
  onLogCall: _propTypes["default"].func,
  loggingMap: _propTypes["default"].object,
  webphoneAnswer: _propTypes["default"].func,
  webphoneReject: _propTypes["default"].func,
  webphoneHangup: _propTypes["default"].func,
  webphoneResume: _propTypes["default"].func,
  webphoneToVoicemail: _propTypes["default"].func,
  enableContactFallback: _propTypes["default"].bool,
  autoLog: _propTypes["default"].bool,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool,
  renderContactName: _propTypes["default"].func,
  renderExtraButton: _propTypes["default"].func,
  contactDisplayStyle: _propTypes["default"].string,
  externalViewEntity: _propTypes["default"].func,
  externalHasEntity: _propTypes["default"].func,
  readTextPermission: _propTypes["default"].bool
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

var CallsListPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(CallsListPanel, _Component);

  function CallsListPanel() {
    _classCallCheck(this, CallsListPanel);

    return _possibleConstructorReturn(this, _getPrototypeOf(CallsListPanel).apply(this, arguments));
  }

  _createClass(CallsListPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.hasCalls(this.props) && typeof this.props.onCallsEmpty === 'function') {
        this.props.onCallsEmpty();
      }
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (this.hasCalls(this.props) && !this.hasCalls(nextProps) && typeof this.props.onCallsEmpty === 'function') {
        this.props.onCallsEmpty();
      }
    }
  }, {
    key: "hasCalls",
    value: function hasCalls() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      return props.activeRingCalls.length > 0 || props.activeOnHoldCalls.length > 0 || props.activeCurrentCalls.length > 0 || props.otherDeviceCalls.length > 0 || props.calls.length > 0;
    }
  }, {
    key: "renderLogSection",
    value: function renderLogSection() {
      if (!this.props.currentLog) return null;
      var _this$props = this.props,
          formatPhone = _this$props.formatPhone,
          currentLocale = _this$props.currentLocale,
          currentLog = _this$props.currentLog,
          sectionContainerStyles = _this$props.sectionContainerStyles,
          sectionModalStyles = _this$props.sectionModalStyles,
          additionalInfo = _this$props.additionalInfo,
          showSaveLogBtn = _this$props.showSaveLogBtn,
          renderEditLogSection = _this$props.renderEditLogSection,
          renderSaveLogButton = _this$props.renderSaveLogButton,
          onSaveCallLog = _this$props.onSaveCallLog,
          onUpdateCallLog = _this$props.onUpdateCallLog,
          onCloseLogSection = _this$props.onCloseLogSection,
          logNotification = _this$props.logNotification,
          showNotiLogButton = _this$props.showNotiLogButton,
          onCloseNotification = _this$props.onCloseNotification,
          onSaveNotification = _this$props.onSaveNotification,
          onExpandNotification = _this$props.onExpandNotification,
          onDiscardNotification = _this$props.onDiscardNotification,
          notificationContainerStyles = _this$props.notificationContainerStyles;
      return _react["default"].createElement("div", null, _react["default"].createElement(_InsideModal["default"], {
        title: currentLog.title,
        show: currentLog.showLog,
        onClose: onCloseLogSection,
        clickOutToClose: false,
        containerStyles: sectionContainerStyles,
        modalStyles: sectionModalStyles,
        maskStyle: _styles["default"].maskStyle
      }, _react["default"].createElement(_LogSection["default"], {
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
      })), logNotification ? _react["default"].createElement(_InsideModal["default"], {
        show: logNotification.showNotification,
        showTitle: false,
        containerStyles: (0, _classnames["default"])(_styles["default"].notificationContainer, notificationContainerStyles),
        modalStyles: _styles["default"].notificationModal,
        contentStyle: _styles["default"].notificationContent,
        onClose: onCloseNotification
      }, _react["default"].createElement(_LogNotification["default"], {
        showLogButton: showNotiLogButton,
        currentLocale: currentLocale,
        formatPhone: formatPhone,
        currentLog: logNotification,
        isExpand: logNotification.notificationIsExpand,
        onSave: onSaveNotification,
        onExpand: onExpandNotification,
        onDiscard: onDiscardNotification,
        onStay: onCloseNotification
      })) : null);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          useNewList = _this$props2.useNewList,
          width = _this$props2.width,
          height = _this$props2.height,
          onlyHistory = _this$props2.onlyHistory,
          activeRingCalls = _this$props2.activeRingCalls,
          activeOnHoldCalls = _this$props2.activeOnHoldCalls,
          activeCurrentCalls = _this$props2.activeCurrentCalls,
          otherDeviceCalls = _this$props2.otherDeviceCalls,
          showSpinner = _this$props2.showSpinner,
          searchInput = _this$props2.searchInput,
          onSearchInputChange = _this$props2.onSearchInputChange,
          className = _this$props2.className,
          currentLocale = _this$props2.currentLocale,
          areaCode = _this$props2.areaCode,
          countryCode = _this$props2.countryCode,
          brand = _this$props2.brand,
          showContactDisplayPlaceholder = _this$props2.showContactDisplayPlaceholder,
          formatPhone = _this$props2.formatPhone,
          onClickToSms = _this$props2.onClickToSms,
          onCreateContact = _this$props2.onCreateContact,
          createEntityTypes = _this$props2.createEntityTypes,
          onViewContact = _this$props2.onViewContact,
          outboundSmsPermission = _this$props2.outboundSmsPermission,
          internalSmsPermission = _this$props2.internalSmsPermission,
          isLoggedContact = _this$props2.isLoggedContact,
          onLogCall = _this$props2.onLogCall,
          autoLog = _this$props2.autoLog,
          loggingMap = _this$props2.loggingMap,
          webphoneAnswer = _this$props2.webphoneAnswer,
          webphoneReject = _this$props2.webphoneReject,
          webphoneHangup = _this$props2.webphoneHangup,
          webphoneResume = _this$props2.webphoneResume,
          enableContactFallback = _this$props2.enableContactFallback,
          webphoneToVoicemail = _this$props2.webphoneToVoicemail,
          sourceIcons = _this$props2.sourceIcons,
          phoneTypeRenderer = _this$props2.phoneTypeRenderer,
          phoneSourceNameRenderer = _this$props2.phoneSourceNameRenderer,
          onClickToDial = _this$props2.onClickToDial,
          disableLinks = _this$props2.disableLinks,
          disableClickToDial = _this$props2.disableClickToDial,
          dateTimeFormatter = _this$props2.dateTimeFormatter,
          calls = _this$props2.calls,
          active = _this$props2.active,
          renderContactName = _this$props2.renderContactName,
          renderExtraButton = _this$props2.renderExtraButton,
          contactDisplayStyle = _this$props2.contactDisplayStyle,
          activeContactDisplayStyle = _this$props2.activeContactDisplayStyle,
          currentLog = _this$props2.currentLog,
          additionalInfo = _this$props2.additionalInfo,
          onCloseLogSection = _this$props2.onCloseLogSection,
          onUpdateCallLog = _this$props2.onUpdateCallLog,
          onSaveCallLog = _this$props2.onSaveCallLog,
          renderEditLogSection = _this$props2.renderEditLogSection,
          renderSaveLogButton = _this$props2.renderSaveLogButton,
          logNotification = _this$props2.logNotification,
          onCloseNotification = _this$props2.onCloseNotification,
          onDiscardNotification = _this$props2.onDiscardNotification,
          onSaveNotification = _this$props2.onSaveNotification,
          onExpandNotification = _this$props2.onExpandNotification,
          showSaveLogBtn = _this$props2.showSaveLogBtn,
          showNotiLogButton = _this$props2.showNotiLogButton,
          sectionContainerStyles = _this$props2.sectionContainerStyles,
          sectionModalStyles = _this$props2.sectionModalStyles,
          notificationContainerStyles = _this$props2.notificationContainerStyles,
          externalViewEntity = _this$props2.externalViewEntity,
          externalHasEntity = _this$props2.externalHasEntity,
          readTextPermission = _this$props2.readTextPermission,
          children = _this$props2.children;

      if (showSpinner) {
        return _react["default"].createElement(_SpinnerOverlay["default"], null);
      }

      var isShowMessageIcon = readTextPermission && !!onClickToSms;
      var CallsListView = useNewList ? _react["default"].createElement(_CallListV["default"], {
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
      }) : _react["default"].createElement(_CallList["default"], {
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
      var search = onSearchInputChange ? _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].searchContainer)
      }, _react["default"].createElement(_SearchInput["default"], {
        key: "100",
        className: _styles["default"].searchInput,
        value: searchInput,
        onChange: onSearchInputChange,
        placeholder: _i18n["default"].getString('searchPlaceholder', currentLocale),
        disabled: disableLinks
      })) : null;

      var getCallList = function getCallList(calls, title) {
        return _react["default"].createElement(ActiveCallList, {
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

      var historyCall = showSpinner ? _react["default"].createElement(_SpinnerOverlay["default"], null) : _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].list, className)
      }, _react["default"].createElement("div", {
        className: _styles["default"].listTitle
      }, onlyHistory ? null : _i18n["default"].getString('historyCalls', currentLocale)), CallsListView);

      var noCalls = otherDeviceCalls.length === 0 && _react["default"].createElement("p", {
        className: _styles["default"].noCalls
      }, _i18n["default"].getString('noCalls', currentLocale));

      return _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].container, onSearchInputChange ? _styles["default"].containerWithSearch : null)
      }, children, search, _react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, currentLog && currentLog.showLog ? _styles["default"].hiddenScroll : '', className),
        ref: this._root
      }, onlyHistory || getCallList(activeRingCalls, _i18n["default"].getString('ringCall', currentLocale)), onlyHistory || getCallList(activeCurrentCalls, _i18n["default"].getString('currentCall', currentLocale)), onlyHistory || getCallList(activeOnHoldCalls, _i18n["default"].getString('onHoldCall', currentLocale)), onlyHistory || getCallList(otherDeviceCalls, _i18n["default"].getString('otherDeviceCall', currentLocale)), calls.length > 0 ? historyCall : noCalls), this.renderLogSection());
    }
  }]);

  return CallsListPanel;
}(_react.Component);

exports["default"] = CallsListPanel;
CallsListPanel.propTypes = {
  useNewList: _propTypes["default"].bool,
  width: _propTypes["default"].number,
  height: _propTypes["default"].number,
  currentLocale: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  activeRingCalls: _propTypes["default"].array.isRequired,
  activeOnHoldCalls: _propTypes["default"].array.isRequired,
  activeCurrentCalls: _propTypes["default"].array.isRequired,
  otherDeviceCalls: _propTypes["default"].array.isRequired,
  onSearchInputChange: _propTypes["default"].func,
  searchInput: _propTypes["default"].string,
  showSpinner: _propTypes["default"].bool.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  brand: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  formatPhone: _propTypes["default"].func.isRequired,
  onClickToSms: _propTypes["default"].func,
  onCreateContact: _propTypes["default"].func,
  createEntityTypes: _propTypes["default"].array,
  outboundSmsPermission: _propTypes["default"].bool,
  internalSmsPermission: _propTypes["default"].bool,
  isLoggedContact: _propTypes["default"].func,
  onLogCall: _propTypes["default"].func,
  webphoneAnswer: _propTypes["default"].func,
  webphoneReject: _propTypes["default"].func,
  webphoneHangup: _propTypes["default"].func,
  webphoneResume: _propTypes["default"].func,
  webphoneToVoicemail: _propTypes["default"].func,
  autoLog: _propTypes["default"].bool,
  onViewContact: _propTypes["default"].func,
  enableContactFallback: _propTypes["default"].bool,
  loggingMap: _propTypes["default"].object,
  onCallsEmpty: _propTypes["default"].func,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  calls: _propTypes["default"].arrayOf(_propTypes["default"].any).isRequired,
  onClickToDial: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool.isRequired,
  disableClickToDial: _propTypes["default"].bool,
  dateTimeFormatter: _propTypes["default"].func.isRequired,
  active: _propTypes["default"].bool,
  renderContactName: _propTypes["default"].func,
  renderExtraButton: _propTypes["default"].func,
  contactDisplayStyle: _propTypes["default"].string,
  activeContactDisplayStyle: _propTypes["default"].string,
  currentLog: _propTypes["default"].object,
  additionalInfo: _propTypes["default"].object,
  onCloseLogSection: _propTypes["default"].func,
  onUpdateCallLog: _propTypes["default"].func,
  onSaveCallLog: _propTypes["default"].func,
  renderEditLogSection: _propTypes["default"].func,
  renderSaveLogButton: _propTypes["default"].func,
  logNotification: _propTypes["default"].object,
  onCloseNotification: _propTypes["default"].func,
  onDiscardNotification: _propTypes["default"].func,
  onSaveNotification: _propTypes["default"].func,
  onExpandNotification: _propTypes["default"].func,
  showSaveLogBtn: _propTypes["default"].bool,
  showNotiLogButton: _propTypes["default"].bool,
  sectionContainerStyles: _propTypes["default"].string,
  sectionModalStyles: _propTypes["default"].string,
  notificationContainerStyles: _propTypes["default"].string,
  externalViewEntity: _propTypes["default"].func,
  externalHasEntity: _propTypes["default"].func,
  readTextPermission: _propTypes["default"].bool,
  children: _propTypes["default"].node,
  onlyHistory: _propTypes["default"].bool
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
  contactDisplayStyle: _styles["default"].contactDisplay,
  activeContactDisplayStyle: _styles["default"].activeContactDisplay,
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
