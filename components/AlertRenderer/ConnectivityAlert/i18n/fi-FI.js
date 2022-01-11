"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _ConnectivityManager = require("../../../../modules/ConnectivityManager");

var _connectivityTypes$ne;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_connectivityTypes$ne = {}, _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.networkLoss, "Jotakin meni vikaan. Tarkista verkkoyhteytesi ja yritä uudelleen."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.offline, "Yhteyden muodostaminen palvelimeen epäonnistui. Yritä myöhemmin uudelleen."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.serverUnavailable, "Jotakin meni vikaan palvelimellamme. Yritä myöhemmin uudelleen."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.voipOnly, "Jotakin meni vikaan palvelimellamme. Pyrimme korjaamaan vian pikimmiten. Voit edelleen soittaa puheluita, mutta muita toimintoja on rajoitettu."), _defineProperty(_connectivityTypes$ne, _ConnectivityManager.connectivityTypes.survival, "Jotakin meni vikaan palvelimellamme. Pyrimme korjaamaan vian pikimmiten. Tietyt ominaisuudet voivat olla käytössä vain rajoitetusti. Sovellus palautuu normaalitilaan niin pian kuin mahdollista."), _connectivityTypes$ne); // @key: @#@"[connectivityTypes.networkLoss]"@#@ @source: @#@"Sorry, something went wrong, check your network connection and try again."@#@
// @key: @#@"[connectivityTypes.offline]"@#@ @source: @#@"Cannot connect to the server. Please retry later."@#@
// @key: @#@"[connectivityTypes.serverUnavailable]"@#@ @source: @#@"Sorry, something went wrong on our end. Try again later."@#@
// @key: @#@"[connectivityTypes.voipOnly]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You can still make calls, but other functions are currently limited."@#@
// @key: @#@"[connectivityTypes.survival]"@#@ @source: @#@"Sorry, something went wrong on our end, but we are working hard to fix it. You may have limited access to certain features. The app will recover automatically as soon as it’s available."@#@


exports["default"] = _default;
//# sourceMappingURL=fi-FI.js.map
