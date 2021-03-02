"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSyncParams = void 0;

require("core-js/modules/es6.date.to-iso-string");

var _syncTypes = require("../../enums/syncTypes");

var getSyncParams = function getSyncParams(_ref) {
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

exports.getSyncParams = getSyncParams;
//# sourceMappingURL=messageStoreHelper.js.map
