"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _errors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/MessageStore/errors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = _defineProperty({}, _errors["default"].deleteFailed, "Impossibile eliminare il messaggio vocale a causa di un errore del server."); // @key: @#@"[messageStoreErrors.deleteFailed]"@#@ @source: @#@"Cannot delete the voicemail due to internal server error."@#@


exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
