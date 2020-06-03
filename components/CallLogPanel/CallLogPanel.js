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

var _classnames = _interopRequireDefault(require("classnames"));

var _react = _interopRequireWildcard(require("react"));

var _lib = require("../../lib");

var _BackHeaderV = _interopRequireDefault(require("../BackHeaderV2"));

var _LogBasicInfoV = _interopRequireDefault(require("../LogBasicInfoV2"));

var _NotificationSection = _interopRequireDefault(require("../NotificationSection"));

var _NotificationSectionV = _interopRequireDefault(require("../NotificationSectionV2"));

var _SpinnerOverlay = require("../SpinnerOverlay");

var _i18n = _interopRequireDefault(require("./i18n"));

var _styles = _interopRequireDefault(require("./styles.scss"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

var CallLogPanel = /*#__PURE__*/function (_Component) {
  _inherits(CallLogPanel, _Component);

  var _super = _createSuper(CallLogPanel);

  function CallLogPanel() {
    var _this;

    _classCallCheck(this, CallLogPanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    _this.editSectionRef = /*#__PURE__*/_react["default"].createRef();

    _this.editSectionScrollBy = function (top) {
      _this.editSectionRef.current.scrollBy({
        top: top,
        behavior: 'smooth'
      });
    };

    return _this;
  }

  _createClass(CallLogPanel, [{
    key: "componentWillMount",
    // TODO: use react function component to refactor with react hook
    // eslint-disable-next-line react/no-deprecated
    value: function componentWillMount() {
      var pushLogPageStatus = this.props.pushLogPageStatus;

      if (pushLogPageStatus) {
        pushLogPageStatus(true);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var pushLogPageStatus = this.props.pushLogPageStatus;

      if (pushLogPageStatus) {
        pushLogPageStatus(false);
      }
    }
  }, {
    key: "renderLogSection",
    value: function renderLogSection() {
      var _this$props = this.props,
          currentLog = _this$props.currentLog,
          renderEditLogSection = _this$props.renderEditLogSection;
      if (!currentLog) return null;
      var showSpinner = this.props.showSpinner;

      if (currentLog.showSpinner || showSpinner) {
        return /*#__PURE__*/_react["default"].createElement(_SpinnerOverlay.SpinnerOverlay, {
          className: _styles["default"].spinner
        });
      }

      return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, this.renderLogNotification(), this.renderLogBasicInfo(), /*#__PURE__*/_react["default"].createElement("div", {
        ref: this.editSectionRef,
        className: _styles["default"].editSection
      }, renderEditLogSection && this.getEditLogSection()), this.genCallControlButtons());
    }
  }, {
    key: "genCallControlButtons",
    value: function genCallControlButtons() {
      var _this$props2 = this.props,
          currentLog = _this$props2.currentLog,
          _this$props2$classes$ = _this$props2.classes.callLogCallControl,
          callLogCallControl = _this$props2$classes$ === void 0 ? null : _this$props2$classes$,
          callLogCallControlRef = _this$props2.refs.callLogCallControl,
          renderCallLogCallControl = _this$props2.renderCallLogCallControl,
          isWide = _this$props2.isWide,
          showSmallCallControl = _this$props2.showSmallCallControl;
      var call = currentLog.call;
      var telephonyStatus = call.telephonyStatus,
          result = call.result,
          telephonySessionId = call.telephonySessionId;
      var status = telephonyStatus || result; // if `result` is exist, call has been disconnect
      // 'showSmallCallControl || isActive' can be replaced with 'showSmallCallControl'
      // which include showSmallCallControl permission and isActive judgement(eg: canShowSmallCallControl && isActive) on UI module in the future
      // Then we can remove the logic from component to UI module like 'engage-voice-widget/modules/EvActivityCallUI/EvActivityCallUI'

      var isActive = !result;

      if (showSmallCallControl || isActive) {
        return /*#__PURE__*/_react["default"].createElement("div", {
          ref: callLogCallControlRef,
          className: (0, _classnames["default"])(_styles["default"].callControlRoot, callLogCallControl)
        }, renderCallLogCallControl && renderCallLogCallControl(status, telephonySessionId, isWide));
      }

      return null;
    }
  }, {
    key: "getEditLogSection",
    value: function getEditLogSection() {
      var _this$props3 = this.props,
          renderEditLogSection = _this$props3.renderEditLogSection,
          currentLocale = _this$props3.currentLocale,
          onSaveCallLog = _this$props3.onSaveCallLog,
          onUpdateCallLog = _this$props3.onUpdateCallLog,
          onSelectViewVisible = _this$props3.onSelectViewVisible,
          currentLog = _this$props3.currentLog,
          additionalInfo = _this$props3.additionalInfo,
          subjectDropdownsTracker = _this$props3.subjectDropdownsTracker,
          contactSearch = _this$props3.contactSearch,
          onBackClick = _this$props3.onBackClick,
          showFoundFromServer = _this$props3.showFoundFromServer,
          appName = _this$props3.appName,
          isSearching = _this$props3.isSearching,
          startAdornmentRender = _this$props3.startAdornmentRender;
      return renderEditLogSection({
        currentLocale: currentLocale,
        onSaveCallLog: onSaveCallLog,
        onUpdateCallLog: onUpdateCallLog,
        onSelectViewVisible: onSelectViewVisible,
        currentLog: currentLog,
        additionalInfo: additionalInfo,
        subjectDropdownsTracker: subjectDropdownsTracker,
        contactSearch: contactSearch,
        onBackClick: onBackClick,
        showFoundFromServer: showFoundFromServer,
        appName: appName,
        isSearching: isSearching,
        editSectionScrollBy: this.editSectionScrollBy,
        startAdornmentRender: startAdornmentRender
      });
    }
  }, {
    key: "renderLogBasicInfo",
    value: function renderLogBasicInfo() {
      var _this$props4 = this.props,
          isWide = _this$props4.isWide,
          currentLog = _this$props4.currentLog,
          currentLocale = _this$props4.currentLocale,
          formatPhone = _this$props4.formatPhone,
          dateTimeFormatter = _this$props4.dateTimeFormatter,
          renderBasicInfo = _this$props4.renderBasicInfo;

      if (renderBasicInfo) {
        return renderBasicInfo({
          formatPhone: formatPhone,
          dateTimeFormatter: dateTimeFormatter,
          currentLog: currentLog
        });
      }

      return /*#__PURE__*/_react["default"].createElement(_LogBasicInfoV["default"], {
        dataSign: "leftSectionInfo",
        isWide: isWide,
        currentLog: currentLog,
        currentLocale: currentLocale,
        formatPhone: formatPhone,
        dateTimeFormatter: dateTimeFormatter
      });
    }
  }, {
    key: "genSaveLogButtonV2",
    value: function genSaveLogButtonV2() {
      var _this$props5 = this.props,
          renderSaveLogButton = _this$props5.renderSaveLogButton,
          currentLocale = _this$props5.currentLocale,
          onSaveCallLog = _this$props5.onSaveCallLog,
          currentLog = _this$props5.currentLog,
          isWide = _this$props5.isWide,
          showSpinner = _this$props5.showSpinner;
      var loading = showSpinner || currentLog && currentLog.showSpinner;
      return renderSaveLogButton({
        currentLocale: currentLocale,
        onSaveCallLog: onSaveCallLog,
        currentLog: currentLog,
        loading: loading,
        isWide: isWide
      });
    }
  }, {
    key: "renderLogNotification",
    value: function renderLogNotification() {
      var _this$props6 = this.props,
          formatPhone = _this$props6.formatPhone,
          currentLocale = _this$props6.currentLocale,
          logNotification = _this$props6.logNotification,
          onCloseNotification = _this$props6.onCloseNotification,
          onSaveNotification = _this$props6.onSaveNotification,
          onExpandNotification = _this$props6.onExpandNotification,
          onDiscardNotification = _this$props6.onDiscardNotification,
          currentNotificationIdentify = _this$props6.currentNotificationIdentify,
          currentSession = _this$props6.currentSession,
          onReject = _this$props6.onReject,
          onHangup = _this$props6.onHangup,
          shrinkNotification = _this$props6.shrinkNotification,
          disableLinks = _this$props6.disableLinks,
          useNewNotification = _this$props6.useNewNotification,
          showNotiLogButton = _this$props6.showNotiLogButton;

      if (!currentNotificationIdentify) {
        return null;
      }

      if (useNewNotification) {
        return /*#__PURE__*/_react["default"].createElement(_NotificationSectionV["default"], {
          formatPhone: formatPhone,
          currentLocale: currentLocale,
          logNotification: logNotification,
          showNotiLogButton: showNotiLogButton,
          onCloseNotification: onCloseNotification,
          onSaveNotification: onSaveNotification,
          onExpandNotification: onExpandNotification,
          onDiscardNotification: onDiscardNotification,
          currentNotificationIdentify: currentNotificationIdentify,
          currentSession: currentSession,
          onReject: onReject,
          onHangup: onHangup,
          shrinkNotification: shrinkNotification
        });
      }

      return /*#__PURE__*/_react["default"].createElement(_NotificationSection["default"], {
        formatPhone: formatPhone,
        currentLocale: currentLocale,
        logNotification: logNotification,
        showNotiLogButton: showNotiLogButton,
        onCloseNotification: onCloseNotification,
        onSaveNotification: onSaveNotification,
        onExpandNotification: onExpandNotification,
        onDiscardNotification: onDiscardNotification,
        currentNotificationIdentify: currentNotificationIdentify,
        currentSession: currentSession,
        onReject: onReject,
        onHangup: onHangup,
        disableLinks: disableLinks
      });
    }
  }, {
    key: "goBack",
    value: function goBack() {
      var goBack = this.props.goBack;
      goBack();
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props7 = this.props,
          currentIdentify = _this$props7.currentIdentify,
          currentLocale = _this$props7.currentLocale,
          root = _this$props7.classes.root,
          rootRef = _this$props7.refs.root,
          backIcon = _this$props7.backIcon,
          header = _this$props7.header,
          isInTransferPage = _this$props7.isInTransferPage,
          isWide = _this$props7.isWide;
      if (!currentIdentify || isInTransferPage) return null; // console.log(this.props.currentLog);

      return /*#__PURE__*/_react["default"].createElement("div", {
        ref: rootRef,
        className: (0, _classnames["default"])(_styles["default"].root, !isWide ? _styles["default"].classic : null, root)
      }, header && /*#__PURE__*/_react["default"].createElement(_BackHeaderV["default"], {
        currentLocale: currentLocale,
        backIcon: backIcon,
        isWide: isWide,
        rightIcon: this.genSaveLogButtonV2(),
        title: _i18n["default"].getString('createCallLog', currentLocale),
        className: _styles["default"].header,
        onBackClick: function onBackClick() {
          return _this2.goBack();
        }
      }), this.renderLogSection());
    }
  }]);

  return CallLogPanel;
}(_react.Component);

exports["default"] = CallLogPanel;
CallLogPanel.defaultProps = {
  currentLog: {
    nameEntities: [],
    relatedToEntities: [],
    associatedEntities: []
  },
  currentIdentify: '',
  currentLocale: _lib.environment.defaultLocale,
  classes: {},
  refs: {},
  // Notification
  currentNotificationIdentify: '',
  shrinkNotification: function shrinkNotification() {
    return null;
  },
  header: true,
  showSmallCallControl: false,
  isInTransferPage: false,
  showSpinner: true,
  isWide: true,
  showNotiLogButton: true,
  disableLinks: false,
  useNewNotification: false,
  contactSearch: null,
  showFoundFromServer: false,
  isSearching: false
};
//# sourceMappingURL=CallLogPanel.js.map
