"use strict";

require("core-js/modules/es.object.define-property.js");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSyncParams = void 0;
require("core-js/modules/es.date.to-iso-string.js");
var _syncTypes = require("../../enums/syncTypes");
var getSyncParams = exports.getSyncParams = function getSyncParams(_ref) {
  var recordCount = _ref.recordCount,
    conversationLoadLength = _ref.conversationLoadLength,
    dateFrom = _ref.dateFrom,
    dateTo = _ref.dateTo,
    syncToken = _ref.syncToken;
  if (syncToken) {
    return {
      syncToken: syncToken,
      syncType: _syncTypes.syncTypes.iSync
    };
  }
  var params = {
    recordCountPerConversation: conversationLoadLength,
    syncType: _syncTypes.syncTypes.fSync
  };
  if (recordCount) {
    params.recordCount = recordCount;
  }
  if (dateFrom) {
    params.dateFrom = dateFrom.toISOString();
  }
  if (dateTo) {
    params.dateTo = dateTo.toISOString();
  }
  return params;
};
//# sourceMappingURL=messageStoreHelper.js.map
