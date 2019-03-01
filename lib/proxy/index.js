"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getProxyServer", {
  enumerable: true,
  get: function get() {
    return _getProxyServer2.default;
  }
});
Object.defineProperty(exports, "getProxyClient", {
  enumerable: true,
  get: function get() {
    return _getProxyClient2.default;
  }
});
Object.defineProperty(exports, "proxify", {
  enumerable: true,
  get: function get() {
    return _proxify2.default;
  }
});

var _getProxyServer2 = _interopRequireDefault(require("./getProxyServer"));

var _getProxyClient2 = _interopRequireDefault(require("./getProxyClient"));

var _proxify2 = _interopRequireDefault(require("./proxify"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=index.js.map
