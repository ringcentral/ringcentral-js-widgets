"use strict";

require("core-js/modules/es.regexp.exec");
require("core-js/modules/es.string.split");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ascendSortParties = ascendSortParties;
exports.mergeParty = mergeParty;
var _ramda = require("ramda");
var _constants = require("./constants");
function ascendSortParties(parties) {
  return (0, _ramda.sort)(function (last, next) {
    return +last.id.split('-')[1] - +next.id.split('-')[1];
  }, (0, _ramda.filter)(function (party) {
    return party.conferenceRole.toLowerCase() !== _constants.conferenceRole.host;
  }, parties));
}
function mergeParty(newParties, oldParties) {
  return (0, _ramda.map)(function (oldParty) {
    var newParty = (0, _ramda.find)(function (newParty) {
      if (newParty.id === oldParty.id) {
        return true;
      }
      return false;
    }, newParties);
    if (newParty) {
      return newParty;
    }
    return oldParty;
  }, oldParties);
}
//# sourceMappingURL=helpers.js.map
