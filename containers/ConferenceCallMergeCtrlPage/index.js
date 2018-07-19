'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToFunctions = exports.mapToProps = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _reactRedux = require('react-redux');

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

var _callCtrlLayouts = require('../../enums/callCtrlLayouts');

var _callCtrlLayouts2 = _interopRequireDefault(_callCtrlLayouts);

var _CallCtrlPage = require('../CallCtrlPage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var phone = _ref.phone,
      _ref$phone = _ref.phone,
      webphone = _ref$phone.webphone,
      conferenceCall = _ref$phone.conferenceCall,
      props = (0, _objectWithoutProperties3.default)(_ref, ['phone', 'phone']);

  var baseProps = (0, _CallCtrlPage.mapToProps)(_, (0, _extends3.default)({
    phone: phone
  }, props));

  var currentSession = webphone.activeSession || {};
  var isOnConference = conferenceCall.isConferenceSession(currentSession.id);
  var layout = isOnConference ? _callCtrlLayouts2.default.conferenceCtrl : _callCtrlLayouts2.default.mergeCtrl;

  return (0, _extends3.default)({}, baseProps, {
    layout: layout
  });
}

function mapToFunctions(_, _ref2) {
  var phone = _ref2.phone,
      props = (0, _objectWithoutProperties3.default)(_ref2, ['phone']);

  var baseProps = (0, _CallCtrlPage.mapToFunctions)(_, (0, _extends3.default)({
    phone: phone
  }, props));
  return (0, _extends3.default)({}, baseProps);
}

var ConferenceCallMergeCtrlPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallCtrlPage.CallCtrlPage));

exports.mapToProps = mapToProps;
exports.mapToFunctions = mapToFunctions;
exports.default = ConferenceCallMergeCtrlPage;
//# sourceMappingURL=index.js.map
