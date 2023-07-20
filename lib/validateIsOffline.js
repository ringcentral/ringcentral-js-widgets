"use strict";

require("core-js/modules/es.array.find");
require("core-js/modules/es.array.index-of");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _default = function _default(message) {
  if (!message) {
    return false;
  }
  var offlineMessagesList = ['Failed to fetch', 'Network Error', 'Unable to access the network', 'Your connection was interrupted', 'The Internet connection appears to be offline.', 'NetworkError when attempting to fetch resource.', 'A server with the specified hostname could not be found.',
  // DNS matching failed
  'Network request failed',
  // IE
  'Type error',
  // Safari
  'The request timed out.' // Safari
  ];

  return !!offlineMessagesList.find(function (item) {
    return message.indexOf(item) > -1;
  });
};
exports["default"] = _default;
//# sourceMappingURL=validateIsOffline.js.map
