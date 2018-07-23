'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _callCtrlLayouts = require('../../enums/callCtrlLayouts');

var _callCtrlLayouts2 = _interopRequireDefault(_callCtrlLayouts);

var _ActiveCallDialPad = require('../ActiveCallDialPad');

var _ActiveCallDialPad2 = _interopRequireDefault(_ActiveCallDialPad);

var _ActiveCallPanel = require('../ActiveCallPanel');

var _ActiveCallPanel2 = _interopRequireDefault(_ActiveCallPanel);

var _FlipPanel = require('../FlipPanel');

var _FlipPanel2 = _interopRequireDefault(_FlipPanel);

var _TransferPanel = require('../TransferPanel');

var _TransferPanel2 = _interopRequireDefault(_TransferPanel);

var _ConfirmMergeModal = require('../ConfirmMergeModal');

var _ConfirmMergeModal2 = _interopRequireDefault(_ConfirmMergeModal);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallCtrlPanel = function (_Component) {
  (0, _inherits3.default)(CallCtrlPanel, _Component);

  function CallCtrlPanel(props) {
    (0, _classCallCheck3.default)(this, CallCtrlPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallCtrlPanel.__proto__ || (0, _getPrototypeOf2.default)(CallCtrlPanel)).call(this, props));

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

    _this.toggleTransferPanel = function () {
      _this.setState(function (prevState) {
        return {
          isShowTransferPanel: !prevState.isShowTransferPanel
        };
      });
    };
    _this.onMerge = function () {
      if (_this.props.hasConferenceCall && _this.props.layout === _callCtrlLayouts2.default.normalCtrl) {
        _this.showMergeConfirm();
      } else if (_this.props.onMerge) {
        _this.props.onMerge();
      }
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

    _this.confirmMerge = function () {
      _this.hideMergeConfirm();
      if (_this.props.onMerge) {
        _this.props.onMerge();
      }
    };

    _this.onOpenPartiesModal = function () {
      // TODO:
    };
    return _this;
  }

  (0, _createClass3.default)(CallCtrlPanel, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (!nextProps.hasConferenceCall && this.state.isShowMergeConfirm) {
        this.hideMergeConfirm();
      }
    }
  }, {
    key: 'render',
    value: function render() {
      if (this.state.isShowKeyPad) {
        return _react2.default.createElement(_ActiveCallDialPad2.default, {
          onChange: this.props.onKeyPadChange,
          hiddenDialPad: this.hiddenKeyPad,
          onHangup: this.props.onHangup,
          currentLocale: this.props.currentLocale
        });
      }
      if (this.state.isShowFlipPanel) {
        return _react2.default.createElement(_FlipPanel2.default, {
          isOnFlip: this.props.isOnFlip,
          flipNumbers: this.props.flipNumbers,
          currentLocale: this.props.currentLocale,
          formatPhone: this.props.formatPhone,
          hideFlipPanel: this.hideFlipPanel,
          onFlip: this.props.onFlip,
          complete: this.props.onHangup
        });
      }
      if (this.state.isShowTransferPanel) {
        return _react2.default.createElement(_TransferPanel2.default, {
          onTransfer: this.props.onTransfer,
          currentLocale: this.props.currentLocale,
          toggleTransferPanel: this.toggleTransferPanel,
          isOnTransfer: this.props.isOnTransfer,
          searchContactList: this.props.searchContactList,
          searchContact: this.props.searchContact,
          formatPhone: this.props.formatPhone,
          phoneTypeRenderer: this.props.phoneTypeRenderer,
          recipientsContactInfoRenderer: this.props.recipientsContactInfoRenderer,
          recipientsContactPhoneRenderer: this.props.recipientsContactPhoneRenderer
        });
      }
      return _react2.default.createElement(
        _ActiveCallPanel2.default,
        {
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
          onToggleTransferPanel: this.toggleTransferPanel,
          onOpenPartiesModal: this.onOpenPartiesModal,
          flipNumbers: this.props.flipNumbers,
          sourceIcons: this.props.sourceIcons,
          layout: this.props.layout,
          direction: this.props.direction,
          addDisabled: this.props.addDisabled,
          mergeDisabled: this.props.mergeDisabled,
          conferenceCallEquipped: this.props.conferenceCallEquipped,
          hasConferenceCall: this.props.hasConferenceCall,
          conferenceCallParties: this.props.conferenceCallParties,
          lastCallInfo: this.props.lastCallInfo,
          onLastCallEnded: this.props.onLastCallEnded
        },
        this.props.children,
        this.props.showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : null,
        this.props.layout === _callCtrlLayouts2.default.normalCtrl ? _react2.default.createElement(_ConfirmMergeModal2.default, {
          currentLocale: this.props.currentLocale,
          show: this.state.isShowMergeConfirm,
          onMerge: this.confirmMerge,
          onCancel: this.hideMergeConfirm,
          partyProfiles: this.props.conferenceCallParties
        }) : null
      );
    }
  }]);
  return CallCtrlPanel;
}(_react.Component);

