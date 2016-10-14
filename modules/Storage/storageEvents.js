'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _storageStatus = require('./storageStatus');

var _storageStatus2 = _interopRequireDefault(_storageStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var eventDefinition = (0, _extends3.default)({}, _storageStatus2.default, {
  statusChange: 'STATUS_CHANGE',
  dataChange: 'DATA_CHANGE',
  ready: 'READY'
});
exports.default = new _keyValueMap2.default(eventDefinition);
//# sourceMappingURL=storageEvents.js.map
