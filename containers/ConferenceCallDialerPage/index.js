'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToFunctions = exports.mapToProps = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _reactRedux = require('react-redux');

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _BackButton = require('../../components/BackButton');

var _BackButton2 = _interopRequireDefault(_BackButton);

var _BackHeader = require('../../components/BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _DialerPanel = require('../../components/DialerPanel');

var _DialerPanel2 = _interopRequireDefault(_DialerPanel);

var _DialerPage = require('../DialerPage');

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

var _styles = require('./styles.scss');

var _styles2 = _interopRequireDefault(_styles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ConferenceCallDialerPanel = function (_Component) {
  (0, _inherits3.default)(ConferenceCallDialerPanel, _Component);

  function ConferenceCallDialerPanel() {
    (0, _classCallCheck3.default)(this, ConferenceCallDialerPanel);
    return (0, _possibleConstructorReturn3.default)(this, (ConferenceCallDialerPanel.__proto__ || (0, _getPrototypeOf2.default)(ConferenceCallDialerPanel)).apply(this, arguments));
  }

  (0, _createClass3.default)(ConferenceCallDialerPanel, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.props.setLastSessionId();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          onBack = _props.onBack,
          baseProps = (0, _objectWithoutProperties3.default)(_props, ['onBack']);

      return [_react2.default.createElement(_BackHeader2.default, {
        key: 'header',
        onBackClick: onBack,
        backButton: _react2.default.createElement(_BackButton2.default, { label: _i18n2.default.getString('activeCall') })
      }), _react2.default.createElement(_DialerPanel2.default, (0, _extends3.default)({
        key: 'dialer'
      }, baseProps))];
    }
  }]);
  return ConferenceCallDialerPanel;
}(_react.Component);

ConferenceCallDialerPanel.propTypes = (0, _extends3.default)({}, _DialerPanel2.default.propTypes, {
  onBack: _propTypes2.default.func.isRequired,
  setLastSessionId: _propTypes2.default.func.isRequired
});

ConferenceCallDialerPanel.defaultProps = (0, _extends3.default)({}, _DialerPanel2.default.defaultProps);

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      conferenceDialerUI = _ref$phone.conferenceDialerUI,
      components = (0, _objectWithoutProperties3.default)(_ref$phone, ['conferenceDialerUI']),
      props = (0, _objectWithoutProperties3.default)(_ref, ['phone']);

  var baseProps = (0, _DialerPage.mapToProps)(_, (0, _extends3.default)({}, props, {
    phone: (0, _extends3.default)({}, components, {
      dialerUI: conferenceDialerUI // override
    })
  }));
  return (0, _extends3.default)({}, baseProps, {
    showFromField: false
  });
}

function mapToFunctions(_, _ref2) {
  var params = _ref2.params,
      _ref2$phone = _ref2.phone,
      conferenceCall = _ref2$phone.conferenceCall,
      conferenceDialerUI = _ref2$phone.conferenceDialerUI,
      components = (0, _objectWithoutProperties3.default)(_ref2$phone, ['conferenceCall', 'conferenceDialerUI']),
      onBack = _ref2.onBack,
      props = (0, _objectWithoutProperties3.default)(_ref2, ['params', 'phone', 'onBack']);

  var baseProps = (0, _DialerPage.mapToFunctions)(_, (0, _extends3.default)({
    params: params
  }, props, {
    phone: (0, _extends3.default)({}, components, {
      conferenceCall: conferenceCall,
      dialerUI: conferenceDialerUI // override
    })
  }));
  return (0, _extends3.default)({}, baseProps, {
    onBack: onBack,
    setLastSessionId: function setLastSessionId() {
      var fromSessionId = params.fromSessionId;

      conferenceDialerUI.setLastSessionId(fromSessionId);
    },
    onCallButtonClick: function onCallButtonClick() {
      conferenceDialerUI.onCallButtonClick({
        fromNumber: params.fromNumber,
        fromSessionId: params.fromSessionId
      });
    },

    callBtnClassName: _styles2.default.callBtn
  });
}

var ConferenceCallDialerPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(ConferenceCallDialerPanel));

exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports.default = ConferenceCallDialerPage;
//# sourceMappingURL=index.js.map
