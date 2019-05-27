"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = formatDuration;

require("core-js/modules/es6.number.constructor");

require("core-js/modules/es6.number.is-nan");

var _padLeft = _interopRequireDefault(require("ringcentral-integration/lib/padLeft"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function formatDuration(duration) {
  if (Number.isNaN(duration)) {
    return '--:--';
  }

  var intDuration = typeof duration === 'number' ? Math.round(duration) : parseInt(duration, 10);
  var seconds = (0, _padLeft["default"])(intDuration % 60, '0', 2);
  var minutes = (0, _padLeft["default"])(Math.floor(intDuration / 60) % 60, '0', 2);
  var hours = Math.floor(intDuration / 3600) % 24;
  return "".concat(hours > 0 ? "".concat((0, _padLeft["default"])(hours, '0', 2), ":") : '').concat(minutes, ":").concat(seconds);
}
//# sourceMappingURL=index.js.map
