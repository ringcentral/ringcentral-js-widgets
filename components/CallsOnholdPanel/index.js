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

exports.default = CallsOnholdContainer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ActiveCallItem = require('../ActiveCallItem');

var _ActiveCallItem2 = _interopRequireDefault(_ActiveCallItem);

var _CircleButton = require('../CircleButton');

var _CircleButton2 = _interopRequireDefault(_CircleButton);

var _BackButton = require('../BackButton');

var _BackButton2 = _interopRequireDefault(_BackButton);

var _BackHeader = require('../BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _Combine = require('../../assets/images/Combine.svg');

var _Combine2 = _interopRequireDefault(_Combine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallItem = function (_React$Component) {
  (0, _inherits3.default)(CallItem, _React$Component);

  function CallItem(props) {
    (0, _classCallCheck3.default)(this, CallItem);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallItem.__proto__ || (0, _getPrototypeOf2.default)(CallItem)).call(this, props));

    _this.state = {
      avatarUrl: null
    };
    return _this;
  }

  (0, _createClass3.default)(CallItem, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var _props = this.props,
          getAvatarUrl = _props.getAvatarUrl,
          contactMapping = _props.contactMapping,
          call = _props.call;

      var nameMatches = contactMapping && contactMapping[call.webphoneSession.to] || [];
      var contact = call.webphoneSession.contactMatch;
      if (!contact) {
        contact = nameMatches && nameMatches[0];
      }
      getAvatarUrl(contact).then(function (avatarUrl) {
        _this2.setState({ avatarUrl: avatarUrl });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          call = _props2.call,
          currentLocale = _props2.currentLocale,
          areaCode = _props2.areaCode,
          countryCode = _props2.countryCode,
          brand = _props2.brand,
          showContactDisplayPlaceholder = _props2.showContactDisplayPlaceholder,
          formatPhone = _props2.formatPhone,
          onClickToSms = _props2.onClickToSms,
          internalSmsPermission = _props2.internalSmsPermission,
          outboundSmsPermission = _props2.outboundSmsPermission,
          isLoggedContact = _props2.isLoggedContact,
          onLogCall = _props2.onLogCall,
          onViewContact = _props2.onViewContact,
          onCreateContact = _props2.onCreateContact,
          loggingMap = _props2.loggingMap,
          webphoneAnswer = _props2.webphoneAnswer,
          webphoneReject = _props2.webphoneReject,
          webphoneHangup = _props2.webphoneHangup,
          webphoneResume = _props2.webphoneResume,
          webphoneToVoicemail = _props2.webphoneToVoicemail,
          enableContactFallback = _props2.enableContactFallback,
          autoLog = _props2.autoLog,
          sourceIcons = _props2.sourceIcons,
          disableMerge = _props2.disableMerge,
          onMergeCall = _props2.onMergeCall;

      return _react2.default.createElement(_ActiveCallItem2.default, {
        call: call,
        key: call.id,
        showMergeCall: true,
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
        onMergeCall: onMergeCall,
        loggingMap: loggingMap,
        webphoneAnswer: webphoneAnswer,
        webphoneReject: webphoneReject,
        webphoneHangup: webphoneHangup,
        webphoneResume: webphoneResume,
        webphoneToVoicemail: webphoneToVoicemail,
        enableContactFallback: enableContactFallback,
        autoLog: autoLog,
        sourceIcons: sourceIcons,
        disableMerge: disableMerge,
        hasActionMenu: false,
        showAnswer: false,
        showAvatar: true,
        showCallDetail: false,
        avatarUrl: this.state.avatarUrl
      });
    }
  }]);
  return CallItem;
}(_react2.default.Component);

CallItem.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  formatPhone: _propTypes2.default.func.isRequired,
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
  onClickToSms: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  disableMerge: _propTypes2.default.bool,
  getAvatarUrl: _propTypes2.default.func,
  onMergeCall: _propTypes2.default.func,
  contactMapping: _propTypes2.default.object,
  call: _propTypes2.default.object
};

