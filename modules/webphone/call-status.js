'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var definition = {
  flip: 'FLIPPED',
  recording: 'RECORDING',
  holding: 'HOLDING',
  muted: 'MUTED',
  parked: 'PARKED',
  transfered: 'TRANSFERRED',
  forwarded: 'FOWARDED'
};

exports.default = new _keyValueMap2.default(definition);
//# sourceMappingURL=call-status.js.map
