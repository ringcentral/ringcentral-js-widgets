'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _reactRedux = require('react-redux');

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
  brand: _react.PropTypes.object.isRequired,
  callingSettings: _react.PropTypes.object.isRequired,
  locale: _react.PropTypes.object.isRequired,
  router: _react.PropTypes.object.isRequired
};

exports.default = CallingSettingsPage;
//# sourceMappingURL=index.js.map
