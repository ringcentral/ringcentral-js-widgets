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

var _CallItem = require('../CallItem');

var _CallItem2 = _interopRequireDefault(_CallItem);

var _NoCalls = require('../NoCalls');

var _NoCalls2 = _interopRequireDefault(_NoCalls);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallList = function (_React$PureComponent) {
  (0, _inherits3.default)(CallList, _React$PureComponent);

  function CallList(props) {
    (0, _classCallCheck3.default)(this, CallList);
    return (0, _possibleConstructorReturn3.default)(this, (CallList.__proto__ || (0, _getPrototypeOf2.default)(CallList)).call(this, props));
  }

  (0, _createClass3.default)(CallList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          brand = _props.brand,
          currentLocale = _props.currentLocale,
          calls = _props.calls,
          areaCode = _props.areaCode,
          countryCode = _props.countryCode,
          onViewContact = _props.onViewContact,
          onCreateContact = _props.onCreateContact,
          createEntityTypes = _props.createEntityTypes,
          onLogCall = _props.onLogCall,
          onClickToDial = _props.onClickToDial,
          onClickToSms = _props.onClickToSms,
          isLoggedContact = _props.isLoggedContact,
          disableLinks = _props.disableLinks,
          disableClickToDial = _props.disableClickToDial,
          outboundSmsPermission = _props.outboundSmsPermission,
          internalSmsPermission = _props.internalSmsPermission,
          active = _props.active,
          dateTimeFormatter = _props.dateTimeFormatter,
          loggingMap = _props.loggingMap,
          webphoneAnswer = _props.webphoneAnswer,
          webphoneReject = _props.webphoneReject,
          webphoneHangup = _props.webphoneHangup,
          webphoneResume = _props.webphoneResume,
          enableContactFallback = _props.enableContactFallback,
          autoLog = _props.autoLog,
          showContactDisplayPlaceholder = _props.showContactDisplayPlaceholder,
          sourceIcons = _props.sourceIcons,
          phoneTypeRenderer = _props.phoneTypeRenderer,
          phoneSourceNameRenderer = _props.phoneSourceNameRenderer,
          renderContactName = _props.renderContactName,
          renderExtraButton = _props.renderExtraButton,
          contactDisplayStyle = _props.contactDisplayStyle,
          externalViewEntity = _props.externalViewEntity,
          externalHasEntity = _props.externalHasEntity,
          readTextPermission = _props.readTextPermission;


      if (calls && calls.length) {
        return _react2.default.createElement(
          'div',
          { className: className },
          calls.map(function (call, index) {
            return _react2.default.createElement(_CallItem2.default, {
              key: call.id,
              call: call,
              renderIndex: index,
              extended: _this2._renderIndex === index && _this2._cellExtended || false,
              currentLocale: currentLocale,
              brand: brand,
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
              active: active,
              dateTimeFormatter: dateTimeFormatter,
              isLogging: !!loggingMap[call.sessionId],
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
              readTextPermission: readTextPermission
            });
          })
        );
      }
      return _react2.default.createElement(
        'div',
        { className: className },
        _react2.default.createElement(_NoCalls2.default, { currentLocale: currentLocale, active: active })
      );
    }
  }]);
  return CallList;
}(_react2.default.PureComponent);

exports.default = CallList;


CallList.propTypes = {
  renderIndex: _propTypes2.default.number,
  extended: _propTypes2.default.bool,
  className: _propTypes2.default.string,
  brand: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  calls: _propTypes2.default.arrayOf(_CallItem2.default.propTypes.call).isRequired,
  active: _propTypes2.default.bool,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  onViewContact: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  createEntityTypes: _propTypes2.default.array,
  onLogCall: _propTypes2.default.func,
  onClickToDial: _propTypes2.default.func,
  onClickToSms: _propTypes2.default.func,
  isLoggedContact: _propTypes2.default.func,
  loggingMap: _propTypes2.default.object,
  disableLinks: _propTypes2.default.bool,
  disableClickToDial: _propTypes2.default.bool,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  webphoneAnswer: _propTypes2.default.func,
  webphoneReject: _propTypes2.default.func,
  webphoneHangup: _propTypes2.default.func,
  webphoneResume: _propTypes2.default.func,
  enableContactFallback: _propTypes2.default.bool,
  autoLog: _propTypes2.default.bool,
  showContactDisplayPlaceholder: _propTypes2.default.bool,
  sourceIcons: _propTypes2.default.object,
  phoneTypeRenderer: _propTypes2.default.func,
  phoneSourceNameRenderer: _propTypes2.default.func,
  renderContactName: _propTypes2.default.func,
  renderExtraButton: _propTypes2.default.func,
  contactDisplayStyle: _propTypes2.default.string,
  externalViewEntity: _propTypes2.default.func,
  externalHasEntity: _propTypes2.default.func,
  readTextPermission: _propTypes2.default.bool
};

CallList.defaultProps = {
  renderIndex: undefined,
  extended: undefined,
  className: null,
  active: false,
  disableLinks: false,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  onViewContact: undefined,
  onCreateContact: undefined,
  createEntityTypes: undefined,
  onLogCall: undefined,
  isLoggedContact: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  showContactDisplayPlaceholder: true,
  autoLog: false,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  renderContactName: undefined,
  renderExtraButton: undefined,
  contactDisplayStyle: undefined,
  externalViewEntity: undefined,
  externalHasEntity: undefined,
  readTextPermission: true
};
//# sourceMappingURL=index.js.map
