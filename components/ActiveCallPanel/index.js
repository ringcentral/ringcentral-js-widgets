'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _DurationCounter = require('../DurationCounter');

var _DurationCounter2 = _interopRequireDefault(_DurationCounter);

var _ActiveCallPad = require('../ActiveCallPad');

var _ActiveCallPad2 = _interopRequireDefault(_ActiveCallPad);

var _ContactDisplay = require('../ContactDisplay');

var _ContactDisplay2 = _interopRequireDefault(_ContactDisplay);

var _DynamicsFont = require('../../assets/DynamicsFont/DynamicsFont.scss');

var _DynamicsFont2 = _interopRequireDefault(_DynamicsFont);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function CallInfo(props) {
  var avatar = void 0;
  if (props.avatarUrl) {
    avatar = _react2.default.createElement('img', { src: props.avatarUrl, alt: 'avatar' });
  } else {
    avatar = _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.portrait, _styles2.default.icon) });
  }
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.userInfo },
    _react2.default.createElement(
      'div',
      { className: _styles2.default.avatarContainer },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.avatar },
        avatar
      )
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.userName },
      _react2.default.createElement(_ContactDisplay2.default, {
        className: _styles2.default.contactDisplay,
        selectClassName: _styles2.default.dropdown,
        contactMatches: props.nameMatches,
        phoneNumber: props.phoneNumber,
        fallBackName: props.fallBackName,
        currentLocale: props.currentLocale,
        areaCode: props.areaCode,
        countryCode: props.countryCode,
        showType: false,
        disabled: false,
        selected: props.selectedMatcherIndex,
        onSelectContact: props.onSelectMatcherName,
        isLogging: false,
        enableContactFallback: true,
        brand: props.brand,
        showPlaceholder: props.showContactDisplayPlaceholder,
        sourceIcons: props.sourceIcons
      })
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.userPhoneNumber },
      props.formatPhone(props.phoneNumber)
    )
  );
}

CallInfo.propTypes = {
  phoneNumber: _propTypes2.default.string,
  formatPhone: _propTypes2.default.func.isRequired,
  nameMatches: _propTypes2.default.array.isRequired,
  fallBackName: _propTypes2.default.string.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  selectedMatcherIndex: _propTypes2.default.number.isRequired,
  onSelectMatcherName: _propTypes2.default.func.isRequired,
  avatarUrl: _propTypes2.default.string,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object
};

CallInfo.defaultProps = {
  phoneNumber: null,
  avatarUrl: null,
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined
};

