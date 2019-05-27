"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callingOptions = _interopRequireDefault(require("ringcentral-integration/modules/CallingSettings/callingOptions"));

var _title$callingOptions;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_title$callingOptions = {
  title: 'Calling'
}, _defineProperty(_title$callingOptions, _callingOptions["default"].softphone, '{brand} for Desktop'), _defineProperty(_title$callingOptions, _callingOptions["default"].myphone, 'My {brand} Phone'), _defineProperty(_title$callingOptions, _callingOptions["default"].otherphone, 'Other Phone'), _defineProperty(_title$callingOptions, _callingOptions["default"].customphone, 'Custom Phone'), _defineProperty(_title$callingOptions, _callingOptions["default"].browser, 'Browser'), _defineProperty(_title$callingOptions, "makeCallsWith", 'Make my calls with'), _defineProperty(_title$callingOptions, "ringoutHint", 'Ring me at my location first, then connect the called party'), _defineProperty(_title$callingOptions, "myLocationLabel", 'My Location'), _defineProperty(_title$callingOptions, "press1ToStartCallLabel", 'Prompt me to dial 1 before connecting the call'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].browser, "Tooltip"), 'Use this option to make and receive calls using your computer’s microphone and speaker.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].softphone, "Tooltip"), 'Use this option to make and receive calls using your {brand} for Desktop app.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].myphone, "Tooltip"), 'Use this option to make calls using your {brand} phone.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].myphone, "Tooltip1"), 'For the call you make, your {brand} phone will ring first then the party you called.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].otherphone, "Tooltip"), 'Use this option to make calls using your other phones such as home or cell phones that you have added in your {brand} Extension.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].otherphone, "Tooltip1"), 'For the call you make, this phone will ring first then the party you called.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].customphone, "Tooltip"), 'Use this option to make calls using any phone of your choice by entering a valid phone number in the field below.'), _defineProperty(_title$callingOptions, "".concat(_callingOptions["default"].customphone, "Tooltip1"), 'For the call you make, this phone will ring first then the party you called.'), _title$callingOptions);

exports["default"] = _default;
//# sourceMappingURL=en-US.js.map
