"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toBoolean = toBoolean;
function toBoolean(value) {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value === 'number') {
    return value === 1;
  }
  if (typeof value === 'string') {
    var lowerCaseValue = value.toLowerCase();
    return lowerCaseValue === 'true' || lowerCaseValue === '1';
  }
  return false;
}
//# sourceMappingURL=toBoolean.js.map
