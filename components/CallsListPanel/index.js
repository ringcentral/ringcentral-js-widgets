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
      sourceIcons = _ref.sourceIcons;

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
        sourceIcons: sourceIcons
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
  sourceIcons: _propTypes2.default.object
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
  sourceIcons: undefined
};

var ActiveCallsPanel = function (_Component) {
  (0, _inherits3.default)(ActiveCallsPanel, _Component);

  function ActiveCallsPanel() {
    (0, _classCallCheck3.default)(this, ActiveCallsPanel);
    return (0, _possibleConstructorReturn3.default)(this, (ActiveCallsPanel.__proto__ || (0, _getPrototypeOf2.default)(ActiveCallsPanel)).apply(this, arguments));
  }

  (0, _createClass3.default)(ActiveCallsPanel, [{
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
    key: 'render',
    value: function render() {
      var _props = this.props,
          activeRingCalls = _props.activeRingCalls,
          activeOnHoldCalls = _props.activeOnHoldCalls,
          activeCurrentCalls = _props.activeCurrentCalls,
          otherDeviceCalls = _props.otherDeviceCalls,
          showSpinner = _props.showSpinner,
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
          active = _props.active;

      if (showSpinner) {
        return _react2.default.createElement(_SpinnerOverlay2.default, null);
      }
      if (!this.hasCalls()) {
        return _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)(_styles2.default.root, className) },
          _react2.default.createElement(
            'p',
            { className: _styles2.default.noCalls },
            _i18n2.default.getString('noCalls', currentLocale)
          )
        );
      }
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
          sourceIcons: sourceIcons
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
          sourceIcons: sourceIcons
        })
      );
      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)(_styles2.default.root, className) },
        getCallList(activeRingCalls, _i18n2.default.getString('ringCall', currentLocale)),
        getCallList(activeCurrentCalls, _i18n2.default.getString('currentCall', currentLocale)),
        getCallList(activeOnHoldCalls, _i18n2.default.getString('onHoldCall', currentLocale)),
        getCallList(otherDeviceCalls, _i18n2.default.getString('otherDeviceCall', currentLocale)),
        calls.length > 0 ? historyCall : null
      );
    }
  }]);
  return ActiveCallsPanel;
}(_react.Component);

exports.default = ActiveCallsPanel;


ActiveCallsPanel.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  className: _propTypes2.default.string,
  activeRingCalls: _propTypes2.default.array.isRequired,
  activeOnHoldCalls: _propTypes2.default.array.isRequired,
  activeCurrentCalls: _propTypes2.default.array.isRequired,
  otherDeviceCalls: _propTypes2.default.array.isRequired,
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
  active: _propTypes2.default.bool
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
  enableContactFallback: undefined,
  loggingMap: {},
  autoLog: false,
  onCallsEmpty: undefined,
  sourceIcons: undefined,
  onClickToDial: undefined,
  disableClickToDial: false,
  active: false
};
//# sourceMappingURL=index.js.map
