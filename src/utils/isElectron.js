"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isElectron = void 0;
require("core-js/modules/es.array.index-of.js");
var isElectron = exports.isElectron = function isElectron() {
  var _navigator, _navigator$userAgent;
  return ((_navigator = navigator) === null || _navigator === void 0 ? void 0 : (_navigator$userAgent = _navigator.userAgent) === null || _navigator$userAgent === void 0 ? void 0 : _navigator$userAgent.toLowerCase().indexOf(' electron/')) > -1;
};
//# sourceMappingURL=isElectron.js.map
