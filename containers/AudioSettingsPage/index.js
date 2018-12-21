'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AudioSettingsPanel = require('../../components/AudioSettingsPanel');

var _AudioSettingsPanel2 = _interopRequireDefault(_AudioSettingsPanel);

var _phoneContext = require('../../lib/phoneContext');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.audioSettingsUI;
})(_AudioSettingsPanel2.default);
//# sourceMappingURL=index.js.map
