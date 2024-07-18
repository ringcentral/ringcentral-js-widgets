"use strict";

require("core-js/modules/es.array.for-each");
require("core-js/modules/es.array.includes");
require("core-js/modules/es.date.now");
require("core-js/modules/es.date.to-iso-string");
require("core-js/modules/es.date.to-string");
require("core-js/modules/es.string.includes");
require("core-js/modules/web.dom-collections.for-each");
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getISODateFrom = getISODateFrom;
exports.getISODateTo = getISODateTo;
exports.processData = processData;
exports.processRecords = processRecords;
var _callActions = require("../../enums/callActions");
var _callLogHelpers = require("../../lib/callLogHelpers");
var _getDateFrom = _interopRequireDefault(require("../../lib/getDateFrom"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var s = Object.getOwnPropertySymbols(e); for (r = 0; r < s.length; r++) { o = s[r], t.includes(o) || {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) { if ({}.hasOwnProperty.call(r, n)) { if (e.includes(n)) continue; t[n] = r[n]; } } return t; }
function processData(data) {
  var _data$syncInfo;
  return {
    records: data.records,
    timestamp: Date.now(),
    syncToken: (_data$syncInfo = data.syncInfo) === null || _data$syncInfo === void 0 ? void 0 : _data$syncInfo.syncToken
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
    if (call.id && !ids[call.id] && call.action !== _callActions.callActions.findMe) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      var uri = call.uri,
        removeUriCall = _objectWithoutProperties(call, ["uri"]);
      output.push((0, _callLogHelpers.normalizeStartTime)(removeUriCall));
      ids[call.id] = true;
    }
  }
  records.forEach(processCall);
  supplementRecords.forEach(processCall);
  return output;
}
//# sourceMappingURL=helper.js.map
