"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es6.object.define-property");

var _callLogMessages = _interopRequireDefault(require("ringcentral-integration/enums/callLogMessages"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _defineProperty({}, _callLogMessages.default.logCallLogFailed, "Falha ao carregar o log de chamadas devido a um erro inesperado. Atualize a página e tente novamente."); // @key: @#@"[callLogMessages.logCallLogFailed]"@#@ @source: @#@"Failed to load call log form due to unexpected error. Please refresh the page and try again."@#@


exports.default = _default;
//# sourceMappingURL=pt-BR.js.map
