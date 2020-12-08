"use strict";

require("core-js/modules/web.dom.iterable");

require("core-js/modules/es6.array.iterator");

require("core-js/modules/es6.string.iterator");

require("core-js/modules/es6.weak-map");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es7.symbol.async-iterator");

require("core-js/modules/es6.symbol");

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.object.create");

require("core-js/modules/es6.regexp.to-string");

require("core-js/modules/es6.date.to-string");

require("core-js/modules/es6.object.to-string");

require("core-js/modules/es6.reflect.construct");

require("core-js/modules/es6.object.set-prototype-of");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _classnames = _interopRequireDefault(require("classnames"));

var _SpinnerOverlay = require("../SpinnerOverlay");

var _ActiveCallList = _interopRequireDefault(require("../ActiveCallList"));

var _styles = _interopRequireDefault(require("./styles.scss"));

var _i18n = _interopRequireDefault(require("./i18n"));

var _InsideModal = _interopRequireDefault(require("../InsideModal"));

var _LogSection = _interopRequireDefault(require("../LogSection"));

var _LogNotification = _interopRequireDefault(require("../LogNotification"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var ActiveCallsPanel = /*#__PURE__*/function (_Component) {
  _inherits(ActiveCallsPanel, _Component);

  var _super = _createSuper(ActiveCallsPanel);

  function ActiveCallsPanel() {
    _classCallCheck(this, ActiveCallsPanel);

    return _super.apply(this, arguments);
  }

  _createClass(ActiveCallsPanel, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (!this.hasCalls(this.props) && typeof this.props.onCallsEmpty === 'function') {
        this.props.onCallsEmpty();
      }
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (this.hasCalls(this.props) && !this.hasCalls(nextProps) && typeof this.props.onCallsEmpty === 'function') {
        this.props.onCallsEmpty();
      }
    }
  }, {
    key: "hasCalls",
    value: function hasCalls() {
      var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
      return props.activeRingCalls.length > 0 || props.activeOnHoldCalls.length > 0 || props.activeCurrentCalls.length > 0 || props.otherDeviceCalls.length > 0;
    }
  }, {
    key: "renderLogSection",
    value: function renderLogSection() {
      if (!this.props.currentLog) return null;
      var _this$props = this.props,
          formatPhone = _this$props.formatPhone,
          currentLocale = _this$props.currentLocale,
          currentLog = _this$props.currentLog,
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
          notificationContainerStyles = _this$props.notificationContainerStyles,
          onLogBasicInfoClick = _this$props.onLogBasicInfoClick,
          renderSmallCallContrl = _this$props.renderSmallCallContrl;
      return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_InsideModal["default"], {
        title: currentLog.title,
        show: currentLog.showLog,
        onClose: onCloseLogSection,
        clickOutToClose: false,
        maskStyle: _styles["default"].maskStyle // containerStyles={sectionContainerStyles}
        // modalStyles={sectionModalStyles}

      }, /*#__PURE__*/_react["default"].createElement(_LogSection["default"], {
        currentLocale: currentLocale,
        currentLog: currentLog,
        formatPhone: formatPhone // additionalInfo={additionalInfo}
        ,
        isInnerMask: logNotification && logNotification.notificationIsExpand // save call log
        ,
        renderEditLogSection: renderEditLogSection,
        showSaveLogBtn: true,
        onUpdateCallLog: onUpdateCallLog,
        onSaveCallLog: onSaveCallLog,
        renderSaveLogButton: renderSaveLogButton // active call ctrl
        ,
        onLogBasicInfoClick: onLogBasicInfoClick,
        renderSmallCallContrl: renderSmallCallContrl
      })), logNotification ? /*#__PURE__*/_react["default"].createElement(_InsideModal["default"], {
        show: logNotification.showNotification,
        showTitle: false,
        containerStyles: (0, _classnames["default"])(_styles["default"].notificationContainer, notificationContainerStyles),
        modalStyles: _styles["default"].notificationModal,
        contentStyle: _styles["default"].notificationContent,
        onClose: onCloseNotification
      }, /*#__PURE__*/_react["default"].createElement(_LogNotification["default"], {
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
    key: "getCallList",
    value: function getCallList(calls, title) {
      var showCallDetail = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var _this$props2 = this.props,
          currentLocale = _this$props2.currentLocale,
          areaCode = _this$props2.areaCode,
          countryCode = _this$props2.countryCode,
          brand = _this$props2.brand,
          showContactDisplayPlaceholder = _this$props2.showContactDisplayPlaceholder,
          formatPhone = _this$props2.formatPhone,
          onClickToSms = _this$props2.onClickToSms,
          onCreateContact = _this$props2.onCreateContact,
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
          activeCurrentCalls = _this$props2.activeCurrentCalls,
          isWebRTC = _this$props2.isWebRTC,
          isSessionAConferenceCall = _this$props2.isSessionAConferenceCall,
          onCallItemClick = _this$props2.onCallItemClick,
          showAvatar = _this$props2.showAvatar,
          getAvatarUrl = _this$props2.getAvatarUrl,
          conferenceCallParties = _this$props2.conferenceCallParties,
          webphoneHold = _this$props2.webphoneHold,
          webphoneSwitchCall = _this$props2.webphoneSwitchCall,
          modalConfirm = _this$props2.modalConfirm,
          modalClose = _this$props2.modalClose,
          useV2 = _this$props2.useV2,
          updateSessionMatchedContact = _this$props2.updateSessionMatchedContact,
          renderExtraButton = _this$props2.renderExtraButton,
          renderContactName = _this$props2.renderContactName,
          ringoutHangup = _this$props2.ringoutHangup,
          ringoutTransfer = _this$props2.ringoutTransfer,
          ringoutReject = _this$props2.ringoutReject,
          disableLinks = _this$props2.disableLinks,
          showRingoutCallControl = _this$props2.showRingoutCallControl,
          showSwitchCall = _this$props2.showSwitchCall,
          showTransferCall = _this$props2.showTransferCall,
          showHoldOnOtherDevice = _this$props2.showHoldOnOtherDevice,
          isOnHold = _this$props2.isOnHold,
          webphoneIgnore = _this$props2.webphoneIgnore,
          showIgnoreBtn = _this$props2.showIgnoreBtn,
          showHoldAnswerBtn = _this$props2.showHoldAnswerBtn,
          useCallDetailV2 = _this$props2.useCallDetailV2,
          newCallIcon = _this$props2.newCallIcon;
      return /*#__PURE__*/_react["default"].createElement(_ActiveCallList["default"], {
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
        webphoneSwitchCall: webphoneSwitchCall,
        webphoneIgnore: webphoneIgnore,
        modalConfirm: modalConfirm,
        modalClose: modalClose,
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
        ,
        onCallItemClick: onCallItemClick,
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
        showRingoutCallControl: showRingoutCallControl,
        showSwitchCall: showSwitchCall,
        showTransferCall: showTransferCall,
        showHoldOnOtherDevice: showHoldOnOtherDevice,
        isOnHold: isOnHold,
        showIgnoreBtn: showIgnoreBtn,
        showHoldAnswerBtn: showHoldAnswerBtn,
        useCallDetailV2: useCallDetailV2,
        newCallIcon: newCallIcon
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props3 = this.props,
          activeRingCalls = _this$props3.activeRingCalls,
          activeOnHoldCalls = _this$props3.activeOnHoldCalls,
          activeCurrentCalls = _this$props3.activeCurrentCalls,
          otherDeviceCalls = _this$props3.otherDeviceCalls,
          className = _this$props3.className,
          currentLocale = _this$props3.currentLocale,
          showSpinner = _this$props3.showSpinner,
          showOtherDevice = _this$props3.showOtherDevice,
          showCallDetail = _this$props3.showCallDetail;
      var logSection = this.renderLogSection();

      if (!this.hasCalls()) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          "data-sign": "activeCalls",
          className: (0, _classnames["default"])(_styles["default"].root, className)
        }, /*#__PURE__*/_react["default"].createElement("p", {
          className: _styles["default"].noCalls
        }, _i18n["default"].getString('noActiveCalls', currentLocale)), logSection, showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, {
          className: _styles["default"].spinner
        }) : null);
      }

      var otherDevice = showOtherDevice ? this.getCallList(otherDeviceCalls, _i18n["default"].getString('otherDeviceCall', currentLocale), true) : null;
      return /*#__PURE__*/_react["default"].createElement("div", {
        "data-sign": "activeCalls",
        className: _styles["default"].root
      }, /*#__PURE__*/_react["default"].createElement("div", {
        className: (0, _classnames["default"])(_styles["default"].root, className),
        ref: function ref(target) {
          _this.container = target;
        }
      }, this.getCallList(activeRingCalls, _i18n["default"].getString('ringCall', currentLocale), showCallDetail), this.getCallList(activeCurrentCalls, _i18n["default"].getString('currentCall', currentLocale), showCallDetail), this.getCallList(activeOnHoldCalls, _i18n["default"].getString('onHoldCall', currentLocale), showCallDetail), otherDevice), logSection, showSpinner ? /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, {
        className: _styles["default"].spinner
      }) : null);
    }
  }]);

  return ActiveCallsPanel;
}(_react.Component);

