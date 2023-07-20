"use strict";

require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isElectron = void 0;
var isElectron = function isElectron() {
  var _navigator, _navigator$userAgent;
  return ((_navigator = navigator) === null || _navigator === void 0 ? void 0 : (_navigator$userAgent = _navigator.userAgent) === null || _navigator$userAgent === void 0 ? void 0 : _navigator$userAgent.toLowerCase().indexOf(' electron/')) > -1;
};
exports.isElectron = isElectron;
//# sourceMappingURL=isElectron.js.map
