"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.invertObj = invertObj;
require("core-js/modules/es.object.keys.js");
// TODO: should find a better solution for electron package to avoid similar package dependencies too big cause app to large issues

/**
 * copy from "ramda", to reduce dependencies in electron app
 * @link https://github.com/ramda/ramda/blob/v0.28.0/source/invertObj.js
 */
function invertObj(obj) {
  var props = Object.keys(obj);
  var len = props.length;
  var idx = 0;
  var out = {};
  while (idx < len) {
    var key = props[idx];
    out[obj[key]] = key;
    idx += 1;
  }
  return out;
}
//# sourceMappingURL=invertObj.js.map
