'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.mapToProps = exports.mapToFunctions = undefined;

var _reactRedux = require('react-redux');

var _CallingSettingsPanel = require('../../components/CallingSettingsPanel');

var _CallingSettingsPanel2 = _interopRequireDefault(_CallingSettingsPanel);

var _withPhone = require('../../lib/withPhone');

var _withPhone2 = _interopRequireDefault(_withPhone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var _ref$phone = _ref.phone,
      callingSettings = _ref$phone.callingSettings,
      brand = _ref$phone.brand,
      locale = _ref$phone.locale,
      webphone = _ref$phone.webphone;

  return {
    brand: brand.fullName,
    currentLocale: locale.currentLocale,
    callWithOptions: callingSettings.callWithOptions,
    callWith: callingSettings.callWith,
    myLocation: callingSettings.myLocation,
    ringoutPrompt: callingSettings.ringoutPrompt,
    availableNumbers: callingSettings.availableNumbers,
    disabled: webphone && webphone.sessions.length > 0
  };
}

function mapToFunctions(_, _ref2) {
  var _ref2$phone = _ref2.phone,
      callingSettings = _ref2$phone.callingSettings,
      routerInteraction = _ref2$phone.routerInteraction;

  return {
    onBackButtonClick: function onBackButtonClick() {
      routerInteraction.goBack();
    },
    onSave: function onSave(_ref3) {
      var callWith = _ref3.callWith,
          myLocation = _ref3.myLocation,
          ringoutPrompt = _ref3.ringoutPrompt;

      callingSettings.setData({
        callWith: callWith, myLocation: myLocation, ringoutPrompt: ringoutPrompt
      }, true);
    }
  };
}

var CallingSettingsPage = (0, _withPhone2.default)((0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallingSettingsPanel2.default));

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.default = CallingSettingsPage;
//# sourceMappingURL=index.js.map
