'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isNan = require('babel-runtime/core-js/number/is-nan');

var _isNan2 = _interopRequireDefault(_isNan);

exports.default = formatDuration;

var _padLeft = require('ringcentral-integration/lib/padLeft');

var _padLeft2 = _interopRequireDefault(_padLeft);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function formatDuration(duration) {
  if ((0, _isNan2.default)(duration)) {
    return '--:--';
  }
  var intDuration = typeof duration === 'number' ? Math.round(duration) : parseInt(duration, 10);

  var seconds = (0, _padLeft2.default)(intDuration % 60, '0', 2);
  var minutes = (0, _padLeft2.default)(Math.floor(intDuration / 60) % 60, '0', 2);
  var hours = Math.floor(intDuration / 3600) % 24;

  return '' + (hours > 0 ? (0, _padLeft2.default)(hours, '0', 2) + ':' : '') + minutes + ':' + seconds;
}
//# sourceMappingURL=index.js.map
