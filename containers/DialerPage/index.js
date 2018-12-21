'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _phoneContext = require('../../lib/phoneContext');

var _DialerPanel = require('../../components/DialerPanel');

var _DialerPanel2 = _interopRequireDefault(_DialerPanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _phoneContext.connectModule)(function (phone) {
  return phone.dialerUI;
})(_DialerPanel2.default);
//# sourceMappingURL=index.js.map
