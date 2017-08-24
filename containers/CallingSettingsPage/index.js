'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.propTypes = exports.mapToProps = exports.mapToFunctions = undefined;

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _Brand = require('ringcentral-integration/modules/Brand');

var _Brand2 = _interopRequireDefault(_Brand);

var _CallingSettings = require('ringcentral-integration/modules/CallingSettings');

var _CallingSettings2 = _interopRequireDefault(_CallingSettings);

var _Locale = require('ringcentral-integration/modules/Locale');

var _Locale2 = _interopRequireDefault(_Locale);

var _RouterInteraction = require('../../modules/RouterInteraction');

var _RouterInteraction2 = _interopRequireDefault(_RouterInteraction);

var _CallingSettingsPanel = require('../../components/CallingSettingsPanel');

var _CallingSettingsPanel2 = _interopRequireDefault(_CallingSettingsPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapToProps(_, _ref) {
  var callingSettings = _ref.callingSettings,
      brand = _ref.brand,
      locale = _ref.locale,
      webphone = _ref.webphone;

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
  var callingSettings = _ref2.callingSettings,
      router = _ref2.router;

  return {
    onBackButtonClick: function onBackButtonClick() {
      router.goBack();
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

var CallingSettingsPage = (0, _reactRedux.connect)(mapToProps, mapToFunctions)(_CallingSettingsPanel2.default);

var propTypes = {
  brand: _propTypes2.default.instanceOf(_Brand2.default).isRequired,
  callingSettings: _propTypes2.default.instanceOf(_CallingSettings2.default).isRequired,
  locale: _propTypes2.default.instanceOf(_Locale2.default).isRequired,
  router: _propTypes2.default.instanceOf(_RouterInteraction2.default).isRequired
};

CallingSettingsPage.propTypes = propTypes;

exports.mapToFunctions = mapToFunctions;
exports.mapToProps = mapToProps;
exports.propTypes = propTypes;
exports.default = CallingSettingsPage;
//# sourceMappingURL=index.js.map
