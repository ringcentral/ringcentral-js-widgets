"use strict";

require("core-js/modules/es.array.concat");
require("core-js/modules/es.number.constructor");
require("core-js/modules/es.number.is-nan");
require("core-js/modules/es.parse-int");
require("core-js/modules/es.string.pad-start");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDuration = formatDuration;
function formatDuration(duration) {
  if (duration === undefined || Number.isNaN(duration)) {
    return '--:--';
  }
  var intDuration = typeof duration === 'number' ? Math.round(duration) : parseInt(duration, 10);
  var seconds = "".concat(intDuration % 60).padStart(2, '0');
  var minutes = "".concat(Math.floor(intDuration / 60) % 60).padStart(2, '0');
  var hours = Math.floor(intDuration / 3600) % 24;
  var hourString = hours > 0 ? "".concat("".concat(hours).padStart(2, '0'), ":") : '';
  return "".concat(hourString).concat(minutes, ":").concat(seconds);
}
//# sourceMappingURL=formatDuration.js.map
