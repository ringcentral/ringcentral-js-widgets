'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActionMap = require('../../lib/ActionMap');

var _ActionMap2 = _interopRequireDefault(_ActionMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _ActionMap2.default([
// operational error
'error',
// unregister, clear operational state
'clear',
// operation
'flip', 'record', 'stopRecord', 'hold', 'unhold', 'mute', 'unmute', 'park', 'transfer', 'forward', 'dtmf'], 'webphone');
//# sourceMappingURL=call-actions.js.map
