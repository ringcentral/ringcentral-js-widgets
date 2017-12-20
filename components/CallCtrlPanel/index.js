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

var _ActiveCallDialPad = require('../ActiveCallDialPad');

var _ActiveCallDialPad2 = _interopRequireDefault(_ActiveCallDialPad);

var _ActiveCallPanel = require('../ActiveCallPanel');

var _ActiveCallPanel2 = _interopRequireDefault(_ActiveCallPanel);

var _FlipPanel = require('../FlipPanel');

var _FlipPanel2 = _interopRequireDefault(_FlipPanel);

var _TransferPanel = require('../TransferPanel');

var _TransferPanel2 = _interopRequireDefault(_TransferPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallCtrlPanel = function (_Component) {
  (0, _inherits3.default)(CallCtrlPanel, _Component);

  function CallCtrlPanel(props) {
    (0, _classCallCheck3.default)(this, CallCtrlPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallCtrlPanel.__proto__ || (0, _getPrototypeOf2.default)(CallCtrlPanel)).call(this, props));

    _this.state = {
      isShowKeyPad: false,
      isShowFlipPanel: false
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
    return _this;
  }

  (0, _createClass3.default)(CallCtrlPanel, [{
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
          phoneTypeRenderer: this.props.phoneTypeRenderer
        });
      }
      return _react2.default.createElement(
        _ActiveCallPanel2.default,
        {
          backButtonLabel: this.props.backButtonLabel,
          currentLocale: this.props.currentLocale,
          formatPhone: this.props.formatPhone,
          phoneNumber: this.props.phoneNumber,
          sessionId: this.props.sessionId,
          callStatus: this.props.callStatus,
          startTime: this.props.startTime,
          isOnMute: this.props.isOnMute,
          isOnHold: this.props.isOnHold,
          recordStatus: this.props.recordStatus,
          onBackButtonClick: this.props.onBackButtonClick,
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
          flipNumbers: this.props.flipNumbers,
          calls: this.props.calls,
          sourceIcons: this.props.sourceIcons
        },
        this.props.children
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
  calls: _propTypes2.default.array.isRequired,
  recordStatus: _propTypes2.default.string.isRequired,
  onMute: _propTypes2.default.func.isRequired,
  onUnmute: _propTypes2.default.func.isRequired,
  onHold: _propTypes2.default.func.isRequired,
  onUnhold: _propTypes2.default.func.isRequired,
  onRecord: _propTypes2.default.func.isRequired,
  onStopRecord: _propTypes2.default.func.isRequired,
  onAdd: _propTypes2.default.func.isRequired,
  onPark: _propTypes2.default.func.isRequired,
  onHangup: _propTypes2.default.func.isRequired,
  onFlip: _propTypes2.default.func.isRequired,
  onTransfer: _propTypes2.default.func.isRequired,
  onBackButtonClick: _propTypes2.default.func.isRequired,
  onKeyPadChange: _propTypes2.default.func.isRequired,
  formatPhone: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  selectedMatcherIndex: _propTypes2.default.number.isRequired,
  onSelectMatcherName: _propTypes2.default.func.isRequired,
  avatarUrl: _propTypes2.default.string,
  backButtonLabel: _propTypes2.default.string,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  searchContactList: _propTypes2.default.array.isRequired,
  searchContact: _propTypes2.default.func.isRequired,
  phoneTypeRenderer: _propTypes2.default.func
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
  backButtonLabel: 'Active Calls',
  sessionId: undefined,
  callStatus: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined
};

exports.default = CallCtrlPanel;
//# sourceMappingURL=index.js.map
