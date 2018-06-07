'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToFunctions = exports.mapToProps = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _BackHeader = require('../../components/BackHeader');

var _BackHeader2 = _interopRequireDefault(_BackHeader);

var _DialerPanel = require('../../components/DialerPanel');

var _DialerPanel2 = _interopRequireDefault(_DialerPanel);

var _DialerPage = require('../DialerPage');

var _i18n = require('./i18n');

var _i18n2 = _interopRequireDefault(_i18n);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ConferenceCallDialerPanel(_ref) {
  var onBack = _ref.onBack,
      baseProps = (0, _objectWithoutProperties3.default)(_ref, ['onBack']);

  return [_react2.default.createElement(
    _BackHeader2.default,
    {
      key: 'header',
      onBackClick: onBack },
    _i18n2.default.getString('addToConference')
  ), _react2.default.createElement(_DialerPanel2.default, (0, _extends3.default)({
    key: 'dialer'
  }, baseProps))];
}

ConferenceCallDialerPanel.propTypes = (0, _extends3.default)({}, _DialerPanel2.default.propTypes, {
  onBack: _propTypes2.default.func.isRequired
});

ConferenceCallDialerPanel.defaultProps = (0, _extends3.default)({}, _DialerPanel2.default.defaultProps);

function mapToProps(_, _ref2) {
  var props = (0, _objectWithoutProperties3.default)(_ref2, []);

  var baseProps = (0, _DialerPage.mapToProps)(_, (0, _extends3.default)({}, props));
  return (0, _extends3.default)({}, baseProps, {
    showFromField: false
  });
}

function mapToFunctions(_, _ref3) {
  var params = _ref3.params,
      phone = _ref3.phone,
      onBack = _ref3.onBack,
      props = (0, _objectWithoutProperties3.default)(_ref3, ['params', 'phone', 'onBack']);

  var baseProps = (0, _DialerPage.mapToFunctions)(_, (0, _extends3.default)({
    params: params,
    phone: phone
  }, props));
  return (0, _extends3.default)({}, baseProps, {
    onBack: onBack,
    onCallButtonClick: function onCallButtonClick() {
      phone.dialerUI.onCallButtonClick({
        fromNumber: params.fromNumber
      });
    }
  });
}

var ConferenceCallDialerPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(ConferenceCallDialerPanel));

exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports.default = ConferenceCallDialerPage;
//# sourceMappingURL=index.js.map
