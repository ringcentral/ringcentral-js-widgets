"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useContactAvatar = void 0;
var _nextCore = require("@ringcentral-integration/next-core");
var _react = require("react");
/**
 * get source contact avatar by contact id or contact profileImage
 *
 * if the contact is fine in allContactsMap, it use the contact in allContactsMap
 * otherwise, it use the source contact in the parameter, like extensionInfo also include profileImage in the data can be used
 *
 * @default size 'xsmall'
 */
var useContactAvatar = exports.useContactAvatar = function useContactAvatar(source) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'xsmall';
  var authService = (0, _nextCore.useContainer)('Auth');
  var contactsService = (0, _nextCore.useContainer)('Contacts');
  var contact = (source === null || source === void 0 ? void 0 : source.id) ? contactsService.allContactsMap.get(source.id) : undefined;
  var targetContact = contact || source;
  var result = (0, _react.useMemo)(function () {
    return targetContact ? contactsService.getProfileImageSync(targetContact, size) : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactsService, size, targetContact,
  // add accessToken to make sure it will re-render when the token changed
  authService.accessToken]);
  return result;
};
//# sourceMappingURL=useContactAvatar.js.map
