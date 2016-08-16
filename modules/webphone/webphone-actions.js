'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reduxHelper = require('../../lib/redux-helper');

exports.default = new _reduxHelper.ActionMap(['register', 'registerSuccess', 'registerError', 'unregister',

// outbound call
'call', 'callConnect',
// inbound call
'callAccept', 'callIncoming', 'callEnd', 'callError', 'callOperation',
// no active session
'sessionError']);
//# sourceMappingURL=webphone-actions.js.map
