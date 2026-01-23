"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSharedWorker = void 0;
require("core-js/modules/esnext.global-this.js");
var isSharedWorker = exports.isSharedWorker = !!globalThis.SharedWorkerGlobalScope;
//# sourceMappingURL=isSharedWorker.js.map
