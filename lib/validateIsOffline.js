"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

require("core-js/modules/es6.array.find");

var _default = function _default(message) {
  var offlineMessagesList = ['Failed to fetch', 'The Internet connection appears to be offline.', 'NetworkError when attempting to fetch resource.', 'Network Error 0x2ee7, Could not complete the operation due to error 00002ee7.', 'A server with the specified hostname could not be found.', // DNS matching failed
  'Network request failed', // IE
  'Type error', // Safari
  'The request timed out.' // Safari
  ];
  return !!offlineMessagesList.find(function (item) {
    return item === message;
  });
};

exports["default"] = _default;
//# sourceMappingURL=validateIsOffline.js.map
