"use strict";

require("core-js/modules/es.object.to-string");
require("core-js/modules/es.promise");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = loadLocale;
function loadLocale(locale) {
  return new Promise(function (resolve) {
    switch (locale) {
      default:
        return resolve(null);
    }
  });
}
//# sourceMappingURL=loadLocale.js.map
