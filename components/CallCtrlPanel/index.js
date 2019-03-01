"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
        if (_this.props.hasConferenceCall && _this.props.layout === _callCtrlLayouts.default.normalCtrl) {
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
      if (this.state.isShowKeyPad) {
        return _react.default.createElement(_ActiveCallDialPad.default, {
          onChange: this.props.onKeyPadChange,
          hiddenDialPad: this.hiddenKeyPad,
          onHangup: this.props.onHangup,
          currentLocale: this.props.currentLocale
        });
      }

      if (this.state.isShowFlipPanel) {
        return _react.default.createElement(_FlipPanel.default, {
          isOnFlip: this.props.isOnFlip,
          flipNumbers: this.props.flipNumbers,
          currentLocale: this.props.currentLocale,
          formatPhone: this.props.formatPhone,
          hideFlipPanel: this.hideFlipPanel,
          onFlip: this.props.onFlip,
          complete: this.props.onHangup
        });
      }

      return _react.default.createElement(_ActiveCallPanel.default, {
        showBackButton: this.props.showBackButton,
        backButtonLabel: this.props.backButtonLabel,
        onBackButtonClick: this.props.onBackButtonClick,
        currentLocale: this.props.currentLocale,
        formatPhone: this.props.formatPhone,
        phoneNumber: this.props.phoneNumber,
        sessionId: this.props.sessionId,
        callStatus: this.props.callStatus,
        startTime: this.props.startTime,
        isOnMute: this.props.isOnMute,
        isOnHold: this.props.isOnHold,
        recordStatus: this.props.recordStatus,
        onMute: this.props.onMute,
        onUnmute: this.props.onUnmute,
        onHold: this.props.onHold,
        onUnhold: this.props.onUnhold,
        onRecord: this.props.onRecord,
        onStopRecord: this.props.onStopRecord,
        onShowKeyPad: this.showKeyPad,
        onHangup: this.props.onHangup,
        onPark: this.props.onPark,
        onAdd: this.props.onAdd,
        onMerge: this.onMerge,
        nameMatches: this.props.nameMatches,
        fallBackName: this.props.fallBackName,
        areaCode: this.props.areaCode,
        countryCode: this.props.countryCode,
        selectedMatcherIndex: this.props.selectedMatcherIndex,
        onSelectMatcherName: this.props.onSelectMatcherName,
        avatarUrl: this.props.avatarUrl,
        brand: this.props.brand,
        showContactDisplayPlaceholder: this.props.showContactDisplayPlaceholder,
        onShowFlipPanel: this.showFlipPanel,
        onToggleTransferPanel: this.onTransfer,
        gotoParticipantsCtrl: this.props.gotoParticipantsCtrl,
        flipNumbers: this.props.flipNumbers,
        sourceIcons: this.props.sourceIcons,
        phoneTypeRenderer: this.props.phoneTypeRenderer,
        phoneSourceNameRenderer: this.props.phoneSourceNameRenderer,
        layout: this.props.layout,
        direction: this.props.direction,
        addDisabled: this.props.addDisabled,
        mergeDisabled: this.props.mergeDisabled,
        conferenceCallEquipped: this.props.conferenceCallEquipped,
        hasConferenceCall: this.props.hasConferenceCall,
        conferenceCallParties: this.props.conferenceCallParties,
        lastCallInfo: this.props.lastCallInfo,
        getAvatarUrl: this.props.getAvatarUrl,
        actions: this.props.actions
      }, this.props.children, this.props.showSpinner ? _react.default.createElement(_SpinnerOverlay.default, null) : null, this.props.layout === _callCtrlLayouts.default.normalCtrl ? _react.default.createElement(_ConfirmMergeModal.default, {
        currentLocale: this.props.currentLocale,
        show: this.state.isShowMergeConfirm,
        onMerge: this.confirmMerge,
        onCancel: this.hideMergeConfirmAlt,
        partyProfiles: this.props.conferenceCallParties
      }) : null);
    }
  }]);

  return CallCtrlPanel;
}(_react.Component);

CallCtrlPanel.propTypes = {
  callStatus: _propTypes.default.string,
  sessionId: _propTypes.default.string,
  phoneNumber: _propTypes.default.string,
  nameMatches: _propTypes.default.array.isRequired,
  fallBackName: _propTypes.default.string.isRequired,
  currentLocale: _propTypes.default.string.isRequired,
  startTime: _propTypes.default.number,
  isOnMute: _propTypes.default.bool,
  isOnHold: _propTypes.default.bool,
  isOnFlip: _propTypes.default.bool,
  flipNumbers: _propTypes.default.array,
  recordStatus: _propTypes.default.string,
  onMute: _propTypes.default.func.isRequired,
  onUnmute: _propTypes.default.func.isRequired,
  onHold: _propTypes.default.func.isRequired,
  onUnhold: _propTypes.default.func.isRequired,
  onRecord: _propTypes.default.func,
  onStopRecord: _propTypes.default.func,
  onAdd: _propTypes.default.func,
  onMerge: _propTypes.default.func,
  onBeforeMerge: _propTypes.default.func,
  onPark: _propTypes.default.func,
  onHangup: _propTypes.default.func.isRequired,
  onFlip: _propTypes.default.func,
  onTransfer: _propTypes.default.func.isRequired,
  showBackButton: _propTypes.default.bool,
  backButtonLabel: _propTypes.default.string,
  onBackButtonClick: _propTypes.default.func,
  onKeyPadChange: _propTypes.default.func,
  formatPhone: _propTypes.default.func.isRequired,
  children: _propTypes.default.node,
  areaCode: _propTypes.default.string.isRequired,
  countryCode: _propTypes.default.string.isRequired,
  selectedMatcherIndex: _propTypes.default.number.isRequired,
  onSelectMatcherName: _propTypes.default.func,
  avatarUrl: _propTypes.default.string,
  brand: _propTypes.default.string,
  showContactDisplayPlaceholder: _propTypes.default.bool,
  sourceIcons: _propTypes.default.object,
  phoneTypeRenderer: _propTypes.default.func,
  phoneSourceNameRenderer: _propTypes.default.func,
  layout: _propTypes.default.string.isRequired,
  showSpinner: _propTypes.default.bool,
  direction: _propTypes.default.string,
  addDisabled: _propTypes.default.bool,
  mergeDisabled: _propTypes.default.bool,
  conferenceCallEquipped: _propTypes.default.bool,
  hasConferenceCall: _propTypes.default.bool,
  lastCallInfo: _propTypes.default.object,
  conferenceCallParties: _propTypes.default.array,
  getAvatarUrl: _propTypes.default.func,
  gotoParticipantsCtrl: _propTypes.default.func,
  afterHideMergeConfirm: _propTypes.default.func,
  afterConfirmMerge: _propTypes.default.func,
  afterOnMerge: _propTypes.default.func,
  actions: _propTypes.default.array
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
  recordStatus: ''
};
var _default = CallCtrlPanel;
exports.default = _default;
//# sourceMappingURL=index.js.map
