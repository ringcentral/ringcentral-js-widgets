'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getProxyStatusReducer;

var _proxyStatuses = require('../../enums/proxyStatuses');

var _proxyStatuses2 = _interopRequireDefault(_proxyStatuses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProxyStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _proxyStatuses2.default.pending;
    var _ref = arguments[1];
    var type = _ref.type;

    switch (type) {
      case types.proxyInit:
        return _proxyStatuses2.default.initializing;

      case types.proxyInitSuccess:
        return _proxyStatuses2.default.ready;

      default:
        return state;
    }
  };
}
//# sourceMappingURL=index.js.map
