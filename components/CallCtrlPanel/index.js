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

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _callCtrlLayouts = _interopRequireDefault(require("../../enums/callCtrlLayouts"));

var _ActiveCallDialPad = _interopRequireDefault(require("../ActiveCallDialPad"));

var _ActiveCallPanel = _interopRequireDefault(require("../ActiveCallPanel"));

var _FlipPanel = _interopRequireDefault(require("../FlipPanel"));

var _ConfirmMergeModal = _interopRequireDefault(require("../ConfirmMergeModal"));

var _SpinnerOverlay = _interopRequireDefault(require("../SpinnerOverlay"));

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

var CallCtrlPanel =
/*#__PURE__*/
function (_Component) {
  _inherits(CallCtrlPanel, _Component);

  function CallCtrlPanel(props) {
    var _this;

    _classCallCheck(this, CallCtrlPanel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CallCtrlPanel).call(this, props));
    _this.state = {
      isShowKeyPad: false,
      isShowFlipPanel: false,
      isShowMergeConfirm: false
    };

    _this.hiddenKeyPad = function () {
      _this.setState({
        isShowKeyPad: false
      });
    };

    _this.showKeyPad = function () {
      _this.setState({
        isShowKeyPad: true
      });
    };

    _this.showFlipPanel = function () {
      _this.setState({
        isShowFlipPanel: true
      });
    };

    _this.hideFlipPanel = function () {
      _this.setState({
        isShowFlipPanel: false
      });
    };

    _this.onTransfer = function () {
      _this.props.onTransfer(_this.props.sessionId);
    };

    _this.onMerge = function () {
      var onBeforeMerge = _this.props.onBeforeMerge;

      if (!onBeforeMerge || onBeforeMerge()) {
        if (_this.props.hasConferenceCall && _this.props.layout === _callCtrlLayouts["default"].normalCtrl) {
          _this.showMergeConfirm();
        } else if (_this.props.onMerge) {
          _this.props.onMerge();
        }
      } // track user click merge


      _this.props.afterOnMerge();
    };

    _this.showMergeConfirm = function () {
      _this.setState({
        isShowMergeConfirm: true
      });
    };

    _this.hideMergeConfirm = function () {
      _this.setState({
        isShowMergeConfirm: false
      });
    };

    _this.hideMergeConfirmAlt = function () {
      _this.hideMergeConfirm(); // user action track


      _this.props.afterHideMergeConfirm();
    };

    _this.confirmMerge = function () {
      _this.setState({
        isShowMergeConfirm: false
      });

      if (_this.props.onMerge) {
        _this.props.onMerge();
      } // user action track


      _this.props.afterConfirmMerge();
    };

    return _this;
  }

  _createClass(CallCtrlPanel, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.hasConferenceCall && this.state.isShowMergeConfirm) {
        this.hideMergeConfirm();
      }

      if (this.props.sessionId !== nextProps.sessionId) {
        this.hiddenKeyPad();
        this.hideFlipPanel();
        this.hideMergeConfirm();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          onKeyPadChange = _this$props.onKeyPadChange,
          actions = _this$props.actions,
          addDisabled = _this$props.addDisabled,
          areaCode = _this$props.areaCode,
          avatarUrl = _this$props.avatarUrl,
          backButtonLabel = _this$props.backButtonLabel,
          brand = _this$props.brand,
          callStatus = _this$props.callStatus,
          children = _this$props.children,
          conferenceCallEquipped = _this$props.conferenceCallEquipped,
          conferenceCallParties = _this$props.conferenceCallParties,
          controlBusy = _this$props.controlBusy,
          countryCode = _this$props.countryCode,
          currentLocale = _this$props.currentLocale,
          direction = _this$props.direction,
          fallBackName = _this$props.fallBackName,
          flipNumbers = _this$props.flipNumbers,
          formatPhone = _this$props.formatPhone,
          getAvatarUrl = _this$props.getAvatarUrl,
          gotoParticipantsCtrl = _this$props.gotoParticipantsCtrl,
          hasConferenceCall = _this$props.hasConferenceCall,
          isOnFlip = _this$props.isOnFlip,
          isOnHold = _this$props.isOnHold,
          isOnMute = _this$props.isOnMute,
          lastCallInfo = _this$props.lastCallInfo,
          layout = _this$props.layout,
          mergeDisabled = _this$props.mergeDisabled,
          nameMatches = _this$props.nameMatches,
          onAdd = _this$props.onAdd,
          onBackButtonClick = _this$props.onBackButtonClick,
          onFlip = _this$props.onFlip,
          onHangup = _this$props.onHangup,
          onHold = _this$props.onHold,
          onMute = _this$props.onMute,
          onPark = _this$props.onPark,
          onRecord = _this$props.onRecord,
          onSelectMatcherName = _this$props.onSelectMatcherName,
          onStopRecord = _this$props.onStopRecord,
          onUnhold = _this$props.onUnhold,
          onUnmute = _this$props.onUnmute,
          phoneNumber = _this$props.phoneNumber,
          phoneSourceNameRenderer = _this$props.phoneSourceNameRenderer,
          phoneTypeRenderer = _this$props.phoneTypeRenderer,
          recordStatus = _this$props.recordStatus,
          selectedMatcherIndex = _this$props.selectedMatcherIndex,
          sessionId = _this$props.sessionId,
          showBackButton = _this$props.showBackButton,
          showContactDisplayPlaceholder = _this$props.showContactDisplayPlaceholder,
          showSpinner = _this$props.showSpinner,
          sourceIcons = _this$props.sourceIcons,
          startTime = _this$props.startTime;
      var _this$state = this.state,
          isShowKeyPad = _this$state.isShowKeyPad,
          isShowFlipPanel = _this$state.isShowFlipPanel,
          isShowMergeConfirm = _this$state.isShowMergeConfirm;

      if (isShowKeyPad) {
        return _react["default"].createElement(_ActiveCallDialPad["default"], {
          onChange: onKeyPadChange,
          hiddenDialPad: this.hiddenKeyPad,
          onHangup: onHangup,
          currentLocale: currentLocale
        });
      }

      if (isShowFlipPanel) {
        return _react["default"].createElement(_FlipPanel["default"], {
          isOnFlip: isOnFlip,
          flipNumbers: flipNumbers,
          currentLocale: currentLocale,
          formatPhone: formatPhone,
          hideFlipPanel: this.hideFlipPanel,
          onFlip: onFlip,
          complete: onHangup
        });
      }

      return _react["default"].createElement(_ActiveCallPanel["default"], {
        showBackButton: showBackButton,
        backButtonLabel: backButtonLabel,
        onBackButtonClick: onBackButtonClick,
        currentLocale: currentLocale,
        formatPhone: formatPhone,
        phoneNumber: phoneNumber,
        sessionId: sessionId,
        callStatus: callStatus,
        startTime: startTime,
        isOnMute: isOnMute,
        isOnHold: isOnHold,
        recordStatus: recordStatus,
        onMute: onMute,
        onUnmute: onUnmute,
        onHold: onHold,
        onUnhold: onUnhold,
        onRecord: onRecord,
        onStopRecord: onStopRecord,
        onShowKeyPad: this.showKeyPad,
        onHangup: onHangup,
        onPark: onPark,
        onAdd: onAdd,
        onMerge: this.onMerge,
        nameMatches: nameMatches,
        fallBackName: fallBackName,
        areaCode: areaCode,
        countryCode: countryCode,
        selectedMatcherIndex: selectedMatcherIndex,
        onSelectMatcherName: onSelectMatcherName,
        avatarUrl: avatarUrl,
        brand: brand,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        onShowFlipPanel: this.showFlipPanel,
        onToggleTransferPanel: this.onTransfer,
        gotoParticipantsCtrl: gotoParticipantsCtrl,
        flipNumbers: flipNumbers,
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        layout: layout,
        direction: direction,
        addDisabled: addDisabled,
        mergeDisabled: mergeDisabled,
        conferenceCallEquipped: conferenceCallEquipped,
        hasConferenceCall: hasConferenceCall,
        conferenceCallParties: conferenceCallParties,
        lastCallInfo: lastCallInfo,
        getAvatarUrl: getAvatarUrl,
        actions: actions,
        controlBusy: controlBusy
      }, children, showSpinner ? _react["default"].createElement(_SpinnerOverlay["default"], null) : null, layout === _callCtrlLayouts["default"].normalCtrl ? _react["default"].createElement(_ConfirmMergeModal["default"], {
        currentLocale: currentLocale,
        show: isShowMergeConfirm,
        onMerge: this.confirmMerge,
        onCancel: this.hideMergeConfirmAlt,
        partyProfiles: conferenceCallParties
      }) : null);
    }
  }]);

  return CallCtrlPanel;
}(_react.Component);

