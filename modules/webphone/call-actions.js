'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxHelper = require('../../lib/redux-helper');

exports.default = new _reduxHelper.ActionMap([
// operational error
'error',
// unregister, clear operational state
'clear',
// operation
'flip', 'record', 'stopRecord', 'hold', 'unhold', 'mute', 'unmute', 'park', 'transfer', 'forward', 'dtmf']);
//# sourceMappingURL=call-actions.js.map
