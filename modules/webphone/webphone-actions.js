'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ActionMap = require('../../lib/ActionMap');

var _ActionMap2 = _interopRequireDefault(_ActionMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _ActionMap2.default(['register', 'registerSuccess', 'registerError', 'unregister',

// outbound call
'call', 'callConnect',
// inbound call
'callAccept', 'callIncoming', 'callEnd', 'callError', 'callOperation',
// no active session
'sessionError']);
//# sourceMappingURL=webphone-actions.js.map
