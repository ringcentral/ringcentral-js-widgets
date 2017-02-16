"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getDateFrom;
function getDateFrom(daySpan) {
  var d = new Date(Date.now() - daySpan * 24 * 60 * 60 * 1000);
  d.setHours(0);
  d.setMinutes(0);
  d.setSeconds(0);
  d.setMilliseconds(0);
  return d;
}
//# sourceMappingURL=getDateFrom.js.map
