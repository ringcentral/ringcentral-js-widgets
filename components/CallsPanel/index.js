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

var _debounce = require('ringcentral-integration/lib/debounce');

var _debounce2 = _interopRequireDefault(_debounce);

require('core-js/fn/array/find');

var _Header = require('../Header');

var _Header2 = _interopRequireDefault(_Header);

var _Panel = require('../Panel');

var _Panel2 = _interopRequireDefault(_Panel);

var _SpinnerOverlay = require('../SpinnerOverlay');

var _SpinnerOverlay2 = _interopRequireDefault(_SpinnerOverlay);

var _CallList = require('../CallList');

var _CallList2 = _interopRequireDefault(_CallList);

var _CallListV = require('../CallListV2');

var _CallListV2 = _interopRequireDefault(_CallListV);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HEADER_HEIGHT = 38;

var CallsPanel = function (_React$PureComponent) {
  (0, _inherits3.default)(CallsPanel, _React$PureComponent);

  function CallsPanel(props) {
    (0, _classCallCheck3.default)(this, CallsPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (CallsPanel.__proto__ || (0, _getPrototypeOf2.default)(CallsPanel)).call(this, props));

    _this._onResize = (0, _debounce2.default)(function () {
      if (_this._mounted) {
        _this._calculateContentSize();
      }
    }, 300);


    _this.state = {
      contentHeight: 0,
      contentWidth: 0
    };

    _this._mounted = false;
    _this._listWrapper = _react2.default.createRef();
    return _this;
  }

  (0, _createClass3.default)(CallsPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this._mounted = true;
      this._calculateContentSize();
      window.addEventListener('resize', this._onResize);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this._mounted = false;
      window.removeEventListener('resize', this._onResize);
    }
  }, {
    key: '_calculateContentSize',
    value: function _calculateContentSize() {
      if (this._listWrapper && this._listWrapper.current && this._listWrapper.current.getBoundingClientRect) {
        var react = this._listWrapper.current.getBoundingClientRect();

        this.setState({
          contentHeight: react.bottom - react.top - HEADER_HEIGHT,
          contentWidth: react.right - react.left
        });

        return;
      }

      this.setState({
        contentHeight: 0,
        contentWidth: 0
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          brand = _props.brand,
          currentLocale = _props.currentLocale,
          calls = _props.calls,
          areaCode = _props.areaCode,
          countryCode = _props.countryCode,
          onViewContact = _props.onViewContact,
          onCreateContact = _props.onCreateContact,
          onLogCall = _props.onLogCall,
          onClickToDial = _props.onClickToDial,
          onClickToSms = _props.onClickToSms,
          isLoggedContact = _props.isLoggedContact,
          disableLinks = _props.disableLinks,
          disableClickToDial = _props.disableClickToDial,
          outboundSmsPermission = _props.outboundSmsPermission,
          internalSmsPermission = _props.internalSmsPermission,
          dateTimeFormatter = _props.dateTimeFormatter,
          showSpinner = _props.showSpinner,
          title = _props.title,
          active = _props.active,
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
          useNewList = _props.useNewList;


      var callsListView = useNewList ? _react2.default.createElement(_CallListV2.default, {
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
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer,
        width: this.state.contentWidth,
        height: this.state.contentHeight,
        useNewList: useNewList
      }) : _react2.default.createElement(_CallList2.default, {
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
        sourceIcons: sourceIcons,
        phoneTypeRenderer: phoneTypeRenderer,
        phoneSourceNameRenderer: phoneSourceNameRenderer
      });

      var content = showSpinner ? _react2.default.createElement(_SpinnerOverlay2.default, null) : callsListView;

      return _react2.default.createElement(
        'div',
        { className: _styles2.default.root, ref: this._listWrapper },
        _react2.default.createElement(
          _Header2.default,
          null,
          title
        ),
        _react2.default.createElement(
          _Panel2.default,
          { className: _styles2.default.content },
          content
        )
      );
    }
  }]);
  return CallsPanel;
}(_react2.default.PureComponent);

exports.default = CallsPanel;


CallsPanel.propTypes = {
  brand: _propTypes2.default.string.isRequired,
  currentLocale: _propTypes2.default.string.isRequired,
  calls: _propTypes2.default.arrayOf(_propTypes2.default.any).isRequired,
  areaCode: _propTypes2.default.string.isRequired,
  countryCode: _propTypes2.default.string.isRequired,
  onViewContact: _propTypes2.default.func,
  onCreateContact: _propTypes2.default.func,
  onClickToDial: _propTypes2.default.func,
  onClickToSms: _propTypes2.default.func,
  onLogCall: _propTypes2.default.func,
  isLoggedContact: _propTypes2.default.func,
  disableLinks: _propTypes2.default.bool.isRequired,
  disableClickToDial: _propTypes2.default.bool,
  outboundSmsPermission: _propTypes2.default.bool,
  internalSmsPermission: _propTypes2.default.bool,
  dateTimeFormatter: _propTypes2.default.func.isRequired,
  showSpinner: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  active: _propTypes2.default.bool,
  loggingMap: _propTypes2.default.object,
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
  useNewList: _propTypes2.default.bool
};

CallsPanel.defaultProps = {
  onViewContact: undefined,
  onCreateContact: undefined,
  onLogCall: undefined,
  onClickToDial: undefined,
  onClickToSms: undefined,
  disableClickToDial: false,
  outboundSmsPermission: false,
  internalSmsPermission: false,
  showSpinner: false,
  title: '',
  active: false,
  isLoggedContact: undefined,
  loggingMap: {},
  webphoneAnswer: undefined,
  webphoneReject: undefined,
  webphoneHangup: undefined,
  webphoneResume: undefined,
  enableContactFallback: undefined,
  autoLog: false,
  showContactDisplayPlaceholder: true,
  sourceIcons: undefined,
  phoneTypeRenderer: undefined,
  phoneSourceNameRenderer: undefined,
  useNewList: false
};
//# sourceMappingURL=index.js.map
