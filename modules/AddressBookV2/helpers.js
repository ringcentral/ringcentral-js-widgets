"use strict";

require("core-js/modules/es6.object.define-property");

require("core-js/modules/es6.array.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.decodeName = decodeName;
exports.processAddressBookResponse = processAddressBookResponse;
exports.getSyncParams = getSyncParams;

require("core-js/modules/es6.array.is-array");

require("core-js/modules/es6.regexp.replace");

var _ramda = require("ramda");

var _syncTypes = require("../../enums/syncTypes");

var REGX_DECODE = /&\w+;/g;
var DECODE = {
  '&amp;': '&',
  '&bsol;': '\\',
  '&sol;': '/',
  '&apos;': "'"
};

function decodeName(str) {
  return str.replace(REGX_DECODE, function ($0) {
    var handleText = $0;

    if (DECODE[$0]) {
      handleText = DECODE[$0];
    }

    return handleText;
  });
}

function processAddressBookResponse(data) {
  if (Array.isArray(data === null || data === void 0 ? void 0 : data.records)) {
    (0, _ramda.forEach)(function (record) {
      if (record.firstName) {
        record.firstName = decodeName(record.firstName);
      }

      if (record.lastName) {
        record.lastName = decodeName(record.lastName);
      } // remove uri from record to reduce size


      delete record.uri;
    }, data.records);
  }

  return data;
}

function getSyncParams(_ref)
/* SyncAddressBookParameters */
{
  var perPage = _ref.perPage,
      syncToken = _ref.syncToken,
      pageId = _ref.pageId;
  var params = {
    perPage: perPage
  };

  if (syncToken) {
    params.syncToken = syncToken;
    params.syncType = _syncTypes.syncTypes.iSync;
  } else {
    params.syncType = _syncTypes.syncTypes.fSync;
  }

  if (pageId) {
    params.pageId = pageId;
  }

  return params;
}
//# sourceMappingURL=helpers.js.map
