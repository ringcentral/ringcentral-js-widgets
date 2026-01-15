"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRcFilteredContacts = exports.getPresenceStatus = void 0;
require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/web.dom-collections.for-each.js");
var MaximizeDisplayLength = 100;
var getPresenceStatus = exports.getPresenceStatus = function getPresenceStatus(presence) {
  if (!presence) {
    return;
  }
  var dndStatus = presence.dndStatus,
    presenceStatus = presence.presenceStatus,
    userStatus = presence.userStatus;
  if (dndStatus === 'DoNotAcceptAnyCalls') {
    return 'DND';
  }
  return (presenceStatus || userStatus || '').toLowerCase();
};
var getRcFilteredContacts = exports.getRcFilteredContacts = function getRcFilteredContacts(_ref) {
  var lowCaseString = _ref.lowCaseString,
    contacts = _ref.contacts;
  var len = contacts.length;
  var result = [];
  var resultCount = 0;
  var _loop = function _loop(i) {
    var _contacts$i = contacts[i],
      id = _contacts$i.id,
      name = _contacts$i.name,
      phoneNumbers = _contacts$i.phoneNumbers,
      type = _contacts$i.type,
      profileImageUrl = _contacts$i.profileImageUrl,
      presence = _contacts$i.presence;
    var isNameInclude = name === null || name === void 0 ? void 0 : name.toLowerCase().includes(lowCaseString);
    var isPrimary = true;
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    // eslint-disable-next-line no-loop-func
    phoneNumbers.forEach(function (_ref2) {
      var phoneType = _ref2.phoneType,
        phoneNumber = _ref2.phoneNumber;
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      if (isNameInclude || phoneNumber.includes(lowCaseString)) {
        result.push({
          id: id,
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          name: name,
          type: type,
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          phoneType: phoneType,
          // @ts-expect-error TS(2322): Type 'string | undefined' is not assignable to typ... Remove this comment to see the full error message
          phoneNumber: phoneNumber,
          isPrimary: isPrimary,
          profileImageUrl: profileImageUrl,
          // @ts-expect-error TS(2345): Argument of type 'Pick<PresenceInfoResponse, "dndS... Remove this comment to see the full error message
          presenceStatus: getPresenceStatus(presence),
          contact: contacts[i]
        });
        if (isPrimary) {
          isPrimary = false;
          resultCount += 1;
        }
      }
    });
    if (resultCount === MaximizeDisplayLength) return 1; // break
  };
  for (var i = 0; i < len; i++) {
    if (_loop(i)) break;
  }
  return result;
};
//# sourceMappingURL=ContactSearchHelper.js.map
