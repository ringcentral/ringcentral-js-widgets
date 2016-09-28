'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keyValueMap = require('data-types/key-value-map');

var _keyValueMap2 = _interopRequireDefault(_keyValueMap);

var _dialingPlanStatus = require('./dialing-plan-status');

var _dialingPlanStatus2 = _interopRequireDefault(_dialingPlanStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _keyValueMap2.default((0, _extends3.default)({}, _dialingPlanStatus2.default, {
  statusChange: 'STATUS_CHANGE',
  dialingPlanChange: 'DIALING_PLAN_CHANGE',
  error: 'ERROR'
}));
//# sourceMappingURL=dialing-plan-events.js.map