CallCtrlPanel.propTypes = {
  callStatus: _propTypes["default"].string,
  sessionId: _propTypes["default"].string,
  phoneNumber: _propTypes["default"].string,
  nameMatches: _propTypes["default"].array.isRequired,
  fallBackName: _propTypes["default"].string.isRequired,
  currentLocale: _propTypes["default"].string.isRequired,
  startTime: _propTypes["default"].number,
  isOnMute: _propTypes["default"].bool,
  isOnHold: _propTypes["default"].bool,
  isOnFlip: _propTypes["default"].bool,
  flipNumbers: _propTypes["default"].array,
  recordStatus: _propTypes["default"].string,
  onMute: _propTypes["default"].func.isRequired,
  onUnmute: _propTypes["default"].func.isRequired,
  onHold: _propTypes["default"].func.isRequired,
  onUnhold: _propTypes["default"].func.isRequired,
  onRecord: _propTypes["default"].func,
  onStopRecord: _propTypes["default"].func,
  onAdd: _propTypes["default"].func,
  onMerge: _propTypes["default"].func,
  onBeforeMerge: _propTypes["default"].func,
  onPark: _propTypes["default"].func,
  onHangup: _propTypes["default"].func.isRequired,
  onFlip: _propTypes["default"].func,
  onTransfer: _propTypes["default"].func.isRequired,
  showBackButton: _propTypes["default"].bool,
  backButtonLabel: _propTypes["default"].string,
  onBackButtonClick: _propTypes["default"].func,
  onKeyPadChange: _propTypes["default"].func,
  formatPhone: _propTypes["default"].func.isRequired,
  children: _propTypes["default"].node,
  areaCode: _propTypes["default"].string.isRequired,
  countryCode: _propTypes["default"].string.isRequired,
  selectedMatcherIndex: _propTypes["default"].number.isRequired,
  onSelectMatcherName: _propTypes["default"].func,
  avatarUrl: _propTypes["default"].string,
  brand: _propTypes["default"].string,
  showContactDisplayPlaceholder: _propTypes["default"].bool,
  sourceIcons: _propTypes["default"].object,
  phoneTypeRenderer: _propTypes["default"].func,
  phoneSourceNameRenderer: _propTypes["default"].func,
  layout: _propTypes["default"].string.isRequired,
  showSpinner: _propTypes["default"].bool,
  direction: _propTypes["default"].string,
  addDisabled: _propTypes["default"].bool,
  mergeDisabled: _propTypes["default"].bool,
  conferenceCallEquipped: _propTypes["default"].bool,
  hasConferenceCall: _propTypes["default"].bool,
  lastCallInfo: _propTypes["default"].object,
  conferenceCallParties: _propTypes["default"].array,
  getAvatarUrl: _propTypes["default"].func,
  gotoParticipantsCtrl: _propTypes["default"].func,
  afterHideMergeConfirm: _propTypes["default"].func,
  afterConfirmMerge: _propTypes["default"].func,
  afterOnMerge: _propTypes["default"].func,
  actions: _propTypes["default"].array,
  controlBusy: _propTypes["default"].bool
};
CallCtrlPanel.defaultProps = {
  startTime: null,
  isOnMute: false,
  isOnHold: false,
  isOnFlip: false,
  flipNumbers: [],
  phoneNumber: null,
  children: undefined,
  avatarUrl: null,
  showBackButton: false,
  backButtonLabel: 'Active Calls',
  onBackButtonClick: null,
  sessionId: undefined,
  callStatus: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  onAdd: undefined,
  onMerge: undefined,
  onBeforeMerge: undefined,
  showSpinner: false,
  direction: null,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  conferenceCallParties: undefined,
  lastCallInfo: undefined,
  getAvatarUrl: function getAvatarUrl() {
    return null;
  },
  gotoParticipantsCtrl: function gotoParticipantsCtrl(i) {
    return i;
  },
  afterHideMergeConfirm: function afterHideMergeConfirm() {
    return null;
  },
  afterConfirmMerge: function afterConfirmMerge() {
    return null;
  },
  afterOnMerge: function afterOnMerge() {
    return null;
  },
  onFlip: function onFlip() {
    return null;
  },
  onRecord: function onRecord() {
    return null;
  },
  onStopRecord: function onStopRecord() {
    return null;
  },
  onPark: function onPark() {
    return null;
  },
  onKeyPadChange: function onKeyPadChange() {
    return null;
  },
  onSelectMatcherName: function onSelectMatcherName() {
    return null;
  },
  actions: [],
  recordStatus: '',
  controlBusy: false
};
var _default = CallCtrlPanel;
exports["default"] = _default;
//# sourceMappingURL=index.js.map