function ActiveCallPanel(_ref) {
  var onBackButtonClick = _ref.onBackButtonClick,
      backButtonLabel = _ref.backButtonLabel,
      currentLocale = _ref.currentLocale,
      nameMatches = _ref.nameMatches,
      fallBackName = _ref.fallBackName,
      phoneNumber = _ref.phoneNumber,
      formatPhone = _ref.formatPhone,
      startTime = _ref.startTime,
      startTimeOffset = _ref.startTimeOffset,
      areaCode = _ref.areaCode,
      countryCode = _ref.countryCode,
      selectedMatcherIndex = _ref.selectedMatcherIndex,
      onSelectMatcherName = _ref.onSelectMatcherName,
      avatarUrl = _ref.avatarUrl,
      isOnMute = _ref.isOnMute,
      isOnHold = _ref.isOnHold,
      recordStatus = _ref.recordStatus,
      onMute = _ref.onMute,
      onUnmute = _ref.onUnmute,
      onHold = _ref.onHold,
      onUnhold = _ref.onUnhold,
      onRecord = _ref.onRecord,
      onStopRecord = _ref.onStopRecord,
      onShowKeyPad = _ref.onShowKeyPad,
      onHangup = _ref.onHangup,
      onPark = _ref.onPark,
      onAdd = _ref.onAdd,
      onShowFlipPanel = _ref.onShowFlipPanel,
      onToggleTransferPanel = _ref.onToggleTransferPanel,
      children = _ref.children,
      showContactDisplayPlaceholder = _ref.showContactDisplayPlaceholder,
      brand = _ref.brand,
      flipNumbers = _ref.flipNumbers,
      calls = _ref.calls,
      sourceIcons = _ref.sourceIcons;

  var timeCounter = startTime ? _react2.default.createElement(
    'span',
    { className: _styles2.default.timeCounter },
    _react2.default.createElement(_DurationCounter2.default, { startTime: startTime, offset: startTimeOffset })
  ) : null;
  var backHeader = calls.length > 1 ? _react2.default.createElement(_BackHeader2.default, {
    onBackClick: onBackButtonClick,
    backButton: _react2.default.createElement(
      'span',
      { className: _styles2.default.backButton },
      _react2.default.createElement('i', { className: (0, _classnames2.default)(_DynamicsFont2.default.arrow, _styles2.default.backIcon) }),
      _react2.default.createElement(
        'span',
        { className: _styles2.default.backLabel },
        backButtonLabel
      )
    )
  }) : _react2.default.createElement(_BackHeader2.default, { className: _styles2.default.hidden });
  return _react2.default.createElement(
    'div',
    { className: _styles2.default.root },
    backHeader,
    _react2.default.createElement(
      _Panel2.default,
      { className: _styles2.default.panel },
      timeCounter,
      _react2.default.createElement(CallInfo, {
        currentLocale: currentLocale,
        nameMatches: nameMatches,
        fallBackName: fallBackName,
        phoneNumber: phoneNumber,
        formatPhone: formatPhone,
        startTime: startTime,
        areaCode: areaCode,
        countryCode: countryCode,
        selectedMatcherIndex: selectedMatcherIndex,
        onSelectMatcherName: onSelectMatcherName,
        avatarUrl: avatarUrl,
        brand: brand,
        showContactDisplayPlaceholder: showContactDisplayPlaceholder,
        sourceIcons: sourceIcons
      }),
      _react2.default.createElement(_ActiveCallPad2.default, {
        className: _styles2.default.callPad,
        currentLocale: currentLocale,
        isOnMute: isOnMute,
        isOnHold: isOnHold,
        recordStatus: recordStatus,
        onMute: onMute,
        onUnmute: onUnmute,
        onHold: onHold,
        onUnhold: onUnhold,
        onRecord: onRecord,
        onStopRecord: onStopRecord,
        onShowKeyPad: onShowKeyPad,
        onHangup: onHangup,
        onAdd: onAdd,
        onShowFlipPanel: onShowFlipPanel,
        onToggleTransferPanel: onToggleTransferPanel,
        flipNumbers: flipNumbers,
        onPark: onPark
      }),
      children
    )
  );
}

ActiveCallPanel.propTypes = {
  phoneNumber: _propTypes2.default.string,
  nameMatches: _propTypes2.default.array.isRequired,
  fallBackName: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  startTime: _propTypes2.default.number,
  startTimeOffset: _propTypes2.default.number,
  isOnMute: _propTypes2.default.bool,
  isOnHold: _propTypes2.default.bool,
  recordStatus: _propTypes2.default.string.isRequired,
  onMute: _propTypes2.default.func.isRequired,
  onUnmute: _propTypes2.default.func.isRequired,
  onHold: _propTypes2.default.func.isRequired,
  onUnhold: _propTypes2.default.func.isRequired,
  onRecord: _propTypes2.default.func.isRequired,
  onStopRecord: _propTypes2.default.func.isRequired,
  onAdd: _propTypes2.default.func.isRequired,
  onHangup: _propTypes2.default.func.isRequired,
  onPark: _propTypes2.default.func.isRequired,
  onBackButtonClick: _propTypes2.default.func.isRequired,
  onShowKeyPad: _propTypes2.default.func.isRequired,
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
  onShowFlipPanel: _propTypes2.default.func,
  flipNumbers: _propTypes2.default.array,
  calls: _propTypes2.default.array.isRequired,
  onToggleTransferPanel: _propTypes2.default.func,
  sourceIcons: _propTypes2.default.object
};

ActiveCallPanel.defaultProps = {
  startTime: null,
  startTimeOffset: 0,
  isOnMute: false,
  isOnHold: false,
  phoneNumber: null,
  children: undefined,
  avatarUrl: null,
  backButtonLabel: 'Active Calls',
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
  flipNumbers: [],
  onShowFlipPanel: function onShowFlipPanel() {
    return null;
  },
  onToggleTransferPanel: function onToggleTransferPanel() {
    return null;
  },
  sourceIcons: undefined
};

exports.default = ActiveCallPanel;
//# sourceMappingURL=index.js.map
