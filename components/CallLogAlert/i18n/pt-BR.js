"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callLogMessages = _interopRequireDefault(require("ringcentral-integration/enums/callLogMessages"));

var _callLogMessages$logC;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callLogMessages$logC = {}, _defineProperty(_callLogMessages$logC, _callLogMessages["default"].logCallLogFailed, "Falha ao carregar o log de chamadas devido a um erro inesperado. Atualize a página e tente novamente."), _defineProperty(_callLogMessages$logC, _callLogMessages["default"].logFailed, "Não foi possível registrar sua chamada."), _callLogMessages$logC); // @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@
// @key: @#@"[callLogMessages.logFailed]"@#@ @source: @#@"Sorry, we've failed to log your call. Please try again later."@#@


exports["default"] = _default;
//# sourceMappingURL=pt-BR.js.map
