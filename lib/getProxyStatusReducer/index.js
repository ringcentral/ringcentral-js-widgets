"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getProxyStatusReducer;

var _proxyStatuses = _interopRequireDefault(require("../../enums/proxyStatuses"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getProxyStatusReducer(types) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _proxyStatuses.default.pending;

    var _ref = arguments.length > 1 ? arguments[1] : undefined,
        type = _ref.type;

    switch (type) {
      case types.proxyInit:
        return _proxyStatuses.default.initializing;

      case types.proxyInitSuccess:
        return _proxyStatuses.default.ready;

      default:
        return state;
    }
  };
}
//# sourceMappingURL=index.js.map
