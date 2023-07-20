"use strict";

require("core-js/modules/es.array.map");
require("core-js/modules/es.function.name");
require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.replace");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renameTurkey = renameTurkey;
exports.renameTurkeyCountries = renameTurkeyCountries;
exports.renameTurkeyCountry = renameTurkeyCountry;
/**
 * https://jira_domain/browse/RCINT-29161
 * Turkey renames to Türkiye
 */

function renameTurkey(content) {
  if (typeof content !== 'string' || !content) {
    return content;
  }
  return content.replace(/Turkey/g, 'Türkiye');
}
function renameTurkeyCountry(country) {
  if (country === null || country === void 0 ? void 0 : country.name) {
    country.name = renameTurkey(country.name);
  }
  return country;
}
function renameTurkeyCountries(countries) {
  return countries.map(function (country) {
    return renameTurkeyCountry(country);
  });
}
//# sourceMappingURL=renameTurkey.js.map
