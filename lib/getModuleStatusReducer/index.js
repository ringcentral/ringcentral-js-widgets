'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getModuleStatusReducer;

var _moduleStatuses = require('../../enums/moduleStatuses');

var _moduleStatuses2 = _interopRequireDefault(_moduleStatuses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getModuleStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _moduleStatuses2.default.pending;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.init:
        return _moduleStatuses2.default.initializing;

      case types.initSuccess:
        return _moduleStatuses2.default.ready;

      case types.reset:
        return _moduleStatuses2.default.resetting;

      case types.resetSuccess:
        return _moduleStatuses2.default.pending;

      default:
        return state;
    }
  };
}
//# sourceMappingURL=index.js.map
