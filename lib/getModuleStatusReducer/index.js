'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getModuleStatusReducer;

var _moduleStatus = require('../../enums/moduleStatus');

var _moduleStatus2 = _interopRequireDefault(_moduleStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getModuleStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _moduleStatus2.default.pending;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {

      case types.init:
        return _moduleStatus2.default.initializing;

      case types.initSuccess:
        return _moduleStatus2.default.ready;

      case types.reset:
        return _moduleStatus2.default.resetting;

      case types.resetSuccess:
        return _moduleStatus2.default.pending;

      default:
        return state;
    }
  };
}
//# sourceMappingURL=index.js.map
