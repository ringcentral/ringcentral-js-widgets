"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ClientTransport", {
  enumerable: true,
  get: function get() {
    return _ClientTransport2.default;
  }
});
Object.defineProperty(exports, "ServerTransport", {
  enumerable: true,
  get: function get() {
    return _ServerTransport2.default;
  }
});

var _ClientTransport2 = _interopRequireDefault(require("./ClientTransport"));

var _ServerTransport2 = _interopRequireDefault(require("./ServerTransport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map
