'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

exports.default = processCall;

var _removeUri = require('./removeUri');

var _removeUri2 = _interopRequireDefault(_removeUri);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function processCall(call) {
  return (0, _extends3.default)({}, (0, _removeUri2.default)(call), {
    startTime: new Date(call.startTime).getTime()
  });
}
//# sourceMappingURL=processCall.js.map
