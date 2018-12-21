'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _phoneContext = require('../../lib/phoneContext');

var _BackButton = require('../../components/BackButton');

var _BackButton2 = _interopRequireDefault(_BackButton);

var _BackHeader = require('../../components/BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _DialerPanel = require('../../components/DialerPanel');

var _DialerPanel2 = _interopRequireDefault(_DialerPanel);

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

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

exports.default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.conferenceDialerUI;
})(ConferenceCallDialerPanel);
//# sourceMappingURL=index.js.map
