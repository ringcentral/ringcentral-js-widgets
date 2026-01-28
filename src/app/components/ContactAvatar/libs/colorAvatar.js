"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jRcContactAvatarColorId = void 0;
require("core-js/modules/es.array.concat.js");
// currently we only use this prefix
// Jupiter has other prefix, we don't support for now.
var RC_AVATAR_CONTACT_TYPE = 'PHONE';
var jRcContactAvatarColorId = exports.jRcContactAvatarColorId = function jRcContactAvatarColorId(id, phoneNumberAsId) {
  if (id) {
    return id;
  }
  if (phoneNumberAsId) {
    return "".concat(RC_AVATAR_CONTACT_TYPE, ".").concat(phoneNumberAsId);
  }
  return '';
};
//# sourceMappingURL=colorAvatar.js.map
