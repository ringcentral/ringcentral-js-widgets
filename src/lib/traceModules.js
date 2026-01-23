"use strict";

require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.sort.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.object.values.js");
require("core-js/modules/esnext.global-this.js");
require("core-js/modules/web.dom-collections.for-each.js");
var _constant = require("../constant");
/* eslint-disable @typescript-eslint/no-explicit-any */

if (process.env.NODE_ENV !== 'production') {
  globalThis.traceModules = function () {
    var _globalThis$app$modul;
    var arr = [];
    Object.values((_globalThis$app$modul = globalThis.app.modules) !== null && _globalThis$app$modul !== void 0 ? _globalThis$app$modul : {}).forEach(function (module) {
      var moduleInitTime = module[_constant.moduleInitTimeKey];
      if (typeof moduleInitTime !== 'undefined') {
        arr.push([module, module.constructor, moduleInitTime]);
      }
    });
    return arr.sort(function (a, b) {
      return b[2] - a[2];
    });
  };
}
//# sourceMappingURL=traceModules.js.map
