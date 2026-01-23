"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.takeUntilAppDestroy = exports.GLOBAL_DESTROY$ = void 0;
var _rxjs = require("rxjs");
var GLOBAL_DESTROY$ = exports.GLOBAL_DESTROY$ = new _rxjs.Subject();
if (process.env.NODE_ENV === 'test') {
  global['destroyApp'] = function () {
    GLOBAL_DESTROY$.next();
  };
}
var takeUntilAppDestroy = exports.takeUntilAppDestroy = (0, _rxjs.takeUntil)(GLOBAL_DESTROY$);
//# sourceMappingURL=destroy.js.map
