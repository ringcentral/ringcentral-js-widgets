"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isWebWorker = void 0;
require("core-js/modules/esnext.global-this.js");
var isWebWorker = exports.isWebWorker = !!globalThis.WorkerGlobalScope;
//# sourceMappingURL=isWebWorker.js.map
