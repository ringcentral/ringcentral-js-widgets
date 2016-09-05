'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _keyValueMap2.default({
  pending: 'PENDING',
  dirty: 'DIRTY',
  saving: 'SAVING',
  saved: 'SAVED',
  reloading: 'RELOADING'
});
//# sourceMappingURL=storage-status.js.map
