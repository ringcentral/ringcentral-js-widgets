'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CallingSettingsPanel = require('../../components/CallingSettingsPanel');

var _CallingSettingsPanel2 = _interopRequireDefault(_CallingSettingsPanel);

var _phoneContext = require('../../lib/phoneContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.callingSettingsUI;
})(_CallingSettingsPanel2.default);
//# sourceMappingURL=index.js.map