exports["default"] = ActiveCallsPanel;
ActiveCallsPanel.propTypes = {
  currentLocale: _propTypes["default"].string.isRequired,
  className: _propTypes["default"].string,
  activeRingCalls: _propTypes["default"].array.isRequired,
  activeOnHoldCalls: _propTypes["default"].array.isRequired,
  activeCurrentCalls: _propTypes["default"].array.isRequired,
  otherDeviceCalls: _propTypes["default"].array.isRequired,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  brand: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  formatPhone: _propTypes["default"].func.isRequired,
  onClickToSms: _propTypes["default"].func,
  onCreateContact: _propTypes["default"].func,
  outboundSmsPermission: _propTypes["default"].bool,
  internalSmsPermission: _propTypes["default"].bool,
  isLoggedContact: _propTypes["default"].func,
  onLogCall: _propTypes["default"].func,
  webphoneAnswer: _propTypes["default"].func,
  webphoneReject: _propTypes["default"].func,
  webphoneHangup: _propTypes["default"].func,
  webphoneResume: _propTypes["default"].func,
  webphoneToVoicemail: _propTypes["default"].func,
  webphoneSwitchCall: _propTypes["default"].func,
  webphoneIgnore: _propTypes["default"].func,
  modalConfirm: _propTypes["default"].func,
  modalClose: _propTypes["default"].func,
  autoLog: _propTypes["default"].bool,
  onViewContact: _propTypes["default"].func,
  enableContactFallback: _propTypes["default"].bool,
  loggingMap: _propTypes["default"].object,
  onCallsEmpty: _propTypes["default"].func,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  isWebRTC: _propTypes["default"].bool.isRequired,
  showSpinner: _propTypes["default"].bool,
  isSessionAConferenceCall: _propTypes["default"].func,
  onCallItemClick: _propTypes["default"].func,
  getAvatarUrl: _propTypes["default"].func,
  conferenceCallParties: _propTypes["default"].arrayOf(_propTypes["default"].object),
  webphoneHold: _propTypes["default"].func,
  useV2: _propTypes["default"].bool,
  updateSessionMatchedContact: _propTypes["default"].func,
  isOnHold: _propTypes["default"].func.isRequired,
  // CallLog related
  currentLog: _propTypes["default"].object,
  renderEditLogSection: _propTypes["default"].func,
  renderSaveLogButton: _propTypes["default"].func,
  renderExtraButton: _propTypes["default"].func,
  onSaveCallLog: _propTypes["default"].func,
  onUpdateCallLog: _propTypes["default"].func,
  onCloseLogSection: _propTypes["default"].func,
  // - Notification
  logNotification: _propTypes["default"].object,
  onCloseNotification: _propTypes["default"].func,
  onDiscardNotification: _propTypes["default"].func,
  onSaveNotification: _propTypes["default"].func,
  onExpandNotification: _propTypes["default"].func,
  showNotiLogButton: _propTypes["default"].bool,
  notificationContainerStyles: _propTypes["default"].string,
  // Contact
  showAvatar: _propTypes["default"].bool,
  renderContactName: _propTypes["default"].func,
  showOtherDevice: _propTypes["default"].bool,
  ringoutHangup: _propTypes["default"].func,
  ringoutTransfer: _propTypes["default"].func,
  ringoutReject: _propTypes["default"].func,
  disableLinks: _propTypes["default"].bool,
  showRingoutCallControl: _propTypes["default"].bool,
  showSwitchCall: _propTypes["default"].bool,
  showTransferCall: _propTypes["default"].bool,
  showHoldOnOtherDevice: _propTypes["default"].bool,
  onLogBasicInfoClick: _propTypes["default"].func,
  renderSmallCallContrl: _propTypes["default"].func,
  // customization
  showCallDetail: _propTypes["default"].bool,
  showIgnoreBtn: _propTypes["default"].bool,
  showHoldAnswerBtn: _propTypes["default"].bool,
  useCallDetailV2: _propTypes["default"].bool,
  newCallIcon: _propTypes["default"].bool
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
  webphoneSwitchCall: undefined,
  webphoneIgnore: undefined,
  modalConfirm: undefined,
  modalClose: undefined,
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
  getAvatarUrl: undefined,
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
  showSwitchCall: false,
  showTransferCall: true,
  showHoldOnOtherDevice: false,
  onLogBasicInfoClick: function onLogBasicInfoClick() {},
  renderSmallCallContrl: function renderSmallCallContrl() {},
  // customization
  showCallDetail: false,
  showIgnoreBtn: false,
  showHoldAnswerBtn: false,
  useCallDetailV2: false,
  newCallIcon: false
};
//# sourceMappingURL=index.js.map
