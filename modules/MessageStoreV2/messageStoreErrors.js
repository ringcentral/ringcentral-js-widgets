"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.messageStoreErrors = void 0;

var _ObjectMap = require("@ringcentral-integration/core/lib/ObjectMap");

var messageStoreErrors = _ObjectMap.ObjectMap.prefixKeys(['deleteFailed', 'readFailed', 'unreadFailed'], 'messageStore');

exports.messageStoreErrors = messageStoreErrors;
//# sourceMappingURL=messageStoreErrors.js.map