CallItem.defaultProps = {
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
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
  sourceIcons: undefined,
  onClickToSms: undefined,
  onCreateContact: undefined,
  disableMerge: false,
  onMergeCall: function onMergeCall(i) {
    return i;
  },
  getAvatarUrl: function getAvatarUrl(i) {
    return i;
  },
  contactMapping: {},
  call: {}
};

function CallsOnholdContainer(_ref) {
  var calls = _ref.calls,
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
      sourceIcons = _ref.sourceIcons,
      disableMerge = _ref.disableMerge,
      onBackButtonClick = _ref.onBackButtonClick,
      onMerge = _ref.onMerge,
      onAdd = _ref.onAdd,
      contactMapping = _ref.contactMapping,
      getAvatarUrl = _ref.getAvatarUrl;

  var backHeader = _react2.default.createElement(_BackHeader2.default, {
    className: _styles2.default.header,
    onBackClick: onBackButtonClick,
    backButton: _react2.default.createElement(_BackButton2.default, { label: _i18n2.default.getString('activeCall', currentLocale) })
  });

  return _react2.default.createElement(
    'div',
    { className: _styles2.default.root },
    backHeader,
    _react2.default.createElement(
      'div',
      { className: _styles2.default.callList },
      calls.length ? calls.map(function (call) {
        return _react2.default.createElement(CallItem, {
          call: call,
          key: call.id,
          showMergeCall: true,
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
          onMergeCall: function onMergeCall() {
            return onMerge(call.webphoneSession.id);
          },
          loggingMap: loggingMap,
          webphoneAnswer: webphoneAnswer,
          webphoneReject: webphoneReject,
          webphoneHangup: webphoneHangup,
          webphoneResume: webphoneResume,
          webphoneToVoicemail: webphoneToVoicemail,
          enableContactFallback: enableContactFallback,
          autoLog: autoLog,
          sourceIcons: sourceIcons,
          disableMerge: disableMerge,
          hasActionMenu: false,
          showAnswer: false,
          getAvatarUrl: getAvatarUrl,
          contactMapping: contactMapping
        });
      }) : _react2.default.createElement(
        'div',
        { className: _styles2.default.noCalls },
        _i18n2.default.getString('noCallsOnhold', currentLocale)
      )
    ),
    _react2.default.createElement(
      'div',
      { className: _styles2.default.addBtnContainer },
      _react2.default.createElement(
        'div',
        { className: _styles2.default.addBtn },
        _react2.default.createElement(
          'span',
          { title: _i18n2.default.getString('add', currentLocale), className: _styles2.default.webphoneButton },
          _react2.default.createElement(_CircleButton2.default, {
            className: _styles2.default.addBtnIcon,
            icon: _Combine2.default,
            showBorder: false,
            onClick: onAdd
          })
        )
      )
    )
  );
}

CallsOnholdContainer.propTypes = {
  currentLocale: _propTypes2.default.string.isRequired,
  onMerge: _propTypes2.default.func,
  calls: _propTypes2.default.array.isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  brand: _propTypes2.default.string,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  formatPhone: _propTypes2.default.func.isRequired,
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
  onBackButtonClick: _propTypes2.default.func,
  onClickToSms: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  disableMerge: _propTypes2.default.bool,
  onAdd: _propTypes2.default.func,
  getAvatarUrl: _propTypes2.default.func,
  contactMapping: _propTypes2.default.object
};

CallsOnholdContainer.defaultProps = {
  brand: 'RingCentral',
  showContactDisplayPlaceholder: true,
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
  sourceIcons: undefined,
  onBackButtonClick: undefined,
  onAdd: undefined,
  onMerge: undefined,
  onClickToSms: undefined,
  onCreateContact: undefined,
  disableMerge: false,
  getAvatarUrl: function getAvatarUrl(i) {
    return i;
  },
  contactMapping: {}
};
//# sourceMappingURL=index.js.map
