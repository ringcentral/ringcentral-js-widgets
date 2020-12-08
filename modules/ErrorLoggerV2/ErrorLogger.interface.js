"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Severity = void 0;
var Severity;
exports.Severity = Severity;

(function (Severity) {
  Severity["Error"] = "error";
  Severity["Warning"] = "warning";
  Severity["Log"] = "log";
  Severity["Info"] = "info";
  Severity["Debug"] = "debug";
})(Severity || (exports.Severity = Severity = {}));
//# sourceMappingURL=ErrorLogger.interface.js.map
