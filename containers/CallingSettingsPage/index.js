'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

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

var CallingSettingsPage = (0, _reactRedux.connect)(function (_, props) {
  return {
    brand: props.brand.fullName,
    currentLocale: props.locale.currentLocale,
    callWithOptions: props.callingSettings.callWithOptions,
    callWith: props.callingSettings.callWith,
    myLocation: props.callingSettings.myLocation,
    ringoutPrompt: props.callingSettings.ringoutPrompt,
    availableNumbers: props.callingSettings.availableNumbers
  };
}, function (_, props) {
  return {
    onBackButtonClick: function onBackButtonClick() {
      props.router.history.goBack();
    },
    onSave: function onSave(_ref) {
      var callWith = _ref.callWith,
          myLocation = _ref.myLocation,
          ringoutPrompt = _ref.ringoutPrompt;

      props.callingSettings.setData({
        callWith: callWith, myLocation: myLocation, ringoutPrompt: ringoutPrompt
      }, true);
    }
  };
})(_CallingSettingsPanel2.default);

CallingSettingsPage.propTypes = {
  brand: _react.PropTypes.instanceOf(_Brand2.default).isRequired,
  callingSettings: _react.PropTypes.instanceOf(_CallingSettings2.default).isRequired,
  locale: _react.PropTypes.instanceOf(_Locale2.default).isRequired,
  router: _react.PropTypes.instanceOf(_RouterInteraction2.default).isRequired
};

exports.default = CallingSettingsPage;
//# sourceMappingURL=index.js.map
