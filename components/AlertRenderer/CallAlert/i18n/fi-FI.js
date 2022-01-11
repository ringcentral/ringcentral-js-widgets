"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.object.define-property");

var _callErrors = _interopRequireDefault(require("@ringcentral-integration/commons/modules/Call/callErrors"));

var _callErrors$emergency;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = (_callErrors$emergency = {}, _defineProperty(_callErrors$emergency, _callErrors["default"].emergencyNumber, "Hätänumeroon soittaminen ei ole käytettävissä. Soita hätäkeskukseen toisella puhelimella"), _defineProperty(_callErrors$emergency, _callErrors["default"].noToNumber, "Anna kelvollinen puhelinnumero."), _defineProperty(_callErrors$emergency, _callErrors["default"].noAreaCode, "Määritä {areaCodeLink} käyttämään 7-numeroisia paikallispuhelinnumeroita."), _defineProperty(_callErrors$emergency, _callErrors["default"].connectFailed, "Yhteys epäonnistui. Yritä myöhemmin uudelleen."), _defineProperty(_callErrors$emergency, _callErrors["default"].internalError, "Ei voida yhdistää sisäisten virheiden takia. Yritä myöhemmin uudelleen."), _defineProperty(_callErrors$emergency, _callErrors["default"].notAnExtension, "Alanumeroa ei ole olemassa."), _defineProperty(_callErrors$emergency, _callErrors["default"].networkError, "Ei voida yhdistää verkko-ongelmien takia. Yritä myöhemmin uudelleen."), _defineProperty(_callErrors$emergency, _callErrors["default"].noInternational, "Sinulla ei ole lupaa soittaa kansainvälisiä puheluita. Pyydä päivitystä palvelun {brand} tilin järjestelmänvalvojalta."), _defineProperty(_callErrors$emergency, _callErrors["default"].noRingoutEnable, "Alanumerostasi voi soittaa puheluita työpöytäsovelluksen kautta.\n    Jos haluat vaihtaa toiseen puheluvaihtoehtoon,\n     pyydä päivitystä tilisi järjestelmänvalvojalta."), _defineProperty(_callErrors$emergency, "areaCode", "suuntanumero"), _defineProperty(_callErrors$emergency, "telus911", "Hätäpuheluita ei tueta."), _callErrors$emergency); // @key: @#@"[callErrors.emergencyNumber]"@#@ @source: @#@"Emergency calling is not available. Please use another phone to contact emergency services"@#@
// @key: @#@"[callErrors.noToNumber]"@#@ @source: @#@"Please enter a valid phone number."@#@
// @key: @#@"[callErrors.noAreaCode]"@#@ @source: @#@"Please set {areaCodeLink} to use 7-digit local phone numbers."@#@
// @key: @#@"[callErrors.connectFailed]"@#@ @source: @#@"Connection failed. Please try again later."@#@
// @key: @#@"[callErrors.internalError]"@#@ @source: @#@"Cannot connect due to internal errors. Please try again later."@#@
// @key: @#@"[callErrors.notAnExtension]"@#@ @source: @#@"The extension number does not exist."@#@
// @key: @#@"[callErrors.networkError]"@#@ @source: @#@"Cannot connect due to network issues. Please try again later."@#@
// @key: @#@"[callErrors.noInternational]"@#@ @source: @#@"You don't have permissions to make international calls. Please contact your {brand} account administrator for an upgrade."@#@
// @key: @#@"[callErrors.noRingoutEnable]"@#@ @source: @#@"Your extension is allowed to make calls with desktop app.\n    If you wish to switch to other calling options\n    please contact your account administrator for an upgrade."@#@
// @key: @#@"areaCode"@#@ @source: @#@"area code"@#@
// @key: @#@"telus911"@#@ @source: @#@"Emergency dialing is not supported."@#@


exports["default"] = _default;
//# sourceMappingURL=fi-FI.js.map
