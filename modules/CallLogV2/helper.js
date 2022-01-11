"use strict";

require("core-js/modules/es6.object.define-property");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getISODateFrom = getISODateFrom;
exports.getISODateTo = getISODateTo;
exports.processData = processData;
exports.processRecords = processRecords;

require("core-js/modules/es6.array.for-each");

require("core-js/modules/es6.date.to-iso-string");

require("core-js/modules/es6.date.now");

var _callActions = require("../../enums/callActions");

var _callLogHelpers = require("../../lib/callLogHelpers");

var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));

var _removeUri = _interopRequireDefault(require("../../lib/removeUri"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function processData(data) {
  return {
    records: data.records,
    timestamp: Date.now(),
    syncToken: data.syncInfo.syncToken
  };
}

function getISODateFrom(daySpan) {
  var d = (0, _getDateFrom["default"])(daySpan);
  return d.toISOString();
}

function getISODateTo(records) {
  var dateTo;
  records.forEach(function (call) {
    if (!dateTo || call.startTime < dateTo) dateTo = call.startTime;
  });
  return dateTo && new Date(dateTo).toISOString();
}

function processRecords() {
  var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var supplementRecords = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var ids = {};
  var output = [];

  function processCall(call) {
    if (!ids[call.id] && call.action !== _callActions.callActions.findMe) {
      output.push((0, _callLogHelpers.normalizeStartTime)((0, _removeUri["default"])(call)));
      ids[call.id] = true;
    }
  }

  records.forEach(processCall);
  supplementRecords.forEach(processCall);
  return output;
}
//# sourceMappingURL=helper.js.map
