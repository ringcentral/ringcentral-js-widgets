"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.object.to-string.js");
var offlineMessagesList = ['Failed to fetch', 'Network Error', 'Unable to access the network', 'Your connection was interrupted', 'The Internet connection appears to be offline.', 'NetworkError when attempting to fetch resource.', 'A server with the specified hostname could not be found.',
// DNS matching failed
'Network request failed',
// IE
'Type error',
// Safari
'The request timed out.',
// Safari
'Load failed' // iOS = Failed to fetch
];
var _default = exports["default"] = function _default(message) {
  if (!message) {
    return false;
  }
  return !!offlineMessagesList.find(function (item) {
    return message.indexOf(item) > -1;
  });
};
//# sourceMappingURL=validateIsOffline.js.map