CallCtrlPanel.propTypes = {
  callStatus: _propTypes2.default.string,
  sessionId: _propTypes2.default.string,
  phoneNumber: _propTypes2.default.string,
  nameMatches: _propTypes2.default.array.isRequired,
  fallBackName: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  startTime: _propTypes2.default.number,
  isOnMute: _propTypes2.default.bool,
  isOnHold: _propTypes2.default.bool,
  isOnFlip: _propTypes2.default.bool,
  isOnTransfer: _propTypes2.default.bool,
  flipNumbers: _propTypes2.default.array,
  recordStatus: _propTypes2.default.string.isRequired,
  onMute: _propTypes2.default.func.isRequired,
  onUnmute: _propTypes2.default.func.isRequired,
  onHold: _propTypes2.default.func.isRequired,
  onUnhold: _propTypes2.default.func.isRequired,
  onRecord: _propTypes2.default.func.isRequired,
  onStopRecord: _propTypes2.default.func.isRequired,
  onAdd: _propTypes2.default.func,
  onMerge: _propTypes2.default.func,
  onPark: _propTypes2.default.func.isRequired,
  onHangup: _propTypes2.default.func.isRequired,
  onFlip: _propTypes2.default.func.isRequired,
  onTransfer: _propTypes2.default.func.isRequired,
  showBackButton: _propTypes2.default.bool,
  backButtonLabel: _propTypes2.default.string,
  onBackButtonClick: _propTypes2.default.func,
  onKeyPadChange: _propTypes2.default.func.isRequired,
  formatPhone: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  selectedMatcherIndex: _propTypes2.default.number.isRequired,
  onSelectMatcherName: _propTypes2.default.func.isRequired,
  avatarUrl: _propTypes2.default.string,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  searchContactList: _propTypes2.default.array.isRequired,
  searchContact: _propTypes2.default.func.isRequired,
  phoneTypeRenderer: _propTypes2.default.func,
  recipientsContactInfoRenderer: _propTypes2.default.func,
  recipientsContactPhoneRenderer: _propTypes2.default.func,
  layout: _propTypes2.default.string.isRequired,
  showSpinner: _propTypes2.default.bool,
  direction: _propTypes2.default.string,
  addDisabled: _propTypes2.default.bool,
  mergeDisabled: _propTypes2.default.bool,
  conferenceCallEquipped: _propTypes2.default.bool,
  hasConferenceCall: _propTypes2.default.bool,
  lastCallInfo: _propTypes2.default.object,
  onLastCallEnded: _propTypes2.default.func,
  conferenceCallParties: _propTypes2.default.array
};

CallCtrlPanel.defaultProps = {
  startTime: null,
  isOnMute: false,
  isOnHold: false,
  isOnTransfer: false,
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
  recipientsContactInfoRenderer: undefined,
  recipientsContactPhoneRenderer: undefined,
  onAdd: undefined,
  onMerge: undefined,
  showSpinner: false,
  direction: null,
  addDisabled: false,
  mergeDisabled: false,
  conferenceCallEquipped: false,
  hasConferenceCall: false,
  conferenceCallParties: undefined,
  lastCallInfo: undefined,
  onLastCallEnded: undefined
};

exports.default = CallCtrlPanel;
//# sourceMappingURL=index.js.map
