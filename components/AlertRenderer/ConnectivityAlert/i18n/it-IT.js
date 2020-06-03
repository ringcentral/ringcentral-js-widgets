"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _connectivityTypes = _interopRequireDefault(require("../../../../modules/ConnectivityManager/connectivityTypes"));

var _connectivityTypes$ne;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].networkLoss, "Si è verificato un problema, controllare la connessione di rete e riprovare."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].offline, "Impossibile connettersi al server. Riprova più tardi."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].serverUnavailable, "Spiacenti, si è verificato un problema. Riprova più tardi."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].voipOnly, "Siamo spiacenti, stiamo lavorando per risolvere il problema. È comunque possibile effettuare chiamate, ma le altre funzioni sono limitate."), _defineProperty(_connectivityTypes$ne, _connectivityTypes["default"].survival, "Siamo spiacenti, stiamo lavorando per risolvere il problema. È possibile che l'accesso a determinate funzioni risulti limitato. L'app sarà ripristinata automaticamente non appena disponibile."), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@


exports["default"] = _default;
//# sourceMappingURL=it-IT.js.map
